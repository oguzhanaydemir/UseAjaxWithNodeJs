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

module.exports.updateLesson = (id, lesson, options, callback) => {
	var query = {_id: id};
	var update = {
		code: lesson.code,
		name: lesson.name,
		content: lesson.content
	}
	Lesson.findOneAndUpdate(query, update, options, callback);
}