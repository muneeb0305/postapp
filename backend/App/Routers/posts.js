const express = require('express')
const router = express.Router()
const { deletePost, addPost, updatePost, getPost } = require('../Controllers/PostService')

/* Delete Post */
router.delete('/delete/:id', (req, res, next) => {
    deletePost(req.params.id)
        .then(() => {
            res.status(200).send('Post Deleted');
        }).catch((error) => next(error));
})
/* Update Post */
router.post('/update/:id', (req, res, next) => {
    updatePost(req)
        .then(() => {
            res.status(200).send('Post Updated');
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
/* Get Post */
router.get('/viewpost', (req, res, next) => {
    getPost()
        .then((data) => {
            res.status(201).send(data)
        })
        .catch((error) => next(error));
})

module.exports = router