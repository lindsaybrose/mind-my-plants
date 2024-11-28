import AsyncStorage from "@react-native-async-storage/async-storage";
export const savedUser = (user_id) => {
  AsyncStorage.setItem("user_id", user_id).then(() => {
    console.log(user_id, "user id saved");
  });
};
export const getUserId = () => {
  return AsyncStorage.getItem("user_id")
    .then((user_id) => {
      console.log(user_id, "UI");
      return user_id;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const removeUserId = () => {
    return AsyncStorage.removeItem('user_id')
      .then(() => console.log('User ID removed!'))
      .catch((error) => console.log('Error removing user ID:', error));
  };