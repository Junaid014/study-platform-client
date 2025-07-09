import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaBook, FaCalendarAlt, FaClock, FaLock } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApprovedStudySessions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedSessions = [] } = useQuery({
    queryKey: ['approvedSessionsHome'],
    queryFn: async () => {
      const res = await axiosSecure.get('/study-sessions?status=approved&limit=6');
      return res.data;
    },
  });

  const getStatus = (registrationEnd) => {
    const now = new Date();
    const regEnd = new Date(registrationEnd);
    return now < regEnd ? 'Ongoing' : 'Closed';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center mb-10">Available Study Sessions</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {approvedSessions.map(session => (
          <div key={session._id} className="border border-gray-200 rounded-xl bg-[#fefefe] hover:shadow-xl transition duration-300 p-5 flex flex-col justify-between">
            <div>
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-1 text-gray-800">{session.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <FaCalendarAlt className="text-gray-500" />
                Registration Ends: {new Date(session.registrationEnd).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FaBook className="text-gray-500" />
                Class Starts: {new Date(session.classStart).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatus(session.registrationEnd) === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {getStatus(session.registrationEnd)}
              </span>
              <Link to={`/sessions/${session._id}`} className="text-blue-600 hover:underline text-sm font-medium">
                Read More
              </Link>
            </div>
          </div>
        ))}
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
