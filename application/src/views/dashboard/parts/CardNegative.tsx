import GraphCard from "@/components/GraphCard";
import NegativeBarGraph from "@/components/Graphs/NegativeBarGraph";


export default function CardNegative(){

    const GraphCardProps : any = {
      title : "Chart", description : "Showing total visitors for the last 6 months", footer1 : "Trending up by 5.2% this month", footer2 : "January - June 2024" 
    }
    return (
		<>

			<GraphCard {...GraphCardProps}>

				<NegativeBarGraph/>


			</GraphCard>


		
		</>
    )
}