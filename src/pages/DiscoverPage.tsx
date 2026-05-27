import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Sparkles, Heart, Users, GraduationCap, Droplet, X, Calendar, Gift, PartyPopper, Cake } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/home-hero-congregation.jpg";
import congregationImage from "@/assets/hero-congregation.jpg";
import pastorImage from "@/assets/pastor-couple.jpg";
import apostleImage from "@/assets/Apostle.jpg";
import christmasImage from "@/assets/christmas+5.jpg";
import easterImage from "@/assets/easter.jpg";
import newyearImage from "@/assets/newyear6.jpg";
import anniversaryImage from "@/assets/anninversary6.jpg";
import baptism2Image from "@/assets/baptizm2.jpg";
import childrenBaptismImage from "@/assets/childrenbaptizm.jpg";

export default function DiscoverPage() {
  const navigate = useNavigate();
  const [showFoundationForm, setShowFoundationForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+251",
    email: "",
    address: ""
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!value.startsWith("+251")) {
        setFormData({ ...formData, [name]: "+251" });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Foundation Class enrollment:", formData);
    setShowFoundationForm(false);
    setShowSuccessMessage(true);
    setFormData({
      fullName: "",
      phone: "+251",
      email: "",
      address: ""
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A4D]/90 via-[#24145A]/90 to-[#2F0F66]/90" />
        
        <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mt-20">
          <h1 className="font-['Outfit'] font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 leading-tight">
            Discover New Creation International Church
          </h1>
          <p className="font-['Outfit'] text-base sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Learn about our vision, beliefs, and the journey God has taken us on as a church community.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => scrollToSection('vision')}
              className="bg-white text-[#6D28D9] hover:bg-gray-100 font-['Outfit'] font-semibold px-5 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg rounded-md"
            >
              Our Vision
            </Button>
            <Button
              onClick={() => scrollToSection('doctrine')}
              className="border-2 border-white text-white hover:bg-white hover:text-[#6D28D9] font-['Outfit'] font-semibold px-5 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg bg-transparent rounded-md"
            >
              Our Doctrine
            </Button>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div id="vision" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Vision Header */}
          <div className="text-center mb-16">
            <h2 className="font-['Outfit'] font-bold text-5xl text-gray-900 mb-6">
              Our <span className="text-[#6D28D9]">Vision</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6D28D9] to-purple-600 mx-auto mb-6"></div>
            <p className="font-['Outfit'] text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed italic">
              "Raising a generation who know themselves in Christ and who make an impact through righteousness and are doers of the Word."
            </p>
          </div>

          {/* Vision Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Pillar 1 */}
            <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-[#6D28D9]" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 mb-4">
                  Knowing Our Identity in Christ
                </h3>
                <p className="font-['Outfit'] text-gray-600 leading-relaxed">
                  Believers discovering who they are in Christ and understanding their identity through the Word of God.
                </p>
              </CardContent>
            </Card>

            {/* Pillar 2 */}
            <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-[#6D28D9]" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 mb-4">
                  Impact Through Righteousness
                </h3>
                <p className="font-['Outfit'] text-gray-600 leading-relaxed">
                  Living lives that reflect God's righteousness and influencing families, communities, and society for Christ.
                </p>
              </CardContent>
            </Card>

            {/* Pillar 3 */}
            <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-[#6D28D9]" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 mb-4">
                  Doers of the Word
                </h3>
                <p className="font-['Outfit'] text-gray-600 leading-relaxed">
                  Encouraging believers to practice and live out the Word of God daily through obedience, faith, and action.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Amharic Vision Statement */}
          <div className="bg-gradient-to-r from-[#6D28D9] to-purple-800 rounded-lg p-8 text-center">
            <h3 className="font-['Outfit'] font-bold text-2xl text-white mb-4">
              ራዕይ
            </h3>
            <p className="font-['Outfit'] text-xl text-white/95 leading-relaxed italic">
              "ራሱን በክርስቶስ የሚያውቅ፣ በፅድቅ ተፅእኖ የሚፈጥር፣ ቃል አድራጊ ትውልድ ማስነሳት"
            </p>
          </div>
        </div>
      </div>

      {/* What We Believe Section */}
      <div id="doctrine" className="py-20 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Outfit'] font-bold text-5xl text-gray-900 mb-6">
              What We <span className="text-[#6D28D9]">Believe</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6D28D9] to-purple-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {/* Belief 1 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-[#6D28D9] rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-['Outfit'] text-lg text-gray-700">
                The Bible is the inspired Word of God
              </p>
            </div>

            {/* Belief 2 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-[#6D28D9] rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-['Outfit'] text-lg text-gray-700">
                Salvation comes through Jesus Christ alone
              </p>
            </div>

            {/* Belief 3 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-[#6D28D9] rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-['Outfit'] text-lg text-gray-700">
                The Holy Spirit empowers believers
              </p>
            </div>

            {/* Belief 4 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-[#6D28D9] rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-['Outfit'] text-lg text-gray-700">
                The Church is the body of Christ
              </p>
            </div>

            {/* Belief 5 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-[#6D28D9] rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-['Outfit'] text-lg text-gray-700">
                Baptism and communion are sacred practices
              </p>
            </div>

            {/* Belief 6 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-[#6D28D9] rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-['Outfit'] text-lg text-gray-700">
                We believe in the power of prayer and worship
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-[#6D28D9] hover:bg-purple-800 text-white font-['Outfit'] font-semibold px-8 py-6 text-lg rounded-md">
              Read Full Statement of Faith
            </Button>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Photo */}
            <div className="order-2 lg:order-1">
              <img 
                src={anniversaryImage} 
                alt="Church anniversary celebration" 
                className="rounded-lg shadow-xl w-full h-[500px] object-cover"
              />
            </div>

            {/* Right: Story */}
            <div className="order-1 lg:order-2">
              <h2 className="font-['Outfit'] font-bold text-5xl text-gray-900 mb-6">
                Our <span className="text-[#6D28D9]">Story</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6D28D9] to-purple-600 mb-8"></div>
              
              <div className="space-y-6 font-['Outfit'] text-lg text-gray-700 leading-relaxed">
                <p>
                  What started as a small group of believers gathering in faith has grown into a vibrant community dedicated to worship, discipleship, and outreach.
                </p>
                <p>
                  Founded by Apostle Bisrat Bezuayene and his wife Meron Alemu, New Creation International Church Ethiopia was established with a vision to raise a generation that knows their identity in Christ and lives as doers of the Word.
                </p>
                <p>
                  Over the years, we have witnessed God's faithfulness as our church family has grown, impacting countless lives through powerful teaching, prayer, and community service.
                </p>
                <p>
                  Today, we continue to be a beacon of hope in Addis Ababa and beyond, transforming lives through the Gospel of Jesus Christ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div className="py-20 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Outfit'] font-bold text-5xl text-gray-900 mb-6">
              Our <span className="text-[#6D28D9]">Impact</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6D28D9] to-purple-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Impact Card 1 */}
            <Card className="text-center border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Droplet className="w-8 h-8 text-[#6D28D9]" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-5xl text-[#6D28D9] mb-2">
                  21
                </h3>
                <p className="font-['Outfit'] text-xl font-semibold text-gray-900 mb-2">
                  Baptism Services
                </p>
                <p className="font-['Outfit'] text-gray-600">
                  900+ Baptized Members
                </p>
              </CardContent>
            </Card>

            {/* Impact Card 2 */}
            <Card className="text-center border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-[#6D28D9]" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-5xl text-[#6D28D9] mb-2">
                  18+
                </h3>
                <p className="font-['Outfit'] text-xl font-semibold text-gray-900 mb-2">
                  Foundation Classes
                </p>
                <p className="font-['Outfit'] text-gray-600">
                  Still Learning
                </p>
              </CardContent>
            </Card>

            {/* Impact Card 3 */}
            <Card className="text-center border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-[#6D28D9]" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-5xl text-[#6D28D9] mb-2">
                  10+
                </h3>
                <p className="font-['Outfit'] text-xl font-semibold text-gray-900 mb-2">
                  Years of Ministry
                </p>
                <p className="font-['Outfit'] text-gray-600">
                  Impacting Lives
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Baptism Section */}
      <div className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Outfit'] font-bold text-5xl text-gray-900 mb-6">
              Baptism at <span className="text-[#6D28D9]">New Creation</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6D28D9] to-purple-600 mx-auto mb-6"></div>
            <p className="font-['Outfit'] text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Baptism is a public declaration of faith and a powerful moment in the journey of every believer. It symbolizes dying to the old life and rising to new life in Christ.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <img 
              src={baptism2Image} 
              alt="Baptism service" 
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
            <img 
              src={childrenBaptismImage} 
              alt="Children baptism celebration" 
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Foundation Classes Section */}
      <div className="py-20 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Outfit'] font-bold text-5xl text-gray-900 mb-6">
              Foundation <span className="text-[#6D28D9]">Classes</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6D28D9] to-purple-600 mx-auto mb-6"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Introduction Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-[#6D28D9]" />
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-xl text-gray-900 mb-3">
                    What are Foundation Classes?
                  </h3>
                  <p className="font-['Outfit'] text-gray-700 leading-relaxed">
                    Foundation Classes are comprehensive discipleship courses designed to ground new believers in the fundamental truths of Christianity and help them grow in their faith.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-[#6D28D9]" />
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-xl text-gray-900 mb-3">
                    Why are they important?
                  </h3>
                  <p className="font-['Outfit'] text-gray-700 leading-relaxed">
                    These classes provide essential biblical knowledge, help believers understand their identity in Christ, and equip them for effective Christian living and ministry.
                  </p>
                </CardContent>
              </Card>
            </div>

            
          </div>
        </div>
      </div>

      {/* Special Celebrations Section */}
      <div className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Outfit'] font-bold text-5xl text-gray-900 mb-6">
              Special <span className="text-[#6D28D9]">Celebrations</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6D28D9] to-purple-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Christmas Card */}
            <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={christmasImage}
                  alt="Christmas Celebration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-['Outfit'] font-bold text-xl text-gray-900 mb-3">
                  Christmas Celebration
                </h3>
                <p className="font-['Outfit'] text-gray-600 leading-relaxed">
                  A joyful time of worship, community, and celebrating the birth of Jesus Christ.
                </p>
              </CardContent>
            </Card>

            {/* Easter Card */}
            <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={easterImage}
                  alt="Easter Celebration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-['Outfit'] font-bold text-xl text-gray-900 mb-3">
                  Easter Celebration
                </h3>
                <p className="font-['Outfit'] text-gray-600 leading-relaxed">
                  Celebrating the resurrection of Jesus Christ with powerful worship and testimony.
                </p>
              </CardContent>
            </Card>

            {/* New Year Card */}
            <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={newyearImage}
                  alt="New Year Celebration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <PartyPopper className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-['Outfit'] font-bold text-xl text-gray-900 mb-3">
                  New Year Celebration
                </h3>
                <p className="font-['Outfit'] text-gray-600 leading-relaxed">
                  Welcoming the new year with prayer, thanksgiving, and renewed commitment to God.
                </p>
              </CardContent>
            </Card>

            {/* Church Anniversary Card */}
            <Card className="border-2 border-[#6D28D9]/20 hover:border-[#6D28D9] transition-all hover:shadow-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={anniversaryImage}
                  alt="Church Anniversary"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Cake className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-['Outfit'] font-bold text-xl text-gray-900 mb-3">
                  Church Anniversary
                </h3>
                <p className="font-['Outfit'] text-gray-600 leading-relaxed">
                  Celebrating God's faithfulness and the growth of our church family over the years.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Visitor Invitation CTA */}
      <div className="py-20 px-8 bg-gradient-to-r from-[#6D28D9] to-purple-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-['Outfit'] font-bold text-5xl text-white mb-6">
            Join Us This Sunday
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto mb-8"></div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                <div className="text-left">
                  <p className="font-['Outfit'] text-sm text-white/80">Every Sunday</p>
                  <p className="font-['Outfit'] text-2xl font-bold">10:00 AM - 1:00 PM</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/30"></div>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-left">
                  <p className="font-['Outfit'] text-sm text-white/80">Location</p>
                  <p className="font-['Outfit'] text-2xl font-bold">Riche, Stadium</p>
                </div>
              </div>
            </div>
          </div>

          <p className="font-['Outfit'] text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience powerful worship, life-changing teaching, and a welcoming community. We can't wait to meet you!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => navigate('/services')}
              className="bg-white text-[#6D28D9] hover:bg-gray-100 font-['Outfit'] font-semibold px-8 py-6 text-lg rounded-md"
            >
              Plan Your Visit
            </Button>
            <Button 
              onClick={() => navigate('/teachings')}
              className="border-2 border-white text-white hover:bg-white hover:text-[#6D28D9] font-['Outfit'] font-semibold px-8 py-6 text-lg bg-transparent rounded-md"
            >
              Watch Sermons
            </Button>
          </div>
        </div>
      </div>

      {/* Foundation Class Enrollment Form Modal */}
      {showFoundationForm && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setShowFoundationForm(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-lg my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFoundationForm(false)}
              className="absolute top-4 right-4 z-10 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-2">
                Enroll in Foundation Class
              </h2>
              <p className="font-['Outfit'] text-gray-600 mb-6">
                Fill out this form to express your interest in joining our Foundation Classes
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                    className="font-['Outfit']"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="font-['Outfit']"
                    placeholder="+251912345678"
                  />
                </div>

                <div>
                  <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="font-['Outfit']"
                    placeholder="your.email@example.com (optional)"
                  />
                </div>

                <div>
                  <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                    Address *
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                    className="font-['Outfit']"
                    placeholder="City, Region"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#6D28D9] hover:bg-[#5a21b6] text-white font-['Outfit'] font-semibold py-3"
                  >
                    Submit Enrollment
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowFoundationForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-['Outfit'] font-semibold py-3"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowSuccessMessage(false)}
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-lg p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 mb-4">
              Enrollment Submitted!
            </h3>
            <p className="font-['Outfit'] text-lg text-gray-700 mb-2">
              Join us this Sunday!
            </p>
            <p className="font-['Outfit'] text-gray-600 mb-6">
              Our church staff will call you with more details about the Foundation Classes.
            </p>
            <Button
              onClick={() => setShowSuccessMessage(false)}
              className="bg-[#6D28D9] hover:bg-[#5a21b6] text-white font-['Outfit'] font-semibold px-8 py-3"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
