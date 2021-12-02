# Chat server DB

Welcome to the world of databases! This project is divided in four steps, the first two should take one day each, and the remaining two can be done in the last day. For each section, use the respective folder in the `/server` directory, and save the required dependencies in the global `package.json`.

To use a database you need to first install it on your computer. Here’s the general procedure of how this works, depending on what operating system you have.

- For Mac, use the corresponding formula in [Homebrew](http://brew.sh/) (i.e. `brew install [db name]`).
- For Windows, use the installers that you find on the DB website.
- For Linux, use your default package manager.

Once you have installed a database, check that:

1. It’s running (learn also on what port, and how to start / stop the process on your OS).
2. You can connect to it through the CLI, and execute commands with the DB syntax.

For each section, don’t proceed with the rest until you can establish a proper connection with the DB.

Once it’s all working, consider that to use a database in a Node app you also need to install the appropriate driver from [npm](https://www.npmjs.org/).

## Getting started

Run `npm i` to install the project dependencies.

Copy the files you had in the `/client` folder of the `chat-server` repo into the `/client` folder of this repo.

You’re ready to go! Remember to make small, incremental, and descriptive commits along the way.

## 1. SQL

For starters, complete this [SQL tutorial](https://sqlbolt.com/) (all lessons).

Then install on your computer a SQL database of your choice (e.g. [MySQL](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/), or [SQLite](https://www.sqlite.org/)).

Through the CLI, check what DBs already exist in your SQL instance, create one for your app, and set up the schema as needed.

Now copy all the files you had in the `/server/koa` folder of the `chat-server` repo into the `/server/sql` folder of this repo, and replace the JSON data-store with your SQL database.

## 2. ORM

Yes, SQL syntax and direct database string outputs are not the most friendly to work with… that’s why ORMs were born! Take a look at this [Sequelize example](https://lectures.codeworks.me/databases-2#orm-example), and make sure you understand its core parts before moving forward.

Now copy all the files you have in the `/server/sql` to the `/server/orm` folder, and refactor your code to switch from bare SQL to Sequelize.

## 3. Mongo

Start by reading this MongoDB [tutorial](https://www.tutorialspoint.com/mongodb/) and [introduction](https://scotch.io/tutorials/an-introduction-to-mongodb).

Install Mongo, then through the CLI list what collections are available. Here you don’t need to create a new collection for your app before proceeding. In fact, when you ask Mongo to insert a document in a collection that doesn’t exist, it automatically creates it for you.

Now copy all the files you have in the `/server/sql` to the `/server/mongo` folder, and refactor your code to switch from SQL to MongoDB.

Once you have finished, check out [Mongoose](http://mongoosejs.com/) and refactor your code once again to use it as ORM.

## 4. Redis

Complete this interactive [Redis tutorial](https://try.redis.io/).

Install Redis.

Now copy all the files you have in the `/server/sql` to the `/server/redis` folder, and refactor your code to switch from SQL to Redis.

## Extra credits

- Modify the client and server code so that it supports multiple users through login (for now a simple username is enough).
- Make your chat app real-time with [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) (using the [Socket.io](http://socket.io/) library).
