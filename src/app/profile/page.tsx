
"use client";

import UserProfileForm from '@/components/core/user-profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit3, MapPin, Briefcase, Heart, UserCog, Cigarette, Wine, Users, Cake, CheckSquare, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { User } from '@/types'; // Import User type

// Mock user data - extended with new preference fields
const mockUser: User = {
  id: 'user123',
  name: 'Alex Wanderer',
  email: 'alex.wanderer@example.com',
  passwordHash: '', // Not used on client
  avatarUrl: 'https://placehold.co/128x128.png',
  bio: 'Travel enthusiast exploring the world one city at a time. Lover of coffee, mountains, and good stories.',
  interests: ['Hiking', 'Photography', 'Foodie', 'Backpacking', 'Culture'],
  travelHistory: ['Japan 2023 (Cultural, City Break)', 'Peru 2022 (Adventure, Mountains)', 'Italy 2019 (Historical, Foodie)'],
  preferences: ['Budget-friendly', 'Local experiences'],
  smokingPolicy: 'non_smoker',
  alcoholPolicy: 'social_drinker',
  preferredGenderMix: 'mixed',
  preferredAgeGroup: '26-35',
  preferredTravelerType: 'backpackers',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Helper to display preference labels
const getLabel = (options: {value: string, label: string}[], value?: string) => {
  return options.find(opt => opt.value === value)?.label || value || 'Not set';
}
import { 
  userSmokingPreferenceOptions, 
  userAlcoholPreferenceOptions, 
  genderPreferenceOptions, 
  ageGroupOptions, 
  travelerTypeOptions 
} from "@/types";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(mockUser); // Use User type
  const [profilePreferencesSet, setProfilePreferencesSet] = useState(true); // Assume true initially, check localStorage
  const router = useRouter();

  useEffect(() => {
    // In a real app, fetch user data from API
    // For now, we use mockUser
    setUser(mockUser);

    if (typeof window !== 'undefined') {
        const preferencesSet = localStorage.getItem('userProfilePreferencesSet') === 'true';
        setProfilePreferencesSet(preferencesSet);
        if (!preferencesSet) {
            setIsEditing(true); // Force edit mode if preferences not set
        }
    }
  }, []);

  const handleSaveSuccess = () => {
    setIsEditing(false);
    setProfilePreferencesSet(true); // Mark as set
    // Potentially refetch user data here if it was a real API call
    router.push('/discover'); // Navigate to discover after successful save
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!profilePreferencesSet && !isEditing && (
         <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Complete Your Profile!</AlertTitle>
          <AlertDescription>
            Please complete your profile preferences to get the best travel recommendations and connect with groups.
            <Button variant="link" className="p-0 ml-1 h-auto" onClick={() => setIsEditing(true)}>Click here to edit.</Button>
          </AlertDescription>
        </Alert>
      )}
      <Card className="shadow-xl">
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-md">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile avatar" />
              <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
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
            <UserProfileForm defaultValues={user} onSaveSuccess={handleSaveSuccess} />
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Bio</h3>
                <p className="text-foreground/90 whitespace-pre-line">{user.bio || 'No bio set.'}</p>
              </div>
              
              <div className="space-y-4">
                 <h3 className="text-xl font-semibold mb-3 flex items-center text-primary border-b pb-2">
                  <UserCog className="mr-2 h-5 w-5" /> My Travel Style
                </h3>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div className="flex items-start">
                    <Cigarette className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">Smoking Stance:</strong> {getLabel(userSmokingPreferenceOptions, user.smokingPolicy)}</div>
                  </div>
                  <div className="flex items-start">
                    <Wine className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">Alcohol Stance:</strong> {getLabel(userAlcoholPreferenceOptions, user.alcoholPolicy)}</div>
                  </div>
                   <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">Preferred Gender Mix:</strong> {getLabel(genderPreferenceOptions, user.preferredGenderMix)}</div>
                  </div>
                  <div className="flex items-start">
                    <Cake className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">Preferred Age Group:</strong> {getLabel(ageGroupOptions, user.preferredAgeGroup)}</div>
                  </div>
                  <div className="flex items-start col-span-1 md:col-span-2">
                    <CheckSquare className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">Preferred Traveler Type:</strong> {getLabel(travelerTypeOptions, user.preferredTravelerType)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center text-primary border-b pb-2">
                  <Heart className="mr-2 h-5 w-5" /> Interests
                </h3>
                {user.interests && user.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-sm px-3 py-1">{interest}</Badge>
                    ))}
                  </div>
                ) : <p className="text-muted-foreground text-sm">No interests specified.</p>}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center text-primary border-b pb-2">
                  <Briefcase className="mr-2 h-5 w-5" /> Travel History
                </h3>
                {user.travelHistory && user.travelHistory.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-foreground/90">
                    {user.travelHistory.map((trip) => (
                      <li key={trip}>{trip}</li>
                    ))}
                  </ul>
                ) : <p className="text-muted-foreground text-sm">No travel history recorded.</p>}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center text-primary border-b pb-2">
                  <MapPin className="mr-2 h-5 w-5" /> Other Preferences
                </h3>
                 {user.preferences && user.preferences.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.map((preference) => (
                      <Badge key={preference} variant="outline" className="text-sm px-3 py-1">{preference}</Badge>
                    ))}
                  </div>
                ) : <p className="text-muted-foreground text-sm">No other preferences specified.</p>}
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
