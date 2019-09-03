const fs = require('fs');

export function getLogin(name, pwd){
    fs.readFile('../../server/auth/users.json', 'utf8', (err, fileContents) => {
        if(err){
            console.error(err);
            return;
        }
        try {
            const data = JSON.parse(fileContents);
            console.log(data);
            for (let i =0; i < data.length ; i++){
                if(name == data[i].name && pwd == data[i].pwd){
                    return true;
                }
                else if (i == data.length-1 && pwd != data[i].pwd){
                    return false;
                }
                else{
                    continue;
                }
            }
        }
        catch(err) {
            console.error(err);
        }
    });
}