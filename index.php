<?php
	/* 
	Katrina Ezis
	*/
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <title>CRUD</title>
	    <!-- <link rel="icon" type="image/png" href="img/car.png" /> -->

	    <!-- jQuery, Bootstrap, Font Awesome -->
	    <script src="https://code.jquery.com/jquery.min.js"></script>
	    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

	    <!-- Parse Library -->
	    <script src="//www.parsecdn.com/js/parse-1.6.0.min.js"></script>

	    <!-- raty-fa -->
	    <script type="text/javascript" src="js/jquery.raty-fa.js"></script>
 
	    <!-- Custom files -->
	    <script type="text/javascript" src="js/crud.js"></script>
	    <link rel="stylesheet" href="css/main.css"/>
	</head>
	<body>
		<div id="header" class="text-center">
			<div id="blur">
				<div id="chosen">
					<img id="pick" src="image/hipster.png">
				</div>
				<div id="choose">
					<?php
						$files = glob('hipsters/*.jpg');
						foreach($files as $file) {
					?> <img class="hipster" src="<?= $file ?>"> <?php
						}
					?>
				</div>
				<div id="average">
					<h3>Average Rating: <span id="aveRating"></span></h3>
					<h6>Hipsters are cool</h6>
				</div>
			</div>
		</div>
		<div id="enterReview">
			<h2>Write a Review!</h2>
			<form class="container">
				<!-- 
					stars
					title for review
					review
					save -->
				<div id="star"></div>
				<input class="form-control" id="title" placeholder="enter a short title for your review"></input>
				<input class="form-control" id="review" placeholder="write your review here before it gets cool"></input>
				<button class="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
		<div id="showReviews" class="container">
			<!-- 
				show all previous reviews -->
		</div>
	</body>
</html>