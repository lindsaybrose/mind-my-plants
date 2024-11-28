import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Pressable, TextInput } from "react-native-gesture-handler";
import {
  deletePlant,
  patchPutOwnerPlants,
  patchPutOwnerPlantsQuantity,
} from "./api";

const PlantCard = ({ plant, user_id, setReloadPage, reloadPage }) => {
  const [careInstructions, setCareInstructions] = useState(plant.instructions);
  const [instructionUpdateMsg, setInstructionUpdateMsg] = useState("");
  const hasChanges = careInstructions !== plant.instructions;

  const handleSave = () => {
    patchPutOwnerPlants(plant, user_id, careInstructions).then((response) => {
      setInstructionUpdateMsg("Instructions updated!");
      setTimeout(() => {
        setInstructionUpdateMsg("");
      }, 3000);
    });
  };

  const [removePlantCount, setRemovePlantCount] = useState(0);

  function decreaseQuantity() {
    let quantityVal = plant.quantity - removePlantCount;
    const newPlant = { plant_id: plant.plant_id, quantity: quantityVal };
    patchPutOwnerPlantsQuantity(newPlant, user_id);
    plant.quantity = quantityVal;
    setRemovePlantCount(0);
  }

  const removeDecrease = () => {
    let newRemovePlantCount = removePlantCount - 1;
    if (newRemovePlantCount < 0) {
    } else {
      setRemovePlantCount(newRemovePlantCount);
    }
  };
  const removeIncrease = () => {
    if (removePlantCount + 2 <= plant.quantity) {
      let newRemovePlantCount = removePlantCount + 1;
      setRemovePlantCount(newRemovePlantCount);
    }
  };

  const handleDelete = () => {
    deletePlant(user_id, plant.plant_id).then(() => {
      setReloadPage(reloadPage + 1);
    });
  };

  return (
    <View className="flex-row bg-gray-100 my-2 mx-4 p-4 rounded-lg shadow-md overflow-visible">
      <Image
        source={{ uri: plant.image_url }}
        className="w-24 h-24 object-cover"
      />
      <View className="flex-1 p-2 justify-center">
        <Text className="text-xl font-bold text-gray-800">
          {plant.common_name}
        </Text>
        {instructionUpdateMsg}
        <TextInput
          className="text-sm text-gray-800 mb-5 my-2 p-4 border border-gray-300 rounded-lg bg-gray-100"
          onChangeText={setCareInstructions}
          placeholder="Add care instructions here"
          name="care_instructions"
          value={careInstructions}
          multiline={true}
          numberOfLines={3}
        />
        <Text className="text-sm text-gray-800">
          Quantity: {plant.quantity}
        </Text>
        {plant.quantity > 1 && (
          <>
            <TouchableOpacity
              className="p-2 mt-2 bg-[#D77F33] border-[#D77F33] rounded-md mb-2"
              onPress={decreaseQuantity}
            >
              <Text className="font-lg text-white font-semibold text-center">
                Remove
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                className="p-2 bg-[#D77F33] border-[#D77F33 rounded-md mr-2"
                onPress={removeDecrease}
              >
                <Text className="font-bold text-lg text-white">-</Text>
              </TouchableOpacity>
              <Text className="text-lg">{removePlantCount}</Text>
              <TouchableOpacity
                className="p-2 bg-[#D77F33] border-[#D77F33 rounded-md ml-2"
                onPress={removeIncrease}
              >
                <Text className="font-bold text-white text-lg">+</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {plant.quantity === 1 && (
          <TouchableOpacity
            className="absolute -bottom-0 -left-24 bg-[#6A994E] p-2 rounded-lg shadow-lg"
            onPress={handleDelete}
          >
            <Text className="text-white font-bold text-sm">Delete</Text>
          </TouchableOpacity>
        )}
      </View>
      {hasChanges && (
        <TouchableOpacity
          className="absolute bottom-4 right-4 bg-[#6A994E] p-2 rounded-lg shadow-lg"
          onPress={handleSave}
        >
          <Text className="text-white font-bold text-sm">Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlantCard;
