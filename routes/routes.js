var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var router = express.Router();

// Body Parser
router.use(bodyParser.json()); // Support json encoded bodies
router.use(bodyParser.urlencoded({
    extended: true
})); // Support encoded bodies

// App index page
router.get('/', function(req, res) {

    // get url for scraping
     url = 'http://www.imdb.com/title/tt3385516/';
	// url = 'http://www.imdb.com/title/tt3065204/';

    // structure request call
    request(url, function(error, response, html) {

        // check if no error
        if (!error) {
            var $ = cheerio.load(html);

            // define variable to catch
            var title, release, rating;
            var json = {
                title: "",
                release: "",
                rating: ""
            };

            // Get Title
            $('.title_wrapper h1').filter(function() {

                var data = $(this);

                // get title name
                title = data.contents()
                    .filter(function() {
                        return this.nodeType !== 1;
                    }).text();

                // store to json object
                json.title = title;

            });

            // Get Year
            $('#titleYear a').filter(function() {

                var data = $(this);

                // get release year
                release = data.text();

                // store to json object
                json.release = release;

            });

            // Get rating
            $('.ratingValue').filter(function() {

                var data = $(this);

                // get rating
                rating = data.children().first().text();

                // Store to json object
                json.rating = rating;
            });
        }

		// Render view
        res.render('index', {
            objectjson: json
        });

        console.log('Title = ' + json.title + ' Release Year = ' + json.release + ' Rating = ' + json.rating);

		console.log(json);

    });
});

router.post('/save',function(res, req){

	// Write File sytems
	fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err) {
		console.log('File successfully written! - Check your project directory for the output.json file');
	})

});

module.exports = router;
