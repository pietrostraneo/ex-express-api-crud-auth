const express = require('express');
const app = express();

const postRouter = require('./routers/post.js');
const authRouter = require('./routers/auth.js');
const tagRouter = require('./routers/tag.js');

const errorHandler = require('./middlewares/errorHandler.js');
const notFound = require('./middlewares/notFound.js');

const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors({
    origin: '*',
}))

require('dotenv').config();

app.use(express.json());

app.use('/auth', authRouter);

app.use('/posts', postRouter);

app.use('/tags', tagRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})