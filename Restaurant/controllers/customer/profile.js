const Cust =require('../models/customer');

exports.get_test = (req,res,next) => {
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
exports.get_profile = (req,res,next) => {
    Cust.get_profile(id).then((answer1) =>{
        res.render('customer/profile', {
            path: '/customer/profile',
            customer_details: answer1
        });
    })
};

exports.post_profile = (req,res,next) => {
    const password=req.body.password;
    const phone=req.body.password;
    const name=req.body.name;
    const address=req.body.address;
 
    Cust.update_profile(name,phone,password,address).then((answer1) => {
        res.redirect('/customer/profile');
    })
}

exports.post_test_cart=(req,res,next) => {
    const itemid=req.body.product_id;
    
    Prod.item_quant(itemid).then((answer1) => {
        // console.log(answer1);
        if(answer1.rows[0].quantity<=0){
            res.redirect('/prods');
        }
        else{
            Prod.dec_prod(itemid).then((answer2) =>{
                Prod.check_in_cart(itemid).then((answer3) =>{
                    res.redirect('/cart');
                })
            })
        }
    })
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