module.exports = {
    // Otras configuraciones de ESLint
  
    plugins: ['babel'],
  
    // Reglas personalizadas para el plugin de ESLint de Babel
    rules: {
      'babel/no-await-in-loop': 'error',
      'babel/semi': 'error',
      // Otras reglas de ESLint
    },
  };