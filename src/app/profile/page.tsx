
"use client";

import UserProfileForm from '@/components/core/user-profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit3, MapPin, Briefcase, Heart, UserCog, Cigarette, Wine, Users, Cake, CheckSquare, AlertTriangle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { User } from '@/types'; 
import { useToast } from "@/hooks/use-toast";

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
  // User's own attributes / preferences
  smokingPolicy: 'non_smoker', // from userSmokingPreferenceOptions
  alcoholPolicy: 'social_drinker', // from userAlcoholPreferenceOptions
  preferredGenderMix: 'mixed', // from genderPreferenceOptions
  preferredAgeGroup: '26-35', // from ageGroupOptions
  preferredTravelerType: 'backpackers', // from travelerTypeOptions
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Helper to display preference labels
import { 
  userSmokingPreferenceOptions, 
  userAlcoholPreferenceOptions, 
  genderPreferenceOptions, 
  ageGroupOptions, 
  travelerTypeOptions,
  type ProfileFormValues
} from "@/types";

const getLabel = (options: {value: string, label: string}[], value?: string) => {
  return options.find(opt => opt.value === value)?.label || value || 'Not set';
}


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(mockUser); 
  const [profilePreferencesSet, setProfilePreferencesSet] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const preferencesSet = localStorage.getItem('userProfilePreferencesSet') === 'true';
        setProfilePreferencesSet(preferencesSet);

        const storedName = localStorage.getItem('userName');
        const storedEmail = localStorage.getItem('userEmail');
        
        let initialUserUpdate: Partial<User> = {
          name: storedName || mockUser.name, // Fallback to mockUser if not in localStorage
          email: storedEmail || mockUser.email,
        };

        const storedProfileDataString = localStorage.getItem('userProfileData');
        if (storedProfileDataString) {
          try {
            const rawParsedData = JSON.parse(storedProfileDataString);

            const ensureStringArray = (arr: any): string[] => {
              if (!Array.isArray(arr)) return [];
              return arr
                .map((item: any) => {
                  if (typeof item === 'string') return item.trim();
                  if (typeof item === 'object' && item !== null && typeof item.value === 'string') return item.value.trim();
                  return null; 
                })
                .filter((s: string | null): s is string => s !== null && s !== '');
            };
            
            const loadedProfileSpecifics: Partial<User> = {
                bio: rawParsedData.bio,
                smokingPolicy: rawParsedData.smokingPolicy,
                alcoholPolicy: rawParsedData.alcoholPolicy,
                preferredGenderMix: rawParsedData.preferredGenderMix,
                preferredAgeGroup: rawParsedData.preferredAgeGroup,
                preferredTravelerType: rawParsedData.preferredTravelerType,
                interests: ensureStringArray(rawParsedData.interests),
                travelHistory: ensureStringArray(rawParsedData.travelHistory),
                preferences: ensureStringArray(rawParsedData.preferences),
            };
            
            initialUserUpdate = { ...initialUserUpdate, ...loadedProfileSpecifics };

          } catch (e) {
            console.error("Failed to parse or format profile data from localStorage", e);
          }
        }
        
        setUser(prevUser => ({ ...prevUser, ...initialUserUpdate }));
        
        if (!preferencesSet) {
            setIsEditing(true); // Force edit mode if preferences not set
        } else {
            setIsEditing(false); // Default to view mode if preferences are set
        }
    }
  }, []); // Run once on mount

  const handleSaveSuccess = useCallback((updatedFormData: ProfileFormValues) => {
    setIsEditing(false); 
    setProfilePreferencesSet(true); 

    // Process form data to match User type for state update
    const processedDataForState: Partial<User> = {
      name: updatedFormData.name,
      bio: updatedFormData.bio,
      smokingPolicy: updatedFormData.smokingPolicy,
      alcoholPolicy: updatedFormData.alcoholPolicy,
      preferredGenderMix: updatedFormData.preferredGenderMix,
      preferredAgeGroup: updatedFormData.preferredAgeGroup,
      preferredTravelerType: updatedFormData.preferredTravelerType,
      interests: updatedFormData.interests?.map(i => i.value).filter(v => v && v.trim() !== '') || [],
      travelHistory: updatedFormData.travelHistory?.map(th => th.value).filter(v => v && v.trim() !== '') || [],
      preferences: updatedFormData.preferences?.map(p => p.value).filter(v => v && v.trim() !== '') || [],
      updatedAt: new Date(),
    };
    
    setUser(prevUser => ({ ...prevUser, ...processedDataForState }));

    if (updatedFormData.name && typeof window !== 'undefined') {
      localStorage.setItem('userName', updatedFormData.name);
    }
    
    toast({
      title: "Profile Updated!",
      description: "Your changes have been saved successfully.",
    });
  }, [toast]);

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      {!profilePreferencesSet && isEditing && ( // Show alert only during initial setup
         <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Complete Your Profile!</AlertTitle>
          <AlertDescription>
            Please complete your profile to get the best travel recommendations and connect with groups.
            Once saved, you can always edit it later.
          </AlertDescription>
        </Alert>
      )}
      <Card className="shadow-xl">
        <CardHeader className="bg-muted/30 p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-md">
              <AvatarImage src={user.avatarUrl} alt={user.name || "User"} data-ai-hint="profile avatar" />
              <AvatarFallback>{user.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">{user.name || "Set Your Name"}</CardTitle>
              <CardDescription className="text-base sm:text-lg text-muted-foreground flex items-center justify-center md:justify-start">
                <Mail className="mr-2 h-4 w-4" />
                {user.email || "No email set"}
              </CardDescription>
              {(profilePreferencesSet || isEditing) && ( 
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 md:mt-4" 
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={!profilePreferencesSet && isEditing} // Disable "View Profile" if in forced edit mode
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  {isEditing ? (profilePreferencesSet ? 'View Profile' : 'Complete Profile') : 'Edit Profile & Preferences'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {isEditing ? (
            <UserProfileForm defaultValues={user} onSaveSuccess={handleSaveSuccess} />
          ) : (
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary">Bio</h3>
                <p className="text-foreground/90 whitespace-pre-line">{user.bio || 'No bio set.'}</p>
              </div>
              
              <div className="space-y-4">
                 <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center text-primary border-b pb-2">
                  <UserCog className="mr-2 h-5 w-5" /> My Travel Style & Preferences
                </h3>
                <div className="grid md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 md:gap-y-4 text-sm">
                  <div className="flex items-start">
                    <Cigarette className="h-5 w-5 mr-2 sm:mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">My Smoking Stance:</strong> {getLabel(userSmokingPreferenceOptions, user.smokingPolicy)}</div>
                  </div>
                  <div className="flex items-start">
                    <Wine className="h-5 w-5 mr-2 sm:mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">My Alcohol Stance:</strong> {getLabel(userAlcoholPreferenceOptions, user.alcoholPolicy)}</div>
                  </div>
                   <div className="flex items-start">
                    <Users className="h-5 w-5 mr-2 sm:mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">Preferred Group Gender Mix:</strong> {getLabel(genderPreferenceOptions, user.preferredGenderMix)}</div>
                  </div>
                  <div className="flex items-start">
                    <Cake className="h-5 w-5 mr-2 sm:mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">Preferred Companion Age Group:</strong> {getLabel(ageGroupOptions, user.preferredAgeGroup)}</div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <CheckSquare className="h-5 w-5 mr-2 sm:mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div><strong className="font-medium text-foreground/90">Preferred Traveler Type/Vibe:</strong> {getLabel(travelerTypeOptions, user.preferredTravelerType)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center text-primary border-b pb-2">
                  <Heart className="mr-2 h-5 w-5" /> Interests
                </h3>
                {user.interests && user.interests.length > 0 && user.interests.some(i => i.trim() !== '') ? (
                  <div className="flex flex-wrap gap-2">
                    {user.interests.filter(i => i.trim() !== '').map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-sm px-3 py-1">{interest}</Badge>
                    ))}
                  </div>
                ) : <p className="text-muted-foreground text-sm">No interests specified.</p>}
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center text-primary border-b pb-2">
                  <Briefcase className="mr-2 h-5 w-5" /> Travel History
                </h3>
                {user.travelHistory && user.travelHistory.length > 0 && user.travelHistory.some(th => th.trim() !== '') ? (
                  <ul className="list-disc list-inside space-y-1 text-foreground/90">
                    {user.travelHistory.filter(th => th.trim() !== '').map((trip) => (
                      <li key={trip}>{trip}</li>
                    ))}
                  </ul>
                ) : <p className="text-muted-foreground text-sm">No travel history recorded.</p>}
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center text-primary border-b pb-2">
                  <MapPin className="mr-2 h-5 w-5" /> Other General Preferences
                </h3>
                 {user.preferences && user.preferences.length > 0 && user.preferences.some(p => p.trim() !== '') ? (
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.filter(p => p.trim() !== '').map((preference) => (
                      <Badge key={preference} variant="outline" className="text-sm px-3 py-1">{preference}</Badge>
                    ))}
                  </div>
                ) : <p className="text-muted-foreground text-sm">No other preferences specified.</p>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
       <div className="mt-8 md:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">My Travel Snaps</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
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


    