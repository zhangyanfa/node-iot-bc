'use strict';
/* jshint ignore:start */

//google analytics
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '/js/analytics.js', 'ga');
// Use a different Google Analytics ID depending on environment (dev/prod)
if (window.discoverTryBuyConfig.isProduction) {
    window.ga('create', 'UA-68346429-2', 'auto');
    console.log('send:/iot-blockchain to prod');
} else {
    window.ga('create', 'UA-68346429-1', 'auto');
    console.log('send:/iot-blockchain to dev');
}
ga('send', 'pageview', '/iot-blockchain');

//coremetrics
//check the client\config.js file for definition
window.digitalData.page.pageInfo.pageID = '/internet-of-things/iot-news/announcements/private-blockchain/'; // this is mandatory for all pages
console.log("coremtrics digitalData used in webmetrics service:" + JSON.stringify(digitalData));
/* jshint ignore:end*/

/**
 *
 *	When using in html, this is the mapping:
 *	analytics-event -> ibmEvAction (analytics-on will be used if analytics-event is omitted)
 *	analytics-category -> ibmEv
 *	analytics-label -> ibmEvName
 *	
 *	For conversion events, pass analytics-conversion as either "start" or "complete"
 *	and it will map to convtype being either 1 or 2, and ibmConversion will be set to true.
 *  If a regular event is supposed to be triggered after the conversion event,
 *	just pass analytics-conversion as either "start-event" or "complete-event"
 * 	
 *	analytics-points can be passed, optionally, to add points to the conversion (default is "0")
 *	
 *	When generating events programmatically, use the service as in the following example:
 *	dtbMetricsService.eventTrack('eventName', {
 *		category: 'category', label: 'label'
 *	});
 */

var dtbMetricsService = {

    eventTrack: function(action, properties) {

        // The action argument is not used here, its only purpose is to trigger the event
        // We need a formatted action, so it needs to be passed as a property
        if (action && properties.category) {

            // TODO: This is temporary, REMOVE!
            // google analytics
            window.ga('send', 'event', properties.category, action, properties.label);

            if (properties.conversion && ((properties.conversion.indexOf("start") > -1) || (properties.conversion.indexOf("complete") > -1))) {
                // This is a "conversion" event metric
                if (!properties.points) {
                    properties.points = "0";
                }
                console.log("Webmetrics conversion event: " + properties.category + ", " + action + ", " + properties.label + ", " + (properties.conversion.indexOf("start") > -1 ? "1" : "2") + ", " + properties.points);
                window.ibmStats.event({
                    "ibmEV": properties.category,
                    "ibmEvAction": action,
                    "ibmEvName": properties.label,
                    "ibmConversion": "true",
                    "convtype": (properties.conversion.indexOf("start") > -1 ? "1" : "2"),
                    "point": properties.points
                });
            }
            if (!properties.conversion || (properties.conversion.indexOf("event") > -1)) {
                // Regular event metric
                console.log("Webmetrics event: " + properties.category + ", " + action + ", " + properties.label);
                window.ibmStats.event({
                    "ibmEV": properties.category,
                    "ibmEvAction": action,
                    "ibmEvName": properties.label
                });
            }
        } else {
            console.error("Metrics not sent, missing parameters:");
            if (!action) {
                console.error("event");
            }
            if (!properties.category) {
                console.error("category");
            }
        }
    }
};