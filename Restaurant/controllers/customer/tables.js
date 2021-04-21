const Table=require('../models/tables');

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
exports.get_cust_table( (req,res,next) =>{
    Table.get_customer_table(customer_id).then((answer1)){
        res.render('customer/tables',{
            path: '/customer/tables',
            tables_booked: answer1,

        })
    }
})

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
//this is used when we choose a table and book it.(i.e press book this table button on table booking page.)
exports.post_book_table( (req,res,next) =>{
    const table_id= req.body.table_id;
    const slotno=req.body.slotno;
    const date=req.body.date;

    //here confirm whether 
})