import useClient from "@/hooks/useClient";
import TableCompanies from "./parts/TableCompanies";
import Company from "@/interfaces/company";
import { useEffect, useState } from "react";

const Companies = () => {

	const client = useClient();

	const [data, setData] = useState<Company[]>([]);

	const handleGetData = async () => {
		const response = await client.get("/companies");
		console.log(response.data.companies);
		setData(response.data.companies);
	}

	useEffect( () =>  { 
		handleGetData()
	}
	, [data]);

	return (
		<>

			<div className="w-full h-full p-5">

				<TableCompanies data={data}/>

			</div>
		
		</>
	)
}

export default Companies;