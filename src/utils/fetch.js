export async function mockedFetch(url, options) {
  if (url === 'api/auth/login') {
    return {
      ok: true,
      status: 200,
      json: async () => ({ type: 'success', message: 'Signed in successfully', url }),
    };
  }
  return fetch(url, options);
}
