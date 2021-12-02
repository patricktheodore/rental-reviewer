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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;