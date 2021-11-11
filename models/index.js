// import all models
const User = require('./User');
const Post = require('./Post');
const Commet = require('./Comment');

// user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
})

module.exports = { User, Post, Comment };
