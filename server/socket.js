module.exports = {
    connect: function(io, port){
        var groups = []
        groups.push({"groupName":"Group 1","rooms":["room1","room2","room3","r4","r5","r6"],"users":["user2","user3","user5"]},{"groupName":"Group 2","rooms":["room4","room5","room6"],"users":["user1","user5"]});

        const messaging = io.of('/messaging');

        messaging.on('connection',(socket) =>{
            console.log("Client Connected");
            console.log(groups)

            socket.on('getRooms', (m)=>{
                messaging.emit('roomList', JSON.stringify(groups));
            });


            socket.on("addUser", (addGroup, name)=>{
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == addGroup)
                        groups[i]['users'].push(name);
                }
            });

            socket.on('removeUser', (removeGroup, name)=>{
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == removeGroup){
                        for(let j = 0; j < groups[i]['users'].length; j++){
                            if(groups[i]['users'][j] == name)
                            groups[i]['users'].splice(j,j);
                        }
                    }
                        
                }
            });

            socket.on('addChannel', (addGroup, name)=>{
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == addGroup)
                        groups[i]['rooms'].push(name);
                }
                messaging.emit('roomList', JSON.stringify(groups));
            });

            socket.on('removeChannel', (removeChannel, name)=>{
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == removeChannel){
                        for(let j = 0; j < groups[i]['rooms'].length; j++){
                            if(groups[i]['rooms'][j] == name)
                            groups[i]['rooms'].splice(j,j);
                        }
                    }
                        
                }
                messaging.emit('roomList', JSON.stringify(groups));
            });

        });
    
    }
}