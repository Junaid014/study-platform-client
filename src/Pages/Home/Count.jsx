import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaUsers, FaChartLine } from 'react-icons/fa';

const Count = () => {
       const [ref, inView] = useInView({ triggerOnce: true });

       const stats = [
              {
                     count: 1200,
                     label: 'Registered Students',
                     duration: 5,
                     icon: <FaUserGraduate className="text-7xl text-blue-600 mb-4" />,
              },
              {
                     count: 350,
                     label: 'Published Courses',
                     duration: 6,
                     icon: <FaBookOpen className="text-7xl text-green-600 mb-4" />,
              },
              {
                     count: 85,
                     label: 'Expert Tutors',
                     duration: 5,
                     icon: <FaChalkboardTeacher className="text-7xl text-orange-500 mb-4" />,
              },
              {
                     count: 97,
                     label: 'Success Rate (%)',
                     duration: 4,
                     icon: <FaChartLine className="text-7xl text-purple-600 mb-4" />,
              },
       ];

       return (
              <div className='w-11/12 mx-auto  '>

                     <div className="text-center mt-10 mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-3 roboto">
                                   Platform Achievements at a Glance
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto  roboto">
                                   We take pride in the growth of our study platform. Here’s a quick look at some of our key achievements that reflect the impact we're making in education.
                            </p>
                     </div>
                     <div ref={ref} className='mb-24 border rounded-2xl bg-gradient-to-br from-[#eff1f5] via-[#f4f6ff] to-[#e9eeff] border-[#b4bdb266]  grid md:grid-cols-4 grid-cols-1 lg:gap-10'>
                            {stats.map((item, idx) => (
                                   <div key={idx} className='w-11/12 mx-auto p-10 text-center'>
                                          <div className="flex justify-center mb-3">
                                                 {item.icon}
                                          </div>

                                          <div className="flex text-4xl items-center justify-center font-extrabold mt-2">
                                                 {inView ? (
                                                        <CountUp className='font-extrabold text-black text-7xl' end={item.count} duration={item.duration} start={0} />
                                                 ) : (
                                                        0
                                                 )}
                                                 <p className='text-primary text-3xl font-bold'>+</p>
                                          </div>

                                          <h2 className='text-primary text-lg roboto mt-4 font-semibold'>{item.label}</h2>
                                   </div>
                            ))}
                     </div>
              </div>
       );
};

export default Count;
