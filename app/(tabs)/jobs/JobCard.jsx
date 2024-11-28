import React from "react";
import { View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const JobCard = ({ job }) => {
  const cardClassName =
    job.last_minute === "TRUE"
      ? "bg-[#BC4749] m-4 px-6 p-3 shadow-xl rounded-xl font-custom "
      : "bg-[#DFEBC2] font-custom m-4 px-6 p-3 shadow-xl rounded-xl";

  return (
    <SafeAreaView >
      <View className={cardClassName}>
          {job.last_minute === "TRUE" ? <Text className="text-lg font-semibold text-center">Last Minute Job</Text> : <Text></Text>}
          <Text className="text-lg text-black">
            <Entypo
              className="ml-1 pr-2"
              name="location-pin"
              size={24}
              color="black"
            />
            {job.city}
          </Text>
          <Text className="text-lg text-black">
            <Text className="text-lg text-black font-bold">
              <Foundation
                className="ml-2 pr-3"
                name="calendar"
                size={24}
                color="black"
              />
            </Text>
            {new Date(job.start_date).toLocaleDateString()} -{" "}
            {new Date(job.end_date).toLocaleDateString()}
          </Text>
          <Text className="text-lg text-black">
            <FontAwesome5
              className="ml-1 pr-2"
              name="money-bill-wave"
              size={18}
              color="black"
            />
            £{job.daily_rate}
          </Text>
          <Text className="text-lg text-black">
            <Entypo
              className="ml-1 pr-2"
              name="location-pin"
              size={24}
              color="black"
            />
            {`${job.job_length} day${job.job_length === 1 ? "" : "s"} `}
          </Text>
          <Text className="text-lg text-black">
            <MaterialCommunityIcons
              className="ml-1 pr-2"
              name="flower"
              size={24}
              color="black"
            />
            {`${job.number_of_plants} plant${
              job.number_of_plants === 1 ? "" : "s"
            } `}
          </Text>
      </View>
    </SafeAreaView>
  );
};


export default JobCard;
