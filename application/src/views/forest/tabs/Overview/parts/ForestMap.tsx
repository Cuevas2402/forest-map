import { MapContainer, TileLayer } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heat-layer";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import useForest from "@/hooks/useForest";

const ForestMap = () => {

	const {coordenates} = useForest();


	const addressPoints = [];

	for (let i = 0; i < 100; i++) {
		for (let j = 0; j < 100; j++) {
			const la = coordenates.x + (Math.random() - 0.5) * 0.1;
			const lo = coordenates.y + (Math.random() - 0.5) * 0.1;
			const weight = (Math.random() * 0.9 + 0.1).toFixed(2);
			addressPoints.push([la, lo, parseFloat(weight)]);
		}
	}
	return (
		

		<div className="col-span-4">
			<Card>

				<div className="p-5 h-[600px] w-full"> 

					<MapContainer
						center={[coordenates.x, coordenates.y]}
						zoom={25}
						scrollWheelZoom={false}
						className="h-full w-full"
					>

						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

						<HeatmapLayer latlngs={addressPoints.map((p) => [p[0], p[1]])} />

					</MapContainer>

				</div>

			</Card>

		</div>
	)
}


export default ForestMap;