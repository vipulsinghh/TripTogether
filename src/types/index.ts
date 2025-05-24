
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
  travelHistory?: string[];
  preferences?: string[];
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
  imageUrls?: string[];
  createdById: string; // Foreign key to User.id
  memberIds?: string[]; // Array of User.id who have joined

  // Fields for recommender system & advanced filtering
  locationCoordinates?: { // For GeoJSON Point (example)
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  smokingPolicy?: 'any' | 'permitted' | 'not_permitted';
  alcoholPolicy?: 'any' | 'permitted' | 'not_permitted';
  genderPreference?: 'any' | 'men_only' | 'women_only' | 'mixed';
  targetAgeGroup?: 'any' | '18-25' | '26-35' | '36-45' | '45+'; // Align with filter panel
  targetTravelerType?: 'any' | 'singles' | 'couples' | 'family' | 'friends'; // Align with filter panel

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

// You might also want a Group schema if trips can have multiple distinct groups
// or if groups are formed independently of specific trips first.
// For now, we can assume members join a Trip directly.

