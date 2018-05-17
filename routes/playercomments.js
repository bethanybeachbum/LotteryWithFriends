// Lottery With Friends
// PLAYER COMMENTS ROUTE

var express = require("express");
var router = express.Router({mergeParams: true});
var Player = require("../models/player");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get ("/new", middleware.isLoggedIn, function(req, res){
	// find player by ID 
	Player.findById(req.params.id, function(err, player){
		if(err){
			console.log(err);
		} else {
			res.render("playercomments/new", {player: player})
		}
	});
});

// The data that gets posted is coming from a form in the view, it gets parsed by body-parser
// and added to the req.body object where it can be accessed in the POST route.

router.post("/", middleware.isLoggedIn, function(req, res){
	// lookup campground using ID
	Player.findById(req.params.id, function(err, player){
		if(err) {
			console.log(err);
			res.redirect("/players");
		} else {
			// req.body.comment has both pieces of comment info
			Comment.create(req.body.comment, function(err,comment){
				if(err){
				 console.log(err);
				 } else {
				 	// Add username and ID to comment
				 	comment.author.id = req.user._id;
				 	comment.author.username = req.user.username;
				 	// Save comment
				 	comment.save();
					player.comments.push(comment);	
					player.save();
					res.redirect('/players/' + player._id);
				 }
			});
		}
	});
});                                                                                                                                                                                                                                                                                                                                                                                           

//PLAYER COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment) {
	   if(err) {
	   	res.redirect("back");
	   } else {
	   	res.render("playercomments/edit", {player_id:req.params.id, comment: foundComment});
	   }
	});
});

//PLAYER COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment){
   		if(err) {
   			res.redirect("back");
   		} else {
   			res.redirect("/players/" + req.params.id);
   		}
   	});
});

// PLAYER COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err)  {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/players/"+ req.params.id);
		}
	});
});

module.exports = router;