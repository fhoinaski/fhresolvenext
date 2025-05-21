// src/types/settings.ts
export interface Style {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  opacity?: string;
  transform?: string;
  transition?: string;
}

export interface IconOption {
  name: string;
  value: string;
  label: string;
  icon?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
  duration?: string;
}

export interface Template {
  id: string;
  name: string;
  styles: { [key: string]: string };
}

export interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  tracking: {
    facebookPixel: string;
    tiktokPixel: string;
    googleTagManager: string;
  };
  services: Service[];
  templates: Template[];
  activeTemplate: string;
  maintenanceMode: boolean;
  logoUrl: string;
  faviconUrl: string;
}