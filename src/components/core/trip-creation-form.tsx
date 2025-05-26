
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, PlaneTakeoff, MapPin, DollarSign, Users, FileText, ImagePlus, Tag, Mountain, Palmtree, Sun, MountainSnow, Snowflake, Landmark, Palette, Building2, Bike, Navigation, Briefcase, ThumbsUp, Zap as ZapIcon, Settings2, Cigarette, Wine, Users2 as GroupIcon, Cake, CheckSquare as CheckSquareIcon, LocateFixed } from 'lucide-react';
import { useState } from "react";
import { 
  smokingPolicyOptions, // For trip policies
  alcoholPolicyOptions, // For trip policies
  genderPreferenceOptions, 
  ageGroupOptions, 
  travelerTypeOptions,
  categoriesList as appCategories 
} from "@/types"; 

const categoryIconComponents: { [key: string]: React.ElementType } = {
  'Mountains': Mountain,
  'Beach': Palmtree,
  'Desert': Sun,
  'Hill Stations': MountainSnow,
  'Ice & Snow': Snowflake,
  'Historical': Landmark,
  'Cultural': Palette,
  'City Break': Building2,
  'Adventure': Bike,
  'Road Trip': Navigation,
  'Wildlife': Briefcase, 
  'Wellness': ThumbsUp, 
  'Foodie': ZapIcon, 
  'Nightlife': ZapIcon, 
  'Budget': DollarSign,
};


const tripFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  destination: z.string().min(3, { message: "Main Destination must be at least 3 characters." }),
  startLocation: z.string().min(3, { message: "Start Location must be at least 3 characters." }),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000, "Description max 1000 chars"),
  categories: z.array(z.string()).min(1, { message: "Please select at least one category." }),
  budget: z.string().optional(),
  maxGroupSize: z.coerce.number().min(2, "Group size must be at least 2").max(20, "Max group size is 20"),
  imageFiles: z.custom<FileList>().optional().refine(
    (files) => !files || files.length <= 5,
    "You can upload a maximum of 5 images."
  ).refine(
    (files) => !files || Array.from(files).every(file => file.size <= 2 * 1024 * 1024),
    "Each image must be less than 2MB."
  ),
  // These define THE TRIP's policies and target audience
  smokingPolicy: z.enum(['any', 'permitted', 'not_permitted', 'outside_only']).default('any'),
  alcoholPolicy: z.enum(['any', 'permitted', 'not_permitted', 'socially']).default('any'),
  genderPreference: z.enum(['any', 'men_only', 'women_only', 'mixed']).default('any'),
  targetAgeGroup: z.enum(['any', '18-25', '26-35', '36-45', '45+']).default('any'),
  targetTravelerType: z.enum(['any', 'singles', 'couples', 'family', 'friends', 'backpackers', 'luxury']).default('any'),
}).refine(data => data.endDate >= data.startDate, {
  message: "End date cannot be before start date.",
  path: ["endDate"], 
});

type TripFormValues = z.infer<typeof tripFormSchema>;

// Define the props for the TripCreationForm component
interface TripCreationFormProps {
  onSubmit: (data: TripFormValues) => Promise<void>; // Define the expected type for the onSubmit prop
}

