import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { GlobalMapProps } from "@/interfaces/props";

const UpdateMapView: React.FC<{ center: [number, number] }> = ({ center }) => {
	const map = useMap();
	map.setView(center);
	return null;
};


const GlobalMap : React.FC<GlobalMapProps> = ({forests, curr, setCurr}) => {

	const center: [number, number] = [
        parseFloat(curr?.Latitud || "50"),
        parseFloat(curr?.Longitud || "50"),
    ];

	const handleMarkerClick = (index : number) => {

		setCurr(forests[index]);

	}


	return (
		<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-white lg:col-span-2">

			<Card>

			<div className="p-5 h-[600px] w-full"> 

				<MapContainer
					center={center}
					zoom={5}
					scrollWheelZoom={false}
					className="h-full w-full"
				>
					<UpdateMapView center={center} />

					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{
						forests.map((forest, index) => (

							<Marker 
							eventHandlers={{
								click : () => handleMarkerClick(index)
							}}
							key={forest.Fid} position={[parseFloat(forest.Latitud), parseFloat(forest.Longitud)]}>
								<Popup>
									{forest.Name}
								</Popup>
							</Marker>

						))
					}



				</MapContainer>

			</div>

			</Card>

		</div>

	)
};

export default GlobalMap;
