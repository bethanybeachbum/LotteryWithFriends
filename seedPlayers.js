var mongoose 	= require("mongoose");
var Player 		= require("./models/player");
var Comment		= require("./models/comment");

var playerData = [
	{
	person: "Joe Blow ",
	image: "http://assets.nydailynews.com/polopoly_fs/1.1887778.1406849208!/img/httpImage/image.jpg_gen/derivatives/article_1200/mega-millions-michigan.jpg",
	contactInfo: "joeblow@yahoo.com",
	wager: "10 Dollars -- Lorem ipsum dolor amet chicharrones keytar readymade gochujang leggings ethical. Jianbing blog chambray 8-bit venmo chia, vexillologist VHS freegan YOLO tumeric pug salvia echo park listicle. Knausgaard brooklyn poutine letterpress, ramps kale chips humblebrag shabby chic pop-up banjo tofu man braid irony. Cardigan activated charcoal raw denim church-key, bitters enamel pin authentic. Air plant roof party pork belly locavore, try-hard schlitz gluten-free. Celiac etsy blue bottle offal glossier",
	// comment:"The Big Spender"
	},
	{
	person: "Jack Sprat ",
	image: "https://s.abcnews.com/images/Lifestyle/ht_kenneth_stokes_mt_141024_12x5_992.jpg",
	contactInfo: "SJack@yahoo.com",
	wager: "2 Dollars-- Lorem ipsum dolor amet chicharrones keytar readymade gochujang leggings ethical. Jianbing blog chambray 8-bit venmo chia, vexillologist VHS freegan YOLO tumeric pug salvia echo park listicle. Knausgaard brooklyn poutine letterpress, ramps kale chips humblebrag shabby chic pop-up banjo tofu man braid irony. Cardigan activated charcoal raw denim church-key, bitters enamel pin authentic. Air plant roof party pork belly locavore, try-hard schlitz gluten-free. Celiac etsy blue bottle offal glossier",
	// comment: "Waiting for the big hit"
	},
	{
	person: "Jack Sprat the second ",
	image: "https://s.abcnews.com/images/Lifestyle/ht_kenneth_stokes_mt_141024_12x5_992.jpg",
	contactInfo: "SJack@yahoo.com",
	wager: "200 Dollars -- Lorem ipsum dolor amet chicharrones keytar readymade gochujang leggings ethical. Jianbing blog chambray 8-bit venmo chia, vexillologist VHS freegan YOLO tumeric pug salvia echo park listicle. Knausgaard brooklyn poutine letterpress, ramps kale chips humblebrag shabby chic pop-up banjo tofu man braid irony. Cardigan activated charcoal raw denim church-key, bitters enamel pin authentic. Air plant roof party pork belly locavore, try-hard schlitz gluten-free. Celiac etsy blue bottle offal glossier",
	// comment: "Dont call till i am a winner"
	},
	{
	person: "Jay Findley ",
	image: "https://amp.businessinsider.com/images/569014e4c08a80e3098b7a11-960-480.jpg",
	contactInfo: "findley@yahoo.com",
	wager: "4 Dollars -- Lorem ipsum dolor amet chicharrones keytar readymade gochujang leggings ethical. Jianbing blog chambray 8-bit venmo chia, vexillologist VHS freegan YOLO tumeric pug salvia echo park listicle. Knausgaard brooklyn poutine letterpress, ramps kale chips humblebrag shabby chic pop-up banjo tofu man braid irony. Cardigan activated charcoal raw denim church-key, bitters enamel pin authentic. Air plant roof party pork belly locavore, try-hard schlitz gluten-free. Celiac etsy blue bottle offal glossier",
	// comment: "Mom's best friend"
	}
]

function seedPlayerDB(){
		//Remove all players
		Player.remove({}, function(err){
			// 	if(err){
			// 		console.log(err);
			// 	}      
			// 	console.log("removed players");

			// 		// Add a few players
			// 			var counter = 1;
			// 		playerData.forEach(function(seed){
			// 		Player.create(seed, function (err, playerData){
			// 				if(err){
			// 					console.log(err);
			// 				} else {
			// 					console.log("added a player " + counter);
			// 					counter = counter + 1;
			// 					Comment.create({text: "this player is hoping for a win",
			// 						 author: "Jomer"
			// 						 }, function(err, comment){
			// 								if(err) {
			// 									console.log(err);
			// 								} else {
			// 									playerData.comments.push(comment);
			// 									playerData.save();
			// 									console.log("Created new comment")
			// 								}
			// 						});
			// 				}
			// 		});
			// });
	});		
}

// Following line will send the above function out.
// And will get stored in APP.JS file that has the seedDB object
// on line 10.
module.exports = seedPlayerDB;