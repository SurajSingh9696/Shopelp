export async function jsonFetcher(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",  // Ensure cookies are sent with requests
    ...options
  });
  return response.json();
}
