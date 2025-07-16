import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Extra/Loading';
import { Link } from 'react-router';
import EmptyState from '../../Extra/EmptyState ';
import { useState } from 'react';

const sessionsPerPage = 2;

const MyBookedSessions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookedSessions = [], isLoading } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked-sessions?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Pagination calculations
  const totalPages = Math.ceil(bookedSessions.length / sessionsPerPage);
  const startIndex = (currentPage - 1) * sessionsPerPage;
  const currentSessions = bookedSessions.slice(startIndex, startIndex + sessionsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-5xl px-10 lg:pl-20 py-10">
      <h2 className="text-3xl font-bold mt-5 text-center text-[#422ad5] mb-6">📚 My Booked Sessions</h2>

      {bookedSessions.length === 0 ? (
        <EmptyState
          icon="book2"
          title="No Booked Session"
          message="You haven't booked any sessions yet.."
        />
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {currentSessions.map((session) => (
              <div
                key={session._id}
                className="flex px-6 flex-col h-full border roboto border-blue-100 fade-slide-up hover:shadow-xl transition duration-300 p-4 rounded shadow bg-white"
              >
                <img
                  src={session.image}
                  alt={session.title}
                  className="w-full h-52 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold roboto">Title: {session.title}</h3>
                <p className="text-gray-700 mb-1">Tutor: {session.tutorName}</p>
                <p className="text-sm text-gray-700 mb-1">Duration: {session.duration}</p>
                <p className="text-sm text-gray-700 mb-1">
                  Fee: {session.fee === '0' ? 'Free' : `$${session.fee}`}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {session.description.slice(0, 100)}...
                </p>

                <div className="flex justify-between items-center mt-auto pt-4">
                  <Link
                    to={`/myBookedSessions/details/${session._id}`}
                    className="underline text-blue-500"
                  >
                    Show Details
                  </Link>
                  <Link
                    to={`/myBookedSessions/materials/${session._id}`}
                    className="underline text-green-600"
                  >
                    View Materials
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 space-x-2">
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
                className={`px-3 py-1 border rounded cursor-pointer text-sm ${
                  currentPage === i + 1
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
  );
};

export default MyBookedSessions;
