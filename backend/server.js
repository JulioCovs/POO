// server.js - Archivo principal para iniciar el servidor

// ============================================
// 0. CONFIGURACIÓN INICIAL Y VERIFICACIÓN
// ============================================
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Verificación de variables críticas
console.log('=== Variables cargadas ===');
console.log('MONGO_URI:', process.env.MONGO_URI || '❌ No definida');
console.log('PORT:', process.env.PORT || '5001 (por defecto)');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development (por defecto)');

// ============================================
// 1. REQUERIMIENTOS DE DEPENDENCIAS
// ============================================
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// ============================================
// 2. CONEXIÓN A BASE DE DATOS
// ============================================
connectDB(); // Ahora mostrará mensajes más detallados

// ============================================
// 3. INICIALIZACIÓN DE EXPRESS
// ============================================
const app = express();
const PORT = process.env.PORT || 5001;

// ============================================
// 4. CONFIGURACIÓN DE MIDDLEWARES
// ============================================
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// [Resto de tu configuración permanece igual...]
// ============================================
// 5. SERVIR ARCHIVOS ESTÁTICOS
// ============================================
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// ============================================
// 6. RUTAS API
// ============================================
app.use('/api/operations', require('./routes/operations'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/users', require('./routes/users'));

// ============================================
// 7. RUTA DE SALUD MEJORADA
// ============================================
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    db: {
      status: statusMap[dbStatus],
      name: mongoose.connection.name,
      host: mongoose.connection.host
    },
    memoryUsage: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// [El resto de tu archivo permanece igual...]