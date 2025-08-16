import React, {  useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import btn_logo from "../assets/user.png";
import useAuth from '../hooks/useAuth';
import Loading from '../Pages/Extra/Loading';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { GiGraduateCap } from 'react-icons/gi';

const Navbar = () => {
  const { user, signOutUser, loading } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("SignOut Successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    < >
     
      <li className=" text-sm font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-[#422ad5] underline'
              : 'text-[#1E293B] hover:text-[#2563EB] hover:underline'
          }
        >
          Home
        </NavLink>
      </li>
      <li className=" text-sm font-semibold">
        <NavLink
          to="/allStudySession"
          className={({ isActive }) =>
            isActive
              ? 'text-[#422ad5] underline'
              : 'text-[#1E293B] hover:text-[#422ad5] hover:underline'
          }
        >
          All Study Sessions
        </NavLink>
      </li>
      {
        user && 
        <>
        <li className=" text-sm font-semibold">
        <NavLink
          to="/createSession"
          className={({ isActive }) =>
            isActive
              ? 'text-[#422ad5] underline'
              : 'text-[#1E293B] hover:text-[#422ad5] hover:underline'
          }
        >
          Create Session
        </NavLink>
      </li>
        </>
      }
      <li className=" text-sm font-semibold">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'text-[#422ad5] underline'
              : 'text-[#1E293B] hover:text-[#422ad5] hover:underline'
          }
        >
          DashBoard
        </NavLink>
      </li>
    
  
    </>
  );

  return (
    <div className="w-full bg-[#e4e6fe] fixed top-0 left-0 right-0 shadow-sm z-50">
      <div className="flex items-center justify-between min-h-16 w-11/12 mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="flex flex-col gap-3 w-52 bg-[#FAF9F6]  dropdown-content rounded-box z-1 mt-3 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <Link to='/' className="flex gap-2 justify-center items-center">
            <GiGraduateCap className="md:text-4xl text-lg text-primary" />
            <span className="md:text-2xl text-base  text-primary font-extrabold">EduSync</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className=" flex gap-2 items-center">{links}</ul>
        </div>

        <div className='flex navbar-end gap-5'>
          <div>
            {user ? (
              <div className=" flex gap-1 md:gap-3 relative" ref={dropdownRef}>
                <img
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="md:w-12 md:h-11 w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                  src={user?.photoURL || btn_logo}
                  alt="user"
                />
                <button
                  className="md:px-5 px-2 py-1 md:py-2.5 cursor-pointer bg-gradient-to-r from-[#00a7ac] to-[#00cfc3] text-white rounded-lg font-medium shadow-md hover:from-[#008f92] hover:to-[#00b5a9] transition duration-300"
                  onClick={handleSignOut}
                >
                  SignOut
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-12 w-64 py-4 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b text-start border-gray-100 text-gray-700 font-semibold">
                      {user.displayName}
                    </div>
                    <div className=''>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setDropdownOpen(false);
                        }}
                        className="flex items-center gap-1 font-semibold rounded-lg cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        SignOut
                        <HiArrowLeftOnRectangle />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                {/* <Link
                  to="/auth/login"
                  className="px-4 cursor-pointer font-medium py-2 border border-[#00a7ac] text-[#00a7ac] duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#00a7ac] hover:to-[#00cfc2] hover:text-white rounded-md transition"
                >
                 
                </Link> */}

                <Link
                  to="/auth/signUp"
                  className="md:px-5 px-2.5 py-1.5 md:py-2.5 md:text-base text-xs cursor-pointer bg-gradient-to-r from-[#00a7ac] to-[#00cfc3] text-white rounded-lg font-medium shadow-md hover:from-[#008f92] hover:to-[#00b5a9 transition duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
