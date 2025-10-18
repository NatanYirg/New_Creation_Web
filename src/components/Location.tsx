import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

export function Location() {
  return (
    <Section>
      <SectionHeader 
        title="Visit Us"
        subtitle="We'd love to welcome you to our church home. Come as you are – you'll find a warm, welcoming community ready to embrace you."
      />
      
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <Card className="overflow-hidden shadow-medium">
          {/* <div className="aspect-video bg-gradient-hero relative">
           Placeholder for map - In a real implementation, you'd embed Google Maps 
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm opacity-90">Click to view in Google Maps</p>
              </div>
            </div>
          </div> */}

          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg group">
  {/* Embedded Map */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6706946537306!2d38.758296075065736!3d9.002417791057843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b856dfd7b822d%3A0x8380738c783ba8fb!2sNew%20creation%20international%20church%20Ethiopia!5e0!3m2!1sen!2set!4v1760814877308!5m2!1sen!2set"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>

  {/* Transparent Clickable Overlay */}
  <a
    href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6706946537306!2d38.758296075065736!3d9.002417791057843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b856dfd7b822d%3A0x8380738c783ba8fb!2sNew%20creation%20international%20church%20Ethiopia!5e0!3m2!1sen!2set!4v1760814877308!5m2!1sen!2set"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute inset-0 bg-transparent cursor-pointer"
    title="Open in Google Maps"
  ></a>

  {/* Optional hover hint */}
  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white font-medium text-lg">
    Click to open in Google Maps
  </div>
</div>

        </Card>
        
        <div className="space-y-6">
          <Card className="border-gold/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Our Address
                  </h3>
                  <div className="text-text-soft space-y-1">
                    <p>New Creation International Church</p>
                    <p>Riche, Stadium</p>
                    <p>Addis Ababa</p>
                    <p>Ethiopia</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <h1>
              Getting Here
            </h1>
            <div className="text-text-soft space-y-">
              <p>
                <strong>Parking:</strong> Parking is available in our main lot and street parking on Riche Compound.
              </p>
              <p>
                <strong>Public Transit:</strong> Free transport directly in front of the church.
              </p>
              <p>
                <strong>Accessibility:</strong> Our church is fully accessible for all.
              </p>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="w-full bg-[#2A1E65] hover:bg-primary-dark text-primary-foreground flex items-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            Get Directions
          </Button>
        </div>
      </div>
    </Section>
  );
}