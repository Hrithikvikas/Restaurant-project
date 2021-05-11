//manager analytics page
const Manage =require('../../models/manager');
const Menu =require('../../models/menu');
const Table =require('../../models/tables');
const Kitch =require('../../models/kitchen');

exports.get_test = (req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    console.log("reached get_test of analytics");
    if('user_id' in cookies){
        console.log('correct page')
        //const kitchen_id=cookies.user_id;
        if(cookies.account_type=='manager'){
        	console.log("reached line 15");
			var temp1, temp2, temp3, temp4;
			Manage.analysis_1().then((answer1) => {
				//console.log(answer1);
				temp1 = answer1.rows;
			Manage.analysis_2().then((answer2) => {
				temp2 = answer2.rows;			
			Manage.analysis_3().then((answer3) => {
				temp3 = answer3.rows;			
			Manage.analysis_4().then((answer4) => {
				temp4 = answer4.rows;
			console.log(temp1);
			res.render('./manager/analytics', {
				pageTitle: 'Analytics',
				path: '/manager/analytics',
				c1: temp1, //contains number_of_orders, order_dest
				c2: temp2, //contains total_orders
				c3: temp3, //contains name, Quantity, mydate(orders_online)
				c4: temp4, //contains name, Quantity, mydate(orders_dinein)
			});
			});
			});
			});
			});
		}
		else{
			//send message saying that you are not manager.
			res.redirect(cookies.account_type+'/home');
		}
	}
	else{
		//do smthg else
		res.redirect('login');
	}
};

exports.post_test = (req,res,next) => {
	
};