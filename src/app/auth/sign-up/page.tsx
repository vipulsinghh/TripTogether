
import SignUpForm from '@/components/auth/sign-up-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; 
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gradient">Join TripTogether</CardTitle>
          <CardDescription>Create an account to start planning your adventures.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" asChild className="p-0 text-primary">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
