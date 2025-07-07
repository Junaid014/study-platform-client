import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
       return (
              <div>
                     <Navbar />
                     <div className='pt-16'>
                     <Outlet />
                     </div>
              </div>
       );
};

export default Root;