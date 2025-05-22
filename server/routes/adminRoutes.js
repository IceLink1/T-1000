const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Register new admin
router.post('/register', adminController.register);

// Login admin
router.post('/login', adminController.login);

module.exports = router; ww