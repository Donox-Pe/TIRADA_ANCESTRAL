import React, { useState } from 'react';
import { Box, VStack, Text, SimpleGrid, Stat, StatLabel, StatNumber, Button, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, Input, HStack, useToast } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';
import frijolitoImg from '../img/Logos/frijolito.png';
import astrImg from '../img/Logos/ASTR.png';

const Profile: React.FC = () => {
  const { account, balance, frijolitos, astrVirtual, gamesPlayed, gamesWon, nfts, withdrawFunds } = useWeb3();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const toast = useToast();

  const handleWithdraw = () => {
    if (withdrawAmount <= 0 || withdrawAmount > astrVirtual) {
      toast({
        title: "Error",
        description: "Cantidad inválida para retirar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Retirar los fondos
    withdrawFunds(withdrawAmount);

    toast({
      title: "¡Fondos retirados con éxito! 🎉",
      description: "¡Tus ASTR están más seguros que el Chavo en su barril! 🛢️",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold">Mi Perfil</Text>
          <Text mt={2}>Wallet: {account}</Text>
          <Text color="brand.verde">Frijolitos: <img src={frijolitoImg} alt="frijolito" style={{width: 20, height: 20, display: 'inline', verticalAlign: 'middle'}} /> {frijolitos}</Text>
          <Text color="brand.azul">ASTR virtual: <img src={astrImg} alt="ASTR" style={{width: 20, height: 20, display: 'inline', verticalAlign: 'middle'}} /> {astrVirtual.toFixed(2)}</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
            <StatLabel>Partidas Jugadas</StatLabel>
            <StatNumber>{gamesPlayed}</StatNumber>
          </Stat>
          <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
            <StatLabel>Partidas Ganadas</StatLabel>
            <StatNumber>{gamesWon}</StatNumber>
          </Stat>
          <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
            <StatLabel>Frijolitos</StatLabel>
            <StatNumber><img src={frijolitoImg} alt="frijolito" style={{width: 20, height: 20, display: 'inline', verticalAlign: 'middle'}} /> {frijolitos}</StatNumber>
          </Stat>
        </SimpleGrid>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Mis NFTs</Text>
          {nfts.length === 0 ? (
            <Text>No tienes NFTs aún</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {nfts.map((nft) => (
                <Box
                  key={nft.id}
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="md"
                  border="2px solid"
                  borderColor="brand.dorado"
                >
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    borderRadius="md"
                    boxShadow="md"
                    mx="auto"
                    maxH="200px"
                  />
                  <Text mt={2} fontWeight="bold" color="brand.500" fontFamily="heading">
                    {nft.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Ganado el: {nft.date}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Historial de Juegos</Text>
          <Text>No hay historial de juegos</Text>
        </Box>

        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={onOpen}
          leftIcon={<img src={astrImg} alt="ASTR" style={{width: 24, height: 24}} />}
        >
          Retirar Fondos
        </Button>

        {/* Modal de retiro */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Retirar Fondos</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Text>Saldo disponible: {astrVirtual.toFixed(2)} ASTR</Text>
                <HStack>
                  <Button onClick={() => setWithdrawAmount(Math.max(0, withdrawAmount - 1))}>-1</Button>
                  <Input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    min={0}
                    max={astrVirtual}
                    width="100px"
                    textAlign="center"
                  />
                  <Button onClick={() => setWithdrawAmount(Math.min(astrVirtual, withdrawAmount + 1))}>+1</Button>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  Cantidad a retirar: {withdrawAmount} ASTR
                </Text>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="green" onClick={handleWithdraw}>
                Confirmar Retiro
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default Profile; 