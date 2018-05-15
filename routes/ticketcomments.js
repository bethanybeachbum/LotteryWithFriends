// Lottery With Friends
// TICKET COMMENTS ROUTE

var express = require("express");
var router = express.Router({mergeParams: true});
var Ticket = require("../models/ticket");
var Comment = require("../models/comment");

router.get ("/new", isLoggedIn, function(req, res){
		// find ticket by ID 
		Ticket.findById(req.params.id, function(err, ticket){
			if(err){
				console.log(err);
			} else {
				res.render("ticketcomments/new", {ticket: ticket})
			}
		});
	});

// The data that gets posted is coming from a form in the view, it gets parsed by body-parser
// and added to the req.body object where it can be accessed in the POST route.

router.post("/", function(req, res){
	// lookup campground using ID
	Ticket.findById(req.params.id, function(err, ticket){			
		if(err) {
			console.log(err);
			res.redirect("/tickets");
		} else {
			Comment.create(req.body.comment, function(err,comment){
				if(err){
				 console.log(err);
				 } else {
				 	// Add username and ID to comment
				 	comment.author.id = req.user._id;
				 	comment.author.username = req.user.username;
				 	// Save comment
				 	comment.save();
					ticket.comments.push(comment);	
					ticket.save();
					console.log(comment);
					res.redirect('/tickets/' + ticket._id);
				 }
			});
		}
	});
});	

router.get("/:comment_id/edit", function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment) {
	   if(err) {
	   	res.redirect("back");
	   } else {
	   	res.render("ticketcomments/edit", {ticket_id:req.params.id, comment: foundComment});
	   }
	});
});




// function to insure user is logged in
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;

