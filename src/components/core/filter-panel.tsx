"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, DollarSign, CalendarDays, Users, Search } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [dates, setDates] = useState(''); // Could be a date picker
  const [interests, setInterests] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ destination, budget, dates, interests });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Filter className="mr-2 h-6 w-6 text-primary" />
          Filter Groups
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="destination" className="flex items-center mb-1"><Search className="mr-2 h-4 w-4 text-muted-foreground"/>Destination</Label>
          <Input 
            id="destination" 
            placeholder="e.g., Bali, Paris, Tokyo" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
          />
        </div>
        
        <div>
          <Label htmlFor="budget" className="flex items-center mb-1"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground"/>Budget Range</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="budget">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<1000">Under $1000</SelectItem>
              <SelectItem value="1000-2000">$1000 - $2000</SelectItem>
              <SelectItem value="2000-3000">$2000 - $3000</SelectItem>
              <SelectItem value=">3000">Over $3000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dates" className="flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground"/>Travel Dates</Label>
          <Input 
            id="dates" 
            type="text" // Ideally use Calendar component here
            placeholder="e.g., Next Month, Summer 2025" 
            value={dates}
            onChange={(e) => setDates(e.target.value)} 
          />
        </div>

        <div>
          <Label htmlFor="interests" className="flex items-center mb-1"><Users className="mr-2 h-4 w-4 text-muted-foreground"/>Interests</Label>
          <Input 
            id="interests" 
            placeholder="e.g., Hiking, Photography" 
            value={interests}
            onChange={(e) => setInterests(e.target.value)} 
          />
        </div>
        
        <Button onClick={handleApplyFilters} className="w-full bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
