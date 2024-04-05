import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: -32.8969997, lng: -68.8559384 }; // Cambia esto según tus necesidades

function MapComponent({ onMarkerDragEnd }) {
  const [markerPosition, setMarkerPosition] = useState(center);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBHw4xgFowelmI7zD7y_quHrFZOKEx3xhk",
  });

  const handleMapClick = (e) => {
    const clickedPosition = e.latLng.toJSON();
    console.log("Se hizo clic en el mapa en la posición:", clickedPosition);
    setMarkerPosition(clickedPosition);
    onMarkerDragEnd(clickedPosition.lat, clickedPosition.lng);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onClick={handleMapClick}
    >
      <Marker
        position={markerPosition}
        draggable
        onDragEnd={handleMarkerDragEnd}
      />
    </GoogleMap>
  ) : (
    <div>Cargando mapa...</div>
  );
}

// Agregamos la función para manejar el evento cuando se arrastra el marcador
const handleMarkerDragEnd = (e) => {
  console.log("Nueva ubicación del marcador:", e.latLng.toJSON());
};

export default MapComponent;

/* sirve para tener varios marcadores del array empresa
interface Empresa {
  latitud: number;
  longitud: number;
}

function initMap(empresas: Empresa[]): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 12,
      center: { lat: -32.8969997, lng: -68.8559384 },
    }
  );
  /*
  empresas.forEach((empresa, i) => {
    const marker = new google.maps.Marker({
      position: { lat: empresa.latitud, lng: empresa.longitud },
      map,
      title: `${i + 1}. Empresa`,
      label: `${i + 1}`,
      optimized: false,
    });
  });
  
}

declare global {
  interface Window {
    initMap: (empresas: Empresa[]) => void;
  }
}

window.initMap = initMap;
*/
