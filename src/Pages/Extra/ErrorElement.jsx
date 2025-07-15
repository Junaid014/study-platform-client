import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { Link } from 'react-router';

const ErrorElement = () => {
    return (
        <div>
           
            <DotLottieReact className='h[700px] w-[1200px] mx-auto' 
      src="https://lottie.host/0a79ca35-988a-4092-9545-9e3655b8cfc8/AxNdsXTQu5.lottie"
      loop
      autoplay
    />
      <Link to="/" className='btn bg-gradient-to-r from-black to-gray-600 text-white w-[240px] font-medium shadow-md hover:from-black hover:to-gray-700 transition duration-300 flex mx-auto'>Go Back To HomePage</Link>
        </div>
    );
};

export default ErrorElement;