const express = require('express');

const { SONGS } = require('../config/bd');

const router = express.Router();

const auth = require('../controllers/auth');

const {
  leerProductos, leerProductosAutor
} = require('../controllers/funcionalidad');

// obtener las canciones
router.get('/', auth, async (req, res) => {
  leerProductos()
    .then((items) => res.status(200).send(items))
    .catch((err) => res.status(400).send(err));
});
// Leer cancion por autor
router.get('/autor', auth, async (req, res) => {
  const {username} = req.session.usuario
  leerProductosAutor(username)
    .then((items) => res.status(200).send(items))
    .catch((err) => res.status(400).send(err));
});

// actualizar nombre de cancion
router.put('/:id',auth, async (req, res, next) => {
  try {
    const {id} = req.params;
    const {trackName} = req.body
    const item = await SONGS.findOne({
      _id: id
    });
    if (!item) return res.status(400).send('cancion no encontrada');
    await SONGS.update({
      _id: id
    }, { $set: {
      filename: trackName
    }});
    return res.status(200).send('OK');
  } catch (error) {
    next(error);
  }
});

// eliminar una cancion
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const remover = await SONGS.remove({
      _id: id
    });
    if (remover) {
      res.status(200).json({ message: 'Success', });
    } else {
      res.status(400).json({ message: 'error leyendo el id', });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
