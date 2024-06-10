const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const store = (req, res) => {
    const { username, email, password } = req.body;

    const data = {
        username,
        email,
    }
}

module.exports = {
    store,
    update
}