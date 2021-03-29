const mongoose = require('mongoose');
var Exam = require('../models/exam');
var User = require('../models/user');
function writeExamToDB(subject, teacher, date_time){
	
	var exam = new Exam();
	
	exam.subjectName = subject;
	exam.teacherId = teacher;
	exam.dateTime = date_time;
	
	//write to db
	exam.save(function(err, docs){
		if(err) console.error(err);
	});
	
	// get all users
	
	db.collection('user').find({}).forEach(function(user) {
		
		User.update(
			{ _id: user._id },
			{ $push: { exam: exam } },
			function (err, user) {
                     if (err) console.log(err);
                     console.log("1123");
                 }
		)
	});
		// for each user in users
		//user.exam = exam;
		//user.findAndUpdate({"_id":ObjectID(req.params.id)});


	
	// MbLine.findOneAndUpdate({lineName: lineName}, {$push: {departures: departures}}, {upsert: true}, function(err, docs){
		// if(err) console.error(err);
	// });
	

}

//connect to db
mongoose.connect("mongodb://localhost:27017/mean_stack_setup", { useNewUrlParser: true,  useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



db.once('open', function() {

	writeExamToDB("programming", "Saric Lovro", "28/04/21");
	writeExamToDB("maths", "Saric Lovro", "28/04/21");
	writeExamToDB("chemistry", "Saric Lovro", "28/04/21");
	writeExamToDB("physics", "Saric Lovro", "28/04/21");
});



