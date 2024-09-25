import {
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TableDashboard from "@/components/Tables/TableDashboard"
import ProgressCard from "@/components/Cards/ProgressCard"
import LinkCard from "@/components/Cards/LinkCard"
import PieGraph from "../components/Graphs/PieGraph"
import LineGraph from "@/components/Graphs/LineGraph"

export default function Dashboard(){
	return (
		<>
			<div className="h-screen grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">

				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">

					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">

						<LinkCard/>

						<ProgressCard/>

						<ProgressCard/>

					</div>

					<Card className="xl:col-span-1" x-chunk="dashboard-01-chunk-4">
						<CardHeader className="flex flex-row items-center">
						<div className="grid gap-2">
							<CardTitle>Transactions</CardTitle>
							<CardDescription>
							Recent transactions from your store.
							</CardDescription>
						</div>
						<Button asChild size="sm" className="ml-auto gap-1">
							<a href="#">
							View All
							<ArrowUpRight className="h-4 w-4" />
							</a>
						</Button>
						</CardHeader>
						<CardContent>
							<TableDashboard/>
						</CardContent>
					</Card>
				</div>

			<div>
				<div className="mb-8">

					<PieGraph/>

				</div>

				<div>

					<LineGraph/>

				</div>

			</div>

		  </div>
		</>
	)
}