const Message = require('../models/message.model');

async function getMessages(ctx) {
  try {
    const msgs = await Message.find().populate('user');
    ctx.body = msgs;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.body = error;
    ctx.status = 500;
  }
}

const postMessage = (io) => async (ctx) => {
  // Validate req.body

  // const { authorid, content, timestamp } = ctx.request.body;
  // if (!authorid || !content || !timestamp) {
  //   throw new Error('Missing fields');
  // }
  try {
    const { userId, content, timestamp } = ctx.request.body;
    const savedMessage = await (
      await Message.create({ user: userId, userId, content, timestamp })
    ).populate('user');
    io.emit('new_message', savedMessage);
    ctx.status = 201;
    ctx.body = savedMessage.toObject();
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
  }
};

module.exports = {
  getMessages,
  postMessage,
};
