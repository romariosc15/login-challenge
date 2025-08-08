export async function mockedFetch(url, options) {
  if (url === '/api/auth/login') {
    const payload = JSON.parse(options.body);
    const token = 'fake-jwt-token';
    let result = {};

    if (payload.email === 'romariosc15@outlook.com' && payload.password === '123-123') {
      result = async () => ({
        type: 'success',
        title: 'Signed in successfully',
        message: 'Redirecting to dashboard.',
        token,
      });
    } else {
      result = async () => ({
        type: 'error',
        title: 'Invalid credentials',
        message: 'Your email or password is not correct.',
        token,
      });
    }
    return {
      ok: true,
      status: 200,
      json: result,
    };
  }
  return fetch(url, options);
}
