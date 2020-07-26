const express = require('express');
const mainRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;



mainRouter.post('/addTime', function (req, res) {
    var emploeys = null;
    // Connection url
    const url = 'mongodb://localhost:27017';
    // Database Name
    const dbName = 'clocker';
    // Connect using MongoClient
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
        const col = client.db(dbName).collection('emploey');
        console.log(req.body.tz);
        var newvalues = {
            $set: {
                houersWorks: [{
                    timeB: req.body.timeB,
                    timeE: req.body.timeE,
                    date: new Date()
                }]
            }
        };
        col.findOne({ tz: req.body.tz }, function (err, result) {
            if (err) {
                console.log(err)
            }
            else {
                //זאת אומרת אין בעיה אבל צריך לבדוק האם אתה קיים
                if (result) {
                    //קיים...
                    col.updateOne({ tz: req.body.tz }, {
                        $push: {
                            houersWorks: {
                                timeB: req.body.timeB,
                                timeE: req.body.timeE,
                                date: new Date()
                            }
                        }
                    }, function (err, result) {
                        if (err) {
                            res.send('<b>error</b>');
                        } else {
                            console.log(result);
                            res.send(result);
                        }
                    })
                    console.log(result);
                }
                //לא קיים 
                else {
                    var myObject = {
                        firstName: req.body.fname,
                        lastName: req.body.lname,
                        tz: req.body.tz,
                        phone: null,
                        mail: null,
                        isactive: true,
                        houersWorks: [{
                            timeB: req.body.timeB,
                            timeE: req.body.timeE,
                            date: new Date()
                        }]
                    };
                    col.insert(myObject, function (err, result) {
                        if (err) {
                            res.send('<b>error</b>');
                        } else {
                            console.log(result);
                            res.send(result);
                        }
                    })
                    console.log(result);
                }
            }
        });


    });
});



mainRouter.post('/getDetailsOfhouers', function (req, res) {
    var myQuery = { tz: req.body.id };
    const url = 'mongodb://localhost:27017';
    const dbName = 'clocker';
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        const col = client.db(dbName).collection('emploey');
        col.findOne(myQuery, { projection: { houersWorks: 1 } }, function (err, result) {
            if (err) {
                res.send('<b>error</b>');
            } else {
                var dateTime = require('node-datetime');
                for (var i = 0; i < result.houersWorks.length; i++) {
                    var dt = dateTime.create(result.houersWorks[i].date);
                    //השתמשתי פה רק בתאריך .... כי שעה לא רלוונטי כאן
                    var formatted = dt.format('Y-m-d');
                    result.houersWorks[i].date = formatted;
                }
                res.send(result);
            }
        }
        );
    });
});

module.exports = mainRouter;