const bcrypt = require('bcrypt');

async function run(){
    const salt = await bcrypt.genSalt(10); // salt is a random string that is used to make the hash unique, even if the same password is hashed multiple times
    const hashed = await bcrypt.hash('1234',salt); // hashing the password with the salt
    console.log(salt);
    console.log(hashed);
}

run();