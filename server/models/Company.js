const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    // =========================
    // BASIC INFO
    // =========================
    companyName: { type: String, required: true, trim: true },

    // =========================
    // CONTACT INFO
    // =========================
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    contactPhone: String,
    contactAddress: { type: String, trim: true },

    // =========================
    // COMPANY TYPE
    // =========================
    // NOTE :
    // not restrictive - companies can still act as both
    type: {
        type: String,
        enum: ['prime', 'subcontractor', 'both'],
        default: 'subcontractor'
    },

    // =========================
    // SUBSCRIPTION
    // =========================
    subscription: {
        plan: {
            type: String,
            enum: ['free', 'basic', 'enterprise'],
            default: 'free',
        },
        status: {
            type: String,
            enum: ['active', 'past_due', 'canceled'],
            default: 'active',
        },
        startDate: Date,
        endDate: Date,
    },

    // =========================
    // SETTINGS
    // =========================
    settings: {
        allowSubcontractors: {
            type: Boolean,
            default: true,
        }
    },

    // =========================
    // ACCOUNT STATUS
    // =========================
    isActive: { type: Boolean, default: true },
    
}, { timestamps: true })

module.exports = mongoose.model('Company', companySchema)