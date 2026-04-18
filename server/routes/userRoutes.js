const express = require('express')
const router = express.Router()
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser),
router.patch('/:id', deleteUser)

module.exports = router