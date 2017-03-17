var ws=require("nodejs-websocket");

var observers=0;
var server= ws.createServer(function(conn){

	console.log("New Conn");
	conn.on("text",function(e){

		var data=JSON.parse(e);

		switch(data.type)
		{
			case "JOIN":
				conn.userName=data.name;
				broadcast(JSON.stringify({
				"type":"Status",
				"message":"Użytkownik "+conn.userName+" dołączył do czatu"
				}));
			break;
			case "MESSAGE":
				if(conn.userName!==undefined)
				{
					broadcast(JSON.stringify({
					"type":"message",
					"message":conn.userName+": "+data.message
					}));
				}
			break;
		}

		conn.on("close",function(code,reson){
			broadcast(JSON.stringify({
				"type":"message",
				"message":"Użytkownik "+conn.userName+" został rozłączony"
			}));
		});


	});
	

	
}).listen(8000,"localhost",function(){
	console.log( "Server is alive");
});

function broadcast(msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}