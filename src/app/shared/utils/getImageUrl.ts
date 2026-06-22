export const getImageUrl = (url: string) => {
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`
}