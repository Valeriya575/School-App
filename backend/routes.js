var User = require('./models/user');
var Exam = require('./models/exam');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var ObjectID = require('mongodb').ObjectID; 


module.exports = function(app, db){
	
	// Generic error handler used by all endpoints.
   function handleError(res, reason, message, code) {
     console.log("ERROR: " + reason);
     res.status(code || 400).json({"error": message});
   }
	
	
	// Registers a new user
	app.post('/register', function (req, res, next) {
		
		// Find user by username
		// if(password !== "")
			db.collection('user').findOne({
				"username": req.body.username
				}, function(err, foundUser){
				
				if(err || foundUser != null){
						res.status(400).json({
							err: err
						});
				}
				else{
					// Hash the password using bcrypt
					bcrypt.hash(req.body.password, 10).then((hash) => {
						new_user = new User();
						new_exam = new Exam();
						new_user.name = req.body.name;
						new_user.surname = req.body.surname;
						new_user.username = req.body.username;
						new_user.email = req.body.email;
						new_user.userType = req.body.userType;

						new_user.password = hash;
						
						//if(req.body.userType == 'Student' || req.body.userType == 'Teacher'){
							
							console.log(req.body.userType);
							
							//db.collectoin('exam').findOne({"_id":ObjectID(req.params.id)}, function(err,exam){
							//new_exam.exam = exam;
							
							new_user.save().then((response) => {
								res.status(201).json({
									message: "User successfully created!",
									result: response
								});
							}).catch(error => {
								res.status(400).json({
									error: error
								});
							});
						
						//}
						//});
						
						// else{
							 // res.status(400).json({
							 // err: err
							// });
						// }
						
					});
				}
			});
			
		// else{
			// res.status(500);
		// }
	});

	// Logs the user in
	app.post('/login', function (req, res, next) {
		
		const {username, password } = req.body;

		// Find user by username
		if(password !== "")
			db.collection('user').findOne({
				"username": req.body.username			
				}, function(err, foundUser){
					
					if(err || foundUser == null){
						res.status(500).json({
							err: err
						});
					}
					else{
						bcrypt.compare(password, foundUser.password).then((match) => {
						if (!match) {
								res.status(500).json({
							});
						} else {
							// All OK, generate  a new token
							let payload = {user: foundUser._id};
							const token = jwt.sign(payload,'secret-key-placeholder', {expiresIn: '2h'});
							res.status(200).json({ foundUser, token, message: 'Enjoy your token!' });
						}
						});
						
						
					}
					
			});
		else{
			res.status(500);

		}
			

	});
	
	
	//Post exam
	app.post("/exams", function(req, res){
		
		new_exam = new Exam();
		new_exam.subjectName = req.body.subjectName;
		new_exam.dateTime = req.body.dateTime;
		
		const decoded = jwt.verify(req.body.token, 'secret-key-placeholder');  
		var userId = decoded.user;
		db.collection('user').findOne({"_id": ObjectID(userId)}, function(err, user){
			new_exam.teacher = user.name + " " + user.surname;
			console.log(user.name);
			new_exam.save().then((response)=>{
				res.status(201).json({
					message:"Exam successfully created!",
					result: response
				});
				
			}).catch(error => {
				res.status(500).json({});
			});
			
		});
		
	});
	
	// Get all exams for current user
	app.get("/exams", function(req, res) {
		var token = req.query.token;
		if(token !== "null"){
			//const decoded = jwt.verify(token, 'secret-key-placeholder');  
			//var userId = decoded.user;
			db.collection('exam').find().toArray(function(err, exam){
				res.send(exam);
				//console.log(exam.teacher);
			});
		}
		else
			res.status(500).json({});
	});
	
	//Get a specific exam
	app.get('/exams/:id', (req, res) => {
		db.collection('exam').findOne({
			"_id":ObjectID(req.params.id)
			}, function(err, exam){
				res.send(exam);
			});
	});
	
	//Update a specific exam
	app.put('/exams/:id',function (req, res){
		var assignment = {
			
			"subjectName": req.body.subjectName,
			"teacher": req.body.teacher, 
			"dateTime": req.body.dateTime
			
		};

		db.collection('exam').updateOne(
		
			{"_id": ObjectID(req.params.id)}, 
			
			{$set: assignment},(err, doc) =>{
				if (err) 
				{
					console.log('Error in Assignment Update: '+JSON.stringify(err,undefined,2));
				}else {
					res.send(doc);
				}
		});
		
	});
	
	//Delete a specific exam
	app.delete('/exams/:id', function (req, res) {
		
		db.collection('exam').deleteOne({"_id": new ObjectID(req.params.id)}, function(err, result) {
			if (err) {
				handleError(res, err.message, "Failed to delete exam");
			} else {
				res.status(200).json(req.params.id);
			}
		});
	});
	
}