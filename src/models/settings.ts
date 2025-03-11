// src/models/settings.ts
import mongoose from 'mongoose';

const { Schema, models } = mongoose;

// Definição para cores do tema
const themeColorsSchema = new Schema({
  primary: { type: String, default: '#252525' },
  accent: { type: String, default: '#2B8D9A' },
  secondary: { type: String, default: '#8D9192' },
  neutral: { type: String, default: '#EDEDED' },
  text: { type: String, default: '#252525' },
  textLight: { type: String, default: '#FFFFFF' },
  dark: { type: String, default: '#252525' },
  light: { type: String, default: '#FFFFFF' },
  gray: { type: String, default: '#EDEDED' },
  cardBg: { type: String, default: '#FFFFFF' },
  cardText: { type: String, default: '#252525' },
  paralel: { type: String, default: '#F5F5F5' },
  accentDark: { type: String, default: '#247885' }
}, { _id: false });

// Definição para temas (claro e escuro)
const themesSchema = new Schema({
  light: { type: themeColorsSchema, default: () => ({}) },
  dark: { type: themeColorsSchema, default: () => ({}) }
}, { _id: false });

// Definição para informações de contato
const contactInfoSchema = new Schema({
  email: { type: String, default: 'contato@fhresolve.com.br' },
  phone: { type: String, default: '48991919791' },
  address: { type: String, default: 'Ratones, Florianópolis - SC' }
}, { _id: false });

// Schema principal para as configurações do site
const settingsSchema = new Schema({
  // Informações básicas do site
  siteName: {
    type: String,
    default: 'FH Resolve',
  },
  siteDescription: {
    type: String,
    default: 'Serviços profissionais de manutenção residencial em Florianópolis',
  },
  
  // Informações de contato
  contactInfo: {
    type: contactInfoSchema,
    default: () => ({})
  },
  
  // Redes sociais
  socialMedia: {
    instagram: String,
    facebook: String,
    whatsapp: String,
  },
  
  // Configurações de tema
  themes: {
    type: themesSchema,
    default: () => ({})
  },
  
  // Configurações de template e tema ativo
  activeTemplate: {
    type: String,
    default: 'default'
  },
  
  defaultTheme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'light',
  },
  
  // Modo de manutenção
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
  
  // URLs de recursos
  logoUrl: {
    type: String,
    default: '/logo.svg'
  },
  
  faviconUrl: {
    type: String,
    default: '/favicon.ico'
  },
  
  // Metadados
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Limpar modelo anterior se existir
mongoose.models = {};

const SettingsModel = mongoose.model('Settings', settingsSchema);

export default SettingsModel;