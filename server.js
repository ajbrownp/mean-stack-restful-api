var Model = require('./models/models.js');
var express = require('express');
var mongoose = require ('mongoose');
var bodyParser = require ('body-parser');
var morgan  = require ('morgan');

var app = express (); //to create instances of the aplication

//db connection
var db = "mongodb://ajbrownp:yaayamor4517@ds141697.mlab.com:41697/meanapp";

mongoose.connect(db, function (err, response){
	if (err) {
		console.log("ERROR: Can not connect to" + " " + db);
	}
	else {
		console.log("We are Connected to" + " " + db);
	}
});

//MIDDLEWARES
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev')); //login part

//examples of how to set diferents views 
// app.get('/home', function (request, response){
// 	response.status(200).send("<h2>Welcome to the MEAN stack home</h2>");
// })

app.use(express.static(__dirname + '/public'));//definir el app para usar el index.html en la carpeta PUBLIC

//CONFIGURING api END POINTS
var router = express.Router();

//GET
router.get('/api/users', function (request, response){ //localhost/api/users
	Model.find({}, function (err, users){ //must pass an empty object in the method find to tell mongo to get everything
   		if (err) {
   			response.status(404).send(err);
   		}
   		else {
   			response.status(200).send(users);
   		}
	});
});

//POST
router.post('/api/users', function (request, response){
	console.log("request from server to POST user data" );
	console.log(request.body );
	var model = new Model (request.body);
	model.save(function (err, user){
		if (err) {
			response.status(500).send(err);
		}
		else{
			response.status(200).send(user);
		}
	});
});

// DELETE
router.delete('/api/users/:id', function (request, response){
	var id = request.params.id;
	Model.remove({_id: id}, function (err, res){
		if (err) {
			response.status(500).send(err);
		}
		else {
			response.status(200).send({message: 'success on deleting user'});
		}
	});
});

//PUT
router.put('/api/users/:id', function (request, response){
	var id = request.params.id;
	Model.findById(id, function (err, user){
		if (err) {
			response.status(404).send(err);
		}
		else {
			user.update(request.body, function (err, success){
				if (err) {
					response.send(err);
				}
				else {
					response.status(200).send({message: 'user updated'});
				}
			});
		}
	});
	// Model.findById({
	// 	query: {_id: id},
	// 	update: {$set: {name: request.body.name, age: request.body.age}},
	// 	new: true}, function (err, success) {
	// 		if (err) {
	// 				response.send(err);
	// 			}
	// 			else {
	// 				response.status(200).send({message: 'user updated'});
	// 			}

	// 	});
});

// setting up app route
app.use('/', router);

//set the listening port for the express server
app.listen(process.env.PORT, function(){
	console.log('Listening on port 4517');
});

