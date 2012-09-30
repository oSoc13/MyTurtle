<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Initialize extends CI_Controller {
    
    public function index() {
        
        /*
         * Dummy configuration array
         * 
         * This controller will contact the database and load
         * the configuration for the requested screen.
         */
        $config = array();
        $config['test'] = 'test';
        
        // load external view from client folder
        $this->load->view('../../../client/template', array('config' => $config));
        
    }
}