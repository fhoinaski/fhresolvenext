import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Map as MapIcon, List, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

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

// Dados de localizações
const locations = [
  { name: 'Ratones', position: [-27.5132, -48.4618], primary: true },
  { name: 'Jurerê', position: [-27.4386, -48.4958] },
  { name: 'Canasvieiras', position: [-27.4278, -48.4778] },
  { name: 'Ingleses', position: [-27.4358, -48.3958] },
  { name: 'Santo Antônio de Lisboa', position: [-27.5075, -48.5211] },
  { name: 'Vargem Pequena', position: [-27.4664, -48.4319] },
  { name: 'Vargem Grande', position: [-27.4386, -48.4319] },
  { name: 'Daniela', position: [-27.4458, -48.5211] },
];

const ServiceMap: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [selectedLocation, setSelectedLocation] = useState<string | null>('Ratones');
  const [currentView, setCurrentView] = useState<[number, number]>([-27.5132, -48.4618]);
  const [isUsingGeolocation, setIsUsingGeolocation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Sinalizar quando o componente estiver montado
  useEffect(() => setIsMounted(true), []);

  // Atualizar a visualização do mapa quando o local selecionado mudar
  useEffect(() => {
    if (selectedLocation) {
      const location = locations.find((loc) => loc.name === selectedLocation);
      if (location) setCurrentView(location.position as [number, number]);
    }
  }, [selectedLocation]);

  // Função para selecionar uma localização
  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
    if (isMobile) setActiveTab('map');
    setIsUsingGeolocation(false);
  };

  // Função para obter a localização do usuário
  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
          setCurrentView(userLocation);
          setIsUsingGeolocation(true);
          setSelectedLocation(null);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
        }
      );
    } else {
      alert('Geolocalização não é suportada por este navegador.');
    }
  };

  // Variantes de animação para elementos
  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="map" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Localização
          </motion.span>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Áreas Atendidas
          </motion.h2>
          <motion.p
            className="section-subtitle text-contrast-80"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Atendemos Florianópolis e região
          </motion.p>
        </div>

        {/* Seletor de abas para dispositivos móveis */}
        {isMobile && (
          <div className="flex mx-auto mb-6 rounded-lg overflow-hidden shadow-custom-sm border border-[var(--color-neutral)]/30 max-w-sm">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('map')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'map'
                  ? 'bg-[var(--color-accent)] text-[var(--color-text-light)] font-medium'
                  : 'bg-[var(--color-card-bg)] text-[var(--color-card-text)] hover:bg-[var(--color-accent)]/10'
              }`}
              aria-label="Ver mapa"
            >
              <MapIcon size={18} />
              <span>Mapa</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'list'
                  ? 'bg-[var(--color-accent)] text-[var(--color-text-light)] font-medium'
                  : 'bg-[var(--color-card-bg)] text-[var(--color-card-text)] hover:bg-[var(--color-accent)]/10'
              }`}
              aria-label="Ver lista de regiões"
            >
              <List size={18} />
              <span>Regiões</span>
            </motion.button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Lista de localizações */}
          <AnimatePresence mode="wait">
            {(activeTab === 'list' || !isMobile) && (
              <motion.div
                key="region-list"
                className="md:col-span-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={isMobile ? tabVariants : {}}
              >
                <div className="card">
                  <h3 className="text-lg font-medium mb-6 flex items-center card-text">
                    <MapPin className="h-5 w-5 text-[var(--color-accent)] mr-2" />
                    Regiões Atendidas
                  </h3>
                  <ul className="space-y-2">
                    {locations.map((location) => (
                      <motion.li
                        key={location.name}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          location.name === selectedLocation
                            ? 'bg-[var(--color-accent)] text-[var(--color-text-light)]'
                            : 'bg-[var(--color-gray)] dark:bg-[var(--color-neutral)]/10 hover:bg-[var(--color-neutral)]/20'
                        }`}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLocationSelect(location.name)}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                              location.name === selectedLocation
                                ? 'bg-[var(--color-text-light)]/20'
                                : 'bg-[var(--color-accent)]/10'
                            }`}
                          >
                            <MapPin
                              className={`h-4 w-4 ${
                                location.name === selectedLocation
                                  ? 'text-[var(--color-text-light)]'
                                  : 'text-[var(--color-accent)]'
                              }`}
                            />
                          </span>
                          <span className="font-medium">{location.name}</span>
                          {location.primary && location.name === selectedLocation && (
                            <span className="text-xs ml-auto bg-[var(--color-text-light)]/20 px-2 py-0.5 rounded-full">
                              Principal
                            </span>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20">
                    <p className="text-sm card-text-secondary mb-4">
                      Atendemos estas regiões e arredores. Consulte disponibilidade.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGetUserLocation}
                      className="btn btn-outline w-full flex items-center justify-center gap-2"
                    >
                      <Navigation size={16} className="text-[var(--color-accent)]" />
                      <span>Minha localização</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Componente do mapa */}
          <AnimatePresence mode="wait">
            {(activeTab === 'map' || !isMobile) && (
              <motion.div
                key="map-container"
                className={`${isMobile ? '' : 'md:col-span-2'}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={isMobile ? tabVariants : {}}
              >
                <div className="card h-[450px] md:h-[500px] relative overflow-hidden p-2">
                  {isMounted && (
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
                  )}

                  {/* Botão de localização */}
                  <motion.button
                    className="absolute bottom-4 right-4 btn btn-outline p-3 rounded-full z-[1000]"
                    onClick={handleGetUserLocation}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Mostrar minha localização"
                  >
                    <Navigation size={20} />
                  </motion.button>

                  {/* Indicador de localização selecionada em dispositivos móveis */}
                  {isMobile && selectedLocation && !isUsingGeolocation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-0 right-0 mx-auto w-max card px-3 py-1.5 z-[1000] flex items-center gap-2"
                    >
                      <MapPin size={14} className="text-[var(--color-accent)]" />
                      <span className="font-medium text-sm card-text">{selectedLocation}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-contrast-60 italic">
            Verifique disponibilidade para sua região
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;