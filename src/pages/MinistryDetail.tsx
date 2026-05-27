import { useParams, useNavigate } from "react-router-dom";
import { PageNavbar } from "@/components/PageNavbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Mail, ArrowLeft } from "lucide-react";
import youthimg from "@/assets/champions.jpg";
import childrenimg from "@/assets/kids.jpg";
import marriageimg from "@/assets/Marraige team.jpg";
import praisechoir2 from "@/assets/praisechoir2.jpg";
import joychoir1 from "@/assets/joychoir1.jpg";
import shebshebachoir from "@/assets/shebshebachoir.jpg";
import praiesechoir1 from "@/assets/praiesechoir1.jpg";
import halelchorir from "@/assets/halelchorir.jpg";
import youthchoir from "@/assets/youthchoir.jpg";
import chm1 from "@/assets/chm1.jpg";
import chm3 from "@/assets/chm3.jpg";
import media1 from "@/assets/media1.jpg";
import nightprayer4 from "@/assets/nightprayer4.jpg";
import evangelism from "@/assets/evangelism.jpg";

interface Ministry {
  id: number;
  name: string;
  mission: string;
  description: string;
  image: string;
  activities: { title: string; description: string; image: string }[];
  testimonies: { quote: string; author: string }[];
  leader: { name: string; message: string; photo: string };
  schedule: string;
  contact: string;
}

