
import SignInForm from '@/components/auth/sign-in-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Use actual Button
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gradient">Welcome Back!</CardTitle>
          <CardDescription>Sign in to continue your journey with RoamMate.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Button variant="link" asChild className="p-0 text-primary">
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
