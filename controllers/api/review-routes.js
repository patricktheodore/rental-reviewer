const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Review } = require('../../models');

router.get('/', (req, res) => {
    Review.findAll()
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.post('/', withAuth, (req, res) => {
//     if (req.session) {
//         Review.create({
//             review_text: req.body.review_text,
//             post_id: req.body.post_id,
//             user_id: req.session.user_id
//         })
//             .then(dbReviewData => res.json(dbReviewData))
//             .catch(err => {
//                 console.log(err);
//                 res.status(400).json(err);
//             });
//     }
// });

// router.post('/', withAuth, async (req, res) => {
//     try {
//         const newReview = await Review.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });

//         res.status(200).json(newReview);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

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





// router.delete('/:id', withAuth, (req, res) => {
//     Review.destroy({
//         where: { id: req.params.id }
//     })
//         .then(dbReviewData => {
//             if (!dbReviewData) {
//                 res.status(404).json({ message: 'No review found with this id' });
//                 return;
//             }
//             res.json(dbReviewData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

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

module.exports = router;
