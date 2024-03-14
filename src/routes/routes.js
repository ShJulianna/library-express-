import {BOOK_DOWNLOAD, BOOK_URL, BOOKS_URL, CODES, USER_LOGIN_URL, userData} from "../constants.js";
import {bookStore} from "../stor.js";
import {v4 as uuid} from "uuid";
import express from "express";
import {fileMulter} from '../middleware/file.js';
import * as path from "path";


export const router = express.Router()

router.get(
    USER_LOGIN_URL,
    (req, res) => {
        res.json(userData)
    })

router.get(
    BOOKS_URL,
    (req, res) => {
        const {books} = bookStore
        res.json(books)
    })

router.get(
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

router.get(
    BOOK_DOWNLOAD,
    (req, res) => {
        const {books} = bookStore
        const { id } = req.params
        const book = books.find(el => el.id === id)

        if( book) {
            console.log(path.join(path.resolve(), `/files/downloads/${id}.pdf`))
            res.download(path.join(path.resolve(), `/files/downloads/${id}.pdf`))
        } else {
            res.status(CODES.fail)
            res.json('404 | Книга не найдена')
        }

    })

router.post(
    BOOKS_URL,
    fileMulter.single('file'),
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

router.put(
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

router.delete(
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