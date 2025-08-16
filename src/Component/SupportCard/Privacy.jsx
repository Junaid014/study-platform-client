import { motion } from "framer-motion";
import { FaShieldAlt, FaUserLock, FaHandshake } from "react-icons/fa";

export default function Privacy() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-3xl mt-8 font-bold text-gray-800 text-center"
      >
        🔒 Safety & Privacy
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 text-center leading-relaxed max-w-2xl mx-auto"
      >
        At <strong>EduSync</strong>, your trust matters. We go beyond compliance 
        to ensure your <strong>data, privacy, and community safety</strong> are 
        our top priorities.
      </motion.p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-[#c3d6ee] to-[#e5eff9] rounded-xl text-gray-800 shadow-lg"
        >
          <FaShieldAlt size={40} className="mb-4 text-blue-600" />
          <h3 className="font-bold text-xl mb-2">1. Data Security</h3>
          <p>
            We use <strong>advanced encryption</strong> and follow 
            <strong> industry best practices</strong> to keep your personal 
            data safe at all times.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-[#fcedea] to-[#ffeaea] rounded-xl text-gray-800 shadow-lg"
        >
          <FaUserLock size={40} className="mb-4 text-pink-600" />
          <h3 className="font-bold text-xl mb-2">2. Privacy First</h3>
          <p>
            You are always in control. <strong>Your information is never sold</strong>, 
            and you decide what to share with others.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-[#e6f8f9] to-[#d8f3f5] rounded-xl text-gray-800 shadow-lg"
        >
          <FaHandshake size={40} className="mb-4 text-teal-600" />
          <h3 className="font-bold text-xl mb-2">3. Safe Community</h3>
          <p>
            We maintain <strong>strict community guidelines</strong> to 
            guarantee safe, respectful, and trustworthy interactions.
          </p>
        </motion.div>
      </div>

      {/* Extra content outside cards */}
      <div className="text-center mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">
          Why it matters 🚀
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          In today’s digital world, protecting your privacy is more important than ever.  
          By choosing EduSync, you’re joining a platform that values your 
          <strong> safety, transparency, and control</strong> above everything else.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Whether you are a student seeking guidance or a tutor sharing 
          knowledge, our systems are built to create a <strong>secure and trusted 
          learning environment</strong>.
        </p>
      </div>
    </div>
  );
}
