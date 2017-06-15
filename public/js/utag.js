//tealium universal tag - utag.53 ut4.0.201702090623, Copyright 2017 Tealium.com Inc. All Rights Reserved.
try {
    (function(id, loader) {
        var u = { "id": id };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) { utag.ut = {}; }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function(o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") { b = m; } else { b = a.createElement("iframe"); }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, { "height": "1", "width": "1", "style": "display:none" }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) { b.id = o.id; }
                for (l in utag.loader.GV(o.attrs)) { b.setAttribute(l, o.attrs[l]); }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) { b.addEventListener("load", function() { o.cb(); }, false); } else {
                        b.onreadystatechange = function() {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } }
                }
            };
        } else { u.loader = utag.ut.loader; }
        if (utag.ut.encode === undefined) { u.encode = function(a, b) { b = ""; try { b = encodeURIComponent(a) } catch (e) { utag.DB(e); } if (b == "") { b = escape(a); } return b; }; } else { u.encode = utag.ut.encode; }
        u.ev = { "view": 1, "link": 1 };
        u.map = { "mediamath_mt_id": "mt_id", "mediamath_event_type": "event_type", "mediamath_industry": "industry", "mediamath_excl": "mt_excl", "mediamath_mt_adid": "mt_adid", "mediamath_page_name": "page_name", "mediamath_product_category": "product_category", "mediamath_product_id": "product_id", "mediamath_product_name": "product_name", "mediamath_site_language": "site_language" };
        u.extend = [];
        u.send = function(a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:53");
                utag.DB(b);
                var c, d, e, f;
                u.data = { "qsp_delim": "&", "base_url": "//pixel.mathtag.com/event/", "mt_adid": "171815", "mt_id": "", "type": "script" || "img" };
                utag.DB("send:53:EXTENSIONS");
                utag.DB(b);
                c = [];
                for (d in utag.loader.GV(u.map)) { if (b[d] !== undefined && b[d] !== "") { e = u.map[d].split(","); for (f = 0; f < e.length; f++) { u.data[e[f]] = u.encode(b[d]); } } }
                utag.DB("send:53:MAPPINGS");
                utag.DB(u.data);
                c.push("mt_id=" + u.data.mt_id);
                c.push("mt_adid=" + u.data.mt_adid);
                if (u.data.mt_exem) { c.push("mt_exem=" + u.data.mt_exem); } else if (u.data.mt_excl) { c.push("mt_excl=" + u.data.mt_excl); }
                c.push("v1=" + (u.data.v1 || ""));
                c.push("v2=" + (u.data.v2 || ""));
                c.push("v3=" + (u.data.v3 || ""));
                c.push("s1=" + (u.data.s1 || ""));
                c.push("s1=" + (u.data.s2 || ""));
                c.push("s1=" + (u.data.s3 || ""));
                if (!u.data.mt_id) { utag.DB(u.id + ": Tag not fired: Required attribute not populated [mt_id]"); return; }
                if (!u.data.mt_adid) { utag.DB(u.id + ": Tag not fired: Required attribute not populated [mt_adid]"); return; }
                u.data.base_url = u.data.base_url + "js?mt_pp=1";
                u.data.version = "1.0";
                u.data.previous_url = document.referrer;
                u.data.search_query = location.search;
                window.MathTag = utag.handler.C(u.data);
                u.remove = ["base_url", "qsp_delim", "type"];
                for (var i = 0; i < u.remove.length; i++) { delete window.MathTag[u.remove[i]] }
                u.loader({ "type": u.data.type, "src": u.data.base_url, "loc": "script", "id": "utag_53" });
                utag.DB("send:53:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("53", "ibm.web"));
} catch (error) { utag.DB(error); }