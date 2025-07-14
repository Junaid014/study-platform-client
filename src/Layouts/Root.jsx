import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const Root = () => {
       return (
              <div>
                     <Navbar />
                     <div className='pt-16'>
                     <Outlet />
                     </div>
                     <Footer/>
              </div>
       );
};

export default Root;