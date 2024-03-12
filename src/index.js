import express from 'express';
import  { v4 as uuid } from 'uuid';
import {BOOK_URL, BOOKS_URL, CODES, USER_LOGIN_URL, userData} from "./constants.js";
import {bookStore} from "./stor.js";



const app = express()
app.use(express.json())


app.get(
    USER_LOGIN_URL,
    (req, res) => {
        res.json(userData)
})

app.get(
    BOOKS_URL,
    (req, res) => {
        const {books} = bookStore
        res.json(books)
})

app.get(
    BOOK_URL,
    (req, res) => {
        const {books} = bookStore
        const { id } = req.params
        const book = books.find(el => el.id === id)

        if( book) {
            res.json(book)
        } else {
            res.status(CODES.fail)
            res.json('404 | Книга не найдена')
        }

})

app.post(
    BOOKS_URL,
    (req, res) => {
        const {books} = bookStore

        const newBook = {
            ...req.body,
            id: uuid(),
        }
        books.push(newBook)

        res.status(CODES.success)
        res.json(newBook)
})

app.put(
    BOOK_URL,
    (req, res) => {
        const {books} = bookStore
        const { id } = req.params
        let book = books.find(el => el.id === id)

        if (book){
            book = {
                ...book,
                ...req.body
            }

            res.json(book)
        } else {
            res.status(CODES.fail)
            res.json('404 | Книга не найдена')
        }
})

app.delete(
    BOOK_URL,
    (req, res) => {
        const {books} = bookStore
        const {id} = req.params
        const bookIndex = books.findIndex(el => el.id === id)

        if(bookIndex !== -1){
            books.splice(bookIndex, 1)
            res.json("ok")
        } else {
            res.status(CODES.fail)
            res.json('404 | Книга не найдена')
        }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)