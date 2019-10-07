const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const mongo = require('mongodb');
const client = mongo.MongoClient;


const { startup } = require('./auth/DBPopulate')
const { getLogin } = require('./auth/data');
const { userAcc } = require('./auth/data')



const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());


client.connect("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true }).then(async (client) => {
    let db = client.db("gotmail");

    //create collections and populate database gotmail
    await startup(db);

    sockets.connect(io, PORT);



    app.post("/login", async function (request, response) {
        try {
            console.log(request.body);
            const { name, pwd } = request.body;
            const succeeded = await getLogin(name, pwd, db);
            if (succeeded) {
                response.json(true);
            } else {
                response.json(false);
            }
        } catch (err) {
            console.warn(err);
            response.status(500).json("Something went wrong with user login");
        }
    });

    app.post("/account", async function(req, res) {
        try {
            console.log(req.body);
            const {name} = req.body;
            const userData = await userAcc(name, db);
            res.json(userData);
        } catch (err) {
            console.warn(err);
            response.status(500).json("Something went wrong with user data retrieval");
        }
    });


});




server.listen(http, PORT);
