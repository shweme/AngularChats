const connections = [];

module.exports.connect = function(io, db) {
    io.on('connection', socket => {
        connections.push(socket);
        socket.on('disconnect', () => delete connections.indexOf(socket));
        socket.on('message', msg => {
            //console.log(msg);
            connections.forEach(sock => sock.emit('message', msg));
            const collection = db.collection('messages')
            collection.insertOne(msg)
        })
    })
}


/*
module.exports = {
    connect: function(io, PORT, db){
        let messages = [];
        io.on('connection',(socket) => {
            console.log('user connection on port '+ PORT +' : '+ socket.id);
                socket.on('message',(message)=>{
                    io.emit('message',message);
                })
        });
    }
}
*/