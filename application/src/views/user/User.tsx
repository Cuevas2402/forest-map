import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserInfo from "./parts/UserInfo";

export default function UserView(){

	return (

		<>
		<div className="p-5">

			<div className="w-full mb-5">

				<div className="col-span-4">
					<UserInfo/>
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



					</TabsContent>
					<TabsContent value="zones">



					</TabsContent>
				</Tabs>

			</div>
		</div>

		
	</>
)
}
