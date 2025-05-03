import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface Web3ContextType {
  account: string | null;
  balance: string; // Saldo real de la wallet
  frijolitos: number; // Saldo virtual de frijolitos
  astrVirtual: number; // Saldo virtual de ASTR por compras
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addFrijolitos: (cantidad: number) => void;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  balance: '0',
  frijolitos: 0,
  astrVirtual: 0,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  addFrijolitos: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [frijolitos, setFrijolitos] = useState<number>(0);
  const [astrVirtual, setAstrVirtual] = useState<number>(0);

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
    setAstrVirtual(prev => prev + cantidad * 0.2); // 100 frijolitos = 20 ASTR
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
    <Web3Context.Provider value={{ account, balance, frijolitos, astrVirtual, connectWallet, disconnectWallet, addFrijolitos }}>
      {children}
    </Web3Context.Provider>
  );
}; 