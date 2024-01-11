/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/                              version 2.37.2
 *
 * This file is part of jQuery Terminal. https://terminal.jcubic.pl
 *
 * Copyright (c) 2010-2023 Jakub T. Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 * Contains:
 *
 * Storage plugin Distributed under the MIT License
 * modified to work from Data URIs that block storage and cookies in Chrome
 * Copyright (c) 2010 Dave Schindler
 *
 * jQuery Timers licenced with the WTFPL
 * <http://jquery.offput.ca/timers/>
 *
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 *
 * jQuery Caret
 * Copyright (c) 2009, Gideon Sireling
 * 3 clause BSD License
 *
 * sprintf.js
 * Copyright (c) 2007-2013 Alexandru Marasteanu <hello at alexei dot ro>
 * licensed under 3 clause BSD license
 *
 * debounce function from Lodash
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * The MIT License
 *
 * emoji regex v9.0.0 by Mathias Bynens
 * MIT license
 *
 * broken image by Sophia Bai from the Noun Project (CC-BY)
 *
 * Date: Fri, 15 Sep 2023 15:33:19 +0000
 */
(function(e) {
    var m = function() {
        if (!m.cache.hasOwnProperty(arguments[0])) {
            m.cache[arguments[0]] = m.parse(arguments[0])
        }
        return m.format.call(null, m.cache[arguments[0]], arguments)
    };
    m.format = function(e, t) {
        var n = 1,
            r = e.length,
            i = "",
            u, a = [],
            o, s, l, f, c, p;
        for (o = 0; o < r; o++) {
            i = D(e[o]);
            if (i === "string") {
                a.push(e[o])
            } else if (i === "array") {
                l = e[o];
                if (l[2]) {
                    u = t[n];
                    for (s = 0; s < l[2].length; s++) {
                        if (!u.hasOwnProperty(l[2][s])) {
                            throw m('[sprintf] property "%s" does not exist', l[2][s])
                        }
                        u = u[l[2][s]]
                    }
                } else if (l[1]) {
                    u = t[l[1]]
                } else {
                    u = t[n++]
                }
                if (/[^s]/.test(l[8]) && D(u) !== "number") {
                    throw m("[sprintf] expecting number but found %s", D(u))
                }
                switch (l[8]) {
                    case "b":
                        u = u.toString(2);
                        break;
                    case "c":
                        u = String.fromCharCode(u);
                        break;
                    case "d":
                        u = parseInt(u, 10);
                        break;
                    case "e":
                        u = l[7] ? u.toExponential(l[7]) : u.toExponential();
                        break;
                    case "f":
                        u = l[7] ? parseFloat(u).toFixed(l[7]) : parseFloat(u);
                        break;
                    case "o":
                        u = u.toString(8);
                        break;
                    case "s":
                        u = (u = String(u)) && l[7] ? u.slice(0, l[7]) : u;
                        break;
                    case "u":
                        u = u >>> 0;
                        break;
                    case "x":
                        u = u.toString(16);
                        break;
                    case "X":
                        u = u.toString(16).toUpperCase();
                        break
                }
                u = /[def]/.test(l[8]) && l[3] && u >= 0 ? " +" + u : u;
                c = l[4] ? l[4] === "0" ? "0" : l[4].charAt(1) : " ";
                p = l[6] - String(u).length;
                f = l[6] ? d(c, p) : "";
                a.push(l[5] ? u + f : f + u)
            }
        }
        return a.join("")
    };
    m.cache = {};
    m.parse = function(e) {
        var t = e,
            n = [],
            r = [],
            i = 0;
        while (t) {
            if ((n = /^[^\x25]+/.exec(t)) !== null) {
                r.push(n[0])
            } else if ((n = /^\x25{2}/.exec(t)) !== null) {
                r.push("%")
            } else if ((n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t)) !== null) {
                if (n[2]) {
                    i |= 1;
                    var u = [],
                        a = n[2],
                        o = [];
                    if ((o = /^([a-z_][a-z_\d]*)/i.exec(a)) !== null) {
                        u.push(o[1]);
                        while ((a = a.slice(o[0].length)) !== "") {
                            if ((o = /^\.([a-z_][a-z_\d]*)/i.exec(a)) !== null) {
                                u.push(o[1])
                            } else if ((o = /^\[(\d+)\]/.exec(a)) !== null) {
                                u.push(o[1])
                            } else {
                                throw "[sprintf] huh?"
                            }
                        }
                    } else {
                        throw "[sprintf] huh?"
                    }
                    n[2] = u
                } else {
                    i |= 2
                }
                if (i === 3) {
                    throw "[sprintf] mixing positional and named placeholders is not (yet) supported"
                }
                r.push(n)
            } else {
                throw "[sprintf] huh?"
            }
            t = t.slice(n[0].length)
        }
        return r
    };
    var t = function(e, t, n) {
        n = t.slice(0);
        n.splice(0, 0, e);
        return m.apply(null, n)
    };

    function D(e) {
        return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
    }

    function d(e, t) {
        for (var n = []; t > 0; n[--t] = e) {}
        return n.join("")
    }
    e.sprintf = m;
    e.vsprintf = t
})(typeof global !== "undefined" ? global : self || window);
(function(r, i) {
    var n;
    if (typeof window !== "undefined") {
        n = window
    } else if (typeof self !== "undefined") {
        n = self
    } else if (typeof global !== "undefined") {
        n = global
    } else {
        throw new Error("Unknow context")
    }
    if (typeof define === "function" && define.amd) {
        define(["jquery", "wcwidth"], function(e, t) {
            r(e, t, n);
            return e
        })
    } else if (typeof module === "object" && module.exports) {
        module.exports = function(e, t, n) {
            if (t === i) {
                if (typeof window !== "undefined") {
                    t = require("jquery")
                } else {
                    t = require("jquery")(e)
                }
            }
            if (n === i) {
                n = require("wcwidth")
            }
            r(t, n, e);
            return t
        }
    } else {
        if (!n.jQuery) {
            n.$ = n.cash
        }
        r(n.jQuery || n.cash, n.wcwidth, n)
    }
})(function($, wcwidth, root, undefined) {
    "use strict";

    function debug(e) {
        if (false) {
            console.log(e)
        }
    }

    function DelayQueue() {
        var t = $.Callbacks();
        var n = false;
        var e = this;
        this.resolve = function() {
            t.fire();
            e.resolved = n = true
        };
        this.add = function(e) {
            if (n) {
                e()
            } else {
                t.add(e)
            }
        }
    }
    $.omap = function(n, r) {
        var i = {};
        $.each(n, function(e, t) {
            i[e] = r.call(n, e, t)
        });
        return i
    };
    $.fn.text_length = function() {
        return this.map(function() {
            return $(this).text().length
        }).get().reduce(function(e, t) {
            return e + t
        }, 0)
    };
    var Clone = {
        clone_object: function(e) {
            var t = {};
            if (typeof e === "object") {
                if ($.isArray(e)) {
                    return this.clone_array(e)
                } else if (e === null) {
                    return e
                } else {
                    for (var n in e) {
                        if ($.isArray(e[n])) {
                            t[n] = this.clone_array(e[n])
                        } else if (typeof e[n] === "object") {
                            t[n] = this.clone_object(e[n])
                        } else {
                            t[n] = e[n]
                        }
                    }
                }
            }
            return t
        },
        clone_array: function(e) {
            if (!is_function(Array.prototype.map)) {
                throw new Error("Your browser don't support ES5 array map " + "use es5-shim")
            }
            return e.slice(0).map(function(e) {
                if (typeof e === "object") {
                    return this.clone_object(e)
                } else {
                    return e
                }
            }.bind(this))
        }
    };
    var clone = function(e) {
        return Clone.clone_object(e)
    };
    if ("Map" in root && !("clear" in Map.prototype)) {
        Map.prototype.clear = function() {
            this.forEach(function(e, t, n) {
                n.delete(t)
            })
        }
    }
    var localStorage;
    (function() {
        var e = function() {
            try {
                var e = "test",
                    t = window.localStorage;
                t.setItem(e, "1");
                t.removeItem(e);
                return true
            } catch (e) {
                return false
            }
        };
        var t = function() {
            try {
                document.cookie.split(";");
                return true
            } catch (e) {
                return false
            }
        };
        var n = e();

        function r(e, t) {
            var n;
            if (typeof e === "string" && typeof t === "string") {
                localStorage[e] = t;
                return true
            } else if (typeof e === "object" && typeof t === "undefined") {
                for (n in e) {
                    if (e.hasOwnProperty(n)) {
                        localStorage[n] = e[n]
                    }
                }
                return true
            }
            return false
        }

        function i(e, t) {
            var n, r, i;
            n = new Date;
            n.setTime(n.getTime() + 31536e6);
            r = "; expires=" + n.toGMTString();
            if (typeof e === "string" && typeof t === "string") {
                document.cookie = e + "=" + t + r + "; path=/";
                return true
            } else if (typeof e === "object" && typeof t === "undefined") {
                for (i in e) {
                    if (e.hasOwnProperty(i)) {
                        document.cookie = i + "=" + e[i] + r + "; path=/"
                    }
                }
                return true
            }
            return false
        }

        function u(e) {
            return localStorage[e]
        }

        function a(e) {
            var t, n, r, i;
            t = e + "=";
            n = document.cookie.split(";");
            for (r = 0; r < n.length; r++) {
                i = n[r];
                while (i.charAt(0) === " ") {
                    i = i.slice(1, i.length)
                }
                if (i.indexOf(t) === 0) {
                    return i.slice(t.length, i.length)
                }
            }
            return null
        }

        function o(e) {
            return delete localStorage[e]
        }

        function s(e) {
            return i(e, "", -1)
        }
        if (!t() && !n) {
            localStorage = {};
            $.extend({
                Storage: {
                    set: r,
                    get: u,
                    remove: o
                }
            })
        } else {
            if (n) {
                localStorage = window.localStorage
            }
            $.extend({
                Storage: {
                    set: n ? r : i,
                    get: n ? u : a,
                    remove: n ? o : s
                }
            })
        }
    })();
    var debounce = function() {
        var E = "Expected a function";

        function x(e) {
            var t = typeof e;
            return e != null && (t == "object" || t == "function")
        }

        function $() {
            return Date.now()
        }
        return function e(r, i, t) {
            var n = Math.max,
                u = Math.min;
            var a, o, s, l, f, c, p = 0,
                m = false,
                D = false,
                d = true;
            if (typeof r != "function") {
                throw new TypeError(E)
            }
            i = i || 0;
            if (x(t)) {
                m = !!t.leading;
                D = "maxWait" in t;
                s = D ? n(t.maxWait || 0, i) : s;
                d = "trailing" in t ? !!t.trailing : d
            }

            function h(e) {
                var t = a,
                    n = o;
                a = o = undefined;
                p = e;
                l = r.apply(n, t);
                return l
            }

            function v(e) {
                p = e;
                f = setTimeout(y, i);
                return m ? h(e) : l
            }

            function g(e) {
                var t = e - c,
                    n = e - p,
                    r = i - t;
                return D ? u(r, s - n) : r
            }

            function _(e) {
                var t = e - c,
                    n = e - p;
                return c === undefined || t >= i || t < 0 || D && n >= s
            }

            function y() {
                var e = $();
                if (_(e)) {
                    return b(e)
                }
                f = setTimeout(y, g(e))
            }

            function b(e) {
                f = undefined;
                if (d && a) {
                    return h(e)
                }
                a = o = undefined;
                return l
            }

            function C() {
                if (f !== undefined) {
                    clearTimeout(f)
                }
                p = 0;
                a = c = o = f = undefined
            }

            function F() {
                return f === undefined ? l : b($())
            }

            function w() {
                var e = $(),
                    t = _(e);
                a = arguments;
                o = this;
                c = e;
                if (t) {
                    if (f === undefined) {
                        return v(c)
                    }
                    if (D) {
                        f = setTimeout(y, i);
                        return h(c)
                    }
                }
                if (f === undefined) {
                    f = setTimeout(y, i)
                }
                return l
            }
            w.cancel = C;
            w.flush = F;
            return w
        }
    }();
    var jQuery = $;
    (function(e) {
        jQuery.fn.extend({
            everyTime: function(e, t, n, r, i) {
                return this.each(function() {
                    jQuery.timer.add(this, e, t, n, r, i)
                })
            },
            oneTime: function(e, t, n) {
                return this.each(function() {
                    jQuery.timer.add(this, e, t, n, 1)
                })
            },
            stopTime: function(e, t) {
                return this.each(function() {
                    jQuery.timer.remove(this, e, t)
                })
            }
        });
        jQuery.extend({
            timer: {
                guid: 1,
                global: {},
                regex: /^([0-9]+)\s*(.*s)?$/,
                powers: {
                    ms: 1,
                    cs: 10,
                    ds: 100,
                    s: 1e3,
                    das: 1e4,
                    hs: 1e5,
                    ks: 1e6
                },
                timeParse: function(e) {
                    if (e === undefined || e === null) {
                        return null
                    }
                    var t = this.regex.exec(jQuery.trim(e.toString()));
                    if (t[2]) {
                        var n = parseInt(t[1], 10);
                        var r = this.powers[t[2]] || 1;
                        return n * r
                    } else {
                        return e
                    }
                },
                add: function(e, t, n, r, i, u) {
                    var a = 0;
                    if (jQuery.isFunction(n)) {
                        if (!i) {
                            i = r
                        }
                        r = n;
                        n = t
                    }
                    t = jQuery.timer.timeParse(t);
                    if (typeof t !== "number" || isNaN(t) || t <= 0) {
                        return
                    }
                    if (i && i.constructor !== Number) {
                        u = !!i;
                        i = 0
                    }
                    i = i || 0;
                    u = u || false;
                    if (!e.$timers) {
                        e.$timers = {}
                    }
                    if (!e.$timers[n]) {
                        e.$timers[n] = {}
                    }
                    r.$timerID = r.$timerID || this.guid++;
                    var o = function() {
                        if (u && o.inProgress) {
                            return
                        }
                        o.inProgress = true;
                        if (++a > i && i !== 0 || r.call(e, a) === false) {
                            jQuery.timer.remove(e, n, r)
                        }
                        o.inProgress = false
                    };
                    o.$timerID = r.$timerID;
                    if (!e.$timers[n][r.$timerID]) {
                        e.$timers[n][r.$timerID] = setInterval(o, t)
                    }
                    if (!this.global[n]) {
                        this.global[n] = []
                    }
                    this.global[n].push(e)
                },
                remove: function(e, t, n) {
                    var r = e.$timers,
                        i;
                    if (r) {
                        if (!t) {
                            for (var u in r) {
                                if (r.hasOwnProperty(u)) {
                                    this.remove(e, u, n)
                                }
                            }
                        } else if (r[t]) {
                            if (n) {
                                if (n.$timerID) {
                                    clearInterval(r[t][n.$timerID]);
                                    delete r[t][n.$timerID]
                                }
                            } else {
                                for (var a in r[t]) {
                                    if (r[t].hasOwnProperty(a)) {
                                        clearInterval(r[t][a]);
                                        delete r[t][a]
                                    }
                                }
                            }
                            for (i in r[t]) {
                                if (r[t].hasOwnProperty(i)) {
                                    break
                                }
                            }
                            if (!i) {
                                i = null;
                                delete r[t]
                            }
                        }
                        for (i in r) {
                            if (r.hasOwnProperty(i)) {
                                break
                            }
                        }
                        if (!i) {
                            e.$timers = null
                        }
                    }
                }
            }
        });
        if (/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())) {
            e(window).one("unload", function() {
                var e = jQuery.timer.global;
                for (var t in e) {
                    if (e.hasOwnProperty(t)) {
                        var n = e[t],
                            r = n.length;
                        while (--r) {
                            jQuery.timer.remove(n[r], t)
                        }
                    }
                }
            })
        }
    })(jQuery);
    (function(f) {
        if (!String.prototype.split.toString().match(/\[native/)) {
            return
        }
        var c = String.prototype.split,
            p = /()??/.exec("")[1] === f,
            n;
        n = function(e, t, n) {
            if (Object.prototype.toString.call(t) !== "[object RegExp]") {
                return c.call(e, t, n)
            }
            var r = [],
                i = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.extended ? "x" : "") + (t.sticky ? "y" : ""),
                u = 0,
                a, o, s, l;
            t = new RegExp(t.source, i + "g");
            e += "";
            if (!p) {
                a = new RegExp("^" + t.source + "$(?!\\s)", i)
            }
            n = n === f ? -1 >>> 0 : n >>> 0;
            while (o = t.exec(e)) {
                s = o.index + o[0].length;
                if (s > u) {
                    r.push(e.slice(u, o.index));
                    if (!p && o.length > 1) {
                        o[0].replace(a, function() {
                            for (var e = 1; e < arguments.length - 2; e++) {
                                if (arguments[e] === f) {
                                    o[e] = f
                                }
                            }
                        })
                    }
                    if (o.length > 1 && o.index < e.length) {
                        Array.prototype.push.apply(r, o.slice(1))
                    }
                    l = o[0].length;
                    u = s;
                    if (r.length >= n) {
                        break
                    }
                }
                if (t.lastIndex === o.index) {
                    t.lastIndex++
                }
            }
            if (u === e.length) {
                if (l || !t.test("")) {
                    r.push("")
                }
            } else {
                r.push(e.slice(u))
            }
            return r.length > n ? r.slice(0, n) : r
        };
        String.prototype.split = function(e, t) {
            return n(this, e, t)
        };
        return n
    })();
    $.fn.caret = function(e) {
        var t = this[0];
        var n = t.contentEditable === "true";
        if (arguments.length === 0) {
            if (window.getSelection) {
                if (n) {
                    if (!this.is(":focus")) {
                        t.focus()
                    }
                    var r = window.getSelection().getRangeAt(0),
                        i = r.cloneRange();
                    i.selectNodeContents(t);
                    i.setEnd(r.endContainer, r.endOffset);
                    return i.toString().length
                }
                return t.selectionStart
            }
            if (document.selection) {
                t.focus();
                if (n) {
                    var r = document.selection.createRange(),
                        i = document.body.createTextRange();
                    i.moveToElementText(t);
                    i.setEndPoint("EndToEnd", r);
                    return i.text.length
                }
                var e = 0,
                    u = t.createTextRange(),
                    i = document.selection.createRange().duplicate(),
                    a = i.getBookmark();
                u.moveToBookmark(a);
                while (u.moveStart("character", -1) !== 0) e++;
                return e
            }
            return 0
        }
        if (e === -1) e = this[n ? "text" : "val"]().length;
        if (window.getSelection) {
            if (n) {
                if (!this.is(":focus")) {
                    t.focus()
                }
                var o = window.getSelection();
                o.collapse(o.focusNode, e)
            } else t.setSelectionRange(e, e)
        } else if (document.body.createTextRange) {
            var u = document.body.createTextRange();
            u.moveToElementText(t);
            u.moveStart("character", e);
            u.collapse(true);
            u.select()
        }
        if (!n && !this.is(":focus")) {
            t.focus()
        }
        return e
    };

    function make_callback_plugin(e) {
        var s = $.extend({
            init: $.noop,
            destroy: $.noop,
            name: "event"
        }, e);
        return function(r, i) {
            var u = arguments.length === 0;
            var a = arguments[0] === "unbind";
            if (!u && !a && !is_function(r)) {
                throw new Error("Invalid argument, it need to a function or string " + '"unbind" or no arguments.')
            }
            if (a) {
                r = is_function(arguments[1]) ? arguments[1] : null
            }
            var o = "callbacks_" + s.name;
            return this.each(function() {
                var t = $(this);
                var n;

                function e(e) {
                    n.fireWith(t, [e])
                }
                if (u || a) {
                    n = t.data(o);
                    if (u) {
                        n && n.fire()
                    } else {
                        if (r && n) {
                            n.remove(r);
                            if (!n.has()) {
                                n = null
                            }
                        } else {
                            n = null
                        }
                        if (!n) {
                            t.removeData(o);
                            s.destroy.call(this, e, i)
                        }
                    }
                } else if (t.data(o)) {
                    $(this).data(o).add(r)
                } else {
                    n = $.Callbacks();
                    n.add(r);
                    t.data(o, n);
                    s.init.call(this, e, i)
                }
            })
        }
    }
    $.fn.resizer = make_callback_plugin({
        name: "resize",
        init: function(e, t) {
            var n = $.extend({
                prefix: ""
            }, t);
            var r = $(this);
            var i;
            var u = true;
            if (r.is("body")) {
                $(window).on("resize.resizer", e)
            } else if (window.ResizeObserver) {
                i = new ResizeObserver(function() {
                    if (!u) {
                        e()
                    }
                    u = false
                });
                i.observe(this);
                r.data("observer", i)
            } else {
                var a = $("<iframe/>").addClass(n.prefix + "resizer").appendTo(this)[0];
                $(a.contentWindow).on("resize", e)
            }
        },
        destroy: function() {
            var e = $(this);
            if (window.ResizeObserver) {
                var t = e.data("observer");
                if (t) {
                    t.unobserve(this);
                    e.removeData("observer")
                }
            } else {
                var n = e.find('> iframe[class$="resizer"]');
                if (n.length) {
                    $(n[0].contentWindow).off("resize").remove();
                    n.remove()
                } else if (e.is("body")) {
                    $(window).off("resize.resizer")
                }
            }
        }
    });
    $.fn.touch_scroll = make_callback_plugin({
        name: "touch",
        init: function(r) {
            var i;
            var u;
            $(this).on("touchstart.scroll", function(e) {
                e = e.originalEvent;
                if (e.target.tagName.toLowerCase() !== "a" && e.touches.length === 1) {
                    u = i = e.touches[0]
                }
            }).on("touchmove.scroll", function(e) {
                e = e.originalEvent;
                if (i && e.touches.length === 1) {
                    var t = e.touches[0];
                    var n = r({
                        origin: i,
                        previous: u,
                        current: t
                    });
                    if (n === false) {
                        e.preventDefault()
                    }
                    u = t
                }
            }).on("touchend.scroll", function() {
                if (i || u) {
                    i = u = null
                }
            })
        },
        destroy: function() {
            $(this).off("touchstart.scroll touchmove.scroll touchend.scroll")
        }
    });
    $.fn.on_load = function(e) {
        var n = $.extend({
            error: $.noop,
            load: $.noop,
            done: $.noop
        }, e);
        var r = [];
        this.find("img,iframe").each(function() {
            var e = $(this);
            var t = new $.Deferred;
            e.on("load", t.resolve).on("error", function() {
                n.error(e);
                t.reject()
            });
            r.push(t)
        });
        n.load(!!r.length);
        if (r.length) {
            $.when.apply($, r).then(function() {
                n.done(true)
            })
        } else {
            n.done(false)
        }
        return this
    };

    function jquery_resolve(e) {
        var t = jQuery.Deferred();
        t.resolve(e);
        return t.promise()
    }

    function unpromise(e, t, n) {
        if (e !== undefined) {
            if (is_promise(e)) {
                if (is_function(e.catch) && is_function(n)) {
                    e.catch(n)
                }
                if (is_function(e.done)) {
                    return e.done(t)
                } else if (is_function(e.then)) {
                    return e.then(t)
                }
            } else if (e instanceof Array) {
                var r = e.filter(function(e) {
                    return e && (is_function(e.done) || is_function(e.then))
                });
                if (r.length) {
                    var i = $.when.apply($, e).then(function() {
                        return t([].slice.call(arguments))
                    });
                    if (is_function(i.catch)) {
                        i = i.catch(n)
                    }
                    return i
                }
            }
            return t(e)
        }
    }

    function always(e) {
        return e === undefined ? true : e
    }
    $.fn.is_fully_in_viewport = function() {
        function t(e, t) {
            var n = e.getBoundingClientRect();
            var r = t[0].getBoundingClientRect();
            var i = n.top - r.top;
            var u = n.bottom - r.top;
            var a = t.height();
            return u > 0 && i <= a
        }
        if (root.IntersectionObserver) {
            return function(e) {
                var t = this[0];
                var n = jQuery.Deferred();
                var r = new root.IntersectionObserver(function(e) {
                    n.resolve(e[0].isIntersecting && e[0].ratio === 1);
                    r.unobserve(t)
                }, {
                    root: e[0]
                });
                r.observe(t);
                return n.promise()
            }
        } else {
            return function(e) {
                return jquery_resolve(t(this[0], e))
            }
        }
    }();
    var entity_re = /(&(?:[a-z\d]+|#\d+|#x[a-f\d]+);)/i;
    var space_re = /\s/;
    var combine_chr_re = /(.(?:[\u0300-\u036F]|[\u1AB0-\u1abE]|[\u1DC0-\u1DF9]|[\u1DFB-\u1DFF]|[\u20D0-\u20F0]|[\uFE20-\uFE2F])+)/;
    var astral_symbols_re = /([\uD800-\uDBFF][\uDC00-\uDFFF])/;
    var emoji_re = /(\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83E\uDDD1(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB-\uDFFE])|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83E\uDDD1(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC3B\u200D\u2744|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDF])\u200D[\u2640\u2642])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F?|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD]))/;
    var mobile_re = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
    var tablet_re = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
    var format_split_re = /(\[\[(?:-?[@!gbiuso])*;[^;]*;[^\]]*\](?:[^\]\\]*(?:\\\\)*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]?)/i;
    var format_parts_re = /\[\[((?:-?[@!gbiuso])*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]\\]*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]+)\]?/gi;
    var format_re = /\[\[((?:-?[@!gbiuso])*;[^;\]]*;[^;\]]*(?:;|[^\]()]*);?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]?/gi;
    var format_exist_re = /\[\[((?:-?[@!gbiuso])*;[^;\]]*;[^;\]]*(?:;|[^\]()]*);?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]/gi;
    var format_full_re = /^(\[\[(?:(?:-?[@!gbiuso])*;[^;\]]*;[^;\]]*(?:;|[^\]()]*);?[^\]]*)\])([^\]]*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)(\])$/i;
    var format_begin_re = /(\[\[(?:-?[@!gbiuso])*;[^;]*;[^\]]*\])/i;
    var format_start_re = /^(\[\[(?:-?[@!gbiuso])*;[^;]*;[^\]]*\])/i;
    var format_end_re = /\[\[(?:-?[@!gbiuso])*;[^;]*;[^\]]*\]?$/i;
    var self_closing_re = /^(?:\[\[)?[^;]*@[^;]*;/;
    var color_re = /^(?:#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})|rgba?\([^)]+\)|hsla?\([^)]+\))$/i;
    var url_re = /(\b(?:file|ftp|https?):\/\/(?:(?:(?!&[^;]+;)|(?=&amp;))[^\s"'\\<>\][)])+)/gi;
    var url_nf_re = /\b(?![^"\s[\]]*])(https?:\/\/(?:(?:(?!&[^;]+;)|(?=&amp;))[^\s"'\\<>\][)])+)/gi;
    var email_re = /((([^<>('")[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;
    var url_full_re = /^(https?:\/\/(?:(?:(?!&[^;]+;)|(?=&amp;))[^\s"'<>\\\][)])+)$/gi;
    var email_full_re = /^((([^<>('")[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/g;
    var command_re = /((?:"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimsuy]*(?=\s|$)|(?:\\\s|\S))+)(?=\s|$)/gi;
    var extended_command_re = /^\s*((terminal|cmd)::([a-z_]+)\(([\s\S]*)\))\s*$/;
    var format_exec_split_re = /(\[\[(?:-?[@!gbiuso])*;[^\]]+\](?:\\[[\]]|[^\]])*\]|\[\[[\s\S]+?\]\])/;
    var format_exec_re = /(\[\[[\s\S]+?\]\])/;
    var float_re = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
    var re_re = /^\/((?:\\\/|[^/]|\[[^\]]*\/[^\]]*\])+)\/([gimsuy]*)$/;
    var string_re = /("(?:[^"\\]|\\(?:\\\\)*"|\\\\)*"|'(?:[^'\\]|\\(?:\\\\)*'|\\\\)*'|`(?:[^`\\]|\\(?:\\\\)*`|\\\\)*`)/;
    var unclosed_strings_re = /^(?=((?:[^"']+|"[^"\\]*(?:\\[^][^"\\]*)*"|'[^'\\]*(?:\\[^][^'\\]*)*')*))\1./;
    var broken_image = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14"><title id="title2">rounded</title><path id="terminal-broken-image" d="m 14,10 h 2 v 1 a 3,3 0 0 1 -3,3 H 3 A 3,3 0 0 1 0,11 H 4.5 A 1.00012,1.00012 0 0 0 5.207,10.707 L 6.5,9.414 7.793,10.707 a 0.99963,0.99963 0 0 0 1.41406,0 l 2.36719,-2.36719 1.80127,1.44092 A 0.99807,0.99807 0 0 0 14,10 Z M 16,3 V 8 H 14.35059 L 12.12451,6.21924 A 0.99846,0.99846 0 0 0 10.793,6.293 L 8.5,8.586 7.207,7.293 a 0.99962,0.99962 0 0 0 -1.41406,0 L 4.08594,9 H 0 V 3 A 3,3 0 0 1 3,0 h 10 a 3,3 0 0 1 3,3 z M 6,4.5 A 1.5,1.5 0 1 0 4.5,6 1.5,1.5 0 0 0 6,4.5 Z" /></svg>';
    var use_broken_image = '<svg class="terminal-broken-image" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#terminal-broken-image"/></svg>';
    var animation_supported = function() {
        if (typeof document === "undefined") {
            return false
        }
        var e = false,
            t = "Webkit Moz O ms Khtml".split(" "),
            n = document.createElement("div");
        if (n.style.animationName) {
            e = true
        }
        if (e === false) {
            for (var r = 0; r < t.length; r++) {
                var i = t[r] + "AnimationName";
                if (n.style[i] !== undefined) {
                    e = true;
                    break
                }
            }
        }
        n = null;
        return e
    }();
    var agent = (root.navigator || window.navigator).userAgent;
    var is_IE = /MSIE|Trident/.test(agent) || /rv:11.0/i.test(agent);
    var is_IEMobile = /IEMobile/.test(agent);
    var is_ch_unit_supported = function() {
        if (is_IE && !is_IEMobile) {
            return false
        }
        if (typeof document === "undefined") {
            return true
        }
        var e = document.createElement("div");
        e.style.width = "1ch";
        return e.style.width === "1ch"
    }();
    var is_css_variables_supported = root.CSS && root.CSS.supports && root.CSS.supports("--fake-var", 0);
    var is_android = navigator.userAgent.toLowerCase().indexOf("android") !== -1;
    var is_key_native = function e() {
        if (!("KeyboardEvent" in root && "key" in root.KeyboardEvent.prototype)) {
            return false
        }
        var t = root.KeyboardEvent.prototype;
        var n = Object.getOwnPropertyDescriptor(t, "key").get;
        return !!n.toString().match(/\[native code\]/)
    }();
    var is_browser = function() {
        try {
            return this === window
        } catch (e) {
            return false
        }
    }();
    var is_mobile = function(e) {
        var t = false;
        if (mobile_re.test(e) || tablet_re.test(e.substr(0, 4))) {
            t = true
        }
        if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) {
            return true
        }
        return t
    }(navigator.userAgent || navigator.vendor || root.opera);
    var ch_unit_bug = false;
    if (is_browser) {
        $(function() {
            function e(e) {
                return e[0].getBoundingClientRect().width
            }
            var t = '<span style="font-family: monospace;visibility:hidden;';
            var n = $(t + 'width:1ch;overflow: hidden">&nbsp;</span>');
            n.appendTo("body");
            var r = $(t + '">&nbsp;</span>').appendTo("body");
            ch_unit_bug = Math.abs(e(n) - e(r)) > 1e-4;
            n.remove();
            r.remove()
        })
    }

    function css(t, n, e) {
        if (t instanceof $.fn.init) {
            t.each(function() {
                css(this, n, e)
            })
        } else if ($.isPlainObject(n)) {
            Object.keys(n).forEach(function(e) {
                t.style.setProperty(e, n[e])
            })
        } else if (typeof e === "undefined") {
            return t.style.getPropertyValue(n)
        } else {
            t.style.setProperty(n, e)
        }
    }

    function style_prop(e, t, n) {
        var r = [e + ":" + t + "px", e + ":" + "calc(" + t + "px / var(--pixel-density, 1))"];
        if (n) {
            r = r.map(function(e) {
                return e + " !important"
            })
        }
        return r.join(";")
    }

    function a11y_hide(e) {
        e.attr({
            role: "presentation",
            "aria-hidden": "true"
        })
    }
    var excepctions = [];

    function alert_exception(e, t) {
        if (arguments[0] instanceof $.terminal.Exception) {
            e = arguments[0].type;
            t = arguments[0]
        }
        var n = (e ? e + ": " : "") + exception_message(t);
        if (excepctions.indexOf(n) === -1) {
            excepctions.push(n);
            setTimeout(function() {
                throw t
            }, 0)
        }
    }

    function generate_id() {
        var e = Math.random() * 46656 | 0;
        var t = Math.random() * 46656 | 0;
        e = ("000" + e.toString(36)).slice(-3);
        t = ("000" + t.toString(36)).slice(-3);
        return e + t
    }

    function scrollbar_event(e, t, n) {
        n = n || 1;
        var r = t.offset().left;
        var i = t.outerWidth() * n;
        return i <= e.clientX - r
    }

    function exception_message(e) {
        if (typeof e === "string") {
            return e
        } else if (typeof e.fileName === "string") {
            return e.fileName + ": " + e.message
        } else {
            return e.message
        }
    }

    function Cycle() {
        var r = [].slice.call(arguments);
        var i = 0;
        $.extend(this, {
            get: function() {
                return r
            },
            index: function() {
                return i
            },
            rotate: function(e, t) {
                if (t === undefined) {
                    t = i
                } else if (t === i) {
                    return
                }
                if (!e) {
                    var n = r.filter(function(e) {
                        return typeof e !== "undefined"
                    });
                    if (!n.length) {
                        return
                    }
                }
                if (!r.length) {
                    return
                }
                if (r.length === 1) {
                    return r[0]
                } else {
                    if (i === r.length - 1) {
                        i = 0
                    } else {
                        ++i
                    }
                    if (typeof r[i] !== "undefined") {
                        return r[i]
                    } else {
                        return this.rotate(true, t)
                    }
                }
            },
            length: function() {
                return r.length
            },
            remove: function(e) {
                delete r[e]
            },
            set: function(e) {
                for (var t = r.length; t--;) {
                    if (r[t] === e) {
                        i = t;
                        return
                    }
                }
                this.append(e);
                i = r.length - 1
            },
            front: function() {
                if (r.length) {
                    var e = i;
                    var t = false;
                    while (!r[e]) {
                        e++;
                        if (e > r.length) {
                            if (t) {
                                break
                            }
                            e = 0;
                            t = true
                        }
                    }
                    return r[e]
                }
            },
            map: function(n) {
                return r.map(function(e, t) {
                    if (typeof e !== "undefined") {
                        return n(e, t)
                    }
                    return null
                }).filter(Boolean)
            },
            forEach: function(n) {
                return r.forEach(function(e, t) {
                    if (typeof e !== "undefined") {
                        n(e, t)
                    }
                })
            },
            append: function(e) {
                r.push(e)
            }
        })
    }

    function Stack(e) {
        var t = is_array(e) ? e : e ? [e] : [];
        $.extend(this, {
            data: function() {
                return t
            },
            map: function(e) {
                return $.map(t, e)
            },
            size: function() {
                return t.length
            },
            pop: function() {
                if (t.length === 0) {
                    return null
                } else {
                    var e = t[t.length - 1];
                    t = t.slice(0, t.length - 1);
                    return e
                }
            },
            push: function(e) {
                t = t.concat([e]);
                return e
            },
            top: function() {
                return t.length > 0 ? t[t.length - 1] : null
            },
            clone: function() {
                return new Stack(t.slice(0))
            }
        })
    }

    function WorkerCache(e) {
        var t = $.extend({
            validation: $.noop,
            action: $.noop,
            onCache: $.noop
        }, e);
        this._onCache = t.onCache.bind(this);
        this._action = t.action.bind(this);
        this._validation = t.validation.bind(this);
        if ("Map" in root) {
            this._cache = new Map
        }
    }
    WorkerCache.prototype.validate = function(e) {
        var t = this._validation(e);
        var n = t === undefined || t === true;
        if (!n) {
            this._cache.clear()
        }
        return n
    };
    WorkerCache.prototype.clear = function() {
        this._cache.clear()
    };
    WorkerCache.prototype.get = function(e) {
        if (!this._cache) {
            return this._action(e)
        }
        var t;
        if (this.validate(e) && this._cache.has(e)) {
            t = this._cache.get(e);
            this._onCache({
                cache: t
            });
            return t
        }
        t = this._action(e);
        this._cache.set(e, t);
        return t
    };

    function History(e, t, n) {
        var r = true;
        var i = "";
        if (typeof e === "string" && e !== "") {
            i = e + "_"
        }
        i += "commands";
        var u;
        if (n) {
            u = []
        } else {
            u = $.Storage.get(i);
            u = u ? JSON.parse(u) : []
        }
        var a = u.length - 1;
        $.extend(this, {
            append: function(e) {
                if (r) {
                    if (u[u.length - 1] !== e) {
                        u.push(e);
                        if (t && u.length > t) {
                            u = u.slice(-t)
                        }
                        a = u.length - 1;
                        if (!n) {
                            $.Storage.set(i, JSON.stringify(u))
                        }
                    }
                }
            },
            set: function(e) {
                if (is_array(e)) {
                    u = e;
                    if (!n) {
                        $.Storage.set(i, JSON.stringify(u))
                    }
                }
            },
            data: function() {
                return u
            },
            reset: function() {
                a = u.length - 1
            },
            last: function() {
                return u[u.length - 1]
            },
            end: function() {
                return a === u.length - 1
            },
            position: function() {
                return a
            },
            current: function() {
                return u[a]
            },
            next: function() {
                var e = a;
                if (a < u.length - 1) {
                    ++a
                }
                if (e !== a) {
                    return u[a]
                }
            },
            previous: function() {
                var e = a;
                if (a > 0) {
                    --a
                }
                if (e !== a) {
                    return u[a]
                }
            },
            clear: function() {
                u = [];
                this.purge()
            },
            enabled: function() {
                return r
            },
            enable: function() {
                r = true
            },
            purge: function() {
                if (!n) {
                    $.Storage.remove(i)
                }
            },
            disable: function() {
                r = false
            },
            toggle: function(e) {
                if (typeof e === "undefined") {
                    r = !r
                } else {
                    r = e
                }
            }
        })
    }

    function OutputLines(e) {
        this._settings = e;
        this._lines = [];
        this._snapshot = []
    }
    OutputLines.prototype.make_snapshot = function(e) {
        this._snapshot.push(e)
    };
    OutputLines.prototype.get_partial = function() {
        var e = this._snapshot[this._snapshot.length - 1];
        return e
    };
    OutputLines.prototype.update_snapshot = function(e, t) {
        this._snapshot[e] = t
    };
    OutputLines.prototype.limit_snapshot = function(e) {
        this._snapshot = this._snapshot.slice(e)
    };
    OutputLines.prototype.clear_snapshot = function() {
        this._snapshot = []
    };
    OutputLines.prototype.get_snapshot = function() {
        return this._snapshot.reduce(function(e, t) {
            return e.concat(t)
        }, []).join("\n")
    };
    OutputLines.prototype.join = function() {
        var e = [].slice.call(arguments);
        if (e.some(is_function)) {
            return function() {
                return e.reduce(function(e, t) {
                    if (is_function(e)) {
                        e = e()
                    }
                    if (is_function(t)) {
                        t = t()
                    }
                    if (is_promise(e) || is_promise(t)) {
                        return $.when(e, t).then(function(e, t) {
                            return e + t
                        })
                    }
                    return t
                })
            }
        } else if (e.some(is_promise)) {
            return e.reduce(function(e, t) {
                return $.when(e, t).then(function(e, t) {
                    return e + t
                })
            })
        }
        return e.join("")
    };
    OutputLines.prototype.import = function(e) {
        this._lines = e
    };
    OutputLines.prototype.push = function(e) {
        var t = e[0];
        var n = e[1];
        if (this.has_newline()) {
            this._lines.push(e)
        } else {
            var r = this.last_line();
            r[0] = this.join(r[0], t);
            r[1].newline = n.newline
        }
    };
    OutputLines.prototype.clear = function(r) {
        this._lines.forEach(function(e, t) {
            var n = e[1];
            if (is_function(n.onClear)) {
                n.onClear.call(self, r(t))
            }
        });
        this._lines = [];
        this._snapshot = []
    };
    OutputLines.prototype.data = function() {
        return this._lines
    };
    OutputLines.prototype.has_newline = function() {
        if (this._lines.length === 0) {
            return true
        }
        return this.last_line()[1].newline
    };
    OutputLines.prototype.unmount = function(e) {
        var t = e.data("index");
        var n = this._lines[t];
        if (n) {
            var r = n[1];
            if (is_function(r.unmount)) {
                r.unmount.call(self, e)
            }
        }
    };
    OutputLines.prototype.last_line = function() {
        var e = this._lines.length;
        return this._lines[e - 1]
    };
    OutputLines.prototype.update = function(e, t, n) {
        if (t === null) {
            this._lines.splice(e, 1)
        } else {
            this._lines[e][0] = t;
            if (n) {
                this._lines[e][1] = $.extend(this._lines[e][1], n)
            }
            return this._lines[e][1]
        }
    };
    OutputLines.prototype.length = function() {
        return this._lines.length
    };
    OutputLines.prototype.valid_index = function(e) {
        return !!this._lines[e]
    };
    OutputLines.prototype.render = function(e, t) {
        var n = this._settings();
        var i = [];
        this._snapshot = [];
        if (n.outputLimit >= 0) {
            var r;
            if (n.outputLimit === 0) {
                r = e
            } else {
                r = n.outputLimit
            }
            this._lines.forEach(function(e, t) {
                var n = e[0];
                var r = e[1];
                i.push({
                    value: n,
                    index: t,
                    options: r
                })
            });
            var u = i.length - r - 1;
            i = i.slice(u)
        } else {
            i = this._lines.map(function(e, t) {
                return {
                    value: e[0],
                    index: t,
                    options: e[1]
                }
            })
        }
        return t(i)
    };

    function FormatBuffer(e) {
        this._options = e;
        if ("Map" in root) {
            this._format_cache = new Map
        }
        this._output_buffer = []
    }
    FormatBuffer.NEW_LINE = 1;
    FormatBuffer.prototype.format = function e(t, n, r) {
        var i = this._format_cache && this._settings.useCache;
        if (i) {
            var u = JSON.stringify([t, this._settings]);
            if (this._format_cache.has(u)) {
                return this._format_cache.get(u)
            }
        }
        var a = {
            line: $.terminal.format(t, this._settings),
            raw: r,
            newline: n
        };
        if (i) {
            this._format_cache.set(u, a)
        }
        return a
    };
    FormatBuffer.prototype.empty = function() {
        return !this._output_buffer.length
    };
    FormatBuffer.prototype.append = function(e, t, n, r) {
        this._settings = $.extend({
            useCache: true
        }, this._options(n));
        this._output_buffer.push(FormatBuffer.NEW_LINE);
        if (e instanceof Array) {
            var i = r.split("\n");
            for (var u = 0, a = e.length; u < a; ++u) {
                if (e[u] === "" || e[u] === "\r") {
                    this._output_buffer.push({
                        line: "",
                        raw: ""
                    })
                } else {
                    var o = this.format(e[u], u === a - 1, i[u]);
                    this._output_buffer.push(o)
                }
            }
        } else if (n.raw) {
            this._output_buffer.push({
                line: e,
                raw: r
            })
        } else {
            this._output_buffer.push(this.format(e, false, r))
        }
        this._output_buffer.push({
            finalize: n.finalize,
            index: t,
            raw: n.raw,
            newline: n.newline
        })
    };
    FormatBuffer.prototype.clear_cache = function() {
        if (this._format_cache) {
            this._format_cache.clear()
        }
    };
    FormatBuffer.prototype.output = function() {
        return this._output_buffer.slice()
    };
    FormatBuffer.prototype.is_empty = function() {
        return !this._output_buffer.length
    };
    FormatBuffer.prototype.clear = function() {
        this._output_buffer = []
    };
    FormatBuffer.prototype.forEach = function(e) {
        var t = 0;
        while (t < this._output_buffer.length) {
            var n = this._output_buffer[t++];
            if (n === FormatBuffer.NEW_LINE) {
                e()
            } else {
                e(n)
            }
        }
    };
    FormatBuffer.prototype.flush = function(e) {
        this.forEach(e);
        this.clear()
    };

    function with_prompt(e, n, t) {
        function r(e) {
            var t = $.terminal.escape_brackets("[ERR]> ");
            n("[[;red;]" + t + "]");
            alert_exception("Prompt", e)
        }

        function i(e) {
            n(e);
            u.resolve()
        }
        var u = new $.Deferred;
        switch (typeof e) {
            case "string":
                i(e);
                break;
            case "function":
                try {
                    var a = e.call(t, function(e) {
                        i(e)
                    });
                    if (typeof a === "string") {
                        i(a)
                    }
                    if (a && a.then) {
                        a.then(i).catch(r)
                    }
                } catch (e) {
                    r(e)
                }
                break
        }
        return u.promise()
    }
    var cmd_index = 0;
    $.cmd = {
        defaults: {
            mask: false,
            caseSensitiveSearch: true,
            historySize: 60,
            prompt: "> ",
            enabled: true,
            history: true,
            onPositionChange: $.noop,
            onCommandChange: $.noop,
            inputStyle: "textarea",
            mobileDelete: is_mobile,
            onPaste: $.noop,
            clickTimeout: 200,
            holdTimeout: 400,
            holdRepeatTimeout: 200,
            mobileIngoreAutoSpace: [],
            repeatTimeoutKeys: [],
            tabindex: 1,
            tabs: 4
        }
    };
    $.fn.cmd = function(z) {
        var x = $.extend({}, $.cmd.defaults, z);

        function I(e) {
            return x.mobileIngoreAutoSpace.length && x.mobileIngoreAutoSpace.indexOf(e) !== -1 && is_android
        }
        var k = this;
        var P = k.data("cmd");
        if (P) {
            return P
        }
        var N = cmd_index++;
        k.addClass("cmd");
        var A = $('<div class="cmd-wrapper"/>').appendTo(k);
        A.append('<span class="cmd-prompt"></span>');
        A.append('<div class="cmd-cursor-line">' + "<span></span>" + '<span class="cmd-cursor">' + '<span data-text class="end"><span>&nbsp;</span></span>' + "</span>" + "<span></span>" + "</div>");
        var M = A.find(".cmd-cursor-line");
        a11y_hide(M);
        var B;
        if (is_mobile) {
            B = function() {
                var t = $('<div class="cmd-editable" contenteditable/>').attr({
                    autocapitalize: "off",
                    autocorrect: "off",
                    spellcheck: "false",
                    tabindex: x.tabindex
                }).insertAfter(k);
                t.on("focus", function() {
                    k.enable()
                }).on("blur", function() {
                    k.disable()
                });
                var e;
                var n = {
                    $node: t,
                    val: function(e) {
                        if (typeof e === "undefined") {
                            return t.text()
                        } else {
                            t.html(e)
                        }
                    },
                    reset: function() {
                        clearTimeout(e);
                        e = setTimeout(function() {
                            t.css({
                                top: "",
                                bottom: ""
                            })
                        }, 100)
                    },
                    focus: function() {
                        css(t[0], {
                            top: "calc(var(--terminal-scroll, 0) * 1px)"
                        });
                        n.reset()
                    },
                    blur: function() {
                        t.css({
                            top: "100%",
                            bottom: 0
                        }).blur();
                        window.getSelection().removeAllRanges();
                        n.reset()
                    }
                };
                return n
            }();
            k.addClass("cmd-mobile")
        } else {
            B = function() {
                var e = generate_id();
                var t = $("<textarea>").attr({
                    autocapitalize: "off",
                    spellcheck: "false",
                    id: e,
                    tabindex: x.tabindex
                }).addClass("cmd-clipboard").appendTo(k);
                t.before('<label class="visually-hidden" for="' + e + '">' + "Clipboard textarea for jQuery Terminal</label>");
                return {
                    $node: t,
                    val: function(e) {
                        if (typeof e === "undefined") {
                            return t.val()
                        } else {
                            return t.val(e)
                        }
                    }
                }
            }();
            B.val(" ")
        }
        if (x.width) {
            k.width(x.width)
        }
        var m;
        var D;
        var H;
        var W;
        var o;
        var s = 0;
        var d;
        var h = k.find(".cmd-prompt");
        var a = false;
        var l = "";
        var q = null;
        var U;
        var T = "";
        var K;
        var u = "";
        var S = 0;
        var r;
        var f;
        var R = 0;
        var J, c;
        var v = k.find(".cmd-cursor");
        var t;
        var Q;
        var Y = 0;
        var V = "￿";
        var G = /\uFFFF$/;
        var X = /^\uFFFF$/;

        function Z(e) {
            var t = $(e.target);
            if (t.is("span,img,a")) {
                t = t.closest("[data-text]");
                return t.index() + t.parent("span").prevAll().find("[data-text]").length + t.closest('[role="presentation"]').prevUntil(".cmd-prompt").find("[data-text]").length
            } else if (t.is('div[role="presentation"]')) {
                var n = !t.next().length;
                return t.find("[data-text]").length + t.prevUntil(".cmd-prompt").find("[data-text]").length - (n ? 0 : 1)
            }
        }
        var ee = {
            SPACEBAR: " ",
            UP: "ArrowUP",
            DOWN: "ArrowDown",
            LEFT: "ArrowLeft",
            RIGHT: "ArrowRight",
            DEL: "Delete",
            MULTIPLY: "*",
            DIVIDE: "/",
            SUBTRACT: "-",
            ADD: "+"
        };

        function te(e) {
            var t = e.key.toUpperCase();
            if (ee[t]) {
                return ee[t]
            }
            return t
        }

        function ne(e) {
            if (e.key) {
                var t = te(e).toUpperCase();
                if (t === "CONTROL") {
                    return "CTRL"
                } else {
                    var n = [];
                    if (e.ctrlKey) {
                        n.push("CTRL")
                    }
                    if (e.metaKey && t !== "META") {
                        n.push("META")
                    }
                    if (e.shiftKey && t !== "SHIFT") {
                        n.push("SHIFT")
                    }
                    if (e.altKey && t !== "ALT") {
                        n.push("ALT")
                    }
                    if (n.length && t === " ") {
                        t = "SPACEBAR"
                    }
                    if (e.key) {
                        n.push(t)
                    }
                    return n.join("+")
                }
            }
        }
        var e = {
            3: "Cancel",
            6: "Help",
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            28: "Convert",
            29: "NonConvert",
            30: "Accept",
            31: "ModeChange",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            41: "Select",
            42: "Print",
            43: "Execute",
            44: "PrintScreen",
            45: "Insert",
            46: "Delete",
            48: ["0", ")"],
            49: ["1", "!"],
            50: ["2", "@"],
            51: ["3", "#"],
            52: ["4", "$"],
            53: ["5", "%"],
            54: ["6", "^"],
            55: ["7", "&"],
            56: ["8", "*"],
            57: ["9", "("],
            91: "OS",
            93: "ContextMenu",
            144: "NumLock",
            145: "ScrollLock",
            181: "VolumeMute",
            182: "VolumeDown",
            183: "VolumeUp",
            186: [";", ":"],
            187: ["=", "+"],
            188: [",", "<"],
            189: ["-", "_"],
            190: [".", ">"],
            191: ["/", "?"],
            192: ["`", "~"],
            219: ["[", "{"],
            220: ["\\", "|"],
            221: ["]", "}"],
            222: ["'", '"'],
            224: "Meta",
            225: "AltGraph",
            246: "Attn",
            247: "CrSel",
            248: "ExSel",
            249: "EraseEof",
            250: "Play",
            251: "ZoomOut"
        };
        var n;
        for (n = 1; n < 25; n++) {
            e[111 + n] = "F" + n
        }
        var re = "";
        for (n = 65; n < 91; n++) {
            re = String.fromCharCode(n);
            e[n] = [re.toLowerCase(), re.toUpperCase()]
        }
        var ie = {};
        Object.keys(e).forEach(function(t) {
            if (is_array(e[t])) {
                e[t].forEach(function(e) {
                    ie[e.toUpperCase()] = t
                })
            } else {
                ie[e[t].toUpperCase()] = t
            }
        });
        var i;
        var p = {
            "ALT+D": ue({
                clipboard: true
            }),
            "HOLD+ALT+D": ue({
                clipboard: true,
                hold: true
            }),
            "HOLD+DELETE": ue({
                clipboard: false,
                hold: true
            }),
            "HOLD+SHIFT+DELETE": ue({
                clipboard: false,
                hold: true
            }),
            ENTER: function() {
                if (c && T && !x.mask && (is_function(x.historyFilter) && x.historyFilter(T) || x.historyFilter instanceof RegExp && T.match(x.historyFilter) || !x.historyFilter)) {
                    c.append(T)
                }
                var e = T;
                B.$node.blur();
                c.reset();
                Ge = "";
                F = true;
                var t;
                if (x.commands) {
                    t = x.commands.call(k, e)
                }
                if (is_function(r)) {
                    if (t && is_function(t.then)) {
                        t.then(b)
                    } else {
                        b()
                    }
                }
                k.set("");
                B.val("");
                B.$node.focus();
                return false
            },
            "SHIFT+ENTER": function() {
                k.insert("\n");
                return true
            },
            BACKSPACE: he,
            "SHIFT+BACKSPACE": he,
            TAB: function() {
                k.insert("\t")
            },
            "CTRL+D": function() {
                k["delete"](1);
                return false
            },
            DELETE: function() {
                k["delete"](1);
                return true
            },
            "HOLD+ARROWUP": De,
            ARROWUP: De,
            "CTRL+ARROWUP": le,
            "CTRL+P": le,
            ARROWDOWN: de,
            "HOLD+ARROWDOWN": de,
            "CTRL+N": fe,
            "CTRL+ARROWDOWN": fe,
            ARROWLEFT: ve,
            "HOLD+ARROWLEFT": debounce(ve, 10),
            "CTRL+B": ve,
            "CTRL+ARROWLEFT": function() {
                var e = S - 1;
                var t = 0;
                if (T[e] === " ") {
                    --e
                }
                for (var n = e; n > 0; --n) {
                    if (T[n] === " " && T[n + 1] !== " ") {
                        t = n + 1;
                        break
                    } else if (T[n] === "\n" && T[n + 1] !== "\n") {
                        t = n;
                        break
                    }
                }
                k.position(t)
            },
            "CTRL+R": function() {
                if (a) {
                    $e(true)
                } else {
                    U = r;
                    Ee();
                    K = T;
                    k.set("");
                    y();
                    a = true
                }
                return false
            },
            "CTRL+G": function() {
                if (a) {
                    r = U;
                    b();
                    k.set(K);
                    y();
                    a = false;
                    l = "";
                    return false
                }
            },
            ARROWRIGHT: ge,
            "HOLD+ARROWRIGHT": debounce(ge, 10),
            "CTRL+F": ge,
            "CTRL+ARROWRIGHT": function() {
                if (T[S] === " ") {
                    ++S
                }
                var e = /\S[\n\s]{2,}|[\n\s]+\S?/;
                var t = T.slice(S).match(e);
                if (!t || t[0].match(/^\s+$/)) {
                    k.position(bare_text(T).length)
                } else if (t[0][0] !== " ") {
                    S += t.index + 1
                } else {
                    S += t.index + t[0].length - 1;
                    if (t[0][t[0].length - 1] !== " ") {
                        --S
                    }
                }
                y()
            },
            F12: g,
            END: ye(true),
            "CTRL+END": ye(),
            "CTRL+E": ye(),
            HOME: _e(true),
            "CTRL+HOME": _e(),
            "CTRL+A": _e(),
            "SHIFT+INSERT": oe,
            "CTRL+SHIFT+T": g,
            "CTRL+W": ae({
                clipboard: true,
                hold: false
            }),
            "HOLD+BACKSPACE": ae({
                clipboard: false,
                hold: true
            }),
            "HOLD+SHIFT+BACKSPACE": ae({
                clipboard: false,
                hold: true
            }),
            "CTRL+H": function() {
                if (T !== "" && S > 0) {
                    k["delete"](-1)
                }
                return false
            },
            "CTRL+X": g,
            "CTRL+C": function() {
                return get_selected_html() === ""
            },
            "CTRL+T": g,
            "CTRL+Y": function() {
                if (u !== "") {
                    k.insert(u)
                }
            },
            "CTRL+V": oe,
            "META+V": oe,
            "CTRL+K": function() {
                var e = text(T).length;
                if (e > S) {
                    u = k["delete"](e - S);
                    text_to_clipboard(B.$node, u)
                }
                return false
            },
            "CTRL+U": function() {
                if (T !== "" && S !== 0) {
                    u = k["delete"](-S);
                    text_to_clipboard(B.$node, u)
                }
                return false
            },
            "CTRL+TAB": function() {
                return false
            },
            "META+`": g,
            "META+R": g,
            "META+L": g
        };

        function ue(i) {
            i = i || {};
            if (i.hold && !x.mobileDelete) {
                return function e() {
                    k["delete"](1);
                    return false
                }
            }
            return function e() {
                var t = / *[^ ]+ *(?= )|[^ ]+$/;
                var n = T.slice(S);
                var r = n.match(t);
                if (r) {
                    u = r[0];
                    if (i.clipboard) {
                        text_to_clipboard(B.$node, u)
                    }
                }
                k.set(T.slice(0, S) + T.slice(S).replace(t, ""), true);
                return false
            }
        }

        function ae(n) {
            n = n || {};
            if (n.hold && !x.mobileDelete) {
                return function e() {
                    k["delete"](-1)
                }
            }
            return function e() {
                if (T !== "" && S !== 0) {
                    var t = T.slice(0, S).match(/([^ ]* *$)/);
                    if (t[0].length) {
                        u = k["delete"](-t[0].length);
                        if (n.clipboard) {
                            text_to_clipboard(B.$node, u)
                        }
                    }
                }
                return false
            }
        }

        function g() {
            return true
        }

        function oe() {
            B.val("");
            Y = 0;
            if (k.isenabled() && !B.$node.is(":focus")) {
                B.$node.trigger("focus", [true])
            }
            B.$node.one("input", se);
            return true
        }

        function se() {
            if (Y++ > 0) {
                return
            }

            function n() {
                B.val(T);
                _()
            }

            function r(e) {
                k.insert(e);
                n()
            }
            if (k.isenabled()) {
                k.oneTime(100, function() {
                    var e = B.val().replace(/\r/g, "");
                    if (is_function(x.onPaste)) {
                        var t = x.onPaste.call(k, {
                            target: k,
                            text: e
                        });
                        if (t !== undefined) {
                            if (t && is_function(t.then || t.done)) {
                                (t.then || t.done).call(t, r)
                            } else if (typeof t === "string") {
                                r(t)
                            } else if (t === false) {
                                n()
                            }
                            return
                        }
                    }
                    r(e)
                })
            }
        }

        function le() {
            if (We) {
                K = T;
                k.set(c.current())
            } else {
                k.set(c.previous())
            }
            We = false;
            return false
        }

        function fe() {
            if (c.end()) {
                We = true;
                k.set(K)
            } else {
                k.set(c.next())
            }
            return false
        }

        function ce(e) {
            return e.match(/\n/)
        }

        function pe(e, t) {
            var n = e.split("\n").map(function(e) {
                return $.terminal.length(e)
            });
            if (t) {
                n[0] += t
            }
            var r = n.filter(function(e) {
                return e >= m
            });
            return !!r.length
        }

        function me(e) {
            var t = H;
            var n = $.terminal.split_equal(t + e, m);
            var r = new RegExp("^" + $.terminal.escape_regex(t));
            n = n.map($.terminal.unescape_brackets);
            n[0] = n[0].replace(r, "");
            return n
        }

        function De() {
            var e = $.terminal.substring(T, 0, S);
            var t = k.column();
            var n = k.find(".cmd-cursor-line");
            var r = n.prevUntil("span").length;
            if (r === 1 && t <= d) {
                k.position(0);
                return false
            }
            if (r === 0) {
                return le()
            }
            if (ce(e) || pe(e, d)) {
                var i = n.prev();
                var u = i.is(".cmd-end-line");
                var a = me(T);
                i = a[r - 1];
                var o = a[r].substring(t).length;
                var s;
                if (o > 0) {
                    s = t;
                    if (r - 1 === 0) {
                        s -= d
                    }
                    s = t + i.substring(s).length;
                    if (u) {
                        ++s
                    }
                } else {
                    s = t + 1
                }
                k.position(-s, true);
                return false
            } else {
                return le()
            }
        }

        function de() {
            var e = $.terminal.substring(T, S);
            if (ce(e) || pe(e)) {
                var t = me(T);
                var n = k.column();
                var r = k.find(".cmd-cursor-line");
                var i = r.prevUntil("span");
                var u = i.length;
                var a = r.is(".cmd-end-line");
                var o = r.next().is(".cmd-end-line");
                var s = t[u + 1];
                if (!s) {
                    return fe()
                }
                var l = t[u].substring(n).length;
                var f;
                if (l === 0) {
                    f = s.length;
                    if (o) {
                        f++
                    }
                } else {
                    f = Math.min(n, s.length) + l;
                    if (u === 0) {
                        f += d
                    }
                    if (a) {
                        f += 1
                    }
                }
                k.position(f, true);
                return false
            } else {
                return fe()
            }
        }

        function he() {
            if (a) {
                l = l.slice(0, -1);
                Ee()
            } else if (T !== "" && S > 0) {
                k["delete"](-1)
            }
            k.oneTime(1, function() {
                F = true
            })
        }

        function ve() {
            if (S > 0) {
                k.position(-1, true)
            }
        }

        function ge() {
            if (S < bare_text(T).length) {
                k.position(1, true)
            }
            return false
        }

        function _e(e) {
            function t() {
                k.position(0)
            }
            if (e) {
                return function() {
                    if (T.match(/\n/)) {
                        var e = T.substring(0, k.position());
                        k.position(e.lastIndexOf("\n") + 1)
                    } else {
                        t()
                    }
                }
            } else {
                return t
            }
        }

        function ye(e) {
            function i() {
                k.position(text(T).length)
            }
            if (e) {
                return function() {
                    if (T.match(/\n/)) {
                        var e = T.split("\n");
                        var t = k.position();
                        var n = 0;
                        for (var r = 0; r < e.length; ++r) {
                            n += e[r].length;
                            if (n > t) {
                                k.position(n + r);
                                return
                            }
                        }
                    }
                    i()
                }
            } else {
                return i
            }
        }

        function be() {
            var e = B.$node;
            var t = e.is(":focus");
            if (f) {
                if (!t) {}
                k.oneTime(10, function() {
                    if (!e.is(":focus") && f) {
                        e.trigger("focus", [true])
                    }
                })
            } else if (t && !f) {
                e.trigger("blur", [true])
            }
        }

        function Ce() {
            if (animation_supported) {
                var e = window.getComputedStyle(v[0]);
                var t = e.getPropertyValue("--animation");
                t = t.replace(/^\s*|\s*$/g, "");
                var n = k.attr("class");
                if (n.match(/-animation/)) {
                    n = n.replace(/[a-z]+-animation/g, "")
                }
                if (t && !t.match(/blink/)) {
                    var r = t.replace(/terminal-/, "") + "-animation";
                    if (!n.match(r)) {
                        n += " " + r
                    }
                }
                n = n.replace(/\s+/g, " ");
                if (n !== k.attr("class").replace(/\s+/g, " ")) {
                    k.attr("class", n)
                }
            }
        }

        function _(e) {
            if (!k.isenabled()) {
                return
            }
            k.oneTime(10, function() {
                if (!is_mobile && B.val() !== T && !e) {
                    B.val(" " + T)
                }
                if (f) {
                    k.oneTime(10, function() {
                        try {
                            var e = !is_mobile ? S + 1 : S;
                            if (B.$node.caret() !== e) {
                                B.$node.caret(e)
                            }
                        } catch (e) {}
                    })
                }
            })
        }
        if (animation_supported && !is_android) {
            t = function(e) {
                if (e) {
                    v.addClass("cmd-blink")
                } else {
                    v.removeClass("cmd-blink")
                }
            };
            Q = function() {
                var e = v.clone();
                e.insertBefore(v);
                v.remove();
                v = e
            }
        } else {
            var Fe = false;
            t = function(e) {
                if (e && !Fe) {
                    Fe = true;
                    v.addClass("cmd-inverted cmd-blink");
                    k.everyTime(500, "blink", we)
                } else if (Fe && !e) {
                    Fe = false;
                    k.stopTime("blink", we);
                    v.removeClass("cmd-inverted cmd-blink")
                }
            };
            Q = function() {
                t(false);
                t(true)
            }
        }

        function we() {
            v.toggleClass("cmd-inverted")
        }

        function Ee() {
            r = "(reverse-i-search)`" + l + "': ";
            b()
        }

        function xe() {
            r = U;
            a = false;
            q = null;
            l = ""
        }

        function $e(e) {
            var t = c.data();
            var n, r;
            var i = t.length;
            if (e && q > 0) {
                i -= q
            }
            if (l.length > 0) {
                for (var u = l.length; u > 0; u--) {
                    r = $.terminal.escape_regex(l.slice(0, u));
                    if (x.caseSensitiveSearch) {
                        n = new RegExp(r)
                    } else {
                        n = new RegExp(r, "i")
                    }
                    for (var a = i; a--;) {
                        if (n.test(t[a])) {
                            q = t.length - a;
                            k.position(t[a].indexOf(r));
                            k.set(t[a], true);
                            y();
                            if (l.length !== u) {
                                l = l.slice(0, u);
                                Ee()
                            }
                            return
                        }
                    }
                }
            }
            l = ""
        }

        function ke() {
            var e = k.find(".cmd-prompt");
            var t = e.html();
            e.html("<span>&nbsp;</span>");
            var n = e.find("span").get(0).getBoundingClientRect().width;
            e.html(t);
            return n
        }

        function Ae(e) {
            var t = k.width();
            return Math.floor(t / e)
        }

        function Be(e) {
            function t(e) {
                return $.terminal.split_equal(e, m)
            }

            function n(n) {
                var r = [];
                n.forEach(function(e, t) {
                    if ($.terminal.strip(e).match(X)) {
                        r[t] = false;
                        if (t > 0) {
                            r[t - 1] += V
                        }
                    } else {
                        r[t] = n[t]
                    }
                });
                return r.filter(function(e) {
                    return e !== false
                })
            }
            var r = h.find(".cmd-line");
            var i;
            if (r.length) {
                i = r.nextUntil(".cmd-line").text()
            } else {
                i = h.text()
            }
            i = i.replace("​", "");
            i = $.terminal.escape_brackets(i);
            var u = Pe();
            var a = new RegExp("^" + u + $.terminal.escape_regex(i));
            var o;
            if (e.match(/\n/)) {
                var s = e.split("\n");
                var l = m - d - 1;
                for (var f = 0; f < s.length - 1; ++f) {
                    s[f] += V
                }
                if (strlen(s[0]) > l) {
                    o = t(i + s[0]);
                    o[0] = o[0].replace(a, "");
                    o = n(o)
                } else {
                    o = [s[0]]
                }
                for (f = 1; f < s.length; ++f) {
                    if (strlen(s[f]) > m) {
                        var c = t(s[f]);
                        if (f < s.length - 1) {
                            c = n(c)
                        }
                        o = o.concat(c)
                    } else {
                        o.push(s[f])
                    }
                }
            } else {
                o = t(u + i + e, m);
                o[0] = o[0].replace(a, "")
            }
            if (o.length > 1) {
                var p = $.terminal.length(o[o.length - 1]);
                if (p === m) {
                    o.push("")
                }
            }
            return o
        }
        var Te = new WorkerCache({
            validation: function(e) {
                var t = false;
                if ((!this._previous_value || this._previous_value === e) && (!this._cols || this._cols === m)) {
                    t = true
                }
                this._previous_value = e;
                this._cols = m;
                return t
            },
            action: Be
        });

        function Se(e) {
            return Te.get(e)
        }

        function Re(t, e) {
            try {
                t = $.terminal.escape_formatting(t);
                var n = $.extend({}, x, {
                    unixFormattingEscapeBrackets: true,
                    position: S,
                    command: true
                });
                var r = $.terminal.apply_formatters(t, n);
                var i = $.terminal.normalize(r[0]);
                var u = $.terminal.length(i);
                if (!e) {
                    R = r[1];
                    if (R > u) {
                        R = u
                    }
                }
                return i
            } catch (e) {
                alert_exception("[Formatting]", e.stack);
                return t
            }
        }

        function j(e, t) {
            var n = $.terminal.encode(je(e), {
                tabs: x.tabs,
                before: t
            });
            return $.terminal.format(n, {
                charWidth: x.charWidth,
                allowedAttributes: x.allowedAttributes || []
            })
        }

        function je(e) {
            return $.terminal.partition(e).join("")
        }

        function O(e, t) {
            return $.terminal.length(e, t)
        }

        function Oe(e) {
            return strlen(text(e)) > m - d - 1 || e.match(/\n/)
        }

        function Le(e, t, n) {
            return $.terminal.substring(e, t, n)
        }

        function ze(e) {
            if ($.terminal.is_formatting(e)) {
                return e.replace(format_parts_re, "$4").match(/^emoji /)
            }
            return false
        }
        var y = function() {
            var g = v.prev();
            var _ = v.next();
            var y = v.parent();

            function b(e, t) {
                var n = e.match(G);
                if (n) {
                    e = e.replace(G, " ")
                }
                y.toggleClass("cmd-end-line", !!n);
                var r = false;
                var i = $.extend({
                    prompt: "",
                    last: false
                }, t);
                var u = i.position;
                var a = O(e);
                var o = i.prompt;
                var s;
                if (u === a) {
                    g.html(j(e));
                    s = "&nbsp;";
                    F();
                    _.html("")
                } else if (u === 0) {
                    g.html("");
                    s = Le(e, 0, 1);
                    v.html(j(s));
                    _.html(j(Le(e, 1), o + s))
                } else {
                    var l = $.terminal.substring(e, 0, u);
                    g.html(j(l, o));
                    s = Le(e, u, u + 1);
                    var f = (o + l).replace(/^.*\t/, "");
                    v.html(j(s, f));
                    if (u === a - 1) {
                        r = true;
                        _.html("")
                    } else {
                        if (s.match(/\t/)) {
                            f = ""
                        } else {
                            f += s
                        }
                        _.html(j(Le(e, u + 1), f))
                    }
                }
                if (ch_unit_bug) {
                    if (typeof wcwidth !== "undefined") {
                        var c = strlen(text(s));
                        if (c === 1 && ze(s)) {
                            c = 2
                        }
                        v.width(D * c)
                    } else {
                        v.width(D)
                    }
                }
                v.toggleClass("cmd-end-line", r);
                Ce();
                var p = $.terminal.length(v.text());
                if (p > 1) {
                    var m = v.find("[data-text]")[0];
                    m.style.setProperty("--length", p)
                }
                Q()
            }

            function C(e, t) {
                var n = e.match(G);
                var r = '<div role="presentation" aria-hidden="true"';
                if (n) {
                    e = e.replace(G, " ");
                    r += ' class="cmd-end-line"'
                }
                r += ">" + j(e, t || "") + "</div>";
                return r
            }

            function F() {
                v.html('<span data-text class="end"><span>&nbsp;<span></span>')
            }

            function w(e) {
                var n = y;
                $.each(e, function(e, t) {
                    n = $(C(t)).insertAfter(n)
                })
            }

            function E(e) {
                $.each(e, function(e, t) {
                    y.before(C(t, e === 0 ? W : ""))
                })
            }
            return function() {
                var e;
                switch (typeof x.mask) {
                    case "boolean":
                        e = x.mask ? T.replace(/./g, "*") : T;
                        break;
                    case "string":
                        e = T.replace(/./g, x.mask);
                        break
                }
                var t = Re(e);
                var n;
                if (O(t) === text(e).length) {
                    n = S
                } else {
                    n = R
                }
                var r;
                A.css({
                    display: "none"
                });
                A.find("div:not(.cmd-cursor-line)").remove();
                g.html("");
                if (Oe(t)) {
                    var i = t.match(/\t/g);
                    var u = t;
                    if (i) {
                        t = t.replace(/\t/g, "\0\0\0\0")
                    }
                    var a = Se(t);
                    if (i) {
                        a = $.map(a, function(e) {
                            return e.replace(/\x00\x00\x00\x00/g, "\t")
                        })
                    }
                    var o = O(a[0]);
                    if (o === 0 && a.length === 1) {} else if (n < o) {
                        b(a[0], {
                            length: a.length,
                            position: n,
                            prompt: W
                        });
                        w(a.slice(1))
                    } else if (n === o) {
                        y.before(C(a[0], W));
                        b(a[1] || "", {
                            length: a.length,
                            position: 0,
                            last: a.length <= 2
                        });
                        if (a.length > 2) {
                            w(a.slice(2))
                        }
                    } else {
                        var s = a.slice(-1)[0];
                        var l = O(u);
                        var f = l - n;
                        var c = O(s);
                        var p = 0;
                        if (f === -1) {
                            f = 0
                        }
                        if (f <= c) {
                            E(a.slice(0, -1));
                            if (c === f) {
                                p = 0
                            } else {
                                p = c - f
                            }
                            b(s, {
                                length: a.length,
                                position: p,
                                last: true
                            })
                        } else {
                            var m;
                            var D;
                            p = n;
                            for (r = 0; r < a.length; ++r) {
                                var d = $.terminal.length(a[r]);
                                if (p > d) {
                                    p -= d
                                } else {
                                    break
                                }
                            }
                            D = a[r];
                            m = r;
                            if (p === O(D)) {
                                p = 0;
                                D = a[++m];
                                if (D === undefined) {
                                    var h = $.terminal.defaults.strings.redrawError;
                                    throw new Error(h)
                                }
                            }
                            b(D, {
                                length: a.length,
                                position: p
                            });
                            E(a.slice(0, m));
                            w(a.slice(m + 1))
                        }
                    }
                    k.find(".cmd-cursor-line ~ div:last-of-type").append("<span></span>")
                } else if (t === "") {
                    g.html("");
                    F();
                    _.html("")
                } else {
                    b(t, {
                        length: 1,
                        position: n
                    })
                }
                var v = y.prevUntil(".cmd-prompt").length;
                if (is_css_variables_supported) {
                    k[0].style.setProperty("--cursor-line", v)
                } else {
                    B.$node.css("top", v * 14 + "px")
                }
                A.css({
                    display: ""
                })
            }
        }();
        var Ie = function() {
            function u(e, t) {
                var n = $.extend({}, x, {
                    position: t,
                    command: true
                });
                return $.terminal.apply_formatters(e, n)[1]
            }

            function s(e, t, n) {
                var r = u(n, t);
                if (r === e) {
                    var i = u(n, t + 1);
                    if (i > e) {
                        return 0
                    }
                    return 1
                } else if (r < e) {
                    return 1
                } else {
                    return -1
                }
            }
            return function(e, t) {
                if (t === 0) {
                    return 0
                }
                e = bare_text(e);
                var n = e.length;
                var r = $.terminal.escape_brackets(T);
                var i = binary_search(0, n, t, s, [r]);
                var u = $.terminal.split_characters(e);
                if (n > u.length) {
                    var a = 0;
                    for (var o = 0; o < u.length; ++o) {
                        a += u[o].length;
                        if (a >= i) {
                            return a
                        }
                    }
                }
                return i
            }
        }();

        function Pe() {
            if (s) {
                return new Array(s + 1).join("￿")
            }
            return ""
        }
        var Ne;
        var b = function() {
            function i(e) {
                if (!e) {
                    o = 0;
                    d = o + s;
                    return e
                }
                var t = Pe();
                var n = t + e;
                var r = $.terminal.split_equal(n, m);
                r = r.map(function(e) {
                    return e.replace(/^\uFFFF+/, "")
                });
                r = r.map(function(e) {
                    if (!$.terminal.have_formatting(e)) {
                        return "[[;;]" + $.terminal.escape_brackets(e) + "]"
                    }
                    return $.terminal.format_split(e).map(function(e) {
                        if ($.terminal.is_formatting(e)) {
                            return e
                        }
                        return "[[;;]" + $.terminal.escape_brackets(e) + "]"
                    }).join("")
                });
                var i = {
                    charWidth: x.charWidth
                };
                W = r[r.length - 1];
                var u = $.terminal.encode(r[r.length - 1], {
                    tabs: x.tabs
                });
                var a = $.terminal.format(u, i);
                o = strlen(text(u));
                d = o + s;
                return r.slice(0, -1).map(function(e) {
                    e = $.terminal.encode(e, {
                        tabs: x.tabs
                    });
                    return '<span class="cmd-line">' + $.terminal.format(e, i) + "</span>"
                }).concat([a]).join("\n")
            }

            function e(e, t) {
                if (e) {
                    if (t && t.formatters || !t) {
                        e = $.terminal.apply_formatters(e, {
                            prompt: true
                        });
                        e = $.terminal.normalize(e)
                    }
                    e = crlf(e)
                }
                var n = i(e);
                H = e;
                n = n || $.terminal.format("[[;;]​]");
                if (h.html() !== n) {
                    h.html(n);
                    var r = h.find("> span span");
                    B.$node.attr("data-cmd-prompt", h.text());
                    if (is_ch_unit_supported) {
                        h.hide();
                        r.each(function() {
                            var e = $(this);
                            var t = strlen(e.text());
                            if (t === 0) {
                                e.css("width", 1)
                            } else {
                                e.css("width", t + "ch")
                            }
                        });
                        h.show()
                    }
                }
            }
            return function(t) {
                if (Ne && Ne.set) {
                    Ne.set = $.noop;
                    Ne = null
                }
                var n = Ne = {
                    set: e
                };
                with_prompt(r, function(e) {
                    n.set(e, t)
                }, k)
            }
        }();

        function Me() {
            if (is_function(x.onCommandChange)) {
                x.onCommandChange.call(k, T)
            }
        }

        function He(e, t, n) {
            var r = e.substring(0, t);
            if (t === 0 || !e.length) {
                return 0
            }
            var i = /\n?([^\n]*)$/;
            var u = r.match(i);
            var a = u[1].length;
            if (!ce(r) && (n || pe(r, d))) {
                a += d
            }
            if (a === 0) {
                return a
            }
            a %= m;
            if (a === 0) {
                return m
            }
            return a
        }
        $.extend(k, {
            option: function(e, t) {
                if (typeof t === "undefined") {
                    return x[e]
                } else {
                    x[e] = t
                }
                return k
            },
            name: function(e) {
                if (e !== undefined) {
                    J = e;
                    var t = c && c.enabled() || !c;
                    c = new History(J, x.historySize, x.history === "memory");
                    if (!t) {
                        c.disable()
                    }
                    return k
                } else {
                    return J
                }
            },
            purge: function() {
                c.clear();
                return k
            },
            history: function() {
                return c
            },
            delete: function(e, t) {
                var n, r;
                if (e === 0) {
                    return ""
                } else if (e < 0) {
                    if (S > 0) {
                        n = T.slice(0, S).slice(e);
                        r = bare_text(T);
                        r = r.slice(0, S + e) + r.slice(S, r.length);
                        if (!t) {
                            k.position(S + e)
                        }
                    }
                } else if (T !== "") {
                    r = text(T);
                    if (S < r.length) {
                        n = r.slice(S).slice(0, e);
                        r = r.slice(0, S) + r.slice(S + e, r.length)
                    }
                }
                if (n) {
                    T = r
                }
                y();
                _();
                Me();
                return n
            },
            set: function(e, t, n) {
                if (e !== undefined) {
                    T = e;
                    if (!t) {
                        k.position(bare_text(T).length)
                    }
                    y();
                    _();
                    if (!n) {
                        Me()
                    }
                }
                return k
            },
            keymap: function(e, t) {
                function n(e, t) {
                    var n = p[e];
                    if (is_function(n)) {
                        n = n.bind(k)
                    }
                    return function(e) {
                        return t.call(k, e, n)
                    }
                }
                if (e === null) {
                    i = p;
                    return k
                } else if (typeof e === "undefined") {
                    return i
                } else if (typeof e === "string") {
                    if (typeof t === "undefined") {
                        if (i[e]) {
                            return i[e]
                        } else if (p[e]) {
                            return p[e]
                        }
                    } else {
                        i[e] = n(e, t)
                    }
                } else {
                    i = $.extend({}, i ? i : p, $.omap(e || {}, n));
                    return k
                }
            },
            insert: function(e, t) {
                var n = bare_text(T);
                var r = bare_text(e).length;
                if (S === n.length) {
                    e = n + e
                } else if (S === 0) {
                    e = e + n
                } else {
                    e = n.slice(0, S) + e + n.slice(S)
                }
                T = e;
                if (!t) {
                    k.position(r, true, true)
                }
                _();
                y();
                Me();
                return k
            },
            get: function() {
                return T
            },
            commands: function(e) {
                if (e) {
                    x.commands = e;
                    return k
                } else {
                    return e
                }
            },
            destroy: function() {
                L.unbind("keypress.cmd", at);
                L.unbind("keydown.cmd", it);
                L.unbind("input.cmd", ft);
                k.stopTime("blink", we);
                k.find(".cmd-wrapper").remove();
                k.find(".cmd-prompt, .cmd-clipboard, .cmd-editable").remove();
                k.removeClass("cmd").removeData("cmd").off(".cmd");
                return k
            },
            display_column: function(e) {
                var t = Re(T);
                t = $.terminal.strip(t);
                return He(t, R, e)
            },
            column: function(e) {
                return He(T, S, e)
            },
            line: function() {
                var e = T.substring(0, S);
                if (S === 0 || !T.length) {
                    return 0
                }
                return e.split(/\n/).length - 1
            },
            __set_prompt_margin: function(e) {
                s = e;
                d = o + s
            },
            prompt: function(e, t) {
                if (e === true) {
                    return H
                } else if (e === undefined) {
                    return r
                } else {
                    var n = e !== r;
                    if (typeof e === "string" || typeof e === "function") {
                        r = e
                    } else {
                        throw new Error("prompt must be a function or string")
                    }
                    if (n) {
                        b(t);
                        y()
                    }
                    return k
                }
            },
            kill_text: function() {
                return u
            },
            position: function(e, t, n) {
                if (typeof e === "number") {
                    var r = S;
                    var i = bare_text(T).length;
                    if (t) {
                        S += e
                    } else if (e < 0) {
                        S = 0
                    } else if (e > i) {
                        S = i
                    } else {
                        S = e
                    }
                    if (r !== S) {
                        y();
                        if (!n && is_function(x.onPositionChange)) {
                            x.onPositionChange(S, R)
                        }
                        _(true)
                    }
                    return k
                } else {
                    return S
                }
            },
            refresh: function() {
                b();
                y();
                _(true);
                return k
            },
            display_position: function(e, t) {
                if (e === undefined) {
                    return R
                } else {
                    var n = Re($.terminal.escape_formatting(T), true);
                    var r = O(n);
                    var i = bare_text(T).length;
                    var u;
                    if (t) {
                        u = R + e
                    } else if (e > r) {
                        u = r
                    } else {
                        u = e
                    }
                    if (r === i) {
                        R = u;
                        return k.position(u)
                    }
                    if (r === u) {
                        R = u;
                        return k.position(i)
                    }
                    var a = Ie(T, u);
                    if (a !== -1) {
                        R = u;
                        k.position(a)
                    }
                    return k
                }
            },
            visible: function() {
                var e = k.visible;
                return function() {
                    e.apply(k, []);
                    y();
                    b();
                    return k
                }
            }(),
            show: function() {
                var e = k.show;
                return function() {
                    e.apply(k, []);
                    y();
                    b();
                    return k
                }
            }(),
            resize: function(e) {
                D = ke();
                var t;
                if (typeof e === "number") {
                    t = e
                } else {
                    t = Ae(D)
                }
                if (m !== t || arguments[0] === true) {
                    m = t;
                    y();
                    b()
                }
                return k
            },
            clear_cache: "Map" in root ? function() {
                Te.clear()
            } : function() {
                return k
            },
            invoke_key: function(e) {
                if (!f) {
                    warn('invoke_key("' + e + '") called on disabled terminal')
                }
                var t = e.toUpperCase().split("+");
                var n = t.pop();
                var r = t.indexOf("CTRL") !== -1;
                var i = t.indexOf("SHIFT") !== -1;
                var u = t.indexOf("ALT") !== -1;
                var a = t.indexOf("META") !== -1;
                var o = $.Event("keydown", {
                    ctrlKey: r,
                    shiftKey: i,
                    altKey: u,
                    metaKey: a,
                    which: ie[n],
                    key: n
                });
                var s = $(document.documentElement || window);
                s.trigger(o);
                o = $.Event("keypress");
                o.key = n;
                o.which = o.keyCode = 0;
                s.trigger(o);
                return k
            },
            clip: function() {
                return B
            },
            enable: function(e) {
                if (!f) {
                    f = true;
                    k.addClass("enabled");
                    try {
                        if (!B.$node.is(":focus")) {
                            B.$node.focus()
                        }
                        B.$node.caret(S)
                    } catch (e) {}
                    t(true);
                    if (!e && is_function(r)) {
                        b()
                    }
                    Ce();
                    _()
                }
                be();
                return k
            },
            isenabled: function() {
                return f
            },
            disable: function(e) {
                f = false;
                k.removeClass("enabled");
                t(false);
                if (!e) {
                    be()
                }
                return k
            },
            mask: function(e) {
                if (typeof e === "undefined") {
                    return x.mask
                } else {
                    x.mask = e;
                    y();
                    return k
                }
            }
        });
        k.name(x.name || x.prompt || "");
        if (x.prompt !== false) {
            r = x.prompt;
            b()
        }
        if (x.enabled === true) {
            k.enable()
        }
        D = ke();
        m = Ae(D);
        if (!x.history) {
            c.disable()
        }
        var We = true;
        var qe = false;
        var Ue = false;
        var Ke = false;
        var C = false;
        var Je = false;
        var F = true;
        var w = false;
        var Qe = false;
        var Ye = false;
        var Ve = false;
        var E;
        var Ge = "";
        var Xe;

        function Ze(e) {
            return e.key.toUpperCase() === "BACKSPACE" || e.which === 8
        }

        function et(e) {
            return e.key && e.key.length === 1 && !e.ctrlKey
        }

        function tt(e) {
            var t = ["HOLD+SHIFT+BACKSPACE", "HOLD+BACKSPACE"];
            return t.indexOf(e) !== -1 && x.mobileDelete || x.repeatTimeoutKeys.indexOf(e) !== -1
        }

        function nt(e) {
            return e.which === 35 || e.which === 36 || e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40 || e.which === 13 || e.which === 27
        }
        var rt = false;

        function it(e) {
            debug('keydown "' + e.key + '" ' + e.fake + " " + e.which);
            var t;
            Qe = (e.key || "").toLowerCase() === "process" || e.which === 0;
            Ue = C && Ke && !Ze(e);
            try {
                if (!e.fake) {
                    Ke = et(e);
                    Je = String(e.key).toLowerCase() === "unidentified";
                    w = Ze(e)
                }
            } catch (e) {}
            if (e.key === "Unidentified") {
                F = true;
                return
            }
            if (!e.fake && ["meta", "os"].indexOf(e.key.toLowerCase()) === -1) {
                F = false
            }
            C = true;
            B.$node.off("input", se);
            var n = ne(e);
            if (is_function(x.keydown)) {
                e.key = te(e);
                t = x.keydown.call(k, e);
                if (t !== undefined) {
                    if (!t) {
                        E = true
                    }
                    return t
                }
            }
            if (n !== Xe) {
                ut()
            }
            if (f || n === "CTRL+C" && is_terminal_selected(k)) {
                if (Ye) {
                    Xe = n;
                    n = "HOLD+" + n;
                    if (Ve) {
                        return
                    }
                    if (x.holdRepeatTimeout > 0 && tt(n)) {
                        Ve = true;
                        k.oneTime(x.holdRepeatTimeout, "delay", function() {
                            Ve = false
                        })
                    }
                } else {
                    k.oneTime(x.holdTimeout, "hold", function() {
                        Ye = true
                    });
                    Xe = n
                }
                if (!e.fake && is_android) {
                    if (rt) {
                        ut();
                        rt = false;
                        return false
                    }
                    if (I(n)) {
                        rt = true
                    } else if (I(Xe)) {
                        rt = false
                    }
                }
                Q();
                E = ["CTRL+V", "META+V"].indexOf(n) !== -1;
                if (n.toLowerCase() === "enter") {
                    We = true
                }
                if (a && nt(e)) {
                    xe();
                    b();
                    if (e.which === 27) {
                        k.set("")
                    }
                    y();
                    if (e.which === 13) {
                        it.call(this, e)
                    }
                } else if (is_function(i[n])) {
                    t = i[n](e);
                    if (t === true) {
                        return
                    }
                    if (t !== undefined) {
                        return t
                    }
                } else if (e.altKey) {
                    return
                } else {
                    qe = false;
                    return
                }
            }
        }

        function ut() {
            k.stopTime("hold");
            k.stopTime("delay");
            Ve = Ye = false
        }
        var L = $(document.documentElement || window);
        k.keymap(x.keymap || {});

        function at(e) {
            debug('keypress "' + e.key + '" ' + e.fake);
            ut();
            var t;
            if (!e.fake) {
                C = false
            }
            if ((e.ctrlKey || e.metaKey) && !e.altKey) {
                return
            }
            if (qe) {
                return
            }
            if (is_function(x.keypress)) {
                t = x.keypress.call(k, e);
                if (t !== undefined) {
                    if (!t) {
                        E = true
                    }
                    return t
                }
            }
            if (f) {
                if (e.fake) {
                    return
                }
                var n;
                if (is_key_native) {
                    n = e.key;
                    var r = n.toUpperCase();
                    if (ee[r]) {
                        n = ee[r]
                    }
                }
                if (!n || Je) {
                    n = String.fromCharCode(e.which)
                }
                if ($.inArray(e.which, [13, 0, 8]) > -1) {
                    if (e.keyCode === 123) {
                        return
                    }
                    return false
                } else if (n && (!e.ctrlKey || e.ctrlKey && e.ctrlKey) && (!(e.altKey && e.which === 100) || e.altKey) && !Ue) {
                    if (a) {
                        l += n;
                        $e();
                        Ee()
                    } else if (n.length === 1) {
                        k.insert(n)
                    }
                }
            }
        }

        function ot(e, t, n) {
            var r = $.Event(e);
            r.which = n;
            r.key = t;
            r.fake = true;
            L.trigger(r)
        }
        var st = false;

        function lt() {
            Ge = T;
            E = false;
            F = true
        }

        function ft() {
            debug("input " + F + " || " + Qe + " ((" + C + " || " + Ue + ") && !" + E + " && (" + Ke + " || " + Je + ") && !" + w + ")");
            var e = B.val();
            if (!is_mobile) {
                e = e.replace(/^ /, "")
            }
            if (F || Qe || (C || Ue) && !E && (Ke || Je) && !w) {
                if (e && e === T) {
                    if (is_android) {
                        if (F) {
                            ot("keydown", "Enter", 13)
                        }
                    }
                    lt();
                    return
                }
                var t = S;
                if (F) {
                    var n = Ge;
                    w = n.slice(0, n.length - 1).length === e.length
                }
                if (st) {
                    st = false;
                    B.val(T);
                    return
                }
                if (a) {
                    l = e;
                    $e();
                    Ee()
                } else {
                    var r = e.slice(S);
                    if (r.length === 1 || w) {
                        var i = get_next_character(r);
                        if (I(i)) {
                            st = true
                        }
                        if (F) {
                            var u;
                            if (w) {
                                u = 8
                            } else {
                                u = r.toUpperCase().charCodeAt(0)
                            }
                            ot("keydown", w ? "Backspace" : r, u)
                        }
                        if (C && !w) {
                            ot("keypress", i, r.charCodeAt(0))
                        }
                    }
                    if (w) {
                        Ge = T;
                        return
                    }
                    if (E) {
                        E = false;
                        return
                    }
                    k.set(e)
                }
                if (w) {
                    k.position(t - 1)
                } else {
                    k.position(t + Math.abs(e.length - Ge.length))
                }
            }
            lt()
        }
        L.bind("keypress.cmd", at);
        L.bind("keydown.cmd", it);
        L.bind("keyup.cmd", ut);
        L.bind("input.cmd", ft);
        (function() {
            if (is_mobile) {
                $(k[0]).add(B.$node).on("touchstart.cmd", function() {
                    if (!k.isenabled()) {
                        B.focus()
                    } else {
                        B.blur()
                    }
                });
                k.disable();
                return
            }
            var u = false;
            var a = 0;
            k.on("mousedown.cmd", function() {
                u = true
            }).on("mouseup.cmd", function(n) {
                function e() {
                    var e = $(n.target);
                    var t = e.is(".cmd-prompt");
                    if (!t && i && get_selected_html() === "") {
                        if (f) {
                            if (e.is(".cmd")) {
                                k.position(text(T).length)
                            } else {
                                k.display_position(Z(n))
                            }
                        }
                    }
                    a = 0
                }
                var t;
                if (n.originalEvent === undefined) {
                    t = n.button
                } else {
                    t = n.originalEvent.button
                }
                if (t === 0 && get_selected_html() === "") {
                    var r = "click_" + N;
                    if (++a === 1) {
                        var i = u;
                        if (f) {
                            if (x.clickTimeout === 0) {
                                e()
                            } else {
                                k.oneTime(x.clickTimeout, r, e)
                            }
                        } else {
                            a = 0
                        }
                    } else {
                        k.stopTime(r);
                        a = 0
                    }
                }
                u = false
            })
        })();
        k.data("cmd", k);
        if (!("KeyboardEvent" in window && "key" in window.KeyboardEvent.prototype)) {
            setTimeout(function() {
                throw new Error("key event property not supported try https://github." + "com/inexorabletash/polyfill/blob/master/keyboard.js")
            }, 0)
        }
        return k
    };
    var strlen = function() {
        if (typeof wcwidth === "undefined") {
            return function(e) {
                e = e.replace(/\u200B/g, "");
                return $.terminal.length(e)
            }
        } else {
            return wcwidth
        }
    }();

    function count_selfclosing_formatting(e) {
        var n = 0;
        if ($.terminal.have_formatting(e)) {
            var r = new RegExp(format_parts_re.source, "i");
            $.terminal.format_split(e).forEach(function(e) {
                if ($.terminal.is_formatting(e)) {
                    var t = e.match(r);
                    if (t && t[1].match(/@/) && t[6] === "") {
                        n++
                    }
                }
            })
        }
        return n
    }
    var entities = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&Agrave;": "À",
        "&Aacute;": "Á",
        "&Acirc;": "Â",
        "&Atilde;": "Ã",
        "&Auml;": "Ä",
        "&Aring;": "Å",
        "&AElig;": "Æ",
        "&Ccedil;": "Ç",
        "&Egrave;": "È",
        "&Eacute;": "É",
        "&Ecirc;": "Ê",
        "&Euml;": "Ë",
        "&Igrave;": "Ì",
        "&Iacute;": "Í",
        "&Icirc;": "Î",
        "&Iuml;": "Ï",
        "&ETH;": "Ð",
        "&Ntilde;": "Ñ",
        "&Ograve;": "Ò",
        "&Oacute;": "Ó",
        "&Ocirc;": "Ô",
        "&Otilde;": "Õ",
        "&Ouml;": "Ö",
        "&Oslash;": "Ø",
        "&Ugrave;": "Ù",
        "&Uacute;": "Ú",
        "&Ucirc;": "Û",
        "&Uuml;": "Ü",
        "&Yacute;": "Ý",
        "&THORN;": "Þ",
        "&szlig;": "ß",
        "&agrave;": "à",
        "&aacute;": "á",
        "&acirc;": "â",
        "&atilde;": "ã",
        "&auml;": "ä",
        "&aring;": "å",
        "&aelig;": "æ",
        "&ccedil;": "ç",
        "&egrave;": "è",
        "&eacute;": "é",
        "&ecirc;": "ê",
        "&euml;": "ë",
        "&igrave;": "ì",
        "&iacute;": "í",
        "&icirc;": "î",
        "&iuml;": "ï",
        "&eth;": "ð",
        "&ntilde;": "ñ",
        "&ograve;": "ò",
        "&oacute;": "ó",
        "&ocirc;": "ô",
        "&otilde;": "õ",
        "&ouml;": "ö",
        "&oslash;": "ø",
        "&ugrave;": "ù",
        "&uacute;": "ú",
        "&ucirc;": "û",
        "&uuml;": "ü",
        "&yacute;": "ý",
        "&thorn;": "þ",
        "&yuml;": "ÿ",
        "&nbsp;": " ",
        "&iexcl;": "¡",
        "&cent;": "¢",
        "&pound;": "£",
        "&curren;": "¤",
        "&yen;": "¥",
        "&brvbar;": "¦",
        "&sect;": "§",
        "&uml;": "¨",
        "&copy;": "©",
        "&ordf;": "ª",
        "&laquo;": "«",
        "&not;": "¬",
        "&shy;": "­",
        "&reg;": "®",
        "&macr;": "¯",
        "&deg;": "°",
        "&plusmn;": "±",
        "&sup2;": "²",
        "&sup3;": "³",
        "&acute;": "´",
        "&micro;": "µ",
        "&para;": "¶",
        "&cedil;": "¸",
        "&sup1;": "¹",
        "&ordm;": "º",
        "&raquo;": "»",
        "&frac14;": "¼",
        "&frac12;": "½",
        "&frac34;": "¾",
        "&iquest;": "¿",
        "&times;": "×",
        "&divide;": "÷",
        "&forall;": "∀",
        "&part;": "∂",
        "&exist;": "∃",
        "&empty;": "∅",
        "&nabla;": "∇",
        "&isin;": "∈",
        "&notin;": "∉",
        "&ni;": "∋",
        "&prod;": "∏",
        "&sum;": "∑",
        "&minus;": "−",
        "&lowast;": "∗",
        "&radic;": "√",
        "&prop;": "∝",
        "&infin;": "∞",
        "&ang;": "∠",
        "&and;": "∧",
        "&or;": "∨",
        "&cap;": "∩",
        "&cup;": "∪",
        "&int;": "∫",
        "&there4;": "∴",
        "&sim;": "∼",
        "&cong;": "≅",
        "&asymp;": "≈",
        "&ne;": "≠",
        "&equiv;": "≡",
        "&le;": "≤",
        "&ge;": "≥",
        "&sub;": "⊂",
        "&sup;": "⊃",
        "&nsub;": "⊄",
        "&sube;": "⊆",
        "&supe;": "⊇",
        "&oplus;": "⊕",
        "&otimes;": "⊗",
        "&perp;": "⊥",
        "&sdot;": "⋅",
        "&Alpha;": "Α",
        "&Beta;": "Β",
        "&Gamma;": "Γ",
        "&Delta;": "Δ",
        "&Epsilon;": "Ε",
        "&Zeta;": "Ζ",
        "&Eta;": "Η",
        "&Theta;": "Θ",
        "&Iota;": "Ι",
        "&Kappa;": "Κ",
        "&Lambda;": "Λ",
        "&Mu;": "Μ",
        "&Nu;": "Ν",
        "&Xi;": "Ξ",
        "&Omicron;": "Ο",
        "&Pi;": "Π",
        "&Rho;": "Ρ",
        "&Sigma;": "Σ",
        "&Tau;": "Τ",
        "&Upsilon;": "Υ",
        "&Phi;": "Φ",
        "&Chi;": "Χ",
        "&Psi;": "Ψ",
        "&Omega;": "Ω",
        "&alpha;": "α",
        "&beta;": "β",
        "&gamma;": "γ",
        "&delta;": "δ",
        "&epsilon;": "ε",
        "&zeta;": "ζ",
        "&eta;": "η",
        "&theta;": "θ",
        "&iota;": "ι",
        "&kappa;": "κ",
        "&lambda;": "λ",
        "&mu;": "μ",
        "&nu;": "ν",
        "&xi;": "ξ",
        "&omicron;": "ο",
        "&pi;": "π",
        "&rho;": "ρ",
        "&sigmaf;": "ς",
        "&sigma;": "σ",
        "&tau;": "τ",
        "&upsilon;": "υ",
        "&phi;": "φ",
        "&chi;": "χ",
        "&psi;": "ψ",
        "&omega;": "ω",
        "&thetasym;": "ϑ",
        "&upsih;": "ϒ",
        "&piv;": "ϖ",
        "&OElig;": "Œ",
        "&oelig;": "œ",
        "&Scaron;": "Š",
        "&scaron;": "š",
        "&Yuml;": "Ÿ",
        "&fnof;": "ƒ",
        "&circ;": "ˆ",
        "&tilde;": "˜",
        "&ensp;": " ",
        "&emsp;": " ",
        "&thinsp;": " ",
        "&zwnj;": "‌",
        "&zwj;": "‍",
        "&lrm;": "‎",
        "&rlm;": "‏",
        "&ndash;": "–",
        "&mdash;": "—",
        "&lsquo;": "‘",
        "&rsquo;": "’",
        "&sbquo;": "‚",
        "&ldquo;": "“",
        "&rdquo;": "”",
        "&bdquo;": "„",
        "&dagger;": "†",
        "&Dagger;": "‡",
        "&bull;": "•",
        "&hellip;": "…",
        "&permil;": "‰",
        "&prime;": "′",
        "&Prime;": "″",
        "&lsaquo;": "‹",
        "&rsaquo;": "›",
        "&oline;": "‾",
        "&euro;": "€",
        "&trade;": "™",
        "&larr;": "←",
        "&uarr;": "↑",
        "&rarr;": "→",
        "&darr;": "↓",
        "&harr;": "↔",
        "&crarr;": "↵",
        "&lceil;": "⌈",
        "&rceil;": "⌉",
        "&lfloor;": "⌊",
        "&rfloor;": "⌋",
        "&loz;": "◊",
        "&spades;": "♠",
        "&clubs;": "♣",
        "&hearts;": "♥",
        "&diams;": "♦"
    };

    function render_entities(e) {
        return e.replace(/&#(x?)([0-9]+);/g, function(e, t, n) {
            n = parseInt(n, t ? 16 : 10);
            return String.fromCharCode(n)
        }).replace(/(&[^;]+;)/g, function(e, t) {
            return entities[t] || t
        })
    }

    function bare_text(e) {
        if (!e.match(/&/)) {
            return e
        }
        return render_entities(safe(e))
    }

    function text(e) {
        return bare_text($.terminal.strip(e))
    }

    function safe(e) {
        if (!e.match(/[<>&]/)) {
            return e
        }
        return e.replace(/&(?![^;]+;)/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
    }

    function crlf(e) {
        return e.replace(/\r/g, "")
    }

    function char_len(e) {
        return entity_re.test(e) ? 1 : e.length
    }

    function make_re_fn(r) {
        return function e(t) {
            var n = t.match(r);
            if (starts_with(n)) {
                return n[1]
            }
        }
    }

    function starts_with(e) {
        return e && e.index === 0
    }

    function is_simple_text(e) {
        var t = [entity_re, emoji_re, combine_chr_re, astral_symbols_re];
        for (var n = 0; n < t.length; ++n) {
            if (t[n].test(e)) {
                return false
            }
        }
        return true
    }

    function make_next_char_fun(t) {
        var u = [];
        [entity_re, emoji_re, combine_chr_re].forEach(function(e) {
            if (e.test(t)) {
                u.push(make_re_fn(e))
            }
        });
        if (astral_symbols_re.test(t)) {
            u.push(function e(t) {
                var n = t.match(astral_symbols_re);
                if (starts_with(n)) {
                    var r = t.match(combine_chr_re);
                    if (r && r.index === 1) {
                        return t.slice(0, 3)
                    }
                    return n[1]
                }
            })
        }
        return function e(t) {
            for (var n = 0; n < u.length; ++n) {
                var r = u[n];
                var i = r(t);
                if (i) {
                    return i
                }
            }
            return t[0]
        }
    }

    function get_next_character(e) {
        var t = e.match(entity_re);
        if (starts_with(t)) {
            return t[1]
        }
        var n = e.match(combine_chr_re);
        if (starts_with(n)) {
            return n[1]
        }
        var r = e.match(emoji_re);
        if (starts_with(r)) {
            return r[1]
        } else if (e.charCodeAt(0) < 255) {
            return e[0]
        } else {
            var i = e.match(astral_symbols_re);
            if (starts_with(i)) {
                n = e.match(combine_chr_re);
                if (n && n.index === 1) {
                    return e.slice(0, 3)
                }
                return e.slice(0, 2)
            } else {
                return e[0]
            }
        }
    }

    function normalize_position(e, r) {
        if (r === 0) {
            return r
        }
        e = $.terminal.strip(e);
        var t = $.terminal.split_characters(e).reduce(function(e, t) {
            if (typeof e === "number") {
                return e
            }
            var n = e.length + char_len(t);
            if (n >= r) {
                return e.position + 1
            }
            return {
                position: e.position + 1,
                length: n
            }
        }, {
            position: 0,
            length: 0
        });
        if (typeof t === "number") {
            return t
        } else {
            return t.position
        }
    }

    function style_to_string(t) {
        return Object.keys(t).map(function(e) {
            return e + ":" + t[e]
        }).join(";")
    }

    function escape_html_attr(e) {
        return e.replace(/"/g, "&quot;")
    }

    function char_width_object(e, t) {
        var n = {};
        if (e === 0) {
            n["width"] = "1px"
        } else if (is_ch_unit_supported) {
            n["width"] = e + "ch"
        } else if (!is_css_variables_supported) {
            if (t.charWidth) {
                n["width"] = t.charWidth * e + "px"
            }
        } else {
            n["--length"] = e
        }
        return n
    }

    function char_width_prop(e, t) {
        return style_to_string(char_width_object(e, t))
    }

    function extra_css(e, t) {
        if (typeof wcwidth !== "undefined") {
            var n = bare_text(e);
            var r = strlen(n);
            if (r > 1 && r !== $.terminal.length(n)) {
                return char_width_object(r, t)
            }
        }
    }

    function wide_characters(e, n) {
        if (typeof wcwidth !== "undefined") {
            var t = bare_text(e);
            var r = $.terminal.split_characters(t);
            if (r.length === 1) {
                return e
            }
            var i = r.map(function(e) {
                return {
                    len: strlen(e),
                    chr: e
                }
            }).reduce(function(e, t) {
                var n = e[e.length - 1];
                if (n) {
                    if (n.len !== t.len) {
                        return e.concat([{
                            sum: t.len,
                            len: t.len,
                            specs: [t]
                        }])
                    } else {
                        e.pop();
                        return e.concat([{
                            sum: n.sum + t.len,
                            len: n.len,
                            specs: n.specs.concat(t)
                        }])
                    }
                }
                return [{
                    sum: t.len,
                    specs: [t],
                    len: t.len
                }]
            }, []);
            return i.map(function(e) {
                if (e.len === 1) {
                    return u(e)
                }
                var t = char_width_prop(e.sum, n);
                if (e.sum === r.length || !t.length) {
                    return "<span>" + u(e) + "</span>"
                } else if (e.specs.length > 1) {
                    return a(t, e.specs.map(function(e) {
                        return a(char_width_prop(e.len), e.chr)
                    }).join(""))
                } else {
                    return a(t, u(e))
                }
            }).join("")
        }

        function u(e) {
            return e.specs.map(function(e) {
                return e.chr
            }).join("")
        }

        function a(e, t) {
            return '<span style="' + e + '">' + t + "</span>"
        }
        return e
    }

    function binary_search(e, t, n, r, i) {
        var u = t - e;
        var a = e + Math.floor(u / 2);
        var o = [n, a].concat(i);
        var s = r.apply(null, o);
        if (s === 0) {
            return a
        } else if (s > 0 && u > 1) {
            return binary_search(a, t, n, r, i)
        } else if (s < 0 && u > 1) {
            return binary_search(e, a, n, r, i)
        } else {
            return -1
        }
    }

    function is_terminal_selected(e) {
        if (is_function(window.getSelection)) {
            var t = window.getSelection();
            if (t.toString()) {
                var n = t.getRangeAt(0).startContainer.parentNode;
                var r = $(n).closest(".terminal");
                return r.length && (e && r.find(".cmd").is(e) || !e)
            }
        }
    }

    function get_selected_html() {
        var e = "";
        if (is_function(window.getSelection)) {
            var t = window.getSelection();
            if (t.rangeCount) {
                var n = document.createElement("div");
                for (var r = 0, i = t.rangeCount; r < i; ++r) {
                    n.appendChild(t.getRangeAt(r).cloneContents())
                }
                e = n.innerHTML
            }
        }
        return e
    }

    function with_selection(e) {
        var t = "";
        var n = [];
        if (is_function(window.getSelection)) {
            var r = window.getSelection();
            if (r.rangeCount) {
                var i = document.createElement("div");
                for (var u = 0, a = r.rangeCount; u < a; ++u) {
                    var o = r.getRangeAt(u).cloneRange();
                    n.push(o);
                    i.appendChild(o.cloneContents())
                }
                t = i.innerHTML
            }
        }
        e(t);
        if (n.length) {
            r.removeAllRanges();
            n.forEach(function(e) {
                r.addRange(e)
            })
        }
        return t !== ""
    }

    function process_selected_line() {
        var e = $(this);
        var t = e.text();
        if (e.hasClass("cmd-end-line")) {
            t += "\n"
        }
        return t
    }

    function process_div(e) {
        return $(e).find("> div, > span").map(process_selected_line).get().join("\n").replace(/\n$/, "")
    }

    function process_selected_html(e) {
        var t;
        var n = "";
        var r = $("<div>" + e + "</div>");
        if (e.match(/<\/div>/)) {
            t = r.find("div[data-index]").map(function() {
                return process_div(this)
            }).get().join("\n");
            if (!t && e.match(/style="width: 100%;?"/)) {
                t = process_div(r)
            }
            n = t
        }
        var i = r.find(".cmd-prompt");
        if (i.length) {
            if (n.length) {
                n += "\n"
            }
            n += i.text()
        }
        var u = r.find('[role="presentation"]');
        if (u.length) {
            n += u.map(process_selected_line).get().join("")
        }
        if (!n.length && e) {
            n = r.text()
        }
        return n.replace(/\xA0/g, " ")
    }
    var support_copy = function() {
        if (typeof document === "undefined") {
            return false
        }
        if (!is_function(document.queryCommandSupported)) {
            return false
        }
        return document.queryCommandSupported("copy")
    }();
    var text_to_clipboard;
    if (support_copy) {
        text_to_clipboard = function e(t, n) {
            var r = t.val();
            var i = t.is(":focus");
            var u = t.caret();
            if (window.navigator && window.navigator.clipboard) {
                navigator.clipboard.writeText(n)
            } else if (i) {
                t.val(n).focus();
                t[0].select();
                document.execCommand("copy");
                t.val(r);
                t.caret(u)
            } else {
                var a = $("<textarea/>").css({
                    position: "fixed",
                    top: 0,
                    left: 0
                }).appendTo("body");
                a.val(n).focus();
                a[0].select();
                document.execCommand("copy");
                a.blur();
                a.remove()
            }
            return true
        }
    } else {
        text_to_clipboard = $.noop
    }
    var get_textarea_selection = function() {
        function e() {
            return ""
        }
        if (typeof document === "undefined") {
            return e
        }
        var t = document.createElement("textarea");
        var n = "selectionStart" in t;
        t = null;
        if (n) {
            return function(e) {
                var t = e.selectionEnd - e.selectionStart;
                return e.value.substr(e.selectionStart, t)
            }
        } else if (document.selection) {
            return function() {
                var e = document.selection.createRange();
                return e.text()
            }
        } else {
            return e
        }
    }();

    function clear_textarea_selection(e) {
        e.selectionStart = e.selectionEnd = 0
    }

    function common_string(e, t, n) {
        if (!t.length) {
            return ""
        }
        var r = string_case(e);
        var i = [];
        for (var u = e.length; u < t[0].length; ++u) {
            var a = false;
            var o = t[0].charAt(u),
                s = o.toLowerCase();
            for (var l = 1; l < t.length; ++l) {
                a = true;
                var f = t[l].charAt(u),
                    c = f.toLowerCase();
                if (o !== f) {
                    if (n || r === "mixed") {
                        a = false;
                        break
                    } else if (s === c) {
                        if (r === "lower") {
                            o = o.toLowerCase()
                        } else if (r === "upper") {
                            o = o.toUpperCase()
                        } else {
                            a = false;
                            break
                        }
                    } else {
                        a = false;
                        break
                    }
                }
            }
            if (a) {
                i.push(o)
            } else {
                break
            }
        }
        return e + i.join("")
    }

    function trigger_terminal_change(t) {
        terminals.forEach(function(e) {
            e.settings().onTerminalChange.call(e, t)
        })
    }
    var select = function() {
        if (root.getSelection) {
            var e = root.getSelection();
            if (e.setBaseAndExtent) {
                return function(e, t) {
                    var n = root.getSelection();
                    n.setBaseAndExtent(e, 0, t, 1)
                }
            } else {
                return function(e, t) {
                    var n = root.getSelection();
                    var r = document.createRange();
                    r.setStart(e, 0);
                    r.setEnd(t, t.childNodes.length);
                    n.removeAllRanges();
                    n.addRange(r)
                }
            }
        } else {
            return $.noop
        }
    }();

    function process_command(e, t) {
        var n = e.trim();
        var r = n.match(command_re) || [];
        if (r.length) {
            var i = r.shift();
            var u = $.map(r, function(e) {
                if (e.match(/^["']/)) {
                    e = e.replace(/\n/g, "\\u0000\\u0000\\u0000\\u0000");
                    e = t(e);
                    return e.replace(/\x00\x00\x00\x00/g, "\n")
                }
                return t(e)
            });
            var a = $.map(r, function(e) {
                var t = e.match(/^(['"`]).*\1$/);
                return t && t[1] || ""
            });
            var o = n.slice(i.length).trim();
            return {
                command: e,
                name: i,
                args: u,
                args_quotes: a,
                rest: o
            }
        } else {
            return {
                command: e,
                name: "",
                args: [],
                args_quotes: [],
                rest: ""
            }
        }
    }
    $.terminal = {
        version: "2.37.2",
        date: "Fri, 15 Sep 2023 15:33:19 +0000",
        color_names: ["transparent", "currentcolor", "black", "silver", "gray", "white", "maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen", "rebeccapurple"],
        Cycle: Cycle,
        History: History,
        Stack: Stack,
        valid_color: function e(t) {
            if (t.match(color_re)) {
                return true
            } else {
                return $.inArray(t.toLowerCase(), $.terminal.color_names) !== -1
            }
        },
        unclosed_strings: function e(t) {
            return !!t.match(unclosed_strings_re)
        },
        escape_regex: function e(t) {
            if (typeof t === "string") {
                var n = /([-\\^$[\]()+{}?*.|])/g;
                return t.replace(n, "\\$1")
            }
        },
        have_formatting: function e(t) {
            return typeof t === "string" && !!t.match(format_exist_re)
        },
        is_formatting: function e(t) {
            return typeof t === "string" && !!t.match(format_full_re)
        },
        is_extended_command: function e(t) {
            return typeof t === "string" && t.match(format_exec_re) && !$.terminal.is_formatting(t)
        },
        each_extended_command: function(e, n) {
            var t = e.split(format_exec_split_re);
            return $.map(t, function(e) {
                if ($.terminal.is_extended_command(e)) {
                    var t = e.replace(/^\[\[|\]\]$/g, "");
                    return n(t) || ""
                }
                return e
            }).join("")
        },
        format_split: function e(t) {
            return t.split(format_split_re).filter(Boolean)
        },
        tracking_replace: function e(t, n, r, i) {
            if (!(n instanceof RegExp)) {
                throw new Error("tracking_replace: Second argument need to be RegExp")
            }

            function u(e, t, n) {
                return e.slice(t, n)
            }

            function a(e) {
                return $.terminal.strip(e).length
            }
            var o = "";
            var s;
            var l = 0;
            var f;
            var c = i;
            var p;
            n.lastIndex = 0;
            while (s = n.exec(t)) {
                if (n.global) {
                    var m = a(u(t, 0, n.lastIndex));
                    p = m - a(s[0])
                } else {
                    p = s.index;
                    m = p + a(s[0])
                }
                if (l < p) {
                    o += u(t, l, p)
                }
                l = m;
                if (typeof r === "function") {
                    f = r.apply(null, s)
                } else {
                    f = r.replace(/\$(\$|\d)/g, function(e, t) {
                        if (t === "$") {
                            return "$"
                        }
                        return s[t]
                    })
                }
                o += f;
                if (p < i) {
                    var D = a(f);
                    D += count_selfclosing_formatting(f);
                    if (m < i) {
                        c = Math.max(0, c + D - a(s[0]))
                    } else {
                        c += D - (i - p)
                    }
                }
                if (!n.global) {
                    break
                }
            }
            if (l < a(t)) {
                o += u(t, l)
            }
            if (t === o) {
                return [t, i]
            }
            return [o, c]
        },
        iterate_formatting: function z(t, e) {
            function n(e) {
                return e === " " || e === "\t" || e === "\n"
            }

            function r(e) {
                if (!d) {
                    return n(t[e - 1])
                }
                return t.slice(e - 6, e) === "&nbsp;" || n(t[e - 1])
            }

            function i(e) {
                if (!d) {
                    return null
                }
                return t.slice(e).match(entity_re)
            }

            function u(e) {
                return t[e] === "[" && t[e + 1] === "["
            }

            function a(e) {
                return t[e - 1] !== "\\" && t[e] === "\\" && t[e + 1] === "]"
            }

            function o(e) {
                return t[e] === "]" || t[e] === "["
            }

            function s(e) {
                return B && !T && (t[e] !== "]" && !A || !D) || v && !h
            }
            var l = make_next_char_fun(t);

            function f() {
                var e = l(k);
                if (e.length > 1 && $.terminal.length(k) > 1) {
                    return e.length - 1
                }
                return 0
            }

            function c() {
                return r(x) && (B || T) && (y === -1 && C !== x || y !== -1)
            }
            var p = false;

            function m() {
                if (x === t.length - 1 && !p) {
                    p = true
                } else {
                    p = h && !!k.match(/^.]$/)
                }
                return p
            }
            var D = $.terminal.have_formatting(t);
            var d = entity_re.test(t);
            var h = "";
            var v = false;
            var g = 0;
            var _;
            var y = -1;
            var b = -1;
            var C;
            var F = 0;
            var w = 0;
            var E = /(&[^;]+);$/;
            for (var x = 0; x < t.length; x++) {
                var k = t.slice(x);
                var A = false;
                _ = k.match(format_start_re);
                if (_) {
                    h = _[1];
                    v = false
                } else if (h) {
                    if (t[x] === "]") {
                        A = v;
                        if (v) {
                            h = "";
                            v = false
                        } else {
                            v = true
                        }
                    }
                } else {
                    v = true
                }
                var B = h && v || !h;
                var T = u(x);
                if (c()) {
                    y = x;
                    b = g
                }
                var S = o(x);
                w = 0;
                if (B) {
                    if (t[x] === "&") {
                        _ = i(x);
                        if (_) {
                            x += _[1].length - 2;
                            continue
                        }++g;
                        ++F
                    } else if (a(x)) {
                        ++g;
                        ++F;
                        w = 1;
                        x += 1
                    } else if (!S || !D || v && !h) {
                        ++g;
                        ++F
                    }
                }
                if (s(x)) {
                    if (strlen(t[x]) === 2) {
                        F++
                    }
                    var R = l(k);
                    var j = R.length;
                    if (R === ";") {
                        _ = t.slice(0, x + 1).match(E);
                        if (_) {
                            w = _[1].length;
                            j = w + 1
                        }
                    }
                    var O = {
                        last: m(),
                        count: g,
                        index: x - w,
                        formatting: h,
                        length: F,
                        text: v,
                        size: j,
                        space: y,
                        space_count: b
                    };
                    var L = e(O);
                    if (L === false) {
                        break
                    } else if (L) {
                        if (L.count !== undefined) {
                            g = L.count
                        }
                        if (L.length !== undefined) {
                            F = L.length
                        }
                        if (L.space !== undefined) {
                            C = y;
                            y = L.space
                        }
                        if (L.index !== undefined) {
                            x = L.index;
                            continue
                        }
                    }
                } else if (x === t.length - 1 && !p) {
                    e({
                        last: true,
                        count: g + 1,
                        index: x,
                        formatting: h,
                        length: 0,
                        text: v,
                        space: y
                    })
                }
                if (v) {
                    x += f()
                }
            }
        },
        partition: function e(r, t) {
            var n = $.extend({
                wrap: true
            }, t);
            if (!$.terminal.have_formatting(r)) {
                var i = $.terminal.split_characters(r);
                return i.map(a)
            }
            var u = [];

            function a(e) {
                if (e.match(/\\$/)) {
                    e += "\\"
                }
                return "[[;;]" + e + "]"
            }

            function o(e) {
                if ($.terminal.is_formatting(e)) {
                    if (e.match(/\\]$/)) {
                        e = e.replace(/\\]/g, "\\\\]")
                    }
                } else if (n.wrap) {
                    e = a(e)
                }
                return e
            }
            $.terminal.iterate_formatting(r, function e(t) {
                if (t.text) {
                    var n = [];
                    if (t.formatting) {
                        n.push(t.formatting)
                    }
                    n.push(r.substring(t.index, t.index + t.size));
                    if (t.formatting) {
                        n.push("]")
                    }
                    u.push(o(n.join("")))
                }
            });
            return u
        },
        substring: function e(t, n, r) {
            var i = $.terminal.split_characters(t);
            if (!i.slice(n, r).length) {
                return ""
            }
            if (!$.terminal.have_formatting(t)) {
                return i.slice(n, r).join("")
            }
            var u = 0;
            var a;
            var o = "";
            var s = "";
            var l;
            var f = 1;
            $.terminal.iterate_formatting(t, function e(t) {
                if (n && t.count === n + 1) {
                    u = t.index;
                    if (t.formatting) {
                        o = t.formatting
                    }
                }
                if (r && t.count === r) {
                    s = t.formatting;
                    l = t.index;
                    f = t.size
                }
                if (t.count === r + 1) {
                    a = t.index;
                    if (t.formatting) {
                        a = l + f
                    }
                }
            });
            if (n && !u) {
                return ""
            }
            if (a === undefined) {
                a = t.length
            }
            t = o + t.slice(u, a);
            if (s) {
                t = t.replace(/(\[\[^\]]+)?\]$/, "");
                t += "]"
            }
            return t
        },
        normalize: function e(t) {
            t = t.replace(format_re, function e(t, n, r) {
                if (n.match(self_closing_re) && r === "") {
                    return "[[" + n + "] ]"
                }
                if (r === "") {
                    return ""
                }

                function i(e) {
                    return e.replace(/\\\]/g, "&#93;").replace(/\n/g, "\\n").replace(/&nbsp;/g, " ")
                }
                n = i(n);
                var u = n.match(/;/g).length;
                if (u >= 4) {
                    var a = n.split(/;/);
                    var o = a.slice(0, 4).join(";");
                    var s = a.slice(4).join(";");
                    return "[[" + o + ";" + (s || r) + "]" + r + "]"
                } else if (u === 2) {
                    u = ";;"
                } else if (u === 3) {
                    u = ";"
                }
                n += u + i(r);
                return "[[" + n + "]" + r + "]"
            });
            return $.terminal.amp(t)
        },
        split_equal: function e(t, p, n) {
            if (typeof n === "boolean") {
                n = {
                    keepWords: n
                }
            }
            var m = $.extend({
                trim: false,
                keepWords: false
            }, n);
            var D = "";
            var d = [];
            var r = $.terminal.normalize(t).split(/\n/g);
            var i = $.terminal.have_formatting(t);
            for (var u = 0, a = r.length; u < a; ++u) {
                if (r[u] === "") {
                    d.push("");
                    continue
                }
                var h = r[u];
                var v = make_next_char_fun(h);
                var g = 0;
                var _;
                var y = h.length;
                var b = /\[\[[^\]]+\](?:[^\][]|\\\])+\]$/.test(h);
                var C = /^(&nbsp;|\s)/.test(h);
                if (!i && y < p) {
                    d.push(h);
                    continue
                }
                $.terminal.iterate_formatting(h, function e(t) {
                    var n, r;
                    if (t.length >= p || t.last || t.length === p - 1 && strlen(h[t.index + 1]) === 2) {
                        var i = false;
                        if (m.keepWords && t.space !== -1) {
                            var u = text(h).substring(t.space_count);
                            u = u.slice(0, p).replace(/\s+$/, "");
                            var a = strlen(u);
                            if (space_re.test(u) || a < p) {
                                i = true
                            }
                        }
                        var o = t.index + t.size;
                        if (b) {
                            o += 1
                        }
                        var s;
                        if (m.keepWords && t.space !== -1 && o !== y && i) {
                            _ = h.slice(g, t.space);
                            s = t.space - 1
                        } else {
                            r = h.slice(t.index);
                            n = v(r);
                            _ = h.slice(g, t.index) + n;
                            if (t.last && b && n !== "]") {
                                _ += "]"
                            }
                            s = t.index + n.length - 1
                        }
                        if (m.trim || m.keepWords) {
                            _ = _.replace(/(&nbsp;|\s)+$/g, "");
                            if (!C) {
                                _ = _.replace(/^(&nbsp;|\s)+/g, "")
                            }
                        }
                        g = (s || t.index) + 1;
                        if (D) {
                            var l = /^[^\]]*\]/.test(_);
                            _ = D + _;
                            if (l) {
                                D = ""
                            }
                        }
                        var f = _.match(format_re);
                        if (f) {
                            var c = f[f.length - 1];
                            if (c[c.length - 1] !== "]") {
                                D = c.match(format_begin_re)[1];
                                _ += "]"
                            } else if (format_end_re.test(_)) {
                                _ = _.replace(format_end_re, "");
                                D = c.match(format_begin_re)[1]
                            }
                        }
                        d.push(_);
                        return {
                            index: s,
                            length: 0,
                            space: -1
                        }
                    }
                })
            }
            return d
        },
        amp: function e(t) {
            return t.replace(/&(?!#[0-9]+;|#x[0-9a-f]+;|[a-z]+;)/gi, "&amp;")
        },
        encode: function e(t, n) {
            var s = $.extend({
                tabs: 4,
                before: ""
            }, n);
            return $.terminal.amp(t).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").split("\n").map(function(e) {
                var o = e.split(/((?:\[\[[^\]]+\])?\t(?:\])?)/);
                o = o.filter(Boolean);
                return o.map(function(e, a) {
                    if (e.match(/\t/)) {
                        return e.replace(/\t([^\t]*)$/, function(e, t) {
                            if (a !== 0 && o[a - 1].match(/\t\]?$/)) {
                                var n = new Array(s.tabs + 1).join("&nbsp;");
                                return n + t
                            } else {
                                var r = o.slice(a - 1, a).join("");
                                if (s.before && a <= 1) {
                                    r = s.before + r
                                }
                                var i = $.terminal.length(r);
                                var u = s.tabs - i % s.tabs;
                                if (u === 0) {
                                    u = 4
                                }
                                return new Array(u + 1).join("&nbsp;") + t
                            }
                        })
                    }
                    return e
                }).join("")
            }).join("\n")
        },
        nested_formatting: function e(t) {
            if (!$.terminal.have_formatting(t)) {
                return t
            }
            var u = [];
            var n = /((?:\[\[(?:[^\][]|\\\])+\])?(?:[^\][]|\\\])*\]?)/;
            var a = /\[\[([^\][]+)\][\s\S]*/;
            var o = /^\[\[([^;]*);([^;]*);([^\]]*)\]/;
            var f = 3;
            var c = 5;

            function r(e, t, n) {
                return n.indexOf(e) === t
            }

            function p(e, t) {
                e = i(e);
                if (!t) {
                    return e
                }
                return $.extend(t, e)
            }

            function i(e) {
                var i = {};
                e.split(/\s*;\s*/).forEach(function(e) {
                    var t = e.split(":").map(function(e) {
                        return e.trim()
                    });
                    var n = t[0];
                    var r = t[1];
                    i[n] = r
                });
                return i
            }

            function m(e) {
                var t = e.slice();
                if (e[c]) {
                    t[c] = l(e[c])
                }
                if (e[f]) {
                    t[f] = D(e[f])
                }
                t[0] = s(e[0]);
                return t.join(";")
            }

            function s(e) {
                var t = e.filter(function(e) {
                    return e[0] === "-"
                }).map(function(e) {
                    return e[1]
                });
                return e.filter(function(e) {
                    return t.indexOf(e) === -1 && t.indexOf(e[1]) === -1
                }).join("")
            }

            function l(e) {
                return JSON.stringify(e, function(e, t) {
                    if (e === "style") {
                        return d(t)
                    }
                    return t
                })
            }

            function D(e) {
                return e.filter(r).join(" ")
            }

            function d(t) {
                return Object.keys(t).map(function(e) {
                    return e + ":" + t[e]
                }).join(";")
            }

            function h(e) {
                function t(t) {
                    if (!i[c]) {
                        i[c] = {}
                    }
                    try {
                        var e = JSON.parse(t);
                        if (e.style) {
                            var n = e.style;
                            var r = i[c].style;
                            e.style = p(n, r);
                            i[c] = $.extend(e, i[c], {
                                style: p(n, r)
                            })
                        } else {
                            i[c] = $.extend(e, i[c])
                        }
                    } catch (e) {
                        warn("Invalid JSON " + t)
                    }
                }
                var i = [
                    [], "", ""
                ];
                if (!e.length) {
                    return i
                }
                for (var n = e.length; n--;) {
                    var r = $.terminal.parse_formatting(e[n]);
                    if (r.length > 5) {
                        var u = r.slice(5).join(";");
                        r = r.slice(0, 5).concat(u)
                    }
                    var a = r[0].split(/(-?[@!gbiuso])/g).filter(Boolean);
                    a.forEach(function(e) {
                        if (i[0].indexOf(e) === -1) {
                            i[0].push(e)
                        }
                    });
                    for (var o = 1; o < r.length; ++o) {
                        var s = r[o].trim();
                        if (s) {
                            if (o === f) {
                                if (!i[f]) {
                                    i[f] = []
                                }
                                var l = s.split(/\s+/);
                                i[f] = i[f].concat(l)
                            } else if (o === c) {
                                t(s)
                            } else if (!i[o]) {
                                i[o] = s
                            }
                        }
                    }
                }
                return m(i)
            }
            return t.split(n).filter(Boolean).map(function(e) {
                var t;
                if (e.match(/^\[\[/) && !$.terminal.is_extended_command(e)) {
                    var n = e.replace(a, "$1");
                    var r = $.terminal.is_formatting(e);
                    e = e.replace(o, "");
                    u.push(n);
                    if ($.terminal.nested_formatting.__inherit__) {
                        t = h(u)
                    } else {
                        t = n
                    }
                    if (!r) {
                        e += "]"
                    } else {
                        u.pop()
                    }
                    e = "[[" + t + "]" + e
                } else {
                    var i = false;
                    if (e.match(/\]/)) {
                        i = true
                    }
                    if (u.length) {
                        if ($.terminal.nested_formatting.__inherit__) {
                            t = h(u)
                        } else {
                            t = u[u.length - 1]
                        }
                        e = "[[" + t + "]" + e
                    }
                    if (i) {
                        u.pop()
                    } else if (u.length) {
                        e += "]"
                    }
                }
                return e
            }).join("")
        },
        escape_formatting: function e(t) {
            return $.terminal.escape_brackets(t)
        },
        apply_formatters: function e(t, u) {
            if (t === "") {
                if (u && typeof u.position === "number") {
                    return ["", u.position]
                } else {
                    return ""
                }
            }

            function i(e, t, n, r) {
                if (!e.__no_warn__ && $.terminal.length(n) !== $.terminal.length(r)) {
                    warn("Your formatter[" + t + "] change length of the string, " + "you should use [regex, replacement] formatter or function " + " that return [replacement, position] instead")
                }
            }

            function p(t) {
                if (!u || !t) {
                    return true
                }
                var e = ["echo", "command", "prompt"];
                var n = e.some(function(e) {
                    return t[e] === true
                });
                if (!n) {
                    return true
                }
                for (var r = e.length; r--;) {
                    var i = e[r];
                    if (t[i] === true && u[i] === true) {
                        return true
                    }
                }
                return false
            }
            u = u || {};
            var n = u.formatters || $.terminal.defaults.formatters;
            var m = 0;

            function D(e, t) {
                var n = $.extend({}, u, {
                    position: t[1]
                });
                var r = e(t[0], n);
                if (typeof r === "string") {
                    i(e, m - 1, r, t[0]);
                    if (typeof r === "string") {
                        return [r, n.position]
                    }
                    return t
                } else if (is_array(r) && r.length === 2) {
                    return r
                } else {
                    return t
                }
            }
            var r;
            if (typeof u.position === "number") {
                r = [t, u.position]
            } else {
                r = [t, 0]
            }
            try {
                var a = n.reduce(function(o, s) {
                    m++;
                    if (typeof s === "function" && s.__meta__) {
                        return D(s, o)
                    } else {
                        var l = 0;
                        var f = false;
                        var e = $.terminal.format_split(o[0]);
                        var t = e.map(function(e) {
                            var t;
                            var n = text(e).length;
                            if (o[1] < l + n && !f) {
                                t = o[1] - l;
                                f = true
                            } else if (f) {
                                t = -1
                            } else {
                                t = o[1]
                            }
                            var r = l;
                            var i;
                            l += n;
                            if ($.terminal.is_formatting(e)) {
                                if (f) {
                                    return [e, t]
                                }
                                return [e, -1]
                            } else {
                                if (is_array(s)) {
                                    var u = s[2] || {};
                                    i = [e, t < 0 ? 0 : t];
                                    if (i[0].match(s[0]) && p(s[2])) {
                                        if (u.loop) {
                                            while (i[0].match(s[0])) {
                                                i = $.terminal.tracking_replace(i[0], s[0], s[1], i[1])
                                            }
                                        } else {
                                            i = $.terminal.tracking_replace(i[0], s[0], s[1], i[1])
                                        }
                                    }
                                    if (t < 0) {
                                        return [i[0], -1]
                                    }
                                } else if (typeof s === "function") {
                                    i = D(s, [e, t])
                                }
                                if (typeof i !== "undefined") {
                                    if (i[1] !== -1) {
                                        i[1] += r
                                    }
                                    var a = text(i[0]).length;
                                    if (a !== n) {}
                                    return i
                                }
                                return [e, -1]
                            }
                        });
                        var n = t.filter(function(e) {
                            return e[1] !== -1
                        })[0];
                        var r = t.map(function(e) {
                            return e[0]
                        }).join("");
                        var i;
                        if (typeof n === "undefined") {
                            i = o[1]
                        } else {
                            i = n[1]
                        }
                        var u = text(r).length;
                        u += count_selfclosing_formatting(r);
                        if (i > u) {
                            i = u
                        }
                        if (r === o[0]) {
                            return o
                        }
                        var a = $.terminal.strip(o[0]);
                        var c = $.terminal.strip(r);
                        if (a === c) {
                            return [r, o[1]]
                        }
                        return [r, i]
                    }
                }, r);
                if (typeof u.position === "number") {
                    var o = $.terminal.strip(a[0]).length;
                    if ($.terminal.length(a[0]) < o) {
                        var s = a[1];
                        s = normalize_position(a[0], s);
                        var l = $.terminal.length(a[0]);
                        if (s > l) {
                            s = l
                        }
                        a[1] = s
                    }
                    return a
                } else {
                    return a[0]
                }
            } catch (e) {
                var f = "Error in formatter [" + (m - 1) + "]";
                n.splice(m - 1);
                throw new $.terminal.Exception("formatting", f, e.stack)
            }
        },
        escape_brackets: function e(t) {
            return t.replace(/\[/g, "&#91;").replace(/\]/g, "&#93;").replace(/\\/g, "&#92;")
        },
        unescape_brackets: function e(t) {
            return t.replace(/&#91;/g, "[").replace(/&#93;/g, "]").replace(/&#92;/g, "\\")
        },
        length: function e(t, n) {
            if (!t) {
                return 0
            }
            return $.terminal.split_characters(n ? t : text(t)).length
        },
        split_characters: function e(t) {
            if (is_simple_text(t)) {
                return t.split("")
            }
            var n = [];
            var r = make_next_char_fun(t);
            while (t.length) {
                var i = r(t);
                t = t.slice(i.length);
                n.push(i)
            }
            return n
        },
        columns: function e(t, n, r) {
            t = t.map(function(e) {
                if (typeof e !== "string") {
                    return String(e)
                }
                return e
            });
            var i = t.map(function(e) {
                return $.terminal.strip(e)
            });
            var u = i.map(function(e) {
                return strlen(e)
            });
            if (typeof r === "undefined") {
                r = 4
            }
            var a = Math.max.apply(null, u) + r;
            var o = Math.floor(n / a) - 1;
            if (o < 1) {
                return t.join("\n")
            }
            var s = [];
            for (var l = 0, f = t.length; l < f; l += o) {
                var c = t.slice(l, l + o);
                var p = c.pop();
                s.push(c.reduce(function(e, t) {
                    var n = $.terminal.strip(t);
                    var r = new Array(a - n.length + 1).join(" ");
                    e.push(t + r);
                    return e
                }, []).join("") + p)
            }
            return s.join("\n")
        },
        strip: function e(t) {
            if (!$.terminal.have_formatting(t)) {
                return t
            }
            return $.terminal.format_split(t).map(function(e) {
                if ($.terminal.is_formatting(e)) {
                    e = e.replace(format_parts_re, "$6");
                    return e.replace(/\\([[\]])/g, function(e, t) {
                        return t
                    })
                }
                return e
            }).join("")
        },
        active: function e() {
            return terminals.front()
        },
        last_id: function e() {
            var t = terminals.length();
            return t - 1
        },
        parse_argument: function e(t, n) {
            function r(e) {
                return e.split(string_re).map(function(e) {
                    if (e.match(/^['"`]/)) {
                        if (e === '""' || e === "''" || e === "``") {
                            return ""
                        }
                        var t = e[0];
                        var n = new RegExp("(\\\\\\\\(?:\\\\\\\\)*)" + t, "g");
                        e = e.replace(n, "$1").replace(/^[`'"]|[`'"]$/g, "");
                        if (t === "'") {
                            e = e.replace(/"/g, '\\"')
                        }
                    }
                    e = '"' + e + '"';
                    return JSON.parse(e)
                }).join("")
            }
            if (n === false) {
                if (t[0] === "'" && t[t.length - 1] === "'") {
                    return t.replace(/^'|'$/g, "")
                } else if (t[0] === "`" && t[t.length - 1] === "`") {
                    return t.replace(/^`|`$/g, "")
                } else if (t[0] === '"' && t[t.length - 1] === '"') {
                    return t.replace(/^"|"$/g, "").replace(/\\([" ])/g, "$1")
                } else if (t.match(/\/.*\/[gimy]*$/)) {
                    return t
                } else if (t.match(/['"`]]/)) {
                    return r(t)
                } else {
                    return t.replace(/\\ /g, " ")
                }
            }
            if (t === "true") {
                return true
            } else if (t === "false") {
                return false
            }
            var i = t.match(re_re);
            if (i) {
                return new RegExp(i[1], i[2])
            } else if (t.match(/['"`]/)) {
                return r(t)
            } else if (t.match(/^-?[0-9]+$/)) {
                return parseInt(t, 10)
            } else if (t.match(float_re)) {
                return parseFloat(t)
            } else {
                return t.replace(/\\(['"() ])/g, "$1")
            }
        },
        parse_arguments: function e(t) {
            return $.map(t.match(command_re) || [], $.terminal.parse_argument)
        },
        split_arguments: function e(t) {
            return $.map(t.match(command_re) || [], function(e) {
                return $.terminal.parse_argument(e, false)
            })
        },
        parse_command: function e(t) {
            return process_command(t, $.terminal.parse_argument)
        },
        split_command: function e(t) {
            return process_command(t, function(e) {
                return $.terminal.parse_argument(e, false)
            })
        },
        parse_options: function e(t, n) {
            var a = $.extend({}, {
                boolean: []
            }, n);
            if (typeof t === "string") {
                return e($.terminal.split_arguments(t), n)
            }
            var o = {
                _: []
            };

            function s(e) {
                this.value = e
            }
            var r = t.reduce(function(e, t) {
                var n = typeof t === "string" ? t : "";
                if (n.match(/^--?[^-]/) && e instanceof s) {
                    o[e.value] = true
                }
                if (n.match(/^--[^-]/)) {
                    var r = n.replace(/^--/, "");
                    if (a.boolean.indexOf(r) === -1) {
                        return new s(r)
                    } else {
                        o[r] = true
                    }
                } else if (n.match(/^-[^-]/)) {
                    var i = n.replace(/^-/, "").split("");
                    if (a.boolean.indexOf(i.slice(-1)[0]) === -1) {
                        var u = i.pop()
                    }
                    i.forEach(function(e) {
                        o[e] = true
                    });
                    if (u) {
                        return new s(u)
                    }
                } else if (e instanceof s) {
                    o[e.value] = t
                } else if (t) {
                    o._.push(t)
                }
                return null
            }, null);
            if (r instanceof s) {
                o[r.value] = true
            }
            return o
        },
        parse_formatting: function(e) {
            var t = $.terminal.unescape_brackets(e).split(";");
            var n = 4;
            if (t.length >= 5) {
                var r = $.terminal.escape_brackets(t[n]);
                t[n] = r
            }
            return t
        },
        extended_command: function extended_command(term, string, options) {
            var settings = $.extend({
                invokeMethods: false
            }, options);
            var deferred = new $.Deferred;
            try {
                change_hash = false;
                var m = string.match(extended_command_re);
                if (m) {
                    if (!settings.invokeMethods) {
                        warn("To invoke terminal or cmd methods you need to enable " + "invokeMethods option");
                        deferred.reject()
                    } else {
                        string = m[1];
                        var obj = m[2] === "terminal" ? term : term.cmd();
                        var fn = m[3];
                        try {
                            var args = eval("[" + m[4] + "]");
                            if (!obj[fn]) {
                                term.error("Unknow function " + fn)
                            } else {
                                var ret = obj[fn].apply(term, args);
                                if (ret && ret.then) {
                                    return ret
                                }
                            }
                            deferred.resolve()
                        } catch (e) {
                            term.error("Invalid invocation in " + $.terminal.escape_brackets(string));
                            deferred.reject()
                        }
                    }
                } else {
                    return term.exec(string, true).done(function() {
                        change_hash = true
                    })
                }
            } catch (e) {
                deferred.reject()
            }
            return deferred.promise()
        },
        iterator: function(t) {
            function n(e) {
                if ($.terminal.is_formatting(e)) {
                    if (e.match(/\]\\\]/)) {
                        e = e.replace(/\]\\\]/g, "]\\\\]")
                    }
                }
                return e
            }
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                var r = $.terminal.length(t);
                var i = 0;
                var e = {};
                e[Symbol.iterator] = function() {
                    return {
                        next: function() {
                            if (i < r) {
                                var e = $.terminal.substring(t, i, i + 1);
                                i++;
                                return {
                                    value: n(e)
                                }
                            } else {
                                return {
                                    done: true
                                }
                            }
                        }
                    }
                };
                return e
            }
        },
        formatter: new function() {
            try {
                this[Symbol.split] = function(e) {
                    return $.terminal.format_split(e)
                };
                this[Symbol.match] = function(e) {
                    return e.match(format_re)
                };
                this[Symbol.replace] = function(e, t) {
                    return e.replace(format_parts_re, t)
                };
                this[Symbol.search] = function(e) {
                    return e.search(format_re)
                }
            } catch (e) {}
        },
        process_formatting: function(e) {
            return $.terminal.format_split(e).map(function(e) {
                if ($.terminal.is_formatting(e)) {
                    var t = e.match(new RegExp(format_parts_re, "i"));
                    var n = t.pop();
                    for (var r = 1; r <= 2; ++r) {
                        if (!$.terminal.valid_color(t[r])) {
                            t[r] = ""
                        }
                    }
                    return t.slice(1, 4).concat(n)
                } else {
                    return ["", "", "", e]
                }
            })
        },
        new_formatter: function(e) {
            var t = $.terminal.defaults.formatters;
            for (var n = 0; n < t.length; ++n) {
                if (t[n] === $.terminal.nested_formatting) {
                    t.splice(n, 0, e);
                    return
                }
            }
            t.push(e)
        }
    };
    (function() {
        function F(e, t) {
            if (e === "") {
                return t
            } else {
                return e.replace(/&#93;/g, "]").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
            }
        }

        function s(e) {
            return e.match(/^\.{1,2}\//) || e.match(/^\//) || !(e.match(/\//) || e.match(/^[^:]+:/))
        }

        function l(n, r) {
            return function(e) {
                if (r.anyLinks) {
                    return true
                }
                var t = n(e);
                if (!t) {
                    warn("Invalid URL " + e + " only http(s) ftp and path " + "are allowed")
                }
                return t
            }
        }
        $.terminal.format = function i(e, t) {
            var g = $.extend({}, {
                linksNoReferrer: false,
                linksNoFollow: false,
                allowedAttributes: [],
                charWidth: undefined,
                escape: true,
                anyLinks: false
            }, t || {});
            var u = l(function(e) {
                return e.match(/^((https?|file|ftp):\/\/|\.{0,2}\/)/) || s(e)
            }, g);
            var n = l(function(e) {
                return e.match(/^(https?:|file:|blob:|data:)/) || s(e)
            }, g);

            function _(e) {
                if (e.length && g.allowedAttributes.length) {
                    return e.filter(function(e) {
                        if (e === "data-text") {
                            return false
                        }
                        var t = false;
                        var n = g.allowedAttributes;
                        for (var r = 0; r < n.length; ++r) {
                            if (n[r] instanceof RegExp) {
                                if (n[r].test(e)) {
                                    t = true;
                                    break
                                }
                            } else if (n[r] === e) {
                                t = true;
                                break
                            }
                        }
                        return t
                    })
                }
                return []
            }

            function y(n, r) {
                if (r) {
                    var e = _(Object.keys(r));
                    if (e.length) {
                        var t = e.map(function(e) {
                            if (r[e] === null) {
                                return ""
                            }
                            if (r[e] === true) {
                                return e
                            }
                            var t = escape_html_attr(r[e]);
                            if (e === "style") {
                                t = t ? n + ";" + t : n
                            }
                            return e + '="' + t + '"'
                        }).filter(Boolean);
                        if (!t.length) {
                            return ""
                        }
                        return t.join(" ")
                    }
                }
                if (!n) {
                    return ""
                }
                return 'style="' + n + '"'
            }

            function r() {
                var e = ["noopener"];
                if (g.linksNoReferrer) {
                    e.unshift("noreferrer")
                }
                if (g.linksNoFollow) {
                    e.unshift("nofollow")
                }
                return e
            }
            var a = r().join(" ");

            function b(e, t, n) {
                if (e.match(email_re)) {
                    return '<a href="mailto:' + e + '"'
                } else {
                    var r = ["<a"];
                    if (e && u(e)) {
                        r.push('href="' + e + '"')
                    }
                    if (t) {
                        if (n.includes("target") && t.target === undefined) {
                            t.target = "_blank"
                        }
                        if (n.includes("rel") && t.rel === undefined) {
                            t.rel = a
                        }
                    } else {
                        r.push('rel="' + a + '"');
                        r.push('target="_blank"')
                    }
                    return r.join(" ")
                }
            }

            function C(e) {
                var t = "<img";
                if (n(e)) {
                    t += ' src="' + e + '"';
                    if (text) {
                        t += ' alt="' + text + '"'
                    }
                }
                return t
            }

            function i(e, t, n, r, i, u, a) {
                var o;
                var s = [];
                if (u.match(/;/)) {
                    try {
                        var l = u.split(";");
                        var f = l.slice(1).join(";").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                        if (f.match(/^\s*\{[^}]*\}\s*$/)) {
                            o = JSON.parse(f);
                            s = _(Object.keys(o));
                            u = l[0]
                        }
                    } catch (e) {}
                }
                if (a === "" && !t.match(/@/)) {
                    return ""
                }
                a = safe(a);
                a = a.replace(/\\\]/g, "&#93;");
                if (g.escape) {
                    a = a.replace(/\\\\/g, "\\")
                }
                var c = {};
                if (t.indexOf("b") !== -1) {
                    c["font-weight"] = "bold"
                }
                var p = [];
                if (t.indexOf("u") !== -1) {
                    p.push("underline")
                }
                if (t.indexOf("s") !== -1) {
                    p.push("line-through")
                }
                if (t.indexOf("o") !== -1) {
                    p.push("overline")
                }
                if (p.length) {
                    c["text-decoration"] = p.join(" ")
                }
                if (t.indexOf("i") !== -1) {
                    c["font-style"] = "italic"
                }
                if ($.terminal.valid_color(n)) {
                    $.extend(c, {
                        color: n,
                        "--color": n,
                        "--original-color": n
                    });
                    if (t.indexOf("!") !== -1) {
                        c["--link-color"] = n
                    }
                    if (t.indexOf("g") !== -1) {
                        c["text-shadow"] = "0 0 5px " + n
                    }
                }
                if ($.terminal.valid_color(r)) {
                    $.extend(c, {
                        "background-color": r,
                        "--background": r
                    })
                }
                var m = F(u, a);
                var D = extra_css(a, g);
                if (D) {
                    a = wide_characters(a, g);
                    $.extend(c, D)
                }
                var d;
                var h = style_to_string(c);
                if (t.indexOf("!") !== -1) {
                    d = b(m, o, s)
                } else if (t.indexOf("@") !== -1) {
                    d = C(m)
                } else {
                    d = "<span"
                }
                var v = y(h, o, s);
                if (v) {
                    d += " " + v
                }
                if (i !== "") {
                    d += ' class="' + i + '"'
                }
                if (t.indexOf("!") !== -1) {
                    d += " data-text>" + a + "</a>"
                } else if (t.indexOf("@") !== -1) {
                    d += " data-text/>"
                } else {
                    d += ' data-text="' + m + '">' + "<span>" + a + "</span></span>"
                }
                return d
            }
            if (typeof e === "string") {
                var o = $.terminal.format_split(e);
                e = $.map(o, function(e) {
                    if (e === "") {
                        return e
                    } else if ($.terminal.is_formatting(e)) {
                        e = e.replace(/\[\[[^\]]+\]/, function(e) {
                            return e.replace(/&nbsp;/g, " ")
                        });
                        return e.replace(format_parts_re, i)
                    } else {
                        e = safe(e);
                        e = e.replace(/\\\]/, "&#93;");
                        var t = F(e);
                        var n = extra_css(e, g);
                        var r;
                        if (n) {
                            e = wide_characters(e, g);
                            r = '<span style="' + style_to_string(n) + '"'
                        } else {
                            r = "<span"
                        }
                        return r + ' data-text="' + t + '">' + e + "</span>"
                    }
                }).join("");
                return e.replace(/<span><br\s*\/?><\/span>/gi, "<br/>")
            } else {
                return ""
            }
        }
    })();
    $.terminal.Exception = function e(t, n, r) {
        if (arguments.length === 1) {
            this.message = arguments[0];
            this.type = "TERMINAL"
        } else {
            this.type = t;
            this.message = n;
            if (r) {
                this.stack = r
            }
        }
    };
    $.terminal.Exception.prototype = new Error;
    $.terminal.Exception.prototype.toString = function() {
        return this.message + "\n" + this.stack
    };
    $.fn.visible = function() {
        return this.css("visibility", "visible")
    };
    $.fn.hidden = function() {
        return this.css("visibility", "hidden")
    };
    var warnings = [];

    function warn(e) {
        e = "[jQuery Terminal] " + e;
        if (warnings.indexOf(e) === -1) {
            warnings.push(e);
            if (console) {
                if (console.warn) {
                    console.warn(e)
                } else if (console.log) {
                    console.log(e)
                }
            } else {
                setTimeout(function() {
                    throw new Error("WARN: " + e)
                }, 0)
            }
        }
    }
    var ids = {};
    $.jrpc = function(e, t, n, r, i) {
        var o = new $.Deferred;
        var s;
        if ($.isPlainObject(e)) {
            s = e
        } else {
            s = {
                url: e,
                method: t,
                params: n,
                success: r,
                error: i
            }
        }

        function u(e) {
            return $.isNumeric(e.id) && (typeof e.result !== "undefined" || typeof e.error !== "undefined")
        }
        ids[s.url] = ids[s.url] || 0;
        var l = {
            jsonrpc: "2.0",
            method: s.method,
            params: s.params,
            id: ++ids[s.url]
        };

        function f(e, t, n, r) {
            if (u(e) || s.method === "system.describe") {
                if (s.success) {
                    s.success(e, n, r)
                }
                o.resolve(e)
            } else {
                if (s.error) {
                    s.error(r, "Invalid JSON-RPC")
                }
                o.reject({
                    message: "Invalid JSON-RPC",
                    response: t
                })
            }
        }
        $.ajax({
            url: s.url,
            beforeSend: function e(t, n) {
                if (is_function(s.request)) {
                    s.request(t, l)
                }
                n.data = JSON.stringify(l)
            },
            success: function e(t, n, r) {
                var i = r.getResponseHeader("Content-Type");
                if (!i.match(/(application|text)\/json/)) {
                    warn("Response Content-Type is neither application/json" + " nor text/json")
                }
                var u;
                try {
                    u = JSON.parse(t)
                } catch (e) {
                    if (s.error) {
                        s.error(r, "Invalid JSON", e)
                    } else {
                        throw new $.terminal.Exception("JSON", "Invalid JSON", e.stack)
                    }
                    o.reject({
                        message: "Invalid JSON",
                        response: t
                    });
                    return
                }
                if (is_function(s.response)) {
                    s.response(r, u)
                }
                if (is_function(s.intercept)) {
                    var a = s.intercept(l, u);
                    if (a) {
                        return unpromise(a, function(e) {
                            var t = JSON.stringify(e);
                            f(e, t, n, r)
                        })
                    }
                }
                f(u, t, n, r)
            },
            error: s.error,
            contentType: "application/json",
            dataType: "text",
            async: true,
            cache: false,
            type: "POST"
        });
        return o.promise()
    };
    $.rpc = function(e, t, n) {
        var r = new $.Deferred;

        function i(e) {
            if (e.error) {
                r.reject(e.error)
            } else {
                r.resolve(e.result)
            }
        }

        function u(e, t, n) {
            r.reject({
                message: n
            })
        }
        $.jrpc(e, t, n, i, u);
        return r.promise()
    };

    function terminal_ready(e) {
        return !!(e.closest("body").length && e.is(":visible") && e.find(".cmd-prompt").length)
    }

    function format_stack_trace(e) {
        e = $.terminal.escape_brackets(e);
        return e.split(/\n/g).map(function(e) {
            return "[[;;;terminal-error]" + e.replace(url_re, function(e) {
                return "]" + e + "[[;;;terminal-error]"
            }) + "]"
        }).join("\n")
    }

    function get_char_size(e) {
        var t;
        if (terminal_ready(e)) {
            var n = e.find(".cmd-prompt").clone().css({
                visiblity: "hidden",
                position: "absolute"
            });
            n.appendTo(e.find(".cmd")).html("&nbsp;").wrap('<div class="cmd-wrapper"/>');
            t = {
                width: n.width(),
                height: n.height()
            };
            n.parent().remove()
        } else {
            var r = $('<div class="terminal terminal-temp"><div class="terminal-' + 'wrapper"><div class="terminal-output"><div><div class="te' + 'rminal-line" style="float: left"><span>&nbsp;</span></div' + '></div></div><div class="terminal-pixel"></div></div>').appendTo("body");
            r.addClass(e.attr("class")).attr("id", e.attr("id"));
            if (e) {
                var i = e.attr("style");
                if (i) {
                    i = i.split(/\s*;\s*/).filter(function(e) {
                        return !e.match(/display\s*:\s*none/i)
                    }).join(";");
                    r.attr("style", i)
                }
            }
            var u = r.find(".terminal-line");
            t = {
                width: u.width(),
                height: u.height()
            };
            r.remove()
        }
        return t
    }

    function get_num_chars(e, t) {
        var n = e.find(".terminal-fill").width();
        var r = Math.floor(n / t.width);
        return r || 1e3
    }

    function get_num_rows(e, t) {
        var n = e.find(".terminal-fill");
        var r = n.height();
        return Math.floor(r / t.height)
    }

    function all(e, t) {
        var n = e.filter(function(e) {
            return e[t]() === e
        });
        return n.length === e.length
    }

    function string_case(e) {
        var t = e.split("");
        if (all(t, "toLowerCase")) {
            return "lower"
        } else if (all(t, "toUpperCase")) {
            return "upper"
        } else {
            return "mixed"
        }
    }

    function same_case(e) {
        return string_case(e) !== "mixed"
    }

    function is_function(e) {
        return get_type(e) === "function"
    }

    function is_object(e) {
        return e && typeof e === "object"
    }

    function is_promise(e) {
        return is_object(e) && is_function(e.then || e.done)
    }

    function is_deferred(e) {
        return is_promise(e) && is_function(e.promise)
    }
    if (!Array.isArray) {
        Array.isArray = function(e) {
            return Object.prototype.toString.call(e) === "[object Array]"
        }
    }

    function is_array(e) {
        return Array.isArray(e)
    }

    function have_custom_font(e) {
        var t = $(e).css("--font");
        if (!t) {
            return false
        }
        var n = Array.from(document.fonts.keys());
        var r = n.find(function(e) {
            return e.family === t
        });
        return !!r
    }

    function get_type(e) {
        if (typeof e === "function") {
            return "function"
        }
        if (e === null) {
            return e + ""
        }
        if (Array.isArray(e)) {
            return "array"
        }
        if (typeof e === "object") {
            return "object"
        }
        return typeof e
    }
    var version_set = !$.terminal.version.match(/^\{\{/);
    var copyright = "Copyright (c) 2011-2023 Jakub T. Jankiewicz " + "<https://jcubic.pl/me>";
    var version_string = version_set ? " v. " + $.terminal.version : " ";
    var reg = new RegExp(" {" + version_string.length + "}$");
    var name_ver = "jQuery Terminal Emulator" + (version_set ? version_string : "");
    var signatures = [
        ["jQuery Terminal", "(c) 2011-2023 jcubic"],
        [name_ver, copyright.replace(/^Copyright | *<.*>/g, "")],
        [name_ver, copyright.replace(/^Copyright /, "")],
        ["      _______                 ________                        __", "     / / _  /_ ____________ _/__  ___/______________  _____  / /", " __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /", "/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__", "\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/_/_/_/_/  \\/\\__\\_\\___/", "         \\/          /____/                                   ".replace(reg, " ") + version_string, copyright],
        ["      __ _____                     ________                            " + "  __", "     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___ " + " / /", " __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ " + "\\/ /", "/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // " + "/ /__", "\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\" + "__\\_\\___/", ("          \\/              /____/                                     " + "     ").replace(reg, "") + version_string, copyright]
    ];
    $.terminal.nested_formatting.__meta__ = true;
    $.terminal.nested_formatting.__inherit__ = true;
    $.terminal.nested_formatting.__no_warn__ = true;
    var promptx = "ayush_terminal"
    $.terminal.defaults = {
        // prompt: "> ",
        // Modified the following statement to change
        
        prompt: promptx+"> ",
        history: true,
        exit: true,
        clear: true,
        enabled: true,
        maskChar: "*",
        wrap: true,
        checkArity: true,
        raw: false,
        tabindex: 1,
        invokeMethods: false,
        exceptionHandler: null,
        pauseEvents: true,
        softPause: false,
        mousewheel: null,
        touchscroll: null,
        memory: false,
        cancelableAjax: true,
        processArguments: true,
        execAnimation: false,
        execAnimationDelay: 100,
        linksNoReferrer: false,
        externalPause: true,
        useCache: true,
        anyLinks: false,
        linksNoFollow: false,
        processRPCResponse: null,
        completionEscape: true,
        mobileDelete: is_mobile,
        convertLinks: true,
        extra: {},
        tabs: 4,
        historySize: 60,
        scrollObject: null,
        historyState: false,
        importHistory: false,
        historyFilter: null,
        echoCommand: true,
        scrollOnEcho: true,
        login: null,
        outputLimit: -1,
        formatters: [$.terminal.nested_formatting],
        unixFormatting: {
            escapeBrackets: false,
            ansiParser: {},
            ansiArt: false
        },
        onAjaxError: null,
        pasteImage: true,
        scrollBottomOffset: 20,
        wordAutocomplete: true,
        caseSensitiveAutocomplete: true,
        caseSensitiveSearch: true,
        clickTimeout: 200,
        holdTimeout: 400,
        holdRepeatTimeout: 200,
        repeatTimeoutKeys: [],
        mobileIngoreAutoSpace: [],
        request: $.noop,
        response: $.noop,
        describe: "procs",
        onRPCError: null,
        keymap: null,
        doubleTab: null,
        doubleTabEchoCommand: false,
        completion: false,
        onInit: $.noop,
        onClear: $.noop,
        onBlur: $.noop,
        onFocus: $.noop,
        onTerminalChange: $.noop,
        onExit: $.noop,
        onPush: $.noop,
        onPop: $.noop,
        keypress: $.noop,
        keydown: $.noop,
        renderHandler: null,
        onAfterRedraw: $.noop,
        onEchoCommand: $.noop,
        onPaste: $.noop,
        onFlush: $.noop,
        onBeforeCommand: null,
        onAfterCommand: null,
        onBeforeEcho: null,
        onAfterEcho: null,
        onBeforeLogin: null,
        onAfterLogout: null,
        onBeforeLogout: null,
        onCommandChange: null,
        onPositionChange: null,
        allowedAttributes: ["title", "target", "rel", /^aria-/, "id", /^data-/],
        strings: {
            comletionParameters: "From version 1.0.0 completion function need to" + " have two arguments",
            wrongPasswordTryAgain: "Wrong username or password try again!",
            wrongPassword: "Wrong username or password!",
            ajaxAbortError: "Error while aborting ajax call!",
            wrongArity: "Wrong number of arguments. Function '%s' expects %s got" + " %s!\n",
            commandNotFound: "Command '%s' is not Found! Type help to see a list of all commands.\n",
            oneRPCWithIgnore: "You can use only one rpc with describe == false " + "or rpc without system.describe",
            oneInterpreterFunction: "You can't use more than one function (rpc " + "without system.describe or with option describe == false count" + "s as one)",
            loginFunctionMissing: "You didn't specify a login function",
            noTokenError: "Access denied (no token)",
            serverResponse: "Server responded",
            wrongGreetings: "Wrong value of greetings parameter",
            notWhileLogin: "You can't call `%s' function while in login",
            loginIsNotAFunction: "Authenticate must be a function",
            canExitError: "You can't exit from main interpreter",
            invalidCompletion: "Invalid completion",
            invalidSelector: "Sorry, but terminal said that you use invalid " + "selector!",
            invalidTerminalId: "Invalid Terminal ID",
            login: "login",
            password: "password",
            recursiveLoop: "Recursive loop in echo detected, skip",
            notAString: "%s function: argument is not a string",
            redrawError: "Internal error, wrong position in cmd redraw",
            invalidStrings: "Command %s have unclosed strings",
            invalidMask: "Invalid mask used only string or boolean allowed",
            defunctTerminal: "You can't call method on terminal that was destroyed"
        }
    };
    var requests = [];
    var terminals = new Cycle;
    var save_state = [];
    var hash_commands;
    var change_hash = false;
    var fire_hash_change = true;
    var first_instance = true;
    $.fn.terminal = function(e, t) {
        function n(n) {
            if (n) {
                this.storage = {}
            }
            this.set = function(e, t) {
                if (n) {
                    this.storage[e] = t
                } else {
                    $.Storage.set(e, t)
                }
            };
            this.get = function(e) {
                if (n) {
                    return this.storage[e]
                } else {
                    return $.Storage.get(e)
                }
            };
            this.remove = function(e) {
                if (n) {
                    delete this.storage[e]
                } else {
                    $.Storage.remove(e)
                }
            }
        }

        function N(e) {
            if ($.terminal.unclosed_strings(e)) {
                var t = $.terminal.escape_brackets(e);
                var n = sprintf(c().invalidStrings, "`" + t + "`");
                throw new $.terminal.Exception(n)
            } else if (is_function(C.processArguments)) {
                return process_command(e, C.processArguments)
            } else if (C.processArguments) {
                return $.terminal.parse_command(e)
            } else {
                return $.terminal.split_command(e)
            }
        }

        function M(e, n) {
            n = n || {};
            if ($.terminal.Animation && e instanceof $.terminal.Animation) {
                e.start(g);
                return false
            }
            if (is_function(C.renderHandler)) {
                return unpromise(e, function(e) {
                    try {
                        var t = C.renderHandler.call(g, e, n, g);
                        if (t === false) {
                            return false
                        }
                        if (typeof t === "string" || W(t) || is_promise(t)) {
                            return t
                        } else {
                            return e
                        }
                    } catch (e) {
                        return ["[[;red;]" + e.message + "]", format_stack_trace(e.stack)].join("\n")
                    }
                })
            }
            return e
        }

        function s(t, n) {
            if (W(t)) {
                var e = $.extend({}, n, {
                    raw: true,
                    finalize: function(e) {
                        e.find(".terminal-render-item").replaceWith(t);
                        if (n && is_function(n.finalize)) {
                            n.finalize(e, g)
                        }
                    }
                });
                return ['<div class="terminal-render-item"/>', e]
            }
        }

        function H(e, t) {
            var n = s(e, t);
            if (n) {
                g.echo.apply(g, n);
                return true
            }
        }

        function i(e) {
            return y.find("[data-index=" + e + "]")
        }

        function W(e) {
            return e instanceof $.fn.init || e instanceof Element
        }

        function q(e) {
            e = M(e);
            if (e === false) {
                return
            }
            if (H(e)) {
                return
            }
            if (typeof e === "string") {
                g.echo(e)
            } else if (is_array(e)) {
                g.echo($.map(e, function(e) {
                    return JSON.stringify(e)
                }).join(" "))
            } else if (typeof e === "object") {
                g.echo(JSON.stringify(e))
            } else {
                g.echo(e)
            }
        }

        function U(e, a) {
            var t = /(.*):([0-9]+):([0-9]+)$/;
            var o = e.match(t);
            if (o) {
                g.pause(C.softPause);
                $.get(o[1], function(e) {
                    var t = o[1];
                    var n = e.split("\n");
                    var i = +o[2] - 1;
                    var r = i > 2 ? i - 2 : 0;
                    var u = n.slice(r, i + 3).map(function(e, t) {
                        var n = "[" + (i + t - 1) + "]: ";
                        var r = a - n.length - 4;
                        if (e.length > r) {
                            e = e.substring(0, r) + "..."
                        }
                        if (i > 2 ? t === 2 : t === i) {
                            e = "[[;#f00;]" + $.terminal.escape_brackets(e) + "]"
                        }
                        return n + e
                    }).filter(Boolean).join("\n");
                    if (u.length) {
                        g.echo("[[b;white;]" + t + "]");
                        g.echo(u).resume()
                    }
                }, "text")
            }
        }

        function K(e) {
            if (is_function(C.onRPCError)) {
                C.onRPCError.call(g, e)
            } else {
                g.error("&#91;RPC&#93; " + e.message);
                if (e.error && e.error.message) {
                    e = e.error;
                    var t = "\t" + e.message;
                    if (e.file) {
                        t += ' in file "' + e.file.replace(/.*\//, "") + '"'
                    }
                    if (e.at) {
                        t += " at line " + e.at
                    }
                    g.error(t)
                }
            }
        }

        function J(n, r) {
            var i;
            if (C.rpc) {
                i = function() {
                    return C.rpc.apply(g, arguments)
                }
            }
            var u = function(e, t) {
                g.pause(C.softPause);
                $.jrpc({
                    url: n,
                    method: e,
                    params: t,
                    request: function(e, t) {
                        try {
                            C.request.call(g, e, t, g)
                        } catch (e) {
                            D(e, "USER")
                        }
                    },
                    intercept: i,
                    response: function(e, t) {
                        try {
                            C.response.call(g, e, t, g)
                        } catch (e) {
                            D(e, "USER")
                        }
                    },
                    success: function e(t) {
                        if (t.error) {
                            K(t.error)
                        } else if (is_function(C.processRPCResponse)) {
                            C.processRPCResponse.call(g, t.result, g)
                        } else if (t.result !== null) {
                            q(t.result)
                        }
                        g.resume()
                    },
                    error: Y
                })
            };
            return function(e, t) {
                if (e === "") {
                    return
                }
                try {
                    e = N(e)
                } catch (e) {
                    D(e, "TERMINAL (get_processed_command)");
                    return
                }
                if (!r || e.name === "help") {
                    u(e.name, e.args)
                } else {
                    var n = t.token(true);
                    if (n) {
                        u(e.name, [n].concat(e.args))
                    } else {
                        t.error("&#91;AUTH&#93; " + c().noTokenError)
                    }
                }
            }
        }

        function Q(a, o, s, l) {
            return function(e, t) {
                if (e === "") {
                    return
                }
                var n;
                try {
                    n = N(e)
                } catch (e) {
                    if (is_function(C.exception)) {
                        C.exception(e, g)
                    } else {
                        g.error("Error: " + (e.message || e))
                    }
                    return
                }
                var r = a[n.name];
                var i = get_type(r);
                if (i === "function") {
                    if (o && r.length !== n.args.length) {
                        g.error(sprintf(c().wrongArity, n.name, r.length, n.args.length))
                        // g.error("&#91;Arity&#93; " + sprintf(c().wrongArity, n.name, r.length, n.args.length))
                    } else {
                        return r.apply(g, n.args)
                    }
                } else if (i === "object" || i === "string") {
                    var u = [];
                    if (i === "object") {
                        u = Object.keys(r);
                        r = Q(r, o, s)
                    }
                    t.push(r, {
                        prompt: n.name + "> ",
                        name: n.name,
                        completion: i === "object" ? u : undefined
                    })
                } else if (is_function(l)) {
                    l(e, g)
                } else if (is_function(C.onCommandNotFound)) {
                    C.onCommandNotFound.call(g, e, g)
                } else {
                    t.error(sprintf(c().commandNotFound, n.name))
                }
            }
        }

        function Y(e, t, n) {
            g.resume();
            if (is_function(C.onAjaxError)) {
                C.onAjaxError.call(g, e, t, n)
            } else if (t !== "abort") {
                g.error("&#91;AJAX&#93; " + t + " - " + c().serverResponse + ":\n" + $.terminal.escape_brackets(e.responseText))
            }
        }

        function V(u, o, r) {
            function s(e) {
                if (e.error) {
                    K(e.error)
                } else if (is_function(C.processRPCResponse)) {
                    C.processRPCResponse.call(g, e.result, g)
                } else {
                    q(e.result)
                }
                g.resume()
            }

            function l(e, t) {
                try {
                    C.request.call(g, e, t, g)
                } catch (e) {
                    D(e, "USER")
                }
            }

            function f(e, t) {
                try {
                    C.response.call(g, e, t, g)
                } catch (e) {
                    D(e, "USER")
                }
            }

            function e(e) {
                var n = e;
                if (C.describe !== false && C.describe !== "") {
                    C.describe.split(".").forEach(function(e) {
                        n = n[e]
                    })
                }
                if (n && n.length) {
                    var t = {};
                    $.each(n, function(e, i) {
                        if ($.isPlainObject(i) && typeof i.name === "string") {
                            t[i.name] = function() {
                                var e = o && i.name !== "help";
                                var t = Array.prototype.slice.call(arguments);
                                var n = t.length + (e ? 1 : 0);
                                if (C.checkArity && i.params && i.params.length !== n) {
                                    g.error(sprintf(c().wrongArity, i.name, i.params.length, n))
                                    // g.error("&#91;Arity&#93; " + sprintf(c().wrongArity, i.name, i.params.length, n))
                                } else {
                                    g.pause(C.softPause);
                                    if (e) {
                                        var r = g.token(true);
                                        if (r) {
                                            t = [r].concat(t)
                                        } else {
                                            g.error("&#91;AUTH&#93; " + c().noTokenError)
                                        }
                                    }
                                    $.jrpc({
                                        url: u,
                                        method: i.name,
                                        params: t,
                                        request: l,
                                        response: f,
                                        success: s,
                                        error: Y
                                    })
                                }
                            }
                        }
                    });
                    var a = typeof o === "string" ? o : "login";
                    t.help = t.help || function(i) {
                        if (typeof i === "undefined") {
                            var e = n.map(function(e) {
                                return e.name
                            }).join(", ") + ", help";
                            g.echo("Available commands: " + e)
                        } else {
                            var u = false;
                            $.each(n, function(e, t) {
                                if (t.name === i) {
                                    u = true;
                                    var n = "";
                                    n += "[[bu;;]" + t.name + "]";
                                    if (t.params) {
                                        var r = t.params;
                                        if (o && t.name !== a) {
                                            r = r.slice(1)
                                        }
                                        n += " " + r.join(" ")
                                    }
                                    if (t.help) {
                                        n += "\n" + t.help
                                    }
                                    g.echo(n);
                                    return false
                                }
                            });
                            if (!u) {
                                if (i === "help") {
                                    g.echo("[[bu;;]help] [method]\ndisplay help " + "for the method or list of methods if not" + " specified")
                                } else {
                                    var t = "Method `" + i + "' not found ";
                                    g.error(t)
                                }
                            }
                        }
                    };
                    r(t)
                } else {
                    r(null)
                }
            }
            return $.jrpc({
                url: u,
                method: "system.describe",
                params: [],
                success: e,
                request: l,
                response: f,
                error: function e() {
                    r(null)
                }
            })
        }

        function G(t, a, n) {
            n = n || $.noop;
            var e = get_type(t);
            var o;
            var r = {};
            var s = 0;
            var l;
            if (e === "array") {
                o = {};
                (function t(e, n) {
                    if (e.length) {
                        var r = e[0];
                        var i = e.slice(1);
                        var u = get_type(r);
                        if (u === "string") {
                            if (C.describe === false) {
                                if (++s === 1) {
                                    l = J(r, a)
                                } else {
                                    g.error(c().oneRPCWithIgnore)
                                }
                                t(i, n)
                            } else {
                                g.pause(C.softPause);
                                V(r, a, function(e) {
                                    if (e) {
                                        $.extend(o, e)
                                    } else if (++s === 1) {
                                        l = J(r, a)
                                    } else {
                                        g.error(c().oneRPCWithIgnore)
                                    }
                                    g.resume();
                                    t(i, n)
                                })
                            }
                        } else if (u === "function") {
                            if (l) {
                                g.error(c().oneInterpreterFunction)
                            } else {
                                l = r
                            }
                            t(i, n)
                        } else if (u === "object") {
                            $.extend(o, r);
                            t(i, n)
                        }
                    } else {
                        n()
                    }
                })(t, function() {
                    n({
                        interpreter: Q(o, false, a, l && l.bind(g)),
                        completion: Object.keys(o)
                    })
                })
            } else if (e === "string") {
                if (C.describe === false) {
                    o = {
                        interpreter: J(t, a)
                    };
                    if ($.isArray(C.completion)) {
                        o.completion = C.completion
                    }
                    n(o)
                } else {
                    g.pause(C.softPause);
                    V(t, a, function(e) {
                        if (e) {
                            r.interpreter = Q(e, false, a);
                            r.completion = Object.keys(e)
                        } else {
                            r.interpreter = J(t, a)
                        }
                        n(r);
                        g.resume()
                    })
                }
            } else if (e === "object") {
                n({
                    interpreter: Q(t, C.checkArity, a),
                    completion: Object.keys(t)
                })
            } else {
                if (e === "undefined") {
                    t = $.noop
                } else if (e !== "function") {
                    var i = e + " is invalid interpreter value";
                    throw new $.terminal.Exception(i)
                }
                n({
                    interpreter: t,
                    completion: C.completion
                })
            }
        }

        function X(r, e) {
            var i = get_type(e) === "boolean" ? "login" : e;
            return function(e, t, n) {
                g.pause(C.softPause);
                $.jrpc({
                    url: r,
                    method: i,
                    params: [e, t],
                    request: function(e, t) {
                        try {
                            C.request.call(g, e, t, g)
                        } catch (e) {
                            D(e, "USER")
                        }
                    },
                    response: function(e, t) {
                        try {
                            C.response.call(g, e, t, g)
                        } catch (e) {
                            D(e, "USER")
                        }
                    },
                    success: function e(t) {
                        if (!t.error && t.result) {
                            n(t.result)
                        } else {
                            n(null)
                        }
                        g.resume()
                    },
                    error: Y
                })
            }
        }

        function D(e, t, n) {
            if (is_function(C.exceptionHandler)) {
                C.exceptionHandler.call(g, e, t)
            } else {
                g.exception(e, t);
                if (!n) {
                    setTimeout(function() {
                        throw e
                    }, 0)
                }
            }
        }

        function Z(e) {
            function t(e, n, r, i, u, a, t) {
                function o(e, t) {
                    return "[[" + [n + (e || ""), r, i, u, t || a].join(";") + "]"
                }

                function s(e) {
                    return "]" + o("!", e) + e + "]" + o()
                }
                if (!n.match(/!/)) {
                    var l = t.match(email_full_re) || t.match(url_full_re);
                    if (l) {
                        return o("!", l[1]) + t + "]"
                    } else if (t.match(email_re) || t.match(url_nf_re)) {
                        var f = t.replace(email_re, s).replace(url_nf_re, s);
                        return o("", a) + f + "]"
                    }
                }
                return e
            }

            function n(e) {
                return e.replace(email_re, "[[!;;]$1]").replace(url_nf_re, "[[!;;]$1]")
            }
            if (!$.terminal.have_formatting(e)) {
                return n(e)
            }
            return $.terminal.format_split(e).map(function(e) {
                if ($.terminal.is_formatting(e)) {
                    return e.replace(format_parts_re, t)
                } else {
                    return n(e)
                }
            }).join("")
        }

        function ee(e, t) {
            return (strlen(text(e)) > t.cols || e.match(/\n/)) && (C.wrap === true && t.wrap === undefined || C.wrap === false && t.wrap === true)
        }
        var f;
        if ("Map" in root) {
            f = new Map
        }

        function te(e, n, r) {
            if (r.exec || n.options.clear_exec) {
                return $.terminal.each_extended_command(e, function(e) {
                    if (r.exec) {
                        n.options.exec = false;
                        n.options.clear_exec = true;
                        var t = e.trim();
                        if (_ && _ === t) {
                            _ = "";
                            g.error(c().recursiveLoop)
                        } else {
                            _ = t;
                            $.terminal.extended_command(g, e, {
                                invokeMethods: r.invokeMethods
                            }).then(function() {
                                _ = ""
                            })
                        }
                    }
                })
            }
            return e
        }

        function ne(t) {
            try {
                var e = !is_function(t.value);
                var n = $.extend({
                    exec: true,
                    raw: false,
                    finalize: $.noop,
                    useCache: e,
                    invokeMethods: false,
                    formatters: true,
                    convertLinks: C.convertLinks
                }, t.options || {});
                var r = ht(t.value);
                if (r && is_function(r.then)) {
                    return r.then(function(e) {
                        ne($.extend(t, {
                            value: e,
                            options: n
                        }))
                    })
                }
                if (r !== "") {
                    if (!n.raw) {
                        if (C.useCache && n.useCache) {
                            var i = r;
                            if (f && f.has(i)) {
                                var u = f.get(i);
                                F.append(u.input, t.index, n, u.raw);
                                return true
                            }
                        }
                        if (n.formatters) {
                            try {
                                r = $.terminal.apply_formatters(r, $.extend(C, {
                                    echo: true
                                }))
                            } catch (e) {
                                D(e, "FORMATTING")
                            }
                        }
                        r = te(r, t, n);
                        if (r === "") {
                            return
                        }
                        if (n.convertLinks) {
                            r = Z(r)
                        }
                        var a = r;
                        r = crlf($.terminal.normalize(r));
                        r = $.terminal.encode(r, {
                            tabs: C.tabs
                        });
                        var o;
                        var s = n.cols = g.cols();
                        if (ee(r, n)) {
                            o = $.terminal.split_equal(r, s, {
                                keepWords: n.keepWords,
                                trim: true
                            })
                        } else if (r.match(/\n/)) {
                            o = r.split(/\n/)
                        }
                    }
                } else {
                    a = ""
                }
                var l = o || r;
                if (f && i && e) {
                    f.set(i, {
                        input: l,
                        raw: a
                    })
                }
                F.append(l, t.index, n, a)
            } catch (e) {
                F.clear();
                if (is_function(C.exceptionHandler)) {
                    C.exceptionHandler.call(g, e, "TERMINAL")
                } else {
                    alert_exception("[Internal Exception(process_line)]", e)
                }
            }
            return true
        }

        function re(e) {
            e = $.extend({}, {
                update: false,
                scroll: true
            }, e || {});
            if (!e.update) {
                B.resize(u);
                var t = y.empty().detach()
            }
            try {
                F.clear();
                unpromise(w.render(g.rows(), function(e) {
                    return e.map(ne)
                }), function() {
                    g.flush(e);
                    if (!e.update) {
                        B.before(t)
                    }
                    v("onAfterRedraw")
                })
            } catch (e) {
                if (is_function(C.exceptionHandler)) {
                    C.exceptionHandler.call(g, e, "TERMINAL (redraw)")
                } else {
                    alert_exception("[redraw]", e)
                }
            }
        }

        function ie() {
            if (C.outputLimit >= 0) {
                var e;
                if (C.outputLimit === 0) {
                    e = g.rows()
                } else {
                    e = C.outputLimit
                }
                var t = y.find("> div > div");
                if (t.length + 1 > e) {
                    var n = t.length - e + 1;
                    var r = t.slice(0, n);
                    var i = r.parent();
                    r.remove();
                    i.each(function() {
                        var e = $(this);
                        if (e.is(":empty")) {
                            w.unmount(e);
                            e.remove()
                        }
                    });
                    w.limit_snapshot(n)
                }
            }
        }

        function ue() {
            if (C.greetings === undefined) {
                g.echo(g.signature, {
                    finalize: a11y_hide,
                    formatters: false
                })
            } else if (C.greetings) {
                var e = typeof C.greetings;
                if (e === "string") {
                    g.echo(C.greetings)
                } else if (e === "function") {
                    g.echo(function() {
                        if (C.greetings) {
                            try {
                                var e = new $.Deferred;
                                var t = C.greetings.call(g, e.resolve);
                                if (t) {
                                    e.resolve(t)
                                }
                                return e.promise()
                            } catch (e) {
                                C.greetings = null;
                                D(e, "greetings")
                            }
                        }
                    })
                } else {
                    g.error(c().wrongGreetings)
                }
            }
        }

        function ae(e) {
            var t = B.mask();
            switch (typeof t) {
                case "string":
                    return e.replace(/./g, t);
                case "boolean":
                    if (t) {
                        return e.replace(/./g, C.maskChar)
                    } else {
                        return $.terminal.escape_formatting(e)
                    }
            }
            throw new $.terminal.Exception(c().invalidMask)
        }

        function h(n) {
            if (typeof n === "undefined") {
                n = g.get_command()
            }
            var e = B.prompt(true);
            n = ae(n);
            var t = {
                exec: false,
                formatters: false,
                convertLinks: false,
                finalize: function e(t) {
                    a11y_hide(t.addClass("terminal-command"));
                    v("onEchoCommand", [t, n])
                }
            };
            n = $.terminal.apply_formatters(n, {
                command: true
            });
            g.echo(e + n, t)
        }

        function oe() {
            return j.outerWidth() !== g.outerWidth()
        }

        function se(e) {
            var t = terminals.get()[e[0]];
            if (!t) {
                throw new $.terminal.Exception(c().invalidTerminalId)
            }
            var n = e[1];
            if (save_state[n]) {
                t.import_view(save_state[n])
            } else {
                change_hash = false;
                var r = e[2];
                if (r) {
                    t.exec(r).done(function() {
                        change_hash = true;
                        save_state[n] = t.export_view()
                    })
                }
            }
        }

        function le(t) {
            return function(e) {
                g.error("[" + t + "] " + (e.message || e)).resume()
            }
        }

        function fe() {
            if (change_hash) {
                fire_hash_change = false;
                location.hash = "#" + JSON.stringify(hash_commands);
                setTimeout(function() {
                    fire_hash_change = true
                }, 100)
            }
        }
        var ce = true;
        var pe = [];

        function me(n, e, t) {
            function r() {
                if (C.historyState || C.execHash && t) {
                    if (!save_state.length) {
                        g.save_state()
                    } else {
                        g.save_state(null)
                    }
                }
            }

            function i() {
                if (!t) {
                    change_hash = true;
                    if (C.historyState) {
                        g.save_state(n, false)
                    }
                    change_hash = c
                }
            }

            function u() {
                f.resolve();
                v("onAfterCommand", [n])
            }

            function a(e, t) {
                if (typeof e !== "undefined") {
                    q(e)
                }
                u();
                if (t) {
                    g.resume()
                }
            }

            function o(e) {
                return is_function(e.done || e.then) && Ye
            }

            function s() {
                var e = l.interpreter.call(g, n, g);
                i();
                if (e) {
                    if (!Ue) {
                        if (o(e)) {
                            k = true
                        } else if (is_promise(e)) {
                            g.pause(C.softPause)
                        }
                    }
                    Ue = false;
                    var t = le("Command");
                    if (is_function(e.done || e.then)) {
                        return unpromise(e, function(e) {
                            a(e, true)
                        }, t)
                    } else {
                        return $.when(e).done(a).catch(t)
                    }
                } else {
                    if (k) {
                        pe.push(function() {
                            u()
                        })
                    } else {
                        u()
                    }
                    return f.promise()
                }
            }
            if (ce) {
                ce = false;
                r()
            }
            try {
                if (v("onBeforeCommand", [n]) === false) {
                    return
                }
                if (t) {
                    _ = n.trim();
                    d = $.terminal.split_command(_)
                } else {
                    d = $.terminal.split_command(n)
                }
                if (!Fe()) {
                    if (t && (is_function(C.historyFilter) && C.historyFilter(n) || n.match(C.historyFilter))) {
                        B.history().append(n)
                    }
                }
                var l = A.top();
                if (!e && C.echoCommand) {
                    h(n)
                }
                var f = new $.Deferred;
                var c = change_hash;
                if (n.match(/^\s*login\s*$/) && g.token(true)) {
                    i();
                    if (g.level() > 1) {
                        g.logout(true)
                    } else {
                        g.logout()
                    }
                    u()
                } else if (C.exit && n.match(/^\s*exit\s*$/) && !b) {
                    i();
                    var p = g.level();
                    if (p === 1 && g.get_token() || p > 1) {
                        if (g.get_token(true)) {
                            g.set_token(undefined, true)
                        }
                        g.pop()
                    }
                    u()
                } else if (C.clear && n.match(/^\s*clear\s*$/) && !b) {
                    i();
                    g.clear();
                    u()
                } else {
                    var m = s();
                    if (m) {
                        return m
                    }
                }
                return f.promise()
            } catch (e) {
                D(e, "USER", t);
                g.resume();
                if (t) {
                    throw e
                }
            }
        }

        function De() {
            if (v("onBeforeLogout", [], true) === false) {
                return
            }
            de();
            v("onAfterlogout", [], true);
            g.login(I, true, Ce)
        }

        function de() {
            var e = g.prefix_name(true) + "_";
            r.remove(e + "token");
            r.remove(e + "login")
        }

        function he(e) {
            var t = g.prefix_name() + "_interpreters";
            var n = r.get(t);
            if (n) {
                n = JSON.parse(n)
            } else {
                n = []
            }
            if ($.inArray(e, n) === -1) {
                n.push(e);
                r.set(t, JSON.stringify(n))
            }
        }

        function ve(e) {
            var t = A.top();
            var n = g.prefix_name(true);
            if (!Fe()) {
                he(n)
            }
            var r = g.login_name(true);
            B.name(n + (r ? "_" + r : ""));
            var i = t.prompt;
            if (is_function(i)) {
                i = vt(i)
            }
            if (i !== B.prompt()) {
                if (is_function(t.prompt)) {
                    B.prompt("")
                }
                B.prompt(t.prompt)
            }
            if (typeof t.history !== "undefined") {
                g.history().toggle(t.history)
            }
            if ($.isPlainObject(t.keymap)) {
                B.keymap(null).keymap($.extend({}, P, $.omap(t.keymap, function(e, t) {
                    return function() {
                        var e = [].slice.call(arguments);
                        try {
                            return t.apply(g, e)
                        } catch (e) {
                            D(e, "USER KEYMAP")
                        }
                    }
                })))
            }
            B.set("");
            Ge.resolve();
            if (!e && is_function(t.onStart)) {
                t.onStart.call(g, g)
            }
        }

        function v(t, e, n) {
            e = (e || []).concat([g]);
            var r = A && A.top();
            if (r && is_function(r[t]) && !n) {
                try {
                    return r[t].apply(g, e)
                } catch (e) {
                    delete r[t];
                    D(e, t)
                }
            } else if (is_function(C[t])) {
                try {
                    return C[t].apply(g, e)
                } catch (e) {
                    C[t] = null;
                    D(e, t)
                }
            }
        }
        var ge = function() {
            function e(e) {
                if (!e) {
                    try {
                        g.scroll_to(g.find(".cmd-cursor-line"));
                        return true
                    } catch (e) {
                        return true
                    }
                }
            }
            if (typeof global !== "undefined" && typeof global.it === "function") {
                return e
            }
            return debounce(e, 100, {
                leading: true,
                trailing: false
            })
        }();

        function _e() {
            var e = g.find(".cmd-cursor-line");
            return e.is_fully_in_viewport(g).then(ge)
        }

        function ye(e) {
            if (typeof history !== "undefined" && history.replaceState) {
                var t = "#" + JSON.stringify(e);
                var n = location.href.replace(/#.*$/, t);
                history.replaceState(null, "", n)
            }
        }

        function be() {
            if (fire_hash_change && C.execHash) {
                try {
                    if (location.hash) {
                        var e = location.hash.replace(/^#/, "");
                        hash_commands = JSON.parse(decodeURIComponent(e))
                    } else {
                        hash_commands = []
                    }
                    if (hash_commands.length) {
                        se(hash_commands[hash_commands.length - 1])
                    } else if (save_state[0]) {
                        g.import_view(save_state[0])
                    }
                } catch (e) {
                    D(e, "TERMINAL")
                }
            }
        }

        function Ce() {
            ve();
            ue();
            if (w.length) {
                if (a.length) {
                    $.when.apply($, a).then(g.refresh)
                } else {
                    g.refresh()
                }
            }

            function t() {
                et = $.noop;
                if (!e && g.enabled()) {
                    g.resume(true)
                }
            }
            var e = false;
            if (is_function(C.onInit)) {
                et = function() {
                    e = true
                };
                var n;
                try {
                    n = C.onInit.call(g, g)
                } catch (e) {
                    D(e, "OnInit")
                } finally {
                    if (!is_promise(n)) {
                        t()
                    } else {
                        n.then(t).catch(function(e) {
                            D(e, "OnInit");
                            t()
                        })
                    }
                }
            }
            if (first_instance) {
                first_instance = false;
                $(window).on("hashchange", be)
            }
        }

        function Fe() {
            return b || B.mask() !== false
        }

        function we(e) {
            var t, n = A.top();
            if (is_function(n.keydown)) {
                t = n.keydown.call(g, e, g);
                if (t !== undefined) {
                    return t
                }
            } else if (is_function(C.keydown)) {
                t = C.keydown.call(g, e, g);
                if (t !== undefined) {
                    return t
                }
            }
        }
        var Ee = {
            "CTRL+D": function(e, t) {
                if (!b) {
                    if (B.get() === "") {
                        if (A.size() > 1 || is_function(I)) {
                            g.pop("")
                        } else {
                            g.resume()
                        }
                    } else {
                        t()
                    }
                }
                return false
            },
            "CTRL+C": function() {
                with_selection(function(e) {
                    if (e === "") {
                        var t = g.get_command();
                        var n = g.get_position();
                        t = t.slice(0, n) + "^C" + t.slice(n + 2);
                        h(t);
                        g.set_command("")
                    } else {
                        var r = g.find("textarea");
                        text_to_clipboard(r, process_selected_html(e))
                    }
                });
                return false
            },
            "CTRL+L": function() {
                g.clear();
                return false
            },
            TAB: function(e, t) {
                var n = A.top(),
                    r, i;
                if (typeof n.caseSensitiveAutocomplete !== "undefined") {
                    i = n.caseSensitiveAutocomplete
                } else {
                    i = C.caseSensitiveAutocomplete
                }
                if (C.completion && get_type(C.completion) !== "boolean" && n.completion === undefined) {
                    r = C.completion
                } else {
                    r = n.completion
                }
                if (r === "settings") {
                    r = C.completion
                }

                function u(e) {
                    e = e.slice();
                    if (!g.before_cursor(false).match(/\s/)) {
                        if (C.clear && $.inArray("clear", e) === -1) {
                            e.push("clear")
                        }
                        if (C.exit && $.inArray("exit", e) === -1) {
                            e.push("exit")
                        }
                    }
                    g.complete(e, {
                        echo: true,
                        word: C.wordAutocomplete,
                        escape: C.completionEscape,
                        caseSensitive: i,
                        echoCommand: C.doubleTabEchoCommand,
                        doubleTab: C.doubleTab
                    })
                }
                if (r) {
                    switch (get_type(r)) {
                        case "function":
                            var a = g.before_cursor(C.wordAutocomplete);
                            if (r.length === 3) {
                                var o = new Error(c().comletionParameters);
                                D(o, "USER");
                                return false
                            }
                            var s = r.call(g, a, u);
                            unpromise(s, u, le("Completion"));
                            break;
                        case "array":
                            u(r);
                            break;
                        default:
                            throw new $.terminal.Exception(c().invalidCompletion)
                    }
                } else {
                    t()
                }
                return false
            },
            "CTRL+V": function(e, t) {
                t(e);
                g.oneTime(200, function() {
                    g.scroll_to_bottom()
                });
                return true
            },
            "CTRL+TAB": function() {
                if (terminals.length() > 1) {
                    g.focus(false);
                    return false
                }
            },
            PAGEDOWN: function() {
                g.scroll(g.height())
            },
            PAGEUP: function() {
                g.scroll(-g.height())
            }
        };

        function xe(t) {
            var e, n;
            if (Ye) {
                return false
            }
            if (g.enabled()) {
                if (!g.paused()) {
                    e = we(t);
                    if (e !== undefined) {
                        return e
                    }
                    if (t.which !== 9) {
                        qe = 0
                    }
                } else {
                    if (!C.pauseEvents) {
                        e = we(t);
                        if (e !== undefined) {
                            return e
                        }
                    }
                    if (t.which === 68 && t.ctrlKey) {
                        if (C.pauseEvents) {
                            e = we(t);
                            if (e !== undefined) {
                                return e
                            }
                        }
                        if (requests.length) {
                            for (n = requests.length; n--;) {
                                var r = requests[n];
                                if (r.readyState !== 4) {
                                    try {
                                        r.abort()
                                    } catch (e) {
                                        if (is_function(C.exceptionHandler)) {
                                            C.exceptionHandler.call(g, t, "AJAX ABORT")
                                        } else {
                                            g.error(c().ajaxAbortError)
                                        }
                                    }
                                }
                            }
                            requests = []
                        }
                        g.resume()
                    }
                    return false
                }
            }
        }

        function $e(e) {
            var t = A.top();
            if (E && (!k || !C.pauseEvents)) {
                if (is_function(t.keypress)) {
                    return t.keypress.call(g, e, g)
                } else if (is_function(C.keypress)) {
                    return C.keypress.call(g, e, g)
                }
            }
        }

        function ke(m) {
            return function e(r, i) {
                var u = $.terminal.apply_formatters(r, {
                    animation: true
                });
                u = $.terminal.normalize(u);
                Ye = true;
                var a = g.get_prompt();
                var o = 0;
                var s = $.terminal.length(u);
                if (r.length > 0) {
                    var l = "";
                    if (i.prompt) {
                        l = i.prompt
                    } else {
                        g.set_prompt("")
                    }
                    var f = g.is_bottom();
                    var c = $.terminal.partition(u, {
                        wrap: false
                    });
                    var p = setInterval(function() {
                        if (!Ve) {
                            var e = c[o];
                            if (i.mask) {
                                var t = B.mask();
                                if (typeof t === "string") {
                                    e = t
                                } else if (t) {
                                    e = C.maskChar
                                }
                            }
                            l += e;
                            B.prompt(l, {
                                formatters: false
                            });
                            if (f && (e === "\n" || !g.is_bottom())) {
                                g.scroll_to_bottom()
                            }
                            o++
                        } else {
                            g.skip_stop();
                            var n = $.terminal.substring(u, o, s);
                            l += n;
                            B.prompt(l, {
                                formatters: false
                            });
                            o = s
                        }
                        if (o === s) {
                            clearInterval(p);
                            setTimeout(function() {
                                m(r, a, i);
                                Ye = false
                            }, i.delay)
                        }
                    }, i.delay)
                }
            }
        }
        var Ae = ke(function(e, t, n) {
            g.set_prompt(e);
            n.finalize()
        });
        var Be = function() {
            var r = ke(function(e, t, n) {
                g.set_prompt(t);
                g.insert(e);
                n.finalize()
            });
            return function(e, t, n) {
                return r(t, $.extend({}, n, {
                    prompt: e + g.get_command()
                }))
            }
        }();
        var Te = ke(function(e, t, n) {
            g.set_prompt(t);
            g.echo(e, $.extend({}, n, {
                typing: false
            }))
        });
        var Se = function() {
            var r = ke(function(r, e, i) {
                g.set_prompt(e);
                with_prompt(e, function(e) {
                    var t = ae(r);
                    t = $.terminal.apply_formatters(t, {
                        command: true
                    });
                    var n = e + t;
                    i = $.extend({}, i, {
                        typing: false,
                        formatters: false,
                        convertLinks: false
                    });
                    g.echo(n, i)
                }, g)
            });
            return function(e, t, n) {
                return r(t, $.extend({}, n, {
                    prompt: e,
                    mask: true
                }))
            }
        }();

        function Re(a, o, s) {
            return function e(r, i) {
                var u = new $.Deferred;
                p(function e() {
                    var t = $.extend({
                        typing: false,
                        delay: C.execAnimationDelay
                    }, i);
                    if (t.typing) {
                        if (typeof r !== "string") {
                            return u.reject(a + ": Typing animation require string")
                        }
                        if (typeof t.delay !== "number" || isNaN(t.delay)) {
                            return u.reject(a + ": Invalid argument, delay need to" + " be a number")
                        }
                        var n = g.typing(a, t.delay, r, t);
                        n.then(function() {
                            u.resolve()
                        })
                    } else {
                        o(r, t)
                    }
                    if (is_function(s)) {
                        s(r, t)
                    }
                });
                if (i && i.typing) {
                    return u.promise()
                }
                return g
            }
        }

        function je(e, t, n) {
            var r = v("onBeforeLogin", [e, t]);
            return unpromise(always(r), n, "validate_login")
        }

        function Oe(u, i, a, o) {
            if (C.history) {
                B.history().disable()
            }
            var e = g.level();
            t();

            function s() {
                while (g.level() > e) {
                    g.pop(undefined, true)
                }
                if (C.history) {
                    B.history().enable()
                }
            }

            function l(e, t) {
                var n = g.prefix_name(true) + "_";
                r.set(n + "token", t);
                r.set(n + "login", e)
            }

            function t() {
                var e = g.prefix_name(true) + "_";
                r.remove(e + "token");
                r.remove(e + "login")
            }

            function f(e, t, n) {
                var r;
                if (t) {
                    s();
                    l(e, t);
                    b = false;
                    v("onAfterLogin", [e, t]);
                    r = a
                } else {
                    if (i) {
                        if (!n) {
                            g.error(c().wrongPasswordTryAgain)
                        }
                        g.pop(undefined, true).set_mask(false)
                    } else {
                        b = false;
                        if (!n) {
                            g.error(c().wrongPassword)
                        }
                        g.pop(undefined, true).pop(undefined, true)
                    }
                    r = o
                }
                if (g.paused()) {
                    g.resume()
                }
                if (is_function(r)) {
                    r()
                }
                g.off("terminal.autologin")
            }
            g.on("terminal.autologin", function(e, t, n, r) {
                je(t, n, function(e) {
                    if (e !== false) {
                        f(t, n, r)
                    }
                })
            });
            g.push(function(i) {
                g.set_mask(C.maskChar).push(function(r) {
                    try {
                        je(i, r, function(e) {
                            if (e === false) {
                                s();
                                return
                            }
                            g.pause();
                            try {
                                var t = [i, r, function(e, t) {
                                    f(i, e, t)
                                }];
                                var n = u.apply(g, t);
                                unpromise(n, function(e) {
                                    f(i, e)
                                }, function(e) {
                                    g.pop(undefined, true).pop(undefined, true);
                                    g.error(e.message);
                                    if (is_function(o)) {
                                        o()
                                    }
                                    if (g.paused()) {
                                        g.resume()
                                    }
                                    g.off("terminal.autologin")
                                })
                            } catch (e) {
                                D(e, "AUTH")
                            }
                        })
                    } catch (e) {
                        D(e, "AUTH")
                    }
                }, {
                    prompt: c().password + ": ",
                    name: "password"
                })
            }, {
                prompt: c().login + ": ",
                name: "login"
            })
        }

        function Le(t) {
            return function(e) {
                t.add(e)
            }
        }

        function c() {
            return $.extend({}, $.terminal.defaults.strings, C && C.strings || {})
        }

        function ze(e, t) {
            return parseInt(e.getPropertyValue(t), 10) || 0
        }

        function Ie() {
            var t = window.getComputedStyle(j[0]);

            function e(e) {
                return ze(t, "padding-" + e)
            }
            var n = e("left");
            var r = e("right");
            var i = e("top");
            var u = e("bottom");
            return {
                top: i,
                left: n,
                right: r,
                bottom: u
            }
        }
        var g = this;
        if (this.length > 1) {
            return this.each(function() {
                $.fn.terminal.call($(this), e, $.extend({
                    name: g.selector
                }, t))
            })
        }
        var Pe;
        if (g.is("body,html")) {
            if (g.hasClass("full-screen-terminal")) {
                var Ne = g.find("> .terminal").data("terminal");
                if (Ne) {
                    return Ne
                }
            }
            Pe = g;
            g = $("<div/>").appendTo("body");
            $("body").addClass("full-screen-terminal")
        } else if (g.data("terminal")) {
            return g.data("terminal")
        }
        var Me = $.omap({
            id: function() {
                return m
            },
            clear: function() {
                if (v("onClear") !== false) {
                    F.clear();
                    w.clear(function(e) {
                        return i(e)
                    });
                    y[0].innerHTML = "";
                    g.prop({
                        scrollTop: 0
                    })
                }
                return g
            },
            export_view: function() {
                var e = v("onExport");
                e = e || {};
                return $.extend({}, {
                    focus: E,
                    mask: B.mask(),
                    prompt: g.get_prompt(),
                    command: g.get_command(),
                    position: B.position(),
                    lines: clone(w.data()),
                    interpreters: A.clone(),
                    history: B.history().data
                }, e)
            },
            import_view: function(t) {
                if (b) {
                    throw new Error(sprintf(c().notWhileLogin, "import_view"))
                }
                v("onImport", [t]);
                p(function e() {
                    g.set_prompt(t.prompt);
                    g.set_command(t.command);
                    B.position(t.position);
                    B.mask(t.mask);
                    if (t.focus) {
                        g.focus()
                    }
                    w.import(clone(t.lines).filter(function(e) {
                        return e[0]
                    }));
                    if (t.interpreters instanceof Stack) {
                        A = t.interpreters
                    }
                    if (C.importHistory) {
                        B.history().set(t.history)
                    }
                    re()
                });
                return g
            },
            save_state: function(e, t, n) {
                if (typeof n !== "undefined") {
                    save_state[n] = g.export_view()
                } else {
                    save_state.push(g.export_view())
                }
                if (!$.isArray(hash_commands)) {
                    hash_commands = []
                }
                if (e !== undefined && !t) {
                    var r = [m, save_state.length - 1, e];
                    hash_commands.push(r);
                    fe()
                }
                return g
            },
            exec: function(r, i, u) {
                function a(e) {
                    var t = me(r, e, true);
                    unpromise(t, function() {
                        d = null;
                        s.resolve()
                    }, function() {
                        d = null;
                        s.reject()
                    })
                }
                if (i && typeof i === "object") {
                    u = i;
                    i = null
                }
                var o = $.extend({
                    deferred: null,
                    silent: false,
                    typing: false,
                    delay: C.execAnimationDelay
                }, u);
                if (i === null) {
                    i = o.silent
                }
                if (!is_deferred(o.deferred)) {
                    o.deferred = new $.Deferred
                }
                var s = o.deferred;
                l(function e() {
                    if ($.isArray(r)) {
                        (function e() {
                            var t = r.shift();
                            if (t) {
                                g.exec(t, i, u).done(e)
                            } else {
                                s.resolve()
                            }
                        })()
                    } else if (k) {
                        rt.push([r, i, o])
                    } else if (o.typing && !i) {
                        var t = o.delay;
                        k = true;
                        var n = g.typing("enter", t, r, {
                            delay: t
                        });
                        n.then(function() {
                            k = false;
                            a(true)
                        });
                        s.then(function() {
                            k = false
                        })
                    } else {
                        a(i)
                    }
                });
                return s.promise()
            },
            autologin: function(e, t, n) {
                g.trigger("terminal.autologin", [e, t, n]);
                return g
            },
            login: function(t, n, r, i) {
                Je.push([].slice.call(arguments));
                if (b) {
                    throw new Error(sprintf(c().notWhileLogin, "login"))
                }
                if (!is_function(t)) {
                    throw new Error(c().loginIsNotAFunction)
                }
                b = true;
                if (g.token() && g.level() === 1 && !ut) {
                    b = false;
                    g.logout(true)
                } else {
                    var e = g.token(true);
                    var u = g.login_name(true);
                    if (e && u) {
                        b = false;
                        g.pause();
                        je(u, e, function(e) {
                            if (e !== false) {
                                if (is_function(r)) {
                                    r()
                                }
                            } else {
                                g.resume();
                                Oe(t, n, r, i)
                            }
                        })
                    } else {
                        Oe(t, n, r, i)
                    }
                }
                return g
            },
            settings: function() {
                return C
            },
            before_cursor: function(e) {
                var t = B.position();
                var n = B.get().slice(0, t);
                var r = n.split(/\s/);
                var i;
                if (e) {
                    if (r.length === 1) {
                        i = r[0]
                    } else {
                        var u = n.match(/(\\?")/g);
                        var a = u ? u.filter(function(e) {
                            return !e.match(/^\\/)
                        }).length : 0;
                        u = n.match(/'/g);
                        var o = u ? u.length : 0;
                        if (o % 2 === 1) {
                            i = n.match(/('[^']*)$/)[0]
                        } else if (a % 2 === 1) {
                            i = n.match(/("(?:[^"]|\\")*)$/)[0]
                        } else {
                            i = r[r.length - 1];
                            for (z = r.length - 1; z > 0; z--) {
                                var s = r[z - 1];
                                if (s[s.length - 1] === "\\") {
                                    i = r[z - 1] + " " + i
                                } else {
                                    break
                                }
                            }
                        }
                    }
                } else {
                    i = n
                }
                return i
            },
            complete: function(r, i) {
                i = $.extend({
                    word: true,
                    echo: false,
                    escape: true,
                    echoCommand: false,
                    caseSensitive: true,
                    doubleTab: null
                }, i || {});
                var u = i.caseSensitive;
                var a = g.before_cursor(i.word).replace(/\\"/g, '"');
                var s = false;
                if (i.word) {
                    if (a.match(/^"/)) {
                        s = '"'
                    } else if (a.match(/^'/)) {
                        s = "'"
                    }
                    if (s) {
                        a = a.replace(/^["']/, "")
                    }
                }
                if (qe % 2 === 0) {
                    Ke = g.before_cursor(i.word)
                } else {
                    var e = g.before_cursor(i.word);
                    if (e !== Ke) {
                        return
                    }
                }
                var t = $.terminal.escape_regex(a);
                if (i.escape) {
                    t = t.replace(/(\\+)(["'() ])/g, function(e, t, n) {
                        if (n.match(/[()]/)) {
                            return t + "\\?\\" + n
                        } else {
                            return t + "?" + n
                        }
                    })
                }

                function o(e) {
                    if (s === '"') {
                        e = e.replace(/"/g, '\\"')
                    }
                    if (!s && i.escape) {
                        e = e.replace(/(["'() ])/g, "\\$1")
                    }
                    return e
                }

                function n() {
                    var e = [];
                    for (var t = r.length; t--;) {
                        if (r[t].match(/\n/) && i.word) {
                            warn("If you use commands with newlines you " + "should use word option for complete or" + " wordAutocomplete terminal option")
                        }
                        if (f.test(r[t])) {
                            var n = o(r[t]);
                            if (!u && same_case(n)) {
                                if (a.toLowerCase() === a) {
                                    n = n.toLowerCase()
                                } else if (a.toUpperCase() === a) {
                                    n = n.toUpperCase()
                                }
                            }
                            e.push(n)
                        }
                    }
                    return e
                }
                var l = u ? "" : "i";
                var f = new RegExp("^" + t, l);
                var c = n();

                function p(e, t) {
                    var n = g.get_command();
                    var r = g.get_position();
                    var i = new RegExp("^" + e, "i");
                    var u = n.slice(0, r);
                    var a = n.slice(r);
                    var o = t.replace(i, "") + (s || "");
                    g.set_command(u + o + a);
                    g.set_position((u + o).length)
                }
                if (c.length === 1) {
                    if (i.escape) {
                        p(t, c[0])
                    } else {
                        g.insert(c[0].replace(f, "") + (s || ""))
                    }
                    Ke = g.before_cursor(i.word);
                    return true
                } else if (c.length > 1) {
                    if (++qe >= 2) {
                        qe = 0;
                        if (i.echo) {
                            if (is_function(i.doubleTab)) {
                                if (i.echoCommand) {
                                    h()
                                }
                                var m = i.doubleTab.call(g, a, c, h);
                                if (typeof m === "undefined") {
                                    return true
                                } else {
                                    return m
                                }
                            } else if (i.doubleTab !== false) {
                                h();
                                var D = c.slice().reverse().join("\t\t");
                                g.echo($.terminal.escape_brackets(D), {
                                    keepWords: true,
                                    formatters: false
                                })
                            }
                            return true
                        }
                    } else {
                        var d = common_string(o(a), c, u);
                        if (d) {
                            p(t, d);
                            Ke = g.before_cursor(i.word);
                            return true
                        }
                    }
                }
            },
            commands: function() {
                return A.top().interpreter
            },
            set_interpreter: function(e, t) {
                var n = $.Deferred();

                function r() {
                    g.pause(C.softPause);
                    G(e, t, function(e) {
                        g.resume();
                        var t = A.top();
                        $.extend(t, e);
                        ve(true);
                        n.resolve()
                    })
                }
                if (is_function(t)) {
                    g.login(t, true, r)
                } else if (get_type(e) === "string" && t) {
                    g.login(X(e, t), true, r)
                } else {
                    r()
                }
                return n.promise()
            },
            greetings: function() {
                ue();
                return g
            },
            paused: function() {
                return k
            },
            pause: function(t) {
                l(function e() {
                    et();
                    k = true;
                    B.disable(t || is_android);
                    if (!t) {
                        B.find(".cmd-prompt").hidden()
                    }
                    v("onPause")
                });
                return g
            },
            resume: function(i) {
                l(function e() {
                    k = false;
                    if (E && terminals.front() === g) {
                        B.enable(i)
                    }
                    B.find(".cmd-prompt").visible();
                    var t = rt;
                    rt = [];
                    for (var n = 0; n < t.length; ++n) {
                        g.exec.apply(g, t[n])
                    }
                    g.trigger("resume");
                    var r = pe.shift();
                    if (r) {
                        r()
                    }
                    if (v("onResume") !== false) {
                        g.scroll_to_bottom()
                    }
                });
                return g
            },
            skip: function() {
                Ve = true
            },
            skip_stop: function() {
                Ve = false
            },
            animating: function() {
                return Ye
            },
            cols: function() {
                if (C.numChars) {
                    return C.numChars
                }
                if (!u || u === 1e3) {
                    u = get_num_chars(g, L)
                }
                return u
            },
            rows: function() {
                if (C.numRows) {
                    return C.numRows
                }
                if (!o) {
                    o = get_num_rows(g, L)
                }
                return o
            },
            history: function() {
                return B.history()
            },
            geometry: function() {
                const e = Ie();
                return {
                    terminal: {
                        padding: {
                            left: e.left,
                            right: e.right,
                            top: e.top,
                            bottom: e.bottom
                        },
                        width: tt + e.left + e.right,
                        height: nt + e.top + e.bottom
                    },
                    density: O,
                    char: L,
                    cols: this.cols(),
                    rows: this.rows()
                }
            },
            history_state: function(e) {
                function t() {
                    C.historyState = true;
                    if (!save_state.length) {
                        g.save_state()
                    } else if (terminals.length() > 1) {
                        g.save_state(null)
                    }
                }
                if (e) {
                    if (typeof window.setImmediate === "undefined") {
                        setTimeout(t, 0)
                    } else {
                        setImmediate(t)
                    }
                } else {
                    C.historyState = false
                }
                return g
            },
            clear_history_state: function() {
                hash_commands = [];
                save_state = [];
                return g
            },
            next: function() {
                if (terminals.length() === 1) {
                    return g
                } else {
                    terminals.front().disable();
                    var e = terminals.rotate().enable();
                    var t = e.offset().top - 50;
                    $("html,body").animate({
                        scrollTop: t
                    }, 500);
                    try {
                        trigger_terminal_change(e)
                    } catch (e) {
                        D(e, "onTerminalChange")
                    }
                    return e
                }
            },
            focus: function(n, r) {
                l(function e() {
                    if (terminals.length() === 1) {
                        if (n === false) {
                            g.disable(r)
                        } else {
                            g.enable(r)
                        }
                    } else if (n === false) {
                        g.next()
                    } else {
                        var t = terminals.front();
                        if (t !== g) {
                            terminals.forEach(function(e) {
                                if (e !== g && e.enabled()) {
                                    e.disable(r)
                                }
                            });
                            if (!r) {
                                try {
                                    trigger_terminal_change(g)
                                } catch (e) {
                                    D(e, "onTerminalChange")
                                }
                            }
                        }
                        terminals.set(g);
                        g.enable(r)
                    }
                });
                return g
            },
            blur: function(e) {
                return this.focus(false, e)
            },
            freeze: function(t) {
                p(function e() {
                    if (t) {
                        g.disable();
                        x = true
                    } else {
                        x = false;
                        g.enable()
                    }
                });
                return g
            },
            frozen: function() {
                return x
            },
            enable: function(n) {
                if (!E && !x) {
                    if (u === undefined) {
                        g.resize()
                    }
                    l(function e() {
                        var t;
                        if (!n && !E) {
                            v("onFocus")
                        }
                        if (!n && t === undefined || n) {
                            E = true;
                            if (!g.paused()) {
                                B.enable(true)
                            }
                        }
                    })
                }
                return g
            },
            clear_cache: "Map" in root ? function() {
                F.clear_cache();
                f.clear();
                B.clear_cache();
                return g
            } : function() {
                return g
            },
            disable: function(n) {
                l(function e() {
                    var t;
                    if (!n && E) {
                        t = v("onBlur")
                    }
                    if (!n && t === undefined || n) {
                        E = false;
                        B.disable()
                    }
                });
                return g
            },
            enabled: function() {
                return E
            },
            signature: function() {
                var e = g.cols();
                for (var t = signatures.length; t--;) {
                    var n = signatures[t].map(function(e) {
                        return e.length
                    });
                    if (Math.max.apply(null, n) <= e) {
                        return signatures[t].join("\n").replace(/\s+$/m, "") + "\n"
                    }
                }
                return ""
            },
            version: function() {
                return $.terminal.version
            },
            cmd: function() {
                return B
            },
            get_command: function() {
                return B.get()
            },
            enter: Re("enter", h),
            set_command: function(t, n) {
                p(function e() {
                    if (typeof t !== "string") {
                        t = JSON.stringify(t)
                    }
                    B.set(t, undefined, n)
                });
                return g
            },
            set_position: function(t, n) {
                p(function e() {
                    B.position(t, n)
                });
                return g
            },
            get_position: function() {
                return B.position()
            },
            insert: function(u, e) {
                if (typeof u === "string") {
                    var a;
                    var t = {
                        stay: false,
                        typing: false,
                        delay: 100
                    };
                    if (!is_object(e)) {
                        e = {
                            stay: e
                        }
                    }
                    a = $.extend(t, e);
                    var o = new $.Deferred;
                    p(function e() {
                        function t() {
                            if (C.scrollOnEcho || n) {
                                g.scroll_to_bottom()
                            }
                        }
                        var n = g.is_bottom();
                        if (a.typing) {
                            var r = a.delay;
                            var i = g.typing("insert", r, u, C);
                            i.then(function() {
                                t();
                                o.resolve()
                            })
                        } else {
                            B.insert(u, C.stay);
                            t()
                        }
                    });
                    if (a.typing) {
                        return o.promise()
                    }
                    return g
                } else {
                    throw new Error(sprintf(c().notAString, "insert"))
                }
            },
            set_prompt: Re("prompt", function(t) {
                if (is_function(t)) {
                    B.prompt(function(e) {
                        return t.call(g, e, g)
                    })
                } else {
                    B.prompt(t)
                }
            }, function(e) {
                A.top().prompt = e
            }),
            get_prompt: function() {
                return A.top().prompt
            },
            set_mask: function(t) {
                p(function e() {
                    B.mask(t === true ? C.maskChar : t)
                });
                return g
            },
            get_mask: function() {
                return B.mask()
            },
            get_output: function(e) {
                if (e) {
                    return w.data()
                } else {
                    return w.get_snapshot()
                }
            },
            resize: function(e, t) {
                if (!g.is(":visible")) {
                    g.stopTime("resize");
                    g.oneTime(500, "resize", function() {
                        g.resize(e, t)
                    })
                } else {
                    if (e && t) {
                        g.width(e);
                        g.height(t)
                    }
                    e = g.width();
                    t = g.height();
                    if (typeof C.numChars !== "undefined" || typeof C.numRows !== "undefined") {
                        if (typeof C.numChars !== "undefined") {
                            B.resize(C.numChars);
                            g.refresh()
                        }
                        v("onResize");
                        return
                    }
                    var n = get_num_chars(g, L);
                    var r = get_num_rows(g, L);
                    if (n !== u || r !== o) {
                        g.clear_cache();
                        var i = n !== u;
                        u = n;
                        o = r;
                        if (i) {
                            B.resize(u);
                            g.refresh()
                        }
                        v("onResize")
                    }
                }
                return g
            },
            refresh: function() {
                if (L.width !== 0) {
                    css(g[0], {
                        "--char-width": L.width,
                        "--pixel-density": O
                    })
                }
                g.clear_cache();
                if (Ke) {
                    B.resize()
                }
                re({
                    scroll: false,
                    update: true
                });
                return g
            },
            flush: function(d) {
                d = $.extend({}, {
                    update: false,
                    scroll: true
                }, d || {});
                p(function e() {
                    try {
                        if (F.is_empty()) {
                            return g
                        }
                        var t = g.is_bottom();
                        var u = C.scrollOnEcho && d.scroll || t;
                        var a;
                        var o = true;
                        var s = false;
                        var l = $();
                        var f;
                        if (!d.update) {
                            l = g.find(".partial");
                            f = w.get_partial()
                        }
                        F.flush(function(e) {
                            if (!e) {
                                if (!l.length) {
                                    a = $("<div/>");
                                    f = []
                                } else if (o) {
                                    o = false;
                                    s = true;
                                    a = l
                                }
                            } else if (is_function(e.finalize)) {
                                if (d.update && e.raw === true && e.newline) {
                                    return
                                }
                                if (u) {
                                    a.find("img").on("load", function() {
                                        g.scroll_to_bottom()
                                    })
                                }
                                if (d.update) {
                                    w.update_snapshot(e.index, f);
                                    var t = "> div[data-index=" + e.index + "]";
                                    var n = y.find(t);
                                    if (n.html() !== a.html()) {
                                        n.replaceWith(a)
                                    }
                                } else {
                                    a.appendTo(y);
                                    if (!l.length) {
                                        w.make_snapshot(f)
                                    }
                                }
                                a.attr("data-index", e.index);
                                s = !e.newline;
                                a.toggleClass("partial", s);
                                if (s) {
                                    l = a
                                } else if (e.newline && l.length) {
                                    a = $("<div/>");
                                    l = $()
                                }
                                e.finalize(a)
                            } else {
                                var r = e.line;
                                var i;
                                if (typeof e.raw === "string") {
                                    if (s) {
                                        f[f.length - 1] += e.raw
                                    } else {
                                        f.push(e.raw)
                                    }
                                }
                                if (s) {
                                    i = a.children().last().append(r);
                                    s = false
                                } else {
                                    i = $("<div/>").html(r);
                                    if (e.newline) {
                                        i.addClass("cmd-end-line")
                                    }
                                    a.append(i)
                                }
                                i.css("width", "100%")
                            }
                        });
                        l = g.find(".partial");
                        var n;
                        if (l.length === 0) {
                            css(B[0], {
                                "--prompt-offset": "",
                                top: ""
                            });
                            B.__set_prompt_margin(0);
                            n = g.find(".terminal-output div:last-child" + " div:last-child");
                            if (n.css("display") === "inline-block") {
                                n.css({
                                    width: "100%",
                                    display: ""
                                })
                            }
                        } else if (f.length && f[f.length - 1]) {
                            var r = $.terminal.length(f[f.length - 1]);
                            r %= g.cols();
                            n = l.children().last();
                            var i = n[0].getBoundingClientRect();
                            var c = is_ch_unit_supported ? r + "ch" : r + "px";
                            css(B[0], {
                                top: -i.height / O + "px",
                                "--prompt-offset": c
                            });
                            B.__set_prompt_margin(r)
                        }
                        ie();
                        v("onFlush");
                        var p = g.find(".cmd-cursor");
                        var m = g.find(".cmd").offset();
                        var D = g.offset();
                        g.stopTime("flush").oneTime(1, "flush", function() {
                            css(g[0], {
                                "--terminal-height": g.height(),
                                "--terminal-x": m.left - D.left,
                                "--terminal-y": m.top - D.top,
                                "--terminal-scroll": g.prop("scrollTop")
                            });
                            if (E) {
                                p.hide();
                                g.oneTime(1, "flush", function() {
                                    p.show()
                                })
                            }
                        });
                        a.on_load({
                            done: function() {
                                if (u) {
                                    g.scroll_to_bottom()
                                }
                            }
                        })
                    } catch (e) {
                        if (is_function(C.exceptionHandler)) {
                            try {
                                C.exceptionHandler.call(g, e, "TERMINAL (Flush)")
                            } catch (e) {
                                C.exceptionHandler = $.noop;
                                alert_exception("[exceptionHandler]", e)
                            }
                        } else {
                            alert_exception("[Flush]", e)
                        }
                    } finally {
                        F.clear()
                    }
                });
                return g
            },
            update: function(r, t, i) {
                p(function e() {
                    if (r < 0) {
                        r = w.length() + r
                    }
                    if (!w.valid_index(r)) {
                        g.error("Invalid line number " + r)
                    } else if (t === null) {
                        w.update(r, null);
                        y.find("[data-index=" + r + "]").remove()
                    } else {
                        t = M(t, {
                            update: true,
                            line: r
                        });
                        if (t === false) {
                            return g
                        }
                        unpromise(t, function(e) {
                            var t = s(e, i);
                            if (t) {
                                e = t[0];
                                i = t[1]
                            }
                            i = w.update(r, e, i);
                            var n = ne({
                                value: e,
                                index: r,
                                options: i
                            });
                            unpromise(n, function() {
                                g.flush({
                                    scroll: false,
                                    update: true
                                })
                            })
                        })
                    }
                });
                return g
            },
            remove_line: function(e) {
                return g.update(e, null)
            },
            last_index: function() {
                return w.length() - 1
            },
            echo: function(e, r, t) {
                var o = arguments.length > 0;
                var s = t || new $.Deferred;

                function l() {
                    We = false;
                    var e = a;
                    a = [];
                    for (var t = 0; t < e.length; ++t) {
                        g.echo.apply(g, e[t])
                    }
                }

                function f(e) {
                    l();
                    D(e, "ECHO", true)
                }

                function n(i) {
                    try {
                        var u = $.extend({
                            flush: true,
                            exec: true,
                            raw: C.raw,
                            finalize: $.noop,
                            unmount: $.noop,
                            delay: C.execAnimationDelay,
                            ansi: false,
                            typing: false,
                            externalPause: true,
                            keepWords: false,
                            invokeMethods: C.invokeMethods,
                            onClear: null,
                            formatters: true,
                            allowedAttributes: C.allowedAttributes,
                            newline: true
                        }, r || {});
                        var n = C.externalPause && u.externalPause;
                        (function(t) {
                            if (W(i)) {
                                return
                            }
                            u.finalize = function(e) {
                                if (u.raw) {
                                    e.addClass("raw")
                                }
                                if (u.ansi) {
                                    e.addClass("ansi")
                                }
                                try {
                                    if (is_function(t)) {
                                        t.call(g, e)
                                    }
                                    e.on_load({
                                        error: function(e) {
                                            e.replaceWith(use_broken_image)
                                        },
                                        done: function(e) {
                                            if (e && n) {
                                                g.resume()
                                            }
                                        },
                                        load: function(e) {
                                            if (e && n) {
                                                g.pause()
                                            }
                                        }
                                    })
                                } catch (e) {
                                    D(e, "USER:echo(finalize)");
                                    t = null
                                }
                            }
                        })(u.finalize);
                        if (u.flush) {
                            if (!F.empty()) {
                                g.flush()
                            }
                        }
                        if (v("onBeforeEcho", [i]) === false) {
                            return
                        }
                        if (u.typing) {
                            if (typeof i !== "string") {
                                return s.reject("echo: Typing animation require string" + " or promise that resolve to string")
                            }
                            if (typeof u.delay !== "number" || isNaN(u.delay)) {
                                return s.reject("echo: Invalid argument, delay need to" + " be a number")
                            }
                            var e = g.typing("echo", u.delay, i, u);
                            e.then(function() {
                                s.resolve()
                            });
                            return
                        }
                        var t;
                        if (typeof i === "function") {
                            t = i.bind(g)
                        } else if (typeof i === "undefined") {
                            if (o) {
                                t = String(i)
                            } else {
                                t = ""
                            }
                        } else {
                            var a = M(i);
                            if (a === false) {
                                return g
                            }
                            t = a
                        }
                        if (is_promise(t)) {
                            We = true
                        }
                        unpromise(t, function(e) {
                            if (is_promise(a) && e === false) {
                                return
                            }
                            if (H(e, u)) {
                                return g
                            }
                            var t = w.length();
                            var n = w.has_newline();
                            if (!n) {
                                t--
                            }
                            if (!u.newline && e[e.length - 1] === "\n") {
                                e = e.slice(0, -1);
                                u.newline = true
                            }
                            var r = ne({
                                value: e,
                                options: u,
                                index: t
                            });
                            if (is_promise(r)) {
                                We = true
                            }
                            w.push([e, u]);
                            unpromise(r, function() {
                                if (u.flush) {
                                    g.flush();
                                    v("onAfterEcho", [i])
                                }
                                l()
                            }, f)
                        }, f)
                    } catch (e) {
                        if (is_function(C.exceptionHandler)) {
                            C.exceptionHandler.call(g, e, "TERMINAL (echo)")
                        } else {
                            alert_exception("[Terminal.echo]", e)
                        }
                    }
                }
                var i = r && r.typing;
                if (We) {
                    var u = [e, r];
                    if (i) {
                        u.push(s)
                    }
                    a.push(u)
                } else {
                    n(e)
                }
                if (i) {
                    return s.promise()
                }
                return g
            },
            typing: function(t, e, n, r) {
                var i = new $.Deferred;
                var u;
                var a;
                if (typeof r === "object") {
                    a = r.finalize || $.noop;
                    u = $.extend({}, r, {
                        delay: e,
                        finalize: o
                    })
                } else {
                    a = r || $.noop;
                    u = {
                        delay: e,
                        finalize: o
                    }
                }

                function o() {
                    i.resolve();
                    if (is_function(a)) {
                        a.apply(g, arguments)
                    }
                }
                var s = ["prompt", "echo", "enter", "insert"];

                function l() {
                    return s.indexOf(t) >= 0
                }
                p(function e() {
                    if (l()) {
                        if (t === "prompt") {
                            Ae(n, u)
                        } else if (t === "echo") {
                            Te(n, u)
                        } else if (t === "enter") {
                            with_prompt(g.get_prompt(), function(e) {
                                Se(e, n, u)
                            }, g)
                        } else if (t === "insert") {
                            with_prompt(g.get_prompt(), function(e) {
                                Be(e, n, u)
                            }, g)
                        }
                    } else {
                        i.reject("Invalid type only `echo` and `prompt` are supported")
                    }
                });
                return i.promise()
            },
            error: function(e, t) {
                t = $.extend({}, t, {
                    raw: false,
                    formatters: false
                });

                function n(e) {
                    if (typeof e !== "string") {
                        e = String(e)
                    }
                    var t = $.terminal.escape_brackets(e).replace(/\\$/, "&#92;").replace(url_re, "]$1[[;;;terminal-error]");
                    return "[[;;;terminal-error]" + t + "]"
                }
                if (typeof e === "function") {
                    return g.echo(function() {
                        return n(e.call(g))
                    }, t)
                }
                if (e && e.then) {
                    e.then(function(e) {
                        g.echo(n(e))
                    }).catch(le("Echo Error"));
                    return g
                }
                return g.echo(n(e), t)
            },
            exception: function(r, e) {
                var t = exception_message(r);
                if (e) {
                    t = "&#91;" + e + "&#93;: " + t
                }
                if (t) {
                    g.error(t, {
                        finalize: function(e) {
                            e.addClass("terminal-exception terminal-message")
                        },
                        keepWords: true
                    })
                }
                if (typeof r.fileName === "string") {
                    var i = g.paused();
                    if (!i) {
                        g.pause(C.softPause)
                    }
                    $.get(r.fileName, function(e) {
                        var t = r.lineNumber - 1;
                        var n = e.split("\n")[t];
                        if (n) {
                            g.error("[" + r.lineNumber + "]: " + n)
                        }
                        if (!i) {
                            g.resume()
                        }
                    }, "text")
                }
                if (r.stack) {
                    g.echo(format_stack_trace(r.stack), {
                        finalize: function(e) {
                            e.addClass("terminal-exception terminal-stack-trace")
                        },
                        formatters: false
                    })
                }
                return g
            },
            scroll: function(e) {
                var t;
                e = Math.round(e);
                if (g.prop) {
                    if (e > S.prop("scrollTop") && e > 0) {
                        S.prop("scrollTop", 0)
                    }
                    t = S.prop("scrollTop");
                    S.scrollTop(t + e)
                } else {
                    if (e > S.prop("scrollTop") && e > 0) {
                        S.prop("scrollTop", 0)
                    }
                    t = S.prop("scrollTop");
                    S.scrollTop(t + e)
                }
                return g
            },
            logout: function(n) {
                if (b) {
                    throw new Error(sprintf(c().notWhileLogin, "logout"))
                }
                p(function e() {
                    if (n) {
                        var t = Je.pop();
                        g.set_token(undefined, true);
                        g.login.apply(g, t)
                    } else if (A.size() === 1 && g.token()) {
                        g.logout(true)
                    } else {
                        while (A.size() > 1) {
                            if (g.token()) {
                                g.logout(true).pop().pop()
                            } else {
                                g.pop()
                            }
                        }
                    }
                });
                return g
            },
            token: function(e) {
                return r.get(g.prefix_name(e) + "_token")
            },
            set_token: function(e, t) {
                var n = g.prefix_name(t) + "_token";
                if (typeof e === "undefined") {
                    r.remove(n)
                } else {
                    r.set(n, e)
                }
                return g
            },
            get_token: function(e) {
                return g.token(e)
            },
            login_name: function(e) {
                return r.get(g.prefix_name(e) + "_login")
            },
            name: function() {
                return A.top().name
            },
            prefix_name: function(e, t) {
                var n = (C.name ? C.name + "_" : "") + m;
                if (e && A.size() > 1) {
                    var r = A.map(function(e) {
                        return e.name || ""
                    }).slice(1, t).join("_");
                    if (r) {
                        n += "_" + r
                    }
                }
                return n
            },
            read: function(e, t, n) {
                var r;
                if (typeof arguments[1] === "object") {
                    r = $.extend({
                        typing: false,
                        delay: C.execAnimationDelay,
                        success: $.noop,
                        cancel: $.noop
                    }, arguments[1])
                } else {
                    r = {
                        typing: false,
                        success: t || $.noop,
                        cancel: n || $.noop
                    }
                }
                if (r.typing) {
                    var i = g.get_prompt();
                    r.typing = false;
                    return g.typing("prompt", r.delay, e).then(function() {
                        return g.set_prompt(i).read(e, r)
                    })
                }
                Ue = true;
                var u = jQuery.Deferred();
                var a = false;
                g.push(function(e) {
                    a = true;
                    u.resolve(e);
                    if (is_function(r.success)) {
                        r.success(e)
                    }
                    g.pop();
                    if (C.history) {
                        B.history().enable()
                    }
                }, {
                    name: "read",
                    history: false,
                    prompt: e || "",
                    onExit: function() {
                        if (!a) {
                            u.reject();
                            if (is_function(r.cancel)) {
                                r.cancel()
                            }
                        }
                    }
                });
                if (C.history) {
                    B.history().disable()
                }
                if (is_function(r.onReady)) {
                    r.onReady.call(g)
                }
                return u.promise()
            },
            push: function(a, o) {
                l(function e() {
                    o = o || {};
                    var t = {
                        infiniteLogin: false
                    };
                    var r = $.extend({}, t, o);
                    if (!r.name && d) {
                        r.name = d.name
                    }
                    if (r.prompt === undefined) {
                        r.prompt = (r.name || ">") + " "
                    }
                    var n = A.top();
                    if (n) {
                        n.mask = B.mask()
                    }
                    var i = k;

                    function u() {
                        v("onPush", [n, A.top()]);
                        ve()
                    }
                    G(a, o.login, function(e) {
                        A.push($.extend({}, e, r));
                        if (r.completion === true) {
                            if ($.isArray(e.completion)) {
                                A.top().completion = e.completion
                            } else if (!e.completion) {
                                A.top().completion = false
                            }
                        }
                        if (r.login) {
                            var t;
                            var n = get_type(r.login);
                            if (n === "function") {
                                t = r.infiniteLogin ? $.noop : g.pop;
                                g.login(r.login, r.infiniteLogin, u, t)
                            } else if (get_type(a) === "string" && n === "string" || n === "boolean") {
                                t = r.infiniteLogin ? $.noop : g.pop;
                                g.login(X(a, r.login), r.infiniteLogin, u, t)
                            }
                        } else {
                            u()
                        }
                        if (!i && g.enabled()) {
                            g.resume()
                        }
                    })
                });
                return g
            },
            pop: function(e, t) {
                if (e !== undefined) {
                    h(e)
                }
                var n = g.token(true);
                var r;
                if (A.size() === 1) {
                    r = A.top();
                    if (C.login) {
                        if (!t) {
                            v("onPop", [r, null])
                        }
                        De();
                        v("onExit")
                    } else {
                        g.error(c().canExitError)
                    }
                } else {
                    if (n) {
                        de()
                    }
                    var i = A.pop();
                    r = A.top();
                    ve();
                    g.set_mask(r.mask);
                    if (!t) {
                        v("onPop", [i, r])
                    }
                    if (b && g.get_prompt() !== c().login + ": ") {
                        b = false
                    }
                    if (is_function(i.onExit)) {
                        try {
                            i.onExit.call(g, g)
                        } catch (e) {
                            i.onExit = $.noop;
                            D(e, "onExit")
                        }
                    }
                }
                return g
            },
            option: function(e, t) {
                if (typeof t === "undefined") {
                    if (typeof e === "string") {
                        return C[e]
                    } else if (typeof e === "object") {
                        $.each(e, function(e, t) {
                            C[e] = t
                        })
                    }
                } else {
                    C[e] = t;
                    if (e.match(/^num(Chars|Rows)$/)) {
                        re()
                    }
                }
                return g
            },
            invoke_key: function(e) {
                B.invoke_key(e);
                return g
            },
            keymap: function(e, n) {
                if (arguments.length === 0) {
                    return B.keymap()
                }
                if (typeof n === "undefined") {
                    if (typeof e === "string") {
                        return B.keymap(e)
                    } else if ($.isPlainObject(e)) {
                        e = $.extend({}, P, $.omap(e || {}, function(n, r) {
                            if (!P[n]) {
                                return r.bind(g)
                            }
                            return function(e, t) {
                                return r.call(g, e, function() {
                                    return P[n](e, t)
                                })
                            }
                        }));
                        B.keymap(null).keymap(e)
                    }
                } else if (typeof n === "function") {
                    var r = e;
                    if (!P[r]) {
                        B.keymap(r, n.bind(g))
                    } else {
                        B.keymap(r, function(e, t) {
                            return n.call(g, e, function() {
                                return P[r](e, t)
                            })
                        })
                    }
                }
            },
            level: function() {
                return A.size()
            },
            reset: function() {
                p(function e() {
                    g.clear();
                    while (A.size() > 1) {
                        A.pop()
                    }
                    Ce()
                });
                return g
            },
            purge: function() {
                p(function e() {
                    var t = g.prefix_name() + "_";
                    var n = r.get(t + "interpreters");
                    if (n) {
                        $.each(JSON.parse(n), function(e, t) {
                            r.remove(t + "_commands");
                            r.remove(t + "_token");
                            r.remove(t + "_login")
                        })
                    }
                    B.purge();
                    r.remove(t + "interpreters")
                });
                return g
            },
            destroy: function() {
                p(function e() {
                    B.destroy().remove();
                    g.resizer("unbind");
                    g.touch_scroll("unbind");
                    st.resizer("unbind").remove();
                    lt.resizer("unbind").remove();
                    $(document).unbind(".terminal_" + g.id());
                    $(window).unbind(".terminal_" + g.id());
                    g.unbind("click mousedown mouseup");
                    g.removeData("terminal").removeClass("terminal").unbind(".terminal");
                    if (C.width) {
                        g.css("width", "")
                    }
                    if (C.height) {
                        g.css("height", "")
                    }
                    $(window).off("blur", dt).off("focus", mt);
                    g.find(".terminal-fill, .terminal-font, .terminal-font-forcer").remove();
                    g.stopTime();
                    terminals.remove(m);
                    if (T) {
                        if (T.unobserve) {
                            T.unobserve(g[0])
                        } else {
                            clearInterval(T)
                        }
                    }
                    var t = g.find(".terminal-scroll-marker");
                    if (Ze) {
                        Ze.unobserve(t[0])
                    }
                    t.remove();
                    if (ot) {
                        ot.disconnect()
                    }
                    if (!terminals.length()) {
                        $(window).off("hashchange")
                    }
                    if (is_mobile) {
                        g.off(["touchstart.terminal", "touchmove.terminal", "touchend.terminal"].join(" "))
                    }
                    y.remove();
                    S.remove();
                    if (Pe) {
                        var n = $(Pe);
                        if (n.attr("class") === "full-screen-terminal") {
                            n.removeAttr("class")
                        } else {
                            n.removeClass("full-screen-terminal")
                        }
                        g.remove()
                    }
                    it = true
                });
                return g
            },
            scroll_to: function(e) {
                var t = S.scrollTop() - g.offset().top + $(e).offset().top;
                S.scrollTop(t);
                return g
            },
            scroll_to_bottom: function() {
                var e;
                if (g.prop) {
                    e = S.prop("scrollHeight")
                } else {
                    e = S.attr("scrollHeight")
                }
                S.scrollTop(e);
                return g
            },
            is_bottom: function() {
                if (C.scrollBottomOffset === -1) {
                    return false
                } else if (typeof Xe === "boolean") {
                    return Xe
                } else {
                    var e, t, n;
                    e = S[0].scrollHeight;
                    t = S[0].scrollTop;
                    n = S[0].offsetHeight;
                    var r = e - C.scrollBottomOffset;
                    return t + n > r
                }
            },
            duplicate: function() {
                var e = $(g);
                return $.extend(e, Me)
            },
            get_output_buffer: function(e) {
                var r = $.extend({
                    html: false
                }, e);
                var i = [];
                var u = false;
                F.forEach(function(e) {
                    if (e) {
                        if (is_function(e.finalize)) {
                            u = !e.newline
                        } else {
                            var t;
                            if (r.html) {
                                t = e.line
                            } else {
                                t = e.raw
                            }
                            if (u) {
                                var n = i.length - 1;
                                i[n] += t
                            } else {
                                i.push(t)
                            }
                        }
                    }
                });
                if (r.html) {
                    return i.map(function(e) {
                        return "<div>" + e + "</div>"
                    }).join("\n")
                }
                return i.join("\n")
            },
            clear_buffer: function() {
                F.clear();
                return g
            }
        }, function(t, e) {
            return function() {
                if (it) {
                    if (!C.exceptionHandler) {
                        throw new $.terminal.Exception(c().defunctTerminal)
                    }
                }
                try {
                    return e.apply(g, [].slice.apply(arguments))
                } catch (e) {
                    if (t !== "exec" && t !== "resume") {
                        D(e, e.type || "TERMINAL", true)
                    }
                    if (!C.exceptionHandler) {
                        throw e
                    }
                }
            }
        });
        $.extend(g, Me);
        if (g.length === 0) {
            var He = sprintf(c().invalidSelector);
            throw new $.terminal.Exception(He)
        }
        g.data("terminal", g);
        var a = [];
        var We = false;
        var d;
        var _;
        var qe = 0;
        var y;
        var m = terminals.length();
        var Ue = false;
        var u;
        var o;
        var Ke;
        var Je = new Stack;
        var Qe = new DelayQueue;
        var Ye = false;
        var Ve = false;
        var Ge = new DelayQueue;
        var p = Le(Ge);
        var l = Le(Qe);
        var Xe;
        var Ze;
        var b = false;
        var et = $.noop;
        var tt, nt;
        var rt = [];
        var C = $.extend({}, $.terminal.defaults, {
            name: g.selector,
            exit: !!(t && t.login || !t)
        }, t || {});
        if (typeof C.width === "number") {
            g.width(C.width)
        }
        if (typeof C.height === "number") {
            g.height(C.height)
        }
        delete C.formatters;
        var it = false;
        var F = new FormatBuffer(function(e) {
            return {
                linksNoReferrer: C.linksNoReferrer,
                linksNoFollow: C.linksNoFollow,
                anyLinks: C.anyLinks,
                charWidth: L.width,
                useCache: C.useCache,
                escape: false,
                allowedAttributes: e.allowedAttributes || []
            }
        });
        var w = new OutputLines(function() {
            return C
        });
        var r = new n(C.memory);
        var E = C.enabled;
        var x = false;
        var k = false;
        var ut = true;
        var A;
        var B;
        var at;
        var T;
        var ot;
        if (C.ignoreSystemDescribe === true) {
            C.describe = false
        }
        $(document).bind("ajaxSend.terminal_" + g.id(), function(e, t) {
            requests.push(t)
        });
        var S = $('<div class="terminal-scroller"/>').appendTo(g);
        var R = $('<div class="terminal-wrapper"/>').appendTo(S);
        $(broken_image).hide().appendTo(R);
        var st = $('<div class="terminal-font">&nbsp;</div>').appendTo(g);
        var lt = $('<div class="terminal-pixel"/>').appendTo(g);
        var j = $('<div class="terminal-fill"/>').appendTo(S);
        y = $("<div>").addClass("terminal-output").attr("role", "log").appendTo(R);
        g.addClass("terminal");
        var O = Dt();
        var L = get_char_size(g);
        var ft = !terminal_ready(g);
        if (C.login && v("onBeforeLogin") === false) {
            ut = false
        }
        var ct;
        if (typeof e === "string") {
            ct = e
        } else if (is_array(e)) {
            for (var z = 0, pt = e.length; z < pt; ++z) {
                if (typeof e[z] === "string") {
                    ct = e[z];
                    break
                }
            }
        }
        var I;
        if (is_function(C.login)) {
            I = C.login
        } else if (ct && (typeof C.login === "string" || C.login === true)) {
            I = X(ct, C.login)
        }
        terminals.append(g);

        function mt() {
            if (at) {
                g.focus();
                g.scroll_to_bottom()
            }
        }

        function Dt() {
            var e = lt[0].getBoundingClientRect();
            return e.width || 1
        }

        function dt() {
            at = E;
            g.disable().find(".cmd textarea").trigger("blur", [true])
        }

        function ht(e) {
            if (is_function(e)) {
                e = e()
            }
            if (e && is_function(e.then)) {
                return e.then(ht)
            }
            if (get_type(e) !== "string") {
                if (is_function(C.parseObject)) {
                    var t = C.parseObject(e);
                    if (get_type(t) === "string") {
                        e = t
                    }
                } else if (is_array(e)) {
                    e = $.terminal.columns(e, g.cols(), C.tabs)
                } else {
                    e = String(e)
                }
            }
            return e
        }

        function vt(t) {
            if (t.proxy) {
                return t
            }
            var e = function(e) {
                return t.call(g, e, g)
            };
            e.proxy = true;
            return e
        }

        function gt(e) {
            e = e.originalEvent;

            function t(e, t) {
                return e.type.indexOf(t) !== -1
            }

            function i(e) {
                g.echo('<img src="' + e + '"/>', {
                    raw: true
                })
            }

            function u(e) {
                var t = window.URL || window.webkitURL;
                return t.createObjectURL(e)
            }

            function a(e, t) {
                if (!t) {
                    var n = {
                        target: g
                    };
                    if (typeof e === "string") {
                        n.text = e
                    } else if (e instanceof Blob) {
                        n.image = u(e)
                    }
                    var r = v("onPaste", [n]);
                    if (r) {
                        if (is_function(r.then || r.done)) {
                            return (r.then || r.done).call(r, function(e) {
                                a(e, true)
                            })
                        } else {
                            a(r, true)
                        }
                    } else if (r !== false) {
                        a(n.image || n.text, true)
                    }
                } else if (e instanceof Blob) {
                    i(u(e))
                } else if (typeof e === "string") {
                    if (e.match(/^(data:|blob:)/)) {
                        i(e)
                    } else {
                        g.insert(e)
                    }
                }
            }
            if (e.clipboardData) {
                if (g.enabled()) {
                    var n = e.clipboardData.items;
                    if (n) {
                        for (var r = 0; r < n.length; r++) {
                            if (t(n[r], "image") && C.pasteImage) {
                                var o = n[r].getAsFile();
                                a(o)
                            } else if (t(n[r], "text/plain")) {
                                n[r].getAsString(function(e) {
                                    a(e.replace(/\r/g, ""))
                                })
                            }
                        }
                    } else if (e.clipboardData.getData) {
                        var s = e.clipboardData.getData("text/plain");
                        a(s.replace(/\r/g, ""))
                    }
                    return false
                }
            }
        }
        $(document).on("paste.terminal_" + g.id(), gt);
        var P = $.extend({}, Ee, $.omap(C.keymap || {}, function(n, r) {
            if (!Ee[n]) {
                return r.bind(g)
            }
            return function(e, t) {
                return r.call(g, e, function() {
                    return Ee[n](e, t)
                })
            }
        }));
        G(e, C.login, function(e) {
            if (C.completion && typeof C.completion !== "boolean" || !C.completion) {
                e.completion = "settings"
            }
            var t = C.prompt;
            if (is_function(t)) {
                t = vt(t)
            }
            A = new Stack($.extend({}, C.extra, {
                name: C.name,
                prompt: t,
                keypress: C.keypress,
                keydown: C.keydown,
                resize: C.onResize,
                greetings: C.greetings,
                mousewheel: C.mousewheel,
                history: C.history,
                keymap: P
            }, e));
            B = $("<div/>").appendTo(R).cmd({
                tabindex: C.tabindex,
                mobileDelete: C.mobileDelete,
                mobileIngoreAutoSpace: C.mobileIngoreAutoSpace,
                prompt: I ? false : t,
                history: C.memory ? "memory" : C.history,
                historyFilter: C.historyFilter,
                historySize: C.historySize,
                caseSensitiveSearch: C.caseSensitiveSearch,
                onPaste: C.onPaste,
                width: "100%",
                enabled: false,
                charWidth: L.width,
                keydown: xe,
                keymap: P,
                clickTimeout: C.clickTimeout,
                holdTimeout: C.holdTimeout,
                holdRepeatTimeout: C.holdRepeatTimeout,
                repeatTimeoutKeys: C.repeatTimeoutKeys,
                allowedAttributes: C.allowedAttributes,
                keypress: $e,
                tabs: C.tabs,
                onPositionChange: function() {
                    var e = [].slice.call(arguments);
                    _e();
                    v("onPositionChange", e)
                },
                onCommandChange: function(e) {
                    if (tt !== j.width()) {
                        g.resizer()
                    }
                    v("onCommandChange", [e]);
                    _e()
                },
                commands: me
            });

            function n(e) {
                if (is_mobile) {
                    return
                }
                e = e.originalEvent;
                if (e) {
                    var t = document.elementFromPoint(e.clientX, e.clientY);
                    if (!$(t).closest(".terminal").length && g.enabled()) {
                        g.disable()
                    }
                }
            }
            g.oneTime(100, function() {
                $(document).bind("click.terminal_" + g.id(), n).bind("contextmenu.terminal_" + g.id(), n)
            });
            var r = $(window);
            document.addEventListener("resume", function() {
                g.disable()
            });
            if (is_mobile) {
                (function() {
                    g.addClass("terminal-mobile");
                    var i;
                    var u;
                    var n;
                    var a = 3;
                    var e = B.clip();
                    var r = 200;
                    var o;
                    e.$node.off("touchstart.cmd");
                    g.on("touchstart.terminal", function(e) {
                        e = e.originalEvent;
                        window.touch_event = e;
                        if (e.target.tagName.toLowerCase() === "a") {
                            return
                        }
                        if (!x && e.touches.length === 1) {
                            n = g.enabled();
                            var t = e.touches[0];
                            i = {
                                x: t.clientX,
                                y: t.clientY
                            };
                            o = setTimeout(function() {
                                i = null
                            }, r)
                        }
                    }).on("touchmove.terminal", function(e) {
                        if (e.touches.length === 1 && i) {
                            var t = e.touches[0];
                            var n = Math.abs(t.clientX - i.x);
                            var r = Math.abs(t.clientY - i.y);
                            if (n > a || r > a) {
                                u = true
                            }
                        }
                    }).on("touchend.terminal", function() {
                        if (i) {
                            clearTimeout(o);
                            if (!u) {
                                if (!n) {
                                    e.focus();
                                    g.focus()
                                } else {
                                    e.blur();
                                    g.disable()
                                }
                            }
                        }
                        u = false;
                        i = null
                    })
                })()
            } else {
                r.on("focus.terminal_" + g.id(), mt).on("blur.terminal_" + g.id(), dt);
                var h;
                (function() {
                    var t = 0;
                    var n;
                    var r = "click_" + g.id();
                    var i = g.find(".cmd textarea");

                    function u() {
                        if (n.is(".terminal") || n.is(".terminal-scroller") || n.is(".terminal-wrapper")) {
                            var e = g.get_command().length;
                            g.set_position(e)
                        } else if (n.closest(".cmd-prompt").length) {
                            g.set_position(0)
                        }
                        if (!i.is(":focus")) {
                            i.focus()
                        }
                        a()
                    }

                    function a() {
                        t = 0;
                        n = null
                    }
                    var o = ".terminal-output textarea," + ".terminal-output input";
                    g.mousedown(function(e) {
                        if (!scrollbar_event(e, j, O)) {
                            n = $(e.target)
                        }
                    }).mouseup(function() {
                        if (h) {
                            h = false;
                            return
                        }
                        if (n && n.closest(o).length) {
                            if (E) {
                                g.disable()
                            }
                        } else if (get_selected_html() === "" && n) {
                            if (++t === 1) {
                                if (!x) {
                                    if (!E) {
                                        g.focus();
                                        g.scroll_to_bottom()
                                    } else {
                                        var e = C.clickTimeout;
                                        g.oneTime(e, r, u);
                                        return
                                    }
                                }
                            } else {
                                g.stopTime(r)
                            }
                        }
                        a()
                    }).dblclick(function() {
                        a();
                        g.stopTime(r)
                    })
                })();
                (function() {
                    var D = B.clip().$node;

                    function d(e) {
                        return e.type === "mousedown" && e.buttons === 2 || e.type === "contextmenu"
                    }
                    var e;
                    if ("oncontextmenu" in window) {
                        e = "contextmenu.terminal"
                    } else {
                        e = "mousedown.terminal"
                    }
                    g.on(e, function(e) {
                        h = get_selected_html() === "" && d(e) && !e.ctrlKey;
                        if (h) {
                            var t = $(e.target);
                            if (t.is("img,value,audio,object,canvas,a")) {
                                return
                            }
                            if (!g.enabled()) {
                                g.enable()
                            }
                            var n = B.offset();
                            var r = B[0].getBoundingClientRect();
                            var i = g.offset();
                            var u = i.top - n.top;
                            var a = Math.max(e.pageY - n.top - 20, u);
                            var o = e.pageX - n.left - 20;
                            var s = 4 * 14;
                            var l = 5 * 14;
                            var f = g[0].getBoundingClientRect();
                            var c = j.outerWidth() * O;
                            var p = a + r.top + s;
                            p = p - f.height - f.top;
                            var m = o + r.left + l;
                            m = m - c - f.left;
                            if (p > 0) {
                                s -= Math.ceil(p)
                            }
                            if (m > 0) {
                                l -= Math.ceil(m)
                            }
                            D.attr("style", [style_prop("left", o, true), style_prop("top", a, true), style_prop("width", l, true), style_prop("height", s, true)].join(";"));
                            if (!D.is(":focus")) {
                                D.focus()
                            }
                            g.stopTime("textarea");
                            g.oneTime(100, "textarea", function() {
                                var e = {
                                    left: "",
                                    top: "",
                                    width: "",
                                    height: ""
                                };
                                if (!is_css_variables_supported) {
                                    var t = g.find(".cmd .cmd-cursor-line").prevUntil(".cmd-prompt").length;
                                    e.top = t * 14 + "px"
                                }
                                D.css(e)
                            });
                            g.stopTime("selection");
                            g.everyTime(20, "selection", function() {
                                if (D[0].selection !== D[0].value) {
                                    if (get_textarea_selection(D[0])) {
                                        clear_textarea_selection(D[0]);
                                        select(g.find(".terminal-output")[0], g.find(".cmd div:last-of-type")[0]);
                                        g.stopTime("selection")
                                    }
                                }
                            })
                        }
                    })
                })();
                g.on("scroll", function() {
                    var e = g.find("textarea");
                    var t = g[0].getBoundingClientRect();
                    var n = g[0].scrollHeight;
                    var r = S.scrollTop();
                    var i = n - (r + t.height);
                    if (i === 0) {
                        e.css("top", "")
                    } else {
                        e.css("top", -i)
                    }
                })
            }
            g.on("click", "a", function(e) {
                var t = $(this);
                if (t.closest(".terminal-exception").length) {
                    var n = t.attr("href");
                    if (n.match(/:[0-9]+$/)) {
                        e.preventDefault();
                        U(n, g.cols())
                    }
                }
                if (E) {
                    g.find(".cmd textarea").focus()
                }
            });

            function i() {
                var e = L.width;
                L = get_char_size(g);
                if (e !== L.width) {
                    B.option("charWidth", L.width).refresh()
                }
            }
            u();

            function u() {
                if (g.is(":visible")) {
                    var e = S.width();
                    var t = j.height();
                    var n = Dt();
                    css(g[0], {
                        "--pixel-density": n
                    });
                    if (ft) {
                        ft = !terminal_ready(g);
                        if (!ft) {
                            L = get_char_size(g);
                            i()
                        }
                    }
                    if (nt !== t || tt !== e || O !== n) {
                        g.resize()
                    }
                    nt = t;
                    tt = e;
                    O = n
                }
            }

            function a() {
                var e = {
                    prefix: "terminal-"
                };
                g.resizer("unbind").resizer(u, e);
                st.resizer("unbind").resizer(function() {
                    i();
                    g.resize()
                }, e);
                lt.resizer("unbind").resizer(function() {
                    O = Dt();
                    g.resize()
                }, e);
                $('<div class="terminal-font-forcer terminal-hidden">x<div>').appendTo(g)
            }

            function o(e) {
                Xe = e[0].intersectionRatio >= .9
            }

            function s() {
                if (window.IntersectionObserver) {
                    var e = $('<div class="terminal-scroll-marker"/>').appendTo(S);
                    var t = e;
                    if (C.scrollBottomOffset !== -1) {
                        var n = style_prop("height", C.scrollBottomOffset);
                        t = $('<div style="' + n + '"/>').appendTo(e)
                    }
                    Ze = new IntersectionObserver(o, {
                        root: S[0],
                        rootMargin: "0px",
                        threshold: 1
                    });
                    Ze.observe(t[0])
                }
            }
            s();
            if (g.is(":visible")) {
                a()
            }

            function l() {
                if (T) {
                    if (T.unobserve) {
                        T.unobserve(g[0])
                    } else {
                        clearInterval(T)
                    }
                }
                var e = g.enabled();
                var t = g.is(":visible");
                if (e && !t) {
                    g.disable()
                }
                if (t) {
                    a()
                } else {
                    R.css("visibility", "hidden")
                }

                function n() {
                    if (g.is(":visible") && !t) {
                        t = true;
                        a();
                        i();
                        u();
                        if (e) {
                            g.enable()
                        }
                        R.css("visibility", "")
                    } else if (t && !g.is(":visible")) {
                        t = false;
                        e = $.terminal.active() === g && g.enabled();
                        g.disable();
                        R.css("visibility", "hidden")
                    }
                }
                if (window.IntersectionObserver && g.css("position") !== "fixed") {
                    T = new IntersectionObserver(n, {
                        root: null
                    });
                    T.observe(g[0])
                } else {
                    T = setInterval(n, 100)
                }
            }
            var f = !!g.closest("body").length;
            var c = window.MutationObserver || window.WebKitMutationObserver;
            if (c) {
                ot = new c(function() {
                    if (g.closest("body").length) {
                        if (!f) {
                            g.scroll_to_bottom();
                            l();
                            u()
                        }
                        f = true
                    } else if (f) {
                        f = false
                    }
                });
                ot.observe(document.body, {
                    childList: true
                })
            }
            if (f) {
                l()
            }
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(function() {
                    if (have_custom_font(g)) {
                        i();
                        g.resize()
                    }
                    Qe.resolve()
                })
            } else {
                Qe.resolve()
            }
            if (E && g.is(":visible") && !is_mobile) {
                g.focus(undefined, true)
            } else {
                g.disable()
            }
            if (is_function(I)) {
                g.login(I, true, Ce)
            } else {
                Ce()
            }

            function p(e, t) {
                var n = terminals.get()[e[0]];
                var r = $.Deferred();
                if (n && m === n.id()) {
                    if (!e[2]) {
                        r.resolve();
                        return r.promise()
                    } else if (k) {
                        pe.push(function() {
                            return n.exec(e[2], t).done(function() {
                                n.save_state(e[2], true, e[1]);
                                r.resolve()
                            })
                        });
                        return r.promise()
                    } else {
                        return n.exec(e[2], t).done(function() {
                            n.save_state(e[2], true, e[1])
                        })
                    }
                }
            }
            if (C.execHash) {
                if (location.hash) {
                    setTimeout(function() {
                        try {
                            var e = location.hash.replace(/^#/, "");
                            hash_commands = JSON.parse(decodeURIComponent(e));
                            if (!e.match(/\[/)) {
                                ye(hash_commands)
                            }
                            var n = 0;
                            var r = {
                                typing: C.execAnimation,
                                delay: C.execAnimationDelay
                            };
                            (function e() {
                                var t = hash_commands[n++];
                                if (t) {
                                    p(t, r).done(e)
                                } else {
                                    change_hash = true
                                }
                            })()
                        } catch (e) {}
                    })
                } else {
                    change_hash = true
                }
            } else {
                change_hash = true
            }(function() {
                var i = false;
                $(document).bind("keydown.terminal_" + g.id(), function(e) {
                    if (e.shiftKey) {
                        i = true
                    }
                }).bind("keyup.terminal_" + g.id(), function(e) {
                    if (e.shiftKey || e.which === 16) {
                        i = false
                    }
                });

                function n(e, t) {
                    if (!i) {
                        var n = A.top();
                        var r;
                        if (is_function(n.mousewheel)) {
                            r = n.mousewheel(e, t, g)
                        } else if (is_function(C.mousewheel)) {
                            r = C.mousewheel(e, t, g)
                        }
                        if (r === true) {
                            return
                        }
                        if ((oe() || r === false) && !e.ctrlKey) {
                            e.stopPropagation();
                            e.preventDefault()
                        }
                        if (r === false) {
                            return false
                        }
                        if (t > 0) {
                            g.scroll(-40)
                        } else {
                            g.scroll(40)
                        }
                    }
                }
                if ($.event.special.mousewheel) {
                    S.on("mousewheel", n)
                } else {
                    var r;
                    var e = document.createElement("div");
                    if ("onwheel" in e) {
                        r = "wheel"
                    } else if (document.onmousewheel !== undefined) {
                        r = "mousewheel"
                    } else {
                        r = "DOMMouseScroll"
                    }
                    e = null;
                    g.on(r, function(e) {
                        var t;
                        if (r === "mousewheel") {
                            t = -1 / 40 * e.originalEvent.wheelDelta
                        } else {
                            t = e.originalEvent.deltaY || e.originalEvent.detail
                        }
                        n(e, -t)
                    })
                }
                S.touch_scroll(function(e) {
                    var t = e.current.clientY - e.previous.clientY;
                    var n;
                    var r = A.top();
                    if (is_function(r.touchscroll)) {
                        n = r.touchscroll(e, t, g)
                    } else if (is_function(C.touchscroll)) {
                        n = C.touchscroll(e, t, g)
                    }
                    css(g[0], {
                        "--terminal-scroll": g.prop("scrollTop")
                    });
                    if (n === true) {
                        return
                    }
                    return false
                })
            })()
        });
        return g
    }
});
//# sourceMappingURL=jquery.terminal.min.js.map
