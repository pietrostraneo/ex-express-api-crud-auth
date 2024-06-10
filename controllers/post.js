const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const slugify = require('slugify');

const index = async (req, res) => {

    try {

        const posts = await prisma.post.findMany({
            include: {
                Tag: {
                    select: {
                        name: true,
                    },

                },
                Category: {
                    select: {
                        name: true,
                    },

                }
            }
        })

        res.json({
            status: 'success',
            data: posts
        });

    } catch (err) {
        console.error(err);
    }
}

const show = async (req, res) => {

    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({

            where: {
                slug: slug
            },
            include: {
                Tag: {
                    select: {
                        name: true,
                    },

                },
                Category: {
                    select: {
                        name: true,
                    },

                }
            }

        })

        res.json({
            status: 'success',
            data: post
        });

    } catch (err) {
        console.error(err);
    }

}

const store = async (req, res) => {

    try {
        const { title, content, published, categoryId } = req.body;

        const slug = slugify(title);

        const data = {
            title,
            slug: slug,
            content,
            published,
            categoryId,
            Tag: {
                connect: [
                    { id: 1 },
                    { id: 3 }
                ]
            }
        }

        const newPost = await prisma.post.create({ data })
        res.json({
            message: "Post created successfully",
            post: newPost
        })

    } catch (err) {
        console.error(err);
    }
}

const update = async (req, res) => {

    try {
        const { slug } = req.params;
        const { title, content, published, categoryId, tags } = req.body;

        const data = {
            title,
            slug: slugify(title),
            content,
            published,
            categoryId,
            Tag: {
                connect: [
                    { id: 2 },
                    { id: 4 }
                ]
            }
        }

        const updatedPost = await prisma.post.update({
            where: {
                slug: slug
            },
            data
        })

        res.json({
            message: "Post updated successfully",
            post: updatedPost
        })

    } catch (err) {
        console.error(err);
    }

}

const destroy = async (req, res) => {

    try {
        const { slug } = req.params;
        await prisma.post.delete({
            where: {
                slug: slug
            }
        })

        res.json({
            message: "Post deleted successfully"
        })

    } catch (err) {
        console.error(err);
    }

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}