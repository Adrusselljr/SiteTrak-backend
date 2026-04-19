const mongoose = require('mongoose')

const cameraSchema = new mongoose.Schema({
    // =========================
    // RELATIONSHIP
    // =========================
    // project: { type: mongoose.Schema.Types.ObjectId, required: true },

    subcontractor: String,

    // =========================
    // BASIC IDENTIFIERS
    // =========================
    cameraNumber: String,
    type: {
        type: String,
        enum: ['4K', 'LV', 'LVE', 'PTZ', 'GY', 'GF'],
        required: true,
    },

    // =========================
    // LOCATION DATA
    // =========================
    location: {
        phase: String,
        rackLocation: String,
        cameraLocation: String,
    },

    // =========================
    // NETWORK CONFIG (PM / FOREMAN CONTROLLED)
    // =========================
    network: {
        ip: String,
        gateway: String,
        subnet: String,
        switchNumber: String,
        port: String,
        rack: String,
    },

    // =========================
    // ROUGH-IN CHECKLIST
    // =========================
    roughIn: {
        junctionBox: { type: Boolean, default: false },
        pathway: { type: Boolean, default: false },
        coreDrilled: { type: Boolean, default: false },
        box12x12: { type: Boolean, default: false },
        powerOutlet: { type: Boolean, default: false },
        pullString: { type: Boolean, default: false },
    },

    // =========================
    // INSTALL STATUS (TECH WORKFLOW)
    // =========================
    install: {
        programmed: { type: Boolean, default: false },
        mounted: { type: Boolean, default: false },
        pulled: { type: Boolean, default: false },
        focused: { type: Boolean, default: false },
        camTerminated: { type: Boolean, default: false },
        rackTerminated: { type: Boolean, default: false },
    },

    // =========================
    // WORKFLOW CONTROL
    // =========================
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'complete'],
        default: "not_started",
    },

    // =========================
    // NOTES (TECH / FOREMAN)
    // =========================
    notes: { type: String, default: '' },

    // =========================
    // SOFT DELETE SYSTEM
    // =========================
    // Marks record as logically deleted (not physically removed)
    isDeleted: { type: Boolean, default: false },
    // Timestamp of when deletion occurred
    deletedAt: { type: Date, default: null },

    // =========================
    // ACCOUNTABILITY / AUDIT INFO
    // =========================
    lastUpdatedBy: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
            type: String,
            enum: ['pm', 'foreman', 'tech'],
            default: 'tech',
        },
        name: String, // snapshot for quick readability
    },

    // =========================
    // FULL CHANGE HISTORY LOG
    // =========================
    activityLog: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        action: String, // "update", "create", "status_change"
        field: String, // e.g. "network.ip"
        oldValue: mongoose.Schema.Types.Mixed,
        newValue: mongoose.Schema.Types.Mixed,
        timeStamp: { type: Date, default: Date.now }
    }],
    
}, { timestamps: true });

module.exports = mongoose.model('Camera', cameraSchema);