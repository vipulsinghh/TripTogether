import * as admin from 'firebase-admin';

// Check if a Firebase app is already initialized to prevent re-initialization
if (!admin.apps.length) {
  console.log('Initializing Firebase Admin SDK...'); // Add this line
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    // Add other configuration options if needed (e.g., databaseURL)
  });
}
console.log('Firebase Admin SDK initialized.'); // Add this line

// Get the auth instance
const auth = admin.auth();

// Export the auth instance
export { auth };