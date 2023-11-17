const cors = require('cors')
const express = require('express')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

//to edit below later, is all copied from bigfoot

// importing Routers
const UsersRouter = require('./routers/usersRouter')
const ArtistsRouter = require('./routers/artistsRouter')
const GenresRouter = require('./routers/genresRouter')
const InstrumentsRouter = require('./routers/instrumentsRouter')

// importing Controllers
const UsersController = require('./controllers/usersController')
const ArtistsController = require('./controllers/artistsController')
const GenresController = require('./controllers/genresController')
const InstrumentsController = require('./controllers/instrumentsController')

// importing DB
const db = require('./db/models/index') //open up index.js in db/models
const { user, personalVideoClip, genre, artist, instrument, userInstrument } = db; 

// initializing Controllers -> note the lowercase for the first word
const usersController = new UsersController(user, personalVideoClip, artist, genre, instrument, userInstrument)
const artistsController = new ArtistsController(artist)
const genresController = new GenresController(genre)
const instrumentsController = new InstrumentsController(instrument)

// initializing Routers
const usersRouter = new UsersRouter(usersController).routes()
const artistsRouter = new ArtistsRouter(artistsController).routes()
const genresRouter = new GenresRouter(genresController).routes()
const instrumentsRouter = new InstrumentsRouter(instrumentsController).routes()

// Enable CORS access to this server
const corsOptions = {
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200,
  };
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

// using the routers
app.use('/users', usersRouter) 
app.use('/artists', artistsRouter) 
app.use('/genres', genresRouter) 
app.use('/instruments', instrumentsRouter) 

//activate backend
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
