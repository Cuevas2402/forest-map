import ForestGraphs from "./parts/ForestGraphs";
import ForestMap from "./parts/ForestMap";

const Overview = () => {

	return (

		<>
			<div className="grid grid-cols-1 gap-4">

				<div className="h-full grid grid-cols-3 grid-rows-1 gap-4">

					<ForestGraphs/>

				</div>


				<ForestMap/>




			</div>

		</>
	)
}

export default Overview;