import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CreateStudySession = () => {
       const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      // Prepare payload including extra fields
      const payload = {
        ...data,
        status: 'pending',
        userName: user?.displayName || '',
        userEmail: user?.email || '',
      };

      const response = await axiosSecure.post('/study-sessions', payload);

      if (response.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Session Added',
          text: 'Your study session has been submitted successfully!',
          timer: 2000,
          showConfirmButton: false,
        });
       //  reset();
      } else {
        throw new Error('Failed to add session');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while adding the session!',
      });
      console.error(error);
    }
  };

       return (
              <div className="bg-[#fefefe] hover:bg-[#f9f9f9] shadow-lg rounded  px-14 pt-6 pb-8 w-full max-w-5xl mx-auto ">
                     <h2 className="text-3xl font-semibold roboto text-center mb-6">Add Study Session</h2>
                     <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Session Title */}
                            <div>
                                   <label className="label font-medium  mr-94">Session Title</label>
                                   <input {...register("title", { required: true })} className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full" placeholder="Session Title" />
                            </div>

                            {/* Tutor Name */}
                            <div>
                                   <label className="label font-medium mr-96">Tutor Name</label>
                                   <input value={user?.displayName} readOnly className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full bg-gray-100" {...register("tutorName")} />
                            </div>

                            {/* Tutor Email */}
                            <div>
                                   <label className="label font-medium mr-96">Tutor Email</label>
                                   <input value={user?.email} readOnly className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full bg-gray-100" {...register("tutorEmail")} />
                            </div>

                            {/* Image URL */}
                            <div>
                                   <label className="label font-medium mr-97">Image URL</label>
                                   <input {...register("image", { required: true })} className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full" placeholder="Image URL" />
                            </div>

                            {/* Registration Start Date */}
                            <div>
                                   <label className="label font-medium mr-94">Registration Start Date</label>
                                   <input type="date" {...register("registrationStart", { required: true })} className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full" />
                            </div>

                            {/* Registration End Date */}
                            <div>
                                   <label className="label font-medium mr-94">Registration End Date</label>
                                   <input type="date" {...register("registrationEnd", { required: true })} className="input focus:outline-none focus:ring-0 focus:border-gray-600 input-bordered bg-gray-100 w-full" />
                            </div>

                            {/* Class Start Date */}
                            <div>
                                   <label className="label font-medium mr-94">Class Start Date</label>
                                   <input type="date" {...register("classStart", { required: true })} className=" input focus:outline-none focus:ring-0 focus:border-gray-600 w-full input-bordered bg-gray-100 " />
                            </div>

                            {/* Class End Date */}
                            <div>
                                   <label className="label font-medium mr-94">Class End Date</label>
                                   <input type="date" {...register("classEnd", { required: true })} className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full" />
                            </div>

                            {/* Duration */}
                            <div>
                                   <label className="label font-medium mr-94">Session Duration</label>
                                   <input {...register("duration", { required: true })} className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full" placeholder="e.g. 4 Weeks" />
                            </div>

                            {/* Fee */}
                            <div>
                                   <label className="label font-medium mr-94">Registration Fee</label>
                                   <input type="number" value={0} readOnly className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full bg-gray-100" {...register("fee")} />
                            </div>

                           

                            {/* Description - full width */}
                            <div className="md:col-span-2">
                                   <label className="label font-medium mr-[766px]">Session Description</label>
                                   <textarea {...register("description", { required: true })} className="textarea textarea-bordered input focus:outline-none focus:ring-0 focus:border-gray-600 w-full" rows={4} placeholder="Describe the session in detail" />
                            </div>

                            <div className="md:col-span-2">
                                   <button type="submit" className="btn text-white rounded-lg font-medium shadow-md bg-gradient-to-r from-[#e6504e] to-[#ff605b] hover:bg-gradient-to-l hover:from-[#e6504e] hover:to-[#ff605b] transition duration-300 w-full mt-4">
                                          Submit Session
                                   </button>
                            </div>
                     </form>
              </div>
       );
};

export default CreateStudySession;