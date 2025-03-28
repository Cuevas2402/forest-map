import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForestInfo from "./parts/ForestInfo";
import Overview from "./tabs/Overview/Overview";
import Zones from "./tabs/Zones/Zones";
import { ZoneProvider } from "@/context/ZoneProvider";

export default function ForestView(){
	return (
		<>
			<div className="p-5">

				<div className="w-full mb-5">

					<div className="col-span-4">
						<ForestInfo/>
					</div>

				</div>	

				<div className="h-full w-full my-5">

					<Tabs className="w-full" defaultValue="overview">

						<div className="w-full flex items-center">

							<TabsList className="w-full bg-gray-300">

								<TabsTrigger className="w-full" value="overview">Overview</TabsTrigger>
								<TabsTrigger className="w-full" value="zones">Zones</TabsTrigger>

							</TabsList>

						</div>

						<TabsContent value="overview">

							<Overview/>


						</TabsContent>
						<TabsContent value="zones">

							<ZoneProvider>
								<Zones/>
							</ZoneProvider>


						</TabsContent>
					</Tabs>

				</div>
			</div>

			
		</>
	)
}