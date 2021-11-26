const express = require( 'express' );
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const { RabbitRouter } = require( './server/routes/rabbitRouter' );

require( './server/config/database' );

app.set('views', __dirname + '/client/views'); 
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/client/static') );
app.use(session({secret: 'verySecret'}));
app.use(flash());

app.use( express.urlencoded({ extended: true }) );

app.use( '/', RabbitRouter );



app.listen(7077, function() {
    console.log("running on port 7077");
});