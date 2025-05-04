import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface NFT {
  id: number;
  name: string;
  image: string;
  date: string;
}

interface Web3ContextType {
  account: string | null;
  balance: string; // Saldo real de la wallet
  frijolitos: number; // Saldo virtual de frijolitos
  astrVirtual: number; // Saldo virtual de ASTR por compras
  gamesPlayed: number;
  gamesWon: number;
  nfts: NFT[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addFrijolitos: (cantidad: number) => void;
  updateGameStats: (won: boolean) => void;
  addNFT: (nft: NFT) => void;
  withdrawFunds: (amount: number) => void;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  balance: '0',
  frijolitos: 0,
  astrVirtual: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  nfts: [],
  connectWallet: async () => {},
  disconnectWallet: () => {},
  addFrijolitos: () => {},
  updateGameStats: () => {},
  addNFT: () => {},
  withdrawFunds: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [frijolitos, setFrijolitos] = useState<number>(0);
  const [astrVirtual, setAstrVirtual] = useState<number>(0);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [gamesWon, setGamesWon] = useState<number>(0);
  const [nfts, setNfts] = useState<NFT[]>([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('Error al conectar con MetaMask:', error);
      }
    } else {
      alert('Por favor instala MetaMask para usar esta aplicación');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0');
  };

  // Función para agregar frijolitos y su equivalente en ASTR virtual
  const addFrijolitos = (cantidad: number) => {
    setFrijolitos(prev => prev + cantidad);
    setAstrVirtual(prev => prev + cantidad * 0.05); // 100 frijolitos = 5 ASTR
  };

  // Función para actualizar estadísticas de juego
  const updateGameStats = (won: boolean) => {
    setGamesPlayed(prev => prev + 1);
    if (won) {
      setGamesWon(prev => prev + 1);
    }
  };

  // Función para agregar un NFT
  const addNFT = (nft: NFT) => {
    setNfts(prev => [...prev, nft]);
  };

  // Función para retirar fondos
  const withdrawFunds = (amount: number) => {
    if (amount <= 0 || amount > astrVirtual) return;
    
    // Convertir ASTR a frijolitos (5 ASTR = 100 frijolitos)
    const frijolitosToRemove = amount * 20;
    
    setAstrVirtual(prev => prev - amount);
    setFrijolitos(prev => prev - frijolitosToRemove);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{ 
      account, 
      balance, 
      frijolitos, 
      astrVirtual, 
      gamesPlayed, 
      gamesWon,
      nfts,
      connectWallet, 
      disconnectWallet, 
      addFrijolitos,
      updateGameStats,
      addNFT,
      withdrawFunds
    }}>
      {children}
    </Web3Context.Provider>
  );
}; 