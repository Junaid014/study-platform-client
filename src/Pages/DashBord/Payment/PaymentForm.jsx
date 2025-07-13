import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import CustomButton from '../../Extra/CustomButton';

const PaymentForm = ({ session }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        price: session.fee,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email,
          },
        },
      });

      if (result.error) {
        Swal.fire('Error', result.error.message, 'error');
      } else if (result.paymentIntent.status === 'succeeded') {
        const paymentInfo = {
          sessionId: session._id,
          studentEmail: user.email,
          fee: session.fee,
          transactionId: result.paymentIntent.id,
          date: new Date(),
        };

        await axiosSecure.post('/payments', paymentInfo);

        setPaid(true);
        Swal.fire('Success', 'Payment completed and session booked!', 'success');
        navigate('/dashboard/myBookedSessions');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong with payment', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-lg border border-gray-200 rounded bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center roboto text-[#422ad5]">Pay ${session.fee}</h2>
      <CardElement className="p-4 border rounded mb-4" />
      <CustomButton
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        disabled={!stripe || processing || paid}
      >
        {processing ? 'Processing...' : paid ? 'Paid' : 'Pay Now'}
      </CustomButton>
    </form>
  );
};

export default PaymentForm;
