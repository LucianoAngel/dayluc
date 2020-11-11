const monk = require('monk');

const db = monk(process.env.MONGO_URI);

const ITEMS = db.get('sesiones');

const SONGS = db.get('tracks.files');

module.exports = { ITEMS, SONGS };
