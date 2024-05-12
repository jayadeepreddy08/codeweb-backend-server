const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

//Getting all blogs
router.get('/', async (req,res) =>{
    
    try{
        const blogs = await Blog.find()
        res.json(blogs)
    }catch{
        res.status(500).json({message: err.message})
    }
})
//Getting one blog
router.get('/:id',getBlog, async(req,res) =>{
    //res.send(res.blog.title)
    res.send(res.blog)
})

//Creating one blog
router.post('/', async(req,res) =>{
    const blog = new Blog({
        id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })

    try{
        const newBlog = await blog.save()
        res.status(201).json(newBlog)
    }catch(err){
        res.status(400).json({message:err.message})
    }

})
//Updating one

router.patch('/:id', getBlog, async(req,res)=>{
    if(req.body.id != null){
        res.blog.id = req.body.id
    }
    if(req.body.title!=null){
        res.blog.title = req.body.title
    }
    if(req.body.content!=null){
        res.blog.content = req.body.content
    }
    try {
        const updatedBlog = await res.blog.save()
        res.json(updatedBlog)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})
//Delete one
router.delete('/:id',getBlog, async(req,res)=>{
    try {
        await res.blog.deleteOne()
        res.json({message: "Deleted blog"})
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

async function getBlog(req,res,next){
    let blog
    try {
        blog = await Blog.findById(req.params.id)
        if(blog == null){
            return res.status(404).json({message: "Cannot Find blog"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.blog = blog
    next()
}
module.exports = router