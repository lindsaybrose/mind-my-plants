import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getJobSitters } from "../../../../api";
import { useLocalSearchParams } from "expo-router";
import { Modal } from "react-native";
import Chat from "@/app/Chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { createChatIfNotExists } from "@/app/authentication";
import { auth } from "@/app/firebase";

const SitterCards = () => {
  const [sitterData, setSitterData] = useState([]);
  const { userId, jobId } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    getJobSitters(userId, jobId).then((response) => {
      setSitterData(response);
    });
  }, [jobId]);

  const handleAccept = (sitterId) => {
    // Optimistic rendering
    setSitterData((prev) =>
      prev.map(
        (item) =>
          item.sitter_id === sitterId ? { ...item, accepted: "TRUE" } : item
        //PATCH pending to JOBS table
      )
    );
  };

  const handleStartChat = async (otherUserEmail) => {
    try {
      console.log("HANDLE START CHATTTT");
      const currentUserId = auth.currentUser.uid;
      console.log(currentUserId, "USERID in SitterCards");
      const chatId = await createChatIfNotExists(currentUserId, otherUserEmail);
      console.log(currentUserId, "currUserID");
      console.log(chatId, "CHAT ID WOW");
      setChatId(chatId);
      setModalVisible(true);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const renderCard = ({ item }) => {
    const isAccepted = item.accepted === "TRUE";
    const isCompleted = isAccepted && item.status === 3;
    const hasAcceptedSitter = sitterData.some(
      (data) => data.accepted === "TRUE"
    );

    return (
      <View
        style={[
          styles.card,
          isAccepted ? styles.acceptedCard : styles.defaultCard,
        ]}
      >
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={20} color="gold" />
          <Text style={styles.starRating}>{item.star_rating}</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>{item.bio}</Text>
        </View>
        {isAccepted ? (
          <>
            <Pressable
               className="bg-[#6A994E] p-2 border-[#6A994E] rounded-md"
              onPress={() => {
                handleStartChat(item.email);
              }}
            >
              <Text className="text-center p-2 font-semibold text-white">Contact</Text>

            </Pressable>
            <Modal
              visible={modalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)} // Android back button support
            >
              <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Chat</Text>
                  <Pressable
                    style={styles.closeModalButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeModalButtonText}>Close</Text>
                  </Pressable>
                </View>

                {/* Chat Component */}

                <Chat chatId={chatId} />
              </SafeAreaView>
            </Modal>

            {/* && !item.feedback */}
            {isCompleted && (
              <Pressable
                style={styles.reviewButton}
                onPress={() => console.log("Navigate", "Go to the review page")}
              >
                <Text style={styles.buttonText}>
                  {item.feedback ? "Review Feedback" : "Leave a Review"}
                </Text>
              </Pressable>
            )}
          </>
        ) : (
          <Pressable
            className="bg-[#D77F33] p-2 border-[#D77F33 rounded-md"
            style={[hasAcceptedSitter ? styles.disabledButton : null]}

            disabled={hasAcceptedSitter}
            onPress={() => handleAccept(item.sitter_id)}
          >
            <Text style={styles.buttonText}>
              {hasAcceptedSitter ? "Disabled" : "Accept"}
            </Text>
          </Pressable>
        )}
      </View>
    );
  };

  const hasAccepted = sitterData.some((item) => item.accepted === "TRUE");

  return (
    <View style={styles.container}>
      <FlatList
        data={sitterData}
        renderItem={renderCard}
        keyExtractor={(item) => item.request_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  acceptedCard: {
    borderColor: "green",
  },
  defaultCard: {
    borderColor: "#ccc",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  starRating: {
    fontSize: 16,
    marginLeft: 5,
  },
  bioContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f7f7f7",
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: "#333",
  },
  acceptButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  contactButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  reviewButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    borderColor: "#aaa",
    opacity: 0.6,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#007bff",
  },
  modalTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  closeModalButton: {
    backgroundColor: "#ff5252",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SitterCards;
