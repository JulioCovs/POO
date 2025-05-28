// controllers/usersController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// En un entorno de producción, utilizaríamos una base de datos.
// Para este ejemplo, usamos un array en memoria
const users = [];

// Secret key para JWT (en producción, esto debería estar en variables de entorno)
const JWT_SECRET = 'aritmetica-app-secret-key';

/**
 * Registrar un nuevo usuario
 */
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Se requieren username, email y password'
      });
    }
    
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({
        error: true,
        message: 'El email ya está registrado'
      });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      progress: {
        suma: { completed: 0, score: 0 },
        resta: { completed: 0, score: 0 },
        multiplicacion: { completed: 0, score: 0 },
        division: { completed: 0, score: 0 }
      },
      createdAt: new Date()
    };
    
    users.push(newUser);
    
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json({
      error: false,
      message: 'Usuario registrado exitosamente',
      user: userWithoutPassword,
      token
    });
    
  } catch (error) {
    console.error('Error en registerUser:', error);
    return res.status(500).json({
      error: true,
      message: 'Error al registrar usuario'
    });
  }
};

/**
 * Iniciar sesión de usuario
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Se requieren email y password'
      });
    }
    
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Credenciales inválidas'
      });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: true,
        message: 'Credenciales inválidas'
      });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      error: false,
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
      token
    });
    
  } catch (error) {
    console.error('Error en loginUser:', error);
    return res.status(500).json({
      error: true,
      message: 'Error al iniciar sesión'
    });
  }
};

/**
 * Middleware para verificar token JWT
 */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: true,
        message: 'No autorizado, token no proporcionado'
      });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = users.find(user => user.id === decoded.id);
    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'No autorizado, usuario no encontrado'
      });
    }
    
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    
    next();
    
  } catch (error) {
    console.error('Error en protect middleware:', error);
    return res.status(401).json({
      error: true,
      message: 'No autorizado, token inválido'
    });
  }
};

/**
 * Obtener progreso del usuario
 */
const getUserProgress = (req, res) => {
  try {
    const user = users.find(user => user.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Usuario no encontrado'
      });
    }
    
    return res.status(200).json({
      error: false,
      progress: user.progress
    });
    
  } catch (error) {
    console.error('Error en getUserProgress:', error);
    return res.status(500).json({
      error: true,
      message: 'Error al obtener progreso del usuario'
    });
  }
};

/**
 * Actualizar progreso del usuario
 */
const updateUserProgress = (req, res) => {
  try {
    const { operation, completed, score } = req.body;
    
    if (!operation || completed === undefined || score === undefined) {
      return res.status(400).json({
        error: true,
        message: 'Se requieren operation, completed y score'
      });
    }
    
    const validOperations = ['suma', 'resta', 'multiplicacion', 'division'];
    if (!validOperations.includes(operation.toLowerCase())) {
      return res.status(400).json({
        error: true,
        message: 'Operación no válida'
      });
    }
    
    const userIndex = users.findIndex(user => user.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        error: true,
        message: 'Usuario no encontrado'
      });
    }
    
    users[userIndex].progress[operation.toLowerCase()] = {
      completed: Number(completed),
      score: Number(score)
    };
    
    return res.status(200).json({
      error: false,
      message: 'Progreso actualizado exitosamente',
      progress: users[userIndex].progress
    });
    
  } catch (error) {
    console.error('Error en updateUserProgress:', error);
    return res.status(500).json({
      error: true,
      message: 'Error al actualizar progreso del usuario'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  protect,
  getUserProgress,
  updateUserProgress
};