const express = require('express')
const router = express.Router()
const { createCamera, createBulkCameras, getCameras, getCamera, updateCamera, deleteCamera, restoreCamera } = require('../controllers/cameraController')

// =========================
// CAMERA ROUTES (CRUD + RESTORE)
// =========================

router.post('/', createCamera)
router.post('/bulk', createBulkCameras)
router.get('/', getCameras)
router.get('/:id', getCamera)
router.put('/:id', updateCamera)
router.delete('/:id', deleteCamera)
router.patch('/:id/restore', restoreCamera)

module.exports = router