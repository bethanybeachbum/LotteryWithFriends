// All Middleware Goes Here
var Player = require("../models/player");
var Ticket = require("../models/ticket");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkPlayerOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Player.findById(req.params.id, function(err,foundPlayer){
			if(err) {
				res.redirect("back");
    			} else {
    				// does user own the ticket?
    				if(foundPlayer.author.id.equals(req.user._id)) {
    				next();
    			} else {
    				res.redirect();	
    			}
			}
		});	
	} else {
	res.redirect("back");
	}	
}

middlewareObj.checkTicketOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Ticket.findById(req.params.id, function(err,foundTicket){
    		if(err) {
    				res.redirect("back");
    			} else {
    				// does user own the ticket?
    				if(foundTicket.author.id.equals(req.user._id)) {
    				next();
    			} else {
    				res.redirect();	
    			}
			}
		});	
	} else {
	res.redirect("back");
	}	
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,foundComment){
    		if(err) {
    				res.redirect("back");
    			} else {
    				// does user own the comment?
    				if(foundComment.author.id.equals(req.user._id)) {
    				next();
    			} else {
    				res.redirect();	
    			}
			}
		});	
	} else {
	res.redirect("back");
	}	
}

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = middlewareObj;