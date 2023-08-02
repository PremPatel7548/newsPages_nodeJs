const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/newsPage2')
.then(()=>console.log('connection Success'))
.catch((err)=>console.log(err));