// Backend/models/socialWelfareModelPPKS.js
import mongoose from 'mongoose';

// PPKS Schema
const ppksSchema = new mongoose.Schema({
  type: { type: String, enum: ['PPKS'], required: true },
  gampong: { type: String, required: true }, // Storing gampong name directly as a string
  ADK: { type: Number, default: 0 },
  AY_AP_AYP: { type: Number, default: 0 },
  AT: { type: Number, default: 0 },
  ABH: { type: Number, default: 0 },
  AJ: { type: Number, default: 0 },
  ABT: { type: Number, default: 0 },
  AKTK: { type: Number, default: 0 },
  PRSE: { type: Number, default: 0 },
  KTK: { type: Number, default: 0 },
  LUT: { type: Number, default: 0 },
  PD: { type: Number, default: 0 },
  TS: { type: Number, default: 0 },
  PGMS: { type: Number, default: 0 },
  GLDG: { type: Number, default: 0 },
  BWBLK: { type: Number, default: 0 },
  NAPZA: { type: Number, default: 0 },
  FM: { type: Number, default: 0 },
  RTLH: { type: Number, default: 0 },
  KR: { type: Number, default: 0 },
  KBSP: { type: Number, default: 0 },
  KAT: { type: Number, default: 0 },
  KBA: { type: Number, default: 0 },
  KBS: { type: Number, default: 0 },
  PM: { type: Number, default: 0 },
  ODHA: { type: Number, default: 0 },
  ODKB: { type: Number, default: 0 }
}, { timestamps: true });

const socialWelfarePPKSData = mongoose.model('socialWelfarePPKSData', ppksSchema);

export { socialWelfarePPKSData };