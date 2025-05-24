import { NextResponse } from 'next/server';
import { db, auth } from '@/lib/firebase'; // Assuming you have firebase initialized and exported as 'db' and 'auth'
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { destination, startDate, endDate, members, description, interests } = await req.json();

    // Basic validation (you can add more comprehensive validation)
    if (!destination || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Process members and interests strings into arrays
    const membersArray = members ? members.split(',').map((member: string) => member.trim()).filter((member: string) => member !== '') : [];
    const interestsArray = interests ? interests.split(',').map((interest: string) => interest.trim()).filter((interest: string) => interest !== '') : [];

    // Add the current user's ID to the members array if not already present
    if (!membersArray.includes(user.uid)) {
      membersArray.push(user.uid);
    }

    const newTrip = {
      userId: user.uid,
      destination,
      startDate: Timestamp.fromDate(new Date(startDate)),
      endDate: Timestamp.fromDate(new Date(endDate)),
      members: membersArray,
      description: description || '',
      interests: interestsArray,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'trips'), newTrip);

    return NextResponse.json({ message: 'Trip created successfully', tripId: docRef.id }, { status: 201 });

  } catch (error) {
    console.error('Error creating trip:', error); // Log the error for debugging
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}