// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  // ensures that the URL is using HTTPS instead of HTTP.
  const secureUrl = url.replace(/^http:/, 'https:');
  return fetch(secureUrl);
};





