import { motion } from "framer-motion";
import { FaCreditCard, FaWallet, FaHistory } from "react-icons/fa";

export default function Payments() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-3xl mt-8 font-bold text-gray-800 text-center"
      >
        💳 <span className=""> Fees & Payments</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-600 text-center leading-relaxed max-w-2xl mx-auto"
      >
        EduSync ensures a <strong>secure, simple, and transparent</strong>{" "}
        payment process for both <span className="text-blue-600">students</span> and{" "}
        <span className="text-purple-600">tutors</span>.  
        Everything is designed to make transactions smooth, safe, and reliable.
      </motion.p>

      {/* Cards */}
      <div className="grid md:grid-cols-3  gap-8 mt-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-xl shadow-md bg-[#c3d6ee] text-gray-800"
        >
          <FaCreditCard size={40} className="mb-4 text-blue-700" />
          <h3 className="font-bold text-gray-800 text-xl mb-2">1. Tutor Fees</h3>
          <p>
            Tutors set their own fees per session. Prices are shown upfront
            before booking — no hidden charges or surprises.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-xl shadow-md bg-[#fcedea] text-gray-800"
        >
          <FaWallet size={40} className="mb-4 text-pink-600" />
          <h3 className="font-bold text-xl mb-2">2. Secure Payments</h3>
          <p>
            Payments are processed instantly through{" "}
            <span className="font-semibold">Stripe</span>, ensuring your
            financial data is always protected.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-xl shadow-md bg-[#e6f8f9] text-gray-800"
        >
          <FaHistory size={40} className="mb-4 text-green-600" />
          <h3 className="font-bold text-xl mb-2">3. Track History</h3>
          <p>
            Easily access your full payment history, receipts, and refunds in
            your personal dashboard at any time.
          </p>
        </motion.div>
      </div>

      {/* Extra Info Below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#e5eff9] p-6 rounded-xl text-gray-700 shadow-inner mt-8 text-center"
      >
        <h2 className="text-xl font-semibold mb-3">✨ Why Our System?</h2>
        <p className="max-w-3xl mx-auto">
          We believe payments should be the <strong>least of your worries</strong>.  
          That’s why EduSync provides a <span className="text-blue-600">hassle-free</span>{" "}
          experience where students can focus on learning and tutors can focus on teaching —  
          while we take care of the transactions.
        </p>
      </motion.div>
    </div>
  );
}
