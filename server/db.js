const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/accounts', { useMongoClient: true });

mongoose.Promise = global.Promise;
//eslint-disable-next-line
mongoose.connection.on('connected', () => console.log('connected'));
