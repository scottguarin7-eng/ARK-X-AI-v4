# ARK-X AI

A responsive React + Vite chat application with a server-side Google Gemini API endpoint, prepared for deployment on Vercel.

## Included
- Responsive ARK-X dark/cyan interface
- Chat messages and conversation context during the current page session
- Loading state, friendly error messages, and copy-response action
- Server-side Gemini request in `api/chat.ts`
- API key kept in server environment variables (not exposed to the browser)
- Vercel and Vite configuration

## Deploy from an Android phone

1. Download and extract `ARK-X-AI.zip`.
2. Open GitHub in Chrome and create a new repository named `ARK-X-AI`.
3. Upload the contents **inside** the extracted `ARK-X-AI` folder to the repository root. Do not upload only the ZIP file. Make sure `src/`, `api/`, `package.json`, `index.html`, `vite.config.ts`, and `vercel.json` appear in GitHub.
4. Open Vercel and sign in with GitHub.
5. Choose **Add New → Project**, import `ARK-X-AI`, and deploy. Build command: `npm run build`; output directory: `dist`.
6. Create a Gemini API key through Google's official AI Studio website.
7. In Vercel, open the project **Settings → Environment Variables** and add:
   - Name: `GEMINI_API_KEY`
   - Value: your real Gemini API key
   - Environments: Production (and Preview if desired)
8. Optionally add `GEMINI_MODEL` with value `gemini-2.5-flash`. If you don't add it, the code uses that default.
9. Save the variables and redeploy. Environment variable changes apply to new deployments.

## Important security notes
- Never paste a real API key into frontend code, a public GitHub file, or a chat message.
- `.env.example` is only a template and contains no real key.
- Do not upload `.env` or `.env.local`; these are excluded by `.gitignore`.
- Gemini API usage may have limits or charges depending on your account and current Google terms. Check the official Gemini API pricing and usage page.
- This starter does not include user accounts, persistent database storage, or a public rate-limit system. Do not treat it as a hardened public production service until those protections are added.

## Local development (computer/Node.js required)
```bash
npm install
cp .env.example .env.local
# Put your key in .env.local, then run:
npm run dev
```

The Vercel API route is intended to run on Vercel; local chat requests require the Vercel development environment (`vercel dev`) or a compatible local server setup.

## Troubleshooting
- **Gemini is not configured yet:** add `GEMINI_API_KEY` to Vercel and redeploy.
- **Invalid API key:** verify the key in Vercel; never commit it.
- **Quota/rate limit:** check Gemini API usage and limits.
- **Function error:** open Vercel project → Logs and inspect the `/api/chat` function.
