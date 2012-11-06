/*
 * The panes object will take care of the interface elements and colors
 */
window.Interface = (function() {

    function setup(config) {
        color(config.color);
        logo(config.logo);
    }
    
    function color(value) {
        var style = "";
        
        // custom styles
        style += ".text-color { color: " + value + "; }\n";
        style += ".bg-color { background-color: " + value + "; }\n";
        style += ".bg-color-light { background-color: " + value + "; }\n";
        style += ".bg-color-dark { background-color: " + value + "; }\n";
        style += ".bg-color-alt { background-color: " + value + "; }\n";
        style += ".border-color { border-color: " + value + " transparent; }\n";
        
        // add to body
        $('body').prepend('<style type="text/css">' + style + '</style>');
    }
    
    function logo(url) {
        $('footer img#client-logo').attr('src', url);
    }

    /*
     * Public interface to this object
     */
    return {
        setup : setup,
        color : color,
        logo : logo
    };

}());