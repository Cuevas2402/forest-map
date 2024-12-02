import GraphCard from "@/components/GraphCard";
import RadarGraph from "@/components/Graphs/RadarGraph";


export default function CardRadar(){

    const GraphCardProps : any = {
      title : "Species distribution", description : "", footer1 : "Trending up by 5.2% this month", footer2 : ""
    }
    return (
		<>

			<GraphCard {...GraphCardProps}>

				<RadarGraph />



			</GraphCard>


		
		</>
    )
}
