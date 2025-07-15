import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const Root = () => {
       return (
            <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content area that grows */}
      <div className="flex-grow pt-10">
        <Outlet />
      </div>

      <Footer />
    </div>
       );
};

export default Root;