
import axios from "axios";


const client = axios.create({
	baseURL: "https://localhost:8080",
	headers : {
		'Accept' : 'application/json',
		'X-Requested-With' : 'XMLHttpRequest'
	},
	withCredentials : true
})

export default client