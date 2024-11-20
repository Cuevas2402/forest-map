import useClient from "@/hooks/useClient";
import Forest from "@/interfaces/forest";
import { useEffect, useState } from "react";
import TableForests from "./parts/TableForests";

const Forests = () => {

	const client = useClient();

	const [data, setData] = useState<Forest[]>([]);

	const handleGetData = async () => {
		const response = await client.get("/forests");
		console.log(response.data.forests);
		setData(response.data.forests);
	}

	useEffect( () =>  { 
		handleGetData()
	}
	, [data]);

	return (
		<>

			<div className="w-full h-full p-5">

				<TableForests data={data}/>


			</div>
		
		</>
	)
}

export default Forests;