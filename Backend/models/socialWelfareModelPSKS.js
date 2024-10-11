// Backend/models/socialWelfareModelPSKS.js
import mongoose from 'mongoose';

// PSKS Schema
const psksSchema = new mongoose.Schema({
  type: { type: String, enum: ['PSKS'], required: true },
  gampong: { type: String, required: true }, // Storing gampong name directly as a string
  PSP: { type: Number, default: 0 },
  PSM: { type: Number, default: 0 },
  TAGANA: { type: Number, default: 0 },
  LKS: {
    count: { type: Number, default: 0 },
    maleClients: { type: Number, default: 0 },
    femaleClients: { type: Number, default: 0 }
  },
  LKSA: {
    count: { type: Number, default: 0 },
    maleClients: { type: Number, default: 0 },
    femaleClients: { type: Number, default: 0 }
  },
  KT: {
    count: { type: Number, default: 0 },
    maleMembers: { type: Number, default: 0 },
    femaleMembers: { type: Number, default: 0 }
  },
  LK3: {
    count: { type: Number, default: 0 },
    maleManagers: { type: Number, default: 0 },
    femaleManagers: { type: Number, default: 0 }
  },
  K_PIONER: { type: Number, default: 0 },
  WKSBM: {
    count: { type: Number, default: 0 },
    maleMembers: { type: Number, default: 0 },
    femaleMembers: { type: Number, default: 0 }
  },
  WPKS: { type: Number, default: 0 },
  PS: { type: Number, default: 0 },
  D_USAHA: { type: Number, default: 0 },
  TKSK: { type: Number, default: 0 }
}, { timestamps: true });

const socialWelfarePSKSData = mongoose.model('socialWelfarePSKSData', psksSchema);

export { socialWelfarePSKSData };