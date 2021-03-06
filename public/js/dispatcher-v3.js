var __$dispatcher = new function() {
    var DDX_VERSION = 3;
    var $f101 = null;
    var $f93 = null;
    var $f131 = !1;
    var $f104 = "";
    var sDdxLibsBase = "https://libs.coremetrics.com/ddxlibs";
    var $f169 = {
        $f125: function() {
            var sVersionSuffix = (DDX_VERSION > 1) ? "-v" + DDX_VERSION : "";
            if (CM_DDX.test.testCounter.length > 0 || CM_DDX.test.doTest) {
                var sExtension = "-" + CM_DDX.test.testCounter + ".js";
                var sBase = __$dispatcher.$f116() ? "/cxpt" : "/cpt";
                $f169.load($f169.$f99() + "/" + CM_DDX.cVA + sBase + sVersionSuffix + sExtension, function() { if (typeof($f168) !== "undefined") { __$tester.init($f168.setup) } else {} })
            } else {
                if (CM_DDX.test.syndicate) {
                    if (typeof YAHOO === "undefined" || !YAHOO) { $f169.load(sDdxLibsBase + "/yahoo-min.js", function() { if (!(YAHOO.lang && YAHOO.lang.JSON && YAHOO.lang.JSON.stringify)) { __$dispatcher.load(sDdxLibsBase + "/json-min.js", null) } }) }
                    var sExtension = ".js?__t=" + $f169.$f121();
                    var sBase = __$dispatcher.$f116() ? "/cxp" : "/cp";
                    $f169.load($f169.$f99() + "/" + CM_DDX.cVA + sBase + sVersionSuffix + sExtension, function() { if (typeof($f168) !== "undefined") { $f168.setup() } else {} })
                } else {}
            }
        },
        load: function(p, f, $f118) {
            var h = document.getElementsByTagName("head").item(0);
            var s = document.createElement("script");
            s.setAttribute("src", p);
            s.setAttribute("type", "text/javascript");
            if ((typeof(f) !== "undefined" && f !== null) || (typeof($f118) !== "undefined" && $f118 !== null)) { if (s.readyState) { s.onreadystatechange = function() { if (event.srcElement.readyState === "loaded" || event.srcElement.readyState === "complete") { $f169.$f110(f, $f118) } } } else { s.onload = function() { $f169.$f110(f, $f118) } } }
            h.appendChild(s)
        },
        $f110: function(f, $f118) { if (typeof(f) !== "undefined" && f !== null) { f() } if ($f101 !== null && (typeof($f118) !== "undefined" && $f118 !== null)) { $f101--; if ($f101 === 0) { $f118() } } },
        $f119: function(iWC) { $f101 = iWC },
        $f121: function() {
            var dt = new Date();
            var $f122 = dt.getFullYear();
            var fnPad2 = function(v) { return (v < 10) ? "0" + v : "" + v };
            var fnPad3 = function(v) { return (v < 10) ? "00" + v : ((v < 100) ? "0" + v : "" + v) };
            $f122 += fnPad2(dt.getMonth() + 1);
            $f122 += fnPad2(dt.getDate());
            $f122 += fnPad2(dt.getHours());
            $f122 += fnPad2(dt.getMinutes());
            $f122 += fnPad2(dt.getSeconds());
            $f122 += fnPad3(dt.getMilliseconds());
            return $f122
        },
        //$f99: function() { return C8(null) + "//" + $f104 },
        $f99: function() { return $f104 },
        $f116: function() {
            var i =
                /*@cc_on!@*/
                !1;
            return i
        },
        $f132: function() { return $f131 },
        domReady: function() { $f131 = !0; if (typeof($f168) !== "undefined") { if (typeof(__$partner) !== "undefined" && typeof($f166) !== "undefined" && typeof(__$partner.REEVOO) !== "undefined" && typeof(__$partner.REEVOO.$f182) !== "undefined" && typeof(__$partner.$f155) !== "undefined" && typeof($f168.syndicateFromQueue) !== "undefined") { if (__$partner.REEVOO.$f182()) { __$partner.$f155($f166.REEVOO, !0) } } if (typeof($f168.$f161) !== "undefined") { $f168.$f161() } } },
        pageLoaded: function() {}
    };
    return $f169
}();
__$dispatcher.$f125();