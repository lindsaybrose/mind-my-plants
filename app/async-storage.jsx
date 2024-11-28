import AsyncStorage from "@react-native-async-storage/async-storage";
export const savedUser = (user_id) => {
  AsyncStorage.setItem("user_id", user_id).then(() => {});
};
export const getUserId = () => {
  return AsyncStorage.getItem("user_id")
    .then((user_id) => {
      return user_id;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const removeUserId = () => {
  return AsyncStorage.removeItem("user_id")
    .then(() => {})
    .catch((error) => console.log("Error removing user ID:", error));
};
