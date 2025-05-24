
"use client";

import { useState, useEffect } from 'react';
import TripCard from '@/components/core/trip-card';
import type { Trip } from '@/types'; 
import FilterPanel from '@/components/core/filter-panel';
import { Loader2, Users as UsersIcon } from 'lucide-react'; 
import { useRouter } from 'next/navigation';

const mockGroups: Trip[] = [ 
  {
    id: 'group1',
    title: 'Southeast Asia Backpackers',
    destination: 'Thailand, Vietnam, Cambodia',
    startLocation: 'Bangkok, Thailand',
    startDate: new Date('2024-11-01'),
    endDate: new Date('2025-01-31'),
    description: 'Looking for adventurous souls to explore SEA for 2 months. Flexible itinerary, open to all friendly travelers. Focus on cultural immersion and street food.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'asia temple',
    maxGroupSize: 10,
    currentMemberCount: 3,
    budget: '$1500/month',
    categories: ['Adventure', 'Cultural', 'Beach', 'Budget'],
    createdById: 'user_creator1',
    smokingPolicy: 'outside_only',
    alcoholPolicy: 'socially',
    genderPreference: 'mixed',
    targetAgeGroup: '18-25',
    targetTravelerType: 'backpackers',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'group2',
    title: 'European Cities Tour',
    destination: 'Paris, Rome, Berlin',
    startLocation: 'Paris, France',
    startDate: new Date('2025-04-01'),
    endDate: new Date('2025-04-20'),
    description: 'Culture vultures unite! Join us for a whirlwind tour of Europe\'s iconic cities. Museum visits, historical walks, and fine dining. Couples and singles welcome.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'europe city',
    maxGroupSize: 8,
    currentMemberCount: 4,
    budget: '$2500 - $3000',
    categories: ['City Break', 'Historical', 'Cultural', 'Foodie'],
    createdById: 'user_creator2',
    smokingPolicy: 'not_permitted',
    alcoholPolicy: 'permitted',
    genderPreference: 'any',
    targetAgeGroup: '26-35',
    targetTravelerType: 'friends',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'group3',
    title: 'Andes Trekking Expedition',
    destination: 'Peru & Bolivia',
    startLocation: 'Cusco, Peru',
    startDate: new Date('2025-07-01'),
    endDate: new Date('2025-07-20'),
    description: 'High-altitude trekking adventure through the Andes. Experienced hikers preferred. This is a challenging trip for serious adventurers.',
    imageUrls: ['https://placehold.co/600x400.png'],
    dataAiHint: 'andes mountains',
    maxGroupSize: 6,
    currentMemberCount: 2,
    budget: '$3000 - $4000',
    categories: ['Mountains', 'Adventure'],
    createdById: 'user_creator3',
    smokingPolicy: 'not_permitted',
    alcoholPolicy: 'not_permitted',
    genderPreference: 'any',
    targetAgeGroup: 'any',
    targetTravelerType: 'adventure',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'group4',
    title: 'Family Beach Holiday - Costa Rica',
    destination: 'Costa Rica',
    startLocation: 'San José, Costa Rica',
    startDate: new Date('2025-08-01'),
    endDate: new Date('2025-08-10'),
    description: 'Fun and relaxing beach holiday for families. Kid-friendly activities, safe environment. No smoking, light alcohol okay.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'costa rica beach family',
    maxGroupSize: 12,
    currentMemberCount: 7,
    budget: '$2000 - $2800',
    categories: ['Beach', 'Family'], 
    createdById: 'user_creator4',
    smokingPolicy: 'not_permitted',
    alcoholPolicy: 'socially',
    genderPreference: 'any',
    targetAgeGroup: 'any',
    targetTravelerType: 'family',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function GroupsPage() {
  const [filteredGroups, setFilteredGroups] = useState<Trip[]>([]);
  const [filters, setFilters] = useState({
    destination: '',
    startLocation: '',
    budget: '', 
    dates: '', 
    interests: '', 
    smokingPolicy: 'any',
    alcoholPolicy: 'any',
    genderPreference: 'any',
    groupSize: [2, 20] as [number, number], 
    ageGroup: 'any',
    travelerType: 'any',
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const signedIn = localStorage.getItem('isUserSignedIn') === 'true';
      const preferencesSet = localStorage.getItem('userProfilePreferencesSet') === 'true';
      if (!signedIn) {
        router.replace('/'); // Redirect to landing if not signed in
        return;
      }
      if (signedIn && !preferencesSet) {
        router.replace('/profile'); // Redirect to profile if signed in but profile not set
        return;
      }
    }
    
    setIsLoading(true);
    console.log("Applying filters (GroupsPage):", filters);
    
    let tempGroups = mockGroups;

    if (filters.destination) {
        tempGroups = tempGroups.filter(group => group.destination.toLowerCase().includes(filters.destination.toLowerCase()));
    }
    if (filters.startLocation) {
        tempGroups = tempGroups.filter(group => group.startLocation && group.startLocation.toLowerCase().includes(filters.startLocation.toLowerCase()));
    }
    if (filters.smokingPolicy !== 'any') {
      tempGroups = tempGroups.filter(group => group.smokingPolicy === filters.smokingPolicy || group.smokingPolicy === 'any');
    }
    if (filters.alcoholPolicy !== 'any') {
      tempGroups = tempGroups.filter(group => group.alcoholPolicy === filters.alcoholPolicy || group.alcoholPolicy === 'any');
    }
    if (filters.genderPreference !== 'any') {
      tempGroups = tempGroups.filter(group => group.genderPreference === filters.genderPreference || group.genderPreference === 'any');
    }
    if (filters.ageGroup !== 'any') {
      tempGroups = tempGroups.filter(group => group.targetAgeGroup === filters.ageGroup || group.targetAgeGroup === 'any');
    }
    if (filters.travelerType !== 'any') {
      tempGroups = tempGroups.filter(group => group.targetTravelerType === filters.travelerType || group.targetTravelerType === 'any');
    }
    
    tempGroups = tempGroups.filter(group => group.maxGroupSize >= filters.groupSize[0] && group.maxGroupSize <= filters.groupSize[1]);


    setTimeout(() => {
      setFilteredGroups(tempGroups);
      setIsLoading(false);
    }, 500);
     
  }, [filters, router]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/3 xl:w-1/4">
        <FilterPanel onFilterChange={handleFilterChange} />
      </aside>
      <section className="lg:w-2/3 xl:w-3/4">
        <h1 className="text-3xl font-bold mb-8 text-gradient">Find Your Travel Group</h1>
        {isLoading ? (
           <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg text-muted-foreground">Finding groups...</p>
          </div>
        ) : filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredGroups.map((group) => (
              <TripCard key={group.id} trip={group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 min-h-[300px] flex flex-col justify-center items-center bg-muted/30 rounded-lg shadow">
            <UsersIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground mb-2">No groups match your current filters.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria or view all groups.</p>
          </div>
        )}
      </section>
    </div>
  );
}
