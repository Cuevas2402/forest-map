import ProgressCard from "./parts/ProgressCard"
import LinkCard from "./parts/LinkCard"
import TableLinkCard from "./parts/TableLinkCard"
import CardPie from "./parts/CardPie"
import BarGraph from "@/components/Graphs/BarGraph"
import CardRadar from "./parts/CardRadar"
import CardNegative from "./parts/CardNegative"

export default function Dashboard(){

	return (
		<>
			<div className="p-6 h-screen grid flex-1 items-start gap-4 m:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">

				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">

					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">

						<LinkCard/>

						<ProgressCard/>

						<ProgressCard/>

					</div>

					<BarGraph/>
					<TableLinkCard/>

					
				</div>

			<div className="h-full flex flex-col gap-y-10">

				<CardPie/>

				<CardRadar/>

				<CardNegative/>

			</div>

		  </div>
		</>
	)
}