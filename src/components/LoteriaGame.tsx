import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Text, VStack, HStack, useToast, Badge, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useWeb3 } from '../context/Web3Context';
import { FaCoins } from 'react-icons/fa';

interface Card {
  id: number;
  name: string;
  image: string;
  isMarked: boolean;
}

interface Player {
  account: string;
  balance: number;
  tables: number[][];
}

const borderAnim = keyframes`
  0% { box-shadow: 0 0 0 0 #FFD700; }
  50% { box-shadow: 0 0 24px 8px #FFD700; }
  100% { box-shadow: 0 0 0 0 #FFD700; }
`;

const LoteriaGame: React.FC = () => {
  const { account, connectWallet } = useWeb3();
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [frijolitos, setFrijolitos] = useState<number>(0);
  const [tables, setTables] = useState<number[][]>([]);
  const toast = useToast();

  // Inicializar el juego
  const startGame = () => {
    if (!account) {
      toast({
        title: "Error",
        description: "Debes conectar tu wallet primero",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (frijolitos < 10) {
      toast({
        title: "Error",
        description: "No tienes suficientes frijolitos para comprar una tabla",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setGameState('playing');
    setFrijolitos(prev => prev - 10);
    // Aquí se inicializaría la tabla del jugador
  };

  // Comprar frijolitos
  const buyFrijolitos = (amount: number) => {
    if (!account) {
      toast({
        title: "Error",
        description: "Debes conectar tu wallet primero",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // Aquí se implementaría la lógica para comprar frijolitos con criptomonedas
    setFrijolitos(prev => prev + amount);
  };

  // Marcar carta en la tabla
  const markCard = (cardId: number) => {
    if (gameState !== 'playing') return;
    // Aquí se implementaría la lógica para marcar la carta
  };

  // Demo de cartas (puedes reemplazar con tus imágenes reales)
  const cartasDemo = [
    { id: 1, name: 'El Gallo', image: '/src/img/Cartas/EL GALLO.jpg', isMarked: false },
    { id: 2, name: 'El Diablo', image: '/src/img/Cartas/EL DIABLO.png', isMarked: false },
    { id: 3, name: 'La Dama', image: '/src/img/Cartas/LA DAMA.png', isMarked: false },
    { id: 4, name: 'El Catrín', image: '', isMarked: false },
    { id: 5, name: 'El Paraguas', image: '', isMarked: false },
    { id: 6, name: 'La Sirena', image: '', isMarked: false },
    { id: 7, name: 'La Escalera', image: '', isMarked: false },
    { id: 8, name: 'La Botella', image: '', isMarked: false },
    { id: 9, name: 'El Barril', image: '', isMarked: false },
    { id: 10, name: 'El Árbol', image: '', isMarked: false },
    { id: 11, name: 'El Melón', image: '', isMarked: false },
    { id: 12, name: 'El Valiente', image: '', isMarked: false },
    // ...agrega el resto de cartas aquí
  ];

  return (
    <Box p={4} bgGradient="linear(to-br, fondo.100, brand.100, fondo.200)" borderRadius="2xl" boxShadow="2xl">
      <VStack spacing={8}>
        {/* Estado de la cuenta y saldo */}
        <HStack spacing={4} w="full" justify="space-between">
          {!account ? (
            <Button onClick={connectWallet} colorScheme="yellow" leftIcon={<FaCoins />} fontWeight="bold">
              Conectar Wallet
            </Button>
          ) : (
            <Text fontWeight="bold" color="brand.900">Cuenta: {account}</Text>
          )}
          <Badge colorScheme="yellow" fontSize="1.1em" px={4} py={2} borderRadius="full" boxShadow="md">
            <HStack><FaCoins /> <span>{frijolitos} Frijolitos</span></HStack>
          </Badge>
          <Button onClick={() => buyFrijolitos(100)} colorScheme="pink" borderRadius="full" fontWeight="bold">
            Comprar 100 Frijolitos
          </Button>
        </HStack>

        {/* Tablero de juego */}
        {gameState === 'waiting' && (
          <Button onClick={startGame} colorScheme="purple" size="lg" borderRadius="full" fontWeight="bold" boxShadow="lg">
            Iniciar Juego (10 Frijolitos)
          </Button>
        )}

        {gameState === 'playing' && (
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {cartasDemo.map((carta, idx) => (
              <Box
                key={carta.id}
                bgGradient="linear(to-br, brand.50, brand.200, fondo.200)"
                borderRadius="2xl"
                border="4px solid #FFD700"
                boxShadow="xl"
                p={2}
                textAlign="center"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.08)', boxShadow: '2xl', animation: `${borderAnim} 1s infinite` }}
              >
                {carta.image ? (
                  <Image src={carta.image} alt={carta.name} borderRadius="md" boxShadow="md" mx="auto" maxH="120px" />
                ) : (
                  <Box bg="gray.200" borderRadius="md" h="120px" display="flex" alignItems="center" justifyContent="center" color="gray.500" fontWeight="bold">
                    Próximamente
                  </Box>
                )}
                <Text mt={2} fontWeight="bold" color="brand.500" fontFamily="heading" fontSize="lg">
                  {carta.name}
                </Text>
              </Box>
            ))}
          </Grid>
        )}

        {/* Carta actual */}
        {currentCard && (
          <Box borderWidth="4px" borderColor="brand.600" borderRadius="2xl" p={4} bg="white" boxShadow="2xl">
            <Text fontSize="2xl" fontWeight="bold" color="brand.900" fontFamily="heading">{currentCard.name}</Text>
            <Image 
              src={currentCard.image} 
              alt={currentCard.name}
              borderRadius="lg"
              boxShadow="lg"
              my={4}
              maxH="200px"
              mx="auto"
            />
          </Box>
        )}

        {/* Controles del juego */}
        {gameState === 'playing' && (
          <HStack spacing={4}>
            <Button onClick={() => markCard(0)} colorScheme="yellow" borderRadius="full" fontWeight="bold">
              Marcar Carta
            </Button>
            <Button onClick={() => setGameState('finished')} colorScheme="red" borderRadius="full" fontWeight="bold">
              Terminar Juego
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default LoteriaGame; 