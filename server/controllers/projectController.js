const mongoose = require('mongoose')
const Project = require('../models/Project')

// =========================
// CREATE PROJECT
// =========================
exports.createProject = async (req, res) => {
    try {
        const { primeCompany, subcontractors, projectName, description, location, status, phases } = req.body

        // basic validation
        if(!primeCompany || !projectName) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        // validate object
        if(!mongoose.Types.ObjectId.isValid(primeCompany)) {
            return res.status(400).json({ message: 'Invalid primeComapny ID' })
        }

        const project = await Project.create({
            primeCompany,
            subcontractors,
            projectName,
            description,
            location,
            status,
            phases
        })
        res.status(201).json({ message: 'Project was successfully created', payload: project })
    }
    catch (err) {
        res.status(500).json({ message: 'error', error: err.message })
    }
}

// =========================
// GET ALL PROJECTS
// =========================
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ isDeleted: false })
            .populate('primeCompany')
            .populate('subcontractors')
        res.status(200).json({ payload: projects })
    }
    catch (err) {
        res.status(500).json({ message: 'error', error: err.message })
    }
}

// =========================
// GET PROJECTS BY PRIME COMPANY
// =========================
exports.getProjectsByPrime = async (req, res) => {
    try {
        const { companyId } = req.params

        const projects = await Project.find({
            primeCompany: companyId
        }).populate('primeCompany subcontractors')
        res.status(200).json({ payload: projects })
    }
    catch (err) {
        res.status(500).json({ message: 'error', error: err.message })
    }
}

// =========================
// GET PROJECTS BY SUBCONTRACTOR
// =========================
exports.getProjectsBySub = async (req, res) => {
    try {
        const { subcontractorId } = req.params

        const projects = await Project.find({
            subcontractors: subcontractorId
        }).populate('primeCompany subcontractors')
        res.status(200).json({ payload: projects })
    }
    catch (err) {
        res.status(500).json({ message: 'error', error: err.message })
    }
}


// =========================
// GET SINGLE PROJECT
// =========================
exports.getProject = async (req, res) => {
    try {
        const { id } = req.params

        // validate object
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid project ID' })
        }

        const project = await Project.findById(id).populate('primeCompany subcontractors')
        
        if(!project) {
            return res.status(404).json({ message: "Project not found" })
        }
        if (project.isDeleted) {
            return res.status(404).json({ message: "Project deleted" })
        }
        res.status(200).json({ payload: project })
    }
    catch (err) {
        res.status(500).json({ message: 'error', error: err.message })
    }
}

// =========================
// UPDATE PROJECT
// =========================
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params
        const { primeCompany, subcontractors, projectName, description, location, status, phases } = req.body

        // validate object
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid project ID' })
        }

        const setData = {
            primeCompany,
            projectName,
            description,
            location,
            status,
            phases
        }

        const updateQuery = {
            $set: setData
        }

        if(subcontractors) {
            updateQuery.$addToSet = {
                subcontractors: Array.isArray(subcontractors)
                    ? { $each: subcontractors }
                    : subcontractors
            }
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            updateQuery,
            {
                returnDocument: 'after',
                runValidators: true
            }
        ).populate('primeCompany subcontractors')
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" })
        }
        res.status(200).json({ message: "Project was updated successfully", payload: updatedProject })
    }
    catch (err) {
        res.status(500).json({ message: 'error', error: err.message })
    }
}

// =========================
// DELETE PROJECT (SOFT DELETE)
// =========================
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params

        // validate object
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid project ID' })
        }

        const project = await Project.findById(id)

        if(!project) {
            return res.status(404).json({ message: "Projects not found" })
        }
        project.isDeleted = true
        project.deletedAt = new Date()
        await project.save()
        res.status(200).json({ message: "Projects deleted successfully", payload: project })
    }
    catch (err) {
        res.status(500).json({ message: 'error', error: err.message })
    }
}