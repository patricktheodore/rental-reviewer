const router = require('express').Router();
const withAuth = require('../../utils/auth')
const { Property, User, Review } = require('../../models');

router.get('/', (req, res) => {
    Property.findAll({
        attributes: [
            'id',
            'property_content',
            'title',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Review,
                attributes: ['id', 'review_text', 'post_id', 'user_id', 'created_at'],
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
        .then(dbPropertyData => res.json(dbPropertyData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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
            res.json(dbPropertyData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Property.create({
        title: req.body.title,
        property_content: req.body.property_content,
        user_id: req.session.user_id
    })
        .then(dbPropertyData => res.json(dbPropertyData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Property.update(
        {
            title: req.body.title,
            property_content: req.body.Property_content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPropertyData => {
            if (!dbPropertyData) {
                res.status(404).json({ message: 'No property found with this id' });
                return;
            }
            res.json(dbPropertyData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Property.destroy({
        where: { id: req.params.id }
    })
        .then(dbPropertyData => {
            if (!dbPropertyData) {
                res.status(404).json({ message: 'No property found with this id' });
                return;
            }
            res.json(dbPropertyData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;