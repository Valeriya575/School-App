const mongoose = require('mongoose');
var User = require('../models/user');

const examSchema = new mongoose.Schema({
	
    subjectName: String,
	teacher: String,
	dateTime: String,
});

const Exam = mongoose.model('Exam', examSchema, 'exam');

module.exports = Exam;