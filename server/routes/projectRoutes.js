const express = require('express')
const router = express.Router()
const { createProject, getProjects, getProjectsByPrime, getProjectsBySub, getProject, updateProject, deleteProject } = require('../controllers/projectController')

router.post('/', createProject)
router.get('/', getProjects)
router.get('/prime/:companyId', getProjectsByPrime)
router.get('/subcontractor/:subcontractorId', getProjectsBySub)
router.get('/:id', getProject)
router.put('/:id', updateProject)
router.patch('/:id', deleteProject)

module.exports = router