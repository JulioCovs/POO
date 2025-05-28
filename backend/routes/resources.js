// routes/resources.js
// Rutas para los recursos educativos

const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resourcesController');

// Rutas para obtener videos y actividades
router.get('/videos', resourcesController.getVideos);
router.get('/activities', resourcesController.getActivities);

module.exports = router;