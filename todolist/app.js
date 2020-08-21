//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-mathe:Yunurati718293@cluster0-3ogh3.mongodb.net/todolistDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const itemSchema = {
    name: String
};

const Item = mongoose.model("Item", itemSchema);


const item1 = new Item({
    name: "Welcome to Todolist!"
});

const item2 = new Item({
    name: "Hit + button to add new item"
});

const item3 = new Item({
    name: "Hit this checkbox to dlete item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
}

const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {

    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) console.log(err);
                else console.log("Successfuly saved default items to DB");
            })
        }
        res.render("list", {
            listTitle: "Today",
            newListItems: foundItems
        });
    });

});

app.post("/", function (req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({
            name: listName
        }, function (err, found) {
            found.items.push(item);
            found.save();
            res.redirect("/" + listName);
        });
    }


});


app.post("/delete", function (req, res) {

    const checkedBoxid = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedBoxid, function (err) {
            if (err) console.log(err);
            else console.log("Removed successfuly")
        });
        res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedBoxid}}}, function(err, reslt){
            if(err) console.log(err);
            else {
                res.redirect("/"+listName);
            }
        });
    }


});



app.get("/:work", function (req, res) {
    const workName = _.capitalize(req.params.work);
 
    List.findOne({
        name: workName
    }, function (err, results) {
        if (err) console.log(err)
        else if (!results) {
            const workList = new List({
                name: workName,
                items: defaultItems
            });

            workList.save();
            res.redirect("/" + workName);
        } else {
            res.render("list", {
                listTitle: results.name,
                newListItems: results.items
            });
        }
    });

});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server has started successfuly");
});