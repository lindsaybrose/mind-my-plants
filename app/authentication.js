import { auth, db } from "./firebase"; // Import your Firebase setup
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Sign Up
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
}

// Log In
export async function login(email, password, currentUser) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    currentUser[0].uid = userCredential.user.uid;
    console.log("User logged in:", userCredential.user);
    console.log(currentUser);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
}

//Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error.message);
    console.log("Failed to log out. Try again.");
  }
};

export async function createChatIfNotExists(currentUserId, userEmail) {
  try {
    // Get the UID of the other user by their email
    const userDocUID = await fetchUserByEmail(userEmail);
    console.log(userDocUID, "USER FETCHEDDDD");
    console.log(currentUserId, "CURRENT USER ID");
    const otherUserId = userDocUID;

    // Generate chat ID (sorted to ensure consistency)
    const chatId = [currentUserId, otherUserId].sort().join("_");

    // Reference to the chat document
    const chatRef = doc(db, "chats", chatId);

    // Check if the chat document exists
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      // Create the chat document
      await setDoc(chatRef, {
        createdAt: serverTimestamp(),
        users: [currentUserId, otherUserId],
      });

      // Add the initial message
      const message = {
        senderId: currentUserId,
        text: "Hi, I just accepted your request for my plant sitting ad. Let me know if you have any questions",
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(chatRef, "messages"), message);
    }

    return chatId; // Return the chatId for navigation
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}

async function fetchUserByEmail(email) {
  // Use a Firestore query to find the user by email
  console.log(email, "EMAAAAAILLLLLLLLL");
  const usersRef = collection(db, "users"); // Assuming you store users in a "users" collection
  const querySnapshot = await getDocs(
    query(usersRef, where("email", "==", email))
  );

  if (!querySnapshot.empty) {
    //return querySnapshot.docs[0].data(); // Return user data
    return querySnapshot.docs[0].id; //// Document ID is the UID
  } else {
    throw new Error("User not found");
  }
}

// async function debugUsers() {
//   const usersRef = collection(db, "users");
//   const querySnapshot = await getDocs(usersRef);
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data(), "DEBUGGINGGG");
//   });
// }
