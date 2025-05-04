import React from 'react';
import { Box, SimpleGrid, Text, VStack, Badge, Image, Button, HStack, useToast, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverHeader } from '@chakra-ui/react';
import { FaCoins, FaCrown, FaGuitar, FaStar, FaFire, FaGift, FaCheckCircle } from 'react-icons/fa';
import { useWeb3 } from '../context/Web3Context';
import frijolitoImg from '../img/Logos/frijolito.png';
import astrImg from '../img/Logos/ASTR.png';

const popoverColors = [
  'brand.verde',
  'brand.azul',
  'brand.rojo',
  'brand.dorado',
  'brand.azul',
];

const paquetes = [
  {
    nombre: 'Paquete Chilango',
    frijolitos: 100,
    precio: 0.5,
    moneda: 'ASTR',
    bonus: '',
    img: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
    copy: '¡Para empezar la fiesta! 🎉',
    beneficios: [
      'Ideal para probar suerte en la lotería',
      'Perfecto para partidas rápidas',
      '¡Empieza a ganar desde hoy!',
    ],
  },
  {
    nombre: 'Paquete Mariachi',
    frijolitos: 500,
    precio: 2.0,
    moneda: 'ASTR',
    bonus: '+10% extra',
    img: 'https://cdn-icons-png.flaticon.com/512/3075/3075972.png',
    copy: '¡Incluye 10% extra! 🎺',
    beneficios: [
      '10% de frijolitos extra',
      '¡Más oportunidades de ganar!',
      'Ideal para jugar con amigos',
    ],
  },
  {
    nombre: 'Paquete Fiesta',
    frijolitos: 1200,
    precio: 4.0,
    moneda: 'ASTR',
    bonus: '+20% más',
    img: 'https://cdn-icons-png.flaticon.com/512/3075/3075975.png',
    copy: '¡Llévate 20% más, solo hoy! 🥳',
    beneficios: [
      '20% de frijolitos extra',
      '¡Perfecto para largas jornadas!',
      'Participa en sorteos especiales',
    ],
  },
  {
    nombre: 'Paquete Millonario',
    frijolitos: 5000,
    precio: 15.0,
    moneda: 'ASTR',
    bonus: '+30% extra',
    img: 'https://cdn-icons-png.flaticon.com/512/3075/3075974.png',
    copy: '¡El rey de la lotería! 👑',
    beneficios: [
      '30% de frijolitos extra',
      'Acceso a torneos exclusivos',
      'Badge especial de Millonario',
    ],
  },
  {
    nombre: 'Paquete Leyenda',
    frijolitos: 15000,
    precio: 40.0,
    moneda: 'ASTR',
    bonus: '+50% y badge especial',
    img: 'https://cdn-icons-png.flaticon.com/512/3075/3075973.png',
    copy: '¡Oferta VIP! 🏆',
    beneficios: [
      '50% de frijolitos extra',
      'Badge Leyenda VIP',
      'Acceso anticipado a nuevas funciones',
      'Soporte prioritario',
    ],
  },
];

const ComprarFrijolitos: React.FC = () => {
  const toast = useToast();
  const { addFrijolitos } = useWeb3();

  const handleBuy = (paquete: any, moneda: string) => {
    addFrijolitos(paquete.frijolitos);
    toast({
      title: '¡Felicidades! 🎉',
      description: `¡Ahora tienes más frijolitos y ASTR! Eres más rico que el Chavo con torta de jamón. ¡A romper la piñata en la lotería!`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" py={10} px={4} bgGradient="linear(to-br, brand.verde 0%, brand.blanco 50%, brand.rojo 100%)">
      <VStack spacing={6} mb={10}>
        <Text fontFamily="heading" fontSize="4xl" color="brand.dorado" textShadow="2px 2px 8px #222">
          ¡Compra tus Frijolitos!
        </Text>
        <Badge colorScheme="yellow" fontSize="1.2em" px={4} py={2} borderRadius="full" boxShadow="md" bg="brand.dorado" color="brand.negro" fontWeight="bold">
          ELIGE TU PAQUETE FAVORITO Y PAGA CON ASTR
        </Badge>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} maxW="1100px" mx="auto">
        {paquetes.map((paq, idx) => (
          <Popover trigger="hover" placement="top" key={paq.nombre}>
            <PopoverTrigger>
              <Box
                bg="brand.blanco"
                borderRadius="2xl"
                boxShadow="2xl"
                p={8}
                color="brand.negro"
                textAlign="center"
                borderWidth="4px"
                borderColor="brand.dorado"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'dark-lg', borderColor: 'brand.verde' }}
                cursor="pointer"
              >
                <Image src={paq.img} alt={paq.nombre} boxSize={24} mx="auto" mb={4} />
                <Text fontFamily="heading" fontSize="2xl" mb={2} color="brand.verde">{paq.nombre}</Text>
                <Text fontSize="lg" mb={2} color="brand.azul">{paq.copy}</Text>
                <Text fontWeight="bold" fontSize="2xl" color="brand.rojo">{paq.frijolitos} Frijolitos</Text>
                {paq.bonus && <Badge colorScheme="yellow" fontSize="1em" px={3} py={1} borderRadius="full" bg="brand.dorado" color="brand.negro" mb={2}>{paq.bonus}</Badge>}
                <VStack justify="center" mt={6} spacing={4}>
                  <Button leftIcon={<img src={astrImg} alt="ASTR" style={{width: 28, height: 28}} />} colorScheme="yellow" borderRadius="full" fontWeight="bold" px={10} py={6} fontSize="xl" w="100%" maxW="320px" onClick={() => handleBuy(paq, 'ASTR')}>
                    Comprar con ASTR
                  </Button>
                </VStack>
              </Box>
            </PopoverTrigger>
            <PopoverContent bg="brand.blanco" borderColor={popoverColors[idx % popoverColors.length]} boxShadow="xl" p={4} borderRadius="2xl">
              <PopoverArrow bg={popoverColors[idx % popoverColors.length]} />
              <PopoverHeader fontWeight="bold" color={popoverColors[idx % popoverColors.length]} fontFamily="heading" fontSize="lg">
                Beneficios de {paq.nombre}
              </PopoverHeader>
              <PopoverBody>
                <VStack align="start" spacing={2}>
                  {paq.beneficios.map((b: string, i: number) => (
                    <HStack key={i} color={popoverColors[idx % popoverColors.length]}>
                      <FaCheckCircle />
                      <Text>{b}</Text>
                    </HStack>
                  ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ComprarFrijolitos; 