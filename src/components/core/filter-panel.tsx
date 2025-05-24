
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from "@/components/ui/slider";
import { Filter, DollarSign, CalendarDays, Users, Search, Cigarette, Wine, Users2, Cake, UserCheck, Settings2, Map } from 'lucide-react';
import { 
  smokingPolicyOptions, 
  alcoholPolicyOptions, 
  genderPreferenceOptions, 
  ageGroupOptions, 
  travelerTypeOptions 
} from "@/types"; 

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState(''); 
  const [dates, setDates] = useState(''); 
  const [interests, setInterests] = useState(''); 
  
  const [currentSmokingPolicy, setCurrentSmokingPolicy] = useState('any');
  const [currentAlcoholPolicy, setCurrentAlcoholPolicy] = useState('any');
  const [currentGenderPreference, setCurrentGenderPreference] = useState('any');
  const [currentGroupSize, setCurrentGroupSize] = useState<[number, number]>([2, 10]);
  const [currentAgeGroup, setCurrentAgeGroup] = useState('any');
  const [currentTravelerType, setCurrentTravelerType] = useState('any');


  const handleApplyFilters = () => {
    onFilterChange({ 
      destination, 
      budget, 
      dates, 
      interests,
      smokingPolicy: currentSmokingPolicy,
      alcoholPolicy: currentAlcoholPolicy,
      genderPreference: currentGenderPreference,
      groupSize: currentGroupSize,
      ageGroup: currentAgeGroup,
      travelerType: currentTravelerType,
    });
  };

  return (
    <Card className="shadow-xl sticky top-20">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="flex items-center text-lg sm:text-xl md:text-2xl text-gradient">
          <Settings2 className="mr-2 h-5 w-5 md:h-6 md:w-6 text-primary" />
          Refine Your Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
        <div>
          <Label htmlFor="destination" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><Map className="mr-2 h-4 w-4 text-muted-foreground"/>Destination</Label>
          <Input 
            id="destination" 
            placeholder="e.g., Bali, Paris" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            className="shadow-sm text-sm"
          />
        </div>
        
        <div>
          <Label htmlFor="budget" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground"/>Budget Range</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="budget" className="shadow-sm text-sm">
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
          <Label htmlFor="dates" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground"/>Travel Dates</Label>
          <Input 
            id="dates" 
            type="text" 
            placeholder="e.g., Next Month" 
            value={dates}
            onChange={(e) => setDates(e.target.value)} 
            className="shadow-sm text-sm"
          />
        </div>

        <div>
          <Label htmlFor="interests" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><Search className="mr-2 h-4 w-4 text-muted-foreground"/>Interests</Label>
          <Input 
            id="interests" 
            placeholder="e.g., Hiking, Museums" 
            value={interests}
            onChange={(e) => setInterests(e.target.value)} 
            className="shadow-sm text-sm"
          />
        </div>

        <div>
          <Label htmlFor="groupSize" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><Users2 className="mr-2 h-4 w-4 text-muted-foreground"/>Group Size: {currentGroupSize[0]} - {currentGroupSize[1]}</Label>
          <Slider
            id="groupSize"
            min={2}
            max={20}
            step={1}
            value={currentGroupSize}
            onValueChange={(value) => setCurrentGroupSize(value as [number, number])}
            className="mt-2 mb-1"
          />
        </div>
        
        <div>
          <Label htmlFor="ageGroup" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><Cake className="mr-2 h-4 w-4 text-muted-foreground"/>Target Age Group</Label>
          <Select value={currentAgeGroup} onValueChange={setCurrentAgeGroup}>
            <SelectTrigger id="ageGroup" className="shadow-sm text-sm">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              {ageGroupOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="travelerType" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><UserCheck className="mr-2 h-4 w-4 text-muted-foreground"/>Target Traveler Type</Label>
          <Select value={currentTravelerType} onValueChange={setCurrentTravelerType}>
            <SelectTrigger id="travelerType" className="shadow-sm text-sm">
              <SelectValue placeholder="Select traveler type" />
            </SelectTrigger>
            <SelectContent>
              {travelerTypeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="smokingPolicy" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><Cigarette className="mr-2 h-4 w-4 text-muted-foreground"/>Smoking Policy</Label>
          <Select value={currentSmokingPolicy} onValueChange={setCurrentSmokingPolicy}>
            <SelectTrigger id="smokingPolicy" className="shadow-sm text-sm">
              <SelectValue placeholder="Select smoking policy" />
            </SelectTrigger>
            <SelectContent>
              {smokingPolicyOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="alcoholPolicy" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><Wine className="mr-2 h-4 w-4 text-muted-foreground"/>Alcohol Policy</Label>
          <Select value={currentAlcoholPolicy} onValueChange={setCurrentAlcoholPolicy}>
            <SelectTrigger id="alcoholPolicy" className="shadow-sm text-sm">
              <SelectValue placeholder="Select alcohol policy" />
            </SelectTrigger>
            <SelectContent>
              {alcoholPolicyOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="genderPreference" className="flex items-center mb-1 text-xs sm:text-sm font-medium"><Users className="mr-2 h-4 w-4 text-muted-foreground"/>Gender Preference</Label>
          <Select value={currentGenderPreference} onValueChange={setCurrentGenderPreference}>
            <SelectTrigger id="genderPreference" className="shadow-sm text-sm">
              <SelectValue placeholder="Select gender preference" />
            </SelectTrigger>
            <SelectContent>
              {genderPreferenceOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleApplyFilters} className="w-full text-sm sm:text-base bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground hover:opacity-90 transition-opacity shadow-md">
          <Filter className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
