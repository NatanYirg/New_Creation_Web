import { useState } from "react";
import { Button } from "@/components/ui/button";
import welcome1 from "@/assets/welcome1.jpg";
import confetti from "canvas-confetti";

export function Welcome() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleWelcomeClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    // Confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      // Confetti from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="welcome" className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content on the left */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="font-['Outfit'] font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900">
              Welcome to <span className="text-[#6D28D9]">New Creation</span>
            </h2>
            
            <p className="font-['Outfit'] text-base md:text-lg text-gray-700 leading-relaxed">
              We are thrilled to have you here! New Creation International Church Ethiopia is a community of believers passionate about experiencing God's presence and living out His purpose. Whether you're visiting for the first time or looking for a church home, we welcome you with open arms.
            </p>

            <p className="font-['Outfit'] text-base md:text-lg text-gray-700 leading-relaxed">
              Join us as we grow in faith, worship together, and make a difference in our community. You belong here, and we can't wait to meet you!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <Button
                onClick={handleWelcomeClick}
                disabled={isAnimating}
                className="w-full sm:w-auto bg-[#6D28D9] hover:bg-[#5a21b6] text-white font-['Outfit'] font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg"
              >
                Welcome to New Creation! 🎉
              </Button>
              
              <Button
                onClick={scrollToServices}
                variant="outline"
                className="w-full sm:w-auto border-2 border-[#0076C0] text-[#0076C0] hover:bg-[#0076C0] hover:text-white font-['Outfit'] font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg"
              >
                Plan Your Visit
              </Button>
            </div>
          </div>

          {/* Image on the right */}
          <div className="relative order-first md:order-last">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={welcome1}
                alt="Welcome to New Creation"
                className="w-full h-64 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
