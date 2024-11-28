import { Slot, Stack } from "expo-router";
import { LoggedInUserProvider } from "@/app/contexts/loggedInUser";

export const JobsLayout = () => {
  return (
    <LoggedInUserProvider>
      {/* <Stack screenOptions={(headerTintColor = "blue")}>
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack> */}
      <Slot />
    </LoggedInUserProvider>
  );
};
