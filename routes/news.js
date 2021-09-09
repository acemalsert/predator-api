const express = require('express')
const router = express.Router()
const News = require('../models/News')
const User = require('../models/Users')
router.get('/valorant',async (req,res)=>{
    try {
        const valorantNews = await News.find({category:1})
        return res.status(200).send(valorantNews)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/apexLegends',async (req,res)=>{
    try {
        const apexNews = await News.find({category:2})
        return res.status(200).send(apexNews)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/warzone',async (req,res)=>{
    try {
        const warzoneNews = await News.find({category:3})
        return res.status(200).send(warzoneNews)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/other',async(req,res)=>{
    try {
        const otherNews = await News.find({category:4})
        return res.status(200).send(otherNews)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/:category/:title',async (req,res)=>{
    try {
        if(req.params.category === 'valorant'){
            const news = await News.findOne({
                title:req.params.title,
                category:1
            })
            return res.status(200).send(news)
        }
        else if(req.params.category === 'apexLegends'){
            const news = await News.findOne({
                title:req.params.title,
                category:2
            })
            return res.status(200).send(news)
        }
        else if(req.params.category === 'warzone'){
            const news = await News.findOne({
                title:req.params.title,
                category:3
            })
            return res.status(200).send(news)
        }
        else if(req.params.category === 'other'){
            const news = await News.findOne({
                title:req.params.title,
                category:4
            })
            return res.status(200).send(news)
        }
        else{
            return res.status(400).json('Bad Request')
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.post('/addNews',async(req,res)=>{
    try {
        const user =  await User.findById(req.body.userId)
        if (user && Boolean(user.isAdmin) === true){
            const newNews = new News({
                title:req.body.title,
                desc:req.body.desc,
                imgUrl:req.body.imgUrl,
                category:req.body.category,
            })
            await newNews.save()
            return res.status(200).json('Successfull!')
        }
        else{
            return res.status(401).json('Unauthorized')
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})
module.exports = router