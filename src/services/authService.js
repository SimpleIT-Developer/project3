
export const login = async (username, password) => {
  const response = await fetch('http://erp-simpleit.sytes.net:8051/api/connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    throw new Error('Login inválido');
  }
  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
};
