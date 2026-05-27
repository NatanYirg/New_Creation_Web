import nciclogo from "@/assets/nciclogoinwhitec.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function PageNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isBibleCollegePage = location.pathname === "/bible-college";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path === "/" || path === "/#hero") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      }
    } else if (path === "/#contact") {
      if (location.pathname === "/bible-college") {
        document.getElementById("contact-college")?.scrollIntoView({ behavior: "smooth" });
      } else if (location.pathname === "/") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else if (path.startsWith("/#")) {
      const sectionId = path.substring(2);
      if (location.pathname === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/discover" },
    { name: "Devotion", path: "/#devotional" },
    { name: "Testimony", path: "/testimonies" },
    { name: "Service", path: "/services" },
    { name: "Teaching", path: "/teachings" },
  ];

  const NavLink = ({ link }: { link: (typeof navLinks)[0] }) => {
    if (link.path.startsWith("/#")) {
      return <button onClick={() => handleNavClick(link.path)}>{link.name}</button>;
    }
    if (link.path === "/") {
      return <button onClick={() => handleNavClick("/")}>{link.name}</button>;
    }
    return <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link>;
  };

  const BibleCollegeBtn = ({ mobile = false }: { mobile?: boolean }) => {
    const cls = `${mobile ? "w-full" : ""} bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-['Outfit'] font-bold px-6 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg`;
    if (isBibleCollegePage) {
      return (
        <button onClick={() => { window.dispatchEvent(new CustomEvent("openBibleCollegeForm")); setIsMobileMenuOpen(false); }} className={cls}>
          Apply Now
        </button>
      );
    }
    return (
      <Link to="/bible-college" onClick={() => setIsMobileMenuOpen(false)}>
        <button className={cls}>Bible College</button>
      </Link>
    );
  };

  return (
    <>
      <nav className="w-full px-4 md:px-6 py-3 flex items-center justify-between bg-[#2B1F66]/80 backdrop-blur-md shadow-lg fixed top-0 left-0 z-50">
        <div className="flex-shrink-0 md:ml-20 cursor-pointer" onClick={() => handleNavClick("/")}>
          <img src={nciclogo} alt="New Creation Logo" className="h-12 md:h-16 w-auto" />
        </div>

        {/* Desktop links */}
        <ul className="hidden lg:flex flex-1 justify-center items-center gap-8 font-['Outfit'] font-medium text-white">
          {navLinks.map((link) => (
            <li key={link.name} className="hover:text-[#FFB800] transition-colors cursor-pointer">
              <NavLink link={link} />
            </li>
          ))}
          <li><BibleCollegeBtn /></li>
        </ul>

        {/* Desktop contact */}
        <div className="hidden lg:block flex-shrink-0 mr-20">
          <button onClick={() => handleNavClick("/#contact")}
            className="border-2 border-white text-white font-['Outfit'] font-medium px-6 py-2 rounded-full hover:bg-white hover:text-[#2B1F66] transition-all duration-300">
            Contact Us
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2" aria-label="Toggle menu">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-[#2B1F66] shadow-xl pt-20 px-6 overflow-y-auto">
            <ul className="flex flex-col gap-6 font-['Outfit'] font-medium text-white">
              {navLinks.map((link) => (
                <li key={link.name} className="hover:text-[#FFB800] transition-colors cursor-pointer">
                  <NavLink link={link} />
                </li>
              ))}
              <li><BibleCollegeBtn mobile /></li>
              <li>
                <button onClick={() => handleNavClick("/#contact")}
                  className="w-full border-2 border-white text-white font-['Outfit'] font-medium px-6 py-2 rounded-full hover:bg-white hover:text-[#2B1F66] transition-all duration-300">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
