
"use client";

import { useState, useEffect } from 'react';
import TripCard, { type TripCardProps } from '@/components/core/trip-card';
import FilterPanel from '@/components/core/filter-panel';

const mockGroups: TripCardProps[] = [
  {
    id: 'group1',
    title: 'Southeast Asia Backpackers',
    destination: 'Thailand, Vietnam, Cambodia',
    dates: 'Nov 2024 - Jan 2025',
    description: 'Looking for adventurous souls to explore SEA for 2 months. Flexible itinerary.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'asia temple', // Changed from imageHint
    memberCount: 3,
    budget: '$1500/month',
  },
  {
    id: 'group2',
    title: 'European Cities Tour',
    destination: 'Paris, Rome, Berlin',
    dates: 'Spring 2025',
    description: 'Culture vultures unite! Join us for a whirlwind tour of Europe\'s iconic cities.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'europe city', // Changed from imageHint
    memberCount: 4,
    budget: '$2500 - $3000',
  },
  {
    id: 'group3',
    title: 'Andes Trekking Expedition',
    destination: 'Peru & Bolivia',
    dates: 'July 2025',
    description: 'High-altitude trekking adventure through the Andes. Experienced hikers preferred.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'andes mountains', // Changed from imageHint
    memberCount: 2,
    budget: '$3000 - $4000',
  },
];

export default function GroupsPage() {
  const [filteredGroups, setFilteredGroups] = useState<TripCardProps[]>([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // In a real app, fetch groups based on filters
    console.log("Applying filters:", filters);
    setFilteredGroups(mockGroups); 
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/4">
        <FilterPanel onFilterChange={handleFilterChange} />
      </aside>
      <section className="lg:w-3/4">
        <h1 className="text-3xl font-bold mb-6 text-gradient">Find Your Travel Group</h1>
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <TripCard key={group.id} {...group} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">No groups match your current filters. Try adjusting your search!</p>
        )}
      </section>
    </div>
  );
}
