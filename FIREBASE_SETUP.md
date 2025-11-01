# Firebase Setup Guide for Tempus Fugit

This guide will help you set up Firebase for your Tempus Fugit application to enable cloud syncing of your bucket list.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "tempus-fugit")
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Enter an app nickname (e.g., "Tempus Fugit Web")
3. **Do NOT** check "Firebase Hosting" (unless you want to use it)
4. Click "Register app"
5. You'll see your Firebase configuration object - **keep this page open!**

## Step 3: Enable Authentication

1. In the Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Go to the **Sign-in method** tab
4. Click on "Google" provider
5. Enable the toggle switch
6. Select a support email from the dropdown
7. Click "Save"

## Step 4: Set up Firestore Database

1. In the Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Select a location (choose one closest to you)
4. Start in **test mode** (we'll secure it next)
5. Click "Next" and then "Enable"

## Step 5: Configure Firestore Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Replace the default rules with these:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

## Step 6: Add Your Configuration

1. Go back to the Firebase config you got in Step 2
2. Copy the configuration object (it looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

3. Open `firebase-config.js` in your project
4. Replace the placeholder values with your actual configuration

## Step 7: Test Your Setup

1. Open `index.html` in your browser
2. Click "Sign in with Google"
3. Select your Google account
4. Add some items to your bucket list
5. Sign out and sign in again - your items should still be there!

## Features

- **Cloud Sync**: Your bucket list is automatically saved to Firebase Firestore
- **Multi-device**: Access your list from any device by signing in
- **Offline Support**: Works offline with localStorage fallback
- **Secure**: Only you can see and edit your data

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console → Authentication → Settings → Authorized domains
- Add your domain (e.g., `localhost` for local testing)

### Data not syncing
- Check browser console for errors
- Verify your Firestore security rules are correct
- Make sure you're signed in

### Can't sign in
- Check that Google sign-in is enabled in Firebase Console
- Verify your domain is authorized
- Try clearing browser cache and cookies

## Need Help?

If you encounter any issues, check the [Firebase Documentation](https://firebase.google.com/docs) or open an issue in the project repository.
