const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res) => {
    try {

        let tagsList = await prisma.tag.findMany();
        res.json(tagsList)

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    index
}