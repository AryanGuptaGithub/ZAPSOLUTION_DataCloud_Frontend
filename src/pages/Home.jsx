// Home.jsx
import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation for letters
const letterVariant = {
  hidden: { y: -50, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05, // stagger each letter
      type: "spring",
      stiffness: 100,
    },
  }),
};

function Home() {
  const heading = "Power up your business with datacloud";
  const subtext =
    "Empower your business with cloud storage designed for speed & safety with effortless data control";

  return (
    <>
      <main>
<div
  className="relative min-h-screen flex items-center justify-center overflow-hidden
  [background:radial-gradient(circle_at_bottom,_#BBAAE1_0%,_#8977B3_30%,_#2B2A41_45%,_#1F2134_70%,_#191B2A_100%)]"
>
  {" "}

        {/* Text Section */}
        <div className="absolute top-0 left-32  text-white z-20 max-w-lg max-h-ms">
          <div className=" flex items-center ">
            <img
              src="/image 63.png" // 👉 replace with your logo path
              alt="Logo"
              className="w-34 h-34 ml-40 object-cover drop-shadow-lg"
            />
          </div>
          <h1 className="text-5xl text-center font-extrabold leading-snug mb-4 max-w-89 flex flex-wrap">
            {heading.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <p className="text-lg text-gray-200 max-w-88 flex flex-wrap">
            {subtext.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i} // same i index (not offset)
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </p>

    <Link
  to="/login"
  className="relative inline-block px-8 py-3 font-semibold text-slate-100 bg-slate-800 rounded-xl shadow-[0_4px_0_0_#1e293b] group overflow-hidden 
             transition-all duration-300 ease-out"
>
  <span className="relative z-10">Get Started</span>

  {/* sweeping shine */}
  <span className="absolute inset-0 bg-gradient-to-r from-pink-500/70 to-purple-500/70 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-xl"></span>

  {/* glow aura */}
  <span className="absolute inset-0 rounded-xl ring-2 ring-pink-400/50 opacity-0 group-hover:opacity-100 blur-md transition duration-500"></span>

  {/* pressed effect shadow */}
  <span className="absolute inset-0 rounded-xl shadow-[inset_0_2px_6px_rgba(255,255,255,0.2)]"></span>

  {/* lift effect on hover */}
  <span className="absolute inset-0 rounded-xl group-hover:translate-y-[-2px] group-hover:shadow-[0_6px_15px_rgba(236,72,153,0.6)] transition-all duration-300"></span>
</Link>



        </div>

        {/* Hero GIF Media */}
        <div className="flex absolute left-120 top-27 items-center justify-center w-full h-full">
          <motion.img
            src="/hero.png" // 👉 replace with your gif path
            alt="Hero Media"
            className="max-w-xl w-full object-contain drop-shadow-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        
   {/* 🔵 Blob 1 with external GIF */}
<div className="absolute bottom-20 left-40 w-80 h-80 z-10">
  <img
    src="https://cdn-icons-png.flaticon.com/11257/11257103.gif" // replace with actual GIF link
    alt="Blob 1"
    className="w-full h-full object-cover"
    // style={{
    //   clipPath:
    //     "path('M68,-28.1C75.3,-4.7,60.7,25.1,40.9,42.5C21.2,59.8,-3.7,64.8,-27.3,52.6C-50.9,40.3,-73.3,10.9,-65.4,-14.6C-57.5,-40.1,-19.4,-61.7,13.8,-64.4C47.1,-67.1,74.6,-51.5,68,-28.1Z')",
    // }}
  />
</div>

{/* 🟣 Blob 2 with placeholder GIF */}
<div className="absolute top-10 right-40 w-72 h-72 z-10">
  <img
    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjF4MTVvYjh0NWhqM2RkZ21zeHp1YTlmaTNqZ2djbzBpZ2F5eWhlYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/skU5qA0NB7Y0o/200.webp" // test GIF
    alt="Blob 2"
    className="w-full h-full object-cover"
    // style={{
    //   clipPath:
    //     "path('M54.8,-35.7C66.7,-17.6,69.7,7.5,59.7,28.1C49.7,48.7,26.7,64.8,1.8,64C-23.2,63.2,-46.3,45.6,-56.7,20.9C-67.1,-3.7,-64.8,-35.6,-48.6,-52.9C-32.3,-70.1,-1.2,-72.6,23.9,-63.8C49,-54.9,68.9,-34.9,54.8,-35.7Z')",
    // }}
  />
</div>


        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

      </main>
    </>
  );
}

export default Home;
