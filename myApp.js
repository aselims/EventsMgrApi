
var express = require('express'),
    //path = require('path'),
    http = require('http'),
    eventsdb = require('./routes/eventsdb');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
        //app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/events', eventsdb.findAll);
app.post('/event', eventsdb.addOneEvent);
app.get('/event/:id', eventsdb.findOneEvent);
app.put('/event/:id', eventsdb.updateEvent);
app.delete('/event/:id', eventsdb.deleteEvent);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
