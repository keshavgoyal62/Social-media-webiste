const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
    //populate the user of each post
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments').populate('likes');
        
        let users = await User.find({});
        return res.render('home',{
            title: "Home",
            posts: posts,
            all_users : users
        });
    }
    catch(err){
        console.log(err);
        return ;
    }
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()