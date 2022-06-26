const express = require('express')
const router = express.Router();

const db = require('../models/index')

router.post('/reviews', async (req, res, next) => {
    try {
        const createdReview = await db.Review.create(req.body);
        console.log(`The created review is ${createdReview}`)
        res.redirect('/tutorials');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;