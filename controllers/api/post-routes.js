const router = require('express').Router();
const { Post, User , Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        include: [{
            model: User,
            attributes: ['name']
        }],
        order: [['date_created', 'DESC']]
    })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
    const requestedId = req.params.id;
    Post.findOne({
        include: [{
            model: User,
            attributes: ['name']
        },
        {
            model: Comment,
            attributes: ['date_created', 'content']
        }],
        where: {
            id: requestedId
        }
    })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.put("/:id", (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        }
    )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

module.exports = router;
