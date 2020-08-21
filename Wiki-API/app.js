//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const e = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const articleSchema = {
    title: String,
    content: String
  }
  
  const Article = mongoose.model("Article", articleSchema);

//TODO

///////////////////////////////////////////         Request targeting whole article          ///////////////////////////////////////////

app.route("/articles")

.get(function(req, res){
    Article.find({}, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
    });
})

.post(function(req, res){

    const newArticle = new Article({
        title: req.body.title,
        content:  req.body.content
    });

    newArticle.save(function(err){
        if(err){
            res.send(err);
        } else {
            res.send("Successfully added.");
        }
    });

})

.delete(function(req, res){

    Article.deleteMany(function(err){
        if(err){
            res.send(err);
        } else {
            res.send("Deleted Successfuly.")
        }
    });

});


///////////////////////////////////////////         Request targeting single article          ///////////////////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req,res){
    Article.findOne({title: req.params.articleTitle}, function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }   else {
            res.send("Article not Found");
        }
    })
})

.put(function(req,res){
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err){
            if(!err){
                res.send("Updated Successfuly");
            } else {
                res.send(err);
            }
        }
    );
})

.patch(function(req,res){
    Article.update(
        {title: req.params.articleTitle},
        {$set: req.body },
        function(err){
            if(!err){
                res.send("Updated Successfuly");
            } else {
                res.send(err);
            }
        }
    );
})

.delete(function(req,res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(err){
                res.send(err);
            } else {
                res.send("deleted Successfully");
            }
        }
        );
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});