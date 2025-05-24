
"use client";

import { useState, useEffect } from 'react';
import type { TripCardProps } from '@/components/core/trip-card';
import TripCard from '@/components/core/trip-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Mountain, Palmtree, Sun, MountainSnow, Snowflake, Search, Info, X, RotateCcw, Landmark, Palette, Building2, Bike, Navigation } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

const initialTrips: TripCardProps[] = [
  {
    id: '1',
    title: 'Bali Adventure Week',
    destination: 'Bali, Indonesia',
    dates: 'Oct 10 - Oct 17, 2024',
    description: 'Explore volcanoes, surf, and find your zen in beautiful Bali. We will visit waterfalls, rice paddies and enjoy local cuisine.',
    imageUrls: ['https://placehold.co/600x400.png?text=Bali+Volcano', 'https://placehold.co/600x400.png?text=Bali+Surf', 'https://placehold.co/600x400.png?text=Bali+Temple'],
    dataAiHint: 'bali landscape',
    memberCount: 5,
    budget: '$1000 - $1500',
  },
  {
    id: '2',
    title: 'Tokyo Tech & Tradition',
    destination: 'Tokyo, Japan',
    dates: 'Nov 5 - Nov 12, 2024',
    description: 'Experience the vibrant culture, futuristic tech, and ancient temples of Tokyo. A mix of modern marvels and serene shrines.',
    imageUrls: ['https://placehold.co/600x400.png?text=Tokyo+Skyline', 'https://placehold.co/600x400.png?text=Tokyo+Temple'],
    dataAiHint: 'tokyo city',
    memberCount: 3,
    budget: '$2000 - $2500',
  },
  {
    id: '3',
    title: 'Parisian Charm Getaway',
    destination: 'Paris, France',
    dates: 'Dec 1 - Dec 7, 2024',
    description: 'Indulge in art, cuisine, and romance in the City of Lights. Visit museums, enjoy cafes, and stroll along the Seine.',
    imageUrls: ['https://placehold.co/600x400.png?text=Paris+Eiffel+Tower', 'https://placehold.co/600x400.png?text=Paris+Louvre'],
    dataAiHint: 'paris romance',
    memberCount: 2,
    budget: '$1800 - $2200',
  },
  {
    id: '4',
    title: 'Andes Mountain Trek',
    destination: 'Peru',
    dates: 'Jan 10 - Jan 20, 2025',
    description: 'Challenging trek through the stunning Andes mountains. Experience breathtaking views and ancient Incan trails.',
    imageUrls: ['https://placehold.co/600x400.png?text=Andes+Trek', 'https://placehold.co/600x400.png?text=Machu+Picchu'],
    dataAiHint: 'andes peru',
    memberCount: 4,
    budget: '$2200 - $2800',
  },
  {
    id: '5',
    title: 'Sahara Desert Expedition',
    destination: 'Morocco',
    dates: 'Feb 15 - Feb 22, 2025',
    description: 'Camel rides, stargazing, and Berber culture in the vast Sahara desert. Sleep under the stars in a desert camp.',
    imageUrls: ['https://placehold.co/600x400.png?text=Sahara+Dunes', 'https://placehold.co/600x400.png?text=Sahara+Camel+Ride'],
    dataAiHint: 'sahara morocco',
    memberCount: 6,
    budget: '$1500 - $2000',
  },
];

const categories = [
  { name: 'Mountains', icon: Mountain, dataAiHint: 'mountains landscape' },
  { name: 'Beach', icon: Palmtree, dataAiHint: 'beach sunset' },
  { name: 'Desert', icon: Sun, dataAiHint: 'desert dunes' },
  { name: 'Hill Stations', icon: MountainSnow, dataAiHint: 'hill station' },
  { name: 'Ice & Snow', icon: Snowflake, dataAiHint: 'snowy landscape' },
  { name: 'Historical', icon: Landmark, dataAiHint: 'historical ruins' },
  { name: 'Cultural', icon: Palette, dataAiHint: 'cultural festival' },
  { name: 'City Break', icon: Building2, dataAiHint: 'city skyline' },
  { name: 'Adventure', icon: Bike, dataAiHint: 'adventure sport' }, // Changed from Adventure Sports
  { name: 'Road Trip', icon: Navigation, dataAiHint: 'road trip scenic' },
];

export default function DiscoverPage() {
  const [trips, setTrips] = useState<TripCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPreferencesAlert, setShowPreferencesAlert] = useState(true);

  useEffect(() => {
    setTrips(initialTrips);
    const dismissed = localStorage.getItem('preferencesAlertDismissed');
    if (dismissed) {
      setShowPreferencesAlert(false);
    }
  }, []);
  
  const handleReset = () => {
    setTrips(initialTrips);
    setSearchTerm('');
    setSelectedCategory(null);
    setShowPreferencesAlert(true); // Show alert again on reset
    localStorage.removeItem('preferencesAlertDismissed');
  };

  const dismissPreferencesAlert = () => {
    setShowPreferencesAlert(false);
    localStorage.setItem('preferencesAlertDismissed', 'true');
  }

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = searchTerm === '' || 
                          trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    // TODO: Implement actual category filtering when trips have category data
    // const matchesCategory = selectedCategory === null || trip.category === selectedCategory; 
    return matchesSearch; // && matchesCategory;
  });

  return (
    <div className="flex flex-col space-y-8">
      {showPreferencesAlert && (
         <Alert className="shadow-md">
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search trips by title or destination..." 
          className="pl-10 pr-4 py-3 text-base rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
          {/* <Button variant="link" asChild className="text-primary">
            <Link href="/categories">See All</Link> {/* Link to a future dedicated categories page */}
          {/* </Button> */}
        </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex space-x-4 pb-4">
            {categories.map((category) => (
              <Button 
                key={category.name} 
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="flex flex-col items-center justify-center h-28 w-28 p-2 rounded-lg shadow-md transition-all hover:shadow-lg"
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              >
                <category.icon className={`h-10 w-10 mb-2 ${selectedCategory === category.name ? 'text-primary-foreground' : 'text-primary'}`} />
                <span className="text-xs font-medium text-center">{category.name}</span>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Recommended Trips</h2>
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
            <p className="text-xl text-muted-foreground mb-4">No trips match your current search or filters.</p>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Filters & Reload
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
