const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");
const Forum = require("./models/Forum");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const withAuth = require("./middleware");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());



mongoose.connect(
  process.env.mongo_uri, //Environment variable set on heroku.
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${process.env.mongo_uri}`);
    }
  }
);

app.use(express.static("dist"));

//
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get("/api/forum", function(req, res) {
  Forum.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/api/home", function(req, res) {
  res.send("Welcome!");
});

app.get("/api/forum/:id/posts", function(req, res) {
  Forum.findOne({ _id: req.params.id }, function(err, data) {
    if (err) throw err;

    Post.find({ forum_id: data._id }, function(err, posts) {
      if (err) throw err;

      res.send(posts);
    });
  });
});

app.get("/api/posts/:id/comments", function(req, res) {
  Comment.find({ post_id: req.params.id }, function(err, comments) {
    if (err) throw err;

    res.send(comments);
  });
});

app.get("/api/comments/:id", function(req, res) {
  Comment.findOne({ _id: req.params.id }, function(err, comments) {
    if (err) throw err;
    res.send(comments);
  });
});
app.put("/api/comments/:id/editComment", function(req, res) {
  Comment.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    (err, result) => {
      if (err) throw err;

      console.log("Updated comment in database");
      return res.send({ success: true });
    }
  );
});

app.get("/api/posts/:id", function(req, res) {
  Post.findOne({ _id: req.params.id }, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});
app.put("/api/posts/:id/editPost", (req, res) => {
  const id = req.params.id;

  Post.updateOne({ _id: id }, { $set: req.body }, (err, result) => {
    if (err) throw err;

    console.log("Updated post in database");
    return res.send({ success: true });
  });
});

app.delete("/api/forum/:id/posts/delete", (req, res) => {
  Post.deleteOne({ _id: req.body.id }, err => {
    if (err) return res.send(err);

    console.log("deleted from database");
    return res.send({ success: true });
  });
});

app.post("/api/forum/:id/createPost", withAuth, function(req, res) {
  const { name, user_id, user_email } = req.body;
  const forum_id = req.params.id;
  const post = new Post({ name, forum_id, user_id, user_email });
  post.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating new post");
    } else {
      res.status(200).send("Post created");
    }
  });
});

app.post("/api/posts/:id/createComment", withAuth, function(req, res) {
  const { name, user_id, user_email } = req.body;
  const post_id = req.params.id;
  const comment = new Comment({ name, user_id, user_email, post_id });
  comment.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating commment");
    } else {
      res.status(200).send("Comment created");
    }
  });
});

app.delete("/api/posts/:id/comments/delete", (req, res) => {
  Comment.deleteOne({ _id: req.body.id }, err => {
    if (err) return res.send(err);

    console.log("deleted from database");
    return res.send({ success: true });
  });
});

app.post("/api/register", function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post("/api/authenticate", function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password"
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, process.env.secret, {
            expiresIn: "1h"
          });
          res.cookie("token", token, { httpOnly: true });//sets the token cookie for login checks
          res.status(200).send(user); //sends the user object over for current user checks later.
        }
      });
    }
  });
});

app.get("/api/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get("/api/logout", withAuth, function(req, res) {
  res.cookie("token", "", { httpOnly: true }); //Clears the token cookie for login checks
  res.status(200).send();
});

app.listen(process.env.PORT || 5000);
