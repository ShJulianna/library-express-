import express from'express';
import {MAIN_PAGE_URL, USER_LOGIN_URL, userData} from "../src/constants.js";

const router = express.Router();

router.get(
    USER_LOGIN_URL,
    (req, res) => {
        res.json(userData)
    })

router.get(MAIN_PAGE_URL, (req, res) => {
    res.render('index', {
        title: 'Главная',
    })
});

export default router;