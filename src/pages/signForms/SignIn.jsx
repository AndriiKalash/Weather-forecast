import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './signForm.css';

function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((user) => {
        console.log(user);
        setForm({ email: '', password: '' });
        setError(null);
        navigate('/home');
      })
      .catch((e) => {
        console.log(e.message);
        setError("couldn't find youre account or incorrect password");
      });
  };

  return (
    <div className="sign-content">
      <form className="sign-form">
        <p className="sign-title">Login to account</p>
        <label className="sign-label" htmlFor="email">
          Email:
        </label>
        <input
          className="sign-field"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          id="email"
          type="email"
          placeholder="Please enter youre email"
        />
        <label className="sign-label" htmlFor="password">
          Password:
        </label>
        <input
          className="sign-field"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          id="password"
          placeholder="Please enter youre password"
        />
        <button className="sign-button" onClick={login}>
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div className="sign-bottom">
        <Link to="/signUp">create an accaunt</Link>
      </div>
    </div>
  );
}

export default SignIn;
