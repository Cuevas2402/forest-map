import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import fondologin from "../../../../../assets/fondologin.jpg";

export default function ZoneImages() {
  const bounds : any = [[-50, -50], [150, 200]]; // 3:2 ajustado


  return (
    <Card className="overflow-hidden h-full pt-5" x-chunk="dashboard-07-chunk-4">
      <CardContent>
        <div className="grid gap-2">
          <MapContainer
            bounds={bounds}    // Configura los límites del mapa
            zoom={130}
			style={{ width: "100%", height: "90vh" }}
          >
			<Marker position={[0,0]}>
				<Popup>
					Pine	
				</Popup>
			</Marker>

			<Marker position={[50,50]}>
				<Popup>
					Birch
				</Popup>
			</Marker>

			<Marker position={[60,10]}>
				<Popup>
					Birch
				</Popup>
			</Marker>


            <ImageOverlay
              url={fondologin} // Ruta de la imagen que quieres mostrar
              bounds={bounds} // Esto hará que la imagen ocupe todo el área del mapa
            />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
