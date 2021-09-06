const express = require('express')
const router = express.Router()
const Forum = require('../models/Forums')
router.post('/addForumEntry/:id',async(req,res)=>{
    try {
        if(req.body.userId === req.params.id){
            const newForum = new Forum({
                userId:req.body.userId,
                title:req.body.forumTitle,
                desc:req.body.desc,
            })
            await newForum.save()

            return res.status(200).json('Forum entry has been added!')
        }
        else{
            return res.status(400).json('Bad request')
        }
    } catch (error) {
        return res.status(500).send(error)
    }    
})
router.delete('/deleteForumEntry/:id',async(req,res)=>{
    try {
        if(req.body.userId === req.params.id){
            await Forum.findByIdAndDelete(req.body.forumId)
            return res.status(200).json('Forum entry has been added!')
        }
        else{
            return res.status(400).json('Bad request')
        }
    } catch (error) {
        return res.status(500).send(error)
    }    
})

module.exports = router