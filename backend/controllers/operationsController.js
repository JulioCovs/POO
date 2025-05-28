// controllers/operationsController.js
// Controlador para manejar las operaciones matemáticas

/**
 * Calcular el resultado de una operación aritmética
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const calculateOperation = (req, res) => {
    try {
      const { operation, num1, num2 } = req.body;
      
      // Validar que se proporcionen todos los parámetros necesarios
      if (!operation || num1 === undefined || num2 === undefined) {
        return res.status(400).json({
          error: true,
          message: 'Se requieren los parámetros: operation, num1 y num2'
        });
      }
      
      // Validar que los números sean válidos
      if (isNaN(Number(num1)) || isNaN(Number(num2))) {
        return res.status(400).json({
          error: true,
          message: 'Los valores num1 y num2 deben ser números válidos'
        });
      }
      
      // Convertir a números
      const n1 = Number(num1);
      const n2 = Number(num2);
      let result;
      let steps = [];
      
      // Realizar la operación correspondiente
      switch (operation.toLowerCase()) {
        case 'suma':
          result = n1 + n2;
          steps = generateSumSteps(n1, n2);
          break;
          
        case 'resta':
          result = n1 - n2;
          steps = generateSubtractionSteps(n1, n2);
          break;
          
        case 'multiplicacion':
          result = n1 * n2;
          steps = generateMultiplicationSteps(n1, n2);
          break;
          
        case 'division':
          // Verificar división por cero
          if (n2 === 0) {
            return res.status(400).json({
              error: true,
              message: 'No se puede dividir por cero'
            });
          }
          result = n1 / n2;
          steps = generateDivisionSteps(n1, n2);
          break;
          
        default:
          return res.status(400).json({
            error: true,
            message: 'Operación no válida. Opciones: suma, resta, multiplicacion, division'
          });
      }
      
      // Devolver el resultado y los pasos
      return res.status(200).json({
        error: false,
        operation,
        num1: n1,
        num2: n2,
        result,
        steps
      });
      
    } catch (error) {
      console.error('Error en calculateOperation:', error);
      return res.status(500).json({
        error: true,
        message: 'Error al procesar la operación'
      });
    }
  };
  
  // Funciones auxiliares para generar los pasos de cada operación
  
  /**
   * Genera pasos explicativos para la suma
   * @param {number} n1 - Primer número
   * @param {number} n2 - Segundo número
   * @returns {Array} - Array de pasos
   */
  const generateSumSteps = (n1, n2) => {
    return [
      `Paso 1: Identificamos los números a sumar: ${n1} y ${n2}.`,
      `Paso 2: Sumamos los números ${n1} + ${n2}.`,
      `Paso 3: El resultado de la suma es ${n1 + n2}.`
    ];
  };
  
  /**
   * Genera pasos explicativos para la resta
   * @param {number} n1 - Primer número
   * @param {number} n2 - Segundo número
   * @returns {Array} - Array de pasos
   */
  const generateSubtractionSteps = (n1, n2) => {
    return [
      `Paso 1: Identificamos los números para la resta: ${n1} y ${n2}.`,
      `Paso 2: Restamos ${n2} de ${n1}: ${n1} - ${n2}.`,
      `Paso 3: El resultado de la resta es ${n1 - n2}.`
    ];
  };
  
  /**
   * Genera pasos explicativos para la multiplicación
   * @param {number} n1 - Primer número
   * @param {number} n2 - Segundo número
   * @returns {Array} - Array de pasos
   */
  const generateMultiplicationSteps = (n1, n2) => {
    return [
      `Paso 1: Identificamos los números a multiplicar: ${n1} y ${n2}.`,
      `Paso 2: Multiplicamos los números ${n1} × ${n2}.`,
      `Paso 3: El resultado de la multiplicación es ${n1 * n2}.`
    ];
  };
  
  /**
   * Genera pasos explicativos para la división
   * @param {number} n1 - Dividendo
   * @param {number} n2 - Divisor
   * @returns {Array} - Array de pasos
   */
  const generateDivisionSteps = (n1, n2) => {
    const quotient = n1 / n2;
    // Verificamos si el resultado tiene decimales
    const hasDecimal = !Number.isInteger(quotient);
    
    return [
      `Paso 1: Identificamos el dividendo (${n1}) y el divisor (${n2}).`,
      `Paso 2: Realizamos la división ${n1} ÷ ${n2}.`,
      hasDecimal 
        ? `Paso 3: El resultado de la división es ${quotient.toFixed(2)} (aproximado a 2 decimales).`
        : `Paso 3: El resultado de la división es ${quotient} (exacto).`
    ];
  };
  
  // Exportar las funciones del controlador
  module.exports = {
    calculateOperation
  };