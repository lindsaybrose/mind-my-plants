import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getCareGuides } from "../../api";
import { router } from "expo-router";

const CareGuides = () => {
  const [careGuideInfo, setCareGuideInfo] = useState([]);

  useEffect(() => {
    getCareGuides().then((data) => {
      setCareGuideInfo(data);
    });
  }, [careGuideInfo]);

  
  return (
    <SafeAreaView>
      <Text className="text-lg font-custom mt-5 mb-7">
        Check out our careguides for more information on keeping your plants
        happy
      </Text>
      <View className="grid grid-cols-3 gap-6">
        {careGuideInfo.map((careGuide) => {
          let careGuideImg = careGuide.img_url;
          let guide = careGuide.title;
          

          return (
            <Pressable
              onPress={() => {delayPush
                router.push(`/(tabs)/Careguides/${guide}`);
              }}
            >
              
              <View className="items-center col-span-3">
                <Text className="text-center text-lg font-custom mb-2 ">
                  {careGuide.title}
                </Text>
                <Image className='shadow-md' source={{ uri: careGuideImg }} style={styles.image} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default CareGuides;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    
  },
});
