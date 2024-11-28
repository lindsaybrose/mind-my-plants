import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useContext } from "react";
import { LoggedInUserContext } from "../../contexts/loggedInUser";
import { postUserJobs } from "@/app/api";
import { router } from "expo-router";
import { getUserId } from "@/app/async-storage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
registerLocale("en-GB", enGB);
import { format } from "date-fns";

const addjobs = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dailyRate, setDailyRate] = useState(0);
  const [jobDescription, setJobDescription] = useState("(500 characters)");
  const [message, setMessage] = useState("");
  let savedUserId;

  useEffect(() => {
    getUserId("user_id").then((id) => {
      savedUserId = id;
    });
  }, []);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const theUser = loggedInUser ? loggedInUser.user_id : savedUserId;
  const handleJobSubmit = () => {
    if (startDate && endDate && dailyRate && jobDescription) {
      postUserJobs(theUser, {
        start_date: format(startDate, "dd/MM/yyyy"),
        end_date: format(endDate, "dd/MM/yyyy"),
        daily_rate: dailyRate,
        job_instructions: jobDescription,
      })
        .then((response) => {
          setMessage("Job posted successfully");
          return delay(2000);
        })
        .then(() => {
          setStartDate(Date());
          setEndDate(new Date());
          setMessage("");
          setDailyRate(0);
          setJobDescription("(500 characters)");
          router.push("/jobs");
        });
    } else {
      setMessage("Please complete all fields");
    }
  };

  return (
    <SafeAreaView>
      {theUser && (
        <View className="mx-16">
          <Text className=" font-custom text-2xl mt-5 mb-5">
            Please fill out the form below to add a job to the site:{" "}
          </Text>
          <Text className="font-custom mb-1 text-base">Start Date</Text>

          <DatePicker
            className="rounded-md pl-1"
            isClearable="true"
            selected={startDate}
            minDate={Date()}
            locale="en-GB"
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              setStartDate(date);
            }}
          />
          <Text className="font-custom mb-1 text-base">End Date</Text>
          <DatePicker
            className="rounded-md pl-1"
            selected={endDate}
            locale="en-GB"
            minDate={Date()}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setEndDate(date)}
          />
          <Text className="font-custom mb-1 text-base">Daily Rate (£)</Text>
          <TextInput
            onChange={(e) => setDailyRate(e.target.value)}
            className="font-custom pl-1 bg-white rounded py-1 mb-4"
            type="number"
            value={dailyRate}
            clearTextOnFocus="true"
            name="daily_rate"
          />
          <Text className="font-custom mb-1 text-base">Job Description</Text>
          <TextInput
            onChange={(e) => setJobDescription(e.target.value)}
            className=" bg-white rounded mb-4 py-8"
            type="text"
            value={jobDescription}
            clearTextOnFocus="true"
            name="job_description"
            maxLength={500}
            aria-required="true"
          />

          <Pressable
            className="mx-5 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E] items-center shadow-md"
            onPress={handleJobSubmit}
          >
            <Text className=" text-gray-50 font-bold font-custom ">
              Add Job
            </Text>
          </Pressable>
          <Text>{message}</Text>
        </View>
      )}
      {/* {!isValid && <Text>{isValidMsg}</Text>} */}
      {/* <Text>{isPosting}</Text>
      <Text>{isErrorMsg}</Text> */}
      {!theUser && (
        <View>
          <Text>Welcome to Mind My Plants, {loggedInUser?.first_name}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
export default addjobs;
