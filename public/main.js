const socket = io()
const userOnline = document.querySelector('.user-online')

socket.on("user-online", (data) => {
    userOnline.innerText = `${data-1} Online 🟢`
})