export default function TripCreationForm({ onSubmit: handleFormSubmit }: TripCreationFormProps) {
  const { toast } = useToast();
  // Import useFirebase to get the current user
  // const { auth } = useFirebase(); // Assuming you have a useFirebase hook

  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      title: "",
      destination: "", 
      startLocation: "",
      description: "",
      categories: [],
      budget: "",
      maxGroupSize: 4,
      smokingPolicy: 'any',
      alcoholPolicy: 'any',
      genderPreference: 'any',
      targetAgeGroup: 'any',
      targetTravelerType: 'any',
    },
  });

  async function onSubmit(data: TripFormValues) {
    // console.log("Trip Creation Data:", data); // Keep for debugging if needed
    // if (data.imageFiles) { // Keep for debugging if needed
    //   console.log("Selected Images:", Array.from(data.imageFiles).map(file => file.name)); // Keep for debugging if needed
    // }

    // Get the current user's ID. Replace with actual logic if useFirebase hook is structured differently
    // const userId = auth.currentUser?.uid;
    const userId = "dummy-user-id"; // Replace with actual user ID retrieval

    // Prepare data to send to the API
    const tripDataForApi = {
      ...data,
      userId: userId, // Include the user ID
      startDate: data.startDate.toISOString(), // Convert Date to ISO string
      endDate: data.endDate.toISOString(), // Convert Date to ISO string
      // Image files might require special handling for API upload (e.g., FormData)
      // For now, we'll omit imageFiles from the JSON body and handle them separately or in the API route
      imageFiles: undefined // Exclude FileList from JSON body
    };

    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripDataForApi),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create trip');
      }

      const result = await response.json();

      toast({
        title: "Trip Created!",
        description: `${data.title} has been successfully created.`,
      });
      form.reset();
      setSelectedFileNames([]);
    } catch (error: any) {
      console.error("Error creating trip:", error);
      toast({
        title: "Error Creating Trip",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  // Original onSubmit function (commented out)
  
  async function onSubmitOriginal(data: TripFormValues) {
    console.log("Trip Creation Data:", data);
    if (data.imageFiles) {
      console.log("Selected Images:", Array.from(data.imageFiles).map(file => file.name));
    }
    form.reset();
    setSelectedFileNames([]);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      form.setValue("imageFiles", files, { shouldValidate: true });
      setSelectedFileNames(fileNames);
    } else {
      form.setValue("imageFiles", undefined, { shouldValidate: true });
      setSelectedFileNames([]);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-sm sm:text-base"><PlaneTakeoff className="mr-2 h-4 w-4 text-muted-foreground" />Trip Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Amazing Bali Adventure" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-sm sm:text-base"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" />Main Destination</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Bali, Indonesia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="startLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-sm sm:text-base"><LocateFixed className="mr-2 h-4 w-4 text-muted-foreground" />Trip Start Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Denpasar Airport, Bali" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm sm:text-base">Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal w-full justify-start text-sm",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm sm:text-base">End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal w-full justify-start text-sm",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < (form.getValues("startDate") || new Date(new Date().setHours(0,0,0,0)))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-sm sm:text-base"><FileText className="mr-2 h-4 w-4 text-muted-foreground" />Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your trip, activities, and what you're looking for in travel companions..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">Max 1000 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-2 sm:mb-4">
                <FormLabel className="text-base flex items-center text-sm sm:text-base"><Tag className="mr-2 h-4 w-4 text-muted-foreground" />Categories</FormLabel>
                <FormDescription className="text-xs sm:text-sm">
                  Select one or more categories that best describe your trip.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {appCategories.map((category) => {
                  const IconComponent = categoryIconComponents[category.id] || Tag;
                  return (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={category.id}
                          className="flex flex-row items-center space-x-2 space-y-0 bg-muted/50 p-2 sm:p-3 rounded-md border hover:bg-muted transition-colors"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(category.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), category.id])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== category.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center cursor-pointer text-xs sm:text-sm">
                             <IconComponent className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                            {category.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                )})}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageFiles"
          render={() => ( 
            <FormItem>
              <FormLabel className="flex items-center text-sm sm:text-base"><ImagePlus className="mr-2 h-4 w-4 text-muted-foreground" />Trip Images (Optional)</FormLabel>
              <FormControl>
                 <Input 
                  type="file" 
                  multiple 
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleFileChange}
                  className="file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </FormControl>
              {selectedFileNames.length > 0 && (
                <FormDescription className="text-xs sm:text-sm">
                  Selected: {selectedFileNames.join(", ")}
                </FormDescription>
              )}
              <FormDescription className="text-xs sm:text-sm">Upload up to 5 images (max 2MB each). PNG, JPG, GIF accepted.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 p-3 sm:p-4 border rounded-lg bg-muted/30">
            <h3 className="text-md sm:text-lg font-semibold flex items-center"><Settings2 className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-primary" />Trip Policies & Target Audience</h3>
            <FormDescription className="text-xs sm:text-sm -mt-2 mb-3">Define the rules and who this trip is best suited for.</FormDescription>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <FormField
                    control={form.control}
                    name="smokingPolicy"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-xs sm:text-sm"><Cigarette className="mr-2 h-4 w-4 text-muted-foreground"/>Smoking Policy (for this trip)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select policy" /></SelectTrigger></FormControl>
                        <SelectContent>
                            {smokingPolicyOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="alcoholPolicy"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-xs sm:text-sm"><Wine className="mr-2 h-4 w-4 text-muted-foreground"/>Alcohol Policy (for this trip)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select policy" /></SelectTrigger></FormControl>
                        <SelectContent>
                            {alcoholPolicyOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="genderPreference"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-xs sm:text-sm"><GroupIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Target Gender Mix (for this trip)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select gender mix" /></SelectTrigger></FormControl>
                        <SelectContent>
                            {genderPreferenceOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="targetAgeGroup"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-xs sm:text-sm"><Cake className="mr-2 h-4 w-4 text-muted-foreground"/>Target Age Group (for this trip)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select age group" /></SelectTrigger></FormControl>
                        <SelectContent>
                            {ageGroupOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="targetTravelerType"
                    render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormLabel className="flex items-center text-xs sm:text-sm"><CheckSquareIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Target Traveler Type (for this trip)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select traveler type" /></SelectTrigger></FormControl>
                        <SelectContent>
                            {travelerTypeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-sm sm:text-base"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Estimated Budget (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $1000 - $1500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxGroupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-sm sm:text-base"><Users className="mr-2 h-4 w-4 text-muted-foreground" />Max Group Size</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full text-sm sm:text-base bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground">
          Create Trip
        </Button>
      </form>
    </Form>
  );
}
