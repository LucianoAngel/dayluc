const express = require('express');

const router = express.Router();

const { obtenerSong, enviarSong } = require('../controllers/controladorcanciones');

router.get('/tracks/:id', obtenerSong);

router.post('/tracks', enviarSong);

module.exports = router;
