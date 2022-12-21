const socket = io('https://157.245.24.234')

socket.on('error', (error) => {
  console.error(error.message);
});

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')


appendMessage("you joined")

socket.on('chat-message', data => {
   appendMessage(`${data.name}: ${data.message}` )
})

socket.on('user-connected', username => {
    appendMessage(`${username} connected`)
})


socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})


messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})


function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message

  messageElement.style.padding = '5px';
  messageElement.style.borderRadius = '3px';
  messageElement.style.backgroundColor = '#f5f5f5';
  messageElement.style.marginBottom = '5px';
  messageElement.style.clear = 'both'; 

 
  if (message.startsWith("You: ")) {
    messageElement.style.float = 'right';
  }else {
    messageElement.style.maxWidth = messageElement.offsetWidth + 'px';
    messageElement.style.maxWidth = '400px';
  }

    messageContainer.append(messageElement)
}


