const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  personalInfo: {
    name: { first: String, last: String, required: true },
    age: Number,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dob: Date,
    contact: {
      phone: String,
      email: String,
      address: {
        street: String,
        city: String,
        state: String,
        zip: String
      }
    }
  },
  medicalHistory: [{
    condition: String,
    diagnosisDate: Date,
    status: String,
    notes: String
  }],
  allergies: [String],
  prescriptions: [{
    medication: String,
    dosage: String,
    startDate: Date,
    endDate: Date,
    prescribedBy: String
  }],
  visits: [{
    date: { type: Date, default: Date.now },
    doctor: String,
    reason: String,
    notes: String,
    tests: [{
      name: String,
      result: String,
      date: Date
    }]
  }]
}, { timestamps: true });

// Create text index for search
patientSchema.index({ 
  'personalInfo.name.first': 'text', 
  'personalInfo.name.last': 'text',
  'medicalHistory.condition': 'text'
});

module.exports = mongoose.model('Patient', patientSchema);
