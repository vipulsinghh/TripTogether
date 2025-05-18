
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plane, Compass } from 'lucide-react';

export default function Header() {
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
          <Button variant="ghost" asChild>
            <Link href="/profile">Profile</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/groups">Groups</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/create-trip">Create Trip</Link>
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground" asChild>
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
          </div>
          {/* Add a mobile menu trigger here if needed in the future */}
        </nav>
      </div>
    </header>
  );
}

    