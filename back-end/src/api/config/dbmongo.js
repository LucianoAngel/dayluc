const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost/tracks', { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }
  db = client.db('tracks');
});

const getConnection = () => db;

module.exports = { getConnection };
