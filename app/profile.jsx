import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LoggedInUserContext } from "./contexts/loggedInUser";
import {
  updateProfile,
  getOwnerPlants,
  getPlantsSummary,
  postNewOwnerPlants,
  patchPutOwnerPlantsQuantity,
} from "./api";
import PlantCard from "./PlantCard";
import AddPlantModal from "./AddPlantModal";
import SitterProfile from "./SitterProfile";
import { useRole } from "./contexts/role";

const Profile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const savedUserId = localStorage.getItem("user_id");
  const [sucessMsg, setSucessMsg] = useState("");
  const [currentOwnerPlants, setCurrentOwnerPlants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [allPlantsList, setAllPlantsList] = useState([]);
  const { userType, setUserType } = useRole();
  const [reloadPage, setReloadPage] = useState(0);
  const [passwordIsVis, setPasswordIsVis] = useState(true);
  const [passwordButton, setPasswordButton] = useState("show");
  const [profileDetails, setProfileDetails] = useState({
    first_name: loggedInUser.first_name,
    last_name: loggedInUser.last_name,
    email: loggedInUser.email,
    avatar_url: loggedInUser.avatar_url || "",
    password: loggedInUser.password,
    street_address: loggedInUser.street_address || "",
    postcode: loggedInUser.postcode || "",
    city: loggedInUser.city || "",
  });

  //trying to get avatar pic on profile
  avatarImg = loggedInUser.avatar_url;

  useEffect(() => {
    getOwnerPlants(savedUserId)
      .then((plants) => {
        setCurrentOwnerPlants(plants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reloadPage]);

  useEffect(() => {
    getPlantsSummary()
      .then((plants) => {
        setAllPlantsList(plants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePasswordVis = () => {
    if (passwordIsVis === false) {
      setPasswordIsVis(true);
      setPasswordButton("show");
    } else {
      setPasswordIsVis(false);
      setPasswordButton("hide");
    }
  };

  const postPlantFunc = (newPlantsArr) => {
    newPlantsArr.forEach((plant) => {
      postNewOwnerPlants(plant, loggedInUser.user_id).catch((error) => {
        console.log(error, "Error");
      });
    });
  };

  const onChange = (name, value) => {
    setProfileDetails({
      ...profileDetails,
      [name]: value,
    });
  };

  const handleProfileUpdate = () => {
    updateProfile(profileDetails, loggedInUser.user_id)
      .then((updatedUser) => {
        setSucessMsg("Profile Details Update Successful!");
        setProfileDetails(updatedUser);
        setLoggedInUser(updatedUser);
        setTimeout(() => {
          setSucessMsg("");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePlantUpdate = (plantToUpdate) => {
    patchPutOwnerPlantsQuantity(plantToUpdate, loggedInUser.user_id).catch(
      (error) => {
        console.log(error);
      }
    );
  };

  const handleAddPlants = (selectedPlants) => {
    setCurrentOwnerPlants((prev) => {
      const updatedCurrent = [...prev];
      selectedPlants.forEach((selectedPlant) => {
        const existingPlant = updatedCurrent.find(
          (plant) => plant.plant_id === selectedPlant.plant_id
        );

        if (existingPlant) {
          existingPlant.quantity =
            existingPlant.quantity + selectedPlant.quantity;
          handlePlantUpdate(existingPlant);
        } else {
          updatedCurrent.push({
            ...selectedPlant,
            quantity: selectedPlant.quantity,
          });
          postPlantFunc(selectedPlants);
        }
      });

      return updatedCurrent;
    });
  };

  const inputClassName =
    "border rounded-md p-2 text-base font-custom bg-white shadow-sm";

  return (
    <ScrollView className="flex-1 bg-white">
      <Pressable
        className={`mt-5 mb-5 p-2 rounded-md self-center ${
          userType === "owner" ? "bg-[#6A994E]" : "bg-[#D77F33]"
        }`}
        onPress={() =>
          userType === "owner" ? setUserType("sitter") : setUserType("owner")
        }
      >
        <Text className="text-lg font-bold text-white">
          {userType === "owner"
            ? "Switch to Sitter View"
            : "Switch to Owner View"}
        </Text>
      </Pressable>
      <Text className="text-2xl font-bold text-center">
        {loggedInUser.username}'s Profile Page
      </Text>
      <Text className="text-1xl font-bold text-center">
        Update Profile Information
      </Text>
      <View className="font-custom mx-5">
        <Text className="my-2">First Name:</Text>
        <TextInput
          className={inputClassName}
          type="text"
          onChangeText={(text) => onChange("first_name", text)}
          placeholder="Enter First Name"
          name="first_name"
          value={profileDetails.first_name}
        />
      </View>
      <View className="font-custom mx-5">
        <Text className="my-2">Last Name:</Text>
        <TextInput
          className={inputClassName}
          type="text"
          onChangeText={(text) => onChange("last_name", text)}
          placeholder="Enter Last Name"
          name="last_name"
          value={profileDetails.last_name}
        />
      </View>

      <View className="font-custom mx-5">
        <Text className="my-2">Email:</Text>
        <TextInput
          className={inputClassName}
          type="email"
          onChangeText={(text) => onChange("email", text)}
          placeholder="Enter Email"
          name="email"
          value={profileDetails.email}
        />
      </View>
      <View className="font-custom mx-5">
        <Text className="my-2">Avatar URL:</Text>
        <TextInput
          className={inputClassName}
          type="text"
          onChangeText={(text) => onChange("avatar_url", text)}
          placeholder="Enter Avatar URL"
          name="avatar_url"
          value={profileDetails.avatar_url}
        />
      </View>

      <View className="font-custom mx-5">
        <Text className="my-2">Password:</Text>
        <TextInput
          className={inputClassName}
          type="password"
          onChangeText={(text) => onChange("password", text)}
          placeholder="Enter Password"
          name="password"
          value={profileDetails.password}
          secureTextEntry={passwordIsVis}
        />
        <Pressable onPress={handlePasswordVis}>
          <Text>{passwordButton}</Text>
        </Pressable>
      </View>

      <View className="font-custom mx-5">
        <Text className="my-2">Street Address:</Text>
        <TextInput
          className={inputClassName}
          type="text"
          onChangeText={(text) => onChange("street_address", text)}
          placeholder="Enter Street Address"
          name="street_address"
          value={profileDetails.street_address}
        />
      </View>
      <View className="font-custom mx-5">
        <Text className="my-2">Postcode:</Text>
        <TextInput
          className={inputClassName}
          type="text"
          onChangeText={(text) => onChange("postcode", text)}
          placeholder="Enter Postcode"
          name="postcode"
          value={profileDetails.postcode}
        />
      </View>

      <View className="font-custom mx-5">
        <Text className="my-2">City:</Text>
        <TextInput
          className={inputClassName}
          type="text"
          onChangeText={(text) => onChange("city", text)}
          placeholder="Enter City"
          name="city"
          value={profileDetails.city}
        />
      </View>
      <Pressable
        className="mx-20 my-3 py-2 border-b-4 border-[#6A994E] rounded-md bg-[#6A994E] shadow-md"
        onPress={handleProfileUpdate}
      >
       <Text className="text-gray-50 font-bold font-custom text-center text-xl"> Update</Text>
      </Pressable>
      <Text>{sucessMsg}</Text>

      {userType === "owner" ? (
        <>
          <View className="flex-1 bg-white">
            <TouchableOpacity
              className="mx-20 my-3 py-2 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 font-bold font-custom shadow-md text-center"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white text-lg font-bold text-center">
                Add New Plants
              </Text>
            </TouchableOpacity>
            <AddPlantModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              plants={allPlantsList}
              onAddPlants={handleAddPlants}
              postPlantFunc={postPlantFunc}
            />
          </View>
          {currentOwnerPlants.map((plant) => {
            return (
              <PlantCard
                plant={plant}
                key={plant.plant_id}
                user_id={loggedInUser.user_id}
                setReloadPage={setReloadPage}
                reloadPage={reloadPage}
              />
            );
          })}
        </>
      ) : (
        <SitterProfile profileDetails={profileDetails} />
      )}
    </ScrollView>
  );
};

export default Profile;

