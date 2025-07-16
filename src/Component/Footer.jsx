import { SiFacebook } from 'react-icons/si';
import {  FaXTwitter } from 'react-icons/fa6';
import {  IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io5';
import { GiGraduateCap } from 'react-icons/gi';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full text-white pt-10 pb-6 px-6">
      <div className="w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {/* Logo & Description */}
        <div className="space-y-3 flex flex-col">
          <Link to='/' className="flex gap-2 justify-center lg:justify-start items-center">
                      <GiGraduateCap className="text-4xl text-primary" />
                      <span className="text-2xl  text-primary font-extrabold">EduSync</span>
                    </Link>
          <p className="text-sm text-center lg:text-start text-blue-100 leading-relaxed">
            Empowering collaborative learning. Discover study sessions, connect with tutors, and level up your education with EduSync.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-lg text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link to="/allStudySession" className="hover:underline">Browse Sessions</Link></li>
            <li><Link to="/dashboard/myBookedSessions" className="hover:underline">My Bookings</Link></li>
            <li><Link to="/dashboard/createNotes" className="hover:underline">Upload Notes</Link></li>
            <li><Link to="/dashboard/manageNotes" className="hover:underline">Manage Notes</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3 text-lg text-white">Resources</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link to="/#" className="hover:underline">About Us</Link></li>
            <li><Link to="/#" className="hover:underline">Contact Support</Link></li>
            <li><Link to="/#" className="hover:underline">FAQs</Link></li>
            <li><Link to="/#" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h4 className="font-semibold text-lg mb-5 text-white">Connect with Us</h4>
          <div className="flex gap-4 mb-4 cursor-pointer">

                        <p className=' '>
                            <a href="https://x.com/"><SiFacebook className="text-white text-3xl" /></a>
                        </p>
                        <p className='  '>
                            <a href="https://x.com/"><FaXTwitter className="text-white text-3xl" /></a>
                        </p>
                        <p className='  '>
                            <a href="https://x.com/"><IoLogoLinkedin className="text-white text-3xl" /></a>
                        </p>
                        <p className=' '>
                            <a href="https://x.com/"><IoLogoYoutube className="text-white text-3xl" /></a>
                        </p>


                    </div>
          <p className="text-sm mt-4 text-blue-100">Stay connected for updates and tips!</p>
        </div>
      </div>

      <div className="border-t  border-blue-300 mt-10 pb-11 lg:mx-44 pt-4 text-center text-blue-100 text-sm">
        &copy; {new Date().getFullYear()} EduSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
