const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');



app.use("/",express.static(path.join(__dirname, 'public')));
app.use("/css",express.static(path.join(__dirname, '/css')));
app.use("/js",express.static(path.join(__dirname, '/js')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/projects-db');
var db = mongoose.connection;

Lesson = require('./models/lesson');


app.get('/lesson', (req, res) => {
	Lesson.getLesson((err, lesson) => {
		if(err){
			throw err;
        }
		res.send(lesson);
	});
});

app.put('/lesson/:id', (req, res) => {
	var id = req.params.id;
	var lesson = req.body;
	console.log("Gelen Veri: " + JSON.stringify(lesson, "", 2));
	Lesson.updateLesson(id, lesson, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(lesson);
	});
});


app.listen(3000);
console.log("Server 3000 numaralı portta aktif");