const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Email is a required field.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email must be a valid email.',
            bail: true
        },
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value }
                });
                if (user) {
                    throw new Error('A user associated with this email already exists.');
                }
                return true;
            }
        }
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: 'Name must be a string.',
            bail: true
        },
        isLength: {
            errorMessage: 'Name must be at least 3 characters long.',
            options: { min: 3 }
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password is a required field.',
            bail: true
        },
        isString: {
            errorMessage: 'Password must be a string.',
            bail: true
        },
        isLength: {
            errorMessage: 'Password must be at least 8 characters long.',
            options: { min: 8 }
        }
    }
}

const loginBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Email is a required field.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email must be a valid email.',
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password is a required field.',
            bail: true
        },
        isString: {
            errorMessage: 'Password must be a string.',
        }
    }
}

module.exports = {
    registerBody,
    loginBody
}
