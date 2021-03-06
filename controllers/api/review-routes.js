const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Review, User, Property } = require('../../models');


router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Review.create({
            title: req.body.title,
            rating: req.body.rating,
            user_id: req.session.user_id,
            description: req.body.description,
            property_id: req.body.property_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const reviewData = await Review.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!reviewData) {
            res.status(404).json({ message: 'This review does not exist or has already been deleted!' });
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
                {
                    model: Property, 
                    attributes: ['id', 'address'],
                },
            ],
        });

        const review = reviewData.get({ plain: true });

        res.render('review', {
            ...review,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
                {
                    model: Property, 
                    attributes: ['id', 'address'],
                },
            ],
        });

        const review = reviewData.get({ plain: true });

        res.render('updateReview', {
            ...review,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/edit/:id', withAuth, (req, res) => {
    Review.update(
        {
            description: req.body.description,
            title: req.body.title,
            rating: req.body.rating
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
