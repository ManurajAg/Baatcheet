var stompClient = null

function connect(){
	let socket = new SockJS("/server1");
	stompClient = Stomp.over(socket);
	stompClient.connect({},function(frame){
		console.log("Connected : "+frame);
		$("#name-form").addClass('d-none');
		$("#chat-room").removeClass('d-none');
		
		//subscribe :- As soon as user enters in chat room he is now subscribed to recieve messages, since url to subscribe to messages is /topic/return-to , thus we used it here
		stompClient.subscribe("/topic/return-to",function(response){
			showMessage(JSON.parse(response.body));
		});
	})
}

function showMessage(message){
	$("#message-container-table").append(`<tr><td><b>${message.name} : </b>${message.content}</td></tr>`)
}


function sendMessage(){
	
	let messageObj = {
		name:localStorage.getItem("name"),
		content:$("#msg-value").val()
	}
	stompClient.send("/app/message",{},JSON.stringify(messageObj));
}

function logout(){
	localStorage.removeItem("name");
	if(stompClient!=null){
		stompClient.disconnect();
		$("#name-form").removeClass('d-none');
		$("#chat-room").addClass('d-none');
	}
}

$(document).ready((e)=>{
	$("#login").click(()=>{
		let name = $("#name-value").val();
		localStorage.setItem("name",name);
		$("#name-title").text(`Welcome, ${name}`);
		connect();
		
	})
	
	$("#send-btn").click(()=>{
		sendMessage();
	})
	
	$("#logout").click(()=>{
		logout();
	})
})