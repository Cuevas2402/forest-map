import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ZoneHeatMap from "@/components/ZoneHeatMap";

const ForestMap = () => {
	return (
		

			<div className="col-span-4">
				<Card className="w-full h-auto" x-chunk="dashboard-01-chunk-0">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					</CardHeader>
					<CardContent>
				<div className="text-center text-2xl font-bold">Map</div>
						<ZoneHeatMap/>	
					</CardContent>
				</Card>
			</div>
	)
}


export default ForestMap;