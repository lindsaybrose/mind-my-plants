import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { getSitterJobs } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";

const myjobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobFilter, setJobFilter] = useState(1);
  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    getSitterJobs(loggedInUser.user_id)
      .then((fetchedJobs) => {
        const filteredJobs = fetchedJobs.filter((job) => {
          return job.status === jobFilter;
        });
        setJobs(filteredJobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [loggedInUser.user_id, jobFilter]);

  const buttonStyle = (isSelected) =>
    `px-4 py-2 m-2 text-center rounded-lg ${
      isSelected ? "bg-[#D77F33] text-black" : "bg-[#DFEBC2] text-white"
    }`;

  return (
    <SafeAreaView>
      <View className="mb-4 pt-4">
        <Text className="text-2xl font-custom font-bold text-center">My Jobs</Text>
      </View>
      <View className="flex flex-row justify-around mb-4 ">
        <Pressable
          className={buttonStyle(jobFilter === 1)}
          onPress={() => setJobFilter(1)}
        >
          <Text className="font-custom text-md px-2">Upcoming</Text>
        </Pressable>
        <Pressable
          className={buttonStyle(jobFilter === 2)}
          onPress={() => setJobFilter(2)}
        >
          <Text className="font-custom text-md px-6">Current</Text>
        </Pressable>
        <Pressable
          className={buttonStyle(jobFilter === 3)}
          onPress={() => setJobFilter(3)}
        >
          <Text className="font-custom text-md px-7">Past</Text>
        </Pressable>
      </View>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <View
            key={job.job_id}
            className="bg-[#DFEBC2] font-custom m-4 mr-14 ml-14 px-6 p-3 shadow-xl rounded-xl"
          >
            <Text className="text-lg font-bold text-black">
              Owner: {job.owner_first_name}
            </Text>
            <Text className="text-base text-black">
              Start: {new Date(job.start_date).toLocaleDateString()}
            </Text>
            <Text className="text-base text-black">
              End: {new Date(job.end_date).toLocaleDateString()}
            </Text>
            {job.status === 2 && (
              <Text className="text-base text-black">
                Street Address: {job.street_address}
              </Text>
            )}
            <Text className="text-base text-black">
              Daily Rate: £{job.daily_rate}
            </Text>
            <Text className="text-base text-black">
              Rating: {job.star_rating || "No Rating"}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-center text-base text-black">
          No jobs found for your profile.
        </Text>
      )}
    </SafeAreaView>
  );
};

export default myjobs;
