"use client";

import TripCreationForm from '@/components/core/trip-creation-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import firebase from 'firebase/app'; // Import firebase
import 'firebase/auth'; // Import auth
import { useEffect } from 'react';
import { useFirebase } from '@/context/firebase'; // Import the hook


// Ensure Firebase is initialized (you might have this in a separate file like src/lib/firebase.ts)
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     // Your Firebase config
//   });
// }


export default function CreateTripPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { auth } = useFirebase(); // Use the hook to get the auth instance

  // Optional: You might want to check auth state on mount
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => { // Use auth from context
 //     if (!user) {
  //       // Redirect to login if not authenticated
  //       router.push('/login');
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [router]);


  const handleCreateTrip = async (formData: any) => { // Replace 'any' with your actual form data type
    try {
      // Get the current user
      const user = auth.currentUser; // Use auth from context

      if (!user) {
        // Handle the case where the user is not logged in
        toast({
          title: 'Error Creating Trip',
          description: 'You must be logged in to create a trip.',
          variant: 'destructive',
        });
        // Optionally redirect to login page
        // router.push('/login');
        return; // Stop here if no user
      }

      // Get the user's ID token
      const idToken = await user.getIdToken();

      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`, // Include the ID token here
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create trip');
      }

      const responseData = await response.json();

      toast({
        title: 'Trip Created!',
        description: 'Your trip has been successfully created.',
      });

      // Redirect to the trip detail page
      router.push(`/trip/${responseData.tripId}`);

    } catch (error: any) {
      toast({
        title: 'Error Creating Trip',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
      console.error('Error creating trip:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <Card className="shadow-xl">
        <CardHeader className="text-center p-4 md:p-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient">Create Your Own Trip</CardTitle>
          <CardDescription className="text-sm sm:text-base">Share your travel plans and find like-minded companions.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {/* Pass the handler function to the form component */}
          <TripCreationForm onSubmit={handleCreateTrip} />
        </CardContent>
      </Card>
    </div>
  );
}
