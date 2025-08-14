import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaCalendarAlt } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loading from '../Extra/Loading';

const AllStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: allApprovedSessions = [], isLoading } = useQuery({
    queryKey: ['allApprovedSessions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/study-sessions/approved');
      return res.data;
    },
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const now = new Date();
  const ongoingSessions = allApprovedSessions
    .filter(session => new Date(session.registrationEnd) >= now)
    .sort((a, b) => new Date(a.registrationEnd) - new Date(b.registrationEnd));

  const closedSessions = allApprovedSessions
    .filter(session => new Date(session.registrationEnd) < now)
    .sort((a, b) => new Date(a.registrationEnd) - new Date(b.registrationEnd));

  const sortedSessions = [...ongoingSessions, ...closedSessions];

  const getStatus = (registrationEnd) => {
    const regEnd = new Date(registrationEnd);
    return regEnd >= now ? 'Ongoing' : 'Closed';
  };

  // Pagination Logic
  const totalPages = Math.ceil(sortedSessions.length / itemsPerPage);
  const paginatedSessions = sortedSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation-name: fadeUp;
          animation-duration: 600ms;
          animation-fill-mode: forwards;
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>

      <div className="min-h-screen py-10 px-4 mb-10">
        <h2 className="text-4xl text-[#422ad5] font-semibold text-center roboto mb-10">All Available Study Sessions</h2>

        {isLoading ? (
          <div><Loading /></div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mx-auto">
              {paginatedSessions.map((session, index) => (
                <div
                  key={session._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between fade-up"
                  style={{ animationDelay: `${index * 300}ms` }}
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
                      Registration Ends: <span className='rounded-full font-semibold underline text-blue-500'>{formatDate(session.registrationEnd)}</span>
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
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center  mt-12 space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded text-sm cursor-pointer text-gray-700 hover:bg-blue-100 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 border rounded cursor-pointer text-sm ${currentPage === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-blue-100'
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded text-sm text-gray-700 cursor-pointer hover:bg-blue-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllStudySessions;
