import 'babel-polyfill';
import express from 'express';
import router from './server/router/index';
import cors from 'cors';
import errorHandler from './server/utils/errorHandler';
import ws from './wsServer/socket';
import http from 'http';
import './server/config/mongoose';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', router);
app.use(errorHandler);

app.use('/public', express.static('public/'));

process.env.NODE_ENV === 'development' &&
app.get('/images/*', (req, res) => {
  res.sendFile(`/var/www/html/${req.path}`);
});

const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log(`server start on ${PORT}`);
});
ws.listen(httpServer);
