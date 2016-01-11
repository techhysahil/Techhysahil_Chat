var socket = io.connect('http://localhost:5500');

var currentuser = '';

$('.usernameInput').keyup(function(event){
    if(event.keyCode == 13){
        var username = $('.usernameInput').val();
        currentuser = username;
        socket.emit('add user', username);
        $('.login.page').hide();
        $('.chat.page').show();
        $('.inputMessage').focus();
    }
});

socket.on('user added', function(msg){
    $('.messages').append('<li>Welcome to Tecchysahil chatroom</li>');
    if(msg.number == 0){
        $('.messages').append('<li>No user already available, wait for other to join</li>');
    }else{
        $('.messages').append('<li>' + msg.number + ' user already available</li>');
    }
});

socket.on('user joined', function(msg){
    $('.messages').append('<li>' + msg.name + ' added</li>');
    if(msg.number == 0){
        $('.messages').append('<li>No user already available, wait for other to join</li>');
    }else{
        $('.messages').append('<li>' + msg.number + ' user available</li>');
    }
});

$('.inputMessage').keyup(function(e){
    if(e.keyCode == 13){
        var usermsg = $('.inputMessage').val();
        socket.emit('user msg', {
            username : currentuser,
            message : usermsg
        });
        $('.inputMessage').val('');
    }
});
socket.on('add msg', function(data){
    if(data.username == currentuser){
        $('.messages').append('<li class="msg"><span class="myself">' + data.username + ':</span> '  + data.message + '</li>');
    }else{
        $('.messages').append('<li class="msg"><span>' + data.username + ':</span> '  + data.message + '</li>');
    }
});

socket.on('user left', function(data){
    $('.messages').append('<li>' + data.name + ' left</li>');
    $('.messages').append('<li>There are ' + data.number + ' user left</li>');
});