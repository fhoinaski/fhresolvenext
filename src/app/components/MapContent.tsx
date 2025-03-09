// src/components/MapContent.tsx
'use client';

import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Componente para centralizar o mapa em uma localização
function SetViewOnLocation({ location }: { location: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location, map]);
  return null;
}

// Ícones personalizados para marcadores do mapa
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const activeMarkerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  className: 'active-marker',
});

interface MapContentProps {
  currentView: [number, number];
  locations: Array<{ name: string; position: [number, number]; primary?: boolean }>;
  selectedLocation: string | null;
  isUsingGeolocation: boolean;
  setSelectedLocation: (value: string) => void;
  setIsUsingGeolocation: (value: boolean) => void;
}

const MapContent: React.FC<MapContentProps> = ({
  currentView,
  locations,
  selectedLocation,
  isUsingGeolocation,
  setSelectedLocation,
  setIsUsingGeolocation
}) => {
  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <MapContainer
      center={[-27.5132, -48.4618]}
      zoom={12}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      className="z-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetViewOnLocation location={currentView} />

      {/* Marcador de localização do usuário */}
      {isUsingGeolocation && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Marker
            position={currentView}
            icon={new Icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              className: 'user-location-marker',
            })}
          >
            <Popup className="card">Sua localização atual</Popup>
          </Marker>
          <Circle
            center={currentView}
            radius={300}
            pathOptions={{
              color: 'var(--color-accent)',
              fillColor: 'var(--color-accent)',
              fillOpacity: 0.2,
              weight: 2,
            }}
          />
        </motion.div>
      )}

      {/* Marcadores das regiões */}
      {locations.map((location) => (
        <motion.div
          key={location.name}
          variants={markerVariants}
          initial="hidden"
          animate="visible"
        >
          <Marker
            position={location.position as [number, number]}
            icon={location.name === selectedLocation ? activeMarkerIcon : markerIcon}
            eventHandlers={{
              click: () => {
                setSelectedLocation(location.name);
                setIsUsingGeolocation(false);
              },
            }}
          >
            <Popup className="card">
              <div className="text-center p-1">
                <h3 className="font-bold text-base mb-1 card-text">{location.name}</h3>
                <p className="text-sm card-text-secondary">Área atendida</p>
                {location.primary && (
                  <span className="badge badge-primary mt-1">Sede Principal</span>
                )}
              </div>
            </Popup>
          </Marker>
          <Circle
            center={location.position as [number, number]}
            radius={2000}
            pathOptions={{
              color:
                location.name === selectedLocation
                  ? 'var(--color-accent)'
                  : 'var(--color-secondary)',
              fillColor:
                location.name === selectedLocation
                  ? 'var(--color-accent)'
                  : 'var(--color-secondary)',
              fillOpacity: location.name === selectedLocation ? 0.2 : 0.1,
            }}
          />
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default MapContent;