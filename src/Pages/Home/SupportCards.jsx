import React, { useRef } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaTwitter, FaWhatsapp, FaEnvelope, FaClock, FaQuestionCircle, FaWallet, FaShieldAlt } from "react-icons/fa";
import { motion, useInView } from "framer-motion";


const supportData = [
  {
    icon: <FaQuestionCircle size={50} />,
    title: 'Getting Started',
    description: 'Explore how to create an account, find study sessions, and begin your learning journey.',
    color: 'from-[#5f72be] to-[#9921e8]',
  },
  {
    icon: <FaWallet size={50} />,
    title: 'Fees & Payments',
    description: 'Understand tutor fees, how payment works, and track your payment history securely.',
    color: 'from-[#1cb5e0] to-[#000851]',
  },
  {
    icon: <FaShieldAlt size={50} />,
    title: 'Safety & Privacy',
    description: 'Learn how we protect your data and ensure secure interactions between tutors and students.',
    color: 'from-[#6a11cb] to-[#2575fc]',
  }
];

export const SupportCards = () => {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#422ad5] roboto">
        💡 How Can We Help You?
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {supportData.map((card, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-100px" });

          return (
            <motion.div
              ref={ref}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.3, ease: 'easeOut' }}
              className={`rounded-xl p-8 text-white shadow-lg bg-gradient-to-br ${card.color} hover:scale-[1.03] transition-transform duration-300`}
            >
              <div className="mb-4 flex justify-center text-white">{card.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-center">{card.title}</h3>
              <p className="text-sm text-center leading-relaxed">{card.description}</p>
            </motion.div>
          );
        })}
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
      className="bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-lg max-w-4xl mx-auto px-6 py-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#422ad5] mb-6 roboto">
        💬 Get in Touch With Us
      </h2>

      <div className="flex justify-between flex-col lg:flex-row gap-8 text-gray-700 text-base md:text-lg">
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
export const FeedbackForm = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h3 className="text-2xl font-semibold mb-6 text-center">Leave Us Your Feedback</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input type="text" placeholder="Name" className="input input-bordered w-full" required />
        <input type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
        <input type="text" placeholder="Subject" className="input input-bordered w-full" required />
        <textarea
          placeholder="Your message here"
          rows={4}
          className="textarea textarea-bordered md:col-span-2 w-full"
          required
        ></textarea>
        <div className="md:col-span-2 flex items-center gap-2">
          <input type="checkbox" className="checkbox" required />
          <span className="text-sm">I agree to the terms of data processing. <a href="#" className="text-blue-500 underline">Terms and Conditions</a></span>
        </div>
        <div className="md:col-span-2">
          <button className="btn bg-blue-600 text-white hover:bg-blue-700">Submit Feedback</button>
        </div>
      </form>
    </div>
  );
};
