const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const routes = require('./src/routers/routes');
const multer = require('multer');
const port = 8000;
// const cookieParser = require("cookie-parser");
const session = require('express-session');
require('./src/database/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const static_path = path.join(__dirname,'/public');
const partials_path = path.join(__dirname,'/views/partials');
app.use(express.static(static_path));
app.use(routes);
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false 
}));
// app.use(cookieParser());

app.set('view engine','hbs');
hbs.registerPartials(partials_path);

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

app.listen(port,()=>{
    console.log(`Server running on port no http://localhost:${port}`);
});