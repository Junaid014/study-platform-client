import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import EmptyState from '../../Extra/EmptyState ';

const PendingStudySessions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: sessions = [], refetch } = useQuery({
    queryKey: ['pendingSessions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/study-sessions');
      return res.data.filter(session => session.status === 'pending');
    }
  });

  const handleApproveWithFee = async (session) => {
    const { value: isFree } = await Swal.fire({
      title: 'Is the session free or paid?',
      input: 'radio',
      inputOptions: {
        free: 'Free',
        paid: 'Paid'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose one!';
        }
      }
    });

    if (!isFree) return;

    let fee = '0';

    if (isFree === 'paid') {
      const { value: enteredFee } = await Swal.fire({
        title: 'Enter the session fee',
        input: 'number',
        inputAttributes: {
          min: 1
        },
        inputValidator: (value) => {
          if (!value || value < 1) return 'Please enter a valid amount';
        }
      });

      if (!enteredFee) return;
      fee = enteredFee;
    }

    try {
      const res = await axiosSecure.patch(`/study-sessions/${session._id}`, {
        status: 'approved',
        email: session.userEmail,
        fee,
      });

      if (res.data.success) {
        Swal.fire('Success', `Session approved successfully`, 'success');
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  const handleReject = async (session) => {
    const { value: formValues } = await Swal.fire({
      title: 'Reject Session',
      html:
        '<input id="swal-reason" class="swal2-input" placeholder="Rejection Reason">' +
        '<textarea id="swal-feedback" class="swal2-textarea" placeholder="Additional Feedback"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit Rejection',
      preConfirm: () => {
        const reason = document.getElementById('swal-reason').value.trim();
        const feedback = document.getElementById('swal-feedback').value.trim();

        if (!reason) {
          Swal.showValidationMessage('Rejection reason is required');
          return false;
        }

        return { reason, feedback };
      }
    });

    if (!formValues) return;

    try {
      const res = await axiosSecure.patch(`/study-sessions/${session._id}`, {
        status: 'rejected',
        email: session.userEmail,
        rejectionReason: formValues.reason,
        feedback: formValues.feedback
      });

      if (res.data.success) {
        Swal.fire('Rejected', `Session rejected successfully`, 'success');
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="lg:max-w-7xl mx-auto lg:px-8 py-8">
      <h2 className="md:text-3xl text-xl font-bold md:mb-8 mt-10 text-center roboto text-[#f65d4e]">
        ⏳ Pending Study Sessions
      </h2>

      {sessions.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No Pending Sessions"
          message="Your pending sessions will appear here once submitted."
        />
      ) : (
       <div className="lg:max-w-7xl mx-auto lg:px-8 py-8">
 

  {sessions.length === 0 ? (
    <EmptyState
      icon="calendar"
      title="No Pending Sessions"
      message="Your pending sessions will appear here once submitted."
    />
  ) : (
    <div className="overflow-x-auto shadow-md py-2 px-2 rounded-lg bg-white">
      <table className="table-auto w-full text-sm md:text-base">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-2 py-1">#</th>
            <th className="px-2 py-1">Title</th>
            <th className='hidden md:table-cell px-2 py-1'>Tutor</th>
            <th className='hidden md:table-cell px-2 py-1'>Duration</th>
            <th className="px-2 py-1">Fee</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={session._id}>
              <td className="px-2 py-1">{index + 1}</td>
              <td className="px-2 py-1">
                <span className="md:text-base text-xs font-medium">{session.title}</span>
                {/* ছোট স্ক্রিনে tutor + duration compact view */}
                <div className="block md:hidden text-xs text-gray-500 mt-1">
                  {session.tutorName} ({session.tutorEmail}) - {session.duration}
                </div>
              </td>
              <td className='hidden md:table-cell px-2 py-1'>
                <p className="font-medium">{session.tutorName}</p>
                <p className="text-sm text-gray-500">{session.tutorEmail}</p>
              </td>
              <td className='hidden md:table-cell px-2 py-1'>{session.duration}</td>
              <td className='px-2 py-1 roboto'>
                $<span className='px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700'>{session.fee}</span>
              </td>
              <td className="px-2 py-1 flex flex-col gap-1 md:flex-row md:gap-2">
                <button
                  onClick={() => handleApproveWithFee(session)}
                  className="btn btn-xs md:btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(session)}
                  className="btn btn-xs md:btn-sm bg-red-500 hover:bg-red-600 text-white"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

      )}
    </div>
  );
};

export default PendingStudySessions;
