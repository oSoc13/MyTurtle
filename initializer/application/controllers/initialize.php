<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Initialize extends CI_Controller {
    
    public function index($id = FALSE) {
        
        /*
         * Dummy configuration array
         * 
         * This controller will contact the database and load  the configuration for 
         * the requested screen.
         */
        $config = array();
        
        // interface options
        $config['interface'] = array('color' => '#BD1D92', 'language' => 'eng');
        
        // panel options
        $config['panes'] = array();
        $config['panes'][1] = array('type' => 'transport');
        $config['panes'][2] = array('type' => 'social');
        
        // turtle options
        $config['turtles'] = array();
        $config['turtles'][35] = array('pane' => 1, 'type' => 'nmbs', 'location' => 'vilvoorde');
        $config['turtles'][36] = array('pane' => 1, 'type' => 'delijn', 'location' => 'vilvoorde');
        $config['turtles'][37] = array('pane' => 2, 'type' => 'twitter', 'search' => 'uplace');
        $config['turtles'][38] = array('pane' => 2, 'type' => 'foursquare', 'location' => 'Uplace Mechelen');
        
        // plugins to be loaded
        $config['plugins'] = array();
        $config['plugins'][86] = array('type' => 'clock');
        
        // load external view from client folder
        $this->load->view('../../../client/template', array('config' => $config));
        
    }
}