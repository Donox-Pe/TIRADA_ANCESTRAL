import React from 'react';
import { Box, VStack, Text, SimpleGrid, Stat, StatLabel, StatNumber, Button } from '@chakra-ui/react';
import { useWeb3 } from '../contexts/Web3Context';

const Profile: React.FC = () => {
  const { account, balance } = useWeb3();

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold">Mi Perfil</Text>
          <Text mt={2}>Wallet: {account}</Text>
          <Text>Balance: {balance} ASTR</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
            <StatLabel>Partidas Jugadas</StatLabel>
            <StatNumber>0</StatNumber>
          </Stat>
          <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
            <StatLabel>Partidas Ganadas</StatLabel>
            <StatNumber>0</StatNumber>
          </Stat>
          <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
            <StatLabel>Frijolitos</StatLabel>
            <StatNumber>0</StatNumber>
          </Stat>
        </SimpleGrid>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Mis NFTs</Text>
          <Text>No tienes NFTs aún</Text>
        </Box>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Historial de Juegos</Text>
          <Text>No hay historial de juegos</Text>
        </Box>

        <Button colorScheme="blue" size="lg">
          Retirar Fondos
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile; 