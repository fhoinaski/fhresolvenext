// Definições de tipos para leaflet e react-leaflet
declare module 'leaflet' {
    export interface LatLngExpression {
      lat: number;
      lng: number;
    }
  
    export type LatLngTuple = [number, number];
  
    export class Icon {
      constructor(options: {
        iconUrl: string;
        iconSize?: [number, number];
        iconAnchor?: [number, number];
        popupAnchor?: [number, number];
        className?: string;
      });
    }
  
    export interface PathOptions {
      color?: string;
      fillColor?: string;
      fillOpacity?: number;
      weight?: number;
      opacity?: number;
      lineCap?: string;
      lineJoin?: string;
      dashArray?: string;
      dashOffset?: string;
      className?: string;
    }
  }
  
  declare module 'react-leaflet' {
    import { ReactNode, ComponentType } from 'react';
    import * as L from 'leaflet';
  
    export interface MapContainerProps {
      center: L.LatLngExpression;
      zoom: number;
      style?: React.CSSProperties;
      className?: string;
      children?: ReactNode;
    }
  
    export interface TileLayerProps {
      attribution: string;
      url: string;
    }
  
    export interface MarkerProps {
      position: L.LatLngExpression;
      icon?: L.Icon;
      eventHandlers?: {
        click?: () => void;
        [key: string]: any;
      };
      children?: ReactNode;
    }
  
    export interface CircleProps {
      center: L.LatLngExpression;
      radius: number;
      pathOptions?: L.PathOptions;
      children?: ReactNode;
    }
  
    export interface PopupProps {
      children?: ReactNode;
    }
  
    export const MapContainer: ComponentType<MapContainerProps>;
    export const TileLayer: ComponentType<TileLayerProps>;
    export const Marker: ComponentType<MarkerProps>;
    export const Circle: ComponentType<CircleProps>;
    export const Popup: ComponentType<PopupProps>;
    export function useMap(): L.Map;
  }