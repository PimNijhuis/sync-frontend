import backend from "../config.js";

export const getBoardMembersAPI = async (boardId) => {
	return backend
		.get(`/boards/${boardId}`)
		.then((response) => {
			return response.data?.board;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};
