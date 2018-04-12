const mongoose = require('mongoose');

// Lesson Schema
const lessonSchema = mongoose.Schema({
	
	code:String,
	name:String,
	content:String
});

const Lesson = module.exports = mongoose.model('Lesson', lessonSchema,'lesson');

// Get Lesson
module.exports.getLesson = (callback) => {
	Lesson.find(callback);
}