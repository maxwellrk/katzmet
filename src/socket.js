import clientSocket from 'socket.io-client';

const socketInstance = clientSocket('http://localhost:3000');

export default socketInstance;
