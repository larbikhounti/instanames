const cheerio = require("cheerio");
const request = require("request");
const express = require("express");
const cors = require('cors');
const fs = require("fs");
const {
    json
} = require("express");
const app = express();
let port = process.env.PORT || 3000;
let $;
let respondGlobal;
let datas = {
    usernames: [""],
    country: "usa"
}
app.get('/', function (req, res) {
    res.json("suername scraper");
  }) // end of get the jobs route

  
app.get('/:country/:pagenumber', function (req, res) {
    respondGlobal = res;

    let myurl = "https://starngage.com/app/global/influencer/ranking/" + req.params.country + "?page=" + req.params.pagenumber + "";
    getUserNames(myurl, req.params.country);

}) // 
app.use(cors());
app.set("port", port);
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


function getUserNames(url, country) {
    let namesusernames;

    request(url, function (error, response, body) {

        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        if (response.statusCode == 200 && body != null) {
            $ = cheerio.load(body);

            let usernames = $(".text-break>a");
            for (let i = 0; i < usernames.length; i++) {
                datas.usernames[i] = $(usernames[i]).text();

            }
            // console.log(datas.usernames);

            let usernamesJson = JSON.stringify(datas.usernames)
            /* if (fs.existsSync(country + ".json")) {
                fs.appendFile(country + ".json", usernamesJson, (err) => {

                });

            } else {
                fs.writeFile(country + ".json", usernamesJson, (err) => {

                });
            }
*/
            respondGlobal.json(datas.usernames);
            respondGlobal.end();


        }

    });


} // end of function 