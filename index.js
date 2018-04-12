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




app.listen(3000);
console.log("Server 3000 numaralı portta aktif");