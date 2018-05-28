var mongoose 	= require("mongoose");
var Ticket 		= require("./models/ticket");
var Comment		= require("./models/comment");

var ticketData = [
	{
	number: "00 11 22 33 44 55 ",
	image: "http://lotoonlayn.ru/wp-content/uploads/2014/12/Powerball-Illinois-ticket-e1419248428245-225x300.jpg",
	description: "Lorem ipsum dolor amet chicharrones keytar readymade gochujang leggings ethical. Jianbing blog chambray 8-bit venmo chia, vexillologist VHS freegan YOLO tumeric pug salvia echo park listicle. Knausgaard brooklyn poutine letterpress, ramps kale chips humblebrag shabby chic pop-up banjo tofu man braid irony. Cardigan activated charcoal raw denim church-key, bitters enamel pin authentic. Air plant roof party pork belly locavore, try-hard schlitz gluten-free. Celiac etsy blue bottle offal glossier"
	},
	{
	number: "00 11 22 33 44 55 ",
	image: "https://www.researchgate.net/profile/Lovemore_Gunda/publication/264155464/figure/fig1/AS:295983930986508@1447579476894/Sample-LOTTO-TM-Betting-Card.png",
	description: "Lorem ipsum dolor amet chicharrones keytar readymade gochujang leggings ethical. Jianbing blog chambray 8-bit venmo chia, vexillologist VHS freegan YOLO tumeric pug salvia echo park listicle. Knausgaard brooklyn poutine letterpress, ramps kale chips humblebrag shabby chic pop-up banjo tofu man braid irony. Cardigan activated charcoal raw denim church-key, bitters enamel pin authentic. Air plant roof party pork belly locavore, try-hard schlitz gluten-free. Celiac etsy blue bottle offal glossier"
	},
	{
	number: "00 11 22 33 44 55 ",
	image: "https://cdn20.patchcdn.com/users/22887410/20170923/112817/styles/T800x600/public/processed_images/powerball-6-dollar-ticket-1506180432-3914.jpg",
	description: "Lorem ipsum dolor amet chicharrones keytar readymade gochujang leggings ethical. Jianbing blog chambray 8-bit venmo chia, vexillologist VHS freegan YOLO tumeric pug salvia echo park listicle. Knausgaard brooklyn poutine letterpress, ramps kale chips humblebrag shabby chic pop-up banjo tofu man braid irony. Cardigan activated charcoal raw denim church-key, bitters enamel pin authentic. Air plant roof party pork belly locavore, try-hard schlitz gluten-free. Celiac etsy blue bottle offal glossier"
	}
]

function seedTicketDB(){
		// Remove all tickets
		Ticket.remove({}, function(err){
			// if(err){
			// 	console.log(err);
			// } 
			// console.log("Removed Tickets");	
			// // Add a few tickets
			// ticketData.forEach(function(seed){
			// 	Ticket.create(seed, function (err, ticketData){
			// 			if(err){
			// 				console.log(err);
			// 			} else {
			// 				console.log("Added a ticket");
			// 				Comment.create(
			// 						{text: "this ticket may be the winner!!!!",
			// 						 author: "Jomer"
			// 							 }, function(err, comment){
			// 									if(err) {
			// 										console.log(err);
			// 									} else {
			// 										ticketData.comments.push(comment);
			// 										ticketData.save();
			// 										console.log("Created new comment");
			// 									}
			// 							});
			// 			}
			// 		});
			// 	});
		});
}

module.exports = seedTicketDB;


// Following line will send the above function out.
// And will get stored in APP.JS file that has the seedDB object
// on line 10.