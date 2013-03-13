<?php
/*
 * --------------------------------------------------------------------
 * Set the environment
 * --------------------------------------------------------------------
 */


define('ENVIRONMENT', 'production');


/*
 * --------------------------------------------------------------------
 * HERE WE GO!
 *
 * Don't make changes beyond this line
 * --------------------------------------------------------------------
 */

if (defined('ENVIRONMENT'))
{
    switch (ENVIRONMENT)
    {
        case 'development':
            $alias = 'https://s.flatturtle.com/hub';
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