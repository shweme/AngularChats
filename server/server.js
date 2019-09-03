const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');

const { getLogin } = require('./auth/data');



const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post("/login", async function (request, response) {
    try {
        console.log(request.body);
        const { name, pwd } = request.body;
        const succeeded = await getLogin(name, pwd);
        if (succeeded) {
            response.json(true);
        } else {
            response.json(false);
        }
    } catch (err) {
        console.warn(err);
        response.status(500).json("Something went wrong");
    }
});

sockets.connect(io, PORT);

server.listen(http, PORT);
