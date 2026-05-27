import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PageNavbar } from "@/components/PageNavbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import youthimg from "@/assets/champions.jpg";
import childrenimg from "@/assets/kids.jpg";
import marriageimg from "@/assets/Marraige team.jpg";
import praisechoir2 from "@/assets/praisechoir2.jpg";
import media1 from "@/assets/media1.jpg";
import nightprayer4 from "@/assets/nightprayer4.jpg";
import chm3 from "@/assets/chm3.jpg";
import evangelism from "@/assets/evangelism.jpg";

interface Ministry {
  id: number;
  name: string;
  description: string;
  image: string;
  fullDescription: string;
  leader: string;
  schedule: string;
  contact: string;
}

const ministries: Ministry[] = [
  {
    id: 1,
    name: "Youth Ministry",
    description: "Empowering the next generation to know God, grow in faith, and make a difference in their world through dynamic programs and mentorship.",
    image: youthimg,
    fullDescription: "Our Youth Ministry is dedicated to helping young people develop a strong foundation in Christ. We provide a safe and engaging environment where teens can explore their faith, build meaningful relationships, and discover their God-given purpose. Through weekly gatherings, retreats, service projects, and mentorship programs, we equip young people to be leaders in their schools, communities, and beyond.",
    leader: "Pastor John Doe",
    schedule: "Saturdays, 2:00 PM - 4:00 PM",
    contact: "youth@ncic.org"
  },
  {
    id: 2,
    name: "Children Ministry",
    description: "Leading our congregation in heartfelt worship through music that glorifies God and touches hearts across all ages and musical preferences.",
    image: childrenimg,
    fullDescription: "Our Children's Ministry creates a fun, safe, and loving environment where children can learn about Jesus through age-appropriate activities and biblical teaching. We believe that every child matters to God and deserves to hear the Gospel in a way they can understand. Our dedicated team of volunteers provides engaging lessons, worship, games, and activities that help children grow in their relationship with Jesus.",
    leader: "Sister Mary Smith",
    schedule: "Sundays, 10:00 AM - 1:00 PM",
    contact: "children@ncic.org"
  },
  {
    id: 3,
    name: "Marriage Council",
    description: "Serving our local community with Christ's love through food pantries, community events, and mission work that makes a tangible difference.",
    image: marriageimg,
    fullDescription: "Our Marriage Council ministry is committed to strengthening marriages and families through biblical principles and practical guidance. We offer pre-marital counseling, marriage enrichment workshops, and ongoing support for couples at every stage of their journey. Our goal is to help couples build strong, Christ-centered marriages that reflect God's love and bring glory to Him.",
    leader: "Pastor David & Sister Sarah Johnson",
    schedule: "First Friday of each month, 7:00 PM - 9:00 PM",
    contact: "marriage@ncic.org"
  },
  {
    id: 4,
    name: "Choirs",
    description: "Lifting voices in worship and praise, our choir ministry leads the congregation in powerful musical expressions of faith and devotion.",
    image: praisechoir2,
    fullDescription: "Our Choir Ministry is dedicated to glorifying God through music. We believe that worship through song is a powerful way to connect with God and inspire others. Our choir members rehearse regularly to prepare uplifting songs that enhance our worship services and special events. Whether you're an experienced singer or just love to worship, there's a place for you in our choir.",
    leader: "Minister of Music",
    schedule: "Thursdays, 6:00 PM - 8:00 PM (Rehearsal)",
    contact: "choir@ncic.org"
  },
  {
    id: 5,
    name: "Evangelism",
    description: "Spreading the Gospel and sharing the love of Christ with our community through outreach programs, mission trips, and personal evangelism.",
    image: evangelism,
    fullDescription: "Our Evangelism Ministry is passionate about sharing the Good News of Jesus Christ with those who don't know Him. We organize community outreach events, door-to-door evangelism, street ministry, and mission trips. Our team is trained in effective evangelism techniques and equipped to share their faith with confidence and compassion.",
    leader: "Evangelist Team",
    schedule: "Saturdays, 9:00 AM - 12:00 PM",
    contact: "evangelism@ncic.org"
  },
  {
    id: 6,
    name: "Prayer Ministry",
    description: "Interceding for the needs of our church family and community through dedicated prayer meetings and 24/7 prayer chains.",
    image: nightprayer4,
    fullDescription: "Our Prayer Ministry is the spiritual backbone of our church. We believe in the power of prayer to transform lives, heal the sick, and move mountains. Our prayer warriors meet regularly to intercede for our church, community, and world. We also maintain a 24/7 prayer chain for urgent needs and offer prayer support for anyone who requests it.",
    leader: "Prayer Coordinator",
    schedule: "Wednesdays, 6:00 AM - 7:00 AM & Fridays, 8:00 PM - 12:00 AM",
    contact: "prayer@ncic.org"
  },
  {
    id: 7,
    name: "CHM (Care and Help Ministry)",
    description: "Demonstrating Christ's love through practical acts of service, charity work, and compassionate care for those in need.",
    image: chm3,
    fullDescription: "Our Care and Help Ministry (CHM) is dedicated to serving those in need within our church and community. We provide food assistance, clothing, financial support, hospital visits, and practical help to families facing difficult times. Our mission is to be the hands and feet of Jesus by showing His love through tangible acts of kindness and compassion.",
    leader: "CHM Coordinator",
    schedule: "As needed - Contact for volunteer opportunities",
    contact: "chm@ncic.org"
  },
  {
    id: 8,
    name: "Media / Production",
    description: "Using technology and creativity to enhance worship experiences and extend our ministry reach through live streaming and multimedia.",
    image: media1,
    fullDescription: "Our Media and Production Ministry combines technical expertise with creative vision to support all aspects of our church services and events. We handle audio, video, lighting, live streaming, social media, graphic design, and photography. Our team works behind the scenes to ensure that every service runs smoothly and that our message reaches people both in-person and online.",
    leader: "Media Director",
    schedule: "Sundays (Service times) & Training sessions as scheduled",
    contact: "media@ncic.org"
  }
];

export default function Ministry() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageNavbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-['Outfit'] font-bold text-6xl text-gray-900 mb-4">
            Our <span className="text-[#6D28D9]">Ministries</span>
          </h1>
          <p className="font-['Outfit'] text-xl italic text-[#6D28D9] max-w-3xl mx-auto">
            "Each of you should use whatever gift you have received to serve others."
            <span className="block text-base mt-2 text-gray-700">— 1 Peter 4:10</span>
          </p>
        </div>
      </div>

      {/* Ministries Grid */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry) => (
            <Card 
              key={ministry.id} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-[#6D28D9]"
              onClick={() => navigate(`/ministry/${ministry.id}`)}
            >
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={ministry.image}
                    alt={ministry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 space-y-3">
                  <h3 className="font-['Outfit'] text-2xl font-bold text-gray-900 group-hover:text-[#6D28D9] transition-colors">
                    {ministry.name}
                  </h3>
                  
                  <p className="font-['Outfit'] text-gray-600 leading-relaxed">
                    {ministry.description}
                  </p>
                  
                  <button className="font-['Outfit'] text-[#0076C0] font-semibold hover:underline">
                    Learn More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
