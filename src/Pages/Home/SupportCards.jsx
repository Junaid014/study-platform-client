import React, { useRef } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaTwitter, FaWhatsapp, FaEnvelope, FaClock, FaQuestionCircle, FaWallet, FaShieldAlt } from "react-icons/fa";
import { motion, useInView } from "framer-motion";


const supportData = [
  {
    icon: <FaQuestionCircle size={50} />,
    title: "Getting Started",
    path: "/support/getting-started",
    description:
      "Explore how to create an account, find study sessions, and begin your learning journey.",
    color: "from-[#5f72be] to-[#9921e8]",
  },
  {
    icon: <FaWallet size={50} />,
    title: "Fees & Payments",
    path: "/support/payments",
    description:
      "Understand tutor fees, how payment works, and track your payment history securely.",
    color: "from-[#1cb5e0] to-[#000851]",
  },
  {
    icon: <FaShieldAlt size={50} />,
    title: "Safety & Privacy",
    path: "/support/privacy",
    description:
      "Learn how we protect your data and ensure secure interactions between tutors and students.",
    color: "from-[#6a11cb] to-[#2575fc]",
  },
];

export const SupportCards = () => {
  return (
    <div className="pb-14 w-11/12 mx-auto">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-12 text-gray-700 roboto">
        💡 How Can We Help You?
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {supportData.map((card, index) => (
          <Link key={card.title} to={card.path} aria-label={card.title} className="block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className={`rounded-xl p-8 text-white shadow-lg bg-gradient-to-br ${card.color} hover:scale-[1.03] transition-transform duration-300`}
            >
              <div className="mb-4 flex justify-center text-white">{card.icon}</div>
              <h3 className="md:text-2xl text-xl font-bold mb-2 text-center">{card.title}</h3>
              <p className="text-sm text-center leading-relaxed">{card.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Contact Info Section
export const ContactDetails = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-white mt-24 to-blue-50 rounded-xl border mb-28  transition-transform duration-300 hover:shadow-xl border-gray-200 shadow-lg max-w-4xl mx-auto px-6 py-10"
    >
      <h2 className="text-xl md:text-4xl font-bold text-center text-gray-700 mb-6 roboto">
        💬 Get in Touch With Us
      </h2>

      <div className="flex justify-between  flex-col lg:flex-row gap-8 text-gray-800 text-base md:text-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-[#e6504e]" />
            <p>
              <span className="font-semibold">Phone:</span> +1-202-555-0150, +1-202-555-0151
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-[#e6504e]" />
            <p>
              <span className="font-semibold">Email:</span> support@acadessessions.com
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaTwitter className="text-blue-500" />
            <p>
              <span className="font-semibold">Twitter:</span> @acadessessions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FaWhatsapp className="text-green-500" />
            <p>
              <span className="font-semibold">WhatsApp:</span> @whacadessessions
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-sm mt-10 text-gray-700 roboto">
        We’re always here to help. Contact us anytime!
      </p>
    </motion.div>
  );
};



// Feedback Form
import { useState } from 'react';
import Swal from 'sweetalert2';
import { MdEmail, MdOutlineSubject, MdPhone, MdFeedback } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import CustomButton from '../Extra/CustomButton';
import { Link } from 'react-router';

export const FeedbackForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.displayName || '',
    phone: '',
    subject: '',
    message: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'Your feedback has been submitted.',
      showConfirmButton: false,
      timer: 2000,
    });

    setFormData({
      email: user?.email || '',
      name: user?.displayName || '',
      phone: '',
      subject: '',
      message: '',
      agree: false,
    });
  };

  return (
    <div className='bg-white w-11/12 mx-auto rounded-2xl'>
<div className="max-w-4xl mx-auto px-4 py-10 mt-16 ">
      <h3 className="md:text-3xl text-xl font-bold  text-center text-gray-700 mb-8 flex justify-center items-center gap-2">
        <MdFeedback className="md:text-4xl text-2xl text-primary mt-1" />
        <p className=''> Leave Us Your Feedback</p>
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up transition-all duration-500"
      >
        <div className="relative">
          <MdEmail className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input focus:outline-none focus:ring-0 focus:border-gray-700 w-full pl-10"
            required
          />
        </div>

        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input focus:outline-none focus:ring-0 focus:border-gray-700 w-full pl-10"
            required
          />
        </div>

        <div className="relative">
          <MdPhone className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input focus:outline-none focus:ring-0 focus:border-gray-700 w-full pl-10"
            required
          />
        </div>

        <div className="relative">
          <MdOutlineSubject className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="input focus:outline-none focus:ring-0 focus:border-gray-700 w-full pl-10"
            required
          />
        </div>

        <textarea
          name="message"
          placeholder="Your message here..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="textarea textarea-bordered md:col-span-2 w-full"
          required
        ></textarea>

        <div className="md:col-span-2 flex items-start gap-2">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="checkbox mt-1"
            required
          />
          <span className="text-sm mt-1.5 text-gray-600">
            I agree to the terms of data processing.{' '}
            <a href="#" className="text-blue-600 underline">Terms and Conditions</a>
          </span>
        </div>

        <div className="md:col-span-2 text-center">
          <CustomButton
            type="submit"
            className="btn  text-white md:px-8 md:py-2 hover:shadow-xl"
          >
            Submit Feedback
          </CustomButton>
        </div>
      </form>
    </div>

    </div>
    
  );
};

