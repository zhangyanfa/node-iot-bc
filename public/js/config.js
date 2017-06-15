'use strict';

/* jshint ignore:start */
var discoverTryBuyConfig = {
	isProduction: false
};
//coremetrics and V18
var digitalData = {
	page: {
		category: {
			primaryCategory: 'DISCOVER-IOT-TEST'
		},
		pageInfo: {
			language:"en-US",
			version: 'v18',
			ibm: {
				country:'US',
				siteID: 'DISCOVER-IOT-TEST'
			}
		}
	}
}
console.log ("coremetrics digitalData TEST definition" + JSON.stringify(digitalData));
function bindPageViewWithAnalytics(){console.info("coremetrics pageview called again");}
/* jshint ignore:end */
