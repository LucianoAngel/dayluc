const multer = require('multer');
const { GridFSBucket, ObjectID } = require('mongodb');
const { Readable } = require('stream');
const { getConnection } = require('../config/dbmongo');
const { SONGS } = require('../config/bd');


const obtenerSong = (req, res) => {
  const { id } = req.params;
  try {
    songID = new ObjectID(id);
  } catch (err) {
    res.status(400).json({ message: 'error leyendo el ID' });
  }
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');
  const db = getConnection();
  const bucket = new GridFSBucket(db, {
    bucketName: 'tracks'
  });

  const downloadStream = bucket.openDownloadStream(songID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });
  downloadStream.on('error', () => {
    res.sendStatus(404);
  });
  downloadStream.on('end', () => {
    res.end();
  });
};

const enviarSong = (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: {
      fields: 1,
      files: 1,
      parts: 2,
    },
  });
  upload.single('track')(req, res, (err) => {
    if (err) {
      res.status(401).send('ha ocurrido un error');
    }
    if (!req.body.name) {
      return res.status(400).send('Falta el nombre de la cancion');
    }

    const trackName = req.body.name;

    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    const db = getConnection();

    const bucket = new GridFSBucket(db, {
      bucketName: 'tracks'
    });

    const uploadStream = bucket.openUploadStream(trackName);
    const { id } = uploadStream;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', () => res.status(500).json({ message: 'eror subiendo el track' }));

    // uploadStream.on('finish', () => res.status(200).json({ id }));
    uploadStream.on('finish', async () => {
      try {
        const {username} = req.session.usuario
        const item = await SONGS.findOne({
          _id: id
        });
        if (!item) return res.status(400).send('cancion no encontrada');
        await SONGS.update({
          _id: id
        }, { $set: {
          author: username
        }});
        return res.status(200).send('OK');
      } catch (error) {
        res.send(error);
      }
    });
  });
};

module.exports = { obtenerSong, enviarSong };
