// import React, { useState } from "react";

// const Home = () => {
//   const [hearts, setHearts] = useState([]);

//   const createHearts = () => {
//     const newHearts = [];

//     for (let i = 0; i < 25; i++) {
//       newHearts.push({
//         id: Math.random(),
//         left: Math.random() * 100,
//         delay: Math.random() * 0.5,
//         size: Math.random() * 20 + 10,
//       });
//     }

//     setHearts(newHearts);

//     // remove hearts after animation
//     setTimeout(() => {
//       setHearts([]);
//     }, 2000);
//   };

//   return (
//     <section className="relative overflow-hidden flex flex-col items-center pb-48 text-center text-sm text-white max-md:px-2 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-image-grain.png')] bg-cover bg-center font-poppins">
      
//       {/* ❤️ Hearts Container */}
//       <div className="pointer-events-none absolute inset-0">
//         {hearts.map((heart) => (
//           <span
//             key={heart.id}
//             className="absolute animate-float"
//             style={{
//               left: `${heart.left}%`,
//               bottom: "0px",
//               fontSize: `${heart.size}px`,
//               animationDelay: `${heart.delay}s`,
//             }}
//           >
//             ❤️
//           </span>
//         ))}
//       </div>

//       {/* Community Users */}
//       <div className="flex flex-wrap items-center justify-center p-1.5 mt-24 md:mt-28 rounded-full border border-slate-400 text-xs">
//         <div className="flex items-center">
//           <img
//             className="size-7 rounded-full border-2 border-white"
//             src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
//             alt=""
//           />
//           <img
//             className="size-7 rounded-full border-2 border-white -translate-x-2"
//             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
//             alt=""
//           />
//           <img
//             className="size-7 rounded-full border-2 border-white -translate-x-4"
//             src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
//             alt=""
//           />
//         </div>
//         <p className="-translate-x-2">Join community of 1m+ founders</p>
//       </div>

//       {/* Heading */}
//       <h1 className="font-berkshire text-[45px]/[52px] md:text-6xl/[65px] mt-6 max-w-4xl">
//         Empowering creators to build on their own terms.
//       </h1>

//       {/* Description */}
//       <p className="text-base mt-2 max-w-xl">
//         Flexible tools, thoughtful design and the freedom to build your way. No
//         limitations, no compromises.
//       </p>

//       <p className="text-base mt-3 md:mt-7 max-w-xl">
//         Secure your spot early and unlock our limited-time founding rate.
//       </p>

//       {/* Email Form */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           createHearts(); // ❤️ trigger animation
//         }}
//         className="flex items-center mt-8 max-w-lg h-16 w-full rounded-full border border-slate-50"
//       >
//         <input
//           type="email"
//           required
//           placeholder="Enter email address"
//           className="w-full h-full outline-none bg-transparent pl-6 pr-2 text-white placeholder:text-slate-300 rounded-full"
//         />
//         <button
//           type="submit"
//           className="bg-white text-slate-800 hover:bg-gray-300 text-nowrap px-8 md:px-10 h-12 mr-2 rounded-full font-medium transition"
//         >
//           Early access
//         </button>
//       </form>

//       {/* Animation CSS */}
//       <style>{`
//         @keyframes floatUp {
//           0% {
//             transform: translateY(0) scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-600px) scale(1.5);
//             opacity: 0;
//           }
//         }

//         .animate-float {
//           animation: floatUp 2s linear forwards;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Home;



import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [clicked, setClicked] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 700);
  };

  return (
    <>
      {/* Keyframe animations injected once — no other custom CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap');

        .font-serif-display { font-family: 'Instrument Serif', serif; }
        .font-body          { font-family: 'Manrope', sans-serif; }

        @keyframes rise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes blink {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.2; }
        }
        @keyframes scrollDraw {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 1; }
          49%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        @keyframes pop {
          0%   { transform: scale(1);    }
          25%  { transform: scale(0.93); }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1);    }
        }

        .anim-rise-1 { opacity: 0; animation: rise 0.55s 0.10s ease forwards; }
        .anim-rise-2 { opacity: 0; animation: rise 0.60s 0.22s ease forwards; }
        .anim-rise-3 { opacity: 0; animation: rise 0.60s 0.36s ease forwards; }
        .anim-rise-4 { opacity: 0; animation: rise 0.60s 0.48s ease forwards; }
        .anim-rise-5 { opacity: 0; animation: rise 0.60s 0.62s ease forwards; }

        .dot-blink   { animation: blink 2s infinite; }
        .scroll-bar  { animation: scrollDraw 1.8s ease-in-out infinite; }
        .btn-pop     { animation: pop 0.55s ease; }

        /* dot-grid via bg — Tailwind can't do this inline */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(15,15,13,0.14) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .spotlight {
          background: radial-gradient(
            600px circle at calc(var(--mx, 50) * 1%) calc(var(--my, 40) * 1%),
            rgba(15,15,13,0.055),
            transparent 70%
          );
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafaf8]"
      >
        {/* Dot grid background */}
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-60" />

        {/* Cursor spotlight */}
        <div
          className="spotlight absolute inset-0 pointer-events-none z-0"
          style={{ "--mx": mousePos.x, "--my": mousePos.y }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full">

          {/* Badge */}
          <div className="anim-rise-1 inline-flex items-center gap-2 border border-black/10 rounded-full px-4 py-1.5 mb-10">
            <span className="dot-blink w-[5px] h-[5px] rounded-full bg-[#888880] inline-block" />
            <span className="font-body text-[0.72rem] font-semibold tracking-[0.07em] uppercase text-[#888880]">
              Now in beta
            </span>
          </div>

          {/* Headline */}
          <h1 className="anim-rise-2 font-serif-display text-[#0f0f0d] leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 5.6rem)" }}>
            Build something
            <br />
            <em className="text-[#aaa9a3]">worth sharing.</em>
          </h1>

          {/* Subtitle */}
          <p className="anim-rise-3 font-body text-[#888880] text-[1rem] leading-[1.8] max-w-[400px] mt-6 mb-12">
            A clean, modern starting point for your next project.
            Fast by default, beautiful by design, and yours to shape.
          </p>

          {/* CTA Buttons */}
          <div className="anim-rise-4 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleClick}
              className={`
                font-body font-semibold text-[0.9rem]
                bg-[#0f0f0d] text-[#fafaf8]
                px-7 py-3.5 rounded-xl
                shadow-[0_2px_14px_rgba(0,0,0,0.18)]
                transition-all duration-150
                hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)]
                active:scale-95
                ${clicked ? "btn-pop" : ""}
              `}
            >
              {clicked ? "✓ Let's go!" : "Get Started →"}
            </button>

            <button
              className="
                font-body font-medium text-[0.9rem]
                text-[#888880] border border-black/10
                px-6 py-3.5 rounded-xl
                transition-all duration-150
                hover:text-[#0f0f0d] hover:border-black/25 hover:-translate-y-0.5
                active:scale-95
              "
            >
              Learn more
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="anim-rise-5 absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:flex hidden">
          <span className="font-body text-[0.67rem] font-semibold tracking-[0.1em] uppercase text-[#aaa9a3]">
            Scroll
          </span>
          <div
            className="scroll-bar w-px h-9"
            style={{ background: "linear-gradient(to bottom, #aaa9a3, transparent)" }}
          />
        </div>
      </section>
    </>
  );
}