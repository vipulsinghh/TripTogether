
"use client";

import { useState, useEffect } from 'react';
import TripCard, { type TripCardProps } from '@/components/core/trip-card';
import FilterPanel from '@/components/core/filter-panel';
import { Loader2 } from 'lucide-react'; // For loading state

const mockGroups: TripCardProps[] = [
  {
    id: 'group1',
    title: 'Southeast Asia Backpackers',
    destination: 'Thailand, Vietnam, Cambodia',
    dates: 'Nov 2024 - Jan 2025',
    description: 'Looking for adventurous souls to explore SEA for 2 months. Flexible itinerary, open to all friendly travelers. Focus on cultural immersion and street food.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'asia temple',
    memberCount: 3,
    budget: '$1500/month',
    categories: ['Adventure', 'Cultural', 'Beach'],
    // Mock filterable properties
    // ageRange: [22, 35], 
    // smoking: 'not_permitted',
    // alcohol: 'permitted',
    // genderPref: 'mixed',
    // travelerType: 'friends',
  },
  {
    id: 'group2',
    title: 'European Cities Tour',
    destination: 'Paris, Rome, Berlin',
    dates: 'Spring 2025',
    description: 'Culture vultures unite! Join us for a whirlwind tour of Europe\'s iconic cities. Museum visits, historical walks, and fine dining. Couples and singles welcome.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'europe city',
    memberCount: 4,
    budget: '$2500 - $3000',
    categories: ['City Break', 'Historical', 'Cultural'],
  },
  {
    id: 'group3',
    title: 'Andes Trekking Expedition',
    destination: 'Peru & Bolivia',
    dates: 'July 2025',
    description: 'High-altitude trekking adventure through the Andes. Experienced hikers preferred. This is a challenging trip for serious adventurers.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'andes mountains',
    memberCount: 2,
    budget: '$3000 - $4000',
    categories: ['Mountains', 'Adventure'],
  },
  {
    id: 'group4',
    title: 'Family Beach Holiday - Costa Rica',
    destination: 'Costa Rica',
    dates: 'Aug 2025',
    description: 'Fun and relaxing beach holiday for families. Kid-friendly activities, safe environment. No smoking, light alcohol okay.',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    dataAiHint: 'costa rica beach family',
    memberCount: 7,
    budget: '$2000 - $2800',
    categories: ['Beach', 'Family Friendly'], // Example, assuming TripCardProps will be updated
  },
];

export default function GroupsPage() {
  const [filteredGroups, setFilteredGroups] = useState<TripCardProps[]>([]);
  const [filters, setFilters] = useState({
    destination: '',
    budget: '',
    dates: '',
    interests: '',
    smokingPolicy: 'any',
    alcoholPolicy: 'any',
    genderPreference: 'any',
    groupSize: [2, 10],
    ageGroup: 'any',
    travelerType: 'any',
  });
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    console.log("Applying filters (GroupsPage):", filters);
    // Simulate API call / filtering
    // In a real app, fetch groups based on all filters from the backend
    
    // Basic filtering example (can be expanded, current mock data doesn't support all new filters directly)
    let tempGroups = mockGroups;

    if (filters.destination) {
        tempGroups = tempGroups.filter(group => group.destination.toLowerCase().includes(filters.destination.toLowerCase()));
    }
    if (filters.budget && filters.budget !== "any") {
      // This budget filtering is illustrative and needs a robust implementation
      // For example, if budget is "<1000", you'd parse group.budget to check
    }
    if (filters.interests) {
        //tempGroups = tempGroups.filter(group => group.description.toLowerCase().includes(filters.interests.toLowerCase())); // Or if groups have an 'interests' array
    }
    // Add more filter logic here based on how group data is structured
    // For example, if group objects had `ageRange: [min, max]`, `smokingPolicy: 'permitted'`, etc.
    // tempGroups = tempGroups.filter(group => {
    //   let matches = true;
    //   if(filters.smokingPolicy !== 'any' && group.smoking !== filters.smokingPolicy) matches = false;
    //   // ... other filters
    //   return matches;
    // });

    // Simulate delay for fetching
    setTimeout(() => {
      setFilteredGroups(tempGroups);
      setIsLoading(false);
    }, 500);
     
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/3 xl:w-1/4"> {/* Adjusted width for potentially wider filter panel */}
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
              <TripCard key={group.id} {...group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 min-h-[300px] flex flex-col justify-center items-center bg-muted/30 rounded-lg shadow">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground mb-2">No groups match your current filters.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria or view all groups.</p>
          </div>
        )}
      </section>
    </div>
  );
}
