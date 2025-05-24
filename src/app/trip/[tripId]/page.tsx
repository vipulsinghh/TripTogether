
// src/app/trip/[tripId]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, ChevronLeft, ChevronRight, DollarSign, Users, MapPin, Tag, UserCircle, MessageSquare, CheckCircle, Info, AlertTriangle, Cigarette, Wine, Users2, Cake, CheckSquare as CheckSquareIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Trip } from '@/types'; // Assuming your Trip type is defined here
import { format } from 'date-fns';
import Link from 'next/link';

// Mock data - replace with API call
const mockTrips: Trip[] = [
   {
    id: '1',
    title: 'Bali Adventure Week',
    destination: 'Bali, Indonesia',
    startDate: new Date('2024-10-10'),
    endDate: new Date('2024-10-17'),
    description: 'Explore volcanoes, surf, and find your zen in beautiful Bali. We will visit waterfalls, rice paddies and enjoy local cuisine. This trip is perfect for young adventurers looking for a mix of nature, culture, and relaxation. Expect moderate physical activity and lots of photo opportunities!',
    imageUrls: ['https://placehold.co/800x500.png?text=Bali+Volcano', 'https://placehold.co/800x500.png?text=Bali+Beach', 'https://placehold.co/800x500.png?text=Rice+Paddies'],
    dataAiHint: 'bali landscape',
    maxGroupSize: 8,
    currentMemberCount: 5,
    budget: '$1000 - $1500',
    categories: ['Beach', 'Adventure', 'Cultural', 'Mountains', 'Wellness'],
    createdById: 'user1',
    creatorName: 'Alice Explorer',
    creatorAvatarUrl: 'https://placehold.co/40x40.png?text=AE',
    smokingPolicy: 'not_permitted',
    alcoholPolicy: 'socially',
    genderPreference: 'mixed',
    targetAgeGroup: '18-25',
    targetTravelerType: 'backpackers',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: '2',
    title: 'Tokyo Tech & Tradition',
    destination: 'Tokyo, Japan',
    startDate: new Date('2024-11-05'),
    endDate: new Date('2024-11-12'),
    description: 'Experience the vibrant culture, futuristic tech, and ancient temples of Tokyo. A mix of modern marvels and serene shrines. We will explore Akihabara, visit Senso-ji temple, and enjoy world-class cuisine.',
    imageUrls: ['https://placehold.co/800x500.png?text=Tokyo+Skyline', 'https://placehold.co/800x500.png?text=Tokyo+Temple'],
    dataAiHint: 'tokyo city',
    maxGroupSize: 6,
    currentMemberCount: 3,
    budget: '$2000 - $2500',
    categories: ['City Break', 'Cultural', 'Historical', 'Foodie'],
    createdById: 'user2',
    creatorName: 'Bob Traveler',
    creatorAvatarUrl: 'https://placehold.co/40x40.png?text=BT',
    smokingPolicy: 'any',
    alcoholPolicy: 'permitted',
    genderPreference: 'any',
    targetAgeGroup: '26-35',
    targetTravelerType: 'friends',
     createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-05'),
  },
];


