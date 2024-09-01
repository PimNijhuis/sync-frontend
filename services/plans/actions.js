import backend from "../config.js";

export const getPlansAPI = async () => {
	return backend
		.get(`/plans`)
		.then((response) => {
			return response?.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};
