
const express = require('express');
const path = require('path');
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');


const signRo = require('./routes/signup_in');
const custRo = require('./routes/customer');
// const delRo = require('./routes/delivery');
// const kitRo = require('./routes/kitchen');
// const manRo = require('./routes/manager');

const pool =  require('./utils/database');


const app = express();

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/',signRo);
app.use('/customer',custRo);
// app.use('/kitchen',kitRo);
// app.use('/delivery',delRo);
// app.use('/manager',manRo);

// app.get('/signin', (req,res) =>{
//     res.coo
// })
app.listen(3000);