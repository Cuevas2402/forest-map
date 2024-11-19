import { useEffect, useState } from "react";
import TableUsers from "./parts/TableUsers";
import useClient from "@/hooks/useClient";
import User from "@/interfaces/user";

export default function Users(){

	const client = useClient();
	const [data, setData] = useState<User[]>([]);
	console.log(1);
  
	const handleGetData = async () => {
	  const response = await client.get("/test/users");
	  console.log(response.data.users);
	  setData(response.data.users);
	};
  
	useEffect(() => {
	  handleGetData();
	}, []);

	return (
		<>

		<div className="w-full h-full p-5">

			<TableUsers data={data}/>

		</div>
		
		</>
	)
}