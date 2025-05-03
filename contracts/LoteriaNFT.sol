// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LoteriaNFT is ERC721, Ownable {
    using Strings for uint256;

    struct Carta {
        string nombre;
        string descripcion;
        string uri;
        bool esNFT;
    }

    struct Tablero {
        uint256[] cartas;
        address jugador;
        bool activo;
    }

    struct Partida {
        uint256[] cartasReveladas;
        uint256 pozo;
        uint256 precioTablero;
        bool enProgreso;
    }

    mapping(uint256 => Carta) public cartas;
    mapping(uint256 => Tablero) public tableros;
    mapping(uint256 => Partida) public partidas;
    mapping(address => uint256) public balances;

    uint256 private _nextTokenId;
    uint256 public partidaActual;
    uint256 public constant MAX_CARTAS = 54;
    uint256 public constant PRECIO_TABLERO = 10 ether;

    event NuevaPartida(uint256 partidaId);
    event CartaRevelada(uint256 partidaId, uint256 cartaId);
    event Ganador(uint256 partidaId, address jugador, uint256 premio);

    constructor() ERC721("LoteriaNFT", "LOT") Ownable(msg.sender) {}

    function crearPartida() external onlyOwner {
        partidaActual++;
        partidas[partidaActual] = Partida({
            cartasReveladas: new uint256[](0),
            pozo: 0,
            precioTablero: PRECIO_TABLERO,
            enProgreso: true
        });
        emit NuevaPartida(partidaActual);
    }

    function comprarTablero(uint256 _partidaId) external payable {
        require(partidas[_partidaId].enProgreso, "Partida no esta activa");
        require(msg.value == PRECIO_TABLERO, "Precio es incorrecto");

        uint256 tableroId = _nextTokenId++;

        uint256[] memory cartasTablero = new uint256[](16);
        // Aqui se implementara la logica para asignar cartas aleatorias al tablero

        tableros[tableroId] = Tablero({
            cartas: cartasTablero,
            jugador: msg.sender,
            activo: true
        });

        partidas[_partidaId].pozo += msg.value;
        _mint(msg.sender, tableroId);
    }

    function revelarCarta(uint256 _partidaId, uint256 _cartaId) external onlyOwner {
        require(partidas[_partidaId].enProgreso, "Partida no esta activa");
        partidas[_partidaId].cartasReveladas.push(_cartaId);
        emit CartaRevelada(_partidaId, _cartaId);
    }

    function verificarGanador(uint256 _partidaId, uint256 _tableroId) external {
        require(partidas[_partidaId].enProgreso, "Partida no esta activa");
        require(ownerOf(_tableroId) == msg.sender, "No eres el dueno del tablero");

        Tablero storage tablero = tableros[_tableroId];
        uint256[] memory cartasReveladas = partidas[_partidaId].cartasReveladas;
        
        // Aqui se implementara la logica para verificar si hay ganador
        bool esGanador = false;
        
        if (esGanador) {
            uint256 premio = (partidas[_partidaId].pozo * 60) / 100;
            balances[msg.sender] += premio;
            emit Ganador(_partidaId, msg.sender, premio);
        }
    }

    function retirarFondos() external {
        require(balances[msg.sender] > 0, "Sin fondos para retirar");
        uint256 monto = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(monto);
    }

    function agregarCarta(string memory _nombre, string memory _descripcion, string memory _uri, bool _esNFT) external onlyOwner {
        uint256 cartaId = _nextTokenId++;
        
        cartas[cartaId] = Carta({
            nombre: _nombre,
            descripcion: _descripcion,
            uri: _uri,
            esNFT: _esNFT
        });
    }
} 