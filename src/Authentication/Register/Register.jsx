import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import useAuth from '@/hoocks/useAuth';

import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogIn';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const handleSignUp = e => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.FirstName.value.trim();
    const lastName = form.LastName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const photoURL = form.photoURL.value.trim();

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error('Password must include at least one uppercase letter.');
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error('Password must include at least one lowercase letter.');
      return;
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~`]/.test(password)) {
      toast.error('Password must include at least one special character.');
      return;
    }

    createUser(email, password)
      .then(result => {
        console.log(result);
        updateUserProfile({
          displayName: `${firstName} ${lastName}`,
          photoURL,
        }).then(() => {
          toast.success('Account created successfully! 👋');
          navigate(from || '/');
          form.reset();
        });
      })
      .catch(error => {
        console.error(error);
        toast.error(error.message || 'Sign up failed');
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row h-full items-center justify-center px-4 py-10 md:py-20 gap-10">
      {/* <div className="w-full md:w-1/2 flex justify-center items-center">
        <Lottie
          className="max-w-[500px] w-full h-auto"
          animationData={signUp}
          loop
        />
      </div> */}

      <div className="w-full md:w-1/3">
        <Card className="w-full shadow-md rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-2xl font-bold">
                Create An Account
              </h1>
              <p className="text-center font-light font-rancho mt-2 dark:text-gray-300">
                Enter your details below to create your account
              </p>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1/2">
                  <Label className="block mb-1 pl-2">First Name</Label>
                  <input
                    type="text"
                    name="FirstName"
                    placeholder="First Name"
                    className="w-full font-abel border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <Label className="block mb-1 pl-2">Last Name</Label>
                  <input
                    type="text"
                    name="LastName"
                    placeholder="Last Name"
                    className="w-full font-abel border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="block mb-1 pl-2">Profile Photo URL</Label>
                <input
                  type="url"
                  name="photoURL"
                  placeholder="Profile Photo URL"
                  className="w-full font-abel border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                  required
                />
              </div>

              <div>
                <Label className="block mb-1 pl-2">Email</Label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full font-abel border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                  required
                />
              </div>

              <div className="relative">
                <Label className="block mb-1 pl-2">Password</Label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  className="w-full font-abel border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-7 text-gray-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button className="w-full text-[18px]" type="submit">
                Sign Up
              </button>
            </form>

            <SocialLogin from={from} />

            <p className="text-center font-light font-abel pt-2 dark:text-gray-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="underline text-indigo-700 font-semibold"
              >
                Log In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
