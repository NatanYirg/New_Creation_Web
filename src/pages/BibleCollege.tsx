import { PageNavbar } from "@/components/PageNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Globe, BookOpen, Award, Users, FileText, IdCard, Image as ImageIcon, CreditCard, X, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitBibleCollegeApplication } from "@/api/bibleCollege";
import abc2 from "@/assets/abc2.jpg";
import abc8 from "@/assets/abc8.jpg";
import apostle from "@/assets/apostle1.jpg";
import abclogo from "@/assets/abclogo.png";
import icibc from "@/assets/icibc5.webp";

const emptyForm = () => ({
  fullName: "", email: "", phone: "", dateOfBirth: "", gender: "",
  educationLevel: "", programInterest: "", learningMode: "",
  churchName: "", address: "", additionalInfo: ""
});

export default function BibleCollege() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(emptyForm());

  useEffect(() => {
    const handleOpenForm = () => { setShowRegistrationForm(true); setSubmitted(false); };
    window.addEventListener('openBibleCollegeForm', handleOpenForm);
    return () => window.removeEventListener('openBibleCollegeForm', handleOpenForm);
  }, []);

  const applicationMutation = useMutation({
    mutationFn: () => submitBibleCollegeApplication({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      date_of_birth: formData.dateOfBirth,
      gender: formData.gender,
      education_level: formData.educationLevel,
      program_interest: formData.programInterest,
      learning_mode: formData.learningMode,
      church_name: formData.churchName || undefined,
      address: formData.address,
      additional_info: formData.additionalInfo || undefined,
    }),
    onSuccess: () => {
      setSubmitted(true);
      setFormData(emptyForm());
    },
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applicationMutation.mutate();
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-college');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Global Navigation - Always visible */}
      <PageNavbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-8 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="mb-6">
                <img 
                  src={abclogo}
                  alt="Applied Bible College Logo"
                  className="h-24 w-auto mb-6"
                />
              </div>
              <h1 className="font-['Outfit'] font-bold text-5xl md:text-6xl mb-6">
                Applied Bible College
              </h1>
              <p className="font-['Outfit'] text-xl md:text-2xl mb-8 text-purple-100">
                Raising a Generation that Knows the Truth, Walks in Righteousness, and Lives the Word.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setShowRegistrationForm(true)}
                  className="bg-white text-purple-900 hover:bg-gray-100 font-['Outfit'] font-semibold px-8 py-6 text-lg"
                >
                  Apply for Enrollment
                </Button>
                <Button 
                  onClick={scrollToContact}
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-['Outfit'] font-semibold px-8 py-6 text-lg bg-transparent"
                >
                  Contact the College
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img 
                src={abc2}
                alt="Bible College Graduation"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About the College */}      {/* About Section */}
      <div id="about" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-8 text-center">
            About the College
          </h2>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="font-['Outfit'] text-lg text-gray-700 leading-relaxed mb-4">
              The Applied Bible College is committed to equipping believers with deep knowledge of God's Word 
              and preparing faithful disciples of Christ for impactful ministry.
            </p>
            <p className="font-['Outfit'] text-lg text-gray-700 leading-relaxed mb-4">
              Programs are designed to help students grow spiritually, intellectually, and practically in their walk with God.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-6">
                Programs Offered
              </h3>
              <p className="font-['Outfit'] text-gray-700 mb-4">Students can enroll in:</p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Diploma Programs</p>
                    <p className="font-['Outfit'] text-gray-600">Foundation courses in biblical studies</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Degree Programs</p>
                    <p className="font-['Outfit'] text-gray-600">Comprehensive theological education</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Master's Programs</p>
                    <p className="font-['Outfit'] text-gray-600">Advanced ministry and leadership training</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-6">
                Learning Options
              </h3>
              <p className="font-['Outfit'] text-gray-700 mb-4">Courses are available through:</p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">In-person Classes</p>
                    <p className="font-['Outfit'] text-gray-600">Traditional classroom experience</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Online Learning</p>
                    <p className="font-['Outfit'] text-gray-600">Flexible digital education</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Distance Learning</p>
                    <p className="font-['Outfit'] text-gray-600">Study from anywhere</p>
                  </div>
                </li>
              </ul>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="font-['Outfit'] text-gray-700 italic">
                  The college has already celebrated two graduation rounds, raising trained servants for ministry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision, Mission & Values */}
      <div id="vision-mission" className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-12 text-center">
            Vision, Mission & Values
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Vision */}
            <Card className="border-2 border-purple-200">
              <CardContent className="p-8">
                <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-4">
                  ራዕይ — Vision
                </h3>
                <p className="font-['Outfit'] text-lg text-gray-700 leading-relaxed">
                  የእግዚአብሔርን ቃል እውነት በሙላት የተረዳ፣ የፅድቅ ተፅዕኖ የሚፈጥር እና ቃል አደሪ የሆነ ትውልድ ማስነሳት!
                </p>
                <p className="font-['Outfit'] text-base text-gray-600 mt-3 italic">
                  Raising a generation that fully understands the truth of God's Word, creates an impact of righteousness, and is a doer of the Word!
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border-2 border-purple-200">
              <CardContent className="p-8">
                <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-4">
                  ተልዕኮ — Mission
                </h3>
                <p className="font-['Outfit'] text-lg text-gray-700 leading-relaxed">
                  የእግዚአብሔርን ቃል በመንፈስ ቅዱስ ኃይልና ብርሃን የሚገልጡ በእውነተኛ መንፈሳዊነት እና በእግዚአብሔር ቃል እውቀት የተሞሉ 
                  የጌታችን የኢየሱስ ክርስቶስ ደቀመዛሙርትን ለታላቁ ተልዕኮ እና ለሁለንተናዊ አገልግሎት ማዘጋጀት!
                </p>
                <p className="font-['Outfit'] text-base text-gray-600 mt-3 italic">
                  Preparing disciples of Jesus Christ filled with true spirituality and knowledge of God's Word, 
                  who reveal the Word through the power and light of the Holy Spirit, for the Great Commission and universal ministry!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <Card className="border-2 border-purple-200">
            <CardContent className="p-8">
              <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-6">
                አንኳር እሴቶች — Core Values
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-['Outfit'] text-gray-900 font-semibold">የእግዚአብሔር ቃል ሥልጣን</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm">The Authority of the Word of God</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-['Outfit'] text-gray-900 font-semibold">አገልግሎት / ባለአደራነት</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm">Service / Stewardship</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-['Outfit'] text-gray-900 font-semibold">ምሳሌያዊነት / መሪነት</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm">Exemplary Leadership</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-['Outfit'] text-gray-900 font-semibold">በልህቀት መገለጥ / ጥበበኝነት</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm">Excellence and Wisdom</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-['Outfit'] text-gray-900 font-semibold">ወንድማማችነት / የክርስቶስ አካልነት</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm">Brotherhood / The Body of Christ</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-['Outfit'] text-gray-900 font-semibold">ለተፈጠረበት ዓላማ መኖር</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm">Living for God's Purpose</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-['Outfit'] text-gray-900 font-semibold">የማይቋረጥ እድገት / ተማሪነት</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm">Continuous Growth and Learning</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Purpose of the College */}
      <div id="purpose" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-8 text-center">
            Purpose of the College
          </h2>
          <div className="max-w-4xl mx-auto">
            <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-6 text-center">
              የአፕላይድ ባይብል ኮሌጅ ዓላማ
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-purple-200 hover:border-purple-600 transition-all">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <p className="font-['Outfit'] text-gray-700 leading-relaxed">
                    Raising disciples filled with knowledge and wisdom
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200 hover:border-purple-600 transition-all">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <p className="font-['Outfit'] text-gray-700 leading-relaxed">
                    Demonstrating the Word of God through practical living
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200 hover:border-purple-600 transition-all">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <p className="font-['Outfit'] text-gray-700 leading-relaxed">
                    Producing true disciples of Christ known for godly character and life
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* President & Founder Message */}
      <div id="leadership" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-12 text-center">
            President & Founder Message
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo on the left */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={apostle}
                  alt="President & Founder"
                  className="rounded-lg shadow-xl w-full max-w-md h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Message on the right */}
            <div>
              <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-6">
                President & Founder
              </h3>
              <div className="space-y-4 text-gray-700 font-['Outfit'] text-lg leading-relaxed">
                <p>
                  Welcome to Applied Bible College. Our vision is to raise a generation that understands 
                  the truth of God's Word and lives it with righteousness and power.
                </p>
                <p>
                  Through biblical teaching, spiritual formation, and practical ministry training, we prepare 
                  students to serve God faithfully and impact their communities.
                </p>
                <p>
                  We invite you to join us in this journey of learning, transformation, and calling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dean's Message */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-12 text-center">
            Dean's Message
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Message on the left */}
            <div>
              <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-6">
                Dean
              </h3>
              <div className="space-y-4 text-gray-700 font-['Outfit'] text-lg leading-relaxed">
                <p>
                  At Applied Bible College, our goal is not only academic excellence but also spiritual growth.
                </p>
                <p>
                  We believe that understanding the Word of God deeply empowers believers to live victorious 
                  Christian lives and serve effectively in ministry.
                </p>
                <p>
                  We are committed to equipping students with knowledge, wisdom, and practical ministry experience.
                </p>
              </div>
            </div>
            
            {/* Photo on the right */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={abc8}
                  alt="Dean"
                  className="rounded-lg shadow-xl w-full max-w-md h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Testimonies */}
      <div id="testimonies" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-12 text-center">
            Student Testimonies
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimony Card 1 */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-purple-200 overflow-hidden border-4 border-purple-600">
                      <img 
                        src={abc2}
                        alt="Daniel M."
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-['Outfit'] text-gray-700 leading-relaxed mb-4 italic">
                      "Studying at Applied Bible College transformed my understanding of Scripture and prepared me for ministry."
                    </p>
                    <p className="font-['Outfit'] font-semibold text-purple-900">
                      — Daniel M.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimony Card 2 */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-purple-200 overflow-hidden border-4 border-purple-600">
                      <img 
                        src={abc2}
                        alt="Sara T."
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-['Outfit'] text-gray-700 leading-relaxed mb-4 italic">
                      "The teaching and mentorship here helped me grow spiritually and discover my calling."
                    </p>
                    <p className="font-['Outfit'] font-semibold text-purple-900">
                      — Sara T.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimony Card 3 */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-purple-200 overflow-hidden border-4 border-purple-600">
                      <img 
                        src={abc2}
                        alt="Michael K."
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-['Outfit'] text-gray-700 leading-relaxed mb-4 italic">
                      "The practical ministry training equipped me to serve confidently in my local church."
                    </p>
                    <p className="font-['Outfit'] font-semibold text-purple-900">
                      — Michael K.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimony Card 4 */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-purple-200 overflow-hidden border-4 border-purple-600">
                      <img 
                        src={abc2}
                        alt="Ruth A."
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-['Outfit'] text-gray-700 leading-relaxed mb-4 italic">
                      "God's Word came alive through the teachings. I am forever grateful for this experience."
                    </p>
                    <p className="font-['Outfit'] font-semibold text-purple-900">
                      — Ruth A.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Partnership */}
      <div id="partnership" className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-8 text-center">
            Institutional Partnership
          </h2>
          <Card className="max-w-4xl mx-auto border-2 border-purple-200">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={icibc}
                    alt="In Christ International Bible College"
                    className="h-32 w-auto"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Outfit'] font-bold text-2xl text-purple-900 mb-4">
                    In Christ International Bible College
                  </h3>
                  <p className="font-['Outfit'] text-gray-700 leading-relaxed mb-4">
                    Applied Bible College has an institutional partnership with In Christ International Bible College. 
                    This partnership enables collaboration in training and preparing ministers and leaders for global ministry.
                  </p>
                  <a 
                    href="https://www.icibc.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white font-['Outfit'] font-semibold">
                      Visit ICIBC Website
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admission Requirements */}
      <div id="admission" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-8 text-center">
            Admission Requirements
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-['Outfit'] text-lg text-gray-700 text-center mb-8">
              Students applying for enrollment must bring:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-purple-200">
                <CardContent className="p-6 flex items-start gap-4">
                  <FileText className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Personal Education Information</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm mt-1">Academic records and certificates</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200">
                <CardContent className="p-6 flex items-start gap-4">
                  <IdCard className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Identification Documents</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm mt-1">Valid ID or passport</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200">
                <CardContent className="p-6 flex items-start gap-4">
                  <ImageIcon className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Two Passport-Size Photographs</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm mt-1">Recent color photos</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200">
                <CardContent className="p-6 flex items-start gap-4">
                  <CreditCard className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-['Outfit'] font-semibold text-lg text-gray-900">Bank Slip for College Payment</p>
                    <p className="font-['Outfit'] text-gray-600 text-sm mt-1">Proof of tuition payment</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Contact the College */}
      <div id="contact-college" className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-8 text-center">
            Contact the College
          </h2>
          <p className="font-['Outfit'] text-xl text-gray-700 text-center mb-12">
            Contact Us for Enrollment
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Email Card */}
            <Card className="border-2 border-purple-200 hover:border-purple-600 hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-['Outfit'] font-bold text-xl text-gray-900 mb-3">
                  📧 Email
                </h3>
                <a 
                  href="mailto:appliedbiblecollege@gmail.com"
                  className="font-['Outfit'] text-purple-600 hover:text-purple-800 text-lg break-all"
                >
                  appliedbiblecollege@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card className="border-2 border-purple-200 hover:border-purple-600 hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-['Outfit'] font-bold text-xl text-gray-900 mb-3">
                  📞 Phone
                </h3>
                <div className="space-y-2">
                  <a 
                    href="tel:+251932177612"
                    className="font-['Outfit'] text-purple-600 hover:text-purple-800 text-lg block"
                  >
                    +251 932 177 612
                  </a>
                  <a 
                    href="tel:+251920066565"
                    className="font-['Outfit'] text-purple-600 hover:text-purple-800 text-lg block"
                  >
                    +251 920 066 565
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-['Outfit'] font-bold text-4xl text-white mb-4">
            Begin Your Journey in Biblical Education
          </h2>
          <p className="font-['Outfit'] text-lg text-white/90 mb-8">
            Join Applied Bible College and be equipped to live the Word and impact the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setShowRegistrationForm(true)}
              className="bg-white text-purple-900 hover:bg-gray-100 font-['Outfit'] font-semibold px-8 py-4 text-lg"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div 
          className="fixed inset-0 bg-black/80 z-[100] flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setShowRegistrationForm(false)}
        >
          <div 
            className="relative w-full max-w-3xl bg-white rounded-lg p-8 my-8 mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRegistrationForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-2">
              Apply for Enrollment
            </h2>
            <p className="font-['Outfit'] text-gray-600 mb-2">
              Fill out this form to express your interest in Applied Bible College
            </p>
            <p className="font-['Outfit'] text-sm text-purple-600 mb-6 bg-purple-50 p-3 rounded-lg border border-purple-200">
              <strong>Note:</strong> This is not an official registration. After submitting this form, our ABC staff will reach out to you with further enrollment details.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <CheckCircle className="w-20 h-20 text-green-500" />
                <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900">Application Submitted!</h3>
                <p className="font-['Outfit'] text-gray-600 max-w-sm">
                  Thank you for your interest in Applied Bible College. Our ABC staff will reach out to you soon with further enrollment details.
                </p>
                <Button onClick={() => { setShowRegistrationForm(false); setSubmitted(false); }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-['Outfit'] font-semibold px-8 py-3 mt-2">
                  Close
                </Button>
              </div>
            ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
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
                  <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="font-['Outfit']"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value="+251"
                      disabled
                      className="font-['Outfit'] w-20"
                    />
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="font-['Outfit'] flex-1"
                      placeholder="912345678"
                      pattern="[0-9]{9}"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                    Date of Birth *
                  </label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleFormChange}
                    required
                    className="font-['Outfit']"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleFormChange as any}
                    required
                    className="font-['Outfit'] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                    Highest Education Level *
                  </label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleFormChange as any}
                    required
                    className="font-['Outfit'] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                    Program of Interest *
                  </label>
                  <select
                    name="programInterest"
                    value={formData.programInterest}
                    onChange={handleFormChange as any}
                    required
                    className="font-['Outfit'] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select program</option>
                    <option value="diploma">Diploma Program</option>
                    <option value="degree">Degree Program</option>
                    <option value="masters">Master's Program</option>
                  </select>
                </div>

                <div>
                  <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                    Preferred Learning Mode *
                  </label>
                  <select
                    name="learningMode"
                    value={formData.learningMode}
                    onChange={handleFormChange as any}
                    required
                    className="font-['Outfit'] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select learning mode</option>
                    <option value="day">Day Classes</option>
                    <option value="night">Night Classes</option>
                    <option value="online">Online Learning</option>
                    <option value="distance">Distance Learning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                  Church Name
                </label>
                <Input
                  type="text"
                  name="churchName"
                  value={formData.churchName}
                  onChange={handleFormChange}
                  className="font-['Outfit']"
                  placeholder="Your church name (optional)"
                />
              </div>

              <div>
                <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
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

              <div>
                <label className="font-['Outfit'] text-sm font-semibold text-gray-700 mb-2 block">
                  Additional Information
                </label>
                <Textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleFormChange}
                  className="font-['Outfit'] min-h-[100px]"
                  placeholder="Any additional information you'd like to share (optional)"
                />
              </div>

              <Button 
                type="submit"
                disabled={applicationMutation.isPending}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-['Outfit'] font-semibold py-3"
              >
                {applicationMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
              {applicationMutation.isError && (
                <p className="text-sm text-red-500 text-center">Failed to submit. Please try again.</p>
              )}
            </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
