//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/keeperDB',{useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "secret string.",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User",userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user);
});
   
  passport.deserializeUser(function(user, done) {
    done(null, user);
});


const noteSchema = new mongoose.Schema({
    timeString: String,
    time: String,
    username: String,
    title: String,
    content: String
})
const Note = new mongoose.model("Note",noteSchema);

app.get('/api/get/:username', function(req,res){
    Note.find({username: req.params.username}).then((notes)=>{res.send(notes)});
})
app.get('/login',function(req,res){
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
      } else {
        res.json({ isAuthenticated: false });
      }
})
app.get('/logout',function(req,res){
    req.logout(function(){});
})
app.post('/api/insert', function(req,res){
    const title = req.body.note.title;
    const content = req.body.note.content;
    const timeString = req.body.note.timeString;
    const time = req.body.note.time;
    const username = req.body.user;
    Note.insertMany([{timeString,time,username,title,content}]).then(()=>{});
})
app.post('/signup',function(req,res){
    User.register({username: req.body.username}, req.body.password, function(err,user){
        if(err){
            console.log(err);
            // res.redirect("/signup");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.send({ message: 'Authentication successful' });
            });
        }
    })
})

app.post("/login", function(req, res){
    User.findOne({username: req.body.username}).then(function(foundUser, err){
        if(foundUser){
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        passport.authenticate("local", function(err, user){
            if(err){
                console.log(err);
            } else {
                if(user){
                    req.login(user, function(err){
                        res.send({ message: 'Authentication successful' });
                        // console.log(user)
                    });
                }
                else {
                    // res.send({message: "no user"});
                }
            }
        })(req, res);
        } else {
            // res.redirect("/login")
        }
    });
});


app.delete('/api/delete/:title/:username/:timeString',function(req,res){
    // console.log(req.params.time);
    Note.deleteOne({timeString:req.params.timeString, username:req.params.username}).then(()=>{});
})

app.listen(4000, function(){
    console.log('server connected on port 4000');
})