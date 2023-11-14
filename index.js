const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

//to edit below later, is all copied from bigfoot

// importing Routers
const UsersRouter = require("./routers/usersRouter");

// importing Controllers
const UsersController = require("./controllers/usersController");

// importing DB
const db = require("./db/models/index"); //open up index.js in db/models
const { user, chatroom, userChatroomMessage } = db; //retrieve the comment and sighting models from db

// initializing Controllers -> note the lowercase for the first word
const usersController = new UsersController(
  user,
  chatroom,
  userChatroomMessage
);

// inittializing Routers
const usersRouter = new UsersRouter(usersController).routes();

// Enable CORS access to this server
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using the routers
app.use("/users", usersRouter);

//activate backend
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
