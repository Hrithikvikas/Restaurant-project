const Prod = require('../models/prod');

const Cust =require('../models/customer');
const Menu = require('../models/menu');

exports.get_home = (req,res,next) => {
    Menu.get_menu().then((answer1) => {
        res.render('customer/home', {
            pageTitle: '',
            path: '/customer/home',
            customer_id: req.body.details, //how do I get the customer details? from req 
            menu_details: answer1 //here we get details of all available items in mneu
        });
    })
    
    // res.render('admin/add_product', {
    //     pageTitle: 'Add Product',
    //     path: '/admin/add-product',
    //     editing: false
    // });


};
//we have addtocart button
exports.post_test_add_cart = (req,res,next) => {
    //do we need recipe id?
    const recipe_id=req.body.recipeid;
    const quantity=req.body.quantity;
    
};
exports.post_test = (req,res,next) => {
    const title = req.body.title;
    const image = req.body.image
    const price = req.body.price;
    const quantity = req.body.quantity;
    const product = new Prod( title, image, price,quantity);
    product
        .add_prod()
        .then(() => {
            res.redirect('/admin/add-product');
        })
        .catch(err => console.log(err));
};