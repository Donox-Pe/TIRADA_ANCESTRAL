import React from 'react';
import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';

const Game: React.FC = () => {
  const { account, connectWallet } = useWeb3();

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading>Juego de Lotería</Heading>
        {!account ? (
          <Button onClick={connectWallet} colorScheme="blue">
            Conectar Wallet
          </Button>
        ) : (
          <Box>
            <Text>Cuenta conectada: {account}</Text>
            <Button mt={4} colorScheme="green">
              Comprar Tablero
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Game; 