export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const tripId = params.tripId as string;

  useEffect(() => {
     // Profile completion check
    if (typeof window !== 'undefined') {
      const signedIn = localStorage.getItem('isUserSignedIn') === 'true';
      const preferencesSet = localStorage.getItem('userProfilePreferencesSet') === 'true';
      if (signedIn && !preferencesSet) {
        router.replace('/profile'); 
        return;
      }
      if (!signedIn) {
        router.replace('/');
        return;
      }
    }
    // Fetch trip details based on tripId
    // In a real app, this would be an API call: fetch(`/api/trips/${tripId}`)
    const foundTrip = mockTrips.find(t => t.id === tripId);
    if (foundTrip) {
      setTrip(foundTrip);
    } else {
      // Handle trip not found, e.g., redirect or show error
      toast({ title: "Trip not found", variant: "destructive" });
      router.push('/discover');
    }
  }, [tripId, router, toast]);

  if (!trip) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <AlertTriangle className="h-10 w-10 text-destructive mr-2" /> 
        <p className="text-xl">Loading trip details or trip not found...</p>
      </div>
    );
  }

  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % (trip.imageUrls?.length || 1));
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + (trip.imageUrls?.length || 1)) % (trip.imageUrls?.length || 1));

  const handleRequestToJoin = () => {
    // Mock API call
    toast({
      title: "Request Sent!",
      description: `Your request to join "${trip.title}" has been sent to the host.`,
      variant: "default"
    });
  };
  
  const currentImageUrl = trip.imageUrls && trip.imageUrls.length > 0 ? trip.imageUrls[currentImageIndex] : 'https://placehold.co/800x500.png';
  const formattedStartDate = trip.startDate ? format(new Date(trip.startDate), "PPP") : "N/A";
  const formattedEndDate = trip.endDate ? format(new Date(trip.endDate), "PPP") : "N/A";


  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ChevronLeft className="h-4 w-4 mr-2" /> Back to Trips
      </Button>

      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="p-0 relative">
          {trip.imageUrls && trip.imageUrls.length > 0 && (
            <div className="relative w-full h-72 md:h-96"> {/* Adjusted height */}
              <Image
                src={currentImageUrl}
                alt={trip.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={trip.dataAiHint || "travel destination"}
              />
              {trip.imageUrls.length > 1 && (
                <>
                  <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white" onClick={handlePrevImage} aria-label="Previous image">
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white" onClick={handleNextImage} aria-label="Next image">
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-6 md:p-8">
          <CardTitle className="text-3xl md:text-4xl font-bold mb-3 text-gradient">{trip.title}</CardTitle>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-lg">{trip.destination}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                <span className="text-lg">{formattedStartDate} - {formattedEndDate}</span>
              </div>
              <p className="text-foreground/90 text-base leading-relaxed whitespace-pre-line">{trip.description}</p>
            </div>

            <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
              <h3 className="text-lg font-semibold text-primary border-b pb-2">Trip Overview</h3>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Budget: <Badge variant="secondary">{trip.budget || 'N/A'}</Badge></span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Group Size: <Badge variant="secondary">{trip.currentMemberCount || 0} / {trip.maxGroupSize} Members</Badge></span>
              </div>
              {trip.creatorName && (
                <div className="flex items-center pt-2 border-t mt-2">
                   <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={trip.creatorAvatarUrl} alt={trip.creatorName} data-ai-hint="user avatar"/>
                    <AvatarFallback>{trip.creatorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">Hosted by</p>
                    <p className="font-medium text-primary">{trip.creatorName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {trip.categories && trip.categories.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center"><Tag className="h-5 w-5 mr-2 text-primary" />Categories</h3>
              <div className="flex flex-wrap gap-2">
                {trip.categories.map(category => (
                  <Badge key={category} variant="outline" className="text-sm px-3 py-1">{category}</Badge>
                ))}
              </div>
            </div>
          )}
          
           <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3 flex items-center"><Info className="h-5 w-5 mr-2 text-primary" />Trip Policies & Vibe</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center"><Cigarette className="h-4 w-4 mr-2 text-muted-foreground"/>Smoking: <Badge variant={trip.smokingPolicy === 'not_permitted' ? 'destructive' : 'outline'} className="ml-1">{trip.smokingPolicy.replace('_', ' ')}</Badge></div>
              <div className="flex items-center"><Wine className="h-4 w-4 mr-2 text-muted-foreground"/>Alcohol: <Badge variant={trip.alcoholPolicy === 'not_permitted' ? 'destructive' : 'outline'} className="ml-1">{trip.alcoholPolicy.replace('_', ' ')}</Badge></div>
              <div className="flex items-center"><Users2 className="h-4 w-4 mr-2 text-muted-foreground"/>Gender Mix: <Badge variant="outline" className="ml-1">{trip.genderPreference.replace('_', ' ')}</Badge></div>
              <div className="flex items-center"><Cake className="h-4 w-4 mr-2 text-muted-foreground"/>Target Age: <Badge variant="outline" className="ml-1">{trip.targetAgeGroup}</Badge></div>
              <div className="flex items-center col-span-full sm:col-span-2 lg:col-span-1"><CheckSquareIcon className="h-4 w-4 mr-2 text-muted-foreground"/>Traveler Type: <Badge variant="outline" className="ml-1">{trip.targetTravelerType.replace('_', ' ')}</Badge></div>
            </div>
          </div>


        </CardContent>
        <CardFooter className="p-6 md:p-8 bg-secondary/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground" onClick={handleRequestToJoin}>
            <CheckCircle className="mr-2 h-5 w-5" /> Request to Join
          </Button>
          <Link href={`/chat/${trip.id}`} passHref legacyBehavior>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <MessageSquare className="mr-2 h-5 w-5" /> View Group Chat
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
