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

router.get('/property/:id', async (req, res) => {
    try {
        const propertyData = await Property.findByPk(req.params.id, {
            include: [
                {
                    model: Review,
                    attributes: ['id', 'title', 'rating', 'property_id', 'user_id', 'created_at', 'description'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
            ]
        });

        const property = propertyData.get({ plain: true });

        res.render('property', {
            ...property,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;