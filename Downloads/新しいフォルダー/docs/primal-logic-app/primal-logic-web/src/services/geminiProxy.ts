export type GeminiProxyMessage = { role: 'user' | 'assistant'; content: string };

export type GeminiProxyRequest = {
  model?: string;
  prompt?: string;
  messages?: GeminiProxyMessage[];
  inlineData?: { data: string; mimeType?: string };
};

export type GeminiProxyResponse = {
  text: string;
  raw?: unknown;
};

/**
 * Client-side Gemini call must go through server endpoint to avoid leaking API keys.
 * - dev: Vite middleware (vite.config.ts)
 * - prod: Netlify Function (netlify/functions/gemini.cjs via /api/gemini redirect)
 */
export async function geminiGenerate(request: GeminiProxyRequest): Promise<GeminiProxyResponse> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const contentType = res.headers.get('content-type') || '';
  const bodyText = await res.text();

  if (!res.ok) {
    // Try to surface n8n/Gemini-style JSON errors; fallback to plain text
    if (contentType.includes('application/json')) {
      try {
        const json = JSON.parse(bodyText) as any;
        const message = typeof json?.message === 'string' ? json.message : bodyText;
        throw new Error(message);
      } catch {
        // ignore
      }
    }
    throw new Error(bodyText || `HTTP ${res.status}`);
  }

  if (!contentType.includes('application/json')) {
    // unexpected but handle
    return { text: bodyText };
  }

  const json = JSON.parse(bodyText) as GeminiProxyResponse;
  return { text: json.text || '', raw: json.raw };
}


