var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.load();


//connect to the mongodb database .URI for which is in the env file

mongoose.connect(process.env.DB_URI,{useUnifiedTopology: true,useNewUrlParser: true}, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
    reject(err);
  }
  else {
    console.log('Connection established to', process.env.DB_URI);
    //Close connection
    //db.close();
    
  }
}
);

mongoose.connection.on('error', function(err) {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.'+err);
  process.exit(1);
});

//initialize app to use body-parser .This will help in reading the  http post requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var HomeController = require('./controller/home');

//For set layouts of html view
app.set("view engine", "ejs");

// viewed at http://localhost:8080
app.get('/',function(req, res) {
    //res.sendFile(path.join(__dirname + '/view/index.html'));
    res.render('index.ejs');
});

app.post('/populatesearch',HomeController.getZipCodes);



app.listen(8080);