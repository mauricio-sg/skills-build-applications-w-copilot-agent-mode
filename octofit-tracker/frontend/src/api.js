export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload?.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload?.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload?.items && Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
}
