import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import PaymentForm from './PaymentForm';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Extra/Loading';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['singleSession', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/study-sessions/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (error || !session) return <p className="text-center text-red-500">Failed to load session data</p>;

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm session={session} />
    </Elements>
  );
};

export default Payment;
