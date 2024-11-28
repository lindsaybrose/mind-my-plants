import { Slot, Stack } from "expo-router";
import { LoggedInUserProvider } from "@/app/contexts/loggedInUser";
import NewHeader from "../Header";

export const SigninLayout = () => {
  {
    console.log("header shown");
  }
  return (
    <LoggedInUserProvider>
      <Stack
        screenOptions={{
          tabBarStyle: { display: "none" },
          headertitle: "",
        }}
      >
        <Stack.Screen name="signin" options={{ headerTitle: "" }} />
      </Stack>
    </LoggedInUserProvider>
  );
};
