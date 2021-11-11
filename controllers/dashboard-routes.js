const withAuth = require('../utils/auth');
const router = require('express').Router();
const { Post } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
    .then(data => {
        const allPosts = data.map(post => post.get({plain: true}))
        res.render('all-posts', {
            layout: 'dashboard',
            allPosts
        })
    })
    .catch((err) => res.redirect('login'));
});

router.get('/newPost', (req, res) => {
    res.render('new-post', {
        layout: 'dashboard'
    })
});

router.get('/edit/:id', (req, res) => {
    Post.findOne(req.params.id)
    .then(data => {
        const onePost = data.get({plain: true})
        res.render('edit-post', {
            layout: 'dashboard',
            onePost
        })
    })
    .catch((err) => res.redirect('login'));
});

module.exports = router;
