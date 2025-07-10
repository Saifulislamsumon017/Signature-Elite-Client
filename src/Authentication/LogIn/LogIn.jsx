// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Eye, EyeOff } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// import { Link, useLocation, useNavigate } from 'react-router';

// import toast from 'react-hot-toast';
// import SocialLogin from '../SocialLogin/SocialLogIn';
// import useAuth from '@/hoocks/useAuth';

// const LogIn = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { signInUser } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state || '/';

//   const handleSignIn = e => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     signInUser(email, password)
//       .then(result => {
//         const user = result.user;
//         const displayName =
//           user.displayName || user.email?.split('@')[0] || 'User';
//         const firstName = displayName.split(' ')[0];
//         navigate(from || '/');
//         toast.success(`Welcome back, ${firstName}!`);
//       })
//       .catch(error => {
//         console.error(error);
//         toast.error('Failed to sign in. Please check your credentials.');
//       });
//   };

//   return (
//     <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row h-full items-center justify-center px-4 py-10 md:py-20 gap-10">
//       {/* <div className="w-full md:w-1/2 flex justify-center items-center">
//         <Lottie
//           className="max-w-[500px] w-full h-auto"
//           animationData={Login}
//           loop
//         />
//       </div> */}

//       <div className="w-full md:w-1/3">
//         <Card className="w-full shadow-md rounded-2xl dark:bg-gray-800 dark:border-gray-600">
//           <CardHeader>
//             <CardTitle>
//               <h1 className="text-center text-2xl font-bold">Log In</h1>
//               <p className="text-center font-light font-rancho mt-2 dark:text-gray-300">
//                 Enter your details below to log in to your account
//               </p>
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSignIn} className="space-y-4">
//               <div>
//                 <Label className="block mb-1 pl-2">Email</Label>
//                 <input
//                   className="w-full font-abel border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
//                   type="email"
//                   name="email"
//                   required
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div className="relative">
//                 <Label className="block mb-1 pl-2">Password</Label>
//                 <input
//                   className="w-full font-abel border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   required
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-7 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>

//               <button className="w-full text-[18px]" type="submit">
//                 Log In
//               </button>
//             </form>

//             <SocialLogin from={from} />

//             <p className="text-center font-light font-abel pt-2 dark:text-gray-300">
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="underline text-indigo-700 font-semibold"
//               >
//                 Sign Up
//               </Link>
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default LogIn;
