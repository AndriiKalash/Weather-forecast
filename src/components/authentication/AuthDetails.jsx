import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './authDetails.css';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  function userSignOut() {
    signOut(auth)
      .then(() => {
        console.log('success');
        navigate('/');
      })
      .catch((e) => console.log(e));
  }
  return (
    <div>
      {authUser ? (
        <div className="auth-content">
          <p className="auth-user">{authUser.email}</p>
          <button className="button-submit" onClick={userSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div onClick={() => navigate('/')}>Login</div>
      )}
    </div>
  );
};

export default AuthDetails;
