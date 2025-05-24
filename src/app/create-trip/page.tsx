import TripCreationForm from '@/components/core/trip-creation-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function CreateTripPage() {
  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <Card className="shadow-xl">
        <CardHeader className="text-center p-4 md:p-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gradient">Create Your Own Trip</CardTitle>
          <CardDescription className="text-sm sm:text-base">Share your travel plans and find like-minded companions.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <TripCreationForm />
        </CardContent>
      </Card>
    </div>
  );
}
