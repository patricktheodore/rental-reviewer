const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Property, User, Review } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Review,
                    attributes: ['id', 'title', 'user_id', 'property_id', 'rating', 'description', 'created_at'],
                    include: {
                        model: Property,
                        attributes: ['address']
                    }
                },
            ],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
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