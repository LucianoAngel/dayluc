const express = require('express');

const autenticacion = require('./routes/login');

const songs = require('./routes/songs');

const tracks = require('./routes/tracks');

const router = express.Router();

router.use('/auth', autenticacion);

router.use('/songs', songs);

router.use('/tracks', tracks);

module.exports = router;
