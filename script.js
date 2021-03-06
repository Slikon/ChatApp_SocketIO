const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

//Function returns the current time at the moment when it is called
function getDate() {
    const date = new Date()
    if (date.getSeconds() < 10) {
        return `[${date.getHours()}:${date.getMinutes()}:0${date.getSeconds()}]`
    } else {
        return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
    }
}

//User connecting to the room and entering its name
const name = prompt('What is your name?')
appendMessage(`${getDate()}\tYou joined!`)
socket.emit('new-user', name)

//Below is the list of events that client socket recieves from the server to react appropriately
socket.on('chat-message', data => {
    appendMessage(`${getDate()}\t${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${getDate()}\tUser ${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${getDate()}\tUser ${name} disconnected`)
})

//Submit button click
messageForm.addEventListener('submit', element => {
    element.preventDefault()
    const message = messageInput.value
    appendMessage(`${getDate()}\tYou: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

//function is responsible for presenting 'message' on users screen
function appendMessage (message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}