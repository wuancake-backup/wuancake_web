STK.register("kit.dom.parseDOM", function(a) {
    return function(c) {
        for (var b in c) {
            if (c[b] && (c[b].length == 1)) {
                c[b] = c[b][0]
            }
        }
        return c
    }
});
STK.register("common.app.slider", function(f) {
    var b = f.core.evt.addEvent,
        a = f.core.dom.getStyle,
        e = f.core.dom.setStyle,
        d = f.core.dom.setStyles,
        c = f.core.dom.insertBefore,
        h = f.core.dom.insertAfter;
    return function(E, y) {
        if (!E) {
            throw "it need node for slider"
        }
        var s = {};
        var u = {
            step: 1,
            speed: 1000,
            show: 3,
            auto: true,
            pause: 2000,
            extraBtn: false,
            extraBtnEvt: true,
            vertical: false,
            continuous: true,
            controlsFade: true,
            screennum: 2,
            carousel: false,
            beforeSlide: null,
            slideCbk: null,
            duration: 500,
            hoverEvt: false,
            animationType: "linear"
        };
        var l = f.parseParam(u, y);
        var G = {};
        G.prevBtn = E.prev;
        G.nextBtn = E.next;
        G.extraBtn = E.extrabtn;
        G.slider = E.slider;
        G.btnlist = [];
        G.dir = "next";
        G.speed = l.speed;
        if (!G.slider) {
            throw "no slider box found"
        }
        var A = G.slider.parentNode,
            p = false;
        if (A.style.display == "none") {
            p = true;
            A.style.visibility = "hidden";
            A.style.display = ""
        }
        var x = G.slider.getElementsByTagName("ul")[0],
            w = x.getElementsByTagName("li"),
            J = w.length;
        if (!J) {
            return
        }
        var D = w[0].offsetWidth + parseInt(a(w[0], "marginLeft")) + parseInt(a(w[0], "marginRight")),
            B = w[0].offsetHeight + parseInt(a(w[0], "marginTop")) + parseInt(a(w[0], "marginBottom")),
            L = Math.floor((J - l.show) / l.step),
            q = 0,
            m = true,
            o = false,
            r = J;
        if (p) {
            A.style.visibility = "visible";
            A.style.display = "none"
        }
        e(G.slider, "overflow", "hidden");
        e(x, "width", r * D + "px");
        if (!l.vertical) {
            for (var I = 0; I < J; I++) {
                e(w[I], "float", "left")
            }
        }
        var C = function(i, N, M) {
            if (f.core.arr.isArray(i)) {
                f.core.arr.foreach(i, function(O, P) {
                    b(O, N, M)
                })
            } else {
                b(i, N, M)
            }
        };
        if (G.prevBtn && G.nextBtn) {
            C(G.prevBtn, "click", function() {
                z("prev", true)
            });
            C(G.nextBtn, "click", function() {
                z("next", true)
            })
        }
        if (l.hoverEvt) {
            b(G.slider, "mouseover", function() {
                F()
            });
            b(G.slider, "mouseout", function() {
                n()
            })
        }
        var t = {
            set: function(N) {
                if (G.btnlist.length === 0) {
                    return
                }
                for (var M = 0; M < G.btnlist.length; M++) {
                    f.removeClassName(G.btnlist[M], "current")
                }
                f.addClassName(G.btnlist[N], "current")
            },
            add: function() {
                var P = Math.floor(J / l.show);
                for (var O = 0; O < P; O++) {
                    var M = f.C("a");
                    M.href = "javascript:;";
                    M.innerHTML = parseInt(O + 1);
                    if (l.extraBtnEvt) {
                        M.onclick = (function(i) {
                            return function() {
                                t.scroll(i)
                            }
                        })(O)
                    }
                    G.extraBtn.appendChild(M)
                }
                var N = f.sizzle("a", G.extraBtn);
                G.btnlist = N;
                t.set(q);
                return N
            },
            scroll: function(M) {
                var i = "next";
                if (M === q) {
                    return
                } else {
                    if (M < q) {
                        q = M + 1;
                        q = l.carousel ? 1 : q;
                        i = "prev"
                    } else {
                        q = M - 1;
                        q = l.carousel ? 0 : q
                    }
                }
                j(i, false)
            }
        };
        if (l.extraBtn && (J / l.show >= l.screennum)) {
            t.add()
        }
        if (l.controlsFade) {
            if (J / l.show >= l.screennum) {
                d(G.prevBtn, "display", "");
                d(G.nextBtn, "display", "")
            } else {
                d(G.prevBtn, "display", "none");
                d(G.nextBtn, "display", "none")
            }
            G.prevBtn.className = "W_btn_c_disable btn_page_prev";
            G.nextBtn.className = "W_btn_c btn_page_next"
        }
        var k = function() {};
        var K = f.core.ani.tween(x, {
            duration: l.duration,
            animationType: l.animationType,
            end: function() {
                o = false;
                if (l.auto) {
                    H()
                }
                l.slideCbk && l.slideCbk({
                    slider: x,
                    dir: G.dir,
                    itemWidth: D,
                    index: q,
                    items: w,
                    item: w[q]
                })
            }
        });
        var v;
        var n = function() {
            if (l.auto) {
                H()
            }
        };
        var F = function() {
            clearTimeout(v)
        };
        var H = function(i) {
            i = i || "next";
            clearTimeout(v);
            v = setTimeout(function() {
                j(i, false)
            }, G.speed)
        };
        var z = function(i, M) {
            if (o) {
                return
            }
            o = true;
            j(i);
            F()
        };
        n();

        function j(M) {
            var N = q;
            switch (M) {
                case "next":
                    q = (q >= L) ? (l.continuous ? 0 : L) : q + 1;
                    N = l.carousel ? 1 : q;
                    break;
                case "prev":
                    q = (q <= 0) ? (l.continuous ? L : 0) : q - 1;
                    N = l.carousel ? 0 : q;
                    break;
                case "first":
                    N = q = 0;
                    break;
                case "last":
                    N = q = L;
                    break;
                default:
                    break
            }
            G.dir = M;
            l.beforeSlide && l.beforeSlide({
                slider: x,
                index: q,
                dir: G.dir,
                itemWidth: D,
                items: w,
                item: w[q]
            });
            var i;
            if (!l.vertical) {
                i = (N * D * l.step * -1);
                K.play({
                    marginLeft: i
                })
            } else {
                i = (N * B * l.step * -1);
                K.play({
                    marginTop: i
                })
            } if (l.controlsFade) {
                if (q == 0) {
                    m = false;
                    G.prevBtn.className = "W_btn_c_disable btn_page_prev";
                    G.nextBtn.className = "W_btn_c btn_page_next"
                } else {
                    if (q == L) {
                        m = false;
                        G.prevBtn.className = "W_btn_c btn_page_prev";
                        G.nextBtn.className = "W_btn_c_disable btn_page_next"
                    } else {
                        m = true;
                        G.prevBtn.className = "W_btn_c btn_page_prev";
                        G.nextBtn.className = "W_btn_c btn_page_next"
                    }
                }
            }
            t.set(q)
        }
    };
    var g = function() {
        slider()
    };
    g();
    that.slider = slider;
    return that
});
STK.register("comp.app.focus", function(f) {
    var b = f.core.dom.builder,
        a = f.core.dom.getStyle,
        e = f.core.dom.setStyle,
        d = f.core.dom.addClassName,
        g = f.core.dom.removeClassName,
        c = f.kit.dom.parseDOM;
    return function(k) {
        var i, o;
        var n = function() {
            if (!k) {
                throw "node is not defined"
            }
        };
        var h = function() {
            i = f.kit.dom.parseDOM(f.core.dom.builder(k).list)
        };
        var m = function() {
            o = f.core.evt.delegatedEvent(k);
            o.add("showdesc", "mouseover", q);
            o.add("showdesc", "mouseout", q)
        };
        var q = function(r) {
            if (r.evt.type == "mouseover") {
                d(r.el, "column_selected")
            } else {
                g(r.el, "column_selected")
            }
        };
        var j = function() {
            var r = function(t, s) {
                var u = t[0];
                var v = t[t.length - 1];
                if (s == "next") {
                    f.core.dom.insertAfter(u, v)
                } else {
                    f.core.dom.insertBefore(v, u)
                }
            };
            f.common.app.slider(i, {
                auto: true,
                extraBtn: false,
                carousel: true,
                continuous: true,
                controlsFade: false,
                hoverEvt: true,
                show: 1,
                step: 1,
                speed: 5000,
                beforeSlide: function(x) {
                    var w = x.slider,
                        v = x.items,
                        s = x.item,
                        u = x.index,
                        t = x.dir;
                    if (t == "prev") {
                        r(v, t);
                        e(w, "marginLeft", -x.itemWidth + "px")
                    }
                },
                slideCbk: function(x) {
                    var w = x.slider,
                        v = x.items,
                        s = x.item,
                        u = x.index,
                        t = x.dir;
                    if (t == "next") {
                        r(v, t);
                        e(w, "marginLeft", "0")
                    }
                }
            })
        };
        var l = function() {
            j()
        };
        var p = function() {
            n();
            h();
            m();
            l()
        };
        p()
    }
});
STK.pageletM.register("pl.app.focus", function(b) {
    var a = b.E("pl_app_focus");
    b.comp.app.focus(a)
});
STK.pageletM.start();