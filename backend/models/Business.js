const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nipt: {
    type: String,
    required: true,
    match: [/^[A-Z]\d{8}[A-Z]$/, 'Invalid NIPT format. e.g., M21326021Q'],
  },
  role: { type: String, default: 'business' },
}, { timestamps: true });

module.exports = mongoose.model('Business', BusinessSchema);
