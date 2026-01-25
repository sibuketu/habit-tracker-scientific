import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// Helper to read body for middleware
function readBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

// Helper for JSON response
function json(res: any, statusCode: number, body: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  const webhookUrl =
    env.VITE_N8N_WEBHOOK_URL ||
    env.EXPO_PUBLIC_N8N_WEBHOOK_URL ||
    'https://sibuektu.app.n8n.cloud/webhook/feedback';

  const webhook = new URL(webhookUrl);
  const proxyTarget = `${webhook.protocol}//${webhook.host}`;
  const proxyPathname = `${webhook.pathname}`;
  const geminiApiKey =
    env.GEMINI_API_KEY || env.GOOGLE_GEMINI_API_KEY || env.GOOGLE_API_KEY || env.VITE_GEMINI_API_KEY;

  return {
    plugins: [
      react(),
      {
        name: 'gemini-api-middleware',
        configureServer(server: any) {
          server.middlewares.use('/api/gemini', async (req: any, res: any, next: any) => {
            if (req.method === 'OPTIONS') {
              res.statusCode = 204;
              res.end();
              return;
            }
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Allow', 'POST');
              res.end('Method Not Allowed');
              return;
            }

            if (!geminiApiKey) {
              json(res, 500, { error: 'missing_api_key', message: 'GEMINI_API_KEY is not configured (dev server)' });
              return;
            }

            try {
              const bodyText = await readBody(req);
              const payload = bodyText ? JSON.parse(bodyText) : {};
              const model = typeof payload?.model === 'string' && payload.model.trim() ? payload.model.trim() : 'gemini-2.0-flash-001';
              const contents =
                Array.isArray(payload?.messages) && payload.messages.length
                  ? payload.messages
                    .filter((m: any) => typeof m?.content === 'string' && m.content.trim())
                    .map((m: any) => ({
                      role: m.role === 'assistant' ? 'model' : 'user',
                      parts: [{ text: String(m.content) }],
                    }))
                  : typeof payload?.prompt === 'string' && payload.prompt.trim()
                    ? [{ role: 'user', parts: [{ text: payload.prompt.trim() }] }]
                    : [];

              if (!contents.length) {
                json(res, 400, { error: 'missing_prompt', message: 'Provide prompt or messages' });
                return;
              }

              // optional inlineData (image)
              if (payload?.inlineData?.data) {
                const last = contents[contents.length - 1];
                last.parts = last.parts || [];
                last.parts.push({
                  inlineData: {
                    data: payload.inlineData.data,
                    mimeType: payload.inlineData.mimeType || 'image/jpeg',
                  },
                });
              }

              const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
                model
              )}:generateContent?key=${encodeURIComponent(geminiApiKey)}`;

              const upstream = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents }),
              });

              const upstreamText = await upstream.text();
              if (!upstream.ok) {
                res.statusCode = upstream.status;
                res.setHeader('Content-Type', upstream.headers.get('content-type') || 'text/plain; charset=utf-8');
                res.end(upstreamText);
                return;
              }

              const raw = JSON.parse(upstreamText);
              const text =
                raw?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('') ||
                raw?.candidates?.[0]?.content?.parts?.[0]?.text ||
                '';

              json(res, 200, { text, raw });
            } catch (e: any) {
              json(res, 502, { error: 'upstream_fetch_failed', message: e?.message ? String(e.message) : String(e) });
            }
          });
        },
      },
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'CarnivOS',
          short_name: 'PrimalLogic',
          description: 'Optimized Carnivore Diet Tracker',
          theme_color: '#0A0A0A',
          background_color: '#0A0A0A',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-v2-192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-v2-512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    server: {
      host: true,
      port: 5174,
      hmr: {
        overlay: false,
      },
      proxy: {
        '/api/feedback': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          timeout: 30000,
          proxyTimeout: 30000,
          rewrite: (path) => path.replace(/^\/api\/feedback(?:\/)?(\?.*)?$/, `${proxyPathname}$1`),
          configure: (proxy: any) => {
            proxy.on('error', (err: any, _req: any, res: any) => {
              const message = err?.message ? String(err.message) : String(err);
              if (res && !res.headersSent) {
                res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
              }
              if (res && typeof res.end === 'function') {
                res.end(JSON.stringify({ error: 'proxy_error', message }));
              }
              // eslint-disable-next-line no-console
              console.error('[feedback proxy error]', message);
            });
          },
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ai-vendor': ['@google/generative-ai'],
            'chart-vendor': ['recharts'],
            'supabase-vendor': ['@supabase/supabase-js'],
          },
        },
      },
      sourcemap: false,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,
    },
  };
})
