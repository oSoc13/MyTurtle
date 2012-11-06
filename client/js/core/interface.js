/*
 * The panes object will take care of the interface elements and colors
 */
window.Interface = (function() {

    /*
     * Execute all functions for passed config
     */
    function setup(config) {
        color(config.color);
        logo(config.logo);
        title(config.title);
    }
    
    /*
     * Change the ui color
     */
    function color(value) {
        // style element
        var custom = $('body style#custom');
        if (custom.length == 0) {
            custom = $('<style type="text/css" id="custom"></style>');
            $('body').prepend(custom);
        }
        
        // custom styles
        var style = ".text-color { color: " + value + "; }\n"
                  + ".bg-color { background-color: " + value + "; }\n"
                  + ".bg-color-light { background-color: " + value + "; }\n"
                  + ".bg-color-dark { background-color: " + value + "; }\n"
                  + ".bg-color-alt { background-color: " + value + "; }\n"
                  + ".border-color { border-color: " + value + " transparent; }\n";
        
        // add to body
        custom.html(style);
    }
    
    /*
     * Set the footer logo url
     */
    function logo(url) {
        $('footer img#client-logo').attr('src', url);
    }
    
    /*
     * Set the window title
     */
    function title(value) {
        document.title = value;
    }

    /*
     * Public interface to this object
     */
    return {
        setup : setup,
        color : color,
        logo : logo,
        title : title
    };

}());