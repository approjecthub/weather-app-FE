import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon, Layer } from "leaflet";

import DisplayWeather from "../DisplayWeather";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const UpdateMapCenter: React.FC<{ center: [number, number] }> = ({
  center,
}) => {
  const map = useMap();
  map.panTo(center);
  return null;
};

const Map: React.FC<{
  center: [number, number];
  weatherData: WeatherData | null;
}> = ({ center, weatherData }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current && weatherData) {
      (popupRef.current as Layer).openPopup();
    }
  }, [weatherData]);

  return (
    <MapContainer center={center} zoom={3}>
      <TileLayer
        attribution={
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        minZoom={3}
        maxZoom={18}
      />

      <Marker
        position={center}
        icon={
          new Icon({
            iconUrl: "marker1.png",
            iconSize: [30, 40],
          })
        }
        ref={popupRef}
      >
        {weatherData && (
          <Popup>
            <DisplayWeather weatherData={weatherData} />
          </Popup>
        )}
      </Marker>
      <UpdateMapCenter center={center} />
    </MapContainer>
  );
};

export default Map;
