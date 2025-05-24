import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CalendarDays, Users, DollarSign } from 'lucide-react';

export interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  dates: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string; // Changed from imageHint
  memberCount: number;
  budget: string;
}

export default function TripCard({ title, destination, dates, description, imageUrl, dataAiHint, memberCount, budget }: TripCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={dataAiHint || "travel landscape"} // Use dataAiHint
          />
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
