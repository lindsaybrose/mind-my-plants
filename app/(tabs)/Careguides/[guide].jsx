import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { getCareGuides } from "@/app/api";

const guide = () => {
  const { guide } = useLocalSearchParams();
  const [careGuideInfo, setCareGuideInfo] = useState([]);
  let currentGuide;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCareGuides().then((data) => {
      if (data !== undefined) {
        const currentGuide = data.filter((careGuide) => {
          return careGuide.title == guide;
        });
        setCareGuideInfo(currentGuide);
      }
      setIsLoading(false);
    });
  }, [guide]);
  const finalGuide = careGuideInfo[0];
  console.log(finalGuide)

  if (!isLoading)
    return (
      <ScrollView className="mt-3 mx-3 font-custom">
        <Text className="mt-5 text-center font-bold text-2xl">{finalGuide.title}</Text>
        <Text className="p-5 rounded-lg shadow-md m-5">{finalGuide.body}</Text>
      </ScrollView>
    );
};

export default guide;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
