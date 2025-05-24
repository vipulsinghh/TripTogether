
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plane, Compass, LogOut, UserCircle, Edit } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profilePreferencesSet, setProfilePreferencesSet] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const updateAuthState = () => {
    if (typeof window !== 'undefined') {
      const signedInStatus = localStorage.getItem('isUserSignedIn') === 'true';
      const preferencesSetStatus = localStorage.getItem('userProfilePreferencesSet') === 'true';
      setIsSignedIn(signedInStatus);
      setProfilePreferencesSet(preferencesSetStatus);

      // Profile completion enforcement
      if (signedInStatus && !preferencesSetStatus && pathname !== '/profile' && pathname !== '/' && !pathname.startsWith('/auth')) {
        router.replace('/profile');
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    updateAuthState(); // Initial check
  }, [pathname, router]); // Re-check on pathname change to enforce redirection

  // Effect to update isSignedIn when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      updateAuthState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange); 

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);


  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isUserSignedIn');
      localStorage.removeItem('userProfilePreferencesSet'); // Clear this too
    }
    setIsSignedIn(false);
    setProfilePreferencesSet(false);
    router.push('/');
  };
  
  const canAccessMainApp = isSignedIn && profilePreferencesSet;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Plane className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-gradient">RoamMate</span>
        </Link>
        <nav className="flex items-center gap-1 md:gap-2">
          {canAccessMainApp && (
            <Button variant="ghost" asChild>
              <Link href="/discover">
                <Compass className="md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Discover</span>
              </Link>
            </Button>
          )}
          
          {isClient && isSignedIn && (
            profilePreferencesSet ? (
              <Button variant="ghost" asChild>
                <Link href="/profile"><UserCircle className="md:mr-2 h-4 w-4" /><span className="hidden md:inline">Profile</span></Link>
              </Button>
            ) : (
              <Button variant="ghost" asChild>
                <Link href="/profile"><Edit className="md:mr-2 h-4 w-4 text-destructive" /><span className="hidden md:inline text-destructive">Complete Profile</span></Link>
              </Button>
            )
          )}

          {canAccessMainApp && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/groups">Groups</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/create-trip">Create Trip</Link>
              </Button>
            </>
          )}
          
          {isClient && !isSignedIn && (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground" asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
           {isClient && isSignedIn && (
            <Button variant="outline" onClick={handleSignOut} className="hidden md:flex">
              <LogOut className="md:mr-2 h-4 w-4" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
