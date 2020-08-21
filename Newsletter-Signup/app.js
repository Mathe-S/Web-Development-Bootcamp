const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const userName = req.body.userName;
    const email = req.body.email;


    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: userName
            }
        }]
    };

    const jsondata = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/11b4725ee4";
    const option = {
        method: "POST",
        auth: "shamat:6f4a380ea3f35bcf97cd228f517ccbad-us10"
    };

    const request = https.request(url, option, function (response) {


        response.on("data", function (data) {
            if (JSON.parse(data).error_count) res.sendFile(__dirname + "/failure.html");
        else res.sendFile(__dirname + "/success.html");
            console.log(JSON.parse(data));
        });
        
    });

    request.write(jsondata);
    request.end();

    //  console.log(userName);
    //  console.log(email);
    //  console.log(password);
});





app.listen(process.env.PORT || 3000, function () {
    console.log("Server is listening on port 3000");
});


// API Key
//sharvadzemat
// 6f4a380ea3f35bcf97cd228f517ccbad-us10

// list id 
// 11b4725ee4