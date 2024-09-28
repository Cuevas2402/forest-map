import { TreePine } from "lucide-react";
import InfoCard from "./InfoCard";

export default function TreesInfo(){

	const InfoCardProps : any = {
		title : "Trees",
		value : "70",
		description : "+180.1% from last month"
	}
	return (

		<>
			<InfoCard {...InfoCardProps}>
			
				<TreePine className="h-5 w-5" />

			</InfoCard>
		
		</>

	)
}