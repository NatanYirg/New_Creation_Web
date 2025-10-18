import { Heart, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2A1E65] text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">New Creation International Church</h3>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              A place to grow, worship, and belong. Join our loving community 
              as we journey together in faith and make a difference in our world.
            </p>
            <div className="flex gap-3">
              <a href="http://www.facebook.com/newcreationchurchethiopia" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-stone-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-stone-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="http://www.youtube.com/@NewCreationChurchEthiopia" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-stone-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@newcreationintchurch" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-stone-400 transition-colors">
                <FaTiktok className="w-5 h-5" />
              </a>
              
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-stone-400 transition-colors hover:scale-125 ">Home</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Discover</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Ministry</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Devotion</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Testimony</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Service</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Teaching</a></li>
              <li><a href="#" className="hover:text-stone-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Times</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Sunday Worship: 10:00 AM</li>
              <li>Tuesday Evening: 5:30 PM</li>
              <li>Wednesday: 4:00 PM</li>
              <li>Friday Prayer: 8:00 PM</li>
              <li>Saturday Youth: 2:00 PM</li>
              <li>Children In Christ Sunday: 10:00 AM</li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Riche, Stadium</p>
                  <p>Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>(+251) 94050-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@newcreation.org</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 flex items-center justify-center gap-2">
            © {currentYear} New Creation International Church Ethiopia.
          </p>
        </div>
      </div>
    </footer>
  );
}