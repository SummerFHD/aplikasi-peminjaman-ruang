"use strict"

const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const ruanganController = require('../controllers/RuanganController')
const isAuthenticated = require('../middleware/auth')

router.get('/login', userController.index)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

// Ruangan Routes
router.get('/', isAuthenticated, ruanganController.index)
router.get("/add", isAuthenticated, ruanganController.add);
router.post("/create", isAuthenticated, ruanganController.create);
router.get("/edit/:id", isAuthenticated, ruanganController.edit);
router.post("/update/:id", isAuthenticated, ruanganController.update);
router.get("/delete/:id", isAuthenticated, ruanganController.destroy);

module.exports = router