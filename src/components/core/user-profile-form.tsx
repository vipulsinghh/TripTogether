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
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, Save } from 'lucide-react';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().max(300, { message: "Bio cannot exceed 300 characters." }).optional(),
  interests: z.array(z.object({ value: z.string().min(1, "Interest cannot be empty") })).optional(),
  travelHistory: z.array(z.object({ value: z.string().min(1, "Travel history item cannot be empty") })).optional(),
  preferences: z.array(z.object({ value: z.string().min(1, "Preference cannot be empty") })).optional(),
  // avatarUrl: z.string().url().optional(), // Future: file upload
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserProfileFormProps {
  defaultValues?: Partial<ProfileFormValues & { email?: string; avatarUrl?: string }>; // email and avatarUrl are not directly editable here but might be part of defaultValues
  onSave?: (data: ProfileFormValues) => void;
}

export default function UserProfileForm({ defaultValues, onSave }: UserProfileFormProps) {
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      bio: defaultValues?.bio || "",
      interests: defaultValues?.interests?.map(i => ({ value: i })) || [{ value: "" }],
      travelHistory: defaultValues?.travelHistory?.map(th => ({ value: th })) || [{ value: "" }],
      preferences: defaultValues?.preferences?.map(p => ({ value: p })) || [{ value: "" }],
    },
  });

  const { fields: interestFields, append: appendInterest, remove: removeInterest } = useFieldArray({
    control: form.control,
    name: "interests",
  });
  const { fields: travelHistoryFields, append: appendTravelHistory, remove: removeTravelHistory } = useFieldArray({
    control: form.control,
    name: "travelHistory",
  });
  const { fields: preferenceFields, append: appendPreference, remove: removePreference } = useFieldArray({
    control: form.control,
    name: "preferences",
  });


  async function onSubmit(data: ProfileFormValues) {
    // Simulate API call
    console.log("Profile Data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Profile Updated!",
      description: "Your travel profile has been successfully saved.",
    });
    if (onSave) {
      onSave(data);
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
                  {...field}
                />
              </FormControl>
              <FormDescription>Max 300 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Interests */}
        <div>
          <FormLabel>Interests</FormLabel>
          {interestFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`interests.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-1">
                  <FormControl>
                    <Input placeholder="e.g., Hiking, Photography" {...field} />
                  </FormControl>
                  {interestFields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeInterest(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
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
          <FormLabel>Travel History</FormLabel>
          {travelHistoryFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`travelHistory.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-1">
                  <FormControl>
                    <Input placeholder="e.g., Paris 2022, Japan 2023" {...field} />
                  </FormControl>
                  {travelHistoryFields.length > 1 && (
                     <Button type="button" variant="ghost" size="icon" onClick={() => removeTravelHistory(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
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

        {/* Preferences */}
        <div>
          <FormLabel>Travel Preferences</FormLabel>
          {preferenceFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`preferences.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-1">
                  <FormControl>
                    <Input placeholder="e.g., Budget-friendly, Adventure" {...field} />
                  </FormControl>
                  {preferenceFields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePreference(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
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
