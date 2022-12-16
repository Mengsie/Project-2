const socket = io('https://localhost:3000')

socket.on('hej2', () => {
  // Print message to client-side log
  window.location = '/opret.html'
  alert("Du skal logge ind for at chatte!")

  // Redirect user to specified URL
});

socket.on('error', (error) => {
  // Display the error message to the user
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
  messageElement.style.clear = 'both'; // Add clear style to display messages below previous messages

  // Check if the message starts with "You: "
  if (message.startsWith("You: ")) {
    // If it does, add a float style to align the message to the right
    messageElement.style.float = 'right';
  }else {
    // If it does not, add a max-width style to limit the width of the message
    messageElement.style.maxWidth = messageElement.offsetWidth + 'px';
    messageElement.style.maxWidth = '400px';
  
  }


    messageContainer.append(messageElement)

}


