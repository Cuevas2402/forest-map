import GraphCard from "@/components/GraphCard"
import RadialGraph from "@/components/Graphs/RadialGraph"

export default function ProgressCard(){
	const GraphCardProps : any = {
		title : "Chart", description : "Showing total visitors for the last 6 months", footer1 : "Trending up by 5.2% this month", footer2 : "January - June 2024" 
	}
	return (

		<>
			<GraphCard {...GraphCardProps}>

				<RadialGraph/>



			</GraphCard>

		
		</>

	)
}