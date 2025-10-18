import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function Devotional() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Section>
      <SectionHeader 
        title="Today's Devotional" 
        subtitle="Start your day with God's word and let His truth guide your steps."
      />
      
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-soft border-gold/20 shadow-soft">
          <div className="flex items-center gap-2 text-text-soft mb-6">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{today}</span>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary mb-2">
                "Walking in His Light"
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                1 John 1:5-7
              </p>
            </div>
            
            <blockquote className="text-lg text-center italic text-foreground leading-relaxed px-8 py-6 bg-white/50 rounded-lg">
              "This is the message we have heard from him and declare to you: God is light; in him there is no darkness at all. 
              If we claim to have fellowship with him and yet walk in the darkness, we lie and do not live out the truth. 
              But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus, 
              his Son, purifies us from all sin."
            </blockquote>
            
            <div className="prose prose-lg text-text-soft leading-relaxed">
              <p>
                As believers, we are called to walk in God's light daily. This means living with transparency, 
                integrity, and love in all our relationships. When we choose to walk in His light, we experience 
                true fellowship with God and with one another.
              </p>
              
              <p className="font-medium text-primary">
                Today, ask yourself: "Am I walking in God's light in every area of my life?" Let His truth 
                illuminate any areas of darkness and guide you toward His perfect will.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}