import express from'express';
import errorMiddleware from '../middleware/error.js';
import indexRouter from'../routes/index.js' ;
import bookRouter from '../routes/book.js';

const app = express();
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/books', bookRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
