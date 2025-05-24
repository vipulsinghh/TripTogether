
// src/types/index.ts

/**
 * Represents a user in the RoamMate application.
 */
export interface User {
  id: string; // Unique identifier (e.g., UUID)
  name: string;
  email: string; // Should be unique
  passwordHash: string; // Backend only, never sent to client
  avatarUrl?: string;
  bio?: string;
  interests?: string[];
  travelHistory?: string[]; // e.g., ["Paris 2022 (City Break, Cultural)", "Andes Trek (Adventure, Mountains)"]
  
  // Detailed preferences for matching and recommendations
  preferences?: string[]; // General preferences text array
  smokingPolicy?: 'any' | 'non_smoker' | 'smoker_friendly' | 'flexible_smoking'; // User's own stance or preference in groups
  alcoholPolicy?: 'any' | 'dry_trip' | 'social_drinker' | 'party_friendly'; // User's own stance or preference
  preferredGenderMix?: 'any' | 'men_only' | 'women_only' | 'mixed'; // Gender mix preference for groups
  preferredAgeGroup?: 'any' | '18-25' | '26-35' | '36-45' | '45+'; // Preferred age group of travel companions
  preferredTravelerType?: 'any' | 'singles' | 'couples' | 'family' | 'friends' | 'backpackers' | 'luxury'; // Preferred type of travel/travelers

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a trip created by a user.
 */
export interface Trip {
  id: string; // Unique identifier (e.g., UUID)
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  description: string;
  categories: string[]; // e.g., ["Beach", "Adventure", "Cultural"]
  budget?: string; // e.g., "$1000 - $1500" or structured { min: 1000, max: 1500, currency: "USD" }
  maxGroupSize: number;
  currentMemberCount?: number; // Added for display on trip card / detail
  imageUrls?: string[];
  createdById: string; // Foreign key to User.id
  creatorName?: string; // Denormalized for convenience
  creatorAvatarUrl?: string; // Denormalized
  memberIds?: string[]; // Array of User.id who have joined

  // Fields for recommender system & advanced filtering, set by trip creator
  locationCoordinates?: { // For GeoJSON Point (example)
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  smokingPolicy: 'any' | 'permitted' | 'not_permitted' | 'outside_only'; // Trip's specific policy
  alcoholPolicy: 'any' | 'permitted' | 'not_permitted' | 'socially'; // Trip's specific policy
  genderPreference: 'any' | 'men_only' | 'women_only' | 'mixed'; // Desired gender mix for this trip
  targetAgeGroup: 'any' | '18-25' | '26-35' | '36-45' | '45+'; // Target age for this trip's members
  targetTravelerType: 'any' | 'singles' | 'couples' | 'family' | 'friends' | 'backpackers' | 'luxury'; // Target traveler profile for this trip

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a message in a group chat.
 */
export interface ChatMessage {
  id: string;
  groupId: string; // Foreign key to Group.id or Trip.id if chat is per trip
  senderId: string; // Foreign key to User.id
  senderName: string; // Denormalized for convenience
  senderAvatarUrl?: string; // Denormalized for convenience
  text: string;
  timestamp: Date;
}

// Options for select inputs - can be shared across forms/filters
export const smokingPolicyOptions = [
  { value: 'any', label: 'Any' },
  { value: 'not_permitted', label: 'Not Permitted' },
  { value: 'permitted', label: 'Permitted' },
  { value: 'outside_only', label: 'Outside Only' },
];

export const userSmokingPreferenceOptions = [
  { value: 'any', label: 'Flexible / No Preference' },
  { value: 'non_smoker', label: 'Prefer Non-Smoking Groups' },
  { value: 'smoker_friendly', label: 'Smoker-Friendly Groups Ok' },
];


export const alcoholPolicyOptions = [
  { value: 'any', label: 'Any' },
  { value: 'not_permitted', label: 'Not Permitted (Dry Trip)' },
  { value: 'socially', label: 'Socially / Moderately' },
  { value: 'permitted', label: 'Permitted / Party Friendly' },
];

export const userAlcoholPreferenceOptions = [
  { value: 'any', label: 'Flexible / No Preference' },
  { value: 'dry_trip', label: 'Prefer Dry Trips' },
  { value: 'social_drinker', label: 'Social/Moderate Drinker' },
  { value: 'party_friendly', label: 'Party Friendly Ok' },
];

export const genderPreferenceOptions = [
  { value: 'any', label: 'Any' },
  { value: 'mixed', label: 'Mixed Group' },
  { value: 'men_only', label: 'Men Only' },
  { value: 'women_only', label: 'Women Only' },
];

export const ageGroupOptions = [
  { value: 'any', label: 'Any Age Group' },
  { value: '18-25', label: '18-25 years' },
  { value: '26-35', label: '26-35 years' },
  { value: '36-45', label: '36-45 years' },
  { value: '45+', label: '45+ years' },
];

export const travelerTypeOptions = [
  { value: 'any', label: 'Any Traveler Type' },
  { value: 'singles', label: 'Singles' },
  { value: 'couples', label: 'Couples' },
  { value: 'family', label: 'Family Friendly' },
  { value: 'friends', label: 'Friends Group' },
  { value: 'backpackers', label: 'Backpackers' },
  { value: 'luxury', label: 'Luxury Travelers' },
];

export const categoriesList = [
  { id: 'Mountains', name: 'Mountains', dataAiHint: 'mountains landscape' },
  { id: 'Beach', name: 'Beach', dataAiHint: 'beach sunset' },
  { id: 'Desert', name: 'Desert', dataAiHint: 'desert dunes' },
  { id: 'Hill Stations', name: 'Hill Stations', dataAiHint: 'hill station' },
  { id: 'Ice & Snow', name: 'Ice & Snow', dataAiHint: 'snowy landscape' },
  { id: 'Historical', name: 'Historical', dataAiHint: 'historical ruins' },
  { id: 'Cultural', name: 'Cultural', dataAiHint: 'cultural festival' },
  { id: 'City Break', name: 'City Break', dataAiHint: 'city skyline' },
  { id: 'Adventure', name: 'Adventure', dataAiHint: 'adventure sport' },
  { id: 'Road Trip', name: 'Road Trip', dataAiHint: 'road trip scenic' },
  { id: 'Wildlife', name: 'Wildlife', dataAiHint: 'wildlife safari' },
  { id: 'Wellness', name: 'Wellness', dataAiHint: 'yoga retreat' },
  { id: 'Foodie', name: 'Foodie', dataAiHint: 'gourmet food' },
  { id: 'Nightlife', name: 'Nightlife', dataAiHint: 'city nightlife' },
  { id: 'Budget', name: 'Budget Travel', dataAiHint: 'hostel backpacker' },
];
