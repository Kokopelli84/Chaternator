class Message {
  constructor(userId, content) {
    this.userId = userId;
    this.content = content;
    this.timestamp = Date.now();
  }
}

$(() => {
  // SocketIo
  const socket = io();
  // Jquery elements
  const chatContainer = $('#chat-container');
  const messages = $('#messages');
  const form = $('#form');
  const textInput = $('#text-input');
  const onlineUsers = $('#users');
  const usersCounter = $('#users-counter');
  const userHeaderName = $('#user-header-name');
  const loginContainer = $('#login-container');
  const loginForm = $('#login-form');
  const usernameInput = $('#username-input');
  const logout = $('#logout');

  // App variables
  const users = [];
  let currentUser;
  let getRandomMessages = false;
  const baseUrl = 'http://localhost:3000';

  // Check if user is logged in
  isLoggedIn();
  function isLoggedIn() {
    currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser) {
      loginContainer.toggleClass('hide');
      chatContainer.toggleClass('hide');
      messages.empty();
      getMessagesFromServer();
      renderUser(currentUser);
      userHeaderName.text(currentUser.username[0].toUpperCase());
      socket.emit('user_connected', { user: currentUser });
    }
  }

  // Login
  loginForm.on('submit', handleLogin);
  function handleLogin(e) {
    e.preventDefault();
    let username = usernameInput.val();
    if (!username) return;

    $.ajax({
      url: baseUrl + '/users',
      method: 'POST',
      data: JSON.stringify({ username }),
      contentType: 'application/json',
    }).then((data) => {
      window.localStorage.setItem('currentUser', JSON.stringify(data));
      currentUser = data;
      loginContainer.toggleClass('hide');
      chatContainer.toggleClass('hide');
      messages.empty();
      getMessagesFromServer();
      renderUser(data);
      socket.emit('user_connected', { user: currentUser });
    });

    loginForm[0].reset();
    // getMessages(true);
  }

  // Logout
  logout.on('click', handleLogout);
  function handleLogout() {
    currentUser = null;
    window.localStorage.removeItem('currentUser');
    loginContainer.toggleClass('hide');
    chatContainer.toggleClass('hide');
    getMessages(false);
  }

  function postToServer(message) {
    return $.ajax({
      url: baseUrl + '/messages',
      method: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      dataType: 'json',
    });
  }

  function getMessagesFromServer() {
    $.get(baseUrl + '/messages', (messages) => {
      for (let msg of messages) {
        appendMessage(msg);
      }
    });
  }

  form.on('submit', async (e) => {
    e.preventDefault();
    const contentInput = textInput.val();
    if (contentInput) {
      const message = await postToServer(
        new Message(currentUser.id, contentInput)
      );
      // Include current user to response object
      message.user = currentUser;
      appendMessage(message);
    }
    form[0].reset();
  });

  function appendMessage({ userId, content, timestamp, user }) {
    renderUser(user);

    const html = `
      <div class="message ${userId === currentUser?.id ? 'me' : ''}">
        <div class="message-info">
          <div class="message-user">${user.username}</div>
          <div class="message-date">${getTime(timestamp)}</div>
        </div>
        <div class="message-text">
          <p>
            ${content}
          </p>
        </div>
      </div>
    `;

    messages.append(html);
    messages.scrollTop(messages[0].scrollHeight);
  }

  async function getMessages(run) {
    getRandomMessages = run;
    if (getRandomMessages) {
      let timer = getRandomInterval();
      while (getRandomMessages) {
        await sleep(timer);
        $.get(
          'https://cw-quotes.herokuapp.com/api/quotes/random',
          ({ result }) => {
            const message = new Message(result.author, result.text);
            postToServer(message);
            appendMessage(message);
          }
        );
        timer = getRandomInterval();
      }
    }
  }

  function renderUser({ username }) {
    if (!users.includes(username)) {
      users.push(username);
      const html = `
        <div class="user">
          <div class="avatar" style="background: ${getRandomHSL()}">
            <span>${username[0].toUpperCase()}</span>
            </div>
          <h4>${username}</h4>
        </div>
      `;
      usersCounter.text(`${users.length} Users Online`);
      onlineUsers.append(html);
    }
  }

  socket.on('new_message', (data) => {
    if (data.userId !== currentUser.id) {
      appendMessage(data);
    }
  });

  socket.on('user_joined', (data) => {
    renderUser(data.user);
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTime(timestamp) {
  const date = new Date(parseInt(timestamp));
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${hours}:${mins < 10 ? '0' + mins : mins}`;
}

function getRandomInterval(min = 5, max = 10) {
  return (Math.floor(Math.random() * max) + min) * 1000;
}

function getRandomHSL() {
  const h = Math.round(Math.random() * 360);
  //const s = Math.round(Math.random() * 100);
  const l = Math.round(Math.random() * 30) + 20;

  return `hsl(${h},100%,${l}%);`;
}
