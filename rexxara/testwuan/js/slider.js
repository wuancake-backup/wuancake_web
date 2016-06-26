var STK = (function() {
    var a = {};
    var b = [];
    a.inc = function(d, c) {
        return true
    };
    a.register = function(e, c) {
        var g = e.split(".");
        var f = a;
        var d = null;
        while (d = g.shift()) {
            if (g.length) {
                if (f[d] === undefined) {
                    f[d] = {}
                }
                f = f[d]
            } else {
                if (f[d] === undefined) {
                    try {
                        f[d] = c(a)
                    } catch (h) {}
                }
            }
        }
    };
    a.regShort = function(c, d) {
        if (a[c] !== undefined) {
            throw "[" + c + "] : short : has been register"
        }
        a[c] = d
    };
    a.IE = /msie/i.test(navigator.userAgent);
    a.E = function(c) {
        if (typeof c === "string") {
            return document.getElementById(c)
        } else {
            return c
        }
    };
    a.C = function(c) {
        var d;
        c = c.toUpperCase();
        if (c == "TEXT") {
            d = document.createTextNode("")
        } else {
            if (c == "BUFFER") {
                d = document.createDocumentFragment()
            } else {
                d = document.createElement(c)
            }
        }
        return d
    };
    a.log = function(c) {
        b.push("[" + (new Date()).toString() + "]: " + c)
    };
    a.getErrorLogInformationList = function(c) {
        return b.splice(0, c || b.length)
    };
    return a
})();
$Import = STK.inc;
STK.register("core.ani.algorithm", function(b) {
    var a = {
        linear: function(f, e, j, h, g) {
            return j * f / h + e
        },
        easeincubic: function(f, e, j, h, g) {
            return j * (f /= h) * f * f + e
        },
        easeoutcubic: function(f, e, j, h, g) {
            if ((f /= h / 2) < 1) {
                return j / 2 * f * f * f + e
            }
            return j / 2 * ((f -= 2) * f * f + 2) + e
        },
        easeinoutcubic: function(f, e, j, h, g) {
            if (g == undefined) {
                g = 1.70158
            }
            return j * (f /= h) * f * ((g + 1) * f - g) + e
        },
        easeinback: function(f, e, j, h, g) {
            if (g == undefined) {
                g = 1.70158
            }
            return j * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + e
        },
        easeoutback: function(f, e, j, h, g) {
            if (g == undefined) {
                g = 1.70158
            }
            return j * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + e
        },
        easeinoutback: function(f, e, j, h, g) {
            if (g == undefined) {
                g = 1.70158
            }
            if ((f /= h / 2) < 1) {
                return j / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + e
            }
            return j / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + e
        }
    };
    return {
        addAlgorithm: function(c, d) {
            if (a[c]) {
                throw "[core.ani.tweenValue] this algorithm :" + c + "already exist"
            }
            a[c] = d
        },
        compute: function(h, e, d, f, g, c, j) {
            if (typeof a[h] !== "function") {
                throw "[core.ani.tweenValue] this algorithm :" + h + "do not exist"
            }
            return a[h](f, e, d, g, c, j)
        }
    }
});
STK.register("core.obj.parseParam", function(a) {
    return function(d, c, b) {
        var e, f = {};
        c = c || {};
        for (e in d) {
            f[e] = d[e];
            if (c[e] != null) {
                if (b) {
                    if (d.hasOwnProperty[e]) {
                        f[e] = c[e]
                    }
                } else {
                    f[e] = c[e]
                }
            }
        }
        return f
    }
});
STK.register("core.arr.isArray", function(a) {
    return function(b) {
        return Object.prototype.toString.call(b) === "[object Array]"
    }
});
STK.register("core.func.timedChunk", function(b) {
    var a = {
        process: function(c) {
            if (typeof c === "function") {
                c()
            }
        },
        context: {},
        callback: null,
        delay: 25,
        execTime: 50
    };
    return function(e, g) {
        if (!b.core.arr.isArray(e)) {
            throw "core.func.timedChunk need an array as first parameter"
        }
        var c = e.concat();
        var f = b.core.obj.parseParam(a, g);
        var h = null;
        var d = function() {
            var j = +new Date();
            do {
                f.process.call(f.context, c.shift())
            } while (c.length > 0 && (+new Date() - j < f.execTime));
            if (c.length <= 0) {
                if (f.callback) {
                    f.callback(e)
                }
            } else {
                setTimeout(arguments.callee, f.delay)
            }
        };
        h = setTimeout(d, f.delay)
    }
});
STK.register("core.func.empty", function() {
    return function() {}
});
STK.register("core.ani.tweenArche", function(a) {
    return function(n, o) {
        var h, g, f, c, d, b, j, e;
        g = {};
        h = a.core.obj.parseParam({
            animationType: "linear",
            distance: 1,
            duration: 500,
            callback: a.core.func.empty,
            algorithmParams: {},
            extra: 5,
            delay: 25
        }, o);
        var m = function() {
            f = (+new Date() - c);
            if (f < h.duration) {
                d = a.core.ani.algorithm.compute(h.animationType, 0, h.distance, f, h.duration, h.extra, h.algorithmParams);
                n(d);
                b = setTimeout(m, h.delay)
            } else {
                e = "stop";
                h.callback()
            }
        };
        e = "stop";
        g.getStatus = function() {
            return e
        };
        g.play = function() {
            c = +new Date();
            d = null;
            m();
            e = "play";
            return g
        };
        g.stop = function() {
            clearTimeout(b);
            e = "stop";
            return g
        };
        g.resume = function() {
            if (j) {
                c += (+new Date() - j);
                m()
            }
            return g
        };
        g.pause = function() {
            clearTimeout(b);
            j = +new Date();
            e = "pause";
            return g
        };
        g.destroy = function() {
            clearTimeout(b);
            j = 0;
            e = "stop"
        };
        return g
    }
});
STK.register("core.dom.getStyle", function(a) {
    return function(c, f) {
        if (a.IE) {
            switch (f) {
                case "opacity":
                    var h = 100;
                    try {
                        h = c.filters["DXImageTransform.Microsoft.Alpha"].opacity
                    } catch (g) {
                        try {
                            h = c.filters("alpha").opacity
                        } catch (g) {}
                    }
                    return h / 100;
                case "float":
                    f = "styleFloat";
                default:
                    var d = c.currentStyle ? c.currentStyle[f] : null;
                    return (c.style[f] || d)
            }
        } else {
            if (f == "float") {
                f = "cssFloat"
            }
            try {
                var b = document.defaultView.getComputedStyle(c, "")
            } catch (g) {}
            return c.style[f] || b ? b[f] : null
        }
    }
});
STK.register("core.dom.cssText", function(a) {
    return function(e) {
        e = (e || "").replace(/(^[^\:]*?;)|(;[^\:]*?$)/g, "").split(";");
        var g = {},
            c;
        for (var b = 0; b < e.length; b++) {
            c = e[b].split(":");
            g[c[0].toLowerCase()] = c[1]
        }
        var f = [],
            d = {
                push: function(j, h) {
                    g[j.toLowerCase()] = h;
                    return d
                },
                remove: function(h) {
                    h = h.toLowerCase();
                    g[h] && delete g[h];
                    return d
                },
                getCss: function() {
                    var j = [];
                    for (var h in g) {
                        j.push(h + ":" + g[h])
                    }
                    return j.join(";")
                }
            };
        return d
    }
});
STK.register("core.func.getType", function(a) {
    return function(b) {
        var c;
        return ((c = typeof(b)) == "object" ? b == null && "null" || Object.prototype.toString.call(b).slice(8, -1) : c).toLowerCase()
    }
});
STK.register("core.arr.foreach", function(c) {
    var a = function(j, f) {
        var h = [];
        for (var g = 0, e = j.length; g < e; g += 1) {
            var d = f(j[g], g);
            if (d === false) {
                break
            } else {
                if (d !== null) {
                    h[g] = d
                }
            }
        }
        return h
    };
    var b = function(h, e) {
        var g = {};
        for (var f in h) {
            var d = e(h[f], f);
            if (d === false) {
                break
            } else {
                if (d !== null) {
                    g[f] = d
                }
            }
        }
        return g
    };
    return function(e, d) {
        if (c.core.arr.isArray(e) || (e.length && e[0] !== undefined)) {
            return a(e, d)
        } else {
            if (typeof e === "object") {
                return b(e, d)
            }
        }
        return null
    }
});
STK.register("core.json.merge", function(b) {
    var a = function(d) {
        if (d === undefined) {
            return true
        }
        if (d === null) {
            return true
        }
        if (b.core.arr.inArray(["number", "string", "function"], (typeof d))) {
            return true
        }
        if (b.core.arr.isArray(d)) {
            return true
        }
        if (b.core.dom.isNode(d)) {
            return true
        }
        return false
    };
    var c = function(g, j, f) {
        var h = {};
        for (var e in g) {
            if (j[e] === undefined) {
                h[e] = g[e]
            } else {
                if (!a(g[e]) && !a(j[e]) && f) {
                    h[e] = arguments.callee(g[e], j[e])
                } else {
                    h[e] = j[e]
                }
            }
        }
        for (var d in j) {
            if (h[d] === undefined) {
                h[d] = j[d]
            }
        }
        return h
    };
    return function(d, g, f) {
        var e = b.core.obj.parseParam({
            isDeep: false
        }, f);
        return c(d, g, e.isDeep)
    }
});
STK.register("core.util.color", function(f) {
    var c = /^#([a-fA-F0-9]{3,8})$/;
    var e = /^rgb[a]?\s*\((\s*([0-9]{1,3})\s*,){2,3}(\s*([0-9]{1,3})\s*)\)$/;
    var d = /([0-9]{1,3})/ig;
    var a = /([a-fA-F0-9]{2})/ig;
    var b = f.core.arr.foreach;
    var g = function(m) {
        var h = [];
        var j = [];
        if (c.test(m)) {
            j = m.match(c);
            if (j[1].length <= 4) {
                h = b(j[1].split(""), function(o, n) {
                    return parseInt(o + o, 16)
                })
            } else {
                if (j[1].length <= 8) {
                    h = b(j[1].match(a), function(o, n) {
                        return parseInt(o, 16)
                    })
                }
            }
            return h
        }
        if (e.test(m)) {
            j = m.match(d);
            h = b(j, function(o, n) {
                return parseInt(o, 10)
            });
            return h
        }
        return false
    };
    return function(m, h) {
        var j = g(m);
        if (!j) {
            return false
        }
        var n = {};
        n.getR = function() {
            return j[0]
        };
        n.getG = function() {
            return j[1]
        };
        n.getB = function() {
            return j[2]
        };
        n.getA = function() {
            return j[3]
        };
        return n
    }
});
STK.register("core.ani.tween", function(d) {
    var a = d.core.ani.tweenArche;
    var b = d.core.arr.foreach;
    var g = d.core.dom.getStyle;
    var h = d.core.func.getType;
    var n = d.core.obj.parseParam;
    var m = d.core.json.merge;
    var c = d.core.util.color;
    var f = function(r) {
        var q = /(-?\d\.?\d*)([a-z%]*)/i.exec(r);
        var p = [0, "px"];
        if (q) {
            if (q[1]) {
                p[0] = q[1] - 0
            }
            if (q[2]) {
                p[1] = q[2]
            }
        }
        return p
    };
    var o = function(t) {
        for (var r = 0, p = t.length; r < p; r += 1) {
            var q = t.charCodeAt(r);
            if (q > 64 && q < 90) {
                var u = t.substr(0, r);
                var w = t.substr(r, 1);
                var v = t.slice(r + 1);
                return u + "-" + w.toLowerCase() + v
            }
        }
        return t
    };
    var j = function(u, w, r) {
        var v = g(u, r);
        if (h(v) === "undefined" || v === "auto") {
            if (r === "height") {
                v = u.offsetHeight
            }
            if (r === "width") {
                v = u.offsetWidth
            }
        }
        var q = {
            start: v,
            end: w,
            unit: "",
            key: r,
            defaultColor: false
        };
        if (h(w) === "number") {
            var s = [0, "px"];
            if (h(v) === "number") {
                s[0] = v
            } else {
                s = f(v)
            }
            q.start = s[0];
            q.unit = s[1]
        }
        if (h(w) === "string") {
            var p, t;
            p = c(w);
            if (p) {
                t = c(v);
                if (!t) {
                    t = c("#fff")
                }
                q.start = t;
                q.end = p;
                q.defaultColor = true
            }
        }
        u = null;
        return q
    };
    var e = {
        opacity: function(q, t, p, r) {
            var s = (q * (p - t) + t);
            return {
                filter: "alpha(opacity=" + s * 100 + ")",
                opacity: Math.max(Math.min(1, s), 0)
            }
        },
        defaultColor: function(t, x, q, w) {
            var v = Math.max(0, Math.min(255, Math.ceil((t * (q.getR() - x.getR()) + x.getR()))));
            var u = Math.max(0, Math.min(255, Math.ceil((t * (q.getG() - x.getG()) + x.getG()))));
            var p = Math.max(0, Math.min(255, Math.ceil((t * (q.getB() - x.getB()) + x.getB()))));
            var s = {};
            s[o(key)] = "#" + (v < 16 ? "0" : "") + v.toString(16) + (u < 16 ? "0" : "") + u.toString(16) + (p < 16 ? "0" : "") + p.toString(16);
            return s
        },
        "default": function(s, v, p, t, r) {
            var u = (s * (p - v) + v);
            var q = {};
            q[o(r)] = u + t;
            return q
        }
    };
    return function(r, A) {
        var u, v, p, B, C, z, D, s, t, x;
        A = A || {};
        v = n({
            animationType: "linear",
            duration: 500,
            algorithmParams: {},
            extra: 5,
            delay: 25
        }, A);
        v.distance = 1;
        v.callback = (function() {
            var E = A.end || d.core.func.empty;
            return function() {
                B(1);
                D();
                E(r)
            }
        })();
        p = m(e, A.propertys || {});
        z = null;
        C = {};
        t = [];
        B = function(E) {
            var G = [];
            var F = b(C, function(L, J) {
                var K;
                if (p[J]) {
                    K = p[J]
                } else {
                    if (L.defaultColor) {
                        K = p.defaultColor
                    } else {
                        K = p["default"]
                    }
                }
                var I = K(E, L.start, L.end, L.unit, L.key);
                for (var H in I) {
                    z.push(H, I[H])
                }
            });
            r.style.cssText = z.getCss()
        };
        D = function() {
            var E;
            while (E = t.shift()) {
                try {
                    E.fn();
                    if (E.type === "play") {
                        break
                    }
                    if (E.type === "destroy") {
                        break
                    }
                } catch (F) {}
            }
        };
        x = a(B, v);
        var w = function() {
            if (x.getStatus() !== "play") {
                r = el
            } else {
                t.push({
                    fn: w,
                    type: "setNode"
                })
            }
        };
        var q = function(E) {
            if (x.getStatus() !== "play") {
                C = b(E, function(G, F) {
                    return j(r, G, F)
                });
                z = d.core.dom.cssText(r.style.cssText + (A.staticStyle || ""));
                x.play()
            } else {
                t.push({
                    fn: function() {
                        q(E)
                    },
                    type: "play"
                })
            }
        };
        var y = function() {
            if (x.getStatus() !== "play") {
                x.destroy();
                r = null;
                u = null;
                v = null;
                p = null;
                B = null;
                C = null;
                z = null;
                D = null;
                s = null;
                t = null
            } else {
                t.push({
                    fn: y,
                    type: "destroy"
                })
            }
        };
        u = {};
        u.play = function(E) {
            q(E);
            return u
        };
        u.stop = function() {
            x.stop();
            return u
        };
        u.pause = function() {
            x.pause();
            return u
        };
        u.resume = function() {
            x.resume();
            return u
        };
        u.finish = function(E) {
            q(E);
            y();
            return u
        };
        u.setNode = function(E) {
            w();
            return u
        };
        u.destroy = function() {
            y();
            return u
        };
        return u
    }
});
STK.register("core.arr.findout", function(a) {
    return function(f, e) {
        if (!a.core.arr.isArray(f)) {
            throw "the findout function needs an array as first parameter"
        }
        var c = [];
        for (var d = 0, b = f.length; d < b; d += 1) {
            if (f[d] === e) {
                c.push(d)
            }
        }
        return c
    }
});
STK.register("core.arr.clear", function(a) {
    return function(e) {
        if (!a.core.arr.isArray(e)) {
            throw "the clear function needs an array as first parameter"
        }
        var c = [];
        for (var d = 0, b = e.length; d < b; d += 1) {
            if (!(a.core.arr.findout([undefined, null, ""], e[d]).length)) {
                c.push(e[d])
            }
        }
        return c
    }
});
STK.register("core.arr.copy", function(a) {
    return function(b) {
        if (!a.core.arr.isArray(b)) {
            throw "the copy function needs an array as first parameter"
        }
        return b.slice(0)
    }
});
STK.register("core.arr.hasby", function(a) {
    return function(f, c) {
        if (!a.core.arr.isArray(f)) {
            throw "the hasBy function needs an array as first parameter"
        }
        var d = [];
        for (var e = 0, b = f.length; e < b; e += 1) {
            if (c(f[e], e)) {
                d.push(e)
            }
        }
        return d
    }
});
STK.register("core.arr.indexOf", function(a) {
    return function(d, e) {
        if (e.indexOf) {
            return e.indexOf(d)
        }
        for (var c = 0, b = e.length; c < b; c++) {
            if (e[c] === d) {
                return c
            }
        }
        return -1
    }
});
STK.register("core.arr.inArray", function(a) {
    return function(b, c) {
        return a.core.arr.indexOf(b, c) > -1
    }
});
STK.register("core.arr.unique", function(a) {
    return function(e) {
        if (!a.core.arr.isArray(e)) {
            throw "the unique function needs an array as first parameter"
        }
        var c = [];
        for (var d = 0, b = e.length; d < b; d += 1) {
            if (a.core.arr.indexOf(e[d], c) === -1) {
                c.push(e[d])
            }
        }
        return c
    }
});
STK.register("core.dom.hasClassName", function(a) {
    return function(c, b) {
        return (new RegExp("\\b" + b + "\\b").test(c.className))
    }
});
STK.register("core.dom.addClassName", function(a) {
    return function(c, b) {
        if (c.nodeType === 1) {
            if (!a.core.dom.hasClassName(c, b)) {
                c.className += (" " + b)
            }
        }
    }
});
STK.register("core.dom.addHTML", function(a) {
    return function(d, c) {
        if (a.IE) {
            d.insertAdjacentHTML("BeforeEnd", c)
        } else {
            var e = d.ownerDocument.createRange();
            e.setStartBefore(d);
            var b = e.createContextualFragment(c);
            d.appendChild(b)
        }
    }
});
STK.register("core.dom.sizzle", function(n) {
    var t = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        m = 0,
        d = Object.prototype.toString,
        s = false,
        j = true;
    [0, 0].sort(function() {
        j = false;
        return 0
    });
    var b = function(z, e, C, D) {
        C = C || [];
        e = e || document;
        var F = e;
        if (e.nodeType !== 1 && e.nodeType !== 9) {
            return []
        }
        if (!z || typeof z !== "string") {
            return C
        }
        var A = [],
            w, H, K, v, y = true,
            x = b.isXML(e),
            E = z,
            G, J, I, B;
        do {
            t.exec("");
            w = t.exec(E);
            if (w) {
                E = w[3];
                A.push(w[1]);
                if (w[2]) {
                    v = w[3];
                    break
                }
            }
        } while (w);
        if (A.length > 1 && o.exec(z)) {
            if (A.length === 2 && f.relative[A[0]]) {
                H = h(A[0] + A[1], e)
            } else {
                H = f.relative[A[0]] ? [e] : b(A.shift(), e);
                while (A.length) {
                    z = A.shift();
                    if (f.relative[z]) {
                        z += A.shift()
                    }
                    H = h(z, H)
                }
            }
        } else {
            if (!D && A.length > 1 && e.nodeType === 9 && !x && f.match.ID.test(A[0]) && !f.match.ID.test(A[A.length - 1])) {
                G = b.find(A.shift(), e, x);
                e = G.expr ? b.filter(G.expr, G.set)[0] : G.set[0]
            }
            if (e) {
                G = D ? {
                    expr: A.pop(),
                    set: a(D)
                } : b.find(A.pop(), A.length === 1 && (A[0] === "~" || A[0] === "+") && e.parentNode ? e.parentNode : e, x);
                H = G.expr ? b.filter(G.expr, G.set) : G.set;
                if (A.length > 0) {
                    K = a(H)
                } else {
                    y = false
                }
                while (A.length) {
                    J = A.pop();
                    I = J;
                    if (!f.relative[J]) {
                        J = ""
                    } else {
                        I = A.pop()
                    } if (I == null) {
                        I = e
                    }
                    f.relative[J](K, I, x)
                }
            } else {
                K = A = []
            }
        } if (!K) {
            K = H
        }
        if (!K) {
            b.error(J || z)
        }
        if (d.call(K) === "[object Array]") {
            if (!y) {
                C.push.apply(C, K)
            } else {
                if (e && e.nodeType === 1) {
                    for (B = 0; K[B] != null; B++) {
                        if (K[B] && (K[B] === true || K[B].nodeType === 1 && b.contains(e, K[B]))) {
                            C.push(H[B])
                        }
                    }
                } else {
                    for (B = 0; K[B] != null; B++) {
                        if (K[B] && K[B].nodeType === 1) {
                            C.push(H[B])
                        }
                    }
                }
            }
        } else {
            a(K, C)
        } if (v) {
            b(v, F, C, D);
            b.uniqueSort(C)
        }
        return C
    };
    b.uniqueSort = function(v) {
        if (c) {
            s = j;
            v.sort(c);
            if (s) {
                for (var e = 1; e < v.length; e++) {
                    if (v[e] === v[e - 1]) {
                        v.splice(e--, 1)
                    }
                }
            }
        }
        return v
    };
    b.matches = function(e, v) {
        return b(e, null, null, v)
    };
    b.find = function(B, e, C) {
        var A;
        if (!B) {
            return []
        }
        for (var x = 0, w = f.order.length; x < w; x++) {
            var z = f.order[x],
                y;
            if ((y = f.leftMatch[z].exec(B))) {
                var v = y[1];
                y.splice(1, 1);
                if (v.substr(v.length - 1) !== "\\") {
                    y[1] = (y[1] || "").replace(/\\/g, "");
                    A = f.find[z](y, e, C);
                    if (A != null) {
                        B = B.replace(f.match[z], "");
                        break
                    }
                }
            }
        }
        if (!A) {
            A = e.getElementsByTagName("*")
        }
        return {
            set: A,
            expr: B
        }
    };
    b.filter = function(F, E, I, y) {
        var w = F,
            K = [],
            C = E,
            A, e, B = E && E[0] && b.isXML(E[0]);
        while (F && E.length) {
            for (var D in f.filter) {
                if ((A = f.leftMatch[D].exec(F)) != null && A[2]) {
                    var v = f.filter[D],
                        J, H, x = A[1];
                    e = false;
                    A.splice(1, 1);
                    if (x.substr(x.length - 1) === "\\") {
                        continue
                    }
                    if (C === K) {
                        K = []
                    }
                    if (f.preFilter[D]) {
                        A = f.preFilter[D](A, C, I, K, y, B);
                        if (!A) {
                            e = J = true
                        } else {
                            if (A === true) {
                                continue
                            }
                        }
                    }
                    if (A) {
                        for (var z = 0;
                            (H = C[z]) != null; z++) {
                            if (H) {
                                J = v(H, A, z, C);
                                var G = y ^ !!J;
                                if (I && J != null) {
                                    if (G) {
                                        e = true
                                    } else {
                                        C[z] = false
                                    }
                                } else {
                                    if (G) {
                                        K.push(H);
                                        e = true
                                    }
                                }
                            }
                        }
                    }
                    if (J !== undefined) {
                        if (!I) {
                            C = K
                        }
                        F = F.replace(f.match[D], "");
                        if (!e) {
                            return []
                        }
                        break
                    }
                }
            }
            if (F === w) {
                if (e == null) {
                    b.error(F)
                } else {
                    break
                }
            }
            w = F
        }
        return C
    };
    b.error = function(e) {
        throw "Syntax error, unrecognized expression: " + e
    };
    var f = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: function(e) {
                return e.getAttribute("href")
            }
        },
        relative: {
            "+": function(A, v) {
                var x = typeof v === "string",
                    z = x && !/\W/.test(v),
                    B = x && !z;
                if (z) {
                    v = v.toLowerCase()
                }
                for (var w = 0, e = A.length, y; w < e; w++) {
                    if ((y = A[w])) {
                        while ((y = y.previousSibling) && y.nodeType !== 1) {}
                        A[w] = B || y && y.nodeName.toLowerCase() === v ? y || false : y === v
                    }
                }
                if (B) {
                    b.filter(v, A, true)
                }
            },
            ">": function(A, v) {
                var y = typeof v === "string",
                    z, w = 0,
                    e = A.length;
                if (y && !/\W/.test(v)) {
                    v = v.toLowerCase();
                    for (; w < e; w++) {
                        z = A[w];
                        if (z) {
                            var x = z.parentNode;
                            A[w] = x.nodeName.toLowerCase() === v ? x : false
                        }
                    }
                } else {
                    for (; w < e; w++) {
                        z = A[w];
                        if (z) {
                            A[w] = y ? z.parentNode : z.parentNode === v
                        }
                    }
                    if (y) {
                        b.filter(v, A, true)
                    }
                }
            },
            "": function(x, v, z) {
                var w = m++,
                    e = u,
                    y;
                if (typeof v === "string" && !/\W/.test(v)) {
                    v = v.toLowerCase();
                    y = v;
                    e = r
                }
                e("parentNode", v, w, x, y, z)
            },
            "~": function(x, v, z) {
                var w = m++,
                    e = u,
                    y;
                if (typeof v === "string" && !/\W/.test(v)) {
                    v = v.toLowerCase();
                    y = v;
                    e = r
                }
                e("previousSibling", v, w, x, y, z)
            }
        },
        find: {
            ID: function(v, w, x) {
                if (typeof w.getElementById !== "undefined" && !x) {
                    var e = w.getElementById(v[1]);
                    return e ? [e] : []
                }
            },
            NAME: function(w, z) {
                if (typeof z.getElementsByName !== "undefined") {
                    var v = [],
                        y = z.getElementsByName(w[1]);
                    for (var x = 0, e = y.length; x < e; x++) {
                        if (y[x].getAttribute("name") === w[1]) {
                            v.push(y[x])
                        }
                    }
                    return v.length === 0 ? null : v
                }
            },
            TAG: function(e, v) {
                return v.getElementsByTagName(e[1])
            }
        },
        preFilter: {
            CLASS: function(x, v, w, e, A, B) {
                x = " " + x[1].replace(/\\/g, "") + " ";
                if (B) {
                    return x
                }
                for (var y = 0, z;
                    (z = v[y]) != null; y++) {
                    if (z) {
                        if (A ^ (z.className && (" " + z.className + " ").replace(/[\t\n]/g, " ").indexOf(x) >= 0)) {
                            if (!w) {
                                e.push(z)
                            }
                        } else {
                            if (w) {
                                v[y] = false
                            }
                        }
                    }
                }
                return false
            },
            ID: function(e) {
                return e[1].replace(/\\/g, "")
            },
            TAG: function(v, e) {
                return v[1].toLowerCase()
            },
            CHILD: function(e) {
                if (e[1] === "nth") {
                    var v = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                    e[2] = (v[1] + (v[2] || 1)) - 0;
                    e[3] = v[3] - 0
                }
                e[0] = m++;
                return e
            },
            ATTR: function(y, v, w, e, z, A) {
                var x = y[1].replace(/\\/g, "");
                if (!A && f.attrMap[x]) {
                    y[1] = f.attrMap[x]
                }
                if (y[2] === "~=") {
                    y[4] = " " + y[4] + " "
                }
                return y
            },
            PSEUDO: function(y, v, w, e, z) {
                if (y[1] === "not") {
                    if ((t.exec(y[3]) || "").length > 1 || /^\w/.test(y[3])) {
                        y[3] = b(y[3], null, null, v)
                    } else {
                        var x = b.filter(y[3], v, w, true ^ z);
                        if (!w) {
                            e.push.apply(e, x)
                        }
                        return false
                    }
                } else {
                    if (f.match.POS.test(y[0]) || f.match.CHILD.test(y[0])) {
                        return true
                    }
                }
                return y
            },
            POS: function(e) {
                e.unshift(true);
                return e
            }
        },
        filters: {
            enabled: function(e) {
                return e.disabled === false && e.type !== "hidden"
            },
            disabled: function(e) {
                return e.disabled === true
            },
            checked: function(e) {
                return e.checked === true
            },
            selected: function(e) {
                e.parentNode.selectedIndex;
                return e.selected === true
            },
            parent: function(e) {
                return !!e.firstChild
            },
            empty: function(e) {
                return !e.firstChild
            },
            has: function(w, v, e) {
                return !!b(e[3], w).length
            },
            header: function(e) {
                return (/h\d/i).test(e.nodeName)
            },
            text: function(e) {
                return "text" === e.type
            },
            radio: function(e) {
                return "radio" === e.type
            },
            checkbox: function(e) {
                return "checkbox" === e.type
            },
            file: function(e) {
                return "file" === e.type
            },
            password: function(e) {
                return "password" === e.type
            },
            submit: function(e) {
                return "submit" === e.type
            },
            image: function(e) {
                return "image" === e.type
            },
            reset: function(e) {
                return "reset" === e.type
            },
            button: function(e) {
                return "button" === e.type || e.nodeName.toLowerCase() === "button"
            },
            input: function(e) {
                return (/input|select|textarea|button/i).test(e.nodeName)
            }
        },
        setFilters: {
            first: function(v, e) {
                return e === 0
            },
            last: function(w, v, e, x) {
                return v === x.length - 1
            },
            even: function(v, e) {
                return e % 2 === 0
            },
            odd: function(v, e) {
                return e % 2 === 1
            },
            lt: function(w, v, e) {
                return v < e[3] - 0
            },
            gt: function(w, v, e) {
                return v > e[3] - 0
            },
            nth: function(w, v, e) {
                return e[3] - 0 === v
            },
            eq: function(w, v, e) {
                return e[3] - 0 === v
            }
        },
        filter: {
            PSEUDO: function(w, B, A, C) {
                var e = B[1],
                    v = f.filters[e];
                if (v) {
                    return v(w, A, B, C)
                } else {
                    if (e === "contains") {
                        return (w.textContent || w.innerText || b.getText([w]) || "").indexOf(B[3]) >= 0
                    } else {
                        if (e === "not") {
                            var x = B[3];
                            for (var z = 0, y = x.length; z < y; z++) {
                                if (x[z] === w) {
                                    return false
                                }
                            }
                            return true
                        } else {
                            b.error("Syntax error, unrecognized expression: " + e)
                        }
                    }
                }
            },
            CHILD: function(e, x) {
                var A = x[1],
                    v = e;
                switch (A) {
                    case "only":
                    case "first":
                        while ((v = v.previousSibling)) {
                            if (v.nodeType === 1) {
                                return false
                            }
                        }
                        if (A === "first") {
                            return true
                        }
                        v = e;
                    case "last":
                        while ((v = v.nextSibling)) {
                            if (v.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case "nth":
                        var w = x[2],
                            D = x[3];
                        if (w === 1 && D === 0) {
                            return true
                        }
                        var z = x[0],
                            C = e.parentNode;
                        if (C && (C.sizcache !== z || !e.nodeIndex)) {
                            var y = 0;
                            for (v = C.firstChild; v; v = v.nextSibling) {
                                if (v.nodeType === 1) {
                                    v.nodeIndex = ++y
                                }
                            }
                            C.sizcache = z
                        }
                        var B = e.nodeIndex - D;
                        if (w === 0) {
                            return B === 0
                        } else {
                            return (B % w === 0 && B / w >= 0)
                        }
                }
            },
            ID: function(v, e) {
                return v.nodeType === 1 && v.getAttribute("id") === e
            },
            TAG: function(v, e) {
                return (e === "*" && v.nodeType === 1) || v.nodeName.toLowerCase() === e
            },
            CLASS: function(v, e) {
                return (" " + (v.className || v.getAttribute("class")) + " ").indexOf(e) > -1
            },
            ATTR: function(z, x) {
                var w = x[1],
                    e = f.attrHandle[w] ? f.attrHandle[w](z) : z[w] != null ? z[w] : z.getAttribute(w),
                    A = e + "",
                    y = x[2],
                    v = x[4];
                return e == null ? y === "!=" : y === "=" ? A === v : y === "*=" ? A.indexOf(v) >= 0 : y === "~=" ? (" " + A + " ").indexOf(v) >= 0 : !v ? A && e !== false : y === "!=" ? A !== v : y === "^=" ? A.indexOf(v) === 0 : y === "$=" ? A.substr(A.length - v.length) === v : y === "|=" ? A === v || A.substr(0, v.length + 1) === v + "-" : false
            },
            POS: function(y, v, w, z) {
                var e = v[2],
                    x = f.setFilters[e];
                if (x) {
                    return x(y, w, v, z)
                }
            }
        }
    };
    b.selectors = f;
    var o = f.match.POS,
        g = function(v, e) {
            return "\\" + (e - 0 + 1)
        };
    for (var q in f.match) {
        f.match[q] = new RegExp(f.match[q].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
        f.leftMatch[q] = new RegExp(/(^(?:.|\r|\n)*?)/.source + f.match[q].source.replace(/\\(\d+)/g, g))
    }
    var a = function(v, e) {
        v = Array.prototype.slice.call(v, 0);
        if (e) {
            e.push.apply(e, v);
            return e
        }
        return v
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch (p) {
        a = function(y, x) {
            var v = x || [],
                w = 0;
            if (d.call(y) === "[object Array]") {
                Array.prototype.push.apply(v, y)
            } else {
                if (typeof y.length === "number") {
                    for (var e = y.length; w < e; w++) {
                        v.push(y[w])
                    }
                } else {
                    for (; y[w]; w++) {
                        v.push(y[w])
                    }
                }
            }
            return v
        }
    }
    var c;
    if (document.documentElement.compareDocumentPosition) {
        c = function(v, e) {
            if (!v.compareDocumentPosition || !e.compareDocumentPosition) {
                if (v == e) {
                    s = true
                }
                return v.compareDocumentPosition ? -1 : 1
            }
            var w = v.compareDocumentPosition(e) & 4 ? -1 : v === e ? 0 : 1;
            if (w === 0) {
                s = true
            }
            return w
        }
    } else {
        if ("sourceIndex" in document.documentElement) {
            c = function(v, e) {
                if (!v.sourceIndex || !e.sourceIndex) {
                    if (v == e) {
                        s = true
                    }
                    return v.sourceIndex ? -1 : 1
                }
                var w = v.sourceIndex - e.sourceIndex;
                if (w === 0) {
                    s = true
                }
                return w
            }
        } else {
            if (document.createRange) {
                c = function(x, v) {
                    if (!x.ownerDocument || !v.ownerDocument) {
                        if (x == v) {
                            s = true
                        }
                        return x.ownerDocument ? -1 : 1
                    }
                    var w = x.ownerDocument.createRange(),
                        e = v.ownerDocument.createRange();
                    w.setStart(x, 0);
                    w.setEnd(x, 0);
                    e.setStart(v, 0);
                    e.setEnd(v, 0);
                    var y = w.compareBoundaryPoints(Range.START_TO_END, e);
                    if (y === 0) {
                        s = true
                    }
                    return y
                }
            }
        }
    }
    b.getText = function(e) {
        var v = "",
            x;
        for (var w = 0; e[w]; w++) {
            x = e[w];
            if (x.nodeType === 3 || x.nodeType === 4) {
                v += x.nodeValue
            } else {
                if (x.nodeType !== 8) {
                    v += b.getText(x.childNodes)
                }
            }
        }
        return v
    };
    (function() {
        var v = document.createElement("div"),
            w = "script" + (new Date()).getTime();
        v.innerHTML = "<a name='" + w + "'/>";
        var e = document.documentElement;
        e.insertBefore(v, e.firstChild);
        if (document.getElementById(w)) {
            f.find.ID = function(y, z, A) {
                if (typeof z.getElementById !== "undefined" && !A) {
                    var x = z.getElementById(y[1]);
                    return x ? x.id === y[1] || typeof x.getAttributeNode !== "undefined" && x.getAttributeNode("id").nodeValue === y[1] ? [x] : undefined : []
                }
            };
            f.filter.ID = function(z, x) {
                var y = typeof z.getAttributeNode !== "undefined" && z.getAttributeNode("id");
                return z.nodeType === 1 && y && y.nodeValue === x
            }
        }
        e.removeChild(v);
        e = v = null
    })();
    (function() {
        var e = document.createElement("div");
        e.appendChild(document.createComment(""));
        if (e.getElementsByTagName("*").length > 0) {
            f.find.TAG = function(v, z) {
                var y = z.getElementsByTagName(v[1]);
                if (v[1] === "*") {
                    var x = [];
                    for (var w = 0; y[w]; w++) {
                        if (y[w].nodeType === 1) {
                            x.push(y[w])
                        }
                    }
                    y = x
                }
                return y
            }
        }
        e.innerHTML = "<a href='#'></a>";
        if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
            f.attrHandle.href = function(v) {
                return v.getAttribute("href", 2)
            }
        }
        e = null
    })();
    if (document.querySelectorAll) {
        (function() {
            var e = b,
                w = document.createElement("div");
            w.innerHTML = "<p class='TEST'></p>";
            if (w.querySelectorAll && w.querySelectorAll(".TEST").length === 0) {
                return
            }
            b = function(A, z, x, y) {
                z = z || document;
                if (!y && z.nodeType === 9 && !b.isXML(z)) {
                    try {
                        return a(z.querySelectorAll(A), x)
                    } catch (B) {}
                }
                return e(A, z, x, y)
            };
            for (var v in e) {
                b[v] = e[v]
            }
            w = null
        })()
    }(function() {
        var e = document.createElement("div");
        e.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) {
            return
        }
        e.lastChild.className = "e";
        if (e.getElementsByClassName("e").length === 1) {
            return
        }
        f.order.splice(1, 0, "CLASS");
        f.find.CLASS = function(v, w, x) {
            if (typeof w.getElementsByClassName !== "undefined" && !x) {
                return w.getElementsByClassName(v[1])
            }
        };
        e = null
    })();

    function r(v, A, z, D, B, C) {
        for (var x = 0, w = D.length; x < w; x++) {
            var e = D[x];
            if (e) {
                e = e[v];
                var y = false;
                while (e) {
                    if (e.sizcache === z) {
                        y = D[e.sizset];
                        break
                    }
                    if (e.nodeType === 1 && !C) {
                        e.sizcache = z;
                        e.sizset = x
                    }
                    if (e.nodeName.toLowerCase() === A) {
                        y = e;
                        break
                    }
                    e = e[v]
                }
                D[x] = y
            }
        }
    }

    function u(v, A, z, D, B, C) {
        for (var x = 0, w = D.length; x < w; x++) {
            var e = D[x];
            if (e) {
                e = e[v];
                var y = false;
                while (e) {
                    if (e.sizcache === z) {
                        y = D[e.sizset];
                        break
                    }
                    if (e.nodeType === 1) {
                        if (!C) {
                            e.sizcache = z;
                            e.sizset = x
                        }
                        if (typeof A !== "string") {
                            if (e === A) {
                                y = true;
                                break
                            }
                        } else {
                            if (b.filter(A, [e]).length > 0) {
                                y = e;
                                break
                            }
                        }
                    }
                    e = e[v]
                }
                D[x] = y
            }
        }
    }
    b.contains = document.compareDocumentPosition ? function(v, e) {
        return !!(v.compareDocumentPosition(e) & 16)
    } : function(v, e) {
        return v !== e && (v.contains ? v.contains(e) : true)
    };
    b.isXML = function(e) {
        var v = (e ? e.ownerDocument || e : 0).documentElement;
        return v ? v.nodeName !== "HTML" : false
    };
    var h = function(e, B) {
        var x = [],
            y = "",
            z, w = B.nodeType ? [B] : B;
        while ((z = f.match.PSEUDO.exec(e))) {
            y += z[0];
            e = e.replace(f.match.PSEUDO, "")
        }
        e = f.relative[e] ? e + "*" : e;
        for (var A = 0, v = w.length; A < v; A++) {
            b(e, w[A], x)
        }
        return b.filter(y, x)
    };
    return b
});
STK.register("core.dom.builder", function(a) {
    function b(m, f) {
        if (f) {
            return f
        }
        var e, h = /\<(\w+)[^>]*\s+node-type\s*=\s*([\'\"])?(\w+)\2.*?>/g;
        var g = {};
        var j, d, c;
        while ((e = h.exec(m))) {
            d = e[1];
            j = e[3];
            c = d + "[node-type=" + j + "]";
            g[j] = g[j] == null ? [] : g[j];
            if (!a.core.arr.inArray(c, g[j])) {
                g[j].push(d + "[node-type=" + j + "]")
            }
        }
        return g
    }
    return function(m, e) {
        var j = a.core.func.getType(m) == "string";
        var g = b(j ? m : m.innerHTML, e);
        var d = m;
        if (j) {
            d = a.C("div");
            d.innerHTML = m
        }
        var f, h = {};
        for (f in g) {
            h[f] = a.core.dom.sizzle(g[f].toString(), d)
        }
        var c = m;
        if (j) {
            c = a.C("buffer");
            while (d.children[0]) {
                c.appendChild(d.children[0])
            }
        }
        return {
            box: c,
            list: h
        }
    }
});
STK.register("core.obj.beget", function(b) {
    var a = function() {};
    return function(c) {
        a.prototype = c;
        return new a()
    }
});
STK.register("core.dom.setStyle", function(a) {
    return function(b, c, d) {
        if (a.IE) {
            switch (c) {
                case "opacity":
                    b.style.filter = "alpha(opacity=" + (d * 100) + ")";
                    if (!b.currentStyle || !b.currentStyle.hasLayout) {
                        b.style.zoom = 1
                    }
                    break;
                case "float":
                    c = "styleFloat";
                default:
                    b.style[c] = d
            }
        } else {
            if (c == "float") {
                c = "cssFloat"
            }
            b.style[c] = d
        }
    }
});
STK.register("core.dom.insertAfter", function(a) {
    return function(c, d) {
        var b = d.parentNode;
        if (b.lastChild == d) {
            b.appendChild(c)
        } else {
            b.insertBefore(c, d.nextSibling)
        }
    }
});
STK.register("core.dom.insertBefore", function(a) {
    return function(c, d) {
        var b = d.parentNode;
        b.insertBefore(c, d)
    }
});
STK.register("core.dom.removeClassName", function(a) {
    return function(c, b) {
        if (c.nodeType === 1) {
            if (a.core.dom.hasClassName(c, b)) {
                c.className = c.className.replace(new RegExp("\\b" + b + "\\b"), " ")
            }
        }
    }
});
STK.register("core.dom.trimNode", function(a) {
    return function(c) {
        var d = c.childNodes;
        for (var b = 0; b < d.length; b++) {
            if (d[b].nodeType == 3 || d[b].nodeType == 8) {
                c.removeChild(d[b])
            }
        }
    }
});
STK.register("core.dom.removeNode", function(a) {
    return function(b) {
        b = a.E(b) || b;
        try {
            b.parentNode.removeChild(b)
        } catch (c) {}
    }
});
STK.register("core.evt.addEvent", function(a) {
    return function(b, e, d) {
        var c = a.E(b);
        if (c == null) {
            return false
        }
        e = e || "click";
        if ((typeof d).toLowerCase() != "function") {
            return
        }
        if (c.attachEvent) {
            c.attachEvent("on" + e, d)
        } else {
            if (c.addEventListener) {
                c.addEventListener(e, d, false)
            } else {
                c["on" + e] = d
            }
        }
        return true
    }
});
STK.register("core.evt.removeEvent", function(a) {
    return function(c, e, d, b) {
        var f = a.E(c);
        if (f == null) {
            return false
        }
        if (typeof d != "function") {
            return false
        }
        if (f.removeEventListener) {
            f.removeEventListener(e, d, b)
        } else {
            if (f.detachEvent) {
                f.detachEvent("on" + e, d)
            } else {
                f["on" + e] = null
            }
        }
        return true
    }
});
STK.register("core.dom.contains", function(a) {
    return function(b, c) {
        if (b === c) {
            return false
        } else {
            if (b.compareDocumentPosition) {
                return ((b.compareDocumentPosition(c) & 16) === 16)
            } else {
                if (b.contains && c.nodeType === 1) {
                    return b.contains(c)
                } else {
                    while (c = c.parentNode) {
                        if (b === c) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
});
STK.register("core.util.hideContainer", function(c) {
    var d;
    var a = function() {
        if (d) {
            return
        }
        d = c.C("div");
        d.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
        document.getElementsByTagName("head")[0].appendChild(d)
    };
    var b = {
        appendChild: function(e) {
            if (c.isNode(e)) {
                a();
                d.appendChild(e)
            }
        },
        removeChild: function(e) {
            if (c.isNode(e)) {
                d && d.removeChild(e)
            }
        }
    };
    return b
});
STK.register("core.dom.isNode", function(a) {
    return function(b) {
        return (b != undefined) && Boolean(b.nodeName) && Boolean(b.nodeType)
    }
});
STK.register("core.dom.ready", function(g) {
    var c = [];
    var o = false;
    var n = g.core.func.getType;
    var h = g.core.util.browser;
    var f = g.core.evt.addEvent;
    var j = function() {
        if (!o) {
            if (document.readyState === "complete") {
                return true
            }
        }
        return o
    };
    var d = function() {
        if (o == true) {
            return
        }
        o = true;
        for (var q = 0, p = c.length; q < p; q++) {
            if (n(c[q]) === "function") {
                try {
                    c[q].call()
                } catch (r) {}
            }
        }
        c = []
    };
    var a = function() {
        if (j()) {
            d();
            return
        }
        try {
            document.documentElement.doScroll("left")
        } catch (p) {
            setTimeout(arguments.callee, 25);
            return
        }
        d()
    };
    var b = function() {
        if (j()) {
            d();
            return
        }
        setTimeout(arguments.callee, 25)
    };
    var e = function() {
        f(document, "DOMContentLoaded", d)
    };
    var m = function() {
        f(window, "load", d)
    };
    if (!j()) {
        if (g.IE && window === window.top) {
            a()
        }
        e();
        b();
        m()
    }
    return function(p) {
        if (j()) {
            if (n(p) === "function") {
                p.call()
            }
        } else {
            c.push(p)
        }
    }
});
STK.register("core.evt.custEvent", function(c) {
    var a = "__custEventKey__",
        d = 1,
        e = {},
        b = function(h, g) {
            var f = (typeof h == "number") ? h : h[a];
            return (f && e[f]) && {
                obj: (typeof g == "string" ? e[f][g] : e[f]),
                key: f
            }
        };
    return {
        define: function(m, h) {
            if (m && h) {
                var g = (typeof m == "number") ? m : m[a] || (m[a] = d++),
                    j = e[g] || (e[g] = {});
                h = [].concat(h);
                for (var f = 0; f < h.length; f++) {
                    j[h[f]] || (j[h[f]] = [])
                }
                return g
            }
        },
        undefine: function(j, h) {
            if (j) {
                var g = (typeof j == "number") ? j : j[a];
                if (g && e[g]) {
                    if (h) {
                        h = [].concat(h);
                        for (var f = 0; f < h.length; f++) {
                            if (h[f] in e[g]) {
                                delete e[g][h[f]]
                            }
                        }
                    } else {
                        delete e[g]
                    }
                }
            }
        },
        add: function(m, g, f, h) {
            if (m && typeof g == "string" && f) {
                var j = b(m, g);
                if (!j || !j.obj) {
                    throw "custEvent (" + g + ") is undefined !"
                }
                j.obj.push({
                    fn: f,
                    data: h
                });
                return j.key
            }
        },
        once: function(m, g, f, h) {
            if (m && typeof g == "string" && f) {
                var j = b(m, g);
                if (!j || !j.obj) {
                    throw "custEvent (" + g + ") is undefined !"
                }
                j.obj.push({
                    fn: f,
                    data: h,
                    once: true
                });
                return j.key
            }
        },
        remove: function(n, j, h) {
            if (n) {
                var m = b(n, j),
                    o, f;
                if (m && (o = m.obj)) {
                    if (c.isArray(o)) {
                        if (h) {
                            var g = 0;
                            while (o[g]) {
                                if (o[g].fn === h) {
                                    break
                                }
                                g++
                            }
                            o.splice(g, 1)
                        } else {
                            o.splice(0, o.length)
                        }
                    } else {
                        for (var g in o) {
                            o[g] = []
                        }
                    }
                    return m.key
                }
            }
        },
        fire: function(g, p, n) {
            if (g && typeof p == "string") {
                var f = b(g, p),
                    m;
                if (f && (m = f.obj)) {
                    if (!c.isArray(n)) {
                        n = n != undefined ? [n] : []
                    }
                    for (var h = m.length - 1; h > -1 && m[h]; h--) {
                        var q = m[h].fn;
                        var o = m[h].once;
                        if (q && q.apply) {
                            try {
                                q.apply(g, [{
                                    type: p,
                                    data: m[h].data
                                }].concat(n));
                                if (o) {
                                    m.splice(h, 1)
                                }
                            } catch (j) {
                                c.log("custEvent fire", j)
                            }
                        }
                    }
                    return f.key
                }
            }
        },
        destroy: function() {
            e = {};
            d = 1
        }
    }
});
STK.register("core.evt.fixEvent", function(a) {
    return function(b) {
        b = b || a.core.evt.getEvent();
        if (!b.target) {
            b.target = b.srcElement;
            b.pageX = b.x;
            b.pageY = b.y
        }
        if (typeof b.layerX == "undefined") {
            b.layerX = b.offsetX
        }
        if (typeof b.layerY == "undefined") {
            b.layerY = b.offsetY
        }
        return b
    }
});
STK.register("core.evt.delegatedEvent", function(b) {
    var a = function(f, e) {
        for (var d = 0, c = f.length; d < c; d += 1) {
            if (b.core.dom.contains(f[d], e)) {
                return true
            }
        }
        return false
    };
    return function(d, g) {
        if (!b.core.dom.isNode(d)) {
            throw "core.evt.delegatedEvent need an Element as first Parameter"
        }
        if (!g) {
            g = []
        }
        if (b.core.arr.isArray(g)) {
            g = [g]
        }
        var c = {};
        var f = function(p) {
            var j = b.core.evt.fixEvent(p);
            var o = j.target;
            var n = p.type;
            var q = function() {
                var t, r, s;
                t = o.getAttribute("action-target");
                if (t) {
                    r = b.core.dom.sizzle(t, d);
                    if (r.length) {
                        s = j.target = r[0]
                    }
                }
                q = b.core.func.empty;
                return s
            };
            var h = function() {
                var r = q() || o;
                if (c[n] && c[n][m]) {
                    return c[n][m]({
                        evt: j,
                        el: r,
                        box: d,
                        data: b.core.json.queryToJson(r.getAttribute("action-data") || "")
                    })
                } else {
                    return true
                }
            };
            if (a(g, o)) {
                return false
            } else {
                if (!b.core.dom.contains(d, o)) {
                    return false
                } else {
                    var m = null;
                    while (o && o !== d) {
                        m = o.getAttribute("action-type");
                        if (m && h() === false) {
                            break
                        }
                        o = o.parentNode
                    }
                }
            }
        };
        var e = {};
        e.add = function(m, n, j) {
            if (!c[n]) {
                c[n] = {};
                b.core.evt.addEvent(d, n, f)
            }
            var h = c[n];
            h[m] = j
        };
        e.remove = function(h, j) {
            if (c[j]) {
                delete c[j][h];
                if (b.core.obj.isEmpty(c[j])) {
                    delete c[j];
                    b.core.evt.removeEvent(d, j, f)
                }
            }
        };
        e.pushExcept = function(h) {
            g.push(h)
        };
        e.removeExcept = function(m) {
            if (!m) {
                g = []
            } else {
                for (var j = 0, h = g.length; j < h; j += 1) {
                    if (g[j] === m) {
                        g.splice(j, 1)
                    }
                }
            }
        };
        e.clearExcept = function(h) {
            g = []
        };
        e.destroy = function() {
            for (k in c) {
                for (l in c[k]) {
                    delete c[k][l]
                }
                delete c[k];
                b.core.evt.removeEvent(d, k, f)
            }
        };
        return e
    }
});
STK.register("core.str.trim", function(a) {
    return function(e) {
        if (typeof e !== "string") {
            throw "trim need a string as parameter"
        }
        var b = e.length;
        var d = 0;
        var c = /(\u3000|\s|\t|\u00A0)/;
        while (d < b) {
            if (!c.test(e.charAt(d))) {
                break
            }
            d += 1
        }
        while (b > d) {
            if (!c.test(e.charAt(b - 1))) {
                break
            }
            b -= 1
        }
        return e.slice(d, b)
    }
});
STK.register("core.io.getXHR", function(a) {
    return function() {
        var e = false;
        try {
            e = new XMLHttpRequest()
        } catch (d) {
            try {
                e = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (c) {
                try {
                    e = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (b) {
                    e = false
                }
            }
        }
        return e
    }
});
STK.register("core.json.queryToJson", function(a) {
    return function(d, h) {
        var m = a.core.str.trim(d).split("&");
        var j = {};
        var c = function(o) {
            if (h) {
                return decodeURIComponent(o)
            } else {
                return o
            }
        };
        for (var f = 0, g = m.length; f < g; f++) {
            if (m[f]) {
                var e = m[f].split("=");
                var b = e[0];
                var n = e[1];
                if (e.length < 2) {
                    n = b;
                    b = "$nullName"
                }
                if (!j[b]) {
                    j[b] = c(n)
                } else {
                    if (a.core.arr.isArray(j[b]) != true) {
                        j[b] = [j[b]]
                    }
                    j[b].push(c(n))
                }
            }
        }
        return j
    }
});
STK.register("core.util.pageletM", function(f) {
    var e = "http://html6game.com/";
    var d = "http://html6game.com/";
    if (typeof $CONFIG != "undefined") {
        e = $CONFIG.jsPath || e;
        d = $CONFIG.cssPath || d
    }
    var o = {},
        g, s = {},
        a = {};
    var q = function(v, t) {
        var u = o[v] || (o[v] = {
            loaded: false,
            list: []
        });
        if (u.loaded) {
            t(v);
            return false
        }
        u.list.push(t);
        if (u.list.length > 1) {
            return false
        }
        return true
    };
    var j = function(u) {
        var t = o[u].list;
        for (var v = 0; v < t.length; v++) {
            t[v](u)
        }
        o[u].loaded = true;
        delete o[u].list
    };
    var m = function(x, t, v) {
        if (!q(x, v)) {
            return
        }
        var u = d + x;
        var y = f.C("link");
        y.setAttribute("rel", "Stylesheet");
        y.setAttribute("type", "text/css");
        y.setAttribute("charset", "utf-8");
        y.setAttribute("href", u);
        document.getElementsByTagName("head")[0].appendChild(y);
        var z = f.C("div");
        z.id = t;
        f.core.util.hideContainer.appendChild(z);
        var w = 3000;
        var A = function() {
            if (parseInt(f.core.dom.getStyle(z, "height")) == 42) {
                f.core.util.hideContainer.removeChild(z);
                j(x);
                return
            }
            if (--w > 0) {
                setTimeout(A, 10)
            } else {
                f.log(x + "timeout!");
                f.core.util.hideContainer.removeChild(z);
                delete o[x]
            }
        };
        setTimeout(A, 50)
    };
    var c = function(v, u) {
        if (!q(v, u)) {
            return
        }
        var t = e + v;
        f.core.io.scriptLoader({
            url: t,
            onComplete: function() {
                j(v)
            },
            onTimeout: function() {
                f.log(v + "timeout!");
                delete o[v]
            }
        })
    };
    var r = function(u, t) {
        if (!s[u]) {
            s[u] = t
        }
    };
    var b = function(t) {
        if (t) {
            if (s[t]) {
                try {
                    a[t] = s[t](f)
                } catch (v) {
                    f.log(t, v)
                }
            } else {
                f.log("start:ns=" + t + " ,have not been registed")
            }
            return
        }
        var u = [];
        for (t in s) {
            u.push(t)
        }
        f.timedChunk(u, {
            process: function(w) {
                try {
                    a[w] = s[w](f)
                } catch (x) {
                    f.log(w, x)
                }
            }
        })
    };
    var p = function(t) {
        var u = 1,
            y, A, w, B, D, v, x;
        t = t || {};
        w = t.html;
        B = t.css;
        D = t.js;
        if (!t.pid || (!(A = f.E(t.pid)) && w != null)) {
            f.log("node pid[" + t.pid + "] is not on the body");
            return
        }
        if (D && !f.isArray(D)) {
            D = [D]
        }
        v = function() {
            if (--u > 0) {
                return
            }(typeof w != "undefined") && (A.innerHTML = w);
            if (D) {
                x()
            }
        };
        x = function(E) {
            if (D.length > 0) {
                c(D.splice(0, 1)[0], x)
            }
            if (E && E.indexOf("/pl/") != -1) {
                var F = E.replace(/^.*?\/(pl\/.*)\.js\??.*$/, "$1").replace(/\//g, ".");
                b(F)
            }
        };
        if (B) {
            u += B.length;
            for (var z = 0, C;
                (C = B[z]); z++) {
                m(C, "js_" + C.replace(/^\/?(.*)\.css\??.*$/i, "$1").replace(/\//g, "_"), v)
            }
        }
        v()
    };
    var h = function(t) {
        if (t) {
            if (a[t]) {
                f.log("destroy:" + t);
                try {
                    a[t].destroy()
                } catch (u) {
                    f.log(u)
                }
                delete a[t]
            }
            return
        }
        for (t in a) {
            f.log("destroy:" + t);
            try {
                a[t] && a[t].destroy && a[t].destroy()
            } catch (u) {
                f.log(t, u)
            }
        }
        a = {}
    };
    var n = {
        register: r,
        start: b,
        view: p,
        clear: h,
        destroy: function() {
            n.clear();
            o = {};
            a = {};
            s = {};
            g = undefined
        }
    };
    f.core.dom.ready(function() {
        f.addEvent(window, "unload", function() {
            f.removeEvent(window, "unload", arguments.callee);
            n.destroy()
        })
    });
    return n
});
(function() {
    var b = STK.core;
    var c = {
        tween: b.ani.tween,
        tweenArche: b.ani.tweenArche,
        arrCopy: b.arr.copy,
        arrClear: b.arr.clear,
        hasby: b.arr.hasby,
        unique: b.arr.unique,
        foreach: b.arr.foreach,
        isArray: b.arr.isArray,
        inArray: b.arr.inArray,
        arrIndexOf: b.arr.indexOf,
        findout: b.arr.findout,
        domNext: b.dom.next,
        domPrev: b.dom.prev,
        isNode: b.dom.isNode,
        addHTML: b.dom.addHTML,
        insertHTML: b.dom.insertHTML,
        setXY: b.dom.setXY,
        contains: b.dom.contains,
        position: b.dom.position,
        trimNode: b.dom.trimNode,
        insertAfter: b.dom.insertAfter,
        insertBefore: b.dom.insertBefore,
        removeNode: b.dom.removeNode,
        replaceNode: b.dom.replaceNode,
        Ready: b.dom.ready,
        setStyle: b.dom.setStyle,
        setStyles: b.dom.setStyles,
        getStyle: b.dom.getStyle,
        addClassName: b.dom.addClassName,
        hasClassName: b.dom.hasClassName,
        removeClassName: b.dom.removeClassName,
        builder: b.dom.builder,
        cascadeNode: b.dom.cascadeNode,
        selector: b.dom.selector,
        sizzle: b.dom.sizzle,
        addEvent: b.evt.addEvent,
        custEvent: b.evt.custEvent,
        removeEvent: b.evt.removeEvent,
        fireEvent: b.evt.fireEvent,
        fixEvent: b.evt.fixEvent,
        getEvent: b.evt.getEvent,
        stopEvent: b.evt.stopEvent,
        delegatedEvent: b.evt.delegatedEvent,
        preventDefault: b.evt.preventDefault,
        hotKey: b.evt.hotKey,
        memorize: b.func.memorize,
        bind: b.func.bind,
        getType: b.func.getType,
        methodBefore: b.func.methodBefore,
        timedChunk: b.func.timedChunk,
        funcEmpty: b.func.empty,
        ajax: b.io.ajax,
        jsonp: b.io.jsonp,
        ijax: b.io.ijax,
        scriptLoader: b.io.scriptLoader,
        require: b.io.require,
        jsonInclude: b.json.include,
        jsonCompare: b.json.compare,
        jsonClone: b.json.clone,
        jsonToQuery: b.json.jsonToQuery,
        queryToJson: b.json.queryToJson,
        jsonToStr: b.json.jsonToStr,
        strToJson: b.json.strToJson,
        objIsEmpty: b.obj.isEmpty,
        beget: b.obj.beget,
        cascade: b.obj.cascade,
        objSup: b.obj.sup,
        parseParam: b.obj.parseParam,
        bLength: b.str.bLength,
        dbcToSbc: b.str.dbcToSbc,
        leftB: b.str.leftB,
        trim: b.str.trim,
        encodeHTML: b.str.encodeHTML,
        decodeHTML: b.str.decodeHTML,
        parseURL: b.str.parseURL,
        parseHTML: b.str.parseHTML,
        queryString: b.str.queryString,
        htmlToJson: b.util.htmlToJson,
        cookie: b.util.cookie,
        drag: b.util.drag,
        timer: b.util.timer,
        jobsM: b.util.jobsM,
        listener: b.util.listener,
        winSize: b.util.winSize,
        pageSize: b.util.pageSize,
        templet: b.util.templet,
        queue: b.util.queue,
        stack: b.util.stack,
        swf: b.util.swf,
        URL: b.util.URL,
        scrollPos: b.util.scrollPos,
        scrollTo: b.util.scrollTo,
        getUniqueKey: b.util.getUniqueKey,
        storage: b.util.storage,
        pageletM: b.util.pageletM
    };
    for (var a in c) {
        STK.regShort(a, c[a])
    }
})();