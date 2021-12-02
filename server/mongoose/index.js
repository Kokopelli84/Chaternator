const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = 3000;
const app = new Koa();
const router = require('./routes');
const { connectDB } = require('./models');

const httpServer = createServer(app.callback());
const io = new Server(httpServer);

io.on('connection', (socket) => {
  socket.on('user_connected', (data) => {
    socket.broadcast.emit('user_joined', data);
  });
});

app.use(bodyParser());
app.use(router(io).routes());
app.use(serve(path.join(__dirname, '../../client')));
app.use(router().allowedMethods());

(async function bootstrap() {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
})();
