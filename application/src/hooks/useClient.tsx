import axios from "axios"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "redux/slices/userSlice";


const useClient = () => {

	const token = useSelector(selectToken);

	const client = useMemo(() => {

		const axiosClient = axios.create({
			baseURL: "http://localhost:8080/api",
			headers : {
				'Accept' : 'application/json',
				'X-Requested-With' : 'XMLHttpRequest'
			},
			withCredentials : true
		});

		if (token) {
			client.defaults.headers.common["Authorization"] = `Bearer ${token}`
		}

		return axiosClient;

	}, [token]);

	return client
}

export default useClient;