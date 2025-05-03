import React from 'react';
import { Box, SimpleGrid, Text, VStack, Badge, Icon } from '@chakra-ui/react';
import { FaLaughSquint, FaSkull, FaFutbol, FaUserNinja, FaSubway, FaBirthdayCake, FaDrumstickBite, FaTrophy, FaUserFriends, FaHatCowboy } from 'react-icons/fa';

const datosMexicanos = [
  {
    titulo: 'La Tlayuda Gigante',
    texto: '¿Sabías que la tlayuda oaxaqueña fue declarada el antojito más grande del mundo? ¡Ideal para compartir con toda la colonia (y la suegra)!',
    icon: FaDrumstickBite,
    color: 'brand.verde',
  },
  {
    titulo: 'El Santo y la Lucha Libre',
    texto: 'El Santo, Blue Demon y Tinieblas no solo luchaban en el ring, ¡también contra momias, vampiros y hasta marcianos! #CineDeOro',
    icon: FaUserNinja,
    color: 'brand.azul',
  },
  {
    titulo: 'El "No Era Penal"',
    texto: 'En 2014, todo México gritó: "¡No era penal!" y hasta la NASA escuchó el reclamo. ¡Nunca olvidaremos ese mundial!',
    icon: FaFutbol,
    color: 'brand.rojo',
  },
  {
    titulo: 'La Lotería y el Gallo',
    texto: 'En la lotería mexicana, si no gritas "¡El Gallo!" con voz de mariachi, no cuenta. ¡Pruébalo y verás la suerte!',
    icon: FaHatCowboy,
    color: 'brand.dorado',
  },
  {
    titulo: 'El Chavo y la Vecindad',
    texto: 'El Chavo del 8 nos enseñó que con una torta de jamón y una buena vecindad, la vida es más sabrosa. ¡Eso, eso, eso!',
    icon: FaUserFriends,
    color: 'brand.verde',
  },
  {
    titulo: 'Memes Mexicanos',
    texto: '¿Sabías que el meme de "Ya valió" es patrimonio nacional? Si no lo usas diario, ¿eres mexicano de verdad?',
    icon: FaLaughSquint,
    color: 'brand.azul',
  },
  {
    titulo: 'Día de Muertos',
    texto: 'Aquí celebramos a los que se fueron… ¡pero con pan de muerto, papel picado y hasta fiesta! Porque en México, ni la muerte nos quita lo bailado.',
    icon: FaSkull,
    color: 'brand.dorado',
  },
  {
    titulo: 'El Metro y sus Aventuras',
    texto: 'El Metro de CDMX: único lugar donde puedes ver a Spiderman, a Pikachu y a la señora vendiendo chicles… ¡todo en el mismo vagón!',
    icon: FaSubway,
    color: 'brand.rojo',
  },
  {
    titulo: 'El Pozole y la Familia',
    texto: 'El pozole no se come solo, se come con familia, amigos y hasta con el vecino que se coló. ¡Y siempre hay para todos!',
    icon: FaTrophy,
    color: 'brand.verde',
  },
  {
    titulo: 'La Quinceañera Viral',
    texto: '¿Recuerdas a Rubí? Su fiesta de XV años se volvió viral y ¡medio México quería ir! Aquí las fiestas son de todos.',
    icon: FaBirthdayCake,
    color: 'brand.azul',
  },
];

const Home: React.FC = () => {
  return (
    <Box minH="100vh" py={10} px={4} bgGradient="linear(to-br, brand.verde 0%, brand.blanco 50%, brand.rojo 100%)">
      <VStack spacing={6} mb={10}>
        <Text fontFamily="heading" fontSize="4xl" color="brand.dorado" textShadow="2px 2px 8px #222">
          Feria de Sabiduría Mexicana
        </Text>
        <Badge colorScheme="yellow" fontSize="1.2em" px={4} py={2} borderRadius="full" boxShadow="md" bg="brand.dorado" color="brand.negro">
          ¡Bienvenido! Disfruta y aprende con humor mexicano 🇲🇽
        </Badge>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="900px" mx="auto">
        {datosMexicanos.map((dato, idx) => (
          <Box
            key={dato.titulo}
            bg="brand.blanco"
            borderRadius="2xl"
            boxShadow="2xl"
            p={8}
            color={dato.color}
            textAlign="center"
            borderWidth="4px"
            borderColor={dato.color}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'dark-lg', borderColor: 'brand.dorado' }}
          >
            <Icon as={dato.icon} boxSize={14} mb={4} color={dato.color} />
            <Text fontFamily="heading" fontSize="2xl" mb={2}>{dato.titulo}</Text>
            <Text mb={4} color="brand.negro">{dato.texto}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home; 