import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-20 bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white/70 font-[Poppins]">
      
      {/* Logo */}
      <svg
        width="157"
        height="40"
        viewBox="0 0 157 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* (SVG kept same) */}
        <path
          d="M47.904 28.28q-1.54 0-2.744-.644..."
          fill="#F5F5F5"
        />
      </svg>

      {/* Copyright */}
      <p className="mt-4 text-center text-sm">
        Copyright © 2025{" "}
        <a
          href="https://prebuiltui.com"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-white"
        >
          PrebuiltUI
        </a>
        . All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex items-center gap-4 mt-5">
        
        {/* Facebook */}
        <a href="#" className="hover:-translate-y-1 transition duration-300">
          <svg width="24" height="24" fill="none">
            <path
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Instagram */}
        <a href="#" className="hover:-translate-y-1 transition duration-300">
          <svg width="24" height="24" fill="none">
            <path
              d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
            />
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="#" className="hover:-translate-y-1 transition duration-300">
          <svg width="24" height="24" fill="none">
            <path
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4z"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
            />
          </svg>
        </a>

        {/* Twitter */}
        <a href="#" className="hover:-translate-y-1 transition duration-300">
          <svg width="24" height="24" fill="none">
            <path
              d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
            />
          </svg>
        </a>

        {/* GitHub */}
        <a href="#" className="hover:-translate-y-1 transition duration-300">
          <svg width="24" height="24" fill="none">
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;