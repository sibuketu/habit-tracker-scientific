// Netlify Function: /api/gemini
// - Keeps Gemini API key on server side (no VITE_ exposure)
// - Minimal REST call to Generative Language API
//
// Env:
// - GEMINI_API_KEY (recommended)
// - GOOGLE_GEMINI_API_KEY (fallback)
// - GOOGLE_API_KEY (fallback)
//
// Request (POST JSON):
// {
//   "model": "gemini-2.0-flash-001",
//   "prompt": "text prompt",
//   "messages": [{ "role": "user"|"assistant", "content": "..." }],
//   "inlineData": { "data": "<base64>", "mimeType": "image/jpeg" } // optional
// }
//
// Response:
// { "text": "...", "raw": <provider json> }
//
// Note: Do NOT log secrets.

const DEFAULT_MODEL = 'gemini-2.0-flash-001';

function json(statusCode, bodyObj) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(bodyObj),
  };
}

function normalizeContents(payload) {
  if (Array.isArray(payload?.messages) && payload.messages.length > 0) {
    return payload.messages
      .filter((m) => typeof m?.content === 'string' && m.content.trim())
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content) }],
      }));
  }

  const prompt = typeof payload?.prompt === 'string' ? payload.prompt.trim() : '';
  if (!prompt) return [];
  return [{ role: 'user', parts: [{ text: prompt }] }];
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: 'Method Not Allowed',
    };
  }

  const apiKey =
    process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return json(500, { error: 'missing_api_key', message: 'GEMINI_API_KEY is not configured' });
  }

  let payload = {};
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  const model = typeof payload?.model === 'string' && payload.model.trim() ? payload.model.trim() : DEFAULT_MODEL;
  const contents = normalizeContents(payload);
  if (!contents.length) {
    return json(400, { error: 'missing_prompt', message: 'Provide prompt or messages' });
  }

  // Optional inlineData (image)
  const inlineData = payload?.inlineData;
  if (inlineData && typeof inlineData?.data === 'string') {
    const mimeType = typeof inlineData?.mimeType === 'string' ? inlineData.mimeType : 'image/jpeg';
    // Attach as additional part to last user message
    const last = contents[contents.length - 1];
    last.parts = last.parts || [];
    last.parts.push({
      inlineData: {
        data: inlineData.data,
        mimeType,
      },
    });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    const contentType = resp.headers.get('content-type') || '';
    const rawText = await resp.text();

    if (!resp.ok) {
      // Forward provider error (without adding secrets)
      return {
        statusCode: resp.status,
        headers: { 'Content-Type': contentType || 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
        body: rawText,
      };
    }

    let raw;
    try {
      raw = JSON.parse(rawText);
    } catch {
      return json(502, { error: 'bad_provider_response', message: 'Expected JSON from provider' });
    }

    const text =
      raw?.candidates?.[0]?.content?.parts?.map((p) => p?.text).filter(Boolean).join('') ||
      raw?.candidates?.[0]?.content?.parts?.[0]?.text ||
      '';

    return json(200, { text, raw });
  } catch (e) {
    return json(502, { error: 'upstream_fetch_failed', message: e?.message ? String(e.message) : String(e) });
  }
};

