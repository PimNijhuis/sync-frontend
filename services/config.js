import axios from "axios";

export default axios.create({
	baseURL: "https://sync-webserver-5f719289777b.herokuapp.com/api",
	headers: {
		"x-api-key": "blabla",
	},
});
