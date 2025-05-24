
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, Save, UserCog, Cigarette, Wine, Users, Cake, CheckSquare } from 'lucide-react';
import { 
  userSmokingPreferenceOptions, 
  userAlcoholPreferenceOptions, 
  genderPreferenceOptions, 
  ageGroupOptions, 
  travelerTypeOptions 
} from "@/types";


const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().max(300, { message: "Bio cannot exceed 300 characters." }).optional(),
  interests: z.array(z.object({ value: z.string().min(1, "Interest cannot be empty") })).optional(),
  travelHistory: z.array(z.object({ value: z.string().min(1, "Travel history item cannot be empty") })).optional(),
  preferences: z.array(z.object({ value: z.string().min(1, "Preference cannot be empty") })).optional(),
  // These fields describe the USER's own habits and what they look for in companions/groups
  smokingPolicy: z.enum(['any', 'non_smoker', 'smoker_friendly', 'flexible_smoking']).default('any'),
  alcoholPolicy: z.enum(['any', 'dry_trip', 'social_drinker', 'party_friendly']).default('any'),
  preferredGenderMix: z.enum(['any', 'men_only', 'women_only', 'mixed']).default('any'),
  preferredAgeGroup: z.enum(['any', '18-25', '26-35', '36-45', '45+']).default('any'),
  preferredTravelerType: z.enum(['any', 'singles', 'couples', 'family', 'friends', 'backpackers', 'luxury']).default('any'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserProfileFormProps {
  defaultValues?: Partial<ProfileFormValues & { email?: string; avatarUrl?: string }>;
  onSaveSuccess?: () => void; 
}

export default function UserProfileForm({ defaultValues, onSaveSuccess }: UserProfileFormProps) {
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      bio: defaultValues?.bio || "",
      interests: defaultValues?.interests?.map(i => ({ value: i })) || [{ value: "" }],
      travelHistory: defaultValues?.travelHistory?.map(th => ({ value: th })) || [{ value: "" }],
      preferences: defaultValues?.preferences?.map(p => ({ value: p })) || [{ value: "" }],
      smokingPolicy: defaultValues?.smokingPolicy || 'any',
      alcoholPolicy: defaultValues?.alcoholPolicy || 'any',
      preferredGenderMix: defaultValues?.preferredGenderMix || 'any',
      preferredAgeGroup: defaultValues?.preferredAgeGroup || 'any',
      preferredTravelerType: defaultValues?.preferredTravelerType || 'any',
    },
  });

  const { fields: interestFields, append: appendInterest, remove: removeInterest } = useFieldArray({
    control: form.control, name: "interests",
  });
  const { fields: travelHistoryFields, append: appendTravelHistory, remove: removeTravelHistory } = useFieldArray({
    control: form.control, name: "travelHistory",
  });
  const { fields: preferenceFields, append: appendPreference, remove: removePreference } = useFieldArray({
    control: form.control, name: "preferences",
  });


  async function onSubmit(data: ProfileFormValues) {
    console.log("Profile Data to save:", data);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('userProfilePreferencesSet', 'true');
    }

    if (onSaveSuccess) {
      onSaveSuccess(); 
    } 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself and your travel style..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>Max 300 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <h3 className="text-lg font-semibold border-b pb-2 flex items-center"><UserCog className="mr-2 h-5 w-5 text-primary" />About You & Your Travel Style</h3>
        <p className="text-sm text-muted-foreground -mt-6">Help us understand your personal habits and what you look for in travel companions and groups.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="smokingPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Cigarette className="mr-2 h-4 w-4 text-muted-foreground" />Your Smoking Stance</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select your smoking stance" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userSmokingPreferenceOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">How do you feel about smoking when traveling?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alcoholPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Wine className="mr-2 h-4 w-4 text-muted-foreground" />Your Alcohol Stance</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select your alcohol stance" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userAlcoholPreferenceOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">Your comfort level with alcohol in travel groups.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="preferredGenderMix"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground" />Preferred Group Gender Mix</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select gender mix preference" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genderPreferenceOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 <FormDescription className="text-xs">What gender mix are you most comfortable with in a group?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredAgeGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Cake className="mr-2 h-4 w-4 text-muted-foreground" />Preferred Companion Age Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select preferred age group" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ageGroupOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">What age range do you prefer for travel companions?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
            control={form.control}
            name="preferredTravelerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><CheckSquare className="mr-2 h-4 w-4 text-muted-foreground" />Your Preferred Traveler Type/Vibe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select preferred traveler type" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {travelerTypeOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">What kind of travelers or trip styles do you generally prefer?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


        {/* Interests */}
        <div>
          <FormLabel className="text-md font-medium">Interests</FormLabel>
          <FormDescription>Add your travel interests (e.g., Hiking, Photography, Foodie).</FormDescription>
          {interestFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`interests.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-2">
                  <FormControl>
                    <Input placeholder="e.g., Hiking" {...field} />
                  </FormControl>
                  {interestFields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeInterest(index)} aria-label="Remove interest">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                   <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => appendInterest({ value: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Interest
          </Button>
        </div>
        
        {/* Travel History */}
        <div>
          <FormLabel className="text-md font-medium">Travel History</FormLabel>
          <FormDescription>List some places you've been (e.g., Paris 2022, Japan 2023).</FormDescription>
          {travelHistoryFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`travelHistory.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-2">
                  <FormControl>
                    <Input placeholder="e.g., Paris 2022" {...field} />
                  </FormControl>
                  {travelHistoryFields.length > 1 && (
                     <Button type="button" variant="ghost" size="icon" onClick={() => removeTravelHistory(index)} aria-label="Remove travel history item">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                   <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => appendTravelHistory({ value: "" })}
          >
             <PlusCircle className="mr-2 h-4 w-4" /> Add Travel History
          </Button>
        </div>

        {/* General Preferences */}
        <div>
          <FormLabel className="text-md font-medium">Other General Preferences</FormLabel>
           <FormDescription>Any other specific preferences for your travel experiences (e.g., Prefer quiet stays, Love street food).</FormDescription>
          {preferenceFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`preferences.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-2">
                  <FormControl>
                    <Input placeholder="e.g., Prefer quiet stays" {...field} />
                  </FormControl>
                  {preferenceFields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePreference(index)} aria-label="Remove preference">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => appendPreference({ value: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Preference
          </Button>
        </div>

        <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground">
          <Save className="mr-2 h-4 w-4" /> Save Profile
        </Button>
      </form>
    </Form>
  );
}
