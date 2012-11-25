<!DOCTYPE html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>InfoScreen</title>
		<meta name="description" content="MyTurtle">
		<meta name="viewport" content="width=device-width, user-scalable=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

		<link rel="stylesheet" href="client/css/normalize.css">
		<link rel="stylesheet" href="client/css/main.css">
   		<link type="text/css" rel="stylesheet" href="https://fast.fonts.com/cssapi/66253153-9c89-413c-814d-60d3ba0d6ac2.css"/>
	</head>
	<body>
		<!--[if lt IE 7]>
			<p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
		<![endif]-->

		<div id="container" class="clearfix">

		</div>

		<footer>
			<img src="client/css/images/ft_logo.jpg" alt="FlatTurtle" id="flatturtle-logo" />
			<p id="where" class="text-color"></p>
			<img src="client/css/images/logo_placeholder.png" alt="Logo" id="client-logo" />
		</footer>

		<script src="client/js/libs/jquery.js"></script>
		<script src="client/js/libs/underscore.js"></script>
		<script src="client/js/libs/backbone.js"></script>
		<script src="client/js/libs/mustache.js"></script>
		<script src="client/js/libs/tinycolor.js"></script>
		<script src="client/js/libs/later.js"></script>
		<script src="client/js/libs/duration.js"></script>

		<script src="client/js/core/functions.js"></script>
		<script src="client/js/core/screen.js"></script>
		<script src="client/js/core/interface.js"></script>
		<script src="client/js/core/turtles.js"></script>
		<script src="client/js/core/panes.js"></script>
		<script src="client/js/core/jobs.js"></script>

		<script src="client/js/plugins/clock.js"></script>
		<script src="client/js/plugins/power.js"></script>
		<script src="client/js/plugins/message.js"></script>

		<script>
			Screen.load('<?php echo $alias; ?>.json');
		</script>

	</body>
</html>
