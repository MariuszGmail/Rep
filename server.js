const express = require( 'express' );
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );

const items = require('./routes/api/items');

const app = express();

    // Bodyparser Middleware
app.use( bodyParser.json() );

    // DB Config
const db = require( './config/keys' ).mongoURI;

    // Connect to Mongo
mongoose
    .connect( db , { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then( () => {
        console.log( 'working...' );
        console.log( 'MongoDB connected...' );
    } )
    .catch( err => {
        console.log( 'not working' );
        console.log( err );
    } );

    // Use routes
app.use('/api/items', items);

    // Serve static assets if in production
if( process.env.NODE_ENV === 'production' ) {
        // Set a static folder
    app.use( express.static('client/build') );

    app.get('*', (req, res) => {
        res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) );
    });
}

const PORT = process.env.PORT || 5000;

app.listen( PORT , () => console.log( `Server started on port ${ PORT }` ) );