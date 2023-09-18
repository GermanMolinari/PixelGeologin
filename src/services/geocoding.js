import axios from 'axios';

export async function obtenerZona(latitud, longitud, apiKey) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitud}+${longitud}&key=${apiKey}&language=es&pretty=1`;
    const response = await axios.get(url);
    const { results } = response.data;
    if (results.length > 0) {
      const primerResultado = results[0];
      const { formatted, components } = primerResultado;
      // formatted contiene la dirección completa y components tiene detalles como ciudad, provincia, país, etc.
      return formatted;
    } else {
      return 'No se encontraron resultados';
    }
  } catch (error) {
    console.error('Error al obtener la zona:', error);
    return 'Error al obtener la zona';
  }
}
