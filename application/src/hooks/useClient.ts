import axios from "axios"
import useApp from "./useApp";
import { useEffect } from "react";


const useClient = () => {

	const {token} = useApp();

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
				client.defaults.headers.common["Authorization"] = `Bearer ${token}`
			}
		},
		[token]
	)

	return client
}

export default useClient;