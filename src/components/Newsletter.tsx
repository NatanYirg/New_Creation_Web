import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <Section background="soft">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Stay Connected
          </h2>
          <p className="text-lg text-text-soft">
            Join our community and stay updated with the latest news, events, and inspirational content. 
            Be the first to know about upcoming services, special events, and opportunities to serve.
          </p>
        </div>
        
        <Card className="bg-gradient-soft border-gold/20 shadow-soft mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Mail className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                Subscribe to Our Newsletter
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button 
                  type="submit"
                  className="bg-[#2A1E65] hover:bg-primary-dark text-primary-foreground px-6"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </CardContent>
        </Card>
        
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">
            Follow Us on Social Media
          </h4>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full p-0 border-primary/20 hover:border-primary hover:bg-[#352779] hover:text-primary-foreground"
            >
              <Facebook className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full p-0 border-primary/20 hover:border-primary hover:bg-[#352779] hover:text-primary-foreground"
            >
              <Instagram className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full p-0 border-primary/20 hover:border-primary hover:bg-[#352779] hover:text-primary-foreground"
            >
              <Youtube className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}