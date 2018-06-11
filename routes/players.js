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

var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//#############################
// INDEX -- show all players 
// Pagination included
// Search included

router.get("/", function(req, res){
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Player.find({name: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allPlayers) {
            Player.count({name: regex}).exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allPlayers.length < 1) {
                        noMatch = "No Players match that query, please try again.";
                    }
                    res.render("players/indexplayers", {
                        players: allPlayers,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search
                    });
                }
            });
        });
    } else {
        // get all campgrounds from DB
        Player.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allPlayers) {
            Player.count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("players/indexplayers", {
                        players: allPlayers,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: false
                    });
                }
            });
        });
    }
});

//#############################

// CREATE - add new player to database 
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
	var person = req.body.player.person;
  var desc = req.body.player.description;
  var wager = req.body.player.wager;
  var contactInfo = req.body.player.contactInfo;
	
cloudinary.uploader.upload(req.file.path, function(result) {
  var image = result.secure_url;
  var author = {
      id: req.user._id,
      username: req.user.username
      };
  
  //  Insertion of Google Maps code begins here:
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newPlayer = {
      person: person, 
      image: image, 
      description: desc, 
      author:author, 
      wager:wager, 
      location: location, 
      lat: lat, 
      lng: lng
    };
  // END of Google Maps code
  
      Player.create(newPlayer, function(err, player) {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('back');
        }
        res.redirect('/players/' + player.id);
      });
    });
  });
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
		// res.render("players/editplayer", {player: foundPlayer});
	});	
});

// NEW UPDATE PLAYER ROUTE
router.put("/:id", middleware.checkPlayerOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.player.lat = data[0].latitude;
    req.body.player.lng = data[0].longitude;
    req.body.player.location = data[0].formattedAddress;

    Player.findByIdAndUpdate(req.params.id, req.body.player, function(err, player){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/players/" + player._id);
        }
    });
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;