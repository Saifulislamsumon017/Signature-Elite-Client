import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import useAuth from '@/hooks/useAuth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';
import ImageUploader from '@/SheardComponents/ImageUploader';
import useAxios from '@/hooks/useAxios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';

  const handleSignUp = async e => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.FirstName.value.trim();
    const lastName = form.LastName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Validation
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    if (!photoURL) {
      toast.error('Please upload a profile photo.');
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

    try {
      setLoading(true);

      // 1️⃣ Create Firebase Auth user
      const result = await createUser(email, password);
      const user = result.user;

      // 2️⃣ Save user info to MongoDB
      const userInfo = {
        uid: user.uid,
        name: `${firstName} ${lastName}`,
        email,
        photoURL,
        role: 'user', // default role
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // 3️⃣ Update Firebase profile

      await axiosInstance.post('/users', userInfo);
      await updateUserProfile({
        displayName: `${firstName} ${lastName}`,
        photoURL,
      });

      toast.success('Account created successfully! 👋');
      navigate(from || '/');
      form.reset();
      setPhotoURL('');
    } catch (error) {
      console.error(error);
      toast.error(error?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row h-full items-center justify-center px-4 py-10 md:py-20 gap-10">
      <div className="w-full md:w-1/3">
        <Card className="w-full shadow-md rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-2xl font-bold">
                Create An Account
              </h1>
              <p className="text-center font-light mt-2 dark:text-gray-300">
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
                    className="w-full border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <Label className="block mb-1 pl-2">Last Name</Label>
                  <input
                    type="text"
                    name="LastName"
                    placeholder="Last Name"
                    className="w-full border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                    required
                  />
                </div>
              </div>

              <ImageUploader onUpload={setPhotoURL} />

              <div>
                <Label className="block mb-1 pl-2">Email</Label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                  required
                />
              </div>

              <div className="relative">
                <Label className="block mb-1 pl-2">Password</Label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  className="w-full border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
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

              <button
                type="submit"
                disabled={loading || !photoURL}
                className="w-full flex gap-2 items-center justify-center shadow-2xl rounded-md py-1.5 border cursor-pointer bg-lime-500 text-white hover:bg-lime-600"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    Creating...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <p className="text-center font-light pt-2 dark:text-gray-300">
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
