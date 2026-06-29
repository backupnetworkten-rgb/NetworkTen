/**
 * Returns a proxied version of any external image URL.
 * Local paths starting with "/" are returned as-is.
 */
export function proxyImage(url: string): string {
  if (!url || url.trim() === "") return "";
  if (url.startsWith("/")) return url;
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}