import React from 'react';
import { Container, VStack } from '@chakra-ui/react';
import LoteriaGame from '../components/LoteriaGame';

const Game: React.FC = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <LoteriaGame />
      </VStack>
    </Container>
  );
};

export default Game; 