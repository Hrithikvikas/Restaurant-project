//manager edit menu page
const Manage =require('../../models/manager');
const Menu =require('../../models/menu');
const Table =require('../../models/tables');
const Kitch =require('../../models/kitchen');
const e = require('express');

exports.get_test = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            Menu.get_all_items().then((answer1) =>{
                var p1=answer1.rows;
                var cat_1=[];
                var cat_2=[];
                var cat_3=[];       
                p1.forEach(function(c_row){
                    if(c_row.category == "starters"){
                        cat_1.push(c_row);
                    }
                    else if(c_row.category == "main_course"){
                        cat_2.push(c_row);
                    }
                    else{
                        cat_3.push(c_row);
                    }
                });
                res.render('manager/edit_menu', {
                    pageTitle: 'Edit Menu',
                    path: '/manager/edit_menu',
                    menu_rows: answer1.rows,
                    cat1_name: 'Starters',
                    cat2_name: 'Main Course',
                    cat3_name: 'Dessert',
                    cat1: cat_1,
                    cat2: cat_2,
                    cat3: cat_3
                })
            })
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
}

exports.post_test = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('editing now')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            console.log(req.body.recipeid);
            console.log(req.body.price);
            console.log(req.body.status);
            Menu.update_item(req.body.recipeid,req.body.price,req.body.status).then((answer1) =>{
                console.log('edited menu');
                res.redirect('/manager/edit_menu');
            });
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
        
}