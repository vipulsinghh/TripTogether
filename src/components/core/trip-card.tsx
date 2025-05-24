
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CalendarDays, Users, DollarSign, ChevronLeft, ChevronRight, Tag, LocateFixed } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Trip } from '@/types'; 
import { format } from 'date-fns';

export interface TripCardProps {
  trip: Trip; 
}

export default function TripCard({ trip }: TripCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { id, title, destination, startLocation, startDate, endDate, description, imageUrls, dataAiHint, currentMemberCount, maxGroupSize, budget, categories } = trip;

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (imageUrls?.length || 1));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (imageUrls?.length || 1)) % (imageUrls?.length || 1));
  };

  const currentImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[currentImageIndex] : 'https://placehold.co/600x400.png';
  const aiHint = dataAiHint || (imageUrls && imageUrls.length > 0 ? "travel landscape" : "placeholder");
  const formattedStartDate = startDate ? format(new Date(startDate), "MMM d, yyyy") : "N/A";
  const formattedEndDate = endDate ? format(new Date(endDate), "MMM d, yyyy") : "N/A";

  return (
    <Link href={`/trip/${id}`} passHref legacyBehavior>
      <a className="block h-full">
        <Card className="w-full max-w-md overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full cursor-pointer">
          <CardHeader className="p-0 relative">
            <div className="relative w-full h-52 sm:h-64"> {/* Adjusted height */}
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
                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white h-8 w-8 sm:h-10 sm:w-10"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white h-8 w-8 sm:h-10 sm:w-10"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 flex-grow">
            <CardTitle className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">{title}</CardTitle>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span>{destination}</span>
              </div>
              {startLocation && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <LocateFixed className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span>Starts from: {startLocation}</span>
                </div>
              )}
              <div className="flex items-center gap-1 sm:gap-2">
                <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span>{formattedStartDate} - {formattedEndDate}</span>
              </div>
              <CardDescription className="mt-2 sm:mt-3 text-foreground/90 line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm">{description}</CardDescription>
            </div>
            {categories && categories.length > 0 && (
              <div className="mt-3 sm:mt-4">
                <h4 className="text-xs font-semibold mb-1 text-primary flex items-center"><Tag className="h-3 w-3 mr-1" /> Categories</h4>
                <div className="flex flex-wrap gap-1">
                  {categories.slice(0, 3).map(category => ( 
                    <Badge key={category} variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2">{category}</Badge>
                  ))}
                  {categories.length > 3 && <Badge variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2">+{categories.length - 3} more</Badge>}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 sm:p-6 bg-secondary/30 flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <Badge variant="secondary" className="px-1.5 py-0.5 sm:px-2">{currentMemberCount || 0}/{maxGroupSize} Members</Badge>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <Badge variant="outline" className="px-1.5 py-0.5 sm:px-2">{budget || 'N/A'}</Badge>
            </div>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
