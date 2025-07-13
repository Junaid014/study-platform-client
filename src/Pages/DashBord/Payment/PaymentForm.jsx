import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = ({ session }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

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
      setProcessing(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        sessionId: session._id,
        studentEmail: user.email,
        fee: session.fee,
        transactionId: result.paymentIntent.id,
        date: new Date(),
      };

      await axiosSecure.post('/payments', paymentInfo);

      Swal.fire('Success', 'Payment completed and session booked!', 'success');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow rounded bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Pay ${session.fee}</h2>
      <CardElement className="p-4 border rounded mb-4" />
      <button className="btn btn-primary w-full" type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default PaymentForm;
