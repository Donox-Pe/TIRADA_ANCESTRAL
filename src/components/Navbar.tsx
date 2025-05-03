import React from 'react';
import { Box, Flex, Link, Button, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const Navbar: React.FC = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <Box bg="blue.500" px={4} py={2}>
      <Flex maxW="container.xl" mx="auto" justify="space-between" align="center">
        <Flex gap={4}>
          <Link as={RouterLink} to="/" color="white">
            Inicio
          </Link>
          <Link as={RouterLink} to="/game" color="white">
            Juego
          </Link>
          <Link as={RouterLink} to="/profile" color="white">
            Perfil
          </Link>
        </Flex>
        <Flex align="center" gap={4}>
          {account ? (
            <>
              <Text color="white">
                {account.slice(0, 6)}...{account.slice(-4)}
              </Text>
              <Button size="sm" onClick={disconnectWallet}>
                Desconectar
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={connectWallet}>
              Conectar Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 