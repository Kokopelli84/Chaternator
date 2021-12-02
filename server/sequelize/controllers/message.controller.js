const Message = require('../models/message.model');
const User = require('../models/user.model');

async function getMessages(ctx) {
  try {
    const msg = await Message.findAll({
      include: [User],
      order: [['id', 'ASC']],
    });
    ctx.body = msg;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}

postMessage = (io) => async (ctx) => {
  // Validate req.body
  const { userId, content, timestamp } = ctx.request.body;
  if (!userId || !content || !timestamp) {
    throw new Error('Missing fields');
  }
  try {
    const createdMsg = await Message.create(ctx.request.body);
    const msg = await Message.findOne({
      where: {
        id: createdMsg.id,
      },
      include: [User],
    });
    io.emit('new_message', msg);
    ctx.status = 201;
    ctx.body = msg;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
  }
};

module.exports = {
  getMessages,
  postMessage,
};
