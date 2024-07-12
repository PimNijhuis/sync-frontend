import backend from "../config.js";

export const signIn_API = async (userName) => {
  let requestData = {
    name: userName,
  };

  return backend
    .post("/users/signin", requestData)
    .then((response) => {
      return response.data?.boards;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
