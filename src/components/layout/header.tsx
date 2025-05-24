
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plane, Compass, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setIsSignedIn(localStorage.getItem('isUserSignedIn') === 'true');
    }
  }, []);

  // Effect to update isSignedIn when localStorage changes (e.g. from another tab, or dev tools)
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        setIsSignedIn(localStorage.getItem('isUserSignedIn') === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Check on focus as 'storage' event might not fire for same tab
    window.addEventListener('focus', handleStorageChange); 

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);


  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isUserSignedIn');
    }
    setIsSignedIn(false); // Update state immediately
    router.push('/');
    // router.refresh(); // May not be strictly necessary after push to /
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Plane className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-gradient">RoamMate</span>
        </Link>
        <nav className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" asChild>
            <Link href="/discover">
              <Compass className="md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Discover</span>
            </Link>
          </Button>
          {isClient && isSignedIn && (
            <Button variant="ghost" asChild>
              <Link href="/profile">Profile</Link>
            </Button>
          )}
          <Button variant="ghost" asChild>
            <Link href="/groups">Groups</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/create-trip">Create Trip</Link>
          </Button>
          
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
          {/* Add a mobile menu trigger here if needed in the future to show sign out / profile conditionally */}
        </nav>
      </div>
    </header>
  );
}
