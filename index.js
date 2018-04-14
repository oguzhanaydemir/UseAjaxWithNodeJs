const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');
var xml = require('xml');



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

app.get('/show-xml', (req, res) => {
	Lesson.getLesson((err, lesson) => {
		if(err){
			throw err;
		}
		var data = {
			code: lesson[0].code,
			name: lesson[0].name,
			content : lesson[0].content
		}
		var xmlString = [ { dersler: [ {bilgiler: [{ dersKodu: data.code } , { dersAdi: data.name }, { dersİcerigi: data.content}]}]}];
		
		xmlString = xml(xmlString, true);
		xmlResponse = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n" + xmlString;
		res.send(xmlResponse);
	});
});

app.get('/show-json', (req, res) => {
	Lesson.getLesson((err, lesson) => {
		if(err){
			throw err;
		}
		res.send(JSON.stringify(lesson, "", 2));
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