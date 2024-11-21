import { MapContainer, TileLayer } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heat-layer";
import "leaflet/dist/leaflet.css";

const ZoneHeatMap = () => {

	const addressPoints = [];

	for (let i = 0; i < 100; i++) {
		for (let j = 0; j < 100; j++) {
			const latitude = 51.5 + (Math.random() - 0.5) * 0.1;
			const longitude = -0.09 + (Math.random() - 0.5) * 0.1;
			const weight = (Math.random() * 0.9 + 0.1).toFixed(2);
			addressPoints.push([latitude, longitude, parseFloat(weight)]);
		}
	}

	return (
		<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">

			<div className="h-[600px] w-full"> 

				<MapContainer
					center={[51.505, -0.09]}
					zoom={13}
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

		</div>

	)
};

export default ZoneHeatMap;
