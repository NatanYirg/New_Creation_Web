import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Facebook, Instagram, Youtube, CheckCircle, X } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletter } from "@/api/newsletter";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const mutation = useMutation({
    mutationFn: (email: string) => subscribeNewsletter(email),
    onSuccess: (res) => {
      setEmail("");
      setAlreadySubscribed(false);
      setShowSuccess(true);
    },
    onError: (err: any) => {
      // 409 = already subscribed
      if (err?.response?.status === 409) {
        setAlreadySubscribed(true);
        setShowSuccess(false);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlreadySubscribed(false);
    mutation.mutate(email);
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

            {/* Success dialog */}
            {showSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-5 flex items-start gap-4 text-left max-w-md mx-auto">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-green-800">You're subscribed!</p>
                  <p className="text-sm text-green-700 mt-0.5">
                    Thank you for joining our newsletter. You'll receive updates on services, events, and more.
                  </p>
                </div>
                <button onClick={() => setShowSuccess(false)} className="text-green-500 hover:text-green-700 flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Already subscribed notice */}
            {alreadySubscribed && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto text-sm text-blue-700 font-medium">
                This email is already subscribed to our newsletter.
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                  disabled={mutation.isPending}
                />
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-[#2A1E65] hover:bg-primary-dark text-primary-foreground px-6 disabled:opacity-50"
                >
                  {mutation.isPending ? "..." : "Subscribe"}
                </Button>
              </div>
              {mutation.isError && !alreadySubscribed && (
                <p className="text-sm text-red-500 mt-2">Something went wrong. Please try again.</p>
              )}
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
            <a href="http://www.facebook.com/newcreationchurchethiopia" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-12 h-12 rounded-full p-0 border-primary/20 hover:border-primary hover:bg-[#352779] hover:text-primary-foreground">
                <Facebook className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://www.instagram.com/intchurch/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-12 h-12 rounded-full p-0 border-primary/20 hover:border-primary hover:bg-[#352779] hover:text-primary-foreground">
                <Instagram className="w-5 h-5" />
              </Button>
            </a>
            <a href="http://www.youtube.com/@NewCreationChurchEthiopia" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-12 h-12 rounded-full p-0 border-primary/20 hover:border-primary hover:bg-[#352779] hover:text-primary-foreground">
                <Youtube className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://www.tiktok.com/@newcreationintchurch" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-12 h-12 rounded-full p-0 border-primary/20 hover:border-primary hover:bg-[#352779] hover:text-primary-foreground">
                <FaTiktok className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
