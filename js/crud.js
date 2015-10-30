// Katrina Ezis
// Info 343
// Homework 4
// CRUD Challenge
// This file displays all of the reviews for each
// hipster selected. It will change the reviews based
// upon which hipster is selected.

$(document).ready(function () {
	// Hides the review and average sections
	$('#hide').hide();
	$('#average').hide();

	// Initialize global query variable and two
	// counter variables
	var query;
	var reviewTotal;
	var ratingTotal;
	var img;
	
	// Initialize parse and create a Review object
	Parse.initialize("99KS1v8tzXN49YqcHHTLMyQOIMKSp4EMy9xlChYH", "ckTFvxlJ6j6ICZK5oh6TA2hYpJM3Pqhs8IQ6laOh");
	var Review = Parse.Object.extend('Review');
	// $('#star').raty({'path': '/raty-fa/lib/images' });
	$('#star').raty();

	$('#choose img').click(function() {
		$('#hide').show();
		$('#average').show();
		img = $(this).attr('src');
		$('#pick').attr("src", img);
		getData();
	});

	// When the form is submited it updates the reviews
	$('form').submit(function() {
		var review = new Review();

		var currScore = $('#star').raty('score');
		if (currScore == undefined) {
			currScore = 0;
		}
		review.set('img', img);
		review.set('star', currScore);
		review.set('like', 0);
		review.set('dislike', 0);

		// Finds each input in the form and sends the
		// data to parse, then clears out the input field
		$(this).find('input').each(function() {
			review.set($(this).attr('id'), $(this).val());
			$(this).val('');
		});

		review.save(null, {
			success:getData
		});

		$('#star').raty({
			score: 0
		});

		return false;
	});

	// We get the data back from parse
	// Must make sure that there is a title
	// and a review. Also want to display the
	// data based on when it was created by
	// with the new reviews on top and the older
	// reviews lower down
	var getData = function() {
		query = new Parse.Query(Review);
		query.exists('title');
		query.exists('review');
		query.descending('createdAt');
		query.equalTo('img', img);
		// When it finds data that matches our
		// query it calls buildList
		query.find({
			success:function(results) {
				buildList(results);
			}
		});
	}

	// Sets our counter variables to zero
	// and then begins displaying all of our
	// reviews
	var buildList = function(data) {
		reviewTotal = 0;
		ratingTotal = 0;

		$('#showReviews').empty();
		data.forEach(function(d) {
			reviewTotal++;
			addItem(d);
		});

		var aveRate = ratingTotal/reviewTotal;
		$('#aveRating').raty({
			readOnly: true,
			score: aveRate
		});
	}

	// Gets data from the database and 
	// adds them to the page	
	var addItem = function(item) {
		var star = item.get('star');
		console.log(star);
		var title = item.get('title');
		var review = item.get('review');
		var date = item.get('createdAt');
		date = String(date).substring(4, 15);
		var like = item.get('like');
		var dislike = item.get('dislike');

		ratingTotal += parseInt(star);
		console.log(ratingTotal);

		var div = $('<div class="jumbotron"></div>');
		$('#showReviews').append(div);

		var liked = $('<i id="liked" class="liked fa fa-thumbs-o-up"></i>');
		liked.click(function(){
			query.get(item.id, {
				success: function(review) {
					review.increment("like");
					review.save(null, {
						success:getData
					});
				}
			});
		});

		var disliked = $('<i id="disliked" class="liked fa fa-thumbs-o-down"></i>');
		disliked.click(function(){
			query.get(item.id, {
				success: function(review) {
					review.increment("dislike");
					review.save(null, {
						success:getData
					});
				}
			});
		});

		var del = $("<button id='del' class='btn btn-xs pull-right'><span class='glyphicon glyphicon-remove'></span></button>");
		del.click(function() {
			item.destroy({
				success:getData
			});
		});

		var reviewHead = $('<h2></h2>');
		reviewHead.text(title);

		var reviewBody = $('<h4></h4>');
		reviewBody.text(review);

		
		var stats = $('<div></div>');
		if (like == 0 && dislike == 0) {
			stats.text("This review has received no feedback.");
		} else {
			stats.text(like + " out of " + (like + dislike) + " people agree");
		}

		var dates = $('<div></div>');
		dates.text("posted on: " + date);

		appendTo(div, del);
		appendTo(div, reviewHead);
		$('div:last').raty({
		 	readOnly: true,
			score: star
		});
		appendTo(div, liked);
		appendTo(div, disliked);
		appendTo(div, reviewBody);
		appendTo(div, stats);
		appendTo(div, dates);
	}

	// Appends an item to a div.
	var appendTo = function(div, value) {
		div.append(value);
	}

	getData();
});