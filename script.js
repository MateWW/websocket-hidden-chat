(function(window){

	if(!window.WebSocket)
		throw new Error("Twoja przeglądarka nie jest godna by uczestniczyć w tym chacie");

	var socket= new WebSocket("ws://localhost:8000");

	socket.onopen = function(){
		
		window.join = function(name){
			if(typeof name!=="string")
			{
				console.log("Oj ty chytrusku : "+name);
				return;
			}
			socket.send(JSON.stringify({
				type:"JOIN",
				name:name
			}));
		}
		window.say = function(message){
			if(typeof message!=="string")
			{
				console.log("Oj ty chytrusku : "+message);
				return;
			}
			socket.send(JSON.stringify({
				type:"MESSAGE",
				message:message
			}));
		}

	};
	function leadingZero(i) {
        return (i < 10)? '0'+i : i;
    }
	socket.onmessage = function(e){
		var time=new Date(),
			timemsg=time.getHours()+":"+leadingZero(time.getMinutes())+":"+leadingZero(time.getSeconds()),
			data=JSON.parse(e.data);

		console.log(timemsg+" "+data.message);
	}

})(window);