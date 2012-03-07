exports.router = function(req, res, next){
	var var1="",var2="",var3="";
	
	//Am I doing the right thing??
	if(req.params.var1) var1 = req.params.var1;
	if(req.params.var2) var2 = req.params.var2;
	if(req.params.var3) var3 = req.params.var3;

	if(var1=="") res.render('index',{title:"MAIN"});
	else if(var1=="post") {
		if(var2 == "all") 	res.render('index',{title:"test"});
	}
	else if(var1=="guestbook") res.render('guestbook',{title:"Guest Book"});
	//else if(var1=="guestbook2") res.render('guestbook2',{title:"Guest Book"});
	else if(var1=="profile") res.render('profile',{title:"My Profile"});
	else if(var1=="admin") res.render('admin',{title:"Admin"});
	else next();
	//res.end();
	/*
	res.render(
		'index', 
		{title:	'Cleaning Supplies', supplies:	['mop', 'broom', 'duster']	}
	)
	*/
};
