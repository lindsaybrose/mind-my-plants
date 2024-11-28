import { View, Text } from "react-native";
import React from "react";
import Chat from "../Chat";
import { ScrollView } from "react-native-gesture-handler";

const messages = () => {
  const chatId = "Z3gEJItcMzeEYziM5CBCjL2EyeO2_fgvWc8OV5vb8EJJybWzR1Snjrl93";
  return (
    <ScrollView>
      <Chat chatId={chatId} />
    </ScrollView>
  );
};

export default messages;
