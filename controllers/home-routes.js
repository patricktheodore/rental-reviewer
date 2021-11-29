const router = require('express').Router();
const { Property, User, Review } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Property.findAll({
        attributes: [
            'id',
            'address',
        ],
        include: [
            {
                model: Review,
                attributes: ['id', 'title', 'property_id', 'user_id', 'rating', 'description'],
                include: {
                    model: User,
                    attributes: ['name', 'id']
                }
            },
        ]
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

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

router.get('/property/:id', (req, res) => {
    Property.findOne({
        where: { id: req.params.id },
        attributes: [
            'id',
            'property_content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Review,
                attributes: ['id', 'review_text', 'property_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPropertyData => {
            if (!dbPropertyData) {
                res.status(404).json({ message: 'No property found with this id' });
                return;
            }

            const property = dbPropertyData.get({ plain: true });
            res.render('single-property', {
                property,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;