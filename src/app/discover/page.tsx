
"use client";

import { useState, useEffect } from 'react';
import TripCard, { type TripCardProps } from '@/components/core/trip-card';
import { Button } from '@/components/ui/button';
import { Heart, X, RotateCcw, Settings2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

const initialTrips: TripCardProps[] = [
  {
    id: '1',
    title: 'Bali Adventure Week',
    destination: 'Bali, Indonesia',
    dates: 'Oct 10 - Oct 17, 2024',
    description: 'Explore volcanoes, surf, and find your zen in beautiful Bali.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'bali beach', // Changed from imageHint
    memberCount: 5,
    budget: '$1000 - $1500',
  },
  {
    id: '2',
    title: 'Tokyo Tech & Tradition',
    destination: 'Tokyo, Japan',
    dates: 'Nov 5 - Nov 12, 2024',
    description: 'Experience the vibrant culture, futuristic tech, and ancient temples of Tokyo.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'tokyo street', // Changed from imageHint
    memberCount: 3,
    budget: '$2000 - $2500',
  },
  {
    id: '3',
    title: 'Parisian Charm Getaway',
    destination: 'Paris, France',
    dates: 'Dec 1 - Dec 7, 2024',
    description: 'Indulge in art, cuisine, and romance in the City of Lights.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'paris eiffel', // Changed from imageHint
    memberCount: 2,
    budget: '$1800 - $2200',
  },
];

export default function DiscoverPage() {
  const [trips, setTrips] = useState<TripCardProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // For re-triggering animation
  const [showPreferencesAlert, setShowPreferencesAlert] = useState(true);


  useEffect(() => {
    // Simulate fetching data
    setTrips(initialTrips);
    // In a real app, check if preferences are set
    // For now, always show if not dismissed
    const dismissed = localStorage.getItem('preferencesAlertDismissed');
    if (dismissed) {
      setShowPreferencesAlert(false);
    }
  }, []);
  
  const handleSwipe = (action: 'like' | 'pass') => {
    console.log(`Trip ${trips[currentIndex]?.id} ${action}ed`);
    if (currentIndex < trips.length -1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reached end of trips, maybe show a message or reload
      console.log("No more trips!");
    }
    setKey(prev => prev + 1); // Change key to re-mount TripCard for animation
  };

  const handleReset = () => {
    setTrips(initialTrips);
    setCurrentIndex(0);
    setKey(prev => prev + 1);
    setShowPreferencesAlert(true); // Show alert again on reset
    localStorage.removeItem('preferencesAlertDismissed');
  };

  const dismissPreferencesAlert = () => {
    setShowPreferencesAlert(false);
    localStorage.setItem('preferencesAlertDismissed', 'true');
  }

  if (!trips.length || currentIndex >= trips.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <h1 className="text-3xl font-semibold mb-4">No More Trips!</h1>
        <p className="text-muted-foreground mb-6">You've swiped through all available opportunities.</p>
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reload Trips
        </Button>
      </div>
    );
  }

  const currentTrip = trips[currentIndex];

  return (
    <div className="flex flex-col items-center">
      {showPreferencesAlert && (
         <Alert className="mb-8 max-w-2xl shadow-md">
          <Info className="h-4 w-4" />
          <AlertTitle className="font-semibold">Personalize Your Experience!</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <div>
              Set your travel preferences to get better matches and suggestions.
              <Button variant="link" asChild className="p-0 ml-1 text-primary">
                <Link href="/profile">Go to Profile</Link>
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={dismissPreferencesAlert}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <h1 className="text-4xl font-bold mb-8 text-gradient">Discover Your Next Adventure</h1>
      <div className="relative w-full max-w-md h-[600px]">
        <AnimatePresence>
          {currentTrip && (
             <motion.div
              key={key} // Use key to force re-render for animation
              className="absolute w-full h-full"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TripCard {...currentTrip} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-6 mt-8">
        <Button
          variant="destructive"
          size="lg"
          className="rounded-full p-4 h-16 w-16 shadow-lg"
          onClick={() => handleSwipe('pass')}
          aria-label="Pass"
        >
          <X className="h-8 w-8" />
        </Button>
        <Button
          variant="default"
          size="lg"
          className="rounded-full p-4 h-16 w-16 shadow-lg bg-green-500 hover:bg-green-600"
          onClick={() => handleSwipe('like')}
          aria-label="Like"
        >
          <Heart className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
