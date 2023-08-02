const session = require('express-session');
const Category = require('../models/categoryModel');
const Article = require('../models/articleModel');
const multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"./uploads");
    },
    filename:function(req,res,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
});

var upload = multer({
    storage:storage
}).single("image");

const showCategory = async (req,res) =>{
    try{
        const result = await Category.find();
        if(result)
        {
            res.render('adminCategory',{categorys:result});
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const addCategory = async (req,res)=>{
    try{
        const cname = req.body.cname;

        const c = new Category({name:cname});

        const result = await c.save();

        if(result)
        {
            res.redirect('/Category');
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const deleteCategory = async (req,res) =>{
    try{
        const _id = req.params.id;
        const result = await Category.findByIdAndDelete(_id);

        if(result)
        {
            res.redirect('/Category');
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const editCategory = async (req,res)=>{
    try{
        const id = req.params.id;
        const updateData = await Category.findByIdAndUpdate(id,{
            name:req.body.category
        })
        res.render('AdminCategory');
    }
    catch(err)
    {
        console.log(err);
    }
}

const viewArticle = async (req,res)=>{
    try{
        const articles = await Article.find().populate('category_id','name');
            res.render('adminArticle',{articles:articles});
    }
    catch(err)
    {
        res.send(err);
    }
}

const addArticle = async (req,res)=>{
    try{
        const title = req.body.title;
        const author = req.body.author;
        const description = req.body.desc;
        const image = req.file.filename;
        const category_id = req.body.category_id;
        
        const a = new Article({
            title:title,
            author:author,
            description:description,
            image:image,
            category_id:category_id
        });

        const result = await a.save();
        
        if(result)
        {
            res.redirect('/article');
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const deleteArticle = async (req,res) =>{
    try{
        const _id = req.params.id;
        const result = await Article.findByIdAndDelete(_id);

        if(result)
        {
            res.redirect('/article');
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {
    showCategory,
    addCategory,
    deleteCategory,
    editCategory,
    viewArticle,
    addArticle,
    deleteArticle
}