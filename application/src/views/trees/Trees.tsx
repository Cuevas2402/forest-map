import HealthInfo from "./parts/HealthInfo";
import LinkCard from "./parts/LinkCard";
import ProgressCard from "./parts/ProgressCard";
import TreesInfo from "./parts/TreesInfo";
import ZonesTable from "./parts/ZonesTable";

export default function Trees(){
	return (
		<>
			<div className="p-5">


				<div className="h-auto w-full mb-5 grid gap-4 grid-cols-4 grid-rows-2">

					<div className="col-span-2">

						<LinkCard/>

					</div>

					<div className="col-span-2 row-span-2 col-start-3">

						<ProgressCard/>

					</div>

					<div className="row-start-2">

						<HealthInfo/>

					</div>

					<div className="row-start-2">


						<TreesInfo />

					</div>

				</div>	

				<div className="h-auto w-full my-5">

					<ZonesTable/>

				</div>
			</div>

			
		</>
	)
}