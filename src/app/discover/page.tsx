
"use client";

import { useState, useEffect } from 'react';
import type { TripCardProps } from '@/components/core/trip-card';
import TripCard from '@/components/core/trip-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Mountain, Palmtree, Sun, MountainSnow, Snowflake, Search, RotateCcw, Landmark, Palette, Building2, Bike, Navigation, Tag } from 'lucide-react';
import Link from 'next/link';

const categoriesList = [
  { name: 'Mountains', icon: Mountain, dataAiHint: 'mountains landscape' },
  { name: 'Beach', icon: Palmtree, dataAiHint: 'beach sunset' },
  { name: 'Desert', icon: Sun, dataAiHint: 'desert dunes' },
  { name: 'Hill Stations', icon: MountainSnow, dataAiHint: 'hill station' },
  { name: 'Ice & Snow', icon: Snowflake, dataAiHint: 'snowy landscape' },
  { name: 'Historical', icon: Landmark, dataAiHint: 'historical ruins' },
  { name: 'Cultural', icon: Palette, dataAiHint: 'cultural festival' },
  { name: 'City Break', icon: Building2, dataAiHint: 'city skyline' },
  { name: 'Adventure', icon: Bike, dataAiHint: 'adventure sport' },
  { name: 'Road Trip', icon: Navigation, dataAiHint: 'road trip scenic' },
];

const initialTrips: TripCardProps[] = [
  {
    id: '1',
    title: 'Bali Adventure Week',
    destination: 'Bali, Indonesia',
    dates: 'Oct 10 - Oct 17, 2024',
    description: 'Explore volcanoes, surf, and find your zen in beautiful Bali. We will visit waterfalls, rice paddies and enjoy local cuisine.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'bali landscape',
    memberCount: 5,
    budget: '$1000 - $1500',
    categories: ['Beach', 'Adventure', 'Cultural'],
  },
  {
    id: '2',
    title: 'Tokyo Tech & Tradition',
    destination: 'Tokyo, Japan',
    dates: 'Nov 5 - Nov 12, 2024',
    description: 'Experience the vibrant culture, futuristic tech, and ancient temples of Tokyo. A mix of modern marvels and serene shrines.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'tokyo city',
    memberCount: 3,
    budget: '$2000 - $2500',
    categories: ['City Break', 'Cultural', 'Historical'],
  },
  {
    id: '3',
    title: 'Parisian Charm Getaway',
    destination: 'Paris, France',
    dates: 'Dec 1 - Dec 7, 2024',
    description: 'Indulge in art, cuisine, and romance in the City of Lights. Visit museums, enjoy cafes, and stroll along the Seine.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'paris romance',
    memberCount: 2,
    budget: '$1800 - $2200',
    categories: ['City Break', 'Cultural', 'Historical'],
  },
  {
    id: '4',
    title: 'Andes Mountain Trek',
    destination: 'Peru',
    dates: 'Jan 10 - Jan 20, 2025',
    description: 'Challenging trek through the stunning Andes mountains. Experience breathtaking views and ancient Incan trails.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'andes peru',
    memberCount: 4,
    budget: '$2200 - $2800',
    categories: ['Mountains', 'Adventure', 'Historical'],
  },
  {
    id: '5',
    title: 'Sahara Desert Expedition',
    destination: 'Morocco',
    dates: 'Feb 15 - Feb 22, 2025',
    description: 'Camel rides, stargazing, and Berber culture in the vast Sahara desert. Sleep under the stars in a desert camp.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'sahara morocco',
    memberCount: 6,
    budget: '$1500 - $2000',
    categories: ['Desert', 'Adventure', 'Cultural'],
  },
];


export default function DiscoverPage() {
  const [trips, setTrips] = useState<TripCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setTrips(initialTrips);
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

  return (
    <div className="flex flex-col space-y-8">
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
          <h2 className="text-2xl font-semibold flex items-center"><Tag className="mr-2 h-6 w-6 text-primary" />Categories</h2>
        </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex space-x-4 pb-4">
            {categoriesList.map((category) => (
              <Button 
                key={category.name} 
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="flex flex-col items-center justify-center h-28 w-28 p-2 rounded-lg shadow-md transition-all hover:shadow-lg"
                onClick={() => handleCategorySelect(category.name)}
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {selectedCategory ? `${selectedCategory} Trips` : "Recommended Trips"}
          </h2>
           {(searchTerm || selectedCategory) && (
            <Button onClick={handleResetFilters} variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center py-10">
            <p className="text-xl text-muted-foreground mb-4">No trips match your current search or filters.</p>
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
