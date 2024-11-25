import ForestGraphs from "../parts/ForestGraphs";
import ForestMap from "../parts/ForestMap";
import ForestStats from "../parts/ForestStats";

const Overview = () => {

	return (

		<>
			<div className="grid grid-cols-4 gap-4">

				<ForestStats/>

				<ForestMap/>

				<ForestGraphs/>



			</div>

		</>
	)
}

export default Overview;