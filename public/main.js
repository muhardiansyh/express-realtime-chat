const socket = io()
const userOnline = document.querySelector('.user-online')
const user = document.querySelector('#username')
const messageForm = document.querySelector('#message-form')
const messageInput = document.querySelector('#input-message')
const messageContainer = document.querySelector(".chat-body")

socket.on("user-online", (data) => {
    userOnline.innerText = `${data-1} Online 🟢`
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage()
    messageInput.value = ''
})

const date = new Date()
const timeNow = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
})

function sendMessage(){
    const data = {
        user: user.value,
        message: messageInput.value,
        date: timeNow,
        userid: socket.id
    }
    socket.emit("message", data)
    addMessageToUI(true, data)
}

socket.on("chat-message", (data) => {
    addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
    const element = `
    <div class="message ${isOwnMessage ? 'text-white d-flex flex-column justify-content-end align-items-end' : 'text-white d-flex flex-column justify-content-start align-items-start' } mb-0 mt-3">
        <div class="${isOwnMessage ? 'send-message bg-primary text-white' : 'recieve-message bg-white text-dark'} py-2 px-3 ">
            <div class="user-info d-flex justify-content-between align-items-center gap-3">
                <small>${data.userid}</small>
                <small>~ ${data.user}</small>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0">${data.message}</p>
                <small>${data.date}</small>
            </div>
        </div>
    </div>`
    messageContainer.innerHTML += element
}

