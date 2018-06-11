// LOTTERY WITH FRIENDS

require('dotenv').config();	

// FirstTwo lines are required for every EXPRESS JS app
var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	flash				= require("connect-flash"),
	passport    		= require("passport"),
    LocalStrategy   	= require("passport-local"),
    methodOverride		= require("method-override"),
    User            	= require("./models/user"),
	Ticket 				= require("./models/ticket"),
	Player				= require("./models/player"),
	Comment				= require("./models/comment"),
	seedTicketDB		= require("./seedTickets"),
	seedPlayerDB		= require("./seedPlayers")
	


// seedPlayerDB();  SEED PLAYER DATABASE
// seedTicketDB();  SEED TICKET DATABASE

// requiring routes
var playercommentRoutes = require("./routes/playercomments"),
	ticketcommentRoutes = require("./routes/ticketcomments"),
	playerRoutes		= require("./routes/players"),
	ticketRoutes		= require("./routes/tickets"),
	indexRoutes 		= require("./routes/index")

mongoose.connect("mongodb://localhost/lotteryDB");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// MOMENT - provides time stamp to user creations of players, tickets and comments
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Wilson wins the cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/players/:id/comments", playercommentRoutes); 
app.use("/tickets/:id/comments", ticketcommentRoutes);
app.use("/players", playerRoutes);
app.use("/tickets", ticketRoutes);

// to access local images in a folder called "public":
app.use(express.static("public"));

// ******************************************
// START Cloud9 SERVER for LOTTERY WITH FRIENDS
// ******************************************
  app.listen(process.env.PORT, process.env.IP, function(){
  console.log('LOTTERY FOR FRIENDS Server listening on port 3000');
});