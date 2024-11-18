import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/slices/userSlice";


const useClient = () => {

	const token = useSelector(selectToken);

	const client = axios.create({
		baseURL: "http://localhost:8080/api",
		headers : {
			'Accept' : 'application/json',
			'X-Requested-With' : 'XMLHttpRequest'
		},
		withCredentials : true
	});

	useEffect(
		() => {
			if (token) {
				client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			}
		},
		[token]
	)

	return client
}

export default useClient;