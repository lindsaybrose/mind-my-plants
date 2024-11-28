import React, { useState, useContext } from "react";
import { LoggedInUserContext } from "./contexts/loggedInUser";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";

const AddPlantModal = ({ visible, onClose, plants, onAddPlants }) => {
  // selectedPlants are those in the 'basket' on this page, to be added to the owners list
  const [selectedPlants, setSelectedPlants] = useState({});
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const handleIncrease = (plantId) => {
    setSelectedPlants((prev) => ({
      ...prev,
      [plantId]: (prev[plantId] || 0) + 1,
    }));
  };

  const handleDecrease = (plantId) => {
    setSelectedPlants((prev) => {
      const newQuantity = (prev[plantId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [plantId]: removedQuantity, ...rest } = prev;
        return rest;
      }
      return { ...prev, [plantId]: newQuantity };
    });
  };

  const handleAddPlants = () => {
    const selectedPlantList = plants.filter(
      (plant) => selectedPlants[plant.plant_id]
    );
    selectedPlantList.forEach((item) => {
      item.quantity = selectedPlants[item.plant_id];
      item.user_id = loggedInUser.user_id;
    });
    onAddPlants(selectedPlantList);
    onClose();
    setSelectedPlants({});
  };

  const handleCloseAddPlants = () => {
    onClose();
    setSelectedPlants({});
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <FlatList
          data={plants}
          keyExtractor={(item) => item.plant_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <View style={styles.cardInfo}>
                <Text style={styles.commonName}>{item.common_name}</Text>
                <Text style={styles.scientificName}>
                  {item.scientific_name}
                </Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDecrease(item.plant_id)}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {selectedPlants[item.plant_id] || 0}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleIncrease(item.plant_id)}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          styles={styles.button}
          title="Add Plants"
          onPress={handleAddPlants}
        >
          Add Plants
        </TouchableOpacity>
        <TouchableOpacity
          styles={styles.button}
          title="Close"
          onPress={handleCloseAddPlants}
        >
          Close
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  commonName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scientificName: {
    fontSize: 14,
    color: "#666",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default AddPlantModal;
