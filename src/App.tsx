import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Profile from './pages/Profile';
import ComprarFrijolitos from './pages/ComprarFrijolitos';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/comprar-frijolitos" element={<ComprarFrijolitos />} />
          </Routes>
        </Router>
      </Web3Provider>
    </ChakraProvider>
  );
};

export default App; 