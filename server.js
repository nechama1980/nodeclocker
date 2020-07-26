const express = require('express');
const app = express();
const emploey = require('./emploey');
const bodyParser = require('body-parser');
const present=require('./present')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000, function () {
    console.log("listen to port 3000")
})

//פונקציה שתמיד מגיע אליה קודם ואז ממשיך הלאה כי יש לה נקסט
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.get('/', function (req, res) {
    res.send('<b>Hello World!</b>');
});
app.use('/emploey', emploey);
console.log("hi")
app.use('/present', present);
debugger;
//בסוף אחרי שהוא עבר אחד אחד ולא יצא לו להכנס לאף אחד... כי לא מצא כזה ניתוב...
app.use(function (req, res, next) {
    res.send("url not found");
});





