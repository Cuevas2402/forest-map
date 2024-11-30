import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/slices/userSlice";

const useClient = () => {
	const token = useSelector(selectToken);
	const client = axios.create({
		baseURL: "http://localhost:8080/api",
		headers: {
		'Accept': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		'Authorization': token ? `Bearer ${token}` : ''
		},
		withCredentials: true,
	});

	return client;
};

export default useClient;
