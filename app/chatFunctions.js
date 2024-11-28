import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import React from "react";

export function useChatMessages(chatId) {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, [chatId]);

  return messages;
}
export async function sendMessage(chatId, senderId, text) {
  await addDoc(collection(db, "chats", chatId, "messages"), {
    senderId,
    text,
    timestamp: serverTimestamp(),
  });
}
