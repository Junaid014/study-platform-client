import { motion } from "framer-motion";
import { FaUserPlus, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

export default function GettingStarted() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-3xl mt-8 font-bold text-gray-800 text-center"
      >
        🚀 Getting Started with EduSync
      </motion.h1>

      {/* Intro Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-600  text-center leading-relaxed max-w-3xl mx-auto"
      >
        Welcome to <strong>EduSync</strong> — your hub for collaborative learning.  
        Whether you’re a student exploring new skills or a tutor sharing expertise,  
        this guide will help you quickly set up your journey with confidence.
      </motion.p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-[#dbeafe] to-[#c3d6ee] rounded-xl text-gray-800 shadow-md"
        >
          <FaUserPlus size={40} className="mb-4 text-indigo-600" />
          <h3 className="font-bold text-xl mb-2">1. Create Your Account</h3>
          <p>
            Sign up using your email or Google account.  
            Your personal dashboard will give you access to sessions, payments, and notes.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-[#fff1f2] to-[#fcedea] rounded-xl text-gray-800 shadow-md"
        >
          <FaBookOpen size={40} className="mb-4 text-pink-600" />
          <h3 className="font-bold text-xl mb-2">2. Find Study Sessions</h3>
          <p>
            Browse sessions by category (Math, Science, Coding, etc.)  
            Check tutor profiles, availability, and ratings before you join.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-[#ecfdf5] to-[#e6f8f9] rounded-xl text-gray-800 shadow-md"
        >
          <FaChalkboardTeacher size={40} className="mb-4 text-teal-600" />
          <h3 className="font-bold text-xl mb-2">3. Join & Learn</h3>
          <p>
            Book your session, collaborate with tutors in real-time,  
            and access shared materials for a deeper learning experience.
          </p>
        </motion.div>
      </div>

      {/* Extra Section Outside Cards */}
      <div className="mt-16 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold text-center">✨ Tips for a Smooth Start</h2>
        <ul className="list-disc pl-6 max-w-3xl mx-auto space-y-3">
          <li>
            <strong>Complete Your Profile:</strong> Add a profile picture and short bio to help tutors
            understand your learning style.
          </li>
          <li>
            <strong>Check Notifications:</strong> Stay updated with new session invites, tutor responses, and reminders.
          </li>
          <li>
            <strong>Use Personal Notes:</strong> Keep track of what you learn by writing notes directly in your dashboard.
          </li>
          <li>
            <strong>Explore Resources:</strong> Many tutors share reading materials and practice exercises. Don’t miss them!
          </li>
        </ul>
      </div>

      {/* Closing Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#e5eff9] p-6 rounded-xl shadow-md text-center"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">You’re Ready to Begin 🎉</h3>
        <p className="text-gray-600">
          Start exploring sessions today and make the most of your EduSync journey.  
          Learning is just one click away!
        </p>
      </motion.div>
    </div>
  );
}
