import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const SignUp = () => {
  const { createUser, setUser, sighInWithGoogle, updateUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const axiosInstance = useAxios();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_uplod_key}`,
        formData
      );
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.log(err);
      toast.error('Image upload failed');
    }
  };

  const onSubmit = (data) => {
    if (!profilePic) {
      toast.error('Please upload a profile picture');
      return;
    }

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateUser({
          displayName: data.name,
          photoURL: profilePic,
        }).then(async () => {
          setUser({ ...user, displayName: data.name, photoURL: profilePic });

          const userInfo = {
            email: data.email,
            name: data.name,
            image: profilePic,
            role: 'student',
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString(),
          };

          try {
            await axiosInstance.post('/users', userInfo);
          } catch (err) {
            console.error('User DB save failed:', err);
          }

          toast.success('Account created successfully!');
          navigate(location.state?.from?.pathname || "/");
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Email is already in use');
        } else {
          toast.error('Something went wrong');
        }
      });
  };

  const handleGoogleLogin = () => {
    sighInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        setUser(user);

        const userInfo = {
          email: user.email,
          name: user.displayName || 'Google User',
          image: user.photoURL,
          role: 'student',
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        try {
          await axiosInstance.post('/users', userInfo);
        } catch (err) {
          console.error('Google user DB save failed:', err);
        }
        toast.success('Google login successful');
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        toast.error('Google login failed');
        console.error(error);
      });
  };

  return (
    <div className='bg-[#e2edff] min-h-screen md:flex items-center mt-16 lg:pt-0  pt-7 lg:mt-0 justify-between'>
      <div className='w-full h-full'>
        <DotLottieReact
          className='w-full h-full md:flex hidden'
          src="https://lottie.host/c998d45f-036d-447b-be4a-6ebbe444b57e/MWx9J7Dngy.lottie"
          loop
          autoplay
        />
      </div>

      <div className="md:w-1/2 lg:mr-16 md:ml-24">
        <div className="flex mt-4 justify-center items-center">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl pt-6 px-2">
            <h2 className="text-3xl font-semibold text-center">Register your Account</h2>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                {/* Name */}
                <label className="label font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input focus:outline-none focus:ring-0 focus:border-gray-600"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500">Name is required</p>}

                {/* Profile Picture */}
                <label className="label font-medium text-gray-600">Profile Picture</label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="input focus:outline-none focus:ring-0 focus:border-gray-600"
                />

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
                <div className="relative">
                  <label className="label mr-54 font-medium text-gray-600">Password</label>
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      validate: {
                        hasUpper: (value) =>
                          /[A-Z]/.test(value) || "Must include at least one uppercase letter",
                        hasLower: (value) =>
                          /[a-z]/.test(value) || "Must include at least one lowercase letter",
                      },
                    })}
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
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-neutral font-bold mt-4 bg-[#00a7ac] border-none"
                >
                  Register
                </button>
              </form>

              <p className="font-semibold text-center py-3">
                Already Have An Account?{" "}
                <Link to="/auth/login" className="text-[#60A5FA]">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="divider w-96 mx-auto">Or authorize with</div>

        <button
          onClick={handleGoogleLogin}
          className="btn w-96 mx-auto shadow-md py-3  bg-white text-base text-gray-800 hover:shadow-md hover:border-gray-400 flex gap-4 border-[#e5e5e5]"
        >
          <svg
            className="w-6 h-6"
            aria-label="Google logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
