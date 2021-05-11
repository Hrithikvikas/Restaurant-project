const Groc = require('../../models/kitchen');
exports.get_test =(req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        //const kitchen_id=cookies.user_id;
        if(cookies.account_type=='kitchen'){
			Groc.get_groceries().then( (answer1) => {
				var p1=answer1.rows;
				res.render('./kitchen/grocery', {
					pageTitle: 'Grocery',
					path: '/kitchen/grocery',
					c1: p1, //contains item_id, name, quantity
				});
			})
		}
		else{
			res.redirect(cookies.account_type+'/home');
            //send message saying that you are not kitchen.
        }
	}
	else{
		//do smthg else
		res.redirect('/login');
	}	
};

exports.post_test =(req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        //const kitchen_id=cookies.user_id;
        if(cookies.account_type=='kitchen'){
			//check if all items that are in cart are available otherewise error.
			item_id = req.body.item_id;
			quant = req.body.item_quantity;
			Groc.set_item_quantity(item_id,quant).then(() =>{
				res.redirect('/kitchen/grocery');
			})
		}else{
			res.redirect(cookies.account_type+'/home'); //is it home or grocery?
		}
	}else{
		res.redirect('/login');
	}
};
