import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import DateFormatter from '../utils/dateFormatter';  // Adjust path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const { openSignIn, signOut } = useClerk();
  const { user, isLoaded } = useUser();
  
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const dateTime = DateFormatter.formatDateTime();
      const seconds = DateFormatter.formatTime();
      const timeWithSeconds = dateTime + ':' + seconds.slice(6, 8);
      setCurrentTime(timeWithSeconds);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <h1
           onClick={() => navigate('/')}
           className="text-xl font-bold tracking-wide">
            RouteCard System
          </h1>

          <ul className="flex space-x-6 font-medium">
            <li 
              onClick={() => navigate('/')}
              className="hover:text-yellow-300 cursor-pointer"
            >
              Dashboard
            </li>

            <li 
              onClick={() => navigate('/Routecard')}
              className="hover:text-yellow-300 cursor-pointer"
            >
              Route Cards
            </li>

             <li 
              onClick={() => navigate('/Draft')}
              className="hover:text-yellow-300 cursor-pointer"
            >
              Draft
            </li>

            <li className="hover:text-yellow-300 cursor-pointer">
              Machines
            </li>

            <li className="hover:text-yellow-300 cursor-pointer">
              Reports
            </li>
          </ul>

          <div className="flex items-center space-x-4">
            <div className="text-sm bg-blue-800 px-3 py-1 rounded font-mono">
              {currentTime}
            </div>

            {!isLoaded ? null : (
              <>
                {user ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <button
                    onClick={openSignIn}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
                  >
                    SignIn
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;