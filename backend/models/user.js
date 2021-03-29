const mongoose = require('mongoose');
var Exam = require('../models/exam');

const userSchema = new mongoose.Schema({
	username: String,
    name: String,
	surname: String,
	email: String,
	password: String,
	userType: String,
	exam:[{ type: mongoose.Schema.ObjectId, ref: 'Exam'}]


});

const User = mongoose.model('User', userSchema, 'user');
module.exports = User;
