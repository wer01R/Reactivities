import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import { LatLngTuple } from "leaflet"

type Props = {
	position: LatLngTuple
	venue: string
}

export default function MapComponent({ position, venue }: Props) {
	return (
		<MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>
					{venue}
				</Popup>
			</Marker>
		</MapContainer>
	)
}