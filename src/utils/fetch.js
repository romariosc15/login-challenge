export async function mockedFetch(url, options) {
  if (url === '/api/auth/login') {
    const payload = JSON.parse(options.body);
    let result = {};
    if (payload.email === 'romariosc15@outlook.com' && payload.password === '123-123') {
      result = async () => ({
        type: 'success',
        title: 'Signed in successfully',
        message: 'Redirecting to dashboard.',
        url,
      });
    } else {
      result = async () => ({
        type: 'error',
        title: 'Invalid credentials',
        message: 'Your email or password is not correct.',
        url,
      });
    }
    return {
      ok: true,
      status: 200,
      json: result,
    };
  }
  console.log('FAAALSEE');
  return fetch(url, options);
}
