let drop = false;

module.exports.startup = async function startup(db){
    
    //
    //Populating database gotmail with users
    //
    const ucollection = db.collection("users");
    const user = await ucollection.find({ "name": "super" }).limit(1).toArray();
    //drop collection when wanting to restart server
    if(user.length > 0 && drop === true){
        await ucollection.drop();
        console.log("dropped database collections");
    }
    else if (user.length === 0 && drop ===false) {
        await ucollection.insertMany([
            {
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
            }
        ]);
        //debug
        //console.log(await ucollection.find({}).toArray())
    }


    //
    //Populating database gotmail with groups
    //
    const gcollection = db.collection("groups");
    const group = await gcollection.find({ "id": 0 }).limit(1).toArray();
    //drop collection when wanting to restart server
    if(group.length > 0 && drop){
        await gcollection.drop();
    }
    else if (group.length === 0 && !drop) {
        await gcollection.insertMany([
            {
                "id":0,
                "name": "GotMail Support"
            },
            {
                "id":1,
                "name":"UQCS"
            },
            {
                "id":2,
                "name":"CodeCampAU"
            },
            {
                "id":3,
                "name":"ABA Design"
            }
        ]);
        // debug
        // console.log(await gcollection.find({}).toArray())
    }



    //
    //Populating gotmail's groups with channels and channel members
    //
    const chcollection = db.collection("channels");
    const channel = await chcollection.find({ "CID": 0 }).limit(1).toArray();
    //drop collection when wanting to restart server
    if(channel.length > 0 && drop === true){
        await chcollection.drop();
    }
    else if (channel.length === 0 && drop === false) {
        await chcollection.insertMany([
            {
                "CID":0,
                "name":"general",
                "group":"GotMail Support",
                "owner": "super",
                "members": [
                    "super",
                    "shweme"
                ]
            },
            {
                "CID":1,
                "name":"general",
                "group":"UQCS",
                "owner":"neily",
                "members": [
                    "super",
                    "shweme",
                    "neily"
                ]
            },
            {
                "CID":2,
                "name":"food",
                "group":"UQCS",
                "owner":"neily",
                "members": [
                    "super",
                    "neily"
                ]
            },
            {
                "CID":3,
                "name":"banter",
                "group":"UQCS",
                "owner":"neily",
                "members": [
                    "super",
                    "shweme",
                    "neily"
                ]
            },
            {
                "CID":4,
                "name":"clayfieldwk3",
                "group":"CodeCampAU",
                "owner":"shweme",
                "members": [
                    "super",
                    "shweme",
                    "neily"
                ]
            },
            {
                "CID":5,
                "name":"general",
                "group":"CodeCampAU",
                "owner":"shweme",
                "members": [
                    "super",
                    "neily"
                ] 
            },
            {
                "CID":6,
                "name":"general",
                "group":"ABA Design",
                "owner":"super",
                "members": [
                    "super",
                    "shweme"
                ]
            }
        ]);

        //console.dir(await chcollection.find({}).toArray(), depth=10);
    }



    //
    //Populating chat for each channel with one initial message
    //
    const mcollection = db.collection("messages");
    const msg = await mcollection.find({ "CID": 0 }).limit(1).toArray();
    //drop collection when wanting to restart server
    if(msg.length > 0 && drop === true){
        await mcollection.drop();
    }
    else if (msg.length === 0 && drop === false) {
        await mcollection.insertMany([
            {
                "time":"00:00",
                "body":"This chat was created for GotMail Support",
                "CID":0,
                "UID":"super"
            },
            {
                "time":"00:00",
                "body":"This chat was created for all UQCS group members",
                "CID":1,
                "UID":"super"
            },
            {
                "time":"00:00",
                "body":"This chat was created to talk about food with other foodies",
                "CID":2,
                "UID":"super"
            },{
                "time":"00:00",
                "body":"This chat was created for general banter",
                "CID":3,
                "UID":"super"
            },
            {
                "time":"00:00",
                "body":"This chat was created for Code Camp AU's Clayfield College camp staff in Spring holidays week 3",
                "CID":4,
                "UID":"super"
            },
            {
                "time":"00:00",
                "body":"This chat was created for all Code Camp AU staff members",
                "CID":5,
                "UID":"super"
            },
            {
                "time":"00:00",
                "body":"This chat was created for Agile Business Analysis Design Challenge group members",
                "CID":6,
                "UID":"super"
            },
            {
                "time":"12:42",
                "body":"sup",
                "CID":3,
                "UID":"shweme"
            },
            {
                "time":"12:43",
                "body":"nm, u?",
                "CID":3,
                "UID":"neily"
            },
            {
                "time":"12:44",
                "body":"the ceiling lol",
                "CID":3,
                "UID":"shweme"
            },
            {
                "time":"12:44",
                "body":"omg stfu",
                "CID":3,
                "UID":"neily"
            },
            {
                "time":"12:45",
                "body":"no u",
                "CID":3,
                "UID":"shweme"
            },
            {
                "time":"12:45",
                "body":"why are u so weird",
                "CID":5,
                "UID":"neily"
            },
            {
                "time":"12:45",
                "body":" ¯\\_(ツ)_/¯",
                "CID":5,
                "UID":"shweme"
            }
        ]);
        //debug
        //console.log(await mcollection.find({}).toArray())
    }
    console.log("Populated databse gotmail");
}