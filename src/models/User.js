import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  sponsorCode: { type: String, unique: true, index: true, required: true },
  sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  sponsorName: { type: String, default: '' },

  fullName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  dob: { type: Date },

  idNo: { type: String },
  nationality: { type: String },

  mobile: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },

  preferredLanguage: { type: String, default: 'English' },
  address: { type: String },
  stateProvince: { type: String },
  cityTown: { type: String },
  postCode: { type: String },

  image: { type: String, default: '' }, // path or URL
  documents: [DocumentSchema],

  role: { type: String, enum: ['user','admin'], default: 'user' },
  isApproved: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: false },

  balance: { type: Number, default: 0 },
  password: { type: String, required: true },

  createdAt: { type: Date, default: Date.now }
});

// Optional: auto-index sponsorCode for faster queries
UserSchema.index({ sponsorCode: 1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);
