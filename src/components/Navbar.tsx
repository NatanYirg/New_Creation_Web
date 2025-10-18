import react from "react";
import nciclogo from "@/assets/nciclogoinwhitec.png";
import { motion } from "framer-motion";

{/* <motion.img
  src="/path-to-logo.png"
  alt="New Creation Logo"
  className="h-12 w-auto"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
/> */}


export function Navbar() {
    const navLinks = [
    "Home",
    "Discover",
    "Ministry",
    "Devotion",
    "Testimony",
    "Service",
    "Teaching",
  ];

  return(
    <nav className="w-full px-6 py-4 flex items-center justify-between absolute top-2 left-0 z-20">
        <div className="flex-shrink-0 animate-fade-in-down ml-20">
            <img 
            src={nciclogo}
            alt="New Creation Logo"
            className="h-20 w-auto"
            />
        </div>

        <ul className="hidden md:flex flex-1 justify-center gap-8 font-['Outfit'] font-medium text-white">
          {navLinks.map((link, index) => (
            <li
              key={link}
              className="hover:text-gold transition-colors cursor-pointer animate-fade-in-delay"
              /* style={{ animationDelay: `${index * 0.2}s` }} */
            >
              {link}
            </li>
          ))}
        </ul>

        <div className="flex-shrink-0 mr-20">
        <button className="border-2 border-white text-white font-['Outfit'] font-medium px-6 py-2 rounded-full hover:bg-white hover:text-primary transition-all duration-300">
          Contact Us
        </button>
      </div>

    </nav>

  );
}