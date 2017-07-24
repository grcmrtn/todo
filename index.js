var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(express.static(__dirname + '/views'));
/* Using the sessions */
app.use(session({secret: 'todo'}))


/*create an empty array before continuing */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

.use(function(req, res, next){
    if (typeof(req.session.done) == 'undefined') {
        req.session.done = [];
    }
    next();
})

/* The to do list and the form are displayed */
.get('/todo', function(req, res) {
    res.render('index.ejs', {todolist: req.session.todolist});
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* If the item is done*/
.post('/todo/done/:id', urlencodedParser, function(req, res) {
    if (req.params.id != '') {
        req.session.done.push(req.body.newtodo.id, 1);
    }
    res.redirect('/todo');
})

/* Show all the completed items */
.get('/todo/complete/', function(req, res) {
    res.render('complete.ejs', {todolist: req.session.done});
})

/* Show all items */
.get('/todo/all/', function(req, res) {
    res.render('index.ejs', {todolist: req.session.todolist});
})

.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080, function() {
  console.log('connected');
});
