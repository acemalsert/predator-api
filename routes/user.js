const express = require('express')
const router = express.Router()
const User = require('../models/Users')

router.put('/addComment/:id',async(req,res)=>{
    try {
        if(req.body.userId === req.params.id){
            const comment = {
                comment:req.body.commentDesc
            }
            await User.findByIdAndUpdate(req.body.userId,{
                $push:{comments:comment}
            })
            return res.status(200).json('Comment has been added successfuly')
        }
        else{
            return res.status(400).json('Bad request')
        }
    } catch (error) {
        return res.status(500).send(error)
    }

})
router.put('/deleteComment/:id',async(req,res)=>{
    try {
        if(req.body.userId === req.params.id){
            const comment = {
                comment:req.body.commentDesc
            }
            await User.findByIdAndUpdate(req.body.userId,{
                $pull:{comments:comment}
            })
            return res.status(200).json('Comment has been deleted successfuly')
        }
        else{
            return res.status(400).json('Bad request')
        }
    } catch (error) {
        return res.status(500).send(error)
    }

})

module.exports=router