const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    // =========================
    // COMPANY ASSIGNMENTS
    // =========================
    primeCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    subcontractors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],

    // =========================
    // BASIC INFO
    // =========================
    projectName: { type: String, required: true, trim: true },
    description: { type: String, default: '' },

    // =========================
    // LOCATION / JOBSITE
    // =========================
    location: {
        address: String,
        city: String,
        state: String,
        zip: String,
    },

    // =========================
    // STATUS
    // =========================
    status: {
        type: String,
        enum: ['planning', 'active', 'on_hold', 'completed'],
        default: 'planning'
    },

    // =========================
    // PHASES
    // =========================
    phases: [{
        name: { type: String, required: true }, // "Phase 1", "Phase 2"
        pfhoDate: { type: Date, required: true },
        status: {
            type: String,
            enum: ['not_started', 'active', 'completed'], 
            default: 'not_started'
        }
    }],

    // =========================
    // SOFT DELETE
    // =========================
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }

}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)