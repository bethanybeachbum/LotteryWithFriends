var mongoose 	= require("mongoose");
var Player 		= require("./models/player");

var playerData = [
	{
	person: "Joe Blow ",
	image: "http://assets.nydailynews.com/polopoly_fs/1.1887778.1406849208!/img/httpImage/image.jpg_gen/derivatives/article_1200/mega-millions-michigan.jpg",
	contactInfo: "joeblow@yahoo.com",
	wager: "10"
	},
	{
	person: "Jack Sprat ",
	image: "https://s.abcnews.com/images/Lifestyle/ht_kenneth_stokes_mt_141024_12x5_992.jpg",
	contactInfo: "SJack@yahoo.com",
	wager: "2"
	},
	{
	person: "Jack Sprat the second ",
	image: "https://s.abcnews.com/images/Lifestyle/ht_kenneth_stokes_mt_141024_12x5_992.jpg",
	contactInfo: "SJack@yahoo.com",
	wager: "2"
	},
	{
	person: "Jay Findley ",
	image: "https://amp.businessinsider.com/images/569014e4c08a80e3098b7a11-960-480.jpg",
	contactInfo: "findley@yahoo.com",
	wager: "4"
	}
]

function seedPlayerDB(){
		//Remove all players
		Player.remove({}, function(err){
				if(err){
					console.log(err);
				}
				console.log("removed players");
		});
	// Add a few players
		playerData.forEach(function(seed){
					Player.create(seed, function (err, playerData){
							if(err){
								console.log(err);
							} else {
								console.log("added a player");
							}
					});
		});
}

// Following line will send the above function out.
// And will get stored in APP.JS file that has the seedDB object
// on line 10.
module.exports = seedPlayerDB;