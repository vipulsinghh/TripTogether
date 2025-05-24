
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from "@/components/ui/slider";
import { Filter, DollarSign, CalendarDays, Users, Search, Cigarette, Wine, Users2, Cake, UserCheck, Settings2 } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [dates, setDates] = useState(''); // Could be a date picker
  const [interests, setInterests] = useState('');
  const [smokingPolicy, setSmokingPolicy] = useState('any');
  const [alcoholPolicy, setAlcoholPolicy] = useState('any');
  const [genderPreference, setGenderPreference] = useState('any');
  const [groupSize, setGroupSize] = useState<[number, number]>([2, 10]);
  const [ageGroup, setAgeGroup] = useState('any');
  const [travelerType, setTravelerType] = useState('any');


  const handleApplyFilters = () => {
    onFilterChange({ 
      destination, 
      budget, 
      dates, 
      interests,
      smokingPolicy,
      alcoholPolicy,
      genderPreference,
      groupSize,
      ageGroup,
      travelerType,
    });
  };

  return (
    <Card className="shadow-xl sticky top-20"> {/* Added shadow-xl and sticky */}
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-gradient"> {/* Added text-gradient */}
          <Settings2 className="mr-2 h-6 w-6 text-primary" /> {/* Changed Icon */}
          Refine Your Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="destination" className="flex items-center mb-1 font-medium"><Search className="mr-2 h-4 w-4 text-muted-foreground"/>Destination</Label>
          <Input 
            id="destination" 
            placeholder="e.g., Bali, Paris, Tokyo" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            className="shadow-sm"
          />
        </div>
        
        <div>
          <Label htmlFor="budget" className="flex items-center mb-1 font-medium"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground"/>Budget Range</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="budget" className="shadow-sm">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Budget</SelectItem>
              <SelectItem value="<1000">Under $1000</SelectItem>
              <SelectItem value="1000-2000">$1000 - $2000</SelectItem>
              <SelectItem value="2000-3000">$2000 - $3000</SelectItem>
              <SelectItem value=">3000">Over $3000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dates" className="flex items-center mb-1 font-medium"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground"/>Travel Dates</Label>
          <Input 
            id="dates" 
            type="text" 
            placeholder="e.g., Next Month, Summer 2025" 
            value={dates}
            onChange={(e) => setDates(e.target.value)} 
            className="shadow-sm"
          />
        </div>

        <div>
          <Label htmlFor="interests" className="flex items-center mb-1 font-medium"><Users className="mr-2 h-4 w-4 text-muted-foreground"/>Interests</Label>
          <Input 
            id="interests" 
            placeholder="e.g., Hiking, Photography" 
            value={interests}
            onChange={(e) => setInterests(e.target.value)} 
            className="shadow-sm"
          />
        </div>

        <div>
          <Label htmlFor="groupSize" className="flex items-center mb-1 font-medium"><Users2 className="mr-2 h-4 w-4 text-muted-foreground"/>Group Size: {groupSize[0]} - {groupSize[1]}</Label>
          <Slider
            id="groupSize"
            min={2}
            max={20}
            step={1}
            value={groupSize}
            onValueChange={(value) => setGroupSize(value as [number, number])}
            className="mt-2 mb-1"
          />
        </div>
        
        <div>
          <Label htmlFor="ageGroup" className="flex items-center mb-1 font-medium"><Cake className="mr-2 h-4 w-4 text-muted-foreground"/>Age Group</Label>
          <Select value={ageGroup} onValueChange={setAgeGroup}>
            <SelectTrigger id="ageGroup" className="shadow-sm">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="18-25">18-25 years</SelectItem>
              <SelectItem value="26-35">26-35 years</SelectItem>
              <SelectItem value="36-45">36-45 years</SelectItem>
              <SelectItem value="45+">45+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="travelerType" className="flex items-center mb-1 font-medium"><UserCheck className="mr-2 h-4 w-4 text-muted-foreground"/>Traveler Type</Label>
          <Select value={travelerType} onValueChange={setTravelerType}>
            <SelectTrigger id="travelerType" className="shadow-sm">
              <SelectValue placeholder="Select traveler type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="singles">Singles</SelectItem>
              <SelectItem value="couples">Couples</SelectItem>
              <SelectItem value="family">Family Friendly</SelectItem>
              <SelectItem value="friends">Friends Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="smokingPolicy" className="flex items-center mb-1 font-medium"><Cigarette className="mr-2 h-4 w-4 text-muted-foreground"/>Smoking Policy</Label>
          <Select value={smokingPolicy} onValueChange={setSmokingPolicy}>
            <SelectTrigger id="smokingPolicy" className="shadow-sm">
              <SelectValue placeholder="Select smoking policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="permitted">Permitted</SelectItem>
              <SelectItem value="not_permitted">Not Permitted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="alcoholPolicy" className="flex items-center mb-1 font-medium"><Wine className="mr-2 h-4 w-4 text-muted-foreground"/>Alcohol Policy</Label>
          <Select value={alcoholPolicy} onValueChange={setAlcoholPolicy}>
            <SelectTrigger id="alcoholPolicy" className="shadow-sm">
              <SelectValue placeholder="Select alcohol policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="permitted">Permitted</SelectItem>
              <SelectItem value="not_permitted">Not Permitted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="genderPreference" className="flex items-center mb-1 font-medium"><Users className="mr-2 h-4 w-4 text-muted-foreground"/>Gender Preference</Label>
          <Select value={genderPreference} onValueChange={setGenderPreference}>
            <SelectTrigger id="genderPreference" className="shadow-sm">
              <SelectValue placeholder="Select gender preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="men_only">Men Only</SelectItem>
              <SelectItem value="women_only">Women Only</SelectItem>
              <SelectItem value="mixed">Mixed Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleApplyFilters} className="w-full bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground hover:opacity-90 transition-opacity shadow-md">
          <Filter className="mr-2 h-5 w-5" /> Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
