import { FaFacebookF, FaTwitter, FaGoogle, FaGraduationCap } from 'react-icons/fa';
import { GiGraduateCap } from 'react-icons/gi';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {/* Logo & Description */}
        <div className="space-y-3 flex flex-col justify-start">
          <Link to='/' className="flex gap-2  items-center">
                      <GiGraduateCap className="text-4xl text-primary" />
                      <span className="text-2xl  text-primary font-extrabold">EduSync</span>
                    </Link>
          <p className="text-sm text-start text-blue-100 leading-relaxed">
            Empowering collaborative learning. Discover study sessions, connect with tutors, and level up your education with EduSync.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link to="/allStudySession" className="hover:underline">Browse Sessions</Link></li>
            <li><Link to="/dashboard/myBookedSessions" className="hover:underline">My Bookings</Link></li>
            <li><Link to="/dashboard/createNotes" className="hover:underline">Upload Notes</Link></li>
            <li><Link to="/dashboard/manageNotes" className="hover:underline">Manage Notes</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Resources</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link to="/#" className="hover:underline">About Us</Link></li>
            <li><Link to="/#" className="hover:underline">Contact Support</Link></li>
            <li><Link to="/#" className="hover:underline">FAQs</Link></li>
            <li><Link to="/#" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Connect with Us</h4>
          <div className="flex gap-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-[#3d53eb] p-2 rounded-full hover:bg-blue-100">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white text-[#3d53eb] p-2 rounded-full hover:bg-blue-100">
              <FaTwitter />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="bg-white text-[#3d53eb] p-2 rounded-full hover:bg-blue-100">
              <FaGoogle />
            </a>
          </div>
          <p className="text-sm text-blue-100">Stay connected for updates and tips!</p>
        </div>
      </div>

      <div className="border-t border-blue-300 mt-10 pt-4 text-center text-blue-100 text-sm">
        &copy; {new Date().getFullYear()} EduSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
