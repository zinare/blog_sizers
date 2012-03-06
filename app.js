
/**
 * Module dependencies.
 */

var express = require('express');
var ejs = require('ejs');
var util = require('./util.js');
var properties = require('./properties.js');

var app = module.exports = express.createServer();

var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.set('view engine', 'ejs');
  //app.set('view options', { layout: false }) 
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.all("/",function(req,res){
	util.router(req,res);
});
app.all("/:var1",function(req,res){
	util.router(req,res);
});
app.all("/:var1/:var2",function(req,res){
	util.router(req,res);
});
app.all("/:var1/:var2/:var3",function(req,res){
	util.router(req,res);
});


/*
app.get('/', function(req, res){
	res.render('index',{title:"test"});
});

app.get("/save",function(req,res){

	var mongoose = require('mongoose');
    mongoose.connect(properties.mongodbUrl);

    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

    var Comments = new Schema({
        title     : String
      , name      : String
      , date      : Date
    });

    var Comments = mongoose.model('Comments', Comments);
    var post = new Comments();
    post.title='blahblah';
	post.name="Park Jeong Hoon";
    // create a comment
    //post.comments.push({ title: 'My comment' });

    post.save(function (err) {
      if(err){
          throw err;
          console.log(err);
      }else{
          console.log('saved!');
      }
    });

	res.end("saved");
});
*/


/*
// Routes
app.get('/', routes.index);

app.get('/forum', function(req, res){
  res.render('forum',
	{	title:	'Cleaning Supplies',
supplies:	['mop', 'broom', 'duster']	}	  
  );
});
*/

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
