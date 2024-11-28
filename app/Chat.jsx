import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { auth } from "./firebase"; // Assume user authentication is handled.
import { useChatMessages, sendMessage } from "./chatFunctions";
import { logoutUser } from "./authentication";

export default function Chat({ chatId }) {
  const messages = useChatMessages(chatId);
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text.trim()) {
      await sendMessage(chatId, auth.currentUser.uid, text);
      setText("");
    }
  };

  const renderMessage = ({ item: msg }) => (
    <View
      style={[
        styles.messageBubble,
        msg.senderId === auth.currentUser.uid ? styles.sent : styles.received,
      ]}
    >
      <Text style={styles.messageText}>{msg.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(msg) => msg.id}
          style={styles.messagesContainer} // Ensure it takes space
          showsVerticalScrollIndicator={false} // Optional: Hide scroll bar
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100vh", // Full viewport height
    width: "100vw", // Full viewport width
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa", // Light modern background
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#007bff",
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff5252",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1, // Ensure it takes up the remaining space
    paddingHorizontal: 10,
    paddingVertical: 10,
    // position: "relative",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#4caf50",
    color: "white",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    color: "black",
  },
  // messageText: {
  //   fontSize: 14,
  // },
  inputContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
