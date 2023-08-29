const express = require('express');
// const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const hbs = require('hbs');
const routes = require('./src/routers/routes');
const multer = require('multer');
const port = 8000;
// const cookieParser = require("cookie-parser");
const session = require('express-session');
// const { helpers } = require('handlebars');
require('./src/database/connection');
// const helpers = require('./component/hbshelpers');

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

// var hbsHelpers = exphbs.create({
//     extname: '.hbs',
//     defaultLayout: '',
    // Add the runtime option to disable prototype access check
    // helpers:require('./component/hbshelpers'),
//   runtimeOptions: {
//     allowProtoPropertiesByDefault: true,
//     allowProtoMethodsByDefault: true,
//   }
// });
// app.engine('.hbs', hbsHelpers.engine);

// hbsHelpers.handlebars.registerHelper('gt', function (value, threshold, options) {
//     if (value > threshold) {
//       return options.fn(this);
//     }
//   });

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
