export async function fetchWithAuth(url, options) {
  const cookie_or_null = (document.cookie.match(/^(?:.*;)?\s*loginCookie\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
  let cookie = JSON.parse(cookie_or_null);
  // Ottieni il token dallo store Redux
  let token = cookie.token;

  // Imposta l'intestazione di autorizzazione
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  // Esegui la richiesta fetch con le nuove intestazioni

  const response = await fetch(url, { ...options, headers });
  return response;
}
