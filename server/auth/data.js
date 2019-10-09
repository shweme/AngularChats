//Password validation
module.exports.getLogin = async function getLogin(name, pwd, db){
    try {
        const ucollection = db.collection("users");
        const user = await ucollection.find({ "name": name }).limit(1).toArray();
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
    } catch(err) {
        console.warn(err);
        Response.status(500).json("Password retrival failed");
    }
}

//user's profile data for account page display
module.exports.userAcc = async function userAcc(name, db){
    try {
        const ucollection = db.collection("users");
        const userData = await ucollection.find({ "name" : name}).toArray();
        //console.log("data = ", userData);
        return userData[0];
    } catch(err) {
        console.warn(err);
        Response.status(500).json("")
    }
}

//list of groups user is in
module.exports.groupData = async function groupData(db){
    try{
        const gcollection = db.collection("groups");
        const group = await gcollection.find({}).toArray();
        return group;
    } catch(err){
        console.warn(err);
        Response.status(500).json("")
    }
}

//list of channels user is in
module.exports.channelData = async function channelData(name, db) {
    try{
        const chcollection = db.collection("channels");
        const lookFor = { "members" : {$elemMatch : {$eq : name}}};
        const usersChannels = await chcollection.find(lookFor).toArray();
        console.log(usersChannels)
        return usersChannels;
    } catch(err) {
        console.warn(err);
        Response.status(500).json("")
    }
}


//Message history retrieval
module.exports.messages = async function messages(CID, db){
	try {
		const mcollection = db.collection("messages");
		const msg = await mcollection.find({ "CID":CID }).toArray();
		//console.log("Message Data Retrieved");
		//console.log(message)
		return msg;
	} catch (err) {
		console.warn(err)
		response.status(500).json("FAILED: Message retrieval")
	}
}