import { PageNavbar } from "@/components/PageNavbar";
import { Footer } from "@/components/Footer";
import bgimg from "@/assets/home-hero-congregation.jpg";
import servicebg from "@/assets/servicebg.jpg";

const allServices = [
  { 
    num: 1, 
    day: "Sunday", 
    title: "Sunday Service", 
    time: "Morning: 10:00AM - 1:00PM",
    description: "Join us for inspiring worship, biblical teaching, and fellowship as we celebrate God's goodness together.",
    location: "Riche Compound"
  },
  { 
    num: 2, 
    day: "Sunday", 
    title: "Children Service", 
    time: "Morning: 10:00AM - 12:00PM",
    description: "A fun and engaging environment where children learn about Jesus through age-appropriate activities.",
    location: "Riche Compound"
  },
  { 
    num: 3, 
    day: "Sunday", 
    title: "Teen/Youth English Service", 
    time: "Morning: 09:00AM - 11:00AM",
    description: "Dynamic worship and relevant messages designed specifically for teens and young adults.",
    location: "Riche Compound"
  },
  { 
    num: 4, 
    day: "Tuesday", 
    title: "Teaching Service", 
    time: "Evening: 04:00PM - 08:00PM",
    description: "Dive deeper into God's Word with verse-by-verse study and practical application for daily living.",
    location: "Riche Compound"
  },
  { 
    num: 5, 
    day: "Wednesday", 
    title: "Healing & Deliverance", 
    time: "Evening: 04:00PM - 08:00PM",
    description: "Experience God's healing power through prayer, worship, and ministry.",
    location: "Riche Compound"
  },
  { 
    num: 6, 
    day: "Friday", 
    title: "Night Prayer", 
    time: "Every 2 weeks: 08:00PM - 12:00AM",
    description: "Come together for powerful corporate prayer and intercession.",
    location: "Riche Compound"
  },
  { 
    num: 7, 
    day: "Saturday", 
    title: "Foundation Classes", 
    time: "Whole Day",
    description: "Build a strong foundation in biblical principles and Christian living.",
    location: "Riche Compound"
  },
  { 
    num: 8, 
    day: "Saturday", 
    title: "Youth Service", 
    time: "Afternoon: 02:00PM - 04:00PM",
    description: "High-energy worship and activities for young people to grow in faith.",
    location: "Riche Compound"
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageNavbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-['Outfit'] font-bold text-6xl text-gray-900 mb-4">
            Our <span className="text-[#6D28D9]">Services</span>
          </h1>
          <p className="font-['Outfit'] text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a variety of services throughout the week to help you grow in your faith and connect with our community.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service) => (
            <div
              key={service.num}
              className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 hover:border-[#6D28D9]"
            >
              {/* Image Section */}
              <div className="aspect-video bg-gradient-to-br from-[#2B1F66] to-[#6D28D9] flex items-center justify-center relative overflow-hidden">
                <img
                  src={servicebg}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="font-['Outfit'] font-bold text-white text-3xl">
                      {service.num.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-['Outfit'] font-semibold text-white text-lg">
                    Every {service.day}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-3">
                <h3 className="font-['Outfit'] text-2xl font-bold text-gray-900 group-hover:text-[#6D28D9] transition-colors">
                  {service.title}
                </h3>
                
                <p className="font-['Outfit'] text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>

                <div className="pt-2 space-y-2">
                  <p className="font-['Outfit'] text-sm text-gray-700">
                    <span className="font-semibold">Time:</span> {service.time}
                  </p>
                  <p className="font-['Outfit'] text-sm text-gray-700">
                    <span className="font-semibold">Location:</span> {service.location}
                  </p>
                  {service.note && (
                    <p className="font-['Outfit'] text-xs text-[#6D28D9] italic">
                      {service.note}
                    </p>
                  )}
                </div>

                <button className="w-full mt-4 font-['Outfit'] text-sm text-[#0076C0] border-2 border-[#0076C0] rounded-lg px-6 py-2 hover:bg-[#0076C0] hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
