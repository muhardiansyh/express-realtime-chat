const express = require("express")
const path = require("path")

const app = express()
const port = 3000
const host = "localhost"
const server = app.listen(port, host, () => {
    console.log(`Server online on http://${host}:${port}`);
})

app.use(express.static(path.join(__dirname, 'public')))