var express = require('express');

var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/', function(req, res){

  //http://lounaat.info/
  //http://www.soppis.fi/
  //http://www.campusravita.fi/index.php?id=1
  //http://www.sodexo.fi/linna
 // url = 'http://www.imdb.com/title/tt1229340/';
 url = 'http://www.juvenes.fi/Ravintolatjakahvilat/Opiskelijaravintolat/TaYP%C3%A4%C3%A4kampus/tabid/297/moduleid/1147/language/fi-FI/RSS.aspx';
  request(url, function(error, response, html){
    if(!error){

      var $ = cheerio.load(html);

      var meals;


      var json = [{day: "", meals: ""}]

      $('item').filter(function(){

        var data = $(this);

      //console.log( data.find('title').text() );

        json[0].day = data.find('title').text();
        json[0].meals = data.find('description').text();
    });

    res.json(json);

    }else{
        return res.sendStatus(400);
    }

  });


});

app.listen('8080');

console.log('Magic happens on port 8080');
