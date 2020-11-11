const express = require('express');

const { ITEMS } = require('../config/bd');

const router = express.Router();

const auth = require('../controllers/auth');

const { userSchema } = require('../controllers/schemas');

// inicio de sesion
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await ITEMS.findOne({
      username,
      password,
    });
    if (!user) {
      res.status(400).send('error');
    } else {
      req.session.cookie.expires = false;
      req.session.usuario = {
        username,
        password
      };
      res.status(200).send('success');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// enviar datos session
router.get('/session', auth, async (req, res) => {
  try {
    const {username, password} = req.session.usuario
    res.status(200).json({
      username,
      password,
    })
  } catch (error) {
    res.status(400).send(error);
  }
});

// registrarse
router.post('/register', async (req, res) => {
  try {
    const value = await userSchema.validateAsync(req.body);
    if (!value) {
      return res.status(400).send('verifica los datos, e intenta de nuevo');
    }
    const inserted = await ITEMS.insert(value);
    if (inserted) {
      res.status(200).send('success');
    } else {
      res.status(400).send('error');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// salir de la session
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('success');
});

module.exports = router;
