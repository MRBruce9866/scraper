var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var path =require("path")
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gamescraper"


var PORT = process.env.PORT ||3000;

var app = express();
app.use(express.static('models'))
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true });
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname + "/public")));


app.engine("handlebars",exphbs({defaultLayout:"main"}))
app.set("view engine","handlebars")

require("./routes/htmlRoutes")(app)

app.listen(PORT,function(){
    console.log("App is running live!")
})

module.exports = app;