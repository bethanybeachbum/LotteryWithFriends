// Lottery With Friends -- PLAYERS

var express = require("express");
var router = express.Router();
var Player = require("../models/player");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'henlopen-hackers', 
  api_key: 268875837274321, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
	cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.player.image = result.secure_url;
  // add author to campground
  req.body.player.author = {
    id: req.user._id,
    username: req.user.username
  }
  Player.create(req.body.player, function(err, player) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.redirect('/players/' + player.id);
  });
});
});	
	
// 	// get data from form
// 	var person = req.body.person;
// 	var image = req.body.image;
// 	var contactInfo = req.body.contactInfo;
// 	var wager = req.body.wager;
// 	var author = {
// 		id: req.user._id,
// 		username: req.user.username
// 	}
// 	var newPlayer = {
// 		person: person, 
// 		image: image,
// 		contactInfo: contactInfo,
// 		wager: wager,
// 		author:author
// 	}
	
// // create a new player and add to players database -- matches line 101
// Player.create(newPlayer, function(err, newlyCreated){
// 		if(err){
// 			console.log(err);
// 		}	else {
// 			res.redirect("/players");
// 		}
// 	});
// 	// players.push(newPlayer);
// 	// redirect back to campgrounds
// });

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