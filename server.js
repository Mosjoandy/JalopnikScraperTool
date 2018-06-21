var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/JalopnikScraper");
// Routes

app.get("/scrape", function (req, res) {

    axios.get("https://jalopnik.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $("div.post-wrapper").each(function (i, element) {

            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).children().find("h1").text();
            result.link = $(this).children().find("a").attr("href");
            result.excerpt = $(this).children().find("div.excerpt").text();

            db.Article.find({ title: result.title })
                .then(function (poop) {
                    if (poop.length === 0) {
                        db.Article.create(result)
                            .then(function (dbArticle) {
                                // View the added result in the console
                                console.log(dbArticle);
                            })
                            .catch(function (err) {
                                // If an error occurred, send it to the client
                                res.json(err);
                            });
                    };
                });
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scraped some ish");

    });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            if (err) throw err;
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {

    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            if (err) throw err;
        });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {

    db.Note.create(req.body)
        .then(function (sheBangs) {
            db.Article.findOneAndUpdate({ _id: req.params.id }, { note: sheBangs._id }, { new: true })
                .then(function (article) {
                    res.json(article)
                });
        });
});


//////////////////////// END OF THE LINE ////////////////////////

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
