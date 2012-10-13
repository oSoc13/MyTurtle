<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>InfoScreen</title>
        <meta name="description" content="MyTurtle">
        <meta name="viewport" content="width=device-width">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    
        <link rel="stylesheet" href="client/css/normalize.css">
        <link rel="stylesheet" href="client/css/main.css">
        <script src="client/js/libs/modernizr.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->
			
        <!-- PUBLIC TRANSPORT TURTLE -->
        <div id="container clearfix">
            <section class="panel list">
                <section class="turtle">
                    <div class="titleBar">
                    	<i class="train"></i>
                        <h2>Vilvoorde</h2>
                        <div class="distance">
                            <p><i class="bike"></i>00:21</p>
                            <p><i class="foot"></i>00:40</p>
                        </div>
                    </div>
                    <div class="results">
                        <ul>
                            <li>
                                <div>
                                    <div class="square" style="background-color:#333;"><p>IC</p></div>
                                    <h3 class="red">Brussel-Zuid</h3>
                                </div>
                                <div class="time">
                                    <p class="red">Canceled</p>
                                </div>
                                
                            </li>
                            <li>
                                <div>
                                    <div class="square" style="background-color:#999;">L</div>
                                    <h3>Antwerpen-centraal</h3>
                                 </div>
                                 <div class="time">
                                    <p>10:25</p>
                                </div>
                            </li>
                            <li class="via">
                                <div>
                                    <div class="square" style="background-color:#666;">IR</div>
                                    <h3>Essen</h3>
                                 </div>
                                 <div class="time">
                                    <p>10:25</p>
                                </div>
                            </li>
                             <li>
                                <div>
                                    <div class="square" style="background-color:#333;">IC</div>
                                    <h3>Charleroi-Zuid</h3>
                                 </div>
                                 <div class="time">
                                    <p>10:36</p>
                                    <p class="red">+0:02</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                <section class="turtle">
                    <div class="titleBar">
                    	<i class="bus"></i>
                        <h2>Stop Bicoque</h2>
                        <div class="distance">
                            <p><i class="bike"></i>00:12</p>
                            <p><i class="foot"></i>00:30</p>
                        </div>
                    </div>
                    <div class="results">
                        <ul>
                            <li>
                                <div>
                                    <div class="square" style="background-color:#338c26;">58</div>
                                    <div class="square"><i class="bus"></i></div>
                                    <h3>Vilvoorde-station</h3>
                                </div>
                                <div class="time">
                                    <p>10:25</p>
                                </div>
                                
                            </li>
                            <li>
                                <div>
                                    <div class="square" style="background-color:#338c26;">58</div>
                                    <div class="square"><i class="tram"></i></div>
                                    <h3>Ysen</h3>
                                 </div>
                                 <div class="time">
                                    <p>10:48</p>
                                    <p class="red">+0:05</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div class="square" style="background-color:#338c26;">58</div>
                                    <div class="square"><i class="tram"></i></div>
                                    <h3>Vilvoorde-Station</h3>
                                 </div>
                                 <div class="time">
                                    <p>11:25</p>
                                    <p class="red">+0:05</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                
                <section class="turtle">
                    <div class="titleBar">
                    	<i class="traffic"></i>
                        <h2>Verkeer</h2>
                    </div>
                    <div class="results wide">
                        <ul>
                            <li>
                                <div>
                                    <div class="square">E19</div>
                                    <h3>Mechelen - Brussel</h3>
                                </div>
                                <div class="time">
                                    <p>Ongeval</p>
                                    <p class="red">+01:14</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div class="square">E19</div>
                                    <h3>Nederland</h3>
                                </div>
                                <div class="time">
                                    <p>Vertraging</p>
                                    <p class="orange">+00:12</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div class="square">E313</div>
                                    <h3>Hasselt - Luik</h3>
                                </div>
                                <div class="time">
                                    <p>Werken</p>
                                    <p class="orange">+00:10</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                
                <section class="turtle">
                    <div class="titleBar">
                    	<i class="bike"></i>
                        <h2>Velo punt Kioskplaats</h2>
                        <div class="distance">
                            <p><i class="foot"></i>00:07</p>
                        </div>
                    </div>
                    <div class="titleBar">
						<div class="amount">
                        	10
                        </div>
                    </div>
                </section>
             
            </section>
            
            
            
            <!-- LOCATION TURTLE -->
            <section class="panel widget">
                <section class="titleBar clearfix">
                    <div class="timerBar">
                        <div class="timerBarYellow"></div>
                    </div>
                    <div id="social" class="nav active color">
                        <h4>Social</h4>
                    </div>
                    <div id="news" class="nav">
                        <h4>News</h4>
                    </div>
                    <div id="location" class="nav">
                        <h4>Location</h4>
                    </div>
                    <section class="clock">
                        <h4>10:21</h4>
                    </section>
                </section>
                <section class="locContent">
                    <section class="social">
                    	<div id="oneColumn">
                        </div>
                        <div id="leftColumn">
                        	<div class="fsq">
                            	<p><span class="bold">Glen Dehaek</span> just became mayor of Uplace Mechelen on <span class="yellow">Foursquare</span></p>
                        	</div>
                            <div class="tweet">
                            	<p>#Uplace trekt record aantal bezoekers sinds officiële opening <span class="yellow">http://www.drd.be/vy</span></p>
                                <h5>@hanspans</h5>
                       	 	</div>
                            <div class="instgrm">
                           		<img src="client/css/images/Instagram-shot2.jpg" class="img" />
                                <h5>Instagram photo: Alex Verswijvel</h5>
                        	</div>
                            <div class="fsq">
                            	<p><span class="bold">Pieter Colpaert</span> just checked in at Uplace Mechelen on <span class="yellow">Foursquare</span></p>
                            </div>
                            <div class="tweet">
                            	<p>#uplace is the place!</p>
                                <h5>@hanspans</h5>
                        	</div>
                       	</div>
                        <div id="rightColumn">
                        	<div class="tweet">
                            	<p>#uplace is the place!</p>
                                <h5>@phillipevdab</h5>
                        	</div>
                            <div class="instgrm">
                            	<img src="client/css/images/Instagram-shot.jpg" class="img" />
                                <h5>Instagram photo: Dennis Kestelle</h5>
                        	</div>
                            <div class="tweet">
                            	<p>#Uplace trekt record aantal bezoekers sinds officiële opening <span class="yellow">http://www.drd.be/vy</span></p>
                                <h5>@yungpanda_BE</h5>
                        	</div>
                        </div>
                    </section>
                 </section>
            </section>
        </div>
        
        <footer>
            <img src="client/css/images/ft_logo.jpg" alt="FlatTurtle" id="ftlogo" />
            <p id="where">Check in at <span class="bold">Uplace Machelen</span> or tag <span class="bold">#uplace</span></p>
        	<img src="client/css/images/logo_uplace.jpg" alt="Uplace" id="loc_logo" />
        </footer>

        <script src="client/js/libs/jquery.js"></script>
        <script src="client/js/libs/underscore.js"></script>
        <script src="client/js/libs/backbone.js"></script>
        <script src="client/js/libs/turtles.js"></script>
        
        <script src="client/js/main.js"></script>
        
        <!-- Config from initializer -->
        <script>
        	config = <?php echo json_encode($config); ?>;
        </script>
        
    </body>
</html>
