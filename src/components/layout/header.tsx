
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plane, Compass, LogOut, UserCircle, Edit, MessageSquare, Bell, Users } from 'lucide-react';
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
      const mainAppRoutes = ['/discover', '/groups', '/create-trip', '/chat'];
      if (signedInStatus && !preferencesSetStatus && mainAppRoutes.some(route => pathname.startsWith(route)) && pathname !== '/profile') {
        router.replace('/profile');
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    updateAuthState(); 
  }, [pathname]); // Removed router from dependency array for this specific effect to avoid potential loops, path change is enough.

  // Effect to update isSignedIn when localStorage changes (e.g. from another tab) or on window focus
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
  }, []); // Runs once on mount


  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isUserSignedIn');
      localStorage.removeItem('userProfilePreferencesSet'); 
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
                <Link href="/groups"><span className="hidden md:inline">Groups</span><Users className="md:hidden h-4 w-4"/></Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/create-trip"><span className="hidden md:inline">Create Trip</span><Edit className="md:hidden h-4 w-4"/></Link>
              </Button>
              <Button variant="ghost" asChild size="icon" title="Messages">
                <Link href="/messages">
                  <MessageSquare />
                  <span className="sr-only">Messages</span>
                </Link>
              </Button>
              <Button variant="ghost" asChild size="icon" title="Notifications">
                <Link href="/notifications">
                  <Bell />
                  <span className="sr-only">Notifications</span>
                </Link>
              </Button>
            </>
          )}
          
          {isClient && !isSignedIn && (
            <div className="flex items-center gap-2"> {/* md:flex removed to always show on larger screens */}
              <Button variant="outline" asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground" asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
           {isClient && isSignedIn && (
            <Button variant="outline" onClick={handleSignOut} className="flex"> {/* md:flex removed to always show this button when signed in */}
              <LogOut className="md:mr-2 h-4 w-4" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
