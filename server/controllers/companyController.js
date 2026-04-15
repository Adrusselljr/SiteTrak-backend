const Company = require('../models/Company')

// =========================
// CREATE COMPANY
// =========================
exports.createCompany = async (req, res) => {
    try {
        const { companyName, contactEmail, contactPhone, contactAddress, type, subscription, settings, isActive } = req.body

        const company = await Company.create({
            companyName,
            contactEmail,
            contactPhone,
            contactAddress,
            type,
            subscription,
            settings,
            isActive
        })

        res.status(201).json({ message: "Comapny was created successfully", payload: company })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// =========================
// GET ALL COMPANIES
// =========================
exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find()
        res.status(200).json({ payload: companies })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// =========================
// GET SINGLE COMPANY
// =========================
exports.getCompany = async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.params.id })
        
        if (!company) {
            return res.status(404).json({ message: "Company not found" })
        }
        res.status(200).json({ payload: company })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// =========================
// UPDATE COMPANY
// =========================
exports.updateCompany = async (req, res) => {
    try {
        const { id } = req.params
        const { companyName, contactEmail, contactPhone, contactAddress, type, subscription, settings, isActive } = req.body

        const updateCompany = await Company.findByIdAndUpdate(
            id,
            {
                companyName,
                contactEmail,
                contactPhone,
                contactAddress,
                type,
                subscription,
                settings,
                isActive
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        )

        if (!companyName) {
            return res.status(404).json({ message: "Company not found" })
        }
        res.status(200).json({ message: "Company has been updated successfully", payload: updateCompany })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}

// =========================
// DELETE COMPANY (hard delete for now)
// =========================
exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await Company.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ message: "Company not found" })
        }
        res.status(200).json({ message: "Company deleted successfully", payload: deleted })
    }
    catch (err) {
        res.status(500).json({ message: "error", error: err.message })
    }
}