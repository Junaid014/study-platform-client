// import React from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import { FiFolder } from "react-icons/fi";

// const PendingStudySessions = () => {
//        const axiosSecure = useAxiosSecure();

//        const { data: sessions = [], refetch } = useQuery({
//               queryKey: ['pendingSessions'],
//               queryFn: async () => {
//                      const res = await axiosSecure.get('/study-sessions');
//                      return res.data.filter(session => session.status === 'pending');
//               }
//        });

//        const handleStatusUpdate = async (session, newStatus) => {
//               const confirm = await Swal.fire({
//                      title: `Are you sure?`,
//                      text: `You are about to ${newStatus} this session.`,
//                      icon: 'warning',
//                      showCancelButton: true,
//                      confirmButtonText: 'Yes, proceed!',
//               });

//               if (!confirm.isConfirmed) return;

//               try {
//                      const res = await axiosSecure.patch(`/study-sessions/${session._id}`, {
//                             status: newStatus,
//                             email: session.userEmail
//                      });

//                      if (res.data.success) {
//                             Swal.fire('Success', `Session ${newStatus}ed successfully`, 'success');
//                             refetch();
//                      }
//               } catch (error) {
//                      console.error(error);
//                      Swal.fire('Error', 'Something went wrong', 'error');
//               }
//        };

//        return (
//   <div className="max-w-6xl mx-auto px-4 py-8">
//     <h2 className="text-3xl font-bold mb-8 text-center roboto text-[#e6504e]">⏳ Pending Study Sessions</h2>


//     {sessions.length === 0 ? (
//       <div className="flex flex-col items-center justify-center text-gray-600 border border-[#3d53eb] m-6 p-24 rounded-lg bg-gray-50 shadow-sm">
//         <FiFolder className="text-5xl  text-[#3d53eb] mb-3" />
//         <p className="text-xl roboto font-semibold">No pending sessions found</p>
//         <p className="text-sm roboto text-gray-500 mt-2">Pending sessions will appear here once available.</p>
//       </div>
//     ) : (
//       <div className="overflow-x-auto shadow-md px-2 py-4 rounded-lg  bg-white">
//         <table className="table w-full">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th>#</th>
//               <th>Title</th>
//               <th>Tutor</th>
//               <th>Duration</th>
//               <th>Fee</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sessions.map((session, index) => (
//               <tr key={session._id}>
//                 <td>{index + 1}</td>
//                 <td>{session.title}</td>
//                 <td>
//                   <p className="font-medium">{session.tutorName}</p>
//                   <p className="text-sm text-gray-500">{session.tutorEmail}</p>
//                 </td>
//                 <td>{session.duration}</td>
//                 <td className='roboto'>$ <span className='px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700'>{session.fee}</span></td>
//                 <td className="flex gap-2">
//                   <button
//                     onClick={() => handleStatusUpdate(session, 'approved')}
//                     className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleStatusUpdate(session, 'rejected')}
//                     className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}
//   </div>
// );


// };

// export default PendingStudySessions;







import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiFolder } from "react-icons/fi";
import EmptyState from '../../Extra/EmptyState ';

const PendingStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState(null);

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
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to reject this session.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/study-sessions/${session._id}`, {
        status: 'rejected',
        email: session.userEmail
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center roboto text-[#e6504e]">⏳ Pending Study Sessions</h2>

      {sessions.length === 0 ? (
         <EmptyState
    icon="calendar"
    title="No Pending Sessions"
    message="Your pending sessions will appear here once submitted."
  />
      ) : (
        <div className="overflow-x-auto shadow-md px-2 py-4 rounded-lg  bg-white">
          <table className="table w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Tutor</th>
                <th>Duration</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={session._id}>
                  <td>{index + 1}</td>
                  <td>{session.title}</td>
                  <td>
                    <p className="font-medium">{session.tutorName}</p>
                    <p className="text-sm text-gray-500">{session.tutorEmail}</p>
                  </td>
                  <td>{session.duration}</td>
                  <td className='roboto'>$ <span className='px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700'>{session.fee}</span></td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleApproveWithFee(session)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(session)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
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
  );
};

export default PendingStudySessions;
