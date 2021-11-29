const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Property, User } = require('../models');

router.get('/', /*withAuth,*/ (req, res) => {
    Property.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'title', 'created_at']
    })
        .then(dbPropertyData => {
            const properties = dbPropertyData.map(post => post.get({ plain: true }));
            res.render('dashboard', { properties, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { loggedIn: true })
})

router.get('/edit/:id', withAuth, (req, res) => {
    Property.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'property_content', 'title', 'created_at']
    })
        .then(dbPropertyData => {
            if (!dbPropertyData) {
                res.status(404).json({ message: 'No property found with this id' });
                return;
            }
            const post = dbPropertyData.get({ plain: true });
            res.render('edit-property', { property, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;