const ministriesData: Ministry[] = [
  {
    id: 1,
    name: "Youth Ministry",
    mission: "Empowering the next generation to know God, grow in faith, and make a difference in their world.",
    description: "Our Youth Ministry is dedicated to helping young people develop a strong foundation in Christ through dynamic programs and mentorship.",
    image: youthimg,
    activities: [
      { title: "Weekly Gatherings", description: "Interactive Bible studies and worship sessions", image: youthimg },
      { title: "Service Projects", description: "Community outreach and mission opportunities", image: youthimg },
      { title: "Retreats", description: "Annual spiritual growth retreats", image: youthimg }
    ],
    testimonies: [
      {
        quote: "Being part of the youth ministry has transformed my relationship with God and given me lifelong friends.",
        author: "John D."
      },
      {
        quote: "The mentorship I received helped me navigate difficult times and grow stronger in my faith.",
        author: "Sarah M."
      },
      {
        quote: "Youth ministry taught me how to be a leader and use my gifts to serve others.",
        author: "Michael T."
      }
    ],
    leader: {
      name: "Pastor John Doe",
      message: "I'm passionate about seeing young people discover their purpose in Christ and become the leaders God has called them to be.",
      photo: youthimg
    },
    schedule: "Saturday 2:00PM – 4:00PM",
    contact: "youth@ncic.org"
  },
  {
    id: 2,
    name: "Children Ministry",
    mission: "Creating a fun, safe environment where children can learn about Jesus and grow in faith.",
    description: "Our Children's Ministry provides age-appropriate activities and biblical teaching for kids.",
    image: childrenimg,
    activities: [
      { title: "Sunday School", description: "Engaging Bible lessons for all ages", image: childrenimg },
      { title: "Vacation Bible School", description: "Summer program with games and activities", image: childrenimg },
      { title: "Kids Worship", description: "Age-appropriate worship experience", image: childrenimg }
    ],
    testimonies: [
      {
        quote: "My children love coming to church now! They're learning about Jesus in such a fun way.",
        author: "Parent Testimonial"
      },
      {
        quote: "The teachers are so caring and make Bible stories come alive for the kids.",
        author: "Lisa K."
      },
      {
        quote: "My son can't wait for Sunday school every week. He's memorizing scripture and sharing it at home!",
        author: "David R."
      }
    ],
    leader: {
      name: "Sister Mary Smith",
      message: "Every child matters to God, and we're committed to helping them discover His love in a way they can understand.",
      photo: childrenimg
    },
    schedule: "Sunday 10:00AM – 1:00PM",
    contact: "children@ncic.org"
  },
  {
    id: 3,
    name: "Marriage Council",
    mission: "Strengthening marriages and families through biblical principles and practical guidance.",
    description: "Our Marriage Council offers support for couples at every stage of their journey.",
    image: marriageimg,
    activities: [
      { title: "Pre-Marital Counseling", description: "Preparation for a strong marriage foundation", image: marriageimg },
      { title: "Marriage Workshops", description: "Enrichment sessions for married couples", image: marriageimg },
      { title: "Couples Retreats", description: "Special getaways for relationship growth", image: marriageimg }
    ],
    testimonies: [
      {
        quote: "The marriage council helped us navigate difficult times and grow stronger together.",
        author: "David & Sarah"
      },
      {
        quote: "Pre-marital counseling prepared us for a Christ-centered marriage. Best decision we made!",
        author: "James & Ruth"
      },
      {
        quote: "The workshops gave us practical tools to improve our communication and deepen our love.",
        author: "Peter & Grace"
      }
    ],
    leader: {
      name: "Pastor David & Sister Sarah Johnson",
      message: "We believe strong marriages are the foundation of strong families and communities. Let us help you build a Christ-centered marriage.",
      photo: marriageimg
    },
    schedule: "",
    contact: "marriage@ncic.org"
  },
  {
    id: 4,
    name: "Choirs",
    mission: "Lifting voices in worship and praise to glorify God through music.",
    description: "Our Choir Ministry leads the congregation in powerful musical expressions of faith.",
    image: praisechoir2,
    activities: [
      { title: "Joy Choir", description: "Bringing joy through worship and praise", image: joychoir1 },
      { title: "Shebsheba Choir", description: "Worshiping with passion and dedication", image: shebshebachoir },
      { title: "Praise Choir", description: "Leading the congregation in powerful praise", image: praiesechoir1 },
      { title: "Halel Choir", description: "Glorifying God with harmonious voices", image: halelchorir },
      { title: "Youth Choir", description: "Young voices raised in worship", image: youthchoir }
    ],
    testimonies: [
      {
        quote: "Serving in the choir ministry has helped me grow spiritually and become closer to God.",
        author: "Sarah M."
      },
      {
        quote: "Worshiping through song has deepened my prayer life and connection with the Holy Spirit.",
        author: "Emmanuel T."
      },
      {
        quote: "The choir family has become my second family. We worship together and support each other.",
        author: "Rachel L."
      }
    ],
    leader: {
      name: "Minister of Music",
      message: "Music is a powerful tool for worship. Join us as we use our voices to glorify God and inspire others.",
      photo: praisechoir2
    },
    schedule: "",
    contact: "choir@ncic.org"
  },
  {
    id: 5,
    name: "Evangelism",
    mission: "Spreading the Gospel and sharing Christ's love with our community.",
    description: "Our Evangelism Ministry reaches out to share the Good News through various outreach programs.",
    image: evangelism,
    activities: [
      { title: "Community Outreach", description: "Street evangelism and events", image: evangelism },
      { title: "Mission Trips", description: "Local and international missions", image: evangelism },
      { title: "Training Sessions", description: "Equipping believers to share their faith", image: evangelism }
    ],
    testimonies: [
      {
        quote: "Being part of evangelism has given me boldness to share my faith and see lives transformed.",
        author: "Michael T."
      },
      {
        quote: "I've witnessed miracles and salvations through our outreach programs. God is so faithful!",
        author: "Hannah K."
      },
      {
        quote: "Evangelism training equipped me to share the Gospel with confidence and compassion.",
        author: "Joseph M."
      }
    ],
    leader: {
      name: "Evangelist Team",
      message: "The harvest is plentiful! Join us in reaching the lost and making disciples for Christ.",
      photo: evangelism
    },
    schedule: "",
    contact: "evangelism@ncic.org"
  },
  {
    id: 6,
    name: "Prayer Ministry",
    mission: "Interceding for our church family and community through dedicated prayer.",
    description: "Our Prayer Ministry is the spiritual backbone of our church, believing in the power of prayer.",
    image: nightprayer4,
    activities: [
      { title: "Prayer Meetings", description: "Regular corporate prayer gatherings", image: nightprayer4 },
      { title: "24/7 Prayer Chain", description: "Continuous prayer coverage", image: nightprayer4 },
      { title: "Prayer Counseling", description: "One-on-one prayer support", image: nightprayer4 }
    ],
    testimonies: [
      {
        quote: "The prayer ministry has taught me the power of intercession and deepened my prayer life.",
        author: "Grace L."
      },
      {
        quote: "I've seen God answer prayers in miraculous ways through our prayer chain.",
        author: "Daniel W."
      },
      {
        quote: "Being a prayer warrior has transformed my relationship with God and strengthened my faith.",
        author: "Esther N."
      }
    ],
    leader: {
      name: "Prayer Coordinator",
      message: "Prayer changes things! Join us as we stand in the gap and intercede for our church and community.",
      photo: nightprayer4
    },
    schedule: "",
    contact: "prayer@ncic.org"
  },
  {
    id: 7,
    name: "CHM (Care and Help Ministry)",
    mission: "Demonstrating Christ's love through practical acts of service and charity.",
    description: "CHM serves those in need with compassion, providing food, clothing, and support.",
    image: chm3,
    activities: [
      { title: "Prison Ministry", description: "Bringing hope and the Gospel to those in prison", image: chm3 },
      { title: "Health Ministry", description: "Providing medical care and health support to the community", image: chm1 },
      { title: "Giving", description: "Supporting those in need through generous giving and charity", image: chm3 }
    ],
    testimonies: [
      {
        quote: "Serving in CHM has shown me what it truly means to be the hands and feet of Jesus.",
        author: "Peter K."
      },
      {
        quote: "Helping others in their time of need has blessed me more than I could have imagined.",
        author: "Martha S."
      },
      {
        quote: "CHM taught me that small acts of kindness can make a huge difference in someone's life.",
        author: "Samuel B."
      }
    ],
    leader: {
      name: "CHM Coordinator",
      message: "We believe in showing God's love through action. Join us in making a tangible difference in people's lives.",
      photo: chm3
    },
    schedule: "",
    contact: "chm@ncic.org"
  },
  {
    id: 8,
    name: "Media / Production",
    mission: "Using technology and creativity to enhance worship and extend our ministry reach.",
    description: "Our Media team handles audio, video, live streaming, and all technical aspects of services.",
    image: media1,
    activities: [
      { title: "Live Streaming", description: "Broadcasting services online", image: media1 },
      { title: "Audio/Video", description: "Sound and visual production", image: media1 },
      { title: "Social Media", description: "Digital content creation", image: media1 }
    ],
    testimonies: [
      {
        quote: "Being part of the media team allows me to use my technical skills to serve God and His church.",
        author: "Daniel R."
      },
      {
        quote: "Working behind the scenes has taught me that every role in ministry is important and valuable.",
        author: "Rebecca T."
      },
      {
        quote: "The media ministry has helped me grow in my creativity while serving the kingdom of God.",
        author: "Timothy L."
      }
    ],
    leader: {
      name: "Media Director",
      message: "We work behind the scenes to ensure every service runs smoothly and reaches people both in-person and online.",
      photo: media1
    },
    schedule: "",
    contact: "media@ncic.org"
  }
];

export default function MinistryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ministry = ministriesData.find(m => m.id === Number(id));

  if (!ministry) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <PageNavbar />
        <div className="max-w-7xl mx-auto px-8 py-32 text-center">
          <h1 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-4">Ministry Not Found</h1>
          <button
            onClick={() => navigate("/ministry")}
            className="font-['Outfit'] text-[#0076C0] hover:underline"
          >
            ← Back to Ministries
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageNavbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/ministry")}
            className="flex items-center gap-2 font-['Outfit'] text-[#0076C0] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Ministries
          </button>
          
          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={ministry.image}
              alt={ministry.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="font-['Outfit'] font-bold text-5xl text-gray-900 mb-4">
            {ministry.name}
          </h1>
          <p className="font-['Outfit'] text-2xl text-[#6D28D9] italic mb-6">
            {ministry.mission}
          </p>
          <p className="font-['Outfit'] text-lg text-gray-700 leading-relaxed">
            {ministry.description}
          </p>
        </div>
      </div>

      {/* Activities Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="font-['Outfit'] font-bold text-4xl text-gray-900 mb-12 text-center">
          {ministry.id === 4 ? "Our Choirs" : "Our Activities"}
        </h2>
        <div className={`grid ${ministry.id === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
          {ministry.activities.map((activity, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Title on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                  <h3 className="font-['Outfit'] font-bold text-2xl text-white mb-2 drop-shadow-lg">
                    {activity.title}
                  </h3>
                  <div className="h-1 w-16 bg-[#6D28D9] rounded-full transform origin-left transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-white p-6 border-t-4 border-[#6D28D9]">
                <p className="font-['Outfit'] text-gray-700 leading-relaxed">
                  {activity.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Testimony Section */}
      <div className="bg-[#6D28D9]/10 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-8 text-center">Member Testimonies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ministry.testimonies.map((testimony, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <blockquote className="font-['Outfit'] text-lg italic text-gray-700 mb-4">
                    "{testimony.quote}"
                  </blockquote>
                  <p className="font-['Outfit'] text-base text-[#6D28D9] font-semibold">
                    — {testimony.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Leader Message Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-8">Message from Our Leader</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <img
              src={ministry.leader.photo}
              alt={ministry.leader.name}
              className="w-full aspect-square object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <p className="font-['Outfit'] text-lg text-gray-700 leading-relaxed mb-4">
              {ministry.leader.message}
            </p>
            <p className="font-['Outfit'] text-xl font-bold text-[#6D28D9]">
              {ministry.leader.name}
            </p>
          </div>
        </div>
      </div>

      {/* Meeting Time & Contact Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className={`grid ${ministry.schedule ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8`}>
            {ministry.schedule && (
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Clock className="w-8 h-8 text-[#6D28D9]" />
                    <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900">Meeting Time</h3>
                  </div>
                  <p className="font-['Outfit'] text-lg text-gray-700">
                    {ministry.schedule}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Mail className="w-8 h-8 text-[#6D28D9]" />
                  <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900">Contact Leader</h3>
                </div>
                <p className="font-['Outfit'] text-lg text-gray-700 mb-4">
                  {ministry.contact}
                </p>
                <button className="w-full bg-[#6D28D9] text-white font-['Outfit'] font-semibold px-6 py-3 rounded-lg hover:bg-[#5a21b6] transition-colors">
                  Get Involved
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
