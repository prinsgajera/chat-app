const socket = io();
const textarea = document.getElementById('textarea');
const sendButton = document.getElementById('send-btn');
const messageArea = document.querySelector('.message-area');
let user;
do{
    user = prompt('Enter Your Name');
}while(!user);

sendButton.addEventListener('click',()=>{
    const msg = {userName:user, message:textarea.value,date:{hour:new Date().getHours(),minute:new Date().getMinutes()}};
    appendMessage(msg,'outgoing')
    sendMessage(msg);
    textarea.value = '';
    scrollToTop();
})

function appendMessage(messageData,type){
    const div = document.createElement('div');
    const data = `
    <h4>${messageData.userName}</h4>
    <p>${messageData.message}</p>
    <h6>${messageData.date.hour}:${messageData.date.minute}am</h6>
    `;
    div.innerHTML = data;
    div.classList.add(type,'message');
    messageArea.appendChild(div);
}

function sendMessage(messageData){
    socket.emit('message',messageData)
}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToTop();
})

function scrollToTop(){
    messageArea.scrollTop = messageArea.scrollHeight;
}