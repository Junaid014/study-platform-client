import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaCalendarAlt } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loading from '../Extra/Loading';

const AllStudySessions = () => {
       const axiosSecure = useAxiosSecure();

       const { data: allApprovedSessions = [], isLoading } = useQuery({
              queryKey: ['allApprovedSessions'],
              queryFn: async () => {
                     const res = await axiosSecure.get('/study-sessions?status=approved');
                     return res.data;
              },
       });

       // Format date as DD/MM/YYYY
       const formatDate = (dateStr) => {
              const date = new Date(dateStr);
              const dd = String(date.getDate()).padStart(2, '0');
              const mm = String(date.getMonth() + 1).padStart(2, '0');
              const yyyy = date.getFullYear();
              return `${dd}/${mm}/${yyyy}`;
       };

       // Separate ongoing and closed sessions
       const now = new Date();
       const ongoingSessions = allApprovedSessions
              .filter(session => new Date(session.registrationEnd) >= now)
              .sort((a, b) => new Date(a.registrationEnd) - new Date(b.registrationEnd));

       const closedSessions = allApprovedSessions
              .filter(session => new Date(session.registrationEnd) < now)
              .sort((a, b) => new Date(a.registrationEnd) - new Date(b.registrationEnd));

       // Combine: ongoing first, closed after
       const sortedSessions = [...ongoingSessions, ...closedSessions];

       // Get status string
       const getStatus = (registrationEnd) => {
              const regEnd = new Date(registrationEnd);
              return regEnd >= now ? 'Ongoing' : 'Closed';
       };

       return (
              <>
                     <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-up {
          animation-name: fadeUp;
          animation-duration: 600ms;
          animation-fill-mode: forwards;
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>

                     <div className=" min-h-screen py-14 px-4">
                            <h2 className="text-3xl font-semibold text-center roboto mb-10">All Available Study Sessions</h2>

                            {isLoading ? (
                                   <div><Loading/></div>
                            ) : (
                                   <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                                          {sortedSessions.map((session, index) => (
                                                 <div
                                                        key={session._id}
                                                        className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between fade-up"
                                                        style={{ animationDelay: `${index * 300}ms` }} // 300ms delay per card stagger
                                                 >
                                                        <img
                                                               src={session.image}
                                                               alt={session.title}
                                                               className="w-full h-44 object-cover rounded-md mb-4"
                                                        />
                                                        <h3 className="text-xl font-semibold mb-2 text-start roboto text-gray-800">{session.title}</h3>

                                                        

                                                        <div className="text-sm text-gray-600 space-y-1">
                                                               <div className="flex items-center gap-2 mb-2 text-sm roboto text-gray-600 mt-2">
                                                                      <FaCalendarAlt className="text-blue-500" />
                                                                      Registration Ends: <span className='rounded-full   font-semibold underline text-blue-500'>{formatDate(session.registrationEnd)}</span>
                                                               </div>
                                                               <div className="flex items-center roboto gap-2 text-sm text-gray-600 mt-1">
                                                                      <FaBook className="text-blue-500" />
                                                                      Class Starts: <span className='font-semibold underline text-blue-500'>{formatDate(session.classStart)}</span>
                                                               </div>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-3">
                                                               <span
                                                                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatus(session.registrationEnd) === 'Ongoing'
                                                                                    ? 'bg-green-100 text-green-700'
                                                                                    : 'bg-red-100 text-red-700'
                                                                             }`}
                                                               >
                                                                      {getStatus(session.registrationEnd)}
                                                               </span>
                                                               <Link to={`/sessions/${session._id}`} className="text-blue-600 hover:underline text-sm font-medium">
                                                                      Read More
                                                               </Link>
                                                        </div>
                                                 </div>
                                          ))}
                                   </div>
                            )}
                     </div>
              </>
       );
};

export default AllStudySessions;
