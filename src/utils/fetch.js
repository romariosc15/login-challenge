function mockPromise(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockedFetch(url, options) {
  if (url === '/api/auth/login') {
    const payload = JSON.parse(options.body);
    let result = {};
    await mockPromise(1000);
    if (payload.email === 'romariosc15@outlook.com' && payload.password === '123-123') {
      result = async () => ({
        type: 'success',
        title: 'Signed in successfully',
        message: 'Redirecting to dashboard.',
        token: 'fake-jwt-token',
      });
    } else {
      result = async () => ({
        type: 'error',
        title: 'Invalid credentials',
        message: 'Your email or password is not correct.',
        token: null,
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
