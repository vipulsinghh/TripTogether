// src/app/api/trips/[tripId]/join/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Assuming your firebase instance is exported from here
import { auth } from '@/lib/firebaseAdmin'; // Assuming your Firebase Admin auth is here
export async function POST(
  req: NextRequest,
  { params }: { params: { tripId: string } }
) {
  const { tripId } = params;

  // --- Authentication and User ID Retrieval ---
  // This is a placeholder. You need to implement actual authentication
  // to get the authenticated user's ID securely.
  // This might involve verifying a token from the request headers.
  let userId: string | null = null;
  const authorizationHeader = req.headers.get('Authorization');

  if (!authorizationHeader) {
    return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
  }

  const [type, token] = authorizationHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return NextResponse.json({ message: 'Invalid Authorization header format' }, { status: 401 });
  }

  try {
    // Verify the token and get the user ID
    const decodedToken = await auth.verifyIdToken(token);
    userId = decodedToken.uid;
  } catch (error) {
    console.error('Error verifying auth token:', error);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
  // --- End Authentication Placeholder ---

  if (!userId) {
    // Should not happen if token verification is successful, but as a fallback
    return NextResponse.json({ message: 'Could not determine user ID' }, { status: 401 });
  }

  if (!tripId) {
    return NextResponse.json({ message: 'Trip ID is required' }, { status: 400 });
  }

  const tripRef = doc(db, 'trips', tripId);

  try {
    const tripSnap = await getDoc(tripRef);

    if (!tripSnap.exists()) {
      return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
    }

    // Update the document to add the user to the 'pendingMembers' array
    // arrayUnion adds the element only if it's not already present
    await updateDoc(tripRef, {
      pendingMembers: arrayUnion(userId),
    });

    return NextResponse.json({ message: 'Request to join sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error requesting to join trip:', error);
    return NextResponse.json({ message: 'Error sending request to join trip' }, { status: 500 });
  }
}