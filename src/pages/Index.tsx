import { Hero } from "@/components/Hero";
import { Pastor } from "@/components/Pastor";
import { Devotional } from "@/components/Devotional";
import { Teachings } from "@/components/Teachings";
import { Testimonies } from "@/components/Testimonies";
import { Departments } from "@/components/Departments";
import { Services } from "@/components/Services";
import { Newsletter } from "@/components/Newsletter";
import { Location } from "@/components/Location";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Discover } from "@/components/Discover";
import { Feeds } from "@/components/Feeds";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Navbar />
      <Pastor />
      <Discover />
      <Testimonies />
      <Departments />
      <Services />
      <Feeds />
      <Devotional />
      <Teachings />
      <Newsletter />
      <Contact />
      <Location />
      <Footer />
    
    </div>
  );
};

export default Index;
