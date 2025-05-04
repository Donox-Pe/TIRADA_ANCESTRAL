import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Text, VStack, HStack, useToast, Badge, Image as ChakraImage, Input, SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useWeb3 } from '../context/Web3Context';
import { FaCoins } from 'react-icons/fa';
import frijolitoImg from '../img/Logos/frijolito.png';
import elGallo from '../img/Cartas/EL_GALLO.jpg';
import elDiablo from '../img/Cartas/EL_DIABLO.jpg';
import laDama from '../img/Cartas/LA_DAMA.jpg';
import elBilletero from '../img/Cartas/EL_BILLETERO.jpg';
import elCriptocharro from '../img/Cartas/EL_CRIPTOCHARRO.jpg';
import laCybersirena from '../img/Cartas/LA_CYBERSIRENA.jpg';
import elHacker from '../img/Cartas/EL_HACKER.jpg';
import elSoldado from '../img/Cartas/EL_SOLDADO.jpg';
import laReina from '../img/Cartas/LA_REINA.jpg';
import { Link } from 'react-router-dom';

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

const cartas = [
  { nombre: 'El Gallo', imagen: elGallo },
  { nombre: 'El Diablo', imagen: elDiablo },
  { nombre: 'La Dama', imagen: laDama },
  { nombre: 'El Billetero', imagen: elBilletero },
  { nombre: 'El Criptocharro', imagen: elCriptocharro },
  { nombre: 'La Cybersirena', imagen: laCybersirena },
  { nombre: 'El Hacker', imagen: elHacker },
  { nombre: 'El Soldado', imagen: elSoldado },
  { nombre: 'La Reina', imagen: laReina }
];

const borderAnim = keyframes`
  0% { box-shadow: 0 0 0 0 #FFD700; }
  50% { box-shadow: 0 0 24px 8px #FFD700; }
  100% { box-shadow: 0 0 0 0 #FFD700; }
`;

