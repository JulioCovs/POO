// controllers/resourcesController.js
// Controlador para gestionar recursos educativos como videos y actividades

// Base de datos simulada (en producción, esto vendría de MongoDB u otra base de datos)
const videos = [
    {
      id: 'v1',
      title: 'Aprendiendo a sumar',
      category: 'suma',
      description: 'Video explicativo sobre cómo realizar sumas básicas paso a paso',
      url: 'https://www.youtube.com/embed/example1',
      difficulty: 'basic'
    },
    {
      id: 'v2',
      title: 'Sumas con llevada',
      category: 'suma',
      description: 'Explicación detallada de cómo realizar sumas con llevada',
      url: 'https://www.youtube.com/embed/example2',
      difficulty: 'intermediate'
    },
    {
      id: 'v3',
      title: 'Introducción a la resta',
      category: 'resta',
      description: 'Video básico sobre cómo realizar restas simples',
      url: 'https://www.youtube.com/embed/example3',
      difficulty: 'basic'
    },
    {
      id: 'v4',
      title: 'Restas con préstamo',
      category: 'resta',
      description: 'Explicación paso a paso de restas que requieren préstamo',
      url: 'https://www.youtube.com/embed/example4',
      difficulty: 'intermediate'
    },
    {
      id: 'v5',
      title: 'Tablas de multiplicar',
      category: 'multiplicacion',
      description: 'Aprende las tablas de multiplicar del 1 al 10',
      url: 'https://www.youtube.com/embed/example5',
      difficulty: 'basic'
    },
    {
      id: 'v6',
      title: 'Multiplicación de varios dígitos',
      category: 'multiplicacion',
      description: 'Cómo multiplicar números de varios dígitos',
      url: 'https://www.youtube.com/embed/example6',
      difficulty: 'intermediate'
    },
    {
      id: 'v7',
      title: 'División básica',
      category: 'division',
      description: 'Conceptos básicos de la división',
      url: 'https://www.youtube.com/embed/example7',
      difficulty: 'basic'
    },
    {
      id: 'v8',
      title: 'División con residuo',
      category: 'division',
      description: 'Cómo manejar divisiones que tienen residuo',
      url: 'https://www.youtube.com/embed/example8',
      difficulty: 'intermediate'
    }
  ];
  
  const activities = [
    {
      id: 'a1',
      title: 'Práctica de sumas',
      category: 'suma',
      description: 'Ejercicios interactivos para practicar sumas básicas',
      url: '/activities/suma-basica.html',
      difficulty: 'basic'
    },
    {
      id: 'a2',
      title: 'Reto de sumas rápidas',
      category: 'suma',
      description: 'Actividad cronometrada para practicar sumas mentales',
      url: '/activities/sumas-rapidas.html',
      difficulty: 'intermediate'
    },
    {
      id: 'a3',
      title: 'Práctica de restas',
      category: 'resta',
      description: 'Ejercicios interactivos para practicar restas',
      url: '/activities/resta-basica.html',
      difficulty: 'basic'
    },
    {
      id: 'a4',
      title: 'Juego de multiplicación',
      category: 'multiplicacion',
      description: 'Juego para reforzar las tablas de multiplicar',
      url: '/activities/multiplicacion-juego.html',
      difficulty: 'basic'
    },
    {
      id: 'a5',
      title: 'Reto de divisiones',
      category: 'division',
      description: 'Actividad para practicar divisiones básicas',
      url: '/activities/division-basica.html',
      difficulty: 'basic'
    }
  ];
  
  /**
   * Obtener videos educativos filtrados por categoría y/o dificultad
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  const getVideos = (req, res) => {
    try {
      const { category, difficulty } = req.query;
      
      let filteredVideos = [...videos];
      
      // Aplicar filtros si se proporcionan
      if (category) {
        filteredVideos = filteredVideos.filter(
          video => video.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      if (difficulty) {
        filteredVideos = filteredVideos.filter(
          video => video.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
      }
      
      return res.status(200).json({
        error: false,
        count: filteredVideos.length,
        videos: filteredVideos
      });
      
    } catch (error) {
      console.error('Error en getVideos:', error);
      return res.status(500).json({
        error: true,
        message: 'Error al obtener los videos'
      });
    }
  };
  
  /**
   * Obtener actividades interactivas filtradas por categoría y/o dificultad
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  const getActivities = (req, res) => {
    try {
      const { category, difficulty } = req.query;
      
      let filteredActivities = [...activities];
      
      // Aplicar filtros si se proporcionan
      if (category) {
        filteredActivities = filteredActivities.filter(
          activity => activity.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      if (difficulty) {
        filteredActivities = filteredActivities.filter(
          activity => activity.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
      }
      
      return res.status(200).json({
        error: false,
        count: filteredActivities.length,
        activities: filteredActivities
      });
      
    } catch (error) {
      console.error('Error en getActivities:', error);
      return res.status(500).json({
        error: true,
        message: 'Error al obtener las actividades'
      });
    }
  };
  
  // Exportar las funciones del controlador
  module.exports = {
    getVideos,
    getActivities
  };