import React from "react";
import { FaChalkboardTeacher, FaUsers, FaBookOpen, FaLock, FaComments } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section id="aboutUs" className="py-2 mb-16 ">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-xl roboto md:text-3xl font-bold text-gray-700 mb-4">
          About EduSync
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          EduSync is a collaborative learning platform connecting students and tutors for interactive study sessions, secure payments, personalized notes, and access to both free and premium classes. Built with modern technologies like React, Firebase, Express, MongoDB, and Stripe, EduSync makes learning seamless, engaging, and rewarding.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto">
        {/* Interactive Classes */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-4">
          <div className="text-[#f65d4e] text-4xl">
            <FaChalkboardTeacher />
          </div>
          <h3 className=" roboto font-semibold text-gray-800">Interactive Classes</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Join live sessions with tutors or access recorded classes. Learn at your own pace and interact with teachers for better understanding.
          </p>
        </div>

        {/* Students & Tutors */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-4">
          <div className="text-[#f65d4e] text-4xl">
            <FaUsers />
          </div>
          <h3 className="roboto font-semibold text-gray-800">Students & Tutors</h3>
          <p className="text-gray-600 text-sm md:text-base">
            A platform that bridges students and tutors. Tutors can upload classes and notes, while students can access a wide range of subjects and free content.
          </p>
        </div>

        {/* Study Materials */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-4">
          <div className="text-[#f65d4e] text-4xl">
            <FaBookOpen />
          </div>
          <h3 className="roboto font-semibold text-gray-800">Study Materials</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Access and share high-quality notes, study guides, and resources. Organize your learning materials easily and track your progress.
          </p>
        </div>

        {/* Secure Payments */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-4">
          <div className="text-[#f65d4e] text-4xl">
            <FaLock />
          </div>
          <h3 className="roboto font-semibold text-gray-800">Secure Payments</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Pay for premium sessions securely with Stripe integration. Your transactions are safe, transparent, and hassle-free.
          </p>
        </div>

        {/* Free & Premium Classes */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-4">
          <div className="text-[#f65d4e] text-4xl">
            <FaChalkboardTeacher />
          </div>
          <h3 className="roboto font-semibold text-gray-800">Free & Premium Classes</h3>
          <p className="text-gray-600 text-sm md:text-base">
            EduSync offers a combination of free and premium classes, so everyone can learn and improve regardless of their budget.
          </p>
        </div>

        {/* Personalized Notes */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-4">
          <div className="text-[#f65d4e] text-4xl">
            <FaComments />
          </div>
          <h3 className="roboto font-semibold text-gray-800">Personalized Notes</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Keep track of your personal notes, study summaries, and tutor feedback all in one place. Make learning organized and efficient.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
