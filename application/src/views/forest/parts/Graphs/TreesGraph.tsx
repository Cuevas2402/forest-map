import GraphCard from "@/components/GraphCard"
import RadarGraph from "@/components/Graphs/RadarGraph"

export default function TreesGraph(){
	const GraphCardProps : any = {
		title : "Chart", description : "Showing total visitors for the last 6 months", footer1 : "Trending up by 5.2% this month", footer2 : "January - June 2024" 
	}
	return (

		<>
			<GraphCard {...GraphCardProps}>


				<RadarGraph/>

			</GraphCard>

		
		</>

	)
}