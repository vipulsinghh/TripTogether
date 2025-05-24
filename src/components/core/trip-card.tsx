
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CalendarDays, Users, DollarSign, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  dates: string;
  description: string;
  imageUrls: string[];
  dataAiHint?: string;
  memberCount: number;
  budget: string;
  categories: string[]; // Added categories
}

export default function TripCard({ title, destination, dates, description, imageUrls, dataAiHint, memberCount, budget, categories }: TripCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const currentImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[currentImageIndex] : 'https://placehold.co/600x400.png';
  const aiHint = dataAiHint || (imageUrls && imageUrls.length > 0 ? "travel landscape" : "placeholder");


  return (
    <Card className="w-full max-w-md overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <div className="relative w-full h-64">
          <Image
            src={currentImageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={aiHint}
          />
          {imageUrls && imageUrls.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-semibold mb-2">{title}</CardTitle>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{dates}</span>
          </div>
          <CardDescription className="mt-3 text-foreground/90 line-clamp-3">{description}</CardDescription>
        </div>
         {categories && categories.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold mb-1 text-primary flex items-center"><Tag className="h-3 w-3 mr-1" /> Categories</h4>
            <div className="flex flex-wrap gap-1">
              {categories.slice(0, 3).map(category => ( // Show up to 3 categories
                <Badge key={category} variant="outline" className="text-xs">{category}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 bg-secondary/30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <Badge variant="secondary">{memberCount} Members</Badge>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <Badge variant="outline">{budget}</Badge>
        </div>
      </CardFooter>
    </Card>
  );
}
