import ZoneHealth from "./parts/ZoneHealth";
import ZoneImages from "./parts/ZoneImages";
import ZonesClasses from "./parts/ZonesClasses";
import ZoneSelector from "./parts/ZoneSelector";
import ZoneTypes from "./parts/ZoneTypes";

export default function Zones() {
	return (
		<>

			<div className="grid grid-cols-2">

				<div className="grid grid-cols-1">
					<ZoneImages/>
				</div>

				<div className="pl-5 grid grid-cols-4 grid-rows-4 gap-4">
					<div className="col-span-2 row-span-2 col-start-1 row-start-1">
						<ZoneSelector/>
					</div>
					<div className="col-span-2 row-span-2 col-start-3 row-start-3">
						<ZoneTypes/>
					</div>
					<div className="col-span-2 row-span-2 col-start-3 row-start-1">
						<ZonesClasses/>
					</div>
				
					<div className="col-span-2 row-span-2 col-start-1 row-start-3">
						<ZoneHealth/>
					</div>
				</div>

			</div>
    
		</>
	)
}