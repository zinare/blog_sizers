exports.router = function(req, res){
	var var1="",var2="",var3="";

	if(req.params.var1) var1 = req.params.var1;
	if(req.params.var2) var2 = req.params.var2;
	if(req.params.var3) var3 = req.params.var3;

	if(var1=="") res.render('index',{title:"test"});
	else if(var1=="post") {
		if(var2 == "all") 	res.render('index',{title:"test"});
	}
	else if(var1=="guestbook") res.render('index',{title:"test"});
	else if(var1=="profile") res.render('index',{title:"test"});

	//res.write(var1 + "/" + var2 + "/" + var3);
	res.end();
	/*
	res.render(
		'index', 
		{title:	'Cleaning Supplies', supplies:	['mop', 'broom', 'duster']	}
	)
	*/
};