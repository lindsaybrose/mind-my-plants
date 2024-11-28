import { View, Text, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { getUserList } from "../api";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { Redirect, router } from "expo-router";
import { Link } from "expo-router";
import aloePlantImg from "../../assets/images/MMPimg.png";
import { Image } from "react-native";
import { savedUser } from "../async-storage";
import { login } from "../authentication";

const signin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const aloePlant = aloePlantImg;

  const userAuthentication = () => {
    setErrorMsg("");
    getUserList().then((users) => {
      const currentUser = users.filter((eachUser) => {
        return eachUser.username === user && eachUser.password === password;
      });
      
      if (currentUser.length > 0) {
        const email = currentUser[0].email;
        handleLoginFirebase(email, password);
        setLoggedInUser(currentUser[0]);
        savedUser(currentUser[0].user_id);
        router.replace("/")
      } else setErrorMsg("Sorry, your sign-in details are incorrect");
    });
  };

  const handleLoginFirebase = async (email, password) => {
    try {
      await login(email, password);
      console.log("Success", "You are now logged in!");
    } catch (error) {
      console.log("Error", "Invalid credentials. Please try again.");
    }
  };
  console.log(loggedInUser, "loggedinuser");
  // if (!loggedInUser == {}) return <Redirect href="/" />;

  return (
    <SafeAreaView className="items-center">
      <Image source={aloePlant} style={styles.background} />
      {/* <View className="mt-1">
        <SignIn />
      </View> */}
      <View className="mt-2 px-16 flex">
        <TextInput
          className="border rounded-md p-1 mb-4 text-lg font-custom"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <TextInput
          className="border rounded-md p-1 text-lg font-custom"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          secureTextEntry={true}
        />
      </View>
      <View className="flex-row justify-center mt-4 ">
        <Pressable
          className="mx-5 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E]  shadow-md"
          disabled={!user || !password}
          onClick={userAuthentication}
        >
          <Text className="text-gray-50 font-bold font-custom">Sign In</Text>
        </Pressable>
        <Link href="/Authentication/registration" asChild>
          <Pressable className="mx-5 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E] shadow-md">
            <Text className="text-gray-50 font-bold font-custom">Sign Up</Text>
          </Pressable>
        </Link>
      </View>
      <Text className="text-center mt-1 text-lg">{errorMsg}</Text>
    </SafeAreaView>
  );
};

export default signin;

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "black",
  },
  pressable: {
    position: "absolute",
    top: 50,
    left: 50,
    width: 100,
    height: 100,
  },
  text: {
    fontFamily: "DM Sans",
  },
  background: {
    flex: 1,
    height: 300,
    marginTop: 50,
    marginBottom: 40,
    width: 300,
    borderRadius: 130,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
