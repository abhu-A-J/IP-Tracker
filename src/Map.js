import React, { useEffect } from "react";
import L from "leaflet";

const Map = ({ lat, lng, city }) => {
  useEffect(() => {
    var map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    L.marker([lat, lng]).addTo(map).bindPopup(city).openPopup();
    return () => {
      map.remove();
    };
  }, [lat, lng, city]);

  return <div id="map"></div>;
};
export default Map;
