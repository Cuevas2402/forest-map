import GraphCard from "@/components/GraphCard"
import BarGraph from "@/components/Graphs/BarGraph"

export default function CronologyGraph(){
	const GraphCardProps : any = {
		title : "Chart", description : "Showing total visitors for the last 6 months", footer1 : "Trending up by 5.2% this month", footer2 : "January - June 2024" 
	}
	return (

		<>
			<GraphCard {...GraphCardProps}>

				<BarGraph/>


			</GraphCard>

		
		</>

	)
}