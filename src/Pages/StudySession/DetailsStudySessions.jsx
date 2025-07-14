import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../../Pages/Extra/Loading';
import { FaCalendarAlt, FaClock, FaDollarSign, FaStar, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CustomButton from '../Extra/CustomButton';
import useAxios from '../../hooks/useAxios';

const DetailsStudySessions = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['studySession', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/study-sessions/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const isRegistrationClosed = (endDate) => new Date(endDate) < new Date();

  const calculateAverageRating = (reviews = []) => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    return (total / reviews.length).toFixed(1);
  };

  if (isLoading || roleLoading)
    return <div className="text-center py-10 text-gray-500"><Loading /> </div>;

  if (error) return <div className="text-center py-10 text-red-500">Error loading session</div>;
  if (!session) return <div className="text-center py-10 text-gray-500">Session not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-5">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img src={session.image} alt={session.title} className="w-full p-2 rounded-2xl h-96 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl text-start roboto font-semibold text-gray-800 mb-4">{session.title}</h1>
          <div className="grid roboto sm:grid-cols-2 gap-4 text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-500" />
              Tutor: {session.tutorName}
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Average Rating: <span className="font-semibold">{calculateAverageRating(session.reviews)} ⭐</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-500" />
              Registration Start: <span className='underline text-blue-500 font-semibold'> {formatDate(session.registrationStart)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-500" />
              Registration End: <span className='underline text-blue-500 font-semibold'>{formatDate(session.registrationEnd)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-indigo-500" />
              Class Start: {formatDate(session.classStart)}
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-pink-500" />
              Class End: {formatDate(session.classEnd)}
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-orange-500" />
              Duration: {session.duration}
            </div>
            <div className="flex items-center gap-2 ">
              <FaDollarSign className="text-green-600" />
              Fee: <span className='text-gray-700 bg-orange-300 rounded-2xl px-2'>{session.fee === '0' ? '0 $' : `$${session.fee}`}</span>
            </div>
          </div>

          <p className="text-gray-800 text-start roboto leading-relaxed  border-b pb-6 border-b-gray-300 border-dashed mb-6">{session.description}</p>

          {/* Booking Button Logic */}
         

{isRegistrationClosed(session.registrationEnd) ? (
  <button className="bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed" disabled>
    Registration Closed
  </button>
) : !user ? (
  <CustomButton
    onClick={() => {
      toast.info('Please log in to book this session');
      setTimeout(() => navigate('/auth/login', { state: location.pathname }), 1000);
    }}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
  >
    Book Now
  </CustomButton>
) : role !== 'student' ? (
  <CustomButton
    onClick={() => toast.warning('Only students can book sessions')}
    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
  >
    Book Now
  </CustomButton>
) : isBooked || session.bookedStudents?.includes(user.email) ? (
  <button
    className="bg-green-500 flex justify-start text-white px-4 roboto py-2 rounded-md cursor-not-allowed"
    disabled
  >
    Already Booked
  </button>
) : (
  <CustomButton
    onClick={async () => {
      if (session.fee === '0') {
        try {
          await axiosInstance.post('/payments', {
            sessionId: session._id,
            studentEmail: user.email,
            transactionId: 'FREE_BOOKING_' + new Date().getTime(),
            fee: 0,
          });
          toast.success('Free session booked successfully');
          setIsBooked(true); 
          setTimeout(() => navigate(`/dashboard/myBookedSessions`), 1000); 
        } catch (error) {
          console.error(error);
          toast.error('Failed to book session');
        }
      } else {
        navigate(`/payment/${session._id}`);
      }
    }}
    className="bg-blue-600 hover:bg-blue-700 flex justify-start text-white px-6 py-2 rounded-md"
  >
    Book Now
  </CustomButton>
)}


          {/* ✅ Review Section */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-left roboto border-t border-t-gray-300 border-dashed pt-4 mb-4">Reviews :</h3>
            {session.reviews?.length ? (
              <>
                <div className="space-y-4">
                  {(showAllReviews ? session.reviews : session.reviews.slice(0, 1)).map((review, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                      {/* Left: Rating */}
                      <div className="text-yellow-500 font-semibold min-w-[80px] text-sm mb-2 md:mb-0">
                        {review.rating} ⭐
                      </div>

                      {/* Center: Review Text */}
                      <div className="flex-1 px-4">
                        <p
                          className="text-gray-800 text-sm italic roboto hover:-translate-y-1 transition-transform duration-200"
                          title="Click to see more"
                        >
                          “{review.comment}”
                        </p>
                      </div>

                      {/* Right: Student Email */}
                      <div className="text-right text-sm text-gray-500 min-w-[180px]">
                        {review.studentEmail}
                        <div className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Toggle Show More */}
                {session.reviews.length > 1 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setShowAllReviews((prev) => !prev)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {showAllReviews ? 'Show Less Reviews' : `Show ${session.reviews.length - 1} More Review(s)`}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-600 roboto text-sm text-start">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsStudySessions;
