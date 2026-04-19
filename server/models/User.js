const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // =========================
    // COMPANY RELATIONSHIP
    // =========================
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    // =========================
    // BASIC INFO
    // =========================
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },

    // =========================
    // ROLE SYSTEM
    // =========================
    role: {
        type: String,
        enum: ['admin', 'pm', 'foreman', 'tech'],
        default: 'tech'
    },
    // =========================
    // ACCOUNT STATUS
    // =========================
    isActive: { type: Boolean, default: true },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)