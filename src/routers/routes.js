const express = require('express');
const routes = new express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination:function(req,file,res){
        res(null,"../newsPages_nodeJs/public/uploads");
    },
    filename:function(req,file,res){
        res(null,Date.now()+path.extname(file.originalname));
    }
});

var upload = multer({
    storage:storage
});

routes.get('/',userController.viewHome);
routes.get('/contectus',userController.viewContect);
routes.get('/login',userController.viewLogin);
routes.get('/signup',userController.viewSignUp);
routes.post('/signup',userController.signup);
routes.post('/login',userController.login);
routes.get('/logout',userController.logout);

routes.get('/Category',adminController.showCategory);
routes.post('/Category',adminController.addCategory);
routes.get('/deleteCategory/:id',adminController.deleteCategory);
routes.patch('/editCategory/:id',adminController.editCategory);

routes.get('/article',adminController.viewArticle);
routes.post('/addArticle',upload.single('image'),adminController.addArticle);
routes.get('/deleteArticle/:id',adminController.deleteArticle);

routes.get("/home_artical" , userController.viewArticle );
routes.get("/searchArticals/:id" , userController.showSearchArticle);
module.exports = routes;