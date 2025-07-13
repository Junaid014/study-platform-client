import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaBook, FaCalendarAlt } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CustomButton from '../Extra/CustomButton';
import Loading from '../Extra/Loading';

const ApprovedStudySessions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedSessions = [], isLoading } = useQuery({
    queryKey: ['approvedSessions'],
   queryFn: async () => {
  const res = await axiosSecure.get('/study-sessions/approved');
  const filtered = res.data
    .filter(session => new Date(session.registrationEnd) >= new Date())
    .sort((a, b) => new Date(a.registrationEnd) - new Date(b.registrationEnd))
    .slice(0, 6); 
    

  return filtered;
}

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
  return <Loading />;
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#422ad5] text-center roboto mb-10">Available Study Sessions</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                Learn More
              </Link>
            </div>
          </div>
        ))}

        
      </div>
        <div className="flex justify-center mt-10">
        <CustomButton to="/allStudySession">
          Show All Available Sessions
        </CustomButton>
      </div>

      {ongoingSessions.length === 0 && (
         <Loading/>
        )}
      
    </div>
  );
};

export default ApprovedStudySessions;
