
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Compass, Zap, HeartHandshake, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isSignedIn = localStorage.getItem('isUserSignedIn');
      if (isSignedIn === 'true') {
        router.replace('/discover');
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="absolute inset-0">
          <Image
            src="https://cdn.pixabay.com/photo/2018/10/01/11/45/landscape-3715977_1280.jpg"
            alt="Beautiful travel landscape"
            layout="fill"
            objectFit="cover"
            data-ai-hint="travel landscape"
            priority // Add priority for LCP images
          />
           <div className="absolute inset-0 bg-black/40"></div> {/* Overlay for better text contrast */}
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">RoamMate:</span> Find Your Travel Tribe
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Connect with like-minded adventurers, discover unique trips, and plan your next unforgettable journey together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground hover:opacity-90 transition-opacity">
              <Link href="/auth/sign-up">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/70 hover:bg-background/90 border-white/50 hover:border-white/80 text-foreground" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">What is RoamMate?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              RoamMate is more than just a travel app. It's a community for passionate explorers looking to share experiences, discover new destinations, and form lasting connections on the road.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Group of friends traveling"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="friends travel"
              />
            </div>
            <div className="space-y-4 text-foreground/90">
              <p>
                Ever dreamt of a trip but couldn't find the right companions? Or perhaps you're an avid traveler seeking new adventures with new friends? RoamMate bridges that gap.
              </p>
              <p>
                We leverage smart matching and AI-powered suggestions to help you find or create travel groups that perfectly align with your interests, budget, and travel style.
              </p>
              <p>
                From weekend getaways to epic backpacking odysseys, RoamMate makes group travel seamless, fun, and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Why Choose RoamMate?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover features designed to make your travel planning and experience extraordinary.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 md:h-10 md:w-10 text-primary mb-4" />,
                title: 'Find Your Crew',
                description: 'Connect with travelers who share your passions and travel style. Swipe, match, and chat!',
              },
              {
                icon: <Compass className="h-8 w-8 md:h-10 md:w-10 text-primary mb-4" />,
                title: 'Discover Trips',
                description: 'Explore a variety of user-created trips or get inspired to create your own adventure.',
              },
              {
                icon: <Lightbulb className="h-8 w-8 md:h-10 md:w-10 text-primary mb-4" />,
                title: 'AI-Powered Suggestions',
                description: 'Get smart recommendations for activities, icebreakers, and even trip ideas based on your group\'s profile.',
              },
              {
                icon: <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-primary mb-4" />,
                title: 'Easy Trip Planning',
                description: 'Organize itineraries, manage expenses, and communicate effectively within your travel group.',
              },
              {
                icon: <HeartHandshake className="h-8 w-8 md:h-10 md:w-10 text-primary mb-4" />,
                title: 'Build Connections',
                description: 'More than just travel partners, find friends for life through shared adventures.',
              },
              {
                icon: <Zap className="h-8 w-8 md:h-10 md:w-10 text-primary mb-4" />,
                title: 'Profile Customization',
                description: 'Showcase your travel history, interests, and preferences to find the best matches.',
              },
            ].map((feature) => (
              <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Get Started in 3 Easy Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex justify-center items-center mx-auto mb-6 h-16 w-16 rounded-full bg-primary/10 text-primary text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-foreground/70">Sign up and tell us about your travel style, interests, and what you're looking for.</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center items-center mx-auto mb-6 h-16 w-16 rounded-full bg-primary/10 text-primary text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Discover & Connect</h3>
              <p className="text-foreground/70">Swipe through potential trips and travel mates. Join existing groups or create your own.</p>
            </div>
            <div className="p-6">
               <div className="flex justify-center items-center mx-auto mb-6 h-16 w-16 rounded-full bg-primary/10 text-primary text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Plan & Adventure</h3>
              <p className="text-foreground/70">Collaborate with your group, plan your itinerary, and embark on an unforgettable journey!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-tr from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
            Join the RoamMate community today and never travel solo (unless you want to!).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Button size="lg" asChild className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground hover:opacity-90 transition-opacity">
              <Link href="/auth/sign-up">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/sign-in">Already a Member? Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
