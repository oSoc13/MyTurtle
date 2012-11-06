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
                  + ".bg-color-light { background-color: " + modifyColor(value,0.2) + "; }\n"
                  + ".bg-color-dark { background-color: " + modifyColor(value,-0.2) + "; }\n"
                  + ".border-color { border-color: " + value + " transparent; }\n";
        
        // add to body
        custom.html(style);
    }

    /*
     * Lighten or darken a color
     * (private)
     */
    function modifyColor(hex, lum) {
        // validate hex string
        var hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;
        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
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