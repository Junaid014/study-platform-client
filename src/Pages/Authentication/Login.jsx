import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { LogInUser, sighInWithGoogle, setUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const onSubmit = data => {
    LogInUser(data.email, data.password)
      .then(result => {
        setUser(result.user);
        toast.success('Login successful!');
        navigate('/');
      })
      .catch(() => {
        toast.error('Invalid email or password');
      });
  };

  const handleGoogleLogin = () => {
    sighInWithGoogle()
      .then(result => {
        setUser(result.user);
        toast.success('Google login successful');
        navigate('/');
      })
      .catch(error => {
        toast.error('Google login failed');
        console.error(error);
      });
  };

  return (
    <div className='bg-gradient-to-r from-blue-50 via-white to-sky-100 min-h-screen md:flex items-center justify-between'>
      {/* Lottie */}
      <div className='w-full h-full'>
       
      </div>

      {/* Login Form */}
      <div className="md:w-1/2 lg:mr-16 md:ml-24">
        <div className="flex mt-4 justify-center items-center">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl pt-6 px-2">
            <h2 className="text-3xl font-semibold text-center">Login to Your Account</h2>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                {/* Email */}
                <label className="label font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input focus:outline-none focus:ring-0 focus:border-gray-600"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-500">Email is required</p>}

                {/* Password */}
                <div className="relative ">
                  <label className="label font-medium text-gray-600 mr-54">Password</label>
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password", { required: true })}
                    className="input w-full pr-12 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute top-7 right-3 text-gray-600 z-10"
                  >
                    {showPass ? (
                      <FaEye className="text-xl" />
                    ) : (
                      <FaEyeSlash className="text-xl" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500">Password is required</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-neutral font-bold mt-4 bg-[#00a7ac] border-none"
                >
                  Login
                </button>
              </form>

              <p className="font-semibold text-center py-3">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="text-[#60A5FA]">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Google Login */}
        <div className="divider lg:w-96">Or authorize with</div>

        <button
          onClick={handleGoogleLogin}
          className="btn lg:w-96 shadow-md py-3 w-full bg-white text-base text-gray-800 hover:shadow-md hover:border-gray-400 flex gap-4 border-[#e5e5e5]"
        >
          <svg
            className="w-6 h-6"
            aria-label="Google logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
