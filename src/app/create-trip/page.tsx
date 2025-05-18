import TripCreationForm from '@/components/core/trip-creation-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function CreateTripPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gradient">Create Your Own Trip</CardTitle>
          <CardDescription>Share your travel plans and find like-minded companions.</CardDescription>
        </CardHeader>
        <CardContent>
          <TripCreationForm />
        </CardContent>
      </Card>
    </div>
  );
}
