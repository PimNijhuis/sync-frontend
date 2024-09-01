import backend from "../config.js";

export const signInAPI = async (username, password) => {
	let requestData = {
		username: username,
		password: password,
	};

	return backend
		.post("/user/sign-in", requestData)
		.then((res) => {
			let authorization_token =
				res.data.token_type + " " + res.data.access_token;
			// TODO set authorization_token in redux store?
			backend.defaults.headers.common["Authorization"] = authorization_token;
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};

export const getAllUsersAPI = async () => {
	return backend
		.get("/user")
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
