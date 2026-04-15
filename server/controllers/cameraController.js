const Camera = require('../models/Camera')

// =========================
// CREATE CAMERA
// =========================
exports.createCamera = async (req, res) => {
    try {
        const { subcontractor, cameraNumber, type, location, network, roughIn, install, notes } = req.body // removed projectId till added later

        const camera = await Camera.create({
            // projectId,
            subcontractor,
            cameraNumber,
            type,

            // nested objects
            location: location || {},
            network: network || {},
            roughIn: roughIn || {},
            install: install || {},
            notes: notes || '',

            // system-controlled defaults
            status: "not_started",
            isDeleted: false,
            deletedAt: null
        })
        res.status(201).json({ message: "Camera created", payload: camera })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// =========================
// BULK CREATE CAMERAS
// =========================
exports.createBulkCameras = async (req, res) => {
    try {
        const cameras = req.body

        // validate request is array
        if (!Array.isArray(cameras)) {
            return res.status(400).json({ message: "Request body must be an array of cameras" })
        }
        // format each camera
        const formattedCameras = cameras.map(cam => {
            const { subcontractor, cameraNumber, type, location, network, roughIn, install, notes } = cam // removed projectId till added later

            return {
                // projectId,
                subcontractor,
                cameraNumber,
                type,

                // nested objects
                location: location || {},
                network: network || {},
                roughIn: roughIn || {},
                install: install || {},
                notes: notes || '',

                // system-controlled defaults
                status: "not_started",
                isDeleted: false,
                deletedAt: null
            }
        })

        const created = await Camera.insertMany(formattedCameras)
        res.status(201).json({
            message: `${created.length} cameras created successfully`,
            payload: created
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// =========================
// GET ALL CAMERAS
// =========================
exports.getCameras = async (req, res) => {
    try {
        const cameras = await Camera.find({ isDeleted: false })
        res.status(200).json({ payload: cameras })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// =========================
// GET SINGLE CAMERA
// =========================
exports.getCamera = async (req, res) => {
    try {
        const camera = await Camera.findOne({ _id: req.params.id, isDeleted: false })

        if (!camera) {
            return res.status(404).json({ message: "Camera not found" })
        }
        res.status(200).json({payload: camera})
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// =========================
// UPDATE CAMERA (CORE FUNCTION)
// =========================
exports.updateCamera = async (req, res) => {
    try {
        const camera = await Camera.findByIdAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, { returnDocument: 'after' })

        if (!camera) {
            return res.status(404).json({ message: "Camera not found" })
        }
        res.status(200).json({ message: "Camera updated", payload: camera })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// =========================
// DELETE CAMERA
// =========================
exports.deleteCamera = async (req, res) => {
    try {
        const camera = await Camera.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date(), status: "deleted" }, { returnDocument: 'after' })

        if (!camera) {
            return res.status(404).json({ message: "Camera not found" })
        }
        res.status(200).json({ message: "Camera soft deleted", payload: camera })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// =========================
// RESTORE CAMERA
// =========================
exports.restoreCamera = async (req, res) => {
    try {
        const camera = await Camera.findByIdAndUpdate(req.params.id, { isDeleted: false, deletedAt: null, status: "in_progress" }, { returnDocument: 'after' })

        if (!camera) {
            return res.status(404).json({ message: "Camera not found" })
        }
        res.status(200).json({ message: "Camera restored successfully", payload: camera })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}