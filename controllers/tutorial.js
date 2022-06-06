const express = require('express')
const router = express.Router();

const db = require('../models/index')

router.get('/', async (req, res, next) => {
    try {
        // if(!req.session) res.redirect('/login')
        const tutorials = await db.Tutorial.find({});
        const context = { tutorials }
        console.log(tutorials);
        return res.render('tutorials/index.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

router.get('/new', (req, res) => {
    res.render('new.ejs')
})

router.post('/', async (req, res, next) => {
    try {
        // console.log(`The req.body is ${req.body}`)
        const createdTutorial = await db.Tutorial.create(req.body);
        console.log(`The created product is ${createdTutorial}`)
        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router