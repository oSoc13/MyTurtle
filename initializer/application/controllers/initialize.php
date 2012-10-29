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
        $config['panes'][1] = array('type' => 'list');
        $config['panes'][2] = array('type' => 'widget');
        
        // turtle options
        $config['turtles'] = array();
        $config['turtles'][35] = array('pane' => 1, 'type' => 'nmbs', 'options' => array('location' => 'vilvoorde'));
        $config['turtles'][36] = array('pane' => 1, 'type' => 'delijn', 'options' => array('location' => 'vilvoorde'));
        $config['turtles'][37] = array('pane' => 2, 'type' => 'twitter', 'options' => array('search' => 'uplace'));
        $config['turtles'][38] = array('pane' => 2, 'type' => 'foursquare', 'options' => array('location' => 'Uplace Mechelen'));
        
        // plugins to be loaded
        $config['plugins'] = array();
        $config['plugins'][86] = array('type' => 'clock');
        
        // load external view from client folder
        $this->load->view('../../../client/template', array('config' => $config));
    
    }
}