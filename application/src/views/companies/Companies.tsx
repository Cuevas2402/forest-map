import useClient from "@/hooks/useClient";
import TableCompanies from "./parts/TableCompanies";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import Company from "@/interfaces/company";

const Companies = () => {

	const client = useClient();

	const fetcher = async () => {
		const response = await client.get("/companies");
		const companies : Company[] = response.data.companies || []
		return companies
	}

	const {data, error, isLoading} = useSWR("/api/companies", fetcher)

	if (data){}
	if (error){ return <div>Error al cargar los datos</div>}
	if (isLoading) { return <Spinner/> }


	return (
		<>

			<div className="w-full h-full p-5">

				<TableCompanies data={data || [] }/>

			</div>
		
		</>
	)
}

export default Companies;