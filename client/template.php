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

        <div id="container clearfix">
            <section class="turtle pTransport clearfix">
                <section class="publicTransport clearfix">
                    <div class="titleBar">
                        <h2 class="titleBarContainer train">Vilvoorde</h2>
                        <div class="titleDistance clearfix">
                            <div class="distanceBike tbDistance">00:21</div>
                            <div class="distanceByFoot tbDistance">00:40</div>
                        </div>
                    </div>
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
                            <li class="subResult">
                                <div class="floatLeft">
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
                    <div class="titleBar">
                        <h2 class="titleBarContainer bus">Stop Bicoque</h2>
                        <div class="titleDistance clearfix">
                            <div class="distanceBike tbDistance">00:12</div>
                            <div class="distanceByFoot tbDistance">00:30</div>
                        </div>
                    </div>
                    <div class="ptResults">
                        <ul>
                            <li>
                                <div class="floatLeft">
                                    <div class="infoOrNumber n58"><p>58</p></div>
                                    <div class="tramOrBus bus"></div>
                                    <h3 class="destination">Vilvoorde-station</h3>
                                </div>
                                <div class="time">
                                    <p>10:25</p>
                                </div>
                                
                            </li>
                            <li>
                                <div class="floatLeft">
                                    <div class="infoOrNumber n58"><p>58</p></div>
                                    <div class="tramOrBus tram"></div>
                                    <h3 class="destination">Ysen</h3>
                                 </div>
                                 <div class="time">
                                    <p>10:48</p>
                                    <p class="red">+0:05</p>
                                </div>
                            </li>
                            <li>
                                <div class="floatLeft">
                                    <div class="infoOrNumber n58"><p>58</p></div>
                                    <div class="tramOrBus bus"></div>
                                    <h3 class="destination">Vilvoorde-Station</h3>
                                 </div>
                                 <div class="time">
                                    <p>11:25</p>
                                    <p class="red">+0:05</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
            <section class="turtle location clearfix">
                <section class="titleBar clearfix">
                    <div class="timerBar">
                        <div class="timerBarYellow"></div>
                    </div>
                    <div id="social" class="nav active">
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
                    <section class="socialContent clearfix">
                        <div class="socialBox fsq">
                            <p><span class="bold">Glen Dehaek</span> just became mayor of Uplace Mechelen on <span class="yellow">Foursquare</span></p>
                        </div>
                        <div class="socialBox tweet">
                            <p>#uplace is the place!</p>
                        </div>
                        <div class="socialBox tweet">
                            <p>#Uplace trekt record aantal bezoekers sinds officiiële opening <span class="yellow">http://www.drd.be/vy</span></p>
                        </div>
                        <div class="socialBox instgrm">
                            <img src="client/css/images/Instagram-shot.jpg" class="img" />
                        </div>
                        <div class="socialBox instgrm">
                            <img src="client/css/images/Instagram-shot.jpg" class="img" />
                        </div>
                    </section>
                 </section>
            </section>
        </div>
        
        <footer>
            
        </footer>

        <script src="client/js/libs/jquery.js"></script>
        <script src="client/js/libs/underscore.js"></script>
        <script src="client/js/libs/backbone.js"></script>
        
        <script src="client/js/main.js"></script>
        
        <!-- Config from initializer -->
        <script>
        	config = <?php echo json_encode($config); ?>;
        </script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
