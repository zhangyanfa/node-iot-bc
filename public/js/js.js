(function() {
try {
    (function(args) {
    try {
	
	function mm_encode(str) {
	    return encodeURIComponent(str);
	}
	
	var elements = {};

	if (typeof MathTag != 'undefined') {
	    for (var key in MathTag) {
		
		var value = MathTag[key];
		
		if (key == "event_type_path")
		{
                    var match_target = window.location.href
                    if (MathTag['event_match'])
			match_target = MathTag['event_match']
		    
		    for (var subkey in value)
		    {
			var page = value[subkey];
			if (match_target.match(new RegExp(page[1])))
			{
			    elements["mt_id"] = page[2];
			    elements["event_type"] = page[0];
			    break;
			}
		    }
		}
		
		try {
		    if (typeof value == 'undefined' || !value || value == null || value == "" || value == 'undefined')
			continue;
		    
		    if ((value instanceof Object) && !(value instanceof Array)) // sub objects must be dealt with separately
  			continue;
		}
		catch(ex) {
		    continue;
		}
		
		elements[key] = value.toString();
	    }
	}

        for (var k in args) {
            if (args[k] != "") {
		elements[k] = args[k];
	    }
	}

        var queries = [];

        for (var k in elements) {
	    queries.push(mm_encode(k) + "=" + mm_encode(elements[k]));
	}

        if (document.title) {
            queries.push("document_title="+mm_encode(document.title));
	}

	if (window.location.href) {
	    queries.push("location="+mm_encode(window.location.href));
	}

        if (window.location.pathname) {
            queries.push("document_path="+mm_encode(window.location.pathname));
        }

        if (elements["revenue"]) {
	    queries.push("v1=" + mm_encode(elements["revenue"]));
	}
	
        if (elements["currency"] && !elements["v2"]) {
	    queries.push("v2=" + mm_encode(elements["currency"]));
	}
	
	if (!Date.now) {
	    Date.now = function() { return new Date().getTime(); }
	}
	queries.push("mt_cb=" + Date.now());

	var scp = document.createElement("script");
	scp.src="//pixel.mathtag.com/event/js?mt_pp=2&mt_nsync&"+queries.join("&");
	scp.setAttribute("id", "mm_pp_background");

	// don't do the delay wait for body trick here. It doesn't work on popups.
	if (document.body)
	    document.body.appendChild(scp);
	else if (document.head)
	    document.head.appendChild(scp);
    }
    catch(ex)
    {
	document.createElement("img").src="//pixel.mathtag.com/error/img?error_domain=proper_pixel_1&what="+mm_encode(ex.message);
    }
})({"language":"zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3"});


}
catch(ex)
{
   document.createElement("img").src="//pixel.mathtag.com/error/img?error_domain=wrap&what="+encodeURIComponent(ex.message);
}
})();
