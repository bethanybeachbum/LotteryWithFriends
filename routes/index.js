// Lottery With Friends/routes/index.js

var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

// this is the creation of the landing page
router.get("/", function(req,res){
	res.render("landing");
});

//  AUTH ROUTES for LotteryWithFriends
// show register form
router.get("/register", function(request, res){
	res.render("register");
});
// handle sign up logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            //return res.render("register");
            res.render("register", {error:err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Lottery With Friends " + user.username);
            res.redirect("/players");
        });
    });
});

//  LOG IN ROUTES
// we need a get request to show the form
// then a post to do the logging in

// show login in form:
router.get("/login", function(req, res) {
    res.render("login");
});

// handle sign up logic
router.post("/login", passport.authenticate("local",
    {
        // successRedirect: "/players",
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

//logic rout for log out
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged You out!");
    // res.redirect("/players");
    res.redirect("/");
});

// function to insure user is logged in
// function isLoggedIn(req, res, next){
//     if (req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;