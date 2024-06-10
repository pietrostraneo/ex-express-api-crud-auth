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
    published: {

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
        }

    },
    userId: {
        in: ["body"],
        isInt: {
            errorMessage: 'UserId must be of type integer.',
            bail: true
        },
    }

}

module.exports = {
    bodyData
}