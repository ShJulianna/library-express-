import express from'express';
import { v4 as uuid } from 'uuid';
import {bookStore} from '../src/stor.js';
import {
    BOOK_CREATE_URL,
    BOOK_DELETE_URL,
    BOOK_UPDATE_URL,
    BOOK_URL,
    BOOKS_URL,
    MAIN_PAGE_URL,
    BOOK_DOWNLOAD
} from "../src/constants.js";

const router = express.Router();




router.get(MAIN_PAGE_URL, (req, res) => {
    const {books} = bookStore;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

router.get(BOOK_CREATE_URL, (req, res) => {
    res.render("books/create", {
        title: "Create a book",
        book: {},
    });
});

router.post(BOOK_CREATE_URL, (req, res) => {
    const {books} = bookStore;
    const {title, description} = req.body;

    const newBook = {
        ...req.body,
        id: uuid(),
        title,
        description
    };
    books.push(newBook);
    res.redirect(BOOKS_URL)
});

router.get(BOOK_URL, (req, res) => {
    const {books} = bookStore;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 
        
    res.render("books/view", {
        title: "Book view",
        book: books[idx],
    });

});

router.get('/update/:id', (req, res) => {
    const {books} = bookStore;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    res.render("books/update", {
        title: "Book view",
        book: books[idx],
    });

});

router.post(BOOK_UPDATE_URL, (req, res) => {
    const {books} = bookStore;    const {id} = req.params;
    const {title, description} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    books[idx] = {
        ...books[idx],
        title,
        description,
    };
    res.redirect(`/books/${id}`);

});

router.post(BOOK_DELETE_URL, (req, res) => {
    const {books} = bookStore;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }
    books.splice(idx, 1);
    res.redirect(BOOKS_URL);
});

 export  default router;


// router.get(
//     BOOK_DOWNLOAD,
//     (req, res) => {
//         const {books} = bookStore
//         const { id } = req.params
//         const book = books.find(el => el.id === id)
//
//         if( book) {
//             console.log(path.join(path.resolve(), `/files/downloads/${id}.pdf`))
//             res.download(path.join(path.resolve(), `/files/downloads/${id}.pdf`))
//         } else {
//             res.status(CODES.fail)
//             res.json('404 | Книга не найдена')
//         }
//
//     })
//
// router.post(
//     BOOKS_URL,
//     fileMulter.single('file'),
//     (req, res) => {
//         const {books} = bookStore
//
//         const newBook = {
//             ...req.body,
//             id: uuid(),
//         }
//
//         books.push(newBook)
//         res.status(CODES.success)
//         res.json(newBook)
//     })
//
// router.put(
//     BOOK_URL,
//     (req, res) => {
//         const {books} = bookStore
//         const { id } = req.params
//         let book = books.find(el => el.id === id)
//
//         if (book){
//             book = {
//                 ...book,
//                 ...req.body
//             }
//
//             res.json(book)
//         } else {
//             res.status(CODES.fail)
//             res.json('404 | Книга не найдена')
//         }
//     })
//
// router.delete(
//     BOOK_URL,
//     (req, res) => {
//         const {books} = bookStore
//         const {id} = req.params
//         const bookIndex = books.findIndex(el => el.id === id)
//
//         if(bookIndex !== -1){
//             books.splice(bookIndex, 1)
//             res.json("ok")
//         } else {
//             res.status(CODES.fail)
//             res.json('404 | Книга не найдена')
//         }
//     })