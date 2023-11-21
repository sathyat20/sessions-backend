const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

// Import Auth Middleware
const jwtAuth = require("./middlewares/jwtAuth");

// importing Routers
const UsersRouter = require("./routers/usersRouter");
const ChatroomRouter = require("./routers/chatroomsRouter");
const ArtistsRouter = require("./routers/artistsRouter");
const GenresRouter = require("./routers/genresRouter");
const InstrumentsRouter = require("./routers/instrumentsRouter");

// importing Controllers
const UsersController = require("./controllers/usersController");
const ChatroomsController = require("./controllers/chatroomsController");
const ArtistsController = require("./controllers/artistsController");
const GenresController = require("./controllers/genresController");
const InstrumentsController = require("./controllers/instrumentsController");

// importing DB
const db = require("./db/models/index"); //open up index.js in db/models
const {
  user,
  chatroom,
  userChatroomMessage,
  personalVideoClip,
  genre,
  artist,
  instrument,
  userInstrument,
  attachment,
} = db;

// initializing Controllers -> note the lowercase for the first word
const usersController = new UsersController(
  user,
  personalVideoClip,
  artist,
  genre,
  instrument,
  userInstrument,
  chatroom,
  userChatroomMessage,
  attachment
);
const artistsController = new ArtistsController(artist);
const genresController = new GenresController(genre);
const instrumentsController = new InstrumentsController(instrument);

const chatroomsController = new ChatroomsController(
  chatroom,
  user,
  userChatroomMessage
);

// initializing Routers
const usersRouter = new UsersRouter(usersController, jwtAuth).routes();
const chatroomsRouter = new ChatroomRouter(
  chatroomsController,
  jwtAuth
).routes();
const artistsRouter = new ArtistsRouter(artistsController).routes();
const genresRouter = new GenresRouter(genresController).routes();
const instrumentsRouter = new InstrumentsRouter(instrumentsController).routes();

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
app.use("/chatrooms", chatroomsRouter);
app.use("/artists", artistsRouter);
app.use("/genres", genresRouter);
app.use("/instruments", instrumentsRouter);

//activate backend
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

/** SOCKETS CODE */
const io = require("socket.io")(8080, {
  cors: { origin: ["http://localhost:3000"] },
}); // require is a function. so the two brackets.

// a function that runs everytime a client connects to the server.
io.on("connection", (socket) => {
  console.log(`New connection made, the socket id is: ${socket.id}`); // random ID assigned to every person connecting to the server.

  // Receiving a send-message from Client
  socket.on("send-message", (message, chatroomId) => {
    console.log(
      `message from frontend/client: ${JSON.stringify(
        message
      )} from room ${chatroomId}`
    );

    //// Sending out the same message it received, to the other users in the chat
    // socket.broadcast.emit("receive-message", message); // send to all except self
    socket.to(chatroomId).emit("receive-message", message); // broadcast is assumed with the .to method
  });

  // Receiving a user-typing from Client (i.e. when someone is typing in the chat box)
  socket.on("user-typing", (userId, chatroomId) => {
    socket.to(chatroomId).emit("user-typing-response", userId);
  });

  socket.on("attachment-table-updated", (chatroomId) => {
    console.log("charoom id: ", chatroomId);
    if (chatroomId) {
      socket.to(chatroomId).emit("refresh-attachments");
    }
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("created-new-chatroom", () => {
    socket.broadcast.emit("new-room-created");
  });
});

// End of Sockets Code
///////////
