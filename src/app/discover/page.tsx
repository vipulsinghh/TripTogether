
"use client";

import { useState, useEffect } from 'react';
import type { Trip } from '@/types'; 
import TripCard from '@/components/core/trip-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Mountain, Palmtree, Sun, MountainSnow, Snowflake, Search, RotateCcw, Landmark, Palette, Building2, Bike, Navigation, Tag, Users as UsersIcon, Briefcase, ThumbsUp, Zap, DollarSign, UserCog } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';
import { categoriesList as appCategories } from '@/types'; 

const initialTrips: Trip[] = [
  {
    id: '1',
    title: 'Bali Adventure Week',
    destination: 'Bali, Indonesia',
    startLocation: 'Denpasar Airport (DPS)',
    startDate: new Date('2024-10-10'),
    endDate: new Date('2024-10-17'),
    description: 'Explore volcanoes, surf, and find your zen in beautiful Bali. We will visit waterfalls, rice paddies and enjoy local cuisine.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'bali landscape',
    maxGroupSize: 8,
    currentMemberCount: 5,
    budget: '$1000 - $1500',
    categories: ['Beach', 'Adventure', 'Cultural'],
    createdById: 'user1',
    creatorName: 'Admin User',
    smokingPolicy: 'not_permitted',
    alcoholPolicy: 'socially',
    genderPreference: 'mixed',
    targetAgeGroup: '18-25',
    targetTravelerType: 'backpackers',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Tokyo Tech & Tradition',
    destination: 'Tokyo, Japan',
    startLocation: 'Narita International Airport (NRT)',
    startDate: new Date('2024-11-05'),
    endDate: new Date('2024-11-12'),
    description: 'Experience the vibrant culture, futuristic tech, and ancient temples of Tokyo. A mix of modern marvels and serene shrines.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'tokyo city',
    maxGroupSize: 6,
    currentMemberCount: 3,
    budget: '$2000 - $2500',
    categories: ['City Break', 'Cultural', 'Historical'],
    createdById: 'user2',
    creatorName: 'JapanLover',
    smokingPolicy: 'any',
    alcoholPolicy: 'permitted',
    genderPreference: 'any',
    targetAgeGroup: '26-35',
    targetTravelerType: 'friends',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Parisian Charm Getaway',
    destination: 'Paris, France',
    startLocation: 'Charles de Gaulle Airport (CDG)',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-07'),
    description: 'Indulge in art, cuisine, and romance in the City of Lights. Visit museums, enjoy cafes, and stroll along the Seine.',
    imageUrls: ['https://placehold.co/600x400.png'],
    dataAiHint: 'paris romance',
    maxGroupSize: 4,
    currentMemberCount: 2,
    budget: '$1800 - $2200',
    categories: ['City Break', 'Cultural', 'Historical', 'Foodie'],
     createdById: 'user3',
    creatorName: 'ArtBuff',
    smokingPolicy: 'not_permitted',
    alcoholPolicy: 'socially',
    genderPreference: 'couples',
    targetAgeGroup: 'any',
    targetTravelerType: 'couples',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
    {
    id: '4',
    title: 'Andes Mountain Trek',
    destination: 'Peru',
    startLocation: 'Cusco City Center',
    startDate: new Date('2025-01-10'),
    endDate: new Date('2025-01-20'),
    description: 'Challenging trek through the stunning Andes mountains. Experience breathtaking views and ancient Incan trails.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'andes peru',
    maxGroupSize: 10,
    currentMemberCount: 4,
    budget: '$2200 - $2800',
    categories: ['Mountains', 'Adventure', 'Historical'],
    createdById: 'user4',
    creatorName: 'TrekMaster',
    smokingPolicy: 'not_permitted', alcoholPolicy: 'not_permitted', genderPreference: 'mixed', targetAgeGroup: '18-35', targetTravelerType: 'adventure',
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Sahara Desert Expedition',
    destination: 'Morocco',
    startLocation: 'Marrakech City',
    startDate: new Date('2025-02-15'),
    endDate: new Date('2025-02-22'),
    description: 'Camel rides, stargazing, and Berber culture in the vast Sahara desert. Sleep under the stars in a desert camp.',
    imageUrls: ['https://placehold.co/600x400.png'],
    dataAiHint: 'sahara morocco',
    maxGroupSize: 12,
    currentMemberCount: 6,
    budget: '$1500 - $2000',
    categories: ['Desert', 'Adventure', 'Cultural'],
    createdById: 'user5',
    creatorName: 'DesertDreamer',
    smokingPolicy: 'any', alcoholPolicy: 'socially', genderPreference: 'any', targetAgeGroup: 'any', targetTravelerType: 'friends',
    createdAt: new Date(), updatedAt: new Date(),
  },
];

const categoryIcons: { [key: string]: React.ElementType } = {
  'Mountains': Mountain,
  'Beach': Palmtree,
  'Desert': Sun,
  'Hill Stations': MountainSnow,
  'Ice & Snow': Snowflake,
  'Historical': Landmark,
  'Cultural': Palette,
  'City Break': Building2,
  'Adventure': Bike,
  'Road Trip': Navigation,
  'Wildlife': Briefcase, 
  'Wellness': ThumbsUp, 
  'Foodie': Zap, 
  'Nightlife': Zap, 
  'Budget': DollarSign, 
};


export default function DiscoverPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [profilePreferencesSet, setProfilePreferencesSet] = useState<boolean | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const preferencesSet = localStorage.getItem('userProfilePreferencesSet') === 'true';
      setProfilePreferencesSet(preferencesSet);
      
      // Redirect to login if not signed in - this page requires auth
      const signedIn = localStorage.getItem('isUserSignedIn') === 'true';
      if (!signedIn) {
        // Assuming you have a way to redirect, e.g. Next.js router
        // For simplicity, just don't load trips. In a real app, redirect.
        setTrips([]); 
        return;
      }
    }
    setTrips(initialTrips); // Load initial trips if signed in
  }, []);
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  const handleCategorySelect = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = searchTerm === '' || 
                          trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || (trip.categories && trip.categories.includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  if (profilePreferencesSet === null) { // Still checking if profile state is determined
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <RotateCcw className="h-10 w-10 text-primary animate-spin mr-2" /> 
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 md:space-y-8">
      {!profilePreferencesSet && (
        <Alert variant="default" className="border-primary bg-primary/5">
          <UserCog className="h-5 w-5 text-primary" />
          <AlertTitle className="font-semibold text-primary">Complete Your Profile!</AlertTitle>
          <AlertDescription className="text-foreground/80">
            To get the best travel recommendations and connect with groups tailored to your interests, please complete your profile preferences.
          </AlertDescription>
          <div className="mt-4">
            <Button asChild size="sm">
              <Link href="/profile">Go to Profile</Link>
            </Button>
          </div>
        </Alert>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search trips by title or destination..." 
          className="pl-10 pr-4 py-3 rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center"><Tag className="mr-2 h-5 w-5 md:h-6 md:w-6 text-primary" />Categories</h2>
        </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex space-x-3 sm:space-x-4 pb-4">
            {appCategories.map((category) => {
              const IconComponent = categoryIcons[category.id] || Tag; 
              return (
                <Button 
                  key={category.id} 
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-24 w-24 p-2 rounded-lg shadow-md transition-all hover:shadow-lg"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <IconComponent className={`h-8 w-8 mb-1 sm:mb-2 ${selectedCategory === category.id ? 'text-primary-foreground' : 'text-primary'}`} />
                  <span className="text-xs font-medium text-center break-words">{category.name}</span>
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            {selectedCategory ? `${selectedCategory} Trips` : "Recommended Trips"}
          </h2>
           {(searchTerm || selectedCategory) && (
            <Button onClick={handleResetFilters} variant="outline" size="sm">
              <RotateCcw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Clear Filters
            </Button>
          )}
        </div>
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center py-10">
             <UsersIcon className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mb-4" />
            <p className="text-lg md:text-xl text-muted-foreground mb-4">No trips match your current search or filters.</p>
            <Button onClick={handleResetFilters} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Filters & Reload All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
