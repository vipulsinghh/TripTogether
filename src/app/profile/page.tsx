"use client";

import UserProfileForm from '@/components/core/user-profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit3, MapPin, Briefcase, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';

// Mock user data
const mockUser = {
  name: 'Alex Wanderer',
  email: 'alex.wanderer@example.com',
  avatarUrl: 'https://placehold.co/128x128.png',
  bio: 'Travel enthusiast exploring the world one city at a time. Lover of coffee, mountains, and good stories.',
  interests: ['Hiking', 'Photography', 'Foodie', 'Backpacking', 'Culture'],
  travelHistory: ['Japan 2023', 'Peru 2022', 'Italy 2019'],
  preferences: ['Budget-friendly', 'Adventure', 'Local experiences'],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // This would come from auth/DB in a real app
  const user = mockUser; 

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-md">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile avatar" />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-4xl font-bold">{user.name}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">{user.email}</CardDescription>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsEditing(!isEditing)}>
                <Edit3 className="mr-2 h-4 w-4" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <UserProfileForm defaultValues={user} onSave={() => setIsEditing(false)} />
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Bio</h3>
                <p className="text-foreground/90">{user.bio}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
                  <Heart className="mr-2 h-5 w-5" /> Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-sm px-3 py-1">{interest}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
                  <Briefcase className="mr-2 h-5 w-5" /> Travel History
                </h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  {user.travelHistory.map((trip) => (
                    <li key={trip}>{trip}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center text-primary">
                  <MapPin className="mr-2 h-5 w-5" /> Travel Preferences
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.map((preference) => (
                    <Badge key={preference} variant="outline" className="text-sm px-3 py-1">{preference}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
       {/* Example of "Instagram-like" photo grid - could be trips created by user or gallery */}
       <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">My Travel Snaps</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden shadow-md">
                 <Image src={`https://placehold.co/300x300.png?text=Snap+${i}`} alt={`Travel snap ${i}`} width={300} height={300} className="object-cover w-full h-full" data-ai-hint="travel photo" />
              </div>
            ))}
          </div>
       </div>
    </div>
  );
}
