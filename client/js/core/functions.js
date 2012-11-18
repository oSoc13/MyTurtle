/*
 * Sort elements in a parent container by data-order attribute
 */
function sort(items, attribute) {
    if (attribute == null)
        attribute = 'data-order';
    
    var parent = items.parent();
    var list = items.get();
    
    // sort by data-order attribute
    list.sort(function(a, b) {
        // both are plain javascript objects now
        if (a.getAttribute(attribute) == b.getAttribute(attribute))
            return 0;
        return a.getAttribute(attribute) < b.getAttribute(attribute) ? -1 : 1;
    });
    
    $.each(list, function(idx, itm) { parent.append(itm); });
}

/*
 * A friendly time format function
 */
Date.prototype.format = function(format) {

    var date = this;
    
    // 2 digit year
    format = format.replace('{Y}', function() {
        return date.getFullYear();
    });
    
    // month with leading zero
    format = format.replace('{m}', function() {
        var month = date.getMonth() + 1;
        return (month < 10 ? "0" : "") + month;
    });
    
    // day with leading zero
    format = format.replace('{d}', function() {
        var day = date.getDate();
        return (day < 10 ? "0" : "") + day;
    });
    
    // hours with leading zero
    format = format.replace('{H}', function() {
        var hours = date.getHours();
        return (hours < 10 ? "0" : "") + hours;
    });
    
    // minutes with leading zero
    format = format.replace('{M}', function() {
        var minutes = date.getMinutes();
        return (minutes < 10 ? "0" : "") + minutes;
    });
    
    // seconds with leading zero
    format = format.replace('{S}', function() {
        var seconds = date.getSeconds();
        return (seconds < 10 ? "0" : "") + seconds;
    });
    
    return format;    
}

String.prototype.capitalize = function() {
    return this.replace(/(\w)(\w*)/g, function(g0,g1,g2){
        return g1.toUpperCase() + g2.toLowerCase();
    });
}