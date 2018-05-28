// Lottery With Friends
// TICKET COMMENTS ROUTE

var express = require("express");
var router = express.Router({mergeParams: true});
var Ticket = require("../models/ticket");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get ("/new", middleware.isLoggedIn, function(req, res){
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

// TICKET COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("ticketcomments/edit", {ticket_id: req.params.id, comment: foundComment});
      }
   });
});

//TICKET COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment){
	   	if(err) {
	   		res.redirect("back");
	   	} else {
	   		res.redirect("/tickets/"  + req.params.id);
	   	}
   	});
});


// This can easily be fixed by changing the CSS rule (in your stylesheet) from an id to a class, 
// e.g., #delete-form  to .delete-form then changing both lines of the HTML (24 and 46) 
// from id="delete-form"  to class="delete-form" 

// TICKET COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//findByIDAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err)  {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/tickets/" + req.params.id);
		}
	});
});

module.exports = router;

