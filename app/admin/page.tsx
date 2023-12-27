"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import firebase_app from "@/firebase/config"; // Import your Firebase configuration

const Page: React.FC = () => {
  const auth = getAuth(firebase_app);
  const [user, setUser] = useState<User | null>(null); // Explicitly define the type

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // This function will be called whenever the user logs in or out
      setUser(user);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // User has successfully signed out
        console.log("User signed out");
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Page;
