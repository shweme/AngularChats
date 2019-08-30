let users = {
    uID: String,
    pwd: String,
    email: String,
    valid: Boolean,
    groups: []
};


users[0] = {uID:"Shwe", pwd:"123", email:"s.mehta@griffith.edu.au", valid:false, groups:["a", "B", "C"]};
console.log(JSON.stringify(users[0].groups[1]));