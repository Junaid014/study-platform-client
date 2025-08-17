

import React from 'react';
import { GiGraduateCap } from 'react-icons/gi';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { FaBook, FaCheckCircle, FaClock, FaFolderOpen, FaPlusCircle, FaRegStickyNote, FaStickyNote, FaUserShield } from "react-icons/fa";
import useUserRole from '../../hooks/useUserRole';
import ProfilePage from '../../Component/Porfile/ProfilePage';

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  return (
    <div className="drawer lg:drawer-open w-11/12 mx-auto ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Content area */}
      <div className="drawer-content w-full flex flex-col">
        {/* Navbar (for mobile) */}
        <div className="navbar bg-[#e4e6fe] lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 roboto px-2 lg:hidden">Dashboard</div>
        </div>

        {/* Default Overview/Profile Section (when just entering dashboard) */}
        {location.pathname === "/dashboard" && (
          <div className="p-6 space-y-6">
            {/* Profile Card */}
          <ProfilePage/>

            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#e6f8f9] rounded-xl shadow p-6 text-center">
                <FaBook className="mx-auto text-3xl text-[#3d53eb]" />
                <h3 className="font-semibold mt-3">Total Sessions</h3>
                <p className="text-2xl font-bold text-gray-700">12</p>
              </div>
              <div className="bg-[#fcedea] rounded-xl shadow p-6 text-center">
                <FaRegStickyNote className="mx-auto text-3xl text-[#f65d4e]" />
                <h3 className="font-semibold mt-3">Notes Created</h3>
                <p className="text-2xl font-bold text-gray-700">8</p>
              </div>
              <div className="bg-[#e5eff9] rounded-xl shadow p-6 text-center">
                <FaClock className="mx-auto text-3xl text-[#3d53eb]" />
                <h3 className="font-semibold mt-3">Pending Tasks</h3>
                <p className="text-2xl font-bold text-gray-700">5</p>
              </div>
            </div>
          </div>
        )}

        {/* Nested route content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-[#e4e6fe] text-base-content min-h-full w-80 p-4">
          <Link to='/' className="flex gap-2 items-center mb-4">
            <GiGraduateCap className="text-4xl text-primary" />
            <span className="text-2xl text-primary font-extrabold">EduSync</span>
          </Link>

          {/* Student Routes */}
          {!roleLoading && role === 'student' && (
            <>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/myBookedSessions" className="flex items-center gap-2 px-2 py-1">
                  <FaBook className="text-[#3d53eb]" /> My Booked Sessions
                </NavLink>
              </li>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/createNotes" className="flex items-center gap-2 px-2 py-1">
                  <FaRegStickyNote className="text-[#3d53eb]" /> Create Note
                </NavLink>
              </li>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/manageNotes" className="flex items-center gap-2 px-2 py-1">
                  <FaStickyNote className="text-[#3d53eb]" /> Manage Notes
                </NavLink>
              </li>
            </>
          )}

          {/* Tutor Routes */}
          {!roleLoading && role === 'tutor' && (
            <>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/createSession" className="flex items-center gap-2 px-2 py-1">
                  <FaPlusCircle className="text-[#3d53eb]" /> Create Study Session
                </NavLink>
              </li>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/myStudySessions" className="flex items-center gap-2 px-2 py-1">
                  <FaBook className="text-[#3d53eb]" /> My Study Sessions
                </NavLink>
              </li>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/myMaterials" className="flex items-center gap-2 px-2 py-1">
                  <FaFolderOpen className="text-[#3d53eb]" /> View Materials
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Routes */}
          {!roleLoading && role === 'admin' && (
            <>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/pendingStudySession" className="flex items-center gap-2 px-2 py-1">
                  <FaClock className="text-[#3d53eb]" /> Pending Study Sessions
                </NavLink>
              </li>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/makeAdmin" className="flex items-center gap-2 px-2 py-1">
                  <FaUserShield className="text-[#3d53eb]" /> Make Admin
                </NavLink>
              </li>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/approvedSessionAdmin" className="flex items-center gap-2 px-2 py-1">
                  <FaCheckCircle className="text-[#3d53eb]" /> Approved Sessions
                </NavLink>
              </li>
              <li className="font-medium text-black border border-dashed border-gray-300">
                <NavLink to="/dashboard/manageMaterials" className="flex items-center gap-2 px-2 py-1">
                  <FaFolderOpen className="text-[#3d53eb]" /> Manage Materials
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
