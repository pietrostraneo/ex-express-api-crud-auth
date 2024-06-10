const express = require('express');
const app = express();

const postRouter = require('./routers/post.js');
const errorHandler = require('./middlewares/errorHandler.js');
const notFound = require('./middlewares/notFound.js');

const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());

app.use('/posts', postRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})