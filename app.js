var express = require('express');
var routes = require('./routes/routes'); // Define routes

var port = 3000;

var app = express();

// Set Engine view
app.set('view engine', 'jade');
app.set('views', './views');

// Static untuk public folder
app.use('/static', express.static('./public'));

app.use('/', routes);

// Listen Port
app.listen(port, function() {
    console.log('Server is running on port ' + port );
})
