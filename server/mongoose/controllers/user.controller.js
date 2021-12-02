const User = require('../models/user.model');

async function login(ctx) {
  // Validate req.body

  const { username } = ctx.request.body;
  if (!username) {
    throw new Error('No username');
  }
  try {
    let currentUser = await User.findOne({ username });
    if (!currentUser) {
      currentUser = await User.create({ username });
    }
    ctx.status = 201;
    ctx.body = currentUser;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
  }
}

module.exports = {
  login,
};
