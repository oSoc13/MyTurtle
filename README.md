MyTurtle
========

A modular HTML5 interface to display "turtles" on a digital signage template. Turtles included. This code should run on an external server, which makes it possible to maintain your digital signage solution into the cloud.

MyTurtle is version 2 of the FlatTurtle InfoScreen project. You can find the first version on http://github.com/FlatTurtle/InfoScreen

Features
========

 * plug-ins
 * API for real-time changes in the API.
 * Add classes in the turtles directory and use them instantly
 * cronjobs

Tools used
==========

 * less: allows us to write nicer css3
 * JQuery
 * Backbone.js
 * Later.js: for cronjobs when the code is ran on FlatOS (http://github.com/FlatTurtle/FlatOS) using the FlatTurtle browser (http://github.com/FlatTurtle/InfoScreenQT)
 * PHP5.3 with CodeIgniter prints the right configuration from the database as an initializer, and takes care of the URL structure. It does however not work as an API.


