const router = require('express').Router();
const withAuth = require('../../utils/auth')
const { Property, User, Review } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const propertyData = await Property.findAll({
            attributes: ['id', 'address'],
            // order: [['created_at', 'DESC']],
            include: [
                {
                    model: Review,
                    attributes: ['id', 'title', 'rating', 'property_id', 'user_id', 'created_at', 'description'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
            ],
        });

        const properties = propertyData.map((property) => property.get({ plain: true }));


    console.log(properties[0].reviews);


        res.render('propertiesList', {
            properties,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Working Get by ID
router.get('/:id', async (req, res) => {
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

// working post
router.post('/', withAuth, async (req, res) => {
    try {
        const newProperty = await Property.create({
            ...req.body,
        });

        res.status(200).json(newProperty);
    } catch (err) {
        res.status(400).json(err);
    }
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