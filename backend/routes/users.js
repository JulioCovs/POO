const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProgress,
  updateUserProgress,
  protect
} = require('../controllers/usersController');

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rutas protegidas
router.get('/progress', protect, getUserProgress);
router.put('/progress', protect, updateUserProgress);

module.exports = router;
