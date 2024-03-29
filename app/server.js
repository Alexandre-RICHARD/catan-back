const express = require('express');
require('dotenv').config();
const router = require('./router');
const cors = require('cors');

const app = express();
app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:8080"],
  }
});

app.set('socketio', io);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(router);
app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API de mon projet de jeu de Catan avec un C. IL n'y a rien à voir ici à priori.")
})

io.on('connection', (socket) => {
    console.log(`ID : ${socket.id} -> IN`)
});

const PORT = process.env.PORT;
const start = () => {
    server.listen(PORT, () => {
        console.log(`Notre serveur fonctionne bien sur le port ${PORT}.`);
    });
}

module.exports = {
    start
};