const LoteriaGame: React.FC = () => {
  const { account, connectWallet, frijolitos, astrVirtual, addFrijolitos, gamesPlayed, gamesWon, updateGameStats, addNFT } = useWeb3();
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [tables, setTables] = useState<number[][]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [showBetModal, setShowBetModal] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [result, setResult] = useState<{ won: boolean; message: string; selectedCard: number; drawnCard: number } | null>(null);
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
        description: "No tienes suficientes frijolitos para jugar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setGameState('playing');
  };

  // Seleccionar carta
  const selectCard = (index: number) => {
    if (gameState !== 'playing') return;
    setSelectedCard(index);
    setShowBetModal(true);
  };

  // Realizar apuesta
  const placeBet = () => {
    if (!selectedCard || betAmount < 100 || betAmount > frijolitos) {
      toast({
        title: "Error",
        description: "Apuesta inválida",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simular sorteo de carta
    const drawnCard = Math.floor(Math.random() * cartas.length);
    const won = drawnCard === selectedCard;
    
    updateGameStats(won);
    if (won) {
      addFrijolitos(betAmount * 2); // Duplicar la apuesta como ganancia
      
      // Agregar NFT
      addNFT({
        id: Date.now(),
        name: cartas[selectedCard].nombre,
        image: cartas[selectedCard].imagen,
        date: new Date().toLocaleDateString()
      });
    }

    setResult({
      won,
      message: won 
        ? "¡Felicidades! ¡Has ganado! 🎉" 
        : "¡Ay caramba! No fue esta vez. ¡Suerte para la próxima! 😅",
      selectedCard,
      drawnCard
    });

    setShowBetModal(false);
    setShowResultModal(true);
  };

  const handlePlayAgain = () => {
    setShowResultModal(false);
    setResult(null);
    setSelectedCard(null);
    setBetAmount(100);
  };

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
            <HStack><img src={frijolitoImg} alt="frijolito" style={{width: 24, height: 24}} /> <span>{frijolitos} Frijolitos</span></HStack>
          </Badge>
        </HStack>

        {/* Estadísticas */}
        <SimpleGrid columns={2} spacing={4} w="full">
          <Stat p={4} bg="white" borderRadius="lg" boxShadow="md">
            <StatLabel>Partidas Jugadas</StatLabel>
            <StatNumber>{gamesPlayed}</StatNumber>
          </Stat>
          <Stat p={4} bg="white" borderRadius="lg" boxShadow="md">
            <StatLabel>Partidas Ganadas</StatLabel>
            <StatNumber>{gamesWon}</StatNumber>
          </Stat>
        </SimpleGrid>

        {/* Tablero de juego */}
        {gameState === 'waiting' && (
          <Button onClick={startGame} colorScheme="purple" size="lg" borderRadius="full" fontWeight="bold" boxShadow="lg">
            Iniciar Juego
          </Button>
        )}

        {gameState === 'playing' && (
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {cartas.map((carta, idx) => (
              <Box
                key={carta.nombre}
                bgGradient="linear(to-br, brand.50, brand.200, fondo.200)"
                borderRadius="2xl"
                border={`4px solid ${selectedCard === idx ? '#FF0000' : '#FFD700'}`}
                boxShadow="xl"
                p={2}
                textAlign="center"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.08)', boxShadow: '2xl', animation: `${borderAnim} 1s infinite` }}
                onClick={() => selectCard(idx)}
                cursor="pointer"
              >
                <ChakraImage src={carta.imagen} alt={carta.nombre} borderRadius="md" boxShadow="md" mx="auto" maxH="120px" />
                <Text mt={2} fontWeight="bold" color="brand.500" fontFamily="heading" fontSize="lg">
                  {carta.nombre}
                </Text>
              </Box>
            ))}
          </Grid>
        )}

        {/* Modal de apuesta */}
        {showBetModal && (
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="2xl"
            zIndex={1000}
          >
            <VStack spacing={4}>
              <Text fontSize="xl" fontWeight="bold">Apostar por {cartas[selectedCard!].nombre}</Text>
              <Text>Frijolitos disponibles: {frijolitos}</Text>
              <HStack>
                <Button onClick={() => setBetAmount(Math.max(100, betAmount - 100))}>-100</Button>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  min={100}
                  max={frijolitos}
                  width="100px"
                  textAlign="center"
                />
                <Button onClick={() => setBetAmount(Math.min(frijolitos, betAmount + 100))}>+100</Button>
              </HStack>
              <HStack spacing={4}>
                <Button onClick={placeBet} colorScheme="green">Apostar</Button>
                <Button onClick={() => setShowBetModal(false)} colorScheme="red">Cancelar</Button>
              </HStack>
            </VStack>
          </Box>
        )}

        {/* Modal de resultado */}
        {showResultModal && result && (
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="2xl"
            zIndex={1000}
          >
            <VStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color={result.won ? "green.500" : "red.500"}>
                {result.message}
              </Text>
              
              <HStack spacing={8}>
                <VStack>
                  <Text fontWeight="bold">Tu elección:</Text>
                  <ChakraImage src={cartas[result.selectedCard].imagen} alt={cartas[result.selectedCard].nombre} maxH="120px" />
                  <Text>{cartas[result.selectedCard].nombre}</Text>
                </VStack>
                
                <VStack>
                  <Text fontWeight="bold">Carta sorteada:</Text>
                  <ChakraImage src={cartas[result.drawnCard].imagen} alt={cartas[result.drawnCard].nombre} maxH="120px" />
                  <Text>{cartas[result.drawnCard].nombre}</Text>
                </VStack>
              </HStack>

              <Text fontSize="lg">
                Apuesta: {betAmount} frijolitos ({betAmount * 0.05} ASTR)
              </Text>

              {result.won && (
                <Text fontSize="lg" color="green.500" fontWeight="bold">
                  ¡Ganaste {betAmount * 2} frijolitos! ({betAmount * 0.1} ASTR)
                </Text>
              )}

              <HStack spacing={4}>
                <Button onClick={handlePlayAgain} colorScheme="green">Volver a Apostar</Button>
                <Button as={Link} to="/profile" colorScheme="blue">Ir a Mi Wallet</Button>
              </HStack>
            </VStack>
          </Box>
        )}

        {/* Controles del juego */}
        {gameState === 'playing' && (
          <HStack spacing={4}>
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