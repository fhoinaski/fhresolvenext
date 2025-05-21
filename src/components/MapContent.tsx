'use client';

import { motion } from 'framer-motion';
import { MapContainer, TileLayer, useMap, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Importação dinâmica para evitar problemas de SSR com react-leaflet
const DynamicMarker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const DynamicCircle = dynamic(() => import('react-leaflet').then((mod) => mod.Circle), { ssr: false });
const DynamicPopup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

// Componente para centralizar o mapa
const SetViewOnLocation: React.FC<{ coords: L.LatLngExpression }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13);
  }, [coords, map]);
  return null;
};

// Ícones personalizados para o mapa
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const activeMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  className: 'active-marker',
});

const userLocationIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: 'user-location-marker',
});

interface MapContentProps {
  currentView: L.LatLngExpression;
  locations: Array<{ name: string; position: L.LatLngExpression; primary?: boolean }>;
  selectedLocation: string | null;
  isUsingGeolocation: boolean;
  setSelectedLocation: (value: string) => void;
  setIsUsingGeolocation: (value: boolean) => void;
}

// Componentes personalizados para resolver problemas de tipagem
interface CustomMarkerProps {
  position: L.LatLngExpression;
  icon?: L.Icon;
  eventHandlers?: { click?: () => void; [key: string]: any };
  children?: ReactNode;
}

const CustomMarker: React.FC<CustomMarkerProps> = (props) => {
  return <DynamicMarker {...props} />;
};

interface CustomCircleProps {
  center: L.LatLngExpression;
  radius: number;
  pathOptions?: L.PathOptions;
  children?: ReactNode;
}

const CustomCircle: React.FC<CustomCircleProps> = (props) => {
  return <DynamicCircle {...props} />;
};

const MapContent: React.FC<MapContentProps> = ({
  currentView,
  locations,
  selectedLocation,
  isUsingGeolocation,
  setSelectedLocation,
  setIsUsingGeolocation,
}) => {
  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Configuração inicial do mapa
  const defaultCenter: [number, number] = [-27.5132, -48.4618];
  const defaultZoom = 12;

  // Opções de estilo para o mapa
  const mapStyle = { height: '100%', width: '100%', borderRadius: '0.5rem' };
  const attribution = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <MapContainer 
      center={defaultCenter}
      zoom={defaultZoom}
      style={mapStyle}
      className="z-10"
    >
      <TileLayer
        attribution={attribution}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnLocation coords={currentView} />

      {isUsingGeolocation && (
        <motion.div initial="hidden" animate="visible" variants={markerVariants}>
          <CustomMarker 
            position={currentView} 
            icon={userLocationIcon}
          >
            <DynamicPopup>
              <div className="text-center p-1">
                <p className="text-black">Sua localização atual</p>
              </div>
            </DynamicPopup>
          </CustomMarker>
          <CustomCircle
            center={currentView}
            radius={300}
            pathOptions={{
              color: 'var(--color-accent)',
              fillColor: 'var(--color-accent)',
              fillOpacity: 0.2,
              weight: 2
            }}
          />
        </motion.div>
      )}

      {locations.map((location) => (
        <motion.div key={location.name} variants={markerVariants} initial="hidden" animate="visible">
          <CustomMarker
            position={location.position}
            icon={location.name === selectedLocation ? activeMarkerIcon : markerIcon}
            eventHandlers={{
              click: () => {
                setSelectedLocation(location.name);
                setIsUsingGeolocation(false);
              },
            }}
          >
            <DynamicPopup>
              <div className="text-center p-1">
                <h3 className="font-bold text-base mb-1 text-black">{location.name}</h3>
                <p className="text-sm text-gray-600">Área atendida</p>
                {location.primary && (
                  <span className="inline-block px-2 py-1 mt-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Sede Principal
                  </span>
                )}
              </div>
            </DynamicPopup>
          </CustomMarker>
          <CustomCircle
            center={location.position}
            radius={2000}
            pathOptions={{
              color: location.name === selectedLocation ? 'var(--color-accent)' : 'var(--color-secondary)',
              fillColor: location.name === selectedLocation ? 'var(--color-accent)' : 'var(--color-secondary)',
              fillOpacity: location.name === selectedLocation ? 0.2 : 0.1
            }}
          />
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default MapContent;