const express = require('express')
const router = express.Router()
const News = require('../models/News')
const User = require('../models/Users')
const multer = require('multer')

const diskStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        let filename = Date.now()+file.originalname
        cb(null,filename)
    }
})

function fileFilter (req, file, cb) {
    const check = async ()=>{
        try {
            const user = await User.findById(req.body.userId)
            if(user){
                if(Boolean(user.isAdmin) === true && (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/svg")){
                    cb(null, true)
                }
                else{
                    cb(null, true)
                }
            }  
        } catch (error) {
            console.log(error)
        } 
    }
    check()
}
const upload = multer(
    {
        storage:diskStorage,
        limits:{
            fileSize:1024*1024*4
        },
        fileFilter:fileFilter,
    }) 

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
router.post('/addNews',upload.single('news_image'),async(req,res)=>{
    try {
        if(req.file){
            const newNews = new News({
                title:req.body.title,
                desc:req.body.desc,
                imgUrl:req.file.path,
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