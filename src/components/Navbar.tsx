import React from 'react';
import { Box, Flex, Text, Button, Spacer, HStack, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaGuitar, FaWallet } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <Box
      bgGradient="linear(to-r, brand.600, brand.900, brand.700)"
      px={8}
      py={4}
      boxShadow="md"
      borderBottom="6px solid #FFD700"
    >
      <Flex align="center">
        <HStack spacing={3}>
          <Icon as={FaGuitar} color="yellow.400" boxSize={8} />
          <Text fontFamily="heading" fontSize="2xl" color="white" fontWeight="bold" letterSpacing={2}>
            Tirada Ancestral
          </Text>
        </HStack>
        <Spacer />
        <HStack spacing={6}>
          <Button as={Link} to="/" variant="ghost" color="white" fontWeight="bold" _hover={{ bg: 'brand.700', color: 'yellow.300' }}>
            Inicio
          </Button>
          <Button as={Link} to="/game" variant="ghost" color="white" fontWeight="bold" _hover={{ bg: 'brand.700', color: 'yellow.300' }}>
            Jugar Lotería
          </Button>
          <Button as={Link} to="/profile" leftIcon={<FaWallet />} colorScheme="yellow" borderRadius="full" fontWeight="bold">
            Mi Wallet
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 