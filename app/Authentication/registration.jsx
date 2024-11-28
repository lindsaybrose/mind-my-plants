import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { registerUser } from "../api";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { Link } from "expo-router";
import { savedUser } from "../async-storage";
import { router } from "expo-router";

const registration = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });
  const [isPosting, setIsPosting] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isValidMsg, setIsValidMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState("");

  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const onChange = (e) => {
    setRegistrationDetails({
      ...registrationDetails,
      [e.target.placeholder]: e.target.value,
    });
    if (
      registrationDetails.username.length > 0 &&
      registrationDetails.password.length > 0 &&
      registrationDetails.email.length > 0 &&
      registrationDetails.first_name.length > 0 &&
      registrationDetails.last_name.length > 0
    ) {
      setIsValid(true);
    }
  };

  const handleRegistrationSubmit = () => {
    if (
      registrationDetails.username.length > 0 &&
      registrationDetails.password.length > 0 &&
      registrationDetails.email.length > 0 &&
      registrationDetails.first_name.length > 0 &&
      registrationDetails.last_name.length > 0
    ) {
      setIsErrorMsg("");
      setIsPosting("Registering...");
      registerUser(registrationDetails)
        .then((newUser) => {
          setLoggedInUser(newUser);
          console.log('registration', newUser)
          savedUser(newUser.user_id);
          setIsPosting("");
          setIsValidMsg("");
          return newUser;
        }).then(() => {router.push('/Authentication/signin')})
        .catch((statusCode) => {
          if (statusCode === 409) {
            setIsErrorMsg("Username or Email already exists");
            setIsPosting("");
          } else {
            setIsErrorMsg(
              "Error: Unable to create account. Please try again later."
            );
            setIsPosting("");
          }
        });
    } else {
      setIsValid(false);
      setIsValidMsg("Please fill out all fields to register!");
      setIsErrorMsg("");
      setIsPosting("");
    }
  };

  return (
    <SafeAreaView >
      {!loggedInUser && (
        <View className="font-custom px-14"  >
          <>
            <Text className="text-xl p-7 text-center">Registration</Text>
            <TextInput
              className="border rounded-md pl-2 text-lg font-custom mb-2"
              type="text"
              onChange={onChange}
              placeholder="first_name"
              name="first_name"
              value={registrationDetails.first_name}
            />
            <TextInput
              className="border rounded-md pl-2 text-lg font-custom mb-2"
              type="text"
              onChange={onChange}
              placeholder="last_name"
              name="last_name"
              value={registrationDetails.last_name}
            />
            <TextInput
              className="border rounded-md pl-2 text-lg font-custom mb-2"
              type="email"
              onChange={onChange}
              placeholder="email"
              name="email"
            />
            <TextInput
              className="border rounded-md pl-2 text-lg font-custom mb-2"
              type="text"
              onChange={onChange}
              placeholder="username"
              name="username"
              value={registrationDetails.username}
              aria-required="true"
            />
            <TextInput
              className="border rounded-md pl-2 text-lg font-custom mb-2"
              type="text"
              onChange={onChange}
              placeholder="password"
              name="password"
              value={registrationDetails.password}
              aria-required="true"
            />
            <Pressable 
            className="mx-16 mt-3 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 font-bold font-custom shadow-md"
            onPress={handleRegistrationSubmit}>
              <Text  className="font-custom text-lg font-bold text-white text-center">Register</Text>
            </Pressable>
          </>
        </View>
      )}

      {!isValid && <Text className="text-xl p-7 text-center">{isValidMsg}</Text>}
      <Text className="text-xl p-7 text-center">{isPosting}</Text>
      <Text className="text-xl p-7 text-center">{isErrorMsg}</Text>
    </SafeAreaView>
  );
};

export default registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#88CC7F",
  },
  inputcontainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    fontSize: 18,
  },
});
