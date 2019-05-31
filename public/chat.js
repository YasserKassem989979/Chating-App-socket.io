// make connection
const socket = io.connect("http://localhost:3000")

const btn = document.getElementById("send");
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const output = document.getElementById ("output");
const feedback = document.getElementById("feedback")

//Listener

btn.addEventListener("click",() => {
    socket.emit("chat",{
        message:message.value,
        handle:handle.value 
    })
});

message.addEventListener("change",() => {
    socket.emit("typing",handle.value )
});

//event

socket.on("chat",(data)=>{
    feedback.innerHTML=''
    output.innerHTML += `<p><strong>${data.handle}</strong>: ${data.message}`
    message.value = ""
})

socket.on("typing",(data)=>{
    feedback.innerHTML = `<p>${data} is typing...</p>`
})

