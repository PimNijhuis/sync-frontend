import backend from "../config.js";

export const signInAPI = async (userName) => {
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

export const getAllUsersAPI = async () => {
	return backend
		.get("/users")
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};

export const createUserAPI = async (userName) => {
	let requestData = {
		name: userName,
	};

	return backend
		.post("/users", requestData)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};

export const deleteAllUsersAPI = async () => {
	return backend
		.delete("/users/deleteAllUsers")
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};

export const deleteUserAPI = async (userId) => {
	return backend
		.delete(`/users/${userId}`)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};

export const getUserBoardsAPI = async (userId) => {
	return backend
		.get(`/users/${userId}/boards`)
		.then((response) => {
			return response.data?.boards;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};
