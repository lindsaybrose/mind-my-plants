import { View, Text, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LoggedInUserContext } from "../../contexts/loggedInUser";
import JobCard from "./JobCard";
import { getJobsList, getOwnersJobs } from "../../api";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useRole } from "../../contexts/role";
import { router } from "expo-router";
import { SearchBar } from "react-native-elements";
import { all } from "axios";

const jobs = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [ownerJobs, setOwnerJobs] = useState([]);
  const { userType } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    getJobsList().then((response) => {
      setCurrentJobs(response);
      setAllJobs(response);
    });
  }, []);

  useEffect(() => {
    getOwnersJobs(loggedInUser.user_id).then((response) => {
      setOwnerJobs(response);
    });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setCurrentJobs(allJobs);
    } else {
      const jobsByLocation = currentJobs.filter((item) => {
        return item.city.includes(text);
      });
      setCurrentJobs(jobsByLocation);
    }
  };

  const clearSearch = () => {
    setCurrentJobs(allJobs);
  };

  return (
    <ScrollView className="flex items-center">
      {userType === "owner" ? (
        <>
          <View className="my-5">
            <Button
              onPress={() => {
                router.push("/jobs/addjobs");
              }}
              title="Add New Job"
              color="#6A994E"
              className=" mx-5 px-6 py-2  rounded-md  shadow-md font-bold font-custom justify-center items-center flex"
            >
              <Text>Add New Job</Text>
            </Button>
          </View>
          <View className="flex items-center">
            {ownerJobs.map((job) => {
              const userId = job.owner_id;
              const jobId = job.job_id;
              return (
                <Link href={`/jobs/sitters/${userId}/${jobId}`}>
                  <JobCard job={job} key={job.job_id} />
                </Link>
              );
            })}
          </View>
        </>
      ) : (
        <>
          <View className="mt-5 flex items-center">
            <Text className="font-custom text-xl">
              {loggedInUser?.username}, please find a list of jobs below
            </Text>
          </View>
          <TextInput
            className="font-custom border rounded-md mt-2 p-1"
            placeholder="Search city"
            value={searchQuery}
            onChangeText={handleSearch}
          ></TextInput>
          <Pressable
            className="p-2 my-4 mx-20 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 font-bold font-custom shadow-md"
            onPress={clearSearch}
          >
            <Text className="font-custom text-center text-gray-50 font-semibold">
              Clear Search
            </Text>
          </Pressable>

          <View className="flex items-center">
            {currentJobs.map((job) => {
              const userId = job.owner_id;
              const jobId = job.job_id;
              return (
                <Link href={`/jobs/${userId}/${jobId}`}>
                  <JobCard job={job} key={job.job_id} />
                </Link>
              );
            })}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default jobs;
