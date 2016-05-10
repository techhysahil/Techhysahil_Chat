var express = require('express'),
    fs = require('fs'),
    path    = require("path"),
    events = require('events'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    Q = require('q'),
    mysql      = require('mysql'),
    crypto = require('crypto'),
    app = express();

    app.set('port', (process.env.PORT || 5000));


    var username = [];

    //Socket Coding
    //var http = require('http').Server(express);
    //var io = require('socket.io')(http);

    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server);

    server.listen(process.env.PORT || 3000);

    //Make Public as Static Directory
    app.use(express.static('public'));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(cookieParser());

    /*****************************
     ********* ROUTER JS **********
     *****************************/

    app.get('/', function (req, res) {
        res.set({
            'Content-Type': 'text/html'
        });
        res.sendFile(path.join(__dirname+'/views/index.html'));
    });

    io.on('connection', function(socket){
    socket.on('add user', function(data){
        username.push(data);
        socket.username = data;
        socket.emit('user added',{
            name : data,
            number : username.length-1
        });

        socket.broadcast.emit('user joined',{
            name : data,
            number : username.length-1
        });

    });

    socket.on('user msg', function(data){
        io.emit('add msg', data);
    });


    socket.on('disconnect', function () {
        var c_user = socket.username;
        var index = username.indexOf(c_user);
        if (index > -1) {
            username.splice(index, 1);
        }
        io.emit('user left', {
            name : c_user,
            number : username.length
        });
    });

});

    //http.listen(5500, function(){});
    //
    //var server = app.listen(app.get('port'), function () {
    //    var host = server.address().address;
    //    var port = server.address().port;
    //
    //    console.log('Example app listening at http://%s:%s', host, port);
    //});

