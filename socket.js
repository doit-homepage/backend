
module.exports = (io) => {
    io.on('connection', (socket) => {
        
        function log() {
            let array = ['Message from server:'];
            array.push.apply(array,arguments);
            socket.emit('log',array);
        }
        socket.on('message',message=>{
            log('Client said : ' ,message);
            socket.broadcast.emit('message',message);
        });
        socket.on('create',room=>{
            console.log(room)
            let clientsInRoom = io.sockets.adapter.rooms.get(room);
            //let numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
            let numClients = clientsInRoom ? clientsInRoom.size : 0;

            console.log(clientsInRoom, numClients)
            log('Room ' + room + ' now has ' + numClients + ' client(s)');
    
            if(numClients === 0){
                console.log('create room!');
                socket.join(room);
                log('Client ID ' + socket.id + ' created room ' + room);
                socket.emit('created',room,socket.id);
            }
            else if(numClients===1){
                console.log('join room!');
                log('Client Id' + socket.id + 'joined room' + room);
                io.sockets.in(room).emit('join',room);
                socket.join(room);
                socket.emit('joined',room,socket.id);
                io.sockets.in(room).emit('ready');
            }else{
                socket.emit('full',room);
            }
        });
        
    });
}