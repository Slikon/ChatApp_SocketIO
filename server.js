const io = require('socket.io')(3000);

const users = {}

io.on('connection', socket => {
    console.log(`New User ${socket.id} has connected`);

    //Below is the list of events server recieves from client to react appropriately
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', msg => {
        socket.broadcast.emit('chat-message', {message: msg, name: users[socket.id]})
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })

})