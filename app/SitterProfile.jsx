import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { LoggedInUserContext } from "./contexts/loggedInUser";
import { getSitterJobs, updateProfileBio } from "./api";

const SitterProfile = ({ profileDetails }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [description, setDescription] = useState(
    loggedInUser.bio || "Tell plant owners about yourself..."
  );

  const [successMsg, setSuccessMsg] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    getSitterJobs(loggedInUser.user_id)
      .then((fetchedJobs) => {
        let total = 0;
        let jobNum = 0;
        const totalRatingNum = fetchedJobs.map((job) => {
          total = total + job.star_rating;
          if (job.star_rating !== null) {
            jobNum += 1;
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [loggedInUser.user_id]);

  const handleDescriptionUpdate = () => {
    updateProfileBio(description, loggedInUser.user_id, profileDetails).then(
      (newBio) => {
        setDescription(newBio);
        setSuccessMsg("Description updated successfully!");
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      }
    );
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className=" pb-3 text-2xl font-bold text-center">
        Sitter Profile <br /> Average Rating:{" "}
        {averageRating || "No ratings given"}
      </Text>
      <View className="mb-4">
        <Text className="text-lg pb-2">Your Description:</Text>
        <TextInput
          className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-lg text-left h-24"
          multiline={true}
          placeholder="Tell others about yourself..."
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <Pressable
        className="p-3 bg-[#6A994E] border-[#6A994E] rounded-md shadow-md"
        onPress={handleDescriptionUpdate}
      >
        <Text className="text-lg font-bold text-center text-white">Update Description</Text>
      </Pressable>
      {successMsg ? (
        <Text className="text-lg text-center mt-2">{successMsg}</Text>
      ) : null}
    </ScrollView>
  );
};

export default SitterProfile;
