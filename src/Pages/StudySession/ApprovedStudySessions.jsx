import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaBook, FaCalendarAlt } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApprovedStudySessions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedSessions = [], isLoading } = useQuery({
    queryKey: ['approvedSessionsHome'],
    queryFn: async () => {
      const res = await axiosSecure.get('/study-sessions?status=approved&limit=20');
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

  // Filter only ongoing sessions (registrationEnd in the future)
  const ongoingSessions = approvedSessions.filter(session => {
    return new Date(session.registrationEnd) >= new Date();
  });

  const getStatus = (registrationEnd) => {
    const now = new Date();
    const regEnd = new Date(registrationEnd);
    return now < regEnd ? 'Ongoing' : 'Closed';
  };

  if (isLoading) {
    return null; // or your <Loading /> component if you have it
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center roboto mb-10">Available Study Sessions</h2>

      <div className="grid md:grid-cols-3 gap-12">
        {ongoingSessions.map((session, index) => (
          <div
            key={session._id}
            className="border border-blue-200 rounded-xl bg-[#fefefe] hover:shadow-xl transition duration-300 p-5 flex flex-col justify-between fade-slide-up"
            style={{ animationDelay: `${index * 400}ms` }}
          >
            <div>
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl text-start roboto font-semibold mb-1 text-gray-800">{session.title}</h3>
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
              <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700`}>
                Ongoing
              </span>
              <Link to={`/sessions/${session._id}`} className="text-blue-600 hover:underline text-sm font-medium">
                Read More
              </Link>
            </div>
          </div>
        ))}

        {ongoingSessions.length === 0 && (
          <p className="col-span-3 text-center text-gray-500 text-lg py-10">No ongoing study sessions available.</p>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/allStudySession"
          className="bg-[#e6504e] hover:bg-[#c7403e] text-white px-6 py-2 rounded-md text-sm font-medium shadow-md"
        >
          Show All Available Sessions
        </Link>
      </div>
    </div>
  );
};

export default ApprovedStudySessions;
