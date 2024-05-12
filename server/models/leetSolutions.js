const mongoose = require('mongoose')

const leetSchema = new mongoose.Schema({
    problem_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    problem_statement:{
        type: String,
        required: true
    },
    problem_solution:{
        type: String,
        required: true
    },
    problem_code:{
        type: String,
        required: true
    },
    examples: [{
        input: [Number],
        output: [Number]
    }],
    constraints: {
        type: String
    }



})

module.exports = mongoose.model('leettest', leetSchema)