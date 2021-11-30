const router = require('express').Router();
const { Property, User, Review } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Property.findAll({
        attributes: [
            'id',
            'address',
        ],
    })
        .then(dbPropertyData => {
            const properties = dbPropertyData.map((property) => 
            property.get({ plain: true }));
            res.render('homepage', {
                properties,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;