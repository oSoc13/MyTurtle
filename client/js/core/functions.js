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