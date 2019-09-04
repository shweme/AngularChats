const fs = require('fs');

module.exports.getLogin = function getLogin(name, pwd){
    return new Promise((resolve, reject) => {
        fs.readFile('auth/users.json', 'utf8', (err, fileContents) => {
        if(err){
            reject(err);
        }
        try {
            const data = JSON.parse(fileContents);
            //console.log(data);
            for (let i =0; i < data.length ; i++){
                if(name == data[i].name && pwd == data[i].pwd){
                    resolve(true);
                }
                else if (i == data.length-1 && (pwd != data[i].pwd || name != data[i].name)){
                    resolve(false);
                }
                else{
                    continue;
                }
            }
        }
        catch(err) {
            reject(err);
        }

        console.log()
    });
    })
    
}


//not working yet

/*
module.exports.getGroups = function getGroups(name){
    return new Promise((resolve, reject) => {
        fs.readFile('auth/channel_members.json', 'utf8', (err, fileContents) => {
            if(err){
                reject(err);
            } 
            try{
                let groups;
                const data = JSON.parse(fileContents);
                for (let i=0; i < data.length; i++){
                    groups[i] = data[i].group;
                    for(let j=0; j < data[i].length; j++){
                        for(let k=0; k < data[i].members.length; k++){
                            if(name == data[i].members[i]){
                                groups[i]
                            }
                        }
                    }
                }
            }
    });
}
*/