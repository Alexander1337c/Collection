const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    file: {
        type: {},
        contentType: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    item: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            title: {
                type: String,
                required: true
            },
            author: {
                type: String
            },

            commit: {
                type: String
            },
            file: {
                type: {},
                contentType: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            tags: {
                type: [String],
                required: true
            },
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

})
module.exports = Profile = mongoose.model('profile', ProfileSchema)