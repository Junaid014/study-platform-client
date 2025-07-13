import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Extra/Loading';


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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-[#422ad5] mb-6">📚 My Booked Sessions</h2>

      {bookedSessions.length === 0 ? (
        <div className="text-center text-gray-500">You haven't booked any sessions yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookedSessions.map((session) => (
            <div key={session._id} className="border p-4 rounded shadow bg-white">
              <img src={session.image} alt={session.title} className="w-full h-40 object-cover rounded mb-3" />
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Tutor: {session.tutorName}</p>
              <p className="text-sm text-gray-600 mb-1">Duration: {session.duration}</p>
              <p className="text-sm text-gray-600 mb-1">Fee: {session.fee === '0' ? 'Free' : `$${session.fee}`}</p>
              <p className="text-sm text-gray-500 mt-2">{session.description.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedSessions;
