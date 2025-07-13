import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Loading from '../../../Extra/Loading';
import { FaUser, FaClock, FaDollarSign, FaStar, FaCalendarAlt } from 'react-icons/fa';
import CustomButton from '../../../Extra/CustomButton';

const BookedSessionDetailsWithReview = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('5');
  const [submitted, setSubmitted] = useState(false);

  const { data: session, isLoading } = useQuery({
    queryKey: ['bookedSessionDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/study-sessions/${id}`);
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

  const hasAlreadyReviewed = session?.reviews?.some(
    (r) => r.studentEmail === user.email
  );

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const review = {
      studentEmail: user.email,
      rating: parseInt(rating),
      comment,
      date: new Date(),
    };

    await axiosSecure.post(`/reviews/${id}`, review);
    Swal.fire('Success', 'Review submitted!', 'success');
    setSubmitted(true);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img src={session.image} alt={session.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-start roboto text-gray-800">{session.title}</h1>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-500" />
              Tutor: {session.tutorName}
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Average Rating: <span className="font-semibold">4.5</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-orange-500" />
              Duration: {session.duration}
            </div>
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-green-600" />
              Fee: <span className="text-gray-700 bg-orange-300 rounded-2xl px-2">{session.fee === '0' ? 'Free' : `$${session.fee}`}</span>
            </div>
            <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-indigo-500" />
                          Class Start: {formatDate(session.classStart)}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-pink-500" />
                          Class End: {formatDate(session.classEnd)}
                        </div>
          </div>
          <p className="text-gray-800 leading-relaxed mb-6 text-start">{session.description}</p>

          {!hasAlreadyReviewed && !submitted ? (
            <form onSubmit={handleSubmitReview} className="mt-6 border-t pt-4">
              <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
              <textarea
                required
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="textarea textarea-bordered w-full mb-3"
              ></textarea>
              <select
                className="select select-bordered w-full mb-3"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="1">⭐️</option>
              </select>
              <CustomButton type="submit" className="btn  w-full">Submit Review</CustomButton>
            </form>
          ) : (
            <p className="text-green-600 mt-4 font-semibold">✅ You’ve already reviewed this session.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedSessionDetailsWithReview;
