import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import bgimg from "@/assets/home-hero-congregation.jpg";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
    <Section background="soft">
      {/* <SectionHeader 
        title="Contact Us"
        subtitle="We'd love to hear from you! Whether you have questions, prayer requests, or just want to connect, don't hesitate to reach out."
      /> */}

       <div className="relative -mt-16 left-1/2 right-1/2 w-screen -translate-x-1/2 h-[200px] flex-col items-center justify-center overflow-hidden]">
      
      <img
        src={bgimg}
        alt="Services Background"
        className="absolute inset-0 w-full h-full object-cover"
      /> 

     
      <div className="absolute inset-0 bg-[#2B1F66]/[0.92]" />

        <div className="relative z-10 flex flex-col items-center justify-center">
      
          <h1 className="z-10 font-['Outfit'] font-bold text-[110px] text-white -ml-[420px] tracking-tight">
            Contact Us
          </h1>

      <div className="absolute bottom-[10px] w-[800px] h-[73px] bg-[#6D28D9] -ml-[420px] -z-10" />
      
       </div>

    </div>
      
      <div className="grid lg:grid-cols-2 gap-12 mt-14">
        <Card className="shadow-soft border-gold/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Send Us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you? Share your questions, prayer requests, or just say hello!"
                  className="min-h-[120px]"
                />
              </div>
              
              <Button 
                type="submit"
                size="lg"
                className="w-full bg-[#6D28D9] hover:bg-primary-dark text-primary-foreground"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="border-gold/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    Phone
                  </h4>
                  <p className="text-text-soft">
                    (+251) 94050-0000
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Available Monday - Friday, 9 AM - 5 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gold/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    Email
                  </h4>
                  <p className="text-text-soft">
                    info@gracecommunity.org
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We respond within 24 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gold/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    Office Hours
                  </h4>
                  <div className="text-text-soft space-y-1">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed (See you in service!)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gradient-soft p-6 rounded-lg border border-gold/20">
            <h4 className="text-lg font-semibold text-foreground mb-3">
              Need Prayer?
            </h4>
            <p className="text-text-soft mb-4">
              Our prayer team is here for you. Submit your prayer requests and know that our 
              church family is lifting you up in prayer.
            </p>
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Submit Prayer Request
            </Button>
          </div>
        </div>
      </div>
    </Section>
  </div>
  );
}