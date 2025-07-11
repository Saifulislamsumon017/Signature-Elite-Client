import { FcGoogle } from 'react-icons/fc';

import { useLocation, useNavigate } from 'react-router';

import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';

const SocialLogin = ({ from }) => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || '/';
  const isSignUp = location.pathname === '/register';

  const handleSignInGoogle = () => {
    signInGoogle()
      .then(result => {
        const user = result.user;

        const displayName =
          user.displayName || user.email?.split('@')[0] || 'User';
        const firstName = displayName.split(' ')[0];

        if (isSignUp) {
          toast.success('Signed up with Google! 🎉');
        } else {
          toast.success(`Logged in with Google! Welcome back, ${firstName} 👋`);
        }
        navigate(from || '/');
      })
      .catch(error => {
        console.error(error);
        toast.error('Google sign-in failed. Please try again.');
      });
  };

  return (
    <div>
      <div className="flex py-4 items-center px-4 text-sm text-gray-800 gap-1 before:flex-1 before:border-t after:flex-1 after:border-t">
        OR
      </div>

      <button
        onClick={handleSignInGoogle}
        className="w-full flex gap-1 text-[18px] items-center justify-center shadow-2xl rounded-md py-1.5 border cursor-pointer"
        type="button"
      >
        <FcGoogle size={22} />
        {isSignUp ? 'SignUp With Google' : 'LogIn With Google'}
      </button>
    </div>
  );
};

export default SocialLogin;
