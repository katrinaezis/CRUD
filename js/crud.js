$(document).ready(function () {
	var query;
	// var reviewTotal;
	// var ratingTotal;

	Parse.initialize("99KS1v8tzXN49YqcHHTLMyQOIMKSp4EMy9xlChYH", "ckTFvxlJ6j6ICZK5oh6TA2hYpJM3Pqhs8IQ6laOh");
	var Review = Parse.Object.extend('Review');
	$('#star').raty({'path': '/raty/lib/images' });
	


	$('form').submit(function() {
		var review = new Review();

		var currScore = $('#star').raty('score');
		review.set('star', currScore);
		review.set('like', 0);
		review.set('dislike', 0);

		// For each of the form inputs it takes the
		// user input and sets them to parse values
		$(this).find('input').each(function() {
			review.set($(this).attr('id'), $(this).val());
			$(this).val('');
		});

		review.save(null, {
			success:getData
		});

		$('#star').raty({
			path: '/raty/lib/images',
			score: 0
		});

		return false;
	});

	var getData = function() {
		query = new Parse.Query(Review);
		query.notEqualTo('title', '');
		query.notEqualTo('review', '');
		query.descending('createdAt');
		query.find({
			success:function(results) {
				buildList(results);
			}
		});
	}

	var reviewTotal;
	var ratingTotal;
	var buildList = function(data) {
		var reviewTotal = 0;
		var ratingTotal = 0;

		$('#showReviews').empty();
		data.forEach(function(d) {
			reviewTotal++;
			console.log(reviewTotal);
			addItem(d);
		});

		var aveRate = reviewTotal/ratingTotal;
		console.log(reviewTotal);
		console.log(ratingTotal);
		console.log(aveRate);
		$('#averating').raty({
			path: "/raty/lib/images",
			readOnly: true,
			score: aveRate
		});
	}

	
	var addItem = function(item) {
		var star = item.get('star');
		var title = item.get('title');
		var review = item.get('review');
		var date = item.get('createdAt');
		date = String(date).substring(0, 15);
		var like = item.get('like');
		var dislike = item.get('dislike');

		ratingTotal += parseInt(star); 

		var div = $('<div class="jumbotron"></div>');
		$('#showReviews').append(div);
		$('div:last').raty({
			path: "/raty/lib/images",
			readOnly: true,
			score: star
		});

		var del = $("<button class='btn btn-xs'><span class='glyphicon glyphicon-remove'></span></button>");
		del.click(function() {
			item.destroy({
				success:getData
			});
		});
		div.append(del);

		//create and append thumb down button 
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
		div.append(liked);

		var disliked = $('<i id="disliked" class="liked fa fa-thumbs-o-down"></i>');
		disliked.click(function(){
			query.get(item.id, {
				success: function(review) {
					review.increment("dislike");
					review.save(null, {
						success:getData
					});
				}
			})
		});
		div.append(disliked);

		//create and append thumb up button

		//create title portion of reviews
		var reviewHead = $('<h2></h2>');
		reviewHead.text(title);
		div.append(reviewHead);

		var reviewBody = $('<div></div>');
		reviewBody.text(review);
		div.append(reviewBody);

		//stats about how many foudn it useful
		//var stats = $('<div>' + dislike + '</div>');
		//if else
		var stats = $('<div></div>');
		if (like == 0 && dislike == 0) {
			stats.text("bitch");
		} else {
			stats.text(like + " out of " + (like + dislike) + " are bitches");
		}
		div.append(stats);

		var dates = $('<div></div>');
		dates.text("posted on: " + date);
		div.append(dates);
	}

	getData();
});