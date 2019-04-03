const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Forum = require('./models/Forum');
const Post = require('./models/Post')
const withAuth = require('./middleware');

const app = express();

const secret = 'secret_should_not_be_in_git';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb+srv://Charlotte:sk8ingwaskool.@cluster0-gwlvd.gcp.mongodb.net/CA2_users?retryWrites=true';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/forum', function(req, res){
  Forum.find({}, function(err, data){
    if (err) throw err;
    res.send(data);
  });
});

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.get('/api/forum/:id/posts', function(req, res){
  Forum.findOne({_id: req.params.id}, function(err, data){
    if (err) throw err;

    Post.find({forum_id: data._id}, function(err, posts){
      if (err) throw err;

      console.log("test");
      res.send(posts);
    });
  });
});

app.post('/api/forum/:id/createPost', function(req, res) {
  const {name} =req.body;
  const forum_id = req.params.id;
  const post = new Post({name, forum_id });
  post.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error creating new post')
    } else {
      res.status(200).send('Post created')
    }
  });
});

app.post('/api/register', function(req, res) {
  const { email, password} = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

app.post('/api/insertPost', function(req, res ){
  const {name, forum_id} = req.body;
  const post = new Post({name, forum_id});
  post.save(function(err){
    if (err){
      console.log(err);
      res.status(500).send('Error creating new post');
    } else {
      res.status(200).send('Post added');
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});


app.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

app.listen(process.env.PORT || 5000);
