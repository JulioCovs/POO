// routes/operations.js
// Rutas para las operaciones matemáticas

const express = require('express');
const router = express.Router();
const operationsController = require('../controllers/operationsController');

// Ruta para calcular operaciones
router.post('/calculate', operationsController.calculateOperation);

module.exports = router;