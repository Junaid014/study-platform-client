import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const DetailsStudySessions = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['studySession', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/study-sessions/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div>Loading session details...</div>;
  if (error) return <div>Error loading session: {error.message}</div>;
  if (!session) return <div>Session not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{session.title}</h1>
      <img src={session.image} alt={session.title} className="w-full h-60 object-cover rounded-md mb-4" />
      <p><strong>Tutor:</strong> {session.tutorName} ({session.tutorEmail})</p>
      <p><strong>Registration Period:</strong> {new Date(session.registrationStart).toLocaleDateString()} - {new Date(session.registrationEnd).toLocaleDateString()}</p>
      <p><strong>Class Period:</strong> {new Date(session.classStart).toLocaleDateString()} - {new Date(session.classEnd).toLocaleDateString()}</p>
      <p><strong>Duration:</strong> {session.duration}</p>
      <p><strong>Fee:</strong> {session.fee === "0" ? "Free" : `$${session.fee}`}</p>
      <p className="mt-4">{session.description}</p>
    </div>
  );
};

export default DetailsStudySessions;
