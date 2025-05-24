
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, PlaneTakeoff, MapPin, DollarSign, Users, FileText, ImagePlus, Tag, Mountain, Palmtree, Sun, MountainSnow, Snowflake, Landmark, Palette, Building2, Bike, Navigation } from 'lucide-react';
import { useState } from "react";

// Define categories similar to DiscoverPage for consistency
const availableCategories = [
  { id: 'Mountains', label: 'Mountains', icon: Mountain },
  { id: 'Beach', label: 'Beach', icon: Palmtree },
  { id: 'Desert', label: 'Desert', icon: Sun },
  { id: 'Hill Stations', label: 'Hill Stations', icon: MountainSnow },
  { id: 'Ice & Snow', label: 'Ice & Snow', icon: Snowflake },
  { id: 'Historical', label: 'Historical', icon: Landmark },
  { id: 'Cultural', label: 'Cultural', icon: Palette },
  { id: 'City Break', label: 'City Break', icon: Building2 },
  { id: 'Adventure', label: 'Adventure', icon: Bike },
  { id: 'Road Trip', label: 'Road Trip', icon: Navigation },
];

const tripFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  destination: z.string().min(3, { message: "Destination must be at least 3 characters." }),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(500),
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
}).refine(data => !data.endDate || !data.startDate || data.endDate >= data.startDate, {
  message: "End date cannot be before start date.",
  path: ["endDate"], 
});

type TripFormValues = z.infer<typeof tripFormSchema>;

export default function TripCreationForm() {
  const { toast } = useToast();
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      title: "",
      destination: "",
      description: "",
      categories: [],
      budget: "",
      maxGroupSize: 4,
    },
  });

  async function onSubmit(data: TripFormValues) {
    console.log("Trip Creation Data:", data);
    if (data.imageFiles) {
      console.log("Selected Images:", Array.from(data.imageFiles).map(file => file.name));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Trip Created!",
      description: `${data.title} has been successfully created.`,
    });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><PlaneTakeoff className="mr-2 h-4 w-4 text-muted-foreground" />Trip Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Amazing Bali Adventure" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" />Destination</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Bali, Indonesia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal w-full justify-start",
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
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal w-full justify-start",
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
              <FormLabel className="flex items-center"><FileText className="mr-2 h-4 w-4 text-muted-foreground" />Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your trip, activities, and what you're looking for in travel companions..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>Max 500 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base flex items-center"><Tag className="mr-2 h-4 w-4 text-muted-foreground" />Categories</FormLabel>
                <FormDescription>
                  Select one or more categories that best describe your trip.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availableCategories.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={category.id}
                          className="flex flex-row items-center space-x-2 space-y-0 bg-muted/50 p-3 rounded-md border"
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
                          <FormLabel className="font-normal flex items-center cursor-pointer">
                             <category.icon className="mr-2 h-4 w-4 text-primary" />
                            {category.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="imageFiles"
          render={() => ( // field is not directly used here, but we need to manage its value
            <FormItem>
              <FormLabel className="flex items-center"><ImagePlus className="mr-2 h-4 w-4 text-muted-foreground" />Trip Images (Optional)</FormLabel>
              <FormControl>
                 <Input 
                  type="file" 
                  multiple 
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </FormControl>
              {selectedFileNames.length > 0 && (
                <FormDescription>
                  Selected: {selectedFileNames.join(", ")}
                </FormDescription>
              )}
              <FormDescription>Upload up to 5 images (max 2MB each). PNG, JPG, GIF accepted.</FormDescription>
              <FormMessage /> {/* This will show errors from the schema refinement */}
            </FormItem>
          )}
        />


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Estimated Budget (Optional)</FormLabel>
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
                <FormLabel className="flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground" />Max Group Size</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground">
          Create Trip
        </Button>
      </form>
    </Form>
  );
}
