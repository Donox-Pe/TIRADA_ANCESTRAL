import React from 'react';
import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';

const Home: React.FC = () => {
  const { account, connectWallet } = useWeb3();

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center">
        <Heading size="2xl">Lotería NFT</Heading>
        <Text fontSize="xl" textAlign="center">
          Juega la tradicional lotería mexicana con NFTs en la blockchain
        </Text>
        {!account ? (
          <Button onClick={connectWallet} colorScheme="blue" size="lg">
            Conectar Wallet
          </Button>
        ) : (
          <Box>
            <Text>Cuenta conectada: {account}</Text>
            <Button mt={4} colorScheme="green" size="lg">
              Ir al Juego
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Home; 