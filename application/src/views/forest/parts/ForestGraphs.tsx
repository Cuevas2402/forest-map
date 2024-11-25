import CronologyGraph from "./Graphs/CronologyGraph";
import HealthGraph from "./Graphs/HealthGraph";
import TreesGraph from "./Graphs/TreesGraph";

const ForestGraphs = () => {
	return (
		<>
				<div className="col-span-2">

					<HealthGraph/>

				</div>

				<div className="col-span-2 col-start-3">

					<TreesGraph/>
				</div>

				<div className="col-span-4">

					<CronologyGraph/>
				</div>

		
		</>
	)
}

export default ForestGraphs;