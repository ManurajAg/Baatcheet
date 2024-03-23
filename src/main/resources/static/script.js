var stompClient = null

function connect(){
	let socket = new SockJS("/server1");
	stompClient = Stomp.over(socket);
	stompClient.connect({},function(frame){
		console.log("Connected : "+frame);
		$("#name-form").addClass('d-none')
	})
}

$(document).ready((e)=>{
	$("#login").click(()=>{
		let name = $("#name-value").val();
		localStorage.setItem("name",name);
		connect();
		
	})
})