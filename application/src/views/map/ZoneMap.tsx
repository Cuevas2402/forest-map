import ZoneHeatMap from "@/components/ZoneHeatMap";
import FormMenu from "./parts/FormMenu";

const ZoneMap = () => {

	return (

		<div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">

		  <ZoneHeatMap/>

          <div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
			<FormMenu/>
          </div>

        </div>
	)

}

export default ZoneMap;