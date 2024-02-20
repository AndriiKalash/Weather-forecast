import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import './signForm.css';

function SignUp() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((user) => {
        console.log(user);
        setForm({ email: '', password: '' });
        setError(null);
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.message);
      });
  };

  return (
    <div className="sign-content">
      <form className="sign-form" onSubmit={register}>
        <p className="sign-title">Create an account</p>
        <label className="sign-label" htmlFor="email">
          Email:
        </label>
        <input
          className="sign-field"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          id="email"
          placeholder="Please enter youre email"
        />
        <label className="sign-label" htmlFor="password">
          Password:
        </label>
        <input
          value={form.password}
          className="sign-field"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          id="password"
          placeholder="Please enter youre password"
        />
        <button className="sign-button">Create</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div className="sign-bottom">
        <Link to="/">login to accaunt</Link>
      </div>
    </div>
  );
}

export default SignUp;
