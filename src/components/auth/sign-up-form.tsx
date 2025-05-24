
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import modular auth functions
import { app } from '../../lib/firebase'; // Import the Firebase app instance
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const auth = getAuth(app); // Get the auth instance
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      // const user = userCredential.user; // uncomment if you need user object

      if (typeof window !== 'undefined') {
        localStorage.setItem('isUserSignedIn', 'true');
        localStorage.setItem('userProfilePreferencesSet', 'false');
        localStorage.setItem('userName', values.name);
        localStorage.setItem('userEmail', values.email);
      }

      toast({
        title: "Account Created!",
        description: "Welcome! Please complete your profile for the best experience.",
      });

      router.push('/discover'); // Redirect to discover page
    } catch (error: any) {
      console.error("Sign Up Error:", error.message);
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Full Name</FormLabel>
              <div className="relative">
                <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input placeholder="Your Name" {...field} className="pl-8 sm:pl-10 text-sm" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input placeholder="you@example.com" {...field} className="pl-8 sm:pl-10 text-sm" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Password</FormLabel>
              <div className="relative">
                <Lock className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} className="pl-8 sm:pl-10 text-sm" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-sm sm:text-base bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground">
          Create Account
        </Button>
      </form>
    </Form>
  );
}
