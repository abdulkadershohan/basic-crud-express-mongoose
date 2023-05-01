const express = require('express');
const monogoose = require('mongoose');
const app = express();
const port = 3000;
const todoHandler = require('./routeHandler/todoHandler');
// all data sent to the server is in JSON format
app.use(express.json());

// connect to mongodb database
monogoose.connect('mongodb://127.0.0.1/todo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Connected to mongodb database')
}).catch((error) => {
    console.log('Error connecting to mongodb database', error)
});

// routes
app.use('/todo', todoHandler);

// error handler
function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }
    res.status(500).json({ error: error });
}

app.listen(port, () => console.log(`Todo app listening on port ${port}!`));