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