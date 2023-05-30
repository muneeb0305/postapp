const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user_Name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    post: {
        type: String,
        required: true
    },
    comments: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        comment: {
            type: String,
        }
    }],
    
}, { versionKey: false });

module.exports = mongoose.model('posts', postSchema)
