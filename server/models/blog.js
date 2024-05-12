const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }


})

module.exports = mongoose.model('blogtest', blogSchema)