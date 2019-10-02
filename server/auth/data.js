const mongo = require('mongodb');
const fs = require('fs');

const client = mongo.MongoClient;
let db;
client.connect("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true }).then(async (client) => {
    db = client.db("gotmail")
    const collection = db.collection("users");
    const user = await collection.find({ "name": "super" }).limit(1).toArray();
    if (user.length === 0) {
     await collection.insertMany([{
         "name":"super",
         "email":"null@void", 
         "pwd":"Sup3r", 
         "valid":"true", 
         "isGroupAdmin":"SUPER"
        },
        {
         "name":"shweme",
         "email":"shmehta2111@gmail.com",
         "pwd":"Shw3t@",
         "valid":"false",
         "isGroupAdmin":"GROUP"
        },
        {
         "name":"neily",
         "email":"neil@ashford.com",
         "pwd":"@rtemis",
         "valid":"false",
         "isGroupAdmin":"FALSE"
        }])

     console.log(await collection.find({}).toArray())
    }
    
});

module.exports.getLogin = async function getLogin(name, pwd){
    const collection = db.collection("users");
    const user = await collection.find({ "name": name }).limit(1).toArray();
    console.log(user);

    if (user.length === 0) {
        console.log("USer doesn't exist");
        return false;
    }
    else if (user[0].pwd === pwd){
        console.log("User exists, password is correct!");
        return true;
    }
    else{
        console.log("wrong password");
        return false;
    }
}