import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Extra/Loading';
import { Link } from 'react-router';
import EmptyState from '../../Extra/EmptyState ';


const MyBookedSessions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookedSessions = [], isLoading } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked-sessions?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl px-16 py-10">
      <h2 className="text-3xl font-bold mt-5 text-center text-[#422ad5] mb-6">📚 My Booked Sessions</h2>

      {bookedSessions.length === 0 ? (
        <EmptyState
            icon="book2"
            title="No Booked Session"
            message="You haven't booked any sessions yet.."
          />
      ) : (
        <div className="grid md:grid-cols-2 gap-6 ">
  {bookedSessions.map((session) => (
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

      {/* Pushed to bottom */}
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

      )}
    </div>
  );
};

export default MyBookedSessions;
