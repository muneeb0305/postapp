const { mongoose } = require('mongoose');
const Posts = require('../Models/PostModel')
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken')
const SecretKey = 'MERNdeveloper'

//Delete Post
const deletePost = (id) => {
    //Search Post by id and delete it
    return Posts.deleteOne({ _id: id })
        .then(() => { console.log("Post Deleted") })
        .catch((err) => {
            const error = new Error('Post Not Found');
            error.statusCode = 400;
            throw error;
        })
};
//Delete Comment
const deleteComment = (req) => {
    //Get Post ID and Comment Id from req.body
    const { PostID, CommentID } = req.body;
    //search post by id and by using pull remove the comment which id is given 
    return Posts.findByIdAndUpdate(PostID, { $pull: { comments: { _id: CommentID } } }, { new: true })
        .then((post) => {
            //if post not found
            if (!post) {
                const error = new Error('Post Not Found');
                error.statusCode = 400;
                throw error;
            }
            console.log('Comment Deleted');
        })
        .catch((err) => {
            throw err;
        })
};
//Add Post
const addPost = (req) => {
    //Get post from req.body
    const { post } = req.body;
    //Get token from req.header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    let userID;
    //verify token if verified successfully then decode it and get the userID
    jwt.verify(token, SecretKey, (err, decoded) => {
        if (err) {
            const error = new Error('Token is not valid');
            error.statusCode = 400;
            throw error;
        } else {
            userID = decoded.ID;
        }
    });
    //Find user by userID
    return User.findById(userID)
        .then((user) => {
            if (!user) {
                const error = new Error('User Not Found');
                error.statusCode = 400;
                throw error;
            }
            //Create Post
            const newPost = new Posts({
                user_id: userID,
                user_Name: user.name,
                post: post
            })
            //Save Post
            return newPost.save()
                .then(() => console.log("Post Added"))
                .catch((error) => { throw error })
        })
        .catch((err) => {
            throw err;
        })
}
// Add Comment
const addComment = (req) => {
    //Get PostID and comment from req.body
    const { PostID, comment } = req.body;
    //CommentID
    const commentId = new mongoose.Types.ObjectId();
    //Search post by postID
    return Posts.findById(PostID)
        .then((post) => {
            //If Post not Found
            if (!post) {
                const error = new Error('Post Not Found');
                error.statusCode = 400;
                throw error;
            }
            //Push the comment in post
            post.comments.push({ _id: commentId, comment: comment });
            return post.save()
                .then(() => console.log("Comment Added"))
                .catch((err) => { throw err; });
        })
        .catch((err) => {
            throw err;
        });
};
//Update Post
const updatePost = (req) => {
    //Get PostID and post from req.body
    const { PostID, post } = req.body
    const bodyValidation = Object.keys(req.body).length
    if (bodyValidation === 2) {
        //Search Post & update post
        return Posts.findOneAndUpdate(
            { '_id': PostID },
            { $set: { 'post': post } },
            { new: true }
        )
            .then((post) => {
                //if post not found
                if (!post) {
                    const error = new Error('Post Not Found');
                    error.statusCode = 400;
                    throw error;
                }
                console.log('Post updated successfully');
            })
            .catch((err) => {
                throw err
            });
    }
}
const updateComment = (req) => {
    //Get CommentID and comment from req.body
    const { CommentID, comment } = req.body
    //Search Post & update comment
    return Posts.findOneAndUpdate(
        { 'comments._id': CommentID },
        { $set: { 'comments.$.comment': comment } },
        { new: true }
    )
        .then((post) => {
            //If post not found
            if (!post) {
                const error = new Error('Post Not Found');
                error.statusCode = 400;
                throw error;
            }
            console.log('Comment updated successfully');
        })
        .catch((err) => {
            throw err;
        });
}
const getPost = (req) => {
    //get token
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader)
    let userID;
    let Role;
    //decode userid and role
    jwt.verify(token, SecretKey, (err, decoded) => {
        if (err) {
            throw err
        } else {
            userID = decoded.ID;
            Role = decoded.Role;
        }
    });
    //if role is user then show its own post only
    if (Role === 'User') {
        return Posts.find({ user_id: userID }).select(['_id', 'user_Name', 'post', 'comments']).sort('-date')
            .then((items) => {
                return items
            })
            .catch((err) => { throw err })
    }
    //if role is admin than show all posts
    else if (Role === 'Admin') {
        return Posts.find().select(['_id', 'user_Name', 'post', 'comments']).sort('-date')
            .then((items) => {
                return items
            })
            .catch((err) => { throw err })
    }
};


module.exports = { deletePost, addPost, updatePost, getPost, addComment, deleteComment, updateComment };