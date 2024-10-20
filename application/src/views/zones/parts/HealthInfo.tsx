import { Fence } from "lucide-react";
import InfoCard from "./InfoCard";

export default function HealthInfo(){

	const InfoCardProps : any = {
		title : "Health",
		value : "80%",
		description : "+180.1% from last month"
	}

	return (
		<>
			<InfoCard {...InfoCardProps}>
			
				<Fence className="h-5 w-5" />			

			</InfoCard>
		
		</>
	)
}