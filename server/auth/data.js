//Password validation
module.exports.getLogin = async function getLogin(name, pwd, db){
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
}

//list of groups user is in
module.exports.userAcc = async function userAcc(name, db){
    const ucollection = db.collection("users");
    const userData = await ucollection.find({ "name" : name}).toArray();
    console.log("data = ", userData);
    return userData[0];
}


//list of channels list of channels in group user is in



//Message history retrieval