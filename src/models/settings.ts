// src/models/settings.ts
import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactInfoSchema = new Schema({
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, default: 'contato@fhresolve.com.br' },
  phone: { type: String, required: true, minlength: 10, default: '48991919791' },
  address: { type: String, required: true, minlength: 5, default: 'Ratones, Florianópolis - SC' },
}, { _id: false });

const socialMediaSchema = new Schema({
  instagram: { type: String, default: '' },
  facebook: { type: String, default: '' },
  whatsapp: { type: String, minlength: 10, default: '48991919791' },
}, { _id: false });

const trackingSchema = new Schema({
  facebookPixel: { type: String, default: '' },
  tiktokPixel: { type: String, default: '' },
  googleTagManager: { type: String, default: '' },
}, { _id: false });

const settingsSchema = new Schema({
  siteName: { type: String, required: true, default: 'FH Resolve' },
  siteDescription: { type: String, required: true, default: 'Serviços profissionais de manutenção residencial em Florianópolis' },
  contactInfo: { type: contactInfoSchema, required: true, default: () => ({}) },
  socialMedia: { type: socialMediaSchema, default: () => ({}) },
  tracking: { type: trackingSchema, default: () => ({}) },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const SettingsModel = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default SettingsModel;