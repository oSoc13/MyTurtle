<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>InfoScreen</title>
        <meta name="description" content="MyTurtle">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
	
        <link rel="stylesheet" href="client/css/normalize.css">
        <link rel="stylesheet" href="client/css/main.css">
        <script src="client/js/libs/modernizr-2.6.1.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->

        <div id="container">
        	<section class="turtle">
            	<section class="publicTransport clearfix">
                	<div class="titleBar clearfix">
                    	<div class="titleBarContainer clearfix">
                        	<div class="icon_big train"></div>
                    		<h2>Vilvoorde</h2>
                        </div>
                    	<div class="titleDistance clearfix">
                        	<div class="distanceBike tbDistance">00:21</div>
                            <div class="distanceByFoot tbDistance">00:40</div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="ptResults">
                        <ul>
                            <li>
                            	<div class="floatLeft">
                                    <div class="infoOrNumber IC"><p>IC</p></div>
                                    <h3 class="destination red">Brussel-Zuid</h3>
                                </div>
                                <div class="time">
                                    <p class="red">Canceled</p>
                                </div>
                                
                            </li>
                            <li>
                            	<div class="floatLeft">
                                    <div class="infoOrNumber L"><p>L</p></div>
                                    <h3 class="destination">Antwerpen-centraal</h3>
                                 </div>
                                 <div class="time">
                                	<p>10:25</p>
                                </div>
                            </li>
                            <li>
                            	<div class="floatLeft subResult">
                                    <div class="infoOrNumber IR"><p>IR</p></div>
                                    <h3 class="destination">Essen</h3>
                                 </div>
                                 <div class="time">
                                	<p>10:25</p>
                                </div>
                            </li>
                             <li>
                            	<div class="floatLeft">
                                    <div class="infoOrNumber IC"><p>IC</p></div>
                                    <h3 class="destination">Charleroi-Zuid</h3>
                                 </div>
                                 <div class="time">
                                	<p>10:36</p>
                                    <p class="red">+0:02</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                <section class="publicTransport clearfix">
                	<div class="titleBar clearfix">
                    	<div class="titleBarContainer clearfix">
                        	<div class="icon_big bus"></div>
                    		<h2>Stop Bicoque</h2>
                        </div>
                    	<div class="titleDistance clearfix">
                        	<div class="distanceBike tbDistance">00:12</div>
                            <div class="distanceByFoot tbDistance">00:30</div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="ptResults">
                        <ul>
                            <li>
                            	<div class="floatLeft">
                                    <div class="infoOrNumber n58"><p>58</p></div>
                                    <h3 class="destination">Vilvoorde-station</h3>
                                </div>
                                <div class="time">
                                    <p>11:25</p>
                                </div>
                                
                            </li>
                            <li>
                            	<div class="floatLeft">
                                    <div class="infoOrNumber n58"><p>58</p></div>
                                    <h3 class="destination">Ysen</h3>
                                 </div>
                                 <div class="time">
                                	<p>10:25</p>
                                    <p class="red">+0:05</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
            <section class="turtle test">
            </section>
        </div>

        <script src="client/js/libs/jquery-1.8.0.min.js"></script>
        <script src="client/js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
