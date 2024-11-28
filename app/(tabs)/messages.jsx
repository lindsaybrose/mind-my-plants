import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const Messages = () => {
  const conversations = [
    {
      username: "Lindsay",
      avatar_url:
        "https://helloartsy.com/wp-content/uploads/kids/cats/how-to-draw-a-small-cat/how-to-draw-a-small-cat-step-6.jpg",
      last_message: "Hi, I set the alarm when I left the house",
      message_date: "2024-11-28T00:00:00Z",
    },
    {
      username: "Benjamin",
      avatar_url: "https://shorturl.at/QEcvg",
      last_message: "Please don’t forget to water the plants in the terrace",
      message_date: "2024-11-26T00:00:00Z",
    },
    {
      username: "David",
      avatar_url: "https://shorturl.at/Drp9T",
      last_message: "Thanks for everything",
      message_date: "2024-11-25T00:00:00Z",
    },
    {
      username: "Lewis",
      avatar_url: "https://shorturl.at/7WCOw",
      last_message: "The cat has been attacking the plants, what should I do?",
      message_date: "2024-11-25T00:00:00Z",
    },
    {
      username: "Gemma",
      avatar_url:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid",
      last_message: "I look forward to sitting your plants again",
      message_date: "2024-11-25T00:00:00Z",
    },
  ];

  // Render a single conversation item
  const renderConversation = ({ item }) => {
    const messageDate = new Date(item.message_date).toLocaleDateString();

    return (
      <View style={styles.conversationContainer}>
        {/* Avatar */}
        <Image
          source={{ uri: item.avatar_url }}
          style={styles.avatar}
          onError={(e) =>
            console.log(`Failed to load image: ${e.nativeEvent.error}`)
          }
        />

        {/* Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.lastMessage}>{item.last_message}</Text>
          <Text style={styles.messageDate}>{messageDate}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={conversations}
      renderItem={renderConversation}
      keyExtractor={(item, index) => index.toString()} // Use index as a fallback key
      contentContainerStyle={{ paddingBottom: 20 }}
      style={styles.container}
    />
  );
};

export default Messages;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  conversationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  messageDate: {
    fontSize: 12,
    color: "#999",
  },
});
