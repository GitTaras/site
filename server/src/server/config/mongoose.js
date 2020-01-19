const mongoose = require('mongoose');

// const path = 'mongodb://localhost/chat';

const path = process.env.NODE_ENV === 'development'
  ? 'mongodb://mongo-dev/chat'
  // ? 'mongodb://localhost/chat'
  : 'mongodb://mongo-prod/chat';

mongoose.connect(path, {
  auth: { 'authSource': 'admin' },
  user: 'mongo',
  pass: 'password',
  useNewUrlParser: true,
});
mongoose.set('debug', true);

module.exports = mongoose;

