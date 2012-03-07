var mongoose = require('mongoose');
var properties = require('./properties.js');
var models = require('./modules/models.js');

var dump = function (obj, name) {
    var indent = "  ";
    if (typeof obj == "object") {
        var child = null;
        var output = (name) ? indent + name + "\n" : "";
        indent += "\t";

        for (var item in obj)
        {
            try {
                child = obj[item];
            } catch (e) {
                child = "<Unable to Evaluate>";
            }

            if (typeof child == "object") {
                output += dump(child, item);
            } else {
                output += indent + item + ": " + child + "\n";
            }
        }

        return output;

    } else {
        return obj;
    }
};

exports.router = function(req, res, next){
	var var1="",var2="",var3="";
	
	//Am I doing the right thing??
	if(req.params.var1) var1 = req.params.var1;
	if(req.params.var2) var2 = req.params.var2;
	if(req.params.var3) var3 = req.params.var3;

	if(var1=="") res.render('index',{title:"MAIN"});
	else if(var1=="callservice") {
		var oInput = {};
		var oOutput = {"retCd":"OK"};
		if(req.body.input) {
			oInput = JSON.parse(req.body.input);
			if(oInput.svcId == "inputPost"){
				var oblogpost = new models.blogposts();
				oblogpost.postTitle= unescape(oInput.postTitle);
				oblogpost.postContent = unescape(oInput.postContent);
				oblogpost.date = new Date();
				mongoose.connect(properties.mongodbUrl);
				oblogpost.save(function(err){
					if(err){//throw err;
						console.log(err);
						oOutput.retCd = "ER";
					}else{
						console.log('saved!');
				 	}
				});
				mongoose.close();
			} 
			if(oInput.svcId == "getPostList"){
				mongoose.connect(properties.mongodbUrl);
				models.blogposts().find(function (err, docs) {
					oOutput["blogposts"] = docs;
					// docs is an array
				});
				mongoose.close();
				
			}
		}
		
		res.write(JSON.stringify(oOutput));

		res.end();
	}
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

