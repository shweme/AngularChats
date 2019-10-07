module.exports.startup = async function startup(db){
    
    //
    //Populating database gotmail with users
    //
    const ucollection = db.collection("users");
    const user = await ucollection.find({ "name": "super" }).limit(1).toArray();
    //drop collection when wanting to restart server
    //await ucollection.drop();
    if (user.length === 0) {
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
    //await gcollection.drop();
    if (group.length === 0) {
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
    //Populating gotmail's groups with channels
    //
    const chcollection = db.collection("channels");
    const channel = await chcollection.find({ "CID": 0 }).limit(1).toArray();
    //drop collection when wanting to restart server
    //await chcollection.drop();
    if (channel.length === 0) {
        await chcollection.insertMany([
            {
                "CID":0,
                "name":"general",
                "group":"GotMail Support"
            },
            {
                "CID":1,
                "name":"general",
                "group":"UQCS"
            },
            {
                "CID":2,
                "name":"food",
                "group":"UQCS"
            },
            {
                "CID":3,
                "name":"banter",
                "group":"UQCS"
            },
            {
                "CID":4,
                "name":"clayfieldwk3",
                "group":"CodeCampAU"
            },
            {
                "CID":5,
                "name":"general",
                "group":"CodeCampAU"
            },
            {
                "CID":6,
                "name":"general",
                "group":"ABA Design"
            }
        ]);

        console.log(await chcollection.find({}).toArray())
    }



    //
    //Populating all channels in all of gotmail's groups with channel members
    //
    const cmcollection = db.collection("channelMembers");
    const chmember = await cmcollection.find({ "group" : "GotMail Support" }).toArray();
    //drop collection when wanting to restart server
    //await cmcollection.drop();
    if (chmember.length === 0) {
        await cmcollection.insertMany([
            {
                "group":"GotMail Support",
                "channels": [
                    {
                        "CID": 0,
                        "Cname":"general",
                        "members": [
                            "super",
                            "shweme"
                        ]        
                    }
                ]
            },
            {
                "group":"UQCS",
                "channels":[
                    {
                        "CID": 1,
                        "Cname":"general",
                        "members": [
                            "super",
                            "shweme",
                            "neily"
                        ]        
                    },
                    {
                        "CID": 2,
                        "Cname":"banter",
                        "members": [
                            "super",
                            "neily"
                        ]        
                    },
                    {
                        "CID": 3,
                        "Cname":"food",
                        "members": [
                            "super",
                            "shweme",
                            "neily"
                        ]        
                    }
                ]
            },
            {
                "group":"CodeCampAU",
                "channels": [
                    {
                        "CID": 4,
                        "Cname":"general",
                        "members": [
                            "super",
                            "shweme",
                            "neily"
                        ]        
                    },
                    {
                        "CID": 5,
                        "Cname":"last-minute-jobs",
                        "members": [
                            "super",
                            "neily"
                        ]        
                    }
                ]
            },
            {
                "group":"ABA Design",
                "channels": [
                    {
                        "CID": 6,
                        "Cname":"general",
                        "members": [
                            "super",
                            "shweme"
                        ]        
                    }
                ]
            }
        ]);
        // debug
        // console.dir(await cmcollection.find({}).toArray(), { depth: 10 });
    }



    //
    //Populating chat for each channel with one initial message
    //
    const mcollection = db.collection("messages");
    const msg = await mcollection.find({ "CID": "0" }).limit(1).toArray();
    //drop collection when wanting to restart server
    //await mcollection.drop();
    if (msg.length === 0) {
        await mcollection.insertMany([
            {
                "time":"00:00",
                "body":"This chat was created for GotMail Support",
                "CID":"0",
                "UID":"super"
            },
            {
                "time":"12:42",
                "body":"sup",
                "CID":"3",
                "UID":"shweme"
            },
            {
                "time":"12:43",
                "body":"nm, u?",
                "CID":"3",
                "UID":"neily"
            },
            {
                "time":"12:44",
                "body":"the ceiling lol",
                "CID":"3",
                "UID":"shweme"
            },
            {
                "time":"12:44",
                "body":"omg stfu",
                "CID":"3",
                "UID":"neily"
            },
            {
                "time":"12:45",
                "body":"no u",
                "CID":"3",
                "UID":"shweme"
            },
            {
                "time":"12:45",
                "body":"why are u so weird",
                "CID":"5",
                "UID":"neily"
            },
            {
                "time":"12:45",
                "body":" ¯\\_(ツ)_/¯",
                "CID":"5",
                "UID":"shweme"
            }
        ]);
        //debug
        //console.log(await mcollection.find({}).toArray())
    }

}