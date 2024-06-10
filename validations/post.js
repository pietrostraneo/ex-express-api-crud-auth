const { query, body } = require('express-validator');

const bodyData = {

    title: {

        in: ["body"],
        notEmpty: {
            errorMessage: "Title is required",
            bail: true
        },
        isString: {
            errorMessage: "Title must be a string",
            bail: true
        },
        isLength: {
            options: { min: 3 },
            bail: true
        }

    },
    content: {

        in: ["body"],
        notEmpty: {
            errorMessage: "Content is required",
            bail: true
        },
        isLength: {
            options: { min: 15 },
            bail: true
        }

    },
    available: {

        in: ["body"],
        isBoolean: {
            errorMessage: 'Available must be of type boolean.'
        },

    },
    categoryId: {

        in: ["body"],
        isInt: {
            errorMessage: 'CategoryId must be of type integer.',
            bail: true
        },
        custom: {

            options: async (value) => {
                const categoryId = parseInt(value);
                const category = await prisma.category.findUnique({
                    where: { id: categoryId }
                });
                if (!category) {
                    return Promise.reject('CategoryId does not exist.');
                }
                return true;
            }

        }
    },

}

module.exports = {
    bodyData
}