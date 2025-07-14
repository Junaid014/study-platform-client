import React from 'react';
import { GiGraduateCap } from 'react-icons/gi';
import { Link, NavLink, Outlet } from 'react-router';
import { FaBook, FaCheckCircle, FaClock, FaFolderOpen, FaPlusCircle, FaRegStickyNote, FaStickyNote, FaUserShield } from "react-icons/fa";
import useUserRole from '../../hooks/useUserRole';


const DashboardLayout = () => {

       const { role, roleLoading } = useUserRole();
       console.log(role);

       return (
              <div className="drawer lg:drawer-open">

                     <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                     <div className="drawer-content flex flex-col">

                            {/* Navbar */}
                            <div className="navbar bg-[#e4e6fe] w-full lg:hidden">
                                   <div className="flex-none ">
                                          <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                                 <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        className="inline-block h-6 w-6 stroke-current"
                                                 >
                                                        <path
                                                               strokeLinecap="round"
                                                               strokeLinejoin="round"
                                                               strokeWidth="2"
                                                               d="M4 6h16M4 12h16M4 18h16"
                                                        ></path>
                                                 </svg>
                                          </label>
                                   </div>
                                   <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                            </div>
                            {/* Page content here */}
                            <Outlet />
                            {/* Page content here */}

                     </div>
                     <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-[#e4e6fe] text-base-content min-h-full w-80 p-4">
                                   {/* Sidebar content here */}


                                   <Link to='/' className="flex gap-2  items-center">
                                          <GiGraduateCap className="text-4xl text-primary" />
                                          <span className="text-2xl  text-primary font-extrabold">EduSync</span>
                                   </Link>


                                   {/* student route */}

                                   <li className="font-medium text-black border border-dashed border-gray-300">
                                          <NavLink to="/dashboard/myBookedSessions" className="flex items-center gap-2 px-2 py-1">
                                                 <FaBook className="text-[#3d53eb]" /> My Booked Sessions
                                          </NavLink>
                                   </li>

                                   <li className="font-medium text-black border border-dashed border-gray-300">
                                          <NavLink to="/dashboard/student-notes" className="flex items-center gap-2 px-2 py-1">
                                                 <FaRegStickyNote className="text-[#3d53eb]" /> Create Note
                                          </NavLink>
                                   </li>



                                   <li className="font-medium text-black border border-dashed border-gray-300">
                                          <NavLink to="/dashboard/manageNotes" className="flex items-center gap-2 px-2 py-1">
                                                 <FaStickyNote className="text-[#3d53eb]" /> Manage Notes
                                          </NavLink>
                                   </li>



                                   {/* tutor route */}

                                   <li className="font-medium text-black border border-dashed border-gray-300">
                                          <NavLink to="/createSession" className="flex items-center gap-2 px-2 py-1">
                                                 <FaPlusCircle className="text-[#3d53eb]" /> Create Study Session
                                          </NavLink>
                                   </li>

                                   <li className="font-medium text-black border border-dashed border-gray-300 hover:bg-gray-100 transition duration-200 rounded-md">
                                          <NavLink to="/dashboard/myStudySessions" className="flex items-center gap-2 px-2 py-1">
                                                 <FaBook className="text-[#3d53eb]" /> My Study Sessions
                                          </NavLink>
                                   </li>

                                   <li className="font-medium text-black border border-dashed border-gray-300 hover:bg-gray-100 transition duration-200 rounded-md">
                                          <NavLink to="/dashboard/myMaterials" className="flex items-center gap-2 px-2 py-1">
                                                 <FaFolderOpen className="text-[#3d53eb]" /> View Materials
                                          </NavLink>
                                   </li>


                                   {/* Admin route  */}

                                   {!roleLoading && role === 'admin' &&
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

                                          </>
                                   }



                            </ul>
                     </div>
              </div>
       );
};

export default DashboardLayout;