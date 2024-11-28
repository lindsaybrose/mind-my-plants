import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { useContext } from "react";
import { getUserList } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getUserId } from "../async-storage";
import { removeUserId } from "../async-storage";
import { Redirect } from "expo-router";
import CareGuides from "./Careguides";
import { logoutUser } from "../authentication";

const index = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const [localUser, setLocalUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleSignOut = () => {
    handleLogout();
    setLoggedInUser({});
    router.replace("/Authentication/signin");
    removeUserId().then(() => {
      console.log("removed ID in index");
    });
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Logged Out", "You have successfully logged out.");
    } catch (error) {
      console.log("Error", "Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    getUserId().then((user_id) => {
      setLocalUser(user_id);
    });
  }, []);

  useEffect(() => {
    getUserList().then((users) => {
      if (localUser !== undefined) {
        const currentUser = users.filter((eachUser) => {
          return eachUser.user_id == localUser;
        });
      }
      setIsLoading(false);
    });
  }, []);


  if (isLoading) return <Text className="m-5 font-custom">Loading...</Text>;
  let avatarImg;
  if (loggedInUser) {
    avatarImg = loggedInUser.avatar_url;
  }

  return (
    <SafeAreaView>
      <View className="mt-5">
        {loggedInUser ? (
          <>
            <Text className="mt-3 ml-12 mb-4 text-xl font-custom">
              Welcome back, {loggedInUser.username}!
            </Text>
            <Pressable
              className="mt-3 ml-64 text-center justify-center h-10 w-32 border-[#D77F33] rounded-md bg-[#D77F33] text-gray-50 font-bold font-custom shadow-md"
              onPress={handleSignOut}
              title="Sign Out"
            >
              Sign Out
            </Pressable>
            <View className="items-center">
              <Link href="../profile" asChild>
                <Pressable>
                  <Image
                    className="-ml-32 shadow-md"
                    source={{ uri: avatarImg }}
                    style={styles.avatar}
                  />
                </Pressable>
              </Link>
              <View className=" mt-5 w-80">
                <CareGuides />
              </View>
            </View>
          </>
        ) : (
          <Redirect href="/Authentication/signin" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "black",
  },
  pressable: {
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
    width: 300,
    borderRadius: 130,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
