<?php
/*
 * --------------------------------------------------------------------
 * HERE WE GO!
 * --------------------------------------------------------------------
 */


define('ENVIRONMENT', 'development');


if (defined('ENVIRONMENT'))
{
	switch (ENVIRONMENT)
	{
		case 'development':
			$alias = 'https://s.flatturtle.anothercoolproject.com/hub';
		break;

		case 'testing':
		case 'production':
			$alias = '/'.$_GET['alias'];
		break;

		default:
			exit('The application environment is not set correctly.');
	}
}
require_once 'client/template.php';