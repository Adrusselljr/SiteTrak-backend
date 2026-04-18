const mongoose = require('mongoose')
const User = require('../models/User')

// =========================
// CREATE USER
// =========================
exports.createUser = async (req, res) => {
    try {
        const { companyId, firstName, lastName, email, password, role } = req.body

        // basic validation
        if (!companyId || !firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        // validate objectId
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({ message: "Invalid companyId" })
        }

        // check if email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" })
        }

        const user = await User.create({
            companyId,
            firstName,
            lastName,
            email,
            password, // will hash later
            role
        })
        res.status(201).json({ message: "User was created successfully", payload: user })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// =========================
// GET ALL USERS
// =========================
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('companyId')
        res.status(200).json({ payload: users })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// =========================
// GET SINGLE USER
// =========================
exports.getUser = async (req, res) => {
    try {
        const { id } = req.params

        // object validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid userId" })
        }

        const user = await User.findById(id).populate('companyId')
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ payload: user })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// =========================
// UPDATE USER
// =========================
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { firstName, lastName, email, role, isActive, password } = req.body

        // object validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid userId" })
        }

        const updateData = {
            firstName,
            lastName,
            email,
            role,
            isActive
        }

        // ONLY include password if it was sent
        if (password) {
            updateData.password = password // will hash later
        }

        const updateUser = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                returnDocument: 'after',
                runValidators: true
            }
        )
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User updated successfully", payload: updateUser })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// =========================
// DELETE USER (SOFT)
// =========================
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        // object validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid userId" })
        }

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.isActive = false
        await user.save()
        res.status(200).json({ message: "user deactivated successfully", payload: user })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}