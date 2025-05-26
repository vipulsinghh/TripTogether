import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // Assuming you have firebase initialized and exported as 'db' and 'auth'
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    // Use a dummy user ID for now
    const userId = "dummy-user-id"; 
    
    console.log("Authenticated user ID:", userId);


    // --- Receive Trip Data ---
    const tripData = await req.json();
    console.log("Received trip data:", tripData); // Log received trip data
    // --- End Receive Trip Data ---


    // --- Data Validation (Basic) ---
    const { destination, startDate, endDate } = tripData;
    if (!destination || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields (destination, startDate, endDate)' }, { status: 400 });
    }
    // --- End Data Validation ---


    // --- Prepare Data for Firestore ---
    // Convert date strings to Firebase Timestamps
    const firestoreTripData = {
      ...tripData, // Include all other fields from the request
        userId, // Add the user's ID
        startDate: Timestamp.fromDate(new Date(startDate)),
        endDate: Timestamp.fromDate(new Date(endDate)),
        createdAt: Timestamp.now(), // Add a creation timestamp
    };

    console.log("Attempting to add document to Firestore..."); // Log before addDoc
    // --- Save Data to Firestore ---
    const docRef = await addDoc(collection(db, 'trips'), firestoreTripData);
    console.log("Trip document written with ID:", docRef.id); // Log the new document ID
    // --- End Save Data to Firestore ---


    // --- Success Response ---
    return NextResponse.json({ message: 'Trip created successfully', tripId: docRef.id }, { status: 201 });
    // --- End Success Response ---

  } catch (error: any) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}