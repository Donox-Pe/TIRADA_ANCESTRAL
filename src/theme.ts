import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Luckiest Guy', 'Montserrat', cursive, sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  colors: {
    brand: {
      verde: '#006341', // Verde bandera
      blanco: '#FFFFFF',
      rojo: '#C1272D', // Rojo bandera
      dorado: '#FFD700', // Dorado
      negro: '#222222', // Para contraste
      verdeClaro: '#4CAF50',
      rojoClaro: '#FF6F61',
      azul: '#0033A0', // Azul rey para detalles
    },
    fondo: {
      100: '#f4f4f4',
      200: '#e9ecef',
      300: '#ffffff',
    },
  },
  styles: {
    global: {
      body: {
        bgGradient: 'linear(to-br, brand.verde 0%, brand.blanco 50%, brand.rojo 100%)',
        color: 'brand.negro',
      },
    },
  },
});

export default theme; 