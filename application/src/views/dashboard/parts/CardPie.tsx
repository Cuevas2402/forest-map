import GraphCard from "@/components/GraphCard";
import PieGraph from "@/components/Graphs/PieGraph";


export default function CardPie(){

	const GraphCardProps : any = {
		title : "Trees health", description :"", footer1 : "Trending up by 5.2% this month", footer2 : "" 
	}
	return (
		<>
			<GraphCard {...GraphCardProps}>

					<PieGraph />

			</GraphCard>


		
		</>
	)
}