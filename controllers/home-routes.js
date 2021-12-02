const router = require('express').Router();
const { Property, User, Review } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Property.findAll({
        attributes: ['id', 'address'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Review
            }
        ]
    })
        .then(dbPropertyData => {
            const properties = dbPropertyData.map((property) =>
                property.get({ plain: true }));
            res.render('homepage', {
                properties,
                logged_in: req.session.logged_in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login', {
        logged_in: req.session.logged_in
    });

});

module.exports = router;