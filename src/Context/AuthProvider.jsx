import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase.config';
import axios from 'axios';

const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  const updateUserProfile = updatedData => {
    return updateProfile(auth.currentUser, updatedData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Get JWT from server
        axios
          .post('http://localhost:3000/jwt', { email: currentUser.email })
          .then(res => {
            localStorage.setItem('access-token', res.data.token);
          });
      } else {
        localStorage.removeItem('access-token');
      }
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    signOutUser,
    signInGoogle,
    updateUserProfile,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
