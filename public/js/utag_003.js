//tealium universal tag - utag.27 ut4.0.201702102055, Copyright 2017 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,'link':1};u.initialized=false;u.map={"ttd_account_id":"account_id","ttd_div_id":"div_id","ttd_pixel_id":"pixel_id"};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={"account_id":"","div_id":"","pixel_id":"","base_url":"//js.adsrvr.org/up_loader.1.1.0.js"};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.loader_cb=function(){if(!u.initialized){for(var i=0;i<u.data.account_id.length;i++){var h=document.getElementsByTagName('body')[0];var g=document.createElement("div");g.setAttribute("id",u.data.div_id[i]);g.setAttribute("style","display:none");h.appendChild(g);if(typeof TTDUniversalPixelApi==='function'){var universalPixelApi=new TTDUniversalPixelApi();universalPixelApi.init(u.data.account_id[i],[u.data.pixel_id[i]],"https://insight.adsrvr.org/track/up",u.data.div_id[i]);}}}
if(!utag.data["cp.utag_main_ttd_uuid"]&&!utag.data._corder){utag.ut.loader({id:"tealium_getTTDid",type:"img",src:"//match.adsrvr.org/track/cmf/generic?ttd_pid=tealium&ttd_tpi=1"});utag.ut.TTD=utag.ut.TTD||{};utag.ut.TTD.tealium_setTTDid=utag.ut.TTD.tealium_setTTDid||function(o){try{var tl=o.tvt?o.tvt.length:0;if(tl!=0){utag.loader.SC("utag_main",{ttd_uuid:o.tvt[tl-1].t1+";exp-session"});clearInterval(utag.ut.TTD.do_polling);}}catch(e){utag.DB(e)}}
utag.ut.TTD.passTTDid=utag.ut.TTD.passTTDid||function(interval,sin){if(interval>=sin){clearInterval(utag.ut.TTD.do_polling);}else{utag.ut.loader({id:"tealium_setTTDid",src:"//datacloud.tealiumiq.com/tealium_ttd/main/16/i.js?jsonp=utag.ut.TTD.tealium_setTTDid"});utag.ut.TTD.interval++;}}
utag.ut.TTD.sit=300;utag.ut.TTD.interval=0;utag.ut.TTD.sin=4;utag.ut.TTD.do_polling=setInterval(function(){utag.ut.TTD.passTTDid(utag.ut.TTD.interval,utag.ut.TTD.sin);},utag.ut.TTD.sit);}
u.initialized=true;};if(!u.initialized){u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":'utag_27'});}else{u.loader_cb();}
}};utag.o[loader].loader.LOAD(id);})("27","ibm.web");}catch(error){utag.DB(error);}
