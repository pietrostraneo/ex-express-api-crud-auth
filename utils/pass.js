const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password + process.env.HASH_KEY, saltRounds);
    return hash;
}

async function readPass(password, hashedPass) {
    const isValid = await bcrypt.compare(password + process.env.HASH_KEY, hashedPass)
    return isValid;
}

module.exports = {
    hashPassword,
    readPass
}