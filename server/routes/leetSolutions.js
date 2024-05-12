const express = require('express')
const router = express.Router()
const Leet = require('../models/leetSolutions')

//Getting all leets
router.get('/', async (req,res) =>{
    
    try{
        const leets = await Leet.find()
        res.json(leets)
    }catch{
        res.status(500).json({message: err.message})
    }
})
//Getting one leet
router.get('/:id',getLeet, async(req,res) =>{
    
    res.send(res.leet)
})

//Creating one leet
router.post('/', async(req,res) =>{
    const leet = new Leet({
        problem_id: req.body.problem_id,
        title: req.body.title,
        problem_statement: req.body.problem_statement,
        problem_solution: req.body.problem_solution,
        problem_code: req.body.problem_code,
        examples: req.body.examples,
        constraints: req.body.constraints
    })

    try{
        const newLeet = await leet.save()
        res.status(201).json(newLeet)
    }catch(err){
        res.status(400).json({message:err.message})
    }

})

//Updating one
router.patch('/:id', getLeet, async(req,res)=>{
    if(req.body.problem_id != null){
        res.leet.problem_id = req.body.problem_id
    }
    if(req.body.title!=null){
        res.leet.title = req.body.title
    }
    if(req.body.problem_statement!=null){
        res.leet.problem_statement = req.body.problem_statement
    }
    if(req.body.problem_solution!=null){
        res.leet.problem_solution = req.body.problem_solution
    }
    if(req.body.problem_code!=null){
        res.leet.problem_code = req.body.problem_code
    }
    if(req.body.examples!=null){
        res.leet.examples = req.body.examples
    }
    if(req.body.constraints!=null){
        res.leet.constraints = req.body.constraints
    }

    try {
        const updatedLeet = await res.leet.save()
        res.json(updatedLeet)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

//Delete one
router.delete('/:id',getLeet, async(req,res)=>{
    try {
        await res.leet.deleteOne()
        res.json({message: "Deleted Leet"})
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

async function getLeet(req,res,next){
    let leet
    try {
        leet = await Leet.findById(req.params.id)
        if(leet == null){
            return res.status(404).json({message: "Cannot Find leet"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.leet = leet
    next()
}
module.exports = router