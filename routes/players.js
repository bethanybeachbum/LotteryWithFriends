// Lottery With Friends -- PLAYERS

var express = require("express");
var router = express.Router();
var Player = require("../models/player");
var middleware = require("../middleware");

// INDEX -- show all players 
router.get("/", function(req, res){
	// get all tickets from lotteryBD database
	Player.find({}, function (err, allPlayers){
		if(err){
			console.log(err);
		} else {
			res.render("players/indexplayers", {players: allPlayers, currentUser: req.user});
		}
	});
});

// CREATE - add new player to database 
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from form
	var person = req.body.person;
	var image = req.body.image;
	var contactInfo = req.body.contactInfo;
	var wager = req.body.wager;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newPlayer = {
		person: person, 
		image: image,
		contactInfo: contactInfo,
		wager: wager,
		author:author
	}
	
// create a new player and add to players database -- matches line 101
Player.create(newPlayer, function(err, newlyCreated){
		if(err){
			console.log(err);
		}	else {
			res.redirect("/players");
		}
	});
	// players.push(newPlayer);
	// redirect back to campgrounds
});

// NEW form to create new player 
router.get("/newplayer", middleware.isLoggedIn, function(req, res){
	res.render("players/newplayer.ejs");
});

// SHOW -- Shows more info about player 
router.get("/:id", function(req, res){
	// find the ticket with the provided ID
	Player.findById(req.params.id).populate("comments").exec(function(err, foundPlayer){
		if(err) {
			console.log(err);
		} else {
			console.log(foundPlayer);
			
			// render show template with that ticket
		 res.render ("players/showplayer", {player: foundPlayer});
		}
	});
});

// EDIT PLAYER ROUTE
router.get("/:id/edit", middleware.checkPlayerOwnership, function (req, res){
	Player.findById(req.params.id, function(err,foundPlayer){
		res.render("players/editplayer", {player: foundPlayer});
	});	
});

// UPDATE PLAYER ROUTE
router.put("/:id", middleware.checkPlayerOwnership, function(req, res){
	//find and update the correct player
	Player.findByIdAndUpdate(req.params.id, req.body.player, function(err, updatePlayer){
		if(err){
			res.redirect("/players");
		} else {
			res.redirect("/players/" + req.params.id);
		}
	});
});

//DESTROY PLAYER ROUTE
router.delete("/:id", middleware.checkPlayerOwnership, function(req, res){
	Player.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/players");
		} else {
			res.redirect("/players");
		}	
	});
});

module.exports = router;