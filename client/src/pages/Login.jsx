import { useState } from 'react';
import { login, register } from '../api/client';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Login() {
  useAnalytics();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const result = isRegister
        ? await register(email, password, name)
        : await login(email, password);

      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        setMessage(`Welcome, ${result.user.name}!`);
      } else {
        setMessage(result.error || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Connection error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1 style={{ marginBottom: 16 }}>{isRegister ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit} className="card">
        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        {isRegister && (
          <div style={{ marginBottom: 12 }}>
            <input
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%' }}
              required
            />
          </div>
        )}
        <button type="submit" style={{ width: '100%' }}>
          {isRegister ? 'Register' : 'Login'}
        </button>
        <p style={{ marginTop: 12, fontSize: 13, textAlign: 'center' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{ background: 'none', color: '#4f46e5', padding: 0, textDecoration: 'underline' }}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
      {message && <p style={{ marginTop: 12, textAlign: 'center', color: message.includes('Welcome') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}
