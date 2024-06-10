const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {

    const { id: userId } = req.user;
    const { slug } = req.params;

    try {
        // Find the post by ID
        const post = await prisma.post.findUnique({
            where: {
                slug: slug
            },
        });

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the authenticated user is the author of the post
        if (post.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to modify or delete this post" });
        }

        // User is authorized
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while checking authorization" });
    }
};
