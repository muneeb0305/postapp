const express = require('express')
const router = express.Router()
const { deletePost, addPost, updatePost, getPost,addComment, deleteComment, updateComment } = require('../Controllers/PostService')

/* Delete Post */
router.delete('/delete/:id', (req, res, next) => {
    deletePost(req.params.id)
        .then(() => {
            res.status(200).send('Post Deleted');
        }).catch((error) => next(error));
})
/* Delete Comment */
router.delete('/deletecomment', (req, res, next) => {
    deleteComment(req)
        .then(() => {
            res.status(200).send('Comment Deleted');
        }).catch((error) => next(error));
})
/* Update Post */
router.post('/updatepost', (req, res, next) => {
    updatePost(req)
        .then(() => {
            res.status(200).send('Post Updated');
        }).catch((error) => next(error))
})
/* Update Comment */
router.post('/updatecomment', (req, res, next) => {
    updateComment(req)
        .then(() => {
            res.status(200).send('Comment Updated');
        }).catch((error) => next(error))
})
/* Add Post */
router.put('/add', (req, res, next) => {
    addPost(req)
        .then(() => {
            res.status(201).send("Post Added")
        })
        .catch((error) => next(error));
})
/* Add Comment */
router.put('/addcomment', (req, res, next) => {
    addComment(req)
        .then(() => {
            res.status(201).send("Comment Added")
        })
        .catch((error) => next(error));
})
/* Get Post */
router.get('/viewpost', (req, res, next) => {
    getPost(req)
        .then((data) => {
            res.status(201).send(data)
        })
        .catch((error) => next(error));
})

module.exports = router