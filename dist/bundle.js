import jQuery from 'jquery';

/**
 * MathQuill v0.10.1               http://mathquill.com
 * by Han, Jeanine, and Mary  maintainers@mathquill.com
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL
 * was not distributed with this file, You can obtain
 * one at http://mozilla.org/MPL/2.0/.
 */
!function () {
  function t() {}

  function e(t) {
    var e = t.length - 1;
    return function () {
      var n = kt.call(arguments, 0, e),
          i = kt.call(arguments, e);
      return t.apply(this, n.concat([i]));
    };
  }

  function n(t) {
    return e(function (e, n) {
      "function" != typeof e && (e = jt(e));

      var i = function (t) {
        return e.apply(t, [t].concat(n));
      };

      return t.call(this, i);
    });
  }

  function i(t) {
    var e = kt.call(arguments, 1);
    return function () {
      return t.apply(this, e);
    };
  }

  function s(t, e) {
    if (!e) throw new Error("prayer failed: " + t);
  }

  function r(t) {
    s("a direction was passed", t === Tt || t === Ct);
  }

  function o(t, e, n) {
    s("a parent is always present", t), s("leftward is properly set up", function () {
      return e ? e[Ct] === n && e.parent === t : t.ends[Tt] === n;
    }()), s("rightward is properly set up", function () {
      return n ? n[Tt] === e && n.parent === t : t.ends[Ct] === e;
    }());
  }

  function a() {
    window.console && console.warn('You are using the MathQuill API without specifying an interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014–2015) → v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide');
  }

  function l(t) {
    return a(), bt(t);
  }

  function c(e) {
    function n(t) {
      var e, n;
      return t && t.nodeType ? (e = Dt(t).children(".mq-root-block").attr(xt), n = e && St.byId[e].controller, n ? s[n.KIND_OF_MQ](n) : null) : null;
    }

    function i(t, e) {
      var n, i, r;
      e && e.handlers && (e.handlers = {
        fns: e.handlers,
        APIClasses: s
      });

      for (n in e) e.hasOwnProperty(n) && (i = e[n], r = Ft[n], t[n] = r ? r(i) : i);
    }

    var s, r, o;
    if (!(e >= g && b >= e)) throw "Only interface versions between " + g + " and " + b + " supported. You specified: " + e;
    s = {}, n.L = Tt, n.R = Ct, n.config = function (t) {
      return i(Bt.p, t), this;
    }, n.registerEmbed = function (t, e) {
      if (!/^[a-z][a-z0-9]*$/i.test(t)) throw "Embed name must start with letter and be only letters and digits";
      Nt[t] = e;
    }, r = s.AbstractMathQuill = Qt($t, function (t) {
      t.init = function (t) {
        this.__controller = t, this.__options = t.options, this.id = t.id, this.data = t.data;
      }, t.__mathquillify = function (t) {
        var e,
            n = this.__controller,
            i = n.root,
            s = n.container;
        n.createTextarea(), e = s.addClass(t).contents().detach(), i.jQ = Dt('<span class="mq-root-block"/>').attr(xt, i.id).appendTo(s), this.latex(e.text()), this.revert = function () {
          return s.empty().unbind(".mathquill").removeClass("mq-editable-field mq-math-mode mq-text-mode").append(e);
        };
      }, t.config = function (t) {
        return i(this.__options, t), this;
      }, t.el = function () {
        return this.__controller.container[0];
      }, t.text = function () {
        return this.__controller.exportText();
      }, t.latex = function (t) {
        return arguments.length > 0 ? (this.__controller.renderLatexMath(t), this.__controller.blurred && this.__controller.cursor.hide().parent.blur(), this) : this.__controller.exportLatex();
      }, t.html = function () {
        return this.__controller.root.jQ.html().replace(/ mathquill-(?:command|block)-id="?\d+"?/g, "").replace(/<span class="?mq-cursor( mq-blink)?"?>.?<\/span>/i, "").replace(/ mq-hasCursor|mq-hasCursor ?/, "").replace(/ class=(""|(?= |>))/g, "");
      }, t.reflow = function () {
        return this.__controller.root.postOrder("reflow"), this;
      };
    }), n.prototype = r.prototype, s.EditableField = Qt(r, function (e, n) {
      e.__mathquillify = function () {
        return n.__mathquillify.apply(this, arguments), this.__controller.editable = !0, this.__controller.delegateMouseEvents(), this.__controller.editablesTextareaEvents(), this;
      }, e.focus = function () {
        return this.__controller.textarea.focus(), this;
      }, e.blur = function () {
        return this.__controller.textarea.blur(), this;
      }, e.write = function (t) {
        return this.__controller.writeLatex(t), this.__controller.scrollHoriz(), this.__controller.blurred && this.__controller.cursor.hide().parent.blur(), this;
      }, e.cmd = function (t) {
        var e,
            n = this.__controller.notify(),
            i = n.cursor;

        return /^\\[a-z]+$/i.test(t) ? (t = t.slice(1), e = Et[t], e && (t = e(t), i.selection && t.replaces(i.replaceSelection()), t.createLeftOf(i.show()), this.__controller.scrollHoriz())) : i.parent.write(i, t), n.blurred && i.hide().parent.blur(), this;
      }, e.select = function () {
        var t = this.__controller;

        for (t.notify("move").cursor.insAtRightEnd(t.root); t.cursor[Tt];) t.selectLeft();

        return this;
      }, e.clearSelection = function () {
        return this.__controller.cursor.clearSelection(), this;
      }, e.moveToDirEnd = function (t) {
        return this.__controller.notify("move").cursor.insAtDirEnd(t, this.__controller.root), this;
      }, e.moveToLeftEnd = function () {
        return this.moveToDirEnd(Tt);
      }, e.moveToRightEnd = function () {
        return this.moveToDirEnd(Ct);
      }, e.keystroke = function (e) {
        var n;

        for (e = e.replace(/^\s+|\s+$/g, "").split(/\s+/), n = 0; n < e.length; n += 1) this.__controller.keystroke(e[n], {
          preventDefault: t
        });

        return this;
      }, e.typedText = function (t) {
        for (var e = 0; e < t.length; e += 1) this.__controller.typedText(t.charAt(e));

        return this;
      }, e.dropEmbedded = function (t, e, n) {
        var i,
            s = t - Dt(window).scrollLeft(),
            r = e - Dt(window).scrollTop(),
            o = document.elementFromPoint(s, r);
        this.__controller.seek(Dt(o), t, e), i = gt().setOptions(n), i.createLeftOf(this.__controller.cursor);
      };
    }), n.EditableField = function () {
      throw "wtf don't call me, I'm 'abstract'";
    }, n.EditableField.prototype = s.EditableField.prototype;

    for (o in Mt) (function (t, i) {
      var r = s[t] = i(s);
      n[t] = function (i, s) {
        var o,
            a = n(i);
        return a instanceof r || !i || !i.nodeType ? a : (o = zt(r.RootBlock(), Dt(i), Bt()), o.KIND_OF_MQ = t, r(o).__mathquillify(s, e));
      }, n[t].prototype = r.prototype;
    })(o, Mt[o]);

    return n;
  }

  function u(t) {
    var e,
        n = "moveOutOf deleteOutOf selectOutOf upOutOf downOutOf".split(" ");

    for (e = 0; e < n.length; e += 1) (function (e) {
      t[e] = function (t) {
        this.controller.handle(e, t);
      };
    })(n[e]);

    t.reflow = function () {
      this.controller.handle("reflow"), this.controller.handle("edited"), this.controller.handle("edit");
    };
  }

  function h(t, e, n) {
    return Qt(D, {
      ctrlSeq: t,
      htmlTemplate: "<" + e + " " + n + ">&0</" + e + ">"
    });
  }

  function f(t) {
    var e = this.parent,
        n = t;

    do {
      if (n[Ct]) return t.insLeftOf(e);
      n = n.parent.parent;
    } while (n !== e);

    t.insRightOf(e);
  }

  function p(t, e) {
    t.jQadd = function () {
      e.jQadd.apply(this, arguments), this.delimjQs = this.jQ.children(":first").add(this.jQ.children(":last")), this.contentjQ = this.jQ.children(":eq(1)");
    }, t.reflow = function () {
      var t = this.contentjQ.outerHeight() / parseFloat(this.contentjQ.css("fontSize"));
      Y(this.delimjQs, yt(1 + .2 * (t - 1), 1.2), 1.2 * t);
    };
  }

  function d(t, e) {
    var e = e || t,
        n = pt[t],
        s = pt[e];
    At[t] = i(ft, Tt, t, n, e, s), At[n] = i(ft, Ct, t, n, e, s);
  }

  var m,
      g,
      b,
      v,
      w,
      q,
      x,
      y,
      O,
      k,
      j,
      Q,
      T,
      C,
      D,
      _,
      S,
      L,
      A,
      R,
      I,
      z,
      M,
      B,
      F,
      $,
      N,
      P,
      U,
      W,
      H,
      G,
      K,
      Y,
      X,
      Z,
      V,
      J,
      tt,
      et,
      nt,
      rt,
      ot,
      at,
      lt,
      ct,
      ht,
      ft,
      pt,
      dt,
      gt,
      bt,
      vt,
      wt = window.jQuery,
      qt = "mathquill-command-id",
      xt = "mathquill-block-id",
      yt = Math.min,
      Ot = Math.max,
      kt = [].slice,
      jt = e(function (t, n) {
    return e(function (e, i) {
      return t in e ? e[t].apply(e, n.concat(i)) : void 0;
    });
  }),
      Qt = function (t, e, n) {
    function i(t) {
      return "object" == typeof t;
    }

    function s(t) {
      return "function" == typeof t;
    }

    function r() {}

    return function o(a, l) {
      function c() {
        var t = new u();
        return s(t.init) && t.init.apply(t, arguments), t;
      }

      function u() {}

      var h, f, p;
      return l === n && (l = a, a = Object), c.Bare = u, h = r[t] = a[t], f = u[t] = c[t] = c.p = new r(), f.constructor = c, c.mixin = function (e) {
        return u[t] = c[t] = o(c, e)[t], c;
      }, (c.open = function (t) {
        if (p = {}, s(t) ? p = t.call(c, f, h, c, a) : i(t) && (p = t), i(p)) for (var n in p) e.call(p, n) && (f[n] = p[n]);
        return s(f.init) || (f.init = a), c;
      })(l);
    };
  }("prototype", {}.hasOwnProperty),
      Tt = -1,
      Ct = 1,
      Dt = Qt(wt, function (t) {
    t.insDirOf = function (t, e) {
      return t === Tt ? this.insertBefore(e.first()) : this.insertAfter(e.last());
    }, t.insAtDirEnd = function (t, e) {
      return t === Tt ? this.prependTo(e) : this.appendTo(e);
    };
  }),
      _t = Qt(function (t) {
    t.parent = 0, t[Tt] = 0, t[Ct] = 0, t.init = function (t, e, n) {
      this.parent = t, this[Tt] = e, this[Ct] = n;
    }, this.copy = function (t) {
      return _t(t.parent, t[Tt], t[Ct]);
    };
  }),
      St = Qt(function (t) {
    function e() {
      return i += 1;
    }

    t[Tt] = 0, t[Ct] = 0, t.parent = 0;
    var i = 0;
    this.byId = {}, t.init = function () {
      this.id = e(), St.byId[this.id] = this, this.ends = {}, this.ends[Tt] = 0, this.ends[Ct] = 0;
    }, t.dispose = function () {
      delete St.byId[this.id];
    }, t.toString = function () {
      return "{{ MathQuill Node #" + this.id + " }}";
    }, t.jQ = Dt(), t.jQadd = function (t) {
      return this.jQ = this.jQ.add(t);
    }, t.jQize = function (t) {
      function e(t) {
        var n, i;

        for (t.getAttribute && (n = t.getAttribute("mathquill-command-id"), i = t.getAttribute("mathquill-block-id"), n && St.byId[n].jQadd(t), i && St.byId[i].jQadd(t)), t = t.firstChild; t; t = t.nextSibling) e(t);
      }

      var n;

      for (t = Dt(t || this.html()), n = 0; n < t.length; n += 1) e(t[n]);

      return t;
    }, t.createDir = function (t, e) {
      r(t);
      var n = this;
      return n.jQize(), n.jQ.insDirOf(t, e.jQ), e[t] = n.adopt(e.parent, e[Tt], e[Ct]), n;
    }, t.createLeftOf = function (t) {
      return this.createDir(Tt, t);
    }, t.selectChildren = function (t, e) {
      return It(t, e);
    }, t.bubble = n(function (t) {
      var e, n;

      for (e = this; e && (n = t(e), n !== !1); e = e.parent);

      return this;
    }), t.postOrder = n(function (t) {
      return function e(n) {
        n.eachChild(e), t(n);
      }(this), this;
    }), t.isEmpty = function () {
      return 0 === this.ends[Tt] && 0 === this.ends[Ct];
    }, t.children = function () {
      return Lt(this.ends[Tt], this.ends[Ct]);
    }, t.eachChild = function () {
      var t = this.children();
      return t.each.apply(t, arguments), this;
    }, t.foldChildren = function (t, e) {
      return this.children().fold(t, e);
    }, t.withDirAdopt = function (t, e, n, i) {
      return Lt(this, this).withDirAdopt(t, e, n, i), this;
    }, t.adopt = function (t, e, n) {
      return Lt(this, this).adopt(t, e, n), this;
    }, t.disown = function () {
      return Lt(this, this).disown(), this;
    }, t.remove = function () {
      return this.jQ.remove(), this.postOrder("dispose"), this.disown();
    };
  }),
      Lt = Qt(function (t) {
    t.init = function (t, e, n) {
      if (n === m && (n = Tt), r(n), s("no half-empty fragments", !t == !e), this.ends = {}, t) {
        s("withDir is passed to Fragment", t instanceof St), s("oppDir is passed to Fragment", e instanceof St), s("withDir and oppDir have the same parent", t.parent === e.parent), this.ends[n] = t, this.ends[-n] = e;
        var i = this.fold([], function (t, e) {
          return t.push.apply(t, e.jQ.get()), t;
        });
        this.jQ = this.jQ.add(i);
      }
    }, t.jQ = Dt(), t.withDirAdopt = function (t, e, n, i) {
      return t === Tt ? this.adopt(e, n, i) : this.adopt(e, i, n);
    }, t.adopt = function (t, e, n) {
      var i, s, r;
      return o(t, e, n), i = this, i.disowned = !1, (s = i.ends[Tt]) ? (r = i.ends[Ct], e || (t.ends[Tt] = s), n ? n[Tt] = r : t.ends[Ct] = r, i.ends[Ct][Ct] = n, i.each(function (n) {
        n[Tt] = e, n.parent = t, e && (e[Ct] = n), e = n;
      }), i) : this;
    }, t.disown = function () {
      var t,
          e,
          n = this,
          i = n.ends[Tt];
      return !i || n.disowned ? n : (n.disowned = !0, t = n.ends[Ct], e = i.parent, o(e, i[Tt], i), o(e, t, t[Ct]), i[Tt] ? i[Tt][Ct] = t[Ct] : e.ends[Tt] = t[Ct], t[Ct] ? t[Ct][Tt] = i[Tt] : e.ends[Ct] = i[Tt], n);
    }, t.remove = function () {
      return this.jQ.remove(), this.each("postOrder", "dispose"), this.disown();
    }, t.each = n(function (t) {
      var e,
          n = this,
          i = n.ends[Tt];
      if (!i) return n;

      for (; i !== n.ends[Ct][Ct] && (e = t(i), e !== !1); i = i[Ct]);

      return n;
    }), t.fold = function (t, e) {
      return this.each(function (n) {
        t = e.call(this, t, n);
      }), t;
    };
  }),
      Et = {},
      At = {},
      Rt = Qt(_t, function (t) {
    t.init = function (t, e) {
      this.parent = t, this.options = e;
      var n = this.jQ = this._jQ = Dt('<span class="mq-cursor">&#8203;</span>');
      this.blink = function () {
        n.toggleClass("mq-blink");
      }, this.upDownCache = {};
    }, t.show = function () {
      return this.jQ = this._jQ.removeClass("mq-blink"), "intervalId" in this ? clearInterval(this.intervalId) : (this[Ct] ? this.selection && this.selection.ends[Tt][Tt] === this[Tt] ? this.jQ.insertBefore(this.selection.jQ) : this.jQ.insertBefore(this[Ct].jQ.first()) : this.jQ.appendTo(this.parent.jQ), this.parent.focus()), this.intervalId = setInterval(this.blink, 500), this;
    }, t.hide = function () {
      return "intervalId" in this && clearInterval(this.intervalId), delete this.intervalId, this.jQ.detach(), this.jQ = Dt(), this;
    }, t.withDirInsertAt = function (t, e, n, i) {
      var s = this.parent;
      this.parent = e, this[t] = n, this[-t] = i, s !== e && s.blur && s.blur();
    }, t.insDirOf = function (t, e) {
      return r(t), this.jQ.insDirOf(t, e.jQ), this.withDirInsertAt(t, e.parent, e[t], e), this.parent.jQ.addClass("mq-hasCursor"), this;
    }, t.insLeftOf = function (t) {
      return this.insDirOf(Tt, t);
    }, t.insRightOf = function (t) {
      return this.insDirOf(Ct, t);
    }, t.insAtDirEnd = function (t, e) {
      return r(t), this.jQ.insAtDirEnd(t, e.jQ), this.withDirInsertAt(t, e, 0, e.ends[t]), e.focus(), this;
    }, t.insAtLeftEnd = function (t) {
      return this.insAtDirEnd(Tt, t);
    }, t.insAtRightEnd = function (t) {
      return this.insAtDirEnd(Ct, t);
    }, t.jumpUpDown = function (t, e) {
      var n,
          i,
          s = this;
      s.upDownCache[t.id] = _t.copy(s), n = s.upDownCache[e.id], n ? n[Ct] ? s.insLeftOf(n[Ct]) : s.insAtRightEnd(n.parent) : (i = s.offset().left, e.seek(i, s));
    }, t.offset = function () {
      var t = this,
          e = t.jQ.removeClass("mq-cursor").offset();
      return t.jQ.addClass("mq-cursor"), e;
    }, t.unwrapGramp = function () {
      var t = this.parent.parent,
          e = t.parent,
          n = t[Ct],
          i = this,
          s = t[Tt];
      if (t.disown().eachChild(function (i) {
        i.isEmpty() || (i.children().adopt(e, s, n).each(function (e) {
          e.jQ.insertBefore(t.jQ.first());
        }), s = i.ends[Ct]);
      }), !this[Ct]) if (this[Tt]) this[Ct] = this[Tt][Ct];else for (; !this[Ct];) {
        if (this.parent = this.parent[Ct], !this.parent) {
          this[Ct] = t[Ct], this.parent = e;
          break;
        }

        this[Ct] = this.parent.ends[Tt];
      }
      this[Ct] ? this.insLeftOf(this[Ct]) : this.insAtRightEnd(e), t.jQ.remove(), t[Tt].siblingDeleted && t[Tt].siblingDeleted(i.options, Ct), t[Ct].siblingDeleted && t[Ct].siblingDeleted(i.options, Tt);
    }, t.startSelection = function () {
      var t,
          e = this.anticursor = _t.copy(this),
          n = e.ancestors = {};

      for (t = e; t.parent; t = t.parent) n[t.parent.id] = t;
    }, t.endSelection = function () {
      delete this.anticursor;
    }, t.select = function () {
      var t,
          e,
          n,
          i,
          r,
          o,
          a,
          l = this.anticursor;
      if (this[Tt] === l[Tt] && this.parent === l.parent) return !1;

      for (t = this; t.parent; t = t.parent) if (t.parent.id in l.ancestors) {
        e = t.parent;
        break;
      }

      if (s("cursor and anticursor in the same tree", e), n = l.ancestors[e.id], o = Ct, t[Tt] !== n) for (a = t; a; a = a[Ct]) if (a[Ct] === n[Ct]) {
        o = Tt, i = t, r = n;
        break;
      }
      return o === Ct && (i = n, r = t), i instanceof _t && (i = i[Ct]), r instanceof _t && (r = r[Tt]), this.hide().selection = e.selectChildren(i, r), this.insDirOf(o, this.selection.ends[o]), this.selectionChanged(), !0;
    }, t.clearSelection = function () {
      return this.selection && (this.selection.clear(), delete this.selection, this.selectionChanged()), this;
    }, t.deleteSelection = function () {
      this.selection && (this[Tt] = this.selection.ends[Tt][Tt], this[Ct] = this.selection.ends[Ct][Ct], this.selection.remove(), this.selectionChanged(), delete this.selection);
    }, t.replaceSelection = function () {
      var t = this.selection;
      return t && (this[Tt] = t.ends[Tt][Tt], this[Ct] = t.ends[Ct][Ct], delete this.selection), t;
    };
  }),
      It = Qt(Lt, function (t, e) {
    t.init = function () {
      e.init.apply(this, arguments), this.jQ = this.jQ.wrapAll('<span class="mq-selection"></span>').parent();
    }, t.adopt = function () {
      return this.jQ.replaceWith(this.jQ = this.jQ.children()), e.adopt.apply(this, arguments);
    }, t.clear = function () {
      return this.jQ.replaceWith(this.jQ[0].childNodes), this;
    }, t.join = function (t) {
      return this.fold("", function (e, n) {
        return e + n[t]();
      });
    };
  }),
      zt = Qt(function (t) {
    t.init = function (t, e, n) {
      this.id = t.id, this.data = {}, this.root = t, this.container = e, this.options = n, t.controller = this, this.cursor = t.cursor = Rt(t, n);
    }, t.handle = function (t, e) {
      var n,
          i = this.options.handlers;
      i && i.fns[t] && (n = i.APIClasses[this.KIND_OF_MQ](this), e === Tt || e === Ct ? i.fns[t](e, n) : i.fns[t](n));
    };
    var e = [];
    this.onNotify = function (t) {
      e.push(t);
    }, t.notify = function () {
      for (var t = 0; t < e.length; t += 1) e[t].apply(this.cursor, arguments);

      return this;
    };
  }),
      Mt = {},
      Bt = Qt(),
      Ft = {},
      $t = Qt(),
      Nt = {};

  l.prototype = $t.p, l.interfaceVersion = function (t) {
    if (1 !== t) throw "Only interface version 1 supported. You specified: " + t;
    return a = function () {
      window.console && console.warn('You called MathQuill.interfaceVersion(1); to specify the interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014–2015) → v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide');
    }, a(), l;
  }, l.getInterface = c, g = c.MIN = 1, b = c.MAX = 2, l.noConflict = function () {
    return window.MathQuill = v, l;
  }, v = window.MathQuill, window.MathQuill = l, w = Qt(function (t, e, n) {
    function i(t, e) {
      throw t = t ? "'" + t + "'" : "EOF", "Parse Error: " + e + " at " + t;
    }

    var o, a, b;
    t.init = function (t) {
      this._ = t;
    }, t.parse = function (t) {
      function e(t, e) {
        return e;
      }

      return this.skip(b)._("" + t, e, i);
    }, t.or = function (t) {
      s("or is passed a parser", t instanceof n);
      var e = this;
      return n(function (n, i, s) {
        function r(e) {
          return t._(n, i, s);
        }

        return e._(n, i, r);
      });
    }, t.then = function (t) {
      var e = this;
      return n(function (i, r, o) {
        function a(e, i) {
          var a = t instanceof n ? t : t(i);
          return s("a parser is returned", a instanceof n), a._(e, r, o);
        }

        return e._(i, a, o);
      });
    }, t.many = function () {
      var t = this;
      return n(function (e, n, i) {
        function s(t, n) {
          return e = t, o.push(n), !0;
        }

        function r() {
          return !1;
        }

        for (var o = []; t._(e, s, r););

        return n(e, o);
      });
    }, t.times = function (t, e) {
      arguments.length < 2 && (e = t);
      var i = this;
      return n(function (n, s, r) {
        function o(t, e) {
          return h.push(e), n = t, !0;
        }

        function a(t, e) {
          return c = e, n = t, !1;
        }

        function l(t, e) {
          return !1;
        }

        var c,
            u,
            h = [],
            f = !0;

        for (u = 0; t > u; u += 1) if (f = i._(n, o, a), !f) return r(n, c);

        for (; e > u && f; u += 1) f = i._(n, o, l);

        return s(n, h);
      });
    }, t.result = function (t) {
      return this.then(a(t));
    }, t.atMost = function (t) {
      return this.times(0, t);
    }, t.atLeast = function (t) {
      var e = this;
      return e.times(t).then(function (t) {
        return e.many().map(function (e) {
          return t.concat(e);
        });
      });
    }, t.map = function (t) {
      return this.then(function (e) {
        return a(t(e));
      });
    }, t.skip = function (t) {
      return this.then(function (e) {
        return t.result(e);
      });
    }, this.string = function (t) {
      var e = t.length,
          i = "expected '" + t + "'";
      return n(function (n, s, r) {
        var o = n.slice(0, e);
        return o === t ? s(n.slice(e), o) : r(n, i);
      });
    }, o = this.regex = function (t) {
      s("regexp parser is anchored", "^" === t.toString().charAt(1));
      var e = "expected " + t;
      return n(function (n, i, s) {
        var r,
            o = t.exec(n);
        return o ? (r = o[0], i(n.slice(r.length), r)) : s(n, e);
      });
    }, a = n.succeed = function (t) {
      return n(function (e, n) {
        return n(e, t);
      });
    }, n.fail = function (t) {
      return n(function (e, n, i) {
        return i(e, t);
      });
    }, n.letter = o(/^[a-z]/i), n.letters = o(/^[a-z]*/i), n.digit = o(/^[0-9]/), n.digits = o(/^[0-9]*/), n.whitespace = o(/^\s+/), n.optWhitespace = o(/^\s*/), n.any = n(function (t, e, n) {
      return t ? e(t.slice(1), t.charAt(0)) : n(t, "expected any character");
    }), n.all = n(function (t, e, n) {
      return e("", t);
    }), b = n.eof = n(function (t, e, n) {
      return t ? n(t, "expected EOF") : e(t, t);
    });
  }), q = function () {
    function e(t) {
      var e,
          i = t.which || t.keyCode,
          s = n[i],
          r = [];
      return t.ctrlKey && r.push("Ctrl"), t.originalEvent && t.originalEvent.metaKey && r.push("Meta"), t.altKey && r.push("Alt"), t.shiftKey && r.push("Shift"), e = s || String.fromCharCode(i), r.length || s ? (r.push(e), r.join("-")) : e;
    }

    var n = {
      8: "Backspace",
      9: "Tab",
      10: "Enter",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      20: "CapsLock",
      27: "Esc",
      32: "Spacebar",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "Left",
      38: "Up",
      39: "Right",
      40: "Down",
      45: "Insert",
      46: "Del",
      144: "NumLock"
    };
    return function (n, i) {
      function s(t) {
        q = t, clearTimeout(d), d = setTimeout(t);
      }

      function r(e) {
        q(), q = t, clearTimeout(d), v.val(e), e && v[0].select && v[0].select(), m = !!e;
      }

      function o() {
        var t = v[0];
        return "selectionStart" in t ? t.selectionStart !== t.selectionEnd : !1;
      }

      function a() {
        i.keystroke(e(g), g);
      }

      function l(e) {
        g = e, b = null, m && s(function (e) {
          e && "focusout" === e.type || !v[0].select || v[0].select(), q = t, clearTimeout(d);
        }), a();
      }

      function c(t) {
        g && b && a(), b = t, s(u);
      }

      function u() {
        if (!o()) {
          var t = v.val();
          1 === t.length ? (v.val(""), i.typedText(t)) : t && v[0].select && v[0].select();
        }
      }

      function h() {
        g = b = null;
      }

      function f(t) {
        v.focus(), s(p);
      }

      function p() {
        var t = v.val();
        v.val(""), t && i.paste(t);
      }

      var d,
          m,
          g = null,
          b = null,
          v = wt(n),
          w = wt(i.container || v),
          q = t;
      return w.bind("keydown keypress input keyup focusout paste", function (t) {
        q(t);
      }), m = !1, w.bind({
        keydown: l,
        keypress: c,
        focusout: h,
        paste: f
      }), {
        select: r
      };
    };
  }(), zt.open(function (t, e) {
    t.exportText = function () {
      return this.root.foldChildren("", function (t, e) {
        return t + e.text();
      });
    };
  }), zt.open(function (t) {
    t.focusBlurEvents = function () {
      function t() {
        clearTimeout(n), r.selection && r.selection.jQ.addClass("mq-blur"), e();
      }

      function e() {
        r.hide().parent.blur(), i.container.removeClass("mq-focused"), Dt(window).off("blur", t);
      }

      var n,
          i = this,
          s = i.root,
          r = i.cursor;
      i.textarea.focus(function () {
        i.blurred = !1, clearTimeout(n), i.container.addClass("mq-focused"), r.parent || r.insAtRightEnd(s), r.selection ? (r.selection.jQ.removeClass("mq-blur"), i.selectionChanged()) : r.show();
      }).blur(function () {
        i.blurred = !0, n = setTimeout(function () {
          s.postOrder("intentionalBlur"), r.clearSelection().endSelection(), e();
        }), Dt(window).on("blur", t);
      }), i.blurred = !0, r.hide().parent.blur();
    };
  }), zt.open(function (t) {
    t.keystroke = function (t, e) {
      this.cursor.parent.keystroke(t, e, this);
    };
  }), St.open(function (t) {
    t.keystroke = function (t, e, n) {
      var i = n.cursor;

      switch (t) {
        case "Ctrl-Shift-Backspace":
        case "Ctrl-Backspace":
          n.ctrlDeleteDir(Tt);
          break;

        case "Shift-Backspace":
        case "Backspace":
          n.backspace();
          break;

        case "Esc":
        case "Tab":
          return void n.escapeDir(Ct, t, e);

        case "Shift-Tab":
        case "Shift-Esc":
          return void n.escapeDir(Tt, t, e);

        case "End":
          n.notify("move").cursor.insAtRightEnd(i.parent);
          break;

        case "Ctrl-End":
          n.notify("move").cursor.insAtRightEnd(n.root);
          break;

        case "Shift-End":
          for (; i[Ct];) n.selectRight();

          break;

        case "Ctrl-Shift-End":
          for (; i[Ct] || i.parent !== n.root;) n.selectRight();

          break;

        case "Home":
          n.notify("move").cursor.insAtLeftEnd(i.parent);
          break;

        case "Ctrl-Home":
          n.notify("move").cursor.insAtLeftEnd(n.root);
          break;

        case "Shift-Home":
          for (; i[Tt];) n.selectLeft();

          break;

        case "Ctrl-Shift-Home":
          for (; i[Tt] || i.parent !== n.root;) n.selectLeft();

          break;

        case "Left":
          n.moveLeft();
          break;

        case "Shift-Left":
          n.selectLeft();
          break;

        case "Ctrl-Left":
          break;

        case "Right":
          n.moveRight();
          break;

        case "Shift-Right":
          n.selectRight();
          break;

        case "Ctrl-Right":
          break;

        case "Up":
          n.moveUp();
          break;

        case "Down":
          n.moveDown();
          break;

        case "Shift-Up":
          if (i[Tt]) for (; i[Tt];) n.selectLeft();else n.selectLeft();

        case "Shift-Down":
          if (i[Ct]) for (; i[Ct];) n.selectRight();else n.selectRight();

        case "Ctrl-Up":
          break;

        case "Ctrl-Down":
          break;

        case "Ctrl-Shift-Del":
        case "Ctrl-Del":
          n.ctrlDeleteDir(Ct);
          break;

        case "Shift-Del":
        case "Del":
          n.deleteForward();
          break;

        case "Meta-A":
        case "Ctrl-A":
          for (n.notify("move").cursor.insAtRightEnd(n.root); i[Tt];) n.selectLeft();

          break;

        default:
          return;
      }

      e.preventDefault(), n.scrollHoriz();
    }, t.moveOutOf = t.moveTowards = t.deleteOutOf = t.deleteTowards = t.unselectInto = t.selectOutOf = t.selectTowards = function () {
      s("overridden or never called on this node");
    };
  }), zt.open(function (t) {
    function e(t, e) {
      var n = t.notify("upDown").cursor,
          i = e + "Into",
          s = e + "OutOf";
      return n[Ct][i] ? n.insAtLeftEnd(n[Ct][i]) : n[Tt][i] ? n.insAtRightEnd(n[Tt][i]) : n.parent.bubble(function (t) {
        var e = t[s];
        return e && ("function" == typeof e && (e = t[s](n)), e instanceof St && n.jumpUpDown(t, e), e !== !0) ? !1 : void 0;
      }), t;
    }

    this.onNotify(function (t) {
      ("move" === t || "upDown" === t) && this.show().clearSelection();
    }), t.escapeDir = function (t, e, n) {
      r(t);
      var i = this.cursor;
      return i.parent !== this.root && n.preventDefault(), i.parent !== this.root ? (i.parent.moveOutOf(t, i), this.notify("move")) : void 0;
    }, Ft.leftRightIntoCmdGoes = function (t) {
      if (t && "up" !== t && "down" !== t) throw '"up" or "down" required for leftRightIntoCmdGoes option, got "' + t + '"';
      return t;
    }, t.moveDir = function (t) {
      r(t);
      var e = this.cursor,
          n = e.options.leftRightIntoCmdGoes;
      return e.selection ? e.insDirOf(t, e.selection.ends[t]) : e[t] ? e[t].moveTowards(t, e, n) : e.parent.moveOutOf(t, e, n), this.notify("move");
    }, t.moveLeft = function () {
      return this.moveDir(Tt);
    }, t.moveRight = function () {
      return this.moveDir(Ct);
    }, t.moveUp = function () {
      return e(this, "up");
    }, t.moveDown = function () {
      return e(this, "down");
    }, this.onNotify(function (t) {
      "upDown" !== t && (this.upDownCache = {});
    }), this.onNotify(function (t) {
      "edit" === t && this.show().deleteSelection();
    }), t.deleteDir = function (t) {
      var e, n;
      return r(t), e = this.cursor, n = e.selection, this.notify("edit"), n || (e[t] ? e[t].deleteTowards(t, e) : e.parent.deleteOutOf(t, e)), e[Tt].siblingDeleted && e[Tt].siblingDeleted(e.options, Ct), e[Ct].siblingDeleted && e[Ct].siblingDeleted(e.options, Tt), e.parent.bubble("reflow"), this;
    }, t.ctrlDeleteDir = function (t) {
      r(t);
      var e = this.cursor;
      return !e[Tt] || e.selection ? ctrlr.deleteDir() : (this.notify("edit"), Lt(e.parent.ends[Tt], e[Tt]).remove(), e.insAtDirEnd(Tt, e.parent), e[Tt].siblingDeleted && e[Tt].siblingDeleted(e.options, Ct), e[Ct].siblingDeleted && e[Ct].siblingDeleted(e.options, Tt), e.parent.bubble("reflow"), this);
    }, t.backspace = function () {
      return this.deleteDir(Tt);
    }, t.deleteForward = function () {
      return this.deleteDir(Ct);
    }, this.onNotify(function (t) {
      "select" !== t && this.endSelection();
    }), t.selectDir = function (t) {
      var e,
          n = this.notify("select").cursor,
          i = n.selection;
      r(t), n.anticursor || n.startSelection(), e = n[t], e ? i && i.ends[t] === e && n.anticursor[-t] !== e ? e.unselectInto(t, n) : e.selectTowards(t, n) : n.parent.selectOutOf(t, n), n.clearSelection(), n.select() || n.show();
    }, t.selectLeft = function () {
      return this.selectDir(Tt);
    }, t.selectRight = function () {
      return this.selectDir(Ct);
    };
  }), x = function () {
    function t(t) {
      var e = T();
      return t.adopt(e, 0, 0), e;
    }

    function e(t) {
      var e,
          n = t[0] || T();

      for (e = 1; e < t.length; e += 1) t[e].children().adopt(n, n.ends[Ct], 0);

      return n;
    }

    var n = w.string,
        i = w.regex,
        s = w.letter,
        r = w.any,
        o = w.optWhitespace,
        a = w.succeed,
        l = w.fail,
        c = s.map(function (t) {
      return I(t);
    }),
        u = i(/^[^${}\\_^]/).map(function (t) {
      return j(t);
    }),
        h = i(/^[^\\a-eg-zA-Z]/).or(n("\\").then(i(/^[a-z]+/i).or(i(/^\s+/).result(" ")).or(r))).then(function (t) {
      var e = Et[t];
      return e ? e(t).parser() : l("unknown command: \\" + t);
    }),
        f = h.or(c).or(u),
        p = n("{").then(function () {
      return m;
    }).skip(n("}")),
        d = o.then(p.or(f.map(t))),
        m = d.many().map(e).skip(o),
        g = n("[").then(d.then(function (t) {
      return "]" !== t.join("latex") ? a(t) : l();
    }).many().map(e).skip(o)).skip(n("]")),
        b = m;
    return b.block = d, b.optBlock = g, b;
  }(), zt.open(function (t, e) {
    t.exportLatex = function () {
      return this.root.latex().replace(/(\\[a-z]+) (?![a-z])/gi, "$1");
    }, t.writeLatex = function (t) {
      var e,
          n = this.notify("edit").cursor,
          i = w.all,
          s = w.eof,
          r = x.skip(s).or(i.result(!1)).parse(t);
      return r && !r.isEmpty() && (r.children().adopt(n.parent, n[Tt], n[Ct]), e = r.jQize(), e.insertBefore(n.jQ), n[Tt] = r.ends[Ct], r.finalizeInsert(n.options, n), r.ends[Ct][Ct].siblingCreated && r.ends[Ct][Ct].siblingCreated(n.options, Tt), r.ends[Tt][Tt].siblingCreated && r.ends[Tt][Tt].siblingCreated(n.options, Ct), n.parent.bubble("reflow")), this;
    }, t.renderLatexMath = function (t) {
      var e,
          n,
          i = this.root,
          s = this.cursor,
          r = w.all,
          o = w.eof,
          a = x.skip(o).or(r.result(!1)).parse(t);
      i.eachChild("postOrder", "dispose"), i.ends[Tt] = i.ends[Ct] = 0, a && a.children().adopt(i, 0, 0), e = i.jQ, a ? (n = a.join("html"), e.html(n), i.jQize(e.children()), i.finalizeInsert(s.options)) : e.empty(), delete s.selection, s.insAtRightEnd(i);
    }, t.renderLatexText = function (t) {
      var e,
          n,
          i,
          s,
          r,
          o,
          a,
          l,
          c,
          u,
          h = this.root,
          f = this.cursor;

      if (h.jQ.children().slice(1).remove(), h.eachChild("postOrder", "dispose"), h.ends[Tt] = h.ends[Ct] = 0, delete f.selection, f.show().insAtRightEnd(h), e = w.regex, n = w.string, i = w.eof, s = w.all, r = n("$").then(x).skip(n("$").or(i)).map(function (t) {
        var e,
            n = S(f);
        return n.createBlocks(), e = n.ends[Tt], t.children().adopt(e, 0, 0), n;
      }), o = n("\\$").result("$"), a = o.or(e(/^[^$]/)).map(j), l = r.or(a).many(), c = l.skip(i).or(s.result(!1)).parse(t)) {
        for (u = 0; u < c.length; u += 1) c[u].adopt(h, h.ends[Ct], 0);

        h.jQize().appendTo(h.jQ), h.finalizeInsert(f.options);
      }
    };
  }), zt.open(function (e) {
    e.delegateMouseEvents = function () {
      var e = this.root.jQ;
      this.container.bind("mousedown.mathquill", function (n) {
        function i(t) {
          o = Dt(t.target);
        }

        function s(t) {
          u.anticursor || u.startSelection(), c.seek(o, t.pageX, t.pageY).cursor.select(), o = m;
        }

        function r(t) {
          u.blink = h, u.selection || (c.editable ? u.show() : f.detach()), a.unbind("mousemove", i), Dt(t.target.ownerDocument).unbind("mousemove", s).unbind("mouseup", r);
        }

        var o,
            a = Dt(n.target).closest(".mq-root-block"),
            l = St.byId[a.attr(xt) || e.attr(xt)],
            c = l.controller,
            u = c.cursor,
            h = u.blink,
            f = c.textareaSpan,
            p = c.textarea;
        c.blurred && (c.editable || a.prepend(f), p.focus()), n.preventDefault(), n.target.unselectable = !0, u.blink = t, c.seek(Dt(n.target), n.pageX, n.pageY).cursor.startSelection(), a.mousemove(i), Dt(n.target.ownerDocument).mousemove(s).mouseup(r);
      });
    };
  }), zt.open(function (t) {
    t.seek = function (t, e, n) {
      var i,
          r,
          o,
          a = this.notify("select").cursor;
      return t && (i = t.attr(xt) || t.attr(qt), i || (r = t.parent(), i = r.attr(xt) || r.attr(qt))), o = i ? St.byId[i] : this.root, s("nodeId is the id of some Node that exists", o), a.clearSelection().show(), o.seek(e, a), this.scrollHoriz(), this;
    };
  }), zt.open(function (t) {
    t.scrollHoriz = function () {
      var t,
          e,
          n,
          i,
          s,
          r = this.cursor,
          o = r.selection,
          a = this.root.jQ[0].getBoundingClientRect();
      if (o) {
        if (n = o.jQ[0].getBoundingClientRect(), i = n.left - (a.left + 20), s = n.right - (a.right - 20), o.ends[Tt] === r[Ct]) {
          if (0 > i) e = i;else {
            if (!(s > 0)) return;
            e = n.left - s < a.left + 20 ? i : s;
          }
        } else if (s > 0) e = s;else {
          if (!(0 > i)) return;
          e = n.right - i > a.right - 20 ? s : i;
        }
      } else if (t = r.jQ[0].getBoundingClientRect().left, t > a.right - 20) e = t - (a.right - 20);else {
        if (!(t < a.left + 20)) return;
        e = t - (a.left + 20);
      }
      this.root.jQ.stop().animate({
        scrollLeft: "+=" + e
      }, 100);
    };
  }), zt.open(function (t) {
    Bt.p.substituteTextarea = function () {
      return Dt("<textarea autocapitalize=off autocomplete=off autocorrect=off spellcheck=false x-palm-disable-ste-all=true />")[0];
    }, t.createTextarea = function () {
      var t,
          e = this.textareaSpan = Dt('<span class="mq-textarea"></span>'),
          n = this.options.substituteTextarea();
      if (!n.nodeType) throw "substituteTextarea() must return a DOM element, got " + n;
      n = this.textarea = Dt(n).appendTo(e), t = this, t.cursor.selectionChanged = function () {
        t.selectionChanged();
      }, t.container.bind("copy", function () {
        t.setTextareaSelection();
      });
    }, t.selectionChanged = function () {
      var t = this;
      X(t.container[0]), t.textareaSelectionTimeout === m && (t.textareaSelectionTimeout = setTimeout(function () {
        t.setTextareaSelection();
      }));
    }, t.setTextareaSelection = function () {
      this.textareaSelectionTimeout = m;
      var t = "";
      this.cursor.selection && (t = this.cursor.selection.join("latex"), this.options.statelessClipboard && (t = "$" + t + "$")), this.selectFn(t);
    }, t.staticMathTextareaEvents = function () {
      function t() {
        s.detach(), e.blurred = !0;
      }

      var e = this,
          n = (e.root, e.cursor),
          i = e.textarea,
          s = e.textareaSpan;
      this.container.prepend('<span class="mq-selectable">$' + e.exportLatex() + "$</span>"), e.blurred = !0, i.bind("cut paste", !1).focus(function () {
        e.blurred = !1;
      }).blur(function () {
        n.selection && n.selection.clear(), setTimeout(t);
      }), e.selectFn = function (t) {
        i.val(t), t && i.select();
      };
    }, t.editablesTextareaEvents = function () {
      var t = this,
          e = (t.root, t.cursor),
          n = t.textarea,
          i = t.textareaSpan,
          s = q(n, this);
      this.selectFn = function (t) {
        s.select(t);
      }, this.container.prepend(i).on("cut", function (n) {
        e.selection && setTimeout(function () {
          t.notify("edit"), e.parent.bubble("reflow");
        });
      }), this.focusBlurEvents();
    }, t.typedText = function (t) {
      if ("\n" === t) return this.handle("enter");
      var e = this.notify().cursor;
      e.parent.write(e, t), this.scrollHoriz();
    }, t.paste = function (t) {
      this.options.statelessClipboard && (t = "$" === t.slice(0, 1) && "$" === t.slice(-1) ? t.slice(1, -1) : "\\text{" + t + "}"), this.writeLatex(t).cursor.show();
    };
  }), y = Qt(St, function (t, e) {
    t.finalizeInsert = function (t, e) {
      var n = this;
      n.postOrder("finalizeTree", t), n.postOrder("contactWeld", e), n.postOrder("blur"), n.postOrder("reflow"), n[Ct].siblingCreated && n[Ct].siblingCreated(t, Tt), n[Tt].siblingCreated && n[Tt].siblingCreated(t, Ct), n.bubble("reflow");
    };
  }), O = Qt(y, function (t, e) {
    t.init = function (t, n, i) {
      var s = this;
      e.init.call(s), s.ctrlSeq || (s.ctrlSeq = t), n && (s.htmlTemplate = n), i && (s.textTemplate = i);
    }, t.replaces = function (t) {
      t.disown(), this.replacedFragment = t;
    }, t.isEmpty = function () {
      return this.foldChildren(!0, function (t, e) {
        return t && e.isEmpty();
      });
    }, t.parser = function () {
      var t = x.block,
          e = this;
      return t.times(e.numBlocks()).map(function (t) {
        e.blocks = t;

        for (var n = 0; n < t.length; n += 1) t[n].adopt(e, e.ends[Ct], 0);

        return e;
      });
    }, t.createLeftOf = function (t) {
      var n = this,
          i = n.replacedFragment;
      n.createBlocks(), e.createLeftOf.call(n, t), i && (i.adopt(n.ends[Tt], 0, 0), i.jQ.appendTo(n.ends[Tt].jQ)), n.finalizeInsert(t.options), n.placeCursor(t);
    }, t.createBlocks = function () {
      var t,
          e,
          n = this,
          i = n.numBlocks(),
          s = n.blocks = Array(i);

      for (t = 0; i > t; t += 1) e = s[t] = T(), e.adopt(n, n.ends[Ct], 0);
    }, t.placeCursor = function (t) {
      t.insAtRightEnd(this.foldChildren(this.ends[Tt], function (t, e) {
        return t.isEmpty() ? t : e;
      }));
    }, t.moveTowards = function (t, e, n) {
      var i = n && this[n + "Into"];
      e.insAtDirEnd(-t, i || this.ends[-t]);
    }, t.deleteTowards = function (t, e) {
      this.isEmpty() ? e[t] = this.remove()[t] : this.moveTowards(t, e, null);
    }, t.selectTowards = function (t, e) {
      e[-t] = this, e[t] = this[t];
    }, t.selectChildren = function () {
      return It(this, this);
    }, t.unselectInto = function (t, e) {
      e.insAtDirEnd(-t, e.anticursor.ancestors[this.id]);
    }, t.seek = function (t, e) {
      function n(t) {
        var e = {};
        return e[Tt] = t.jQ.offset().left, e[Ct] = e[Tt] + t.jQ.outerWidth(), e;
      }

      var i,
          s = this,
          r = n(s);
      return t < r[Tt] ? e.insLeftOf(s) : t > r[Ct] ? e.insRightOf(s) : (i = r[Tt], void s.eachChild(function (o) {
        var a = n(o);
        return t < a[Tt] ? (t - i < a[Tt] - t ? o[Tt] ? e.insAtRightEnd(o[Tt]) : e.insLeftOf(s) : e.insAtLeftEnd(o), !1) : t > a[Ct] ? void (o[Ct] ? i = a[Ct] : r[Ct] - t < t - a[Ct] ? e.insRightOf(s) : e.insAtRightEnd(o)) : (o.seek(t, e), !1);
      }));
    }, t.numBlocks = function () {
      var t = this.htmlTemplate.match(/&\d+/g);
      return t ? t.length : 0;
    }, t.html = function () {
      var t,
          e,
          n,
          i = this,
          r = i.blocks,
          o = " mathquill-command-id=" + i.id,
          a = i.htmlTemplate.match(/<[^<>]+>|[^<>]+/g);

      for (s("no unmatched angle brackets", a.join("") === this.htmlTemplate), t = 0, e = a[0]; e; t += 1, e = a[t]) if ("/>" === e.slice(-2)) a[t] = e.slice(0, -2) + o + "/>";else if ("<" === e.charAt(0)) {
        s("not an unmatched top-level close tag", "/" !== e.charAt(1)), a[t] = e.slice(0, -1) + o + ">", n = 1;

        do t += 1, e = a[t], s("no missing close tags", e), "</" === e.slice(0, 2) ? n -= 1 : "<" === e.charAt(0) && "/>" !== e.slice(-2) && (n += 1); while (n > 0);
      }

      return a.join("").replace(/>&(\d+)/g, function (t, e) {
        return " mathquill-block-id=" + r[e].id + ">" + r[e].join("html");
      });
    }, t.latex = function () {
      return this.foldChildren(this.ctrlSeq, function (t, e) {
        return t + "{" + (e.latex() || " ") + "}";
      });
    }, t.textTemplate = [""], t.text = function () {
      var t = this,
          e = 0;
      return t.foldChildren(t.textTemplate[e], function (n, i) {
        e += 1;
        var s = i.text();
        return n && "(" === t.textTemplate[e] && "(" === s[0] && ")" === s.slice(-1) ? n + s.slice(1, -1) + t.textTemplate[e] : n + i.text() + (t.textTemplate[e] || "");
      });
    };
  }), k = Qt(O, function (e, n) {
    e.init = function (t, e, i) {
      i || (i = t && t.length > 1 ? t.slice(1) : t), n.init.call(this, t, e, [i]);
    }, e.parser = function () {
      return w.succeed(this);
    }, e.numBlocks = function () {
      return 0;
    }, e.replaces = function (t) {
      t.remove();
    }, e.createBlocks = t, e.moveTowards = function (t, e) {
      e.jQ.insDirOf(t, this.jQ), e[-t] = this, e[t] = this[t];
    }, e.deleteTowards = function (t, e) {
      e[t] = this.remove()[t];
    }, e.seek = function (t, e) {
      t - this.jQ.offset().left < this.jQ.outerWidth() / 2 ? e.insLeftOf(this) : e.insRightOf(this);
    }, e.latex = function () {
      return this.ctrlSeq;
    }, e.text = function () {
      return this.textTemplate;
    }, e.placeCursor = t, e.isEmpty = function () {
      return !0;
    };
  }), j = Qt(k, function (t, e) {
    t.init = function (t, n) {
      e.init.call(this, t, "<span>" + (n || t) + "</span>");
    };
  }), Q = Qt(k, function (t, e) {
    t.init = function (t, n, i) {
      e.init.call(this, t, '<span class="mq-binary-operator">' + n + "</span>", i);
    };
  }), T = Qt(y, function (t, e) {
    t.join = function (t) {
      return this.foldChildren("", function (e, n) {
        return e + n[t]();
      });
    }, t.html = function () {
      return this.join("html");
    }, t.latex = function () {
      return this.join("latex");
    }, t.text = function () {
      return this.ends[Tt] === this.ends[Ct] && 0 !== this.ends[Tt] ? this.ends[Tt].text() : this.join("text");
    }, t.keystroke = function (t, n, i) {
      return !i.options.spaceBehavesLikeTab || "Spacebar" !== t && "Shift-Spacebar" !== t ? e.keystroke.apply(this, arguments) : (n.preventDefault(), void i.escapeDir("Shift-Spacebar" === t ? Tt : Ct, t, n));
    }, t.moveOutOf = function (t, e, n) {
      var i = n && this.parent[n + "Into"];
      !i && this[t] ? e.insAtDirEnd(-t, this[t]) : e.insDirOf(t, this.parent);
    }, t.selectOutOf = function (t, e) {
      e.insDirOf(t, this.parent);
    }, t.deleteOutOf = function (t, e) {
      e.unwrapGramp();
    }, t.seek = function (t, e) {
      var n = this.ends[Ct];
      if (!n || n.jQ.offset().left + n.jQ.outerWidth() < t) return e.insAtRightEnd(this);
      if (t < this.ends[Tt].jQ.offset().left) return e.insAtLeftEnd(this);

      for (; t < n.jQ.offset().left;) n = n[Tt];

      return n.seek(t, e);
    }, t.chToCmd = function (t) {
      var e;
      return t.match(/^[a-eg-zA-Z]$/) ? I(t) : /^\d$/.test(t) ? A(t) : (e = At[t] || Et[t]) ? e(t) : j(t);
    }, t.write = function (t, e) {
      var n = this.chToCmd(e);
      t.selection && n.replaces(t.replaceSelection()), n.createLeftOf(t.show());
    }, t.focus = function () {
      return this.jQ.addClass("mq-hasCursor"), this.jQ.removeClass("mq-empty"), this;
    }, t.blur = function () {
      return this.jQ.removeClass("mq-hasCursor"), this.isEmpty() && this.jQ.addClass("mq-empty"), this;
    };
  }), Mt.StaticMath = function (t) {
    return Qt(t.AbstractMathQuill, function (e, n) {
      this.RootBlock = T, e.__mathquillify = function () {
        return n.__mathquillify.call(this, "mq-math-mode"), this.__controller.delegateMouseEvents(), this.__controller.staticMathTextareaEvents(), this;
      }, e.init = function () {
        n.init.apply(this, arguments), this.__controller.root.postOrder("registerInnerField", this.innerFields = [], t.MathField);
      }, e.latex = function () {
        var e = n.latex.apply(this, arguments);
        return arguments.length > 0 && this.__controller.root.postOrder("registerInnerField", this.innerFields = [], t.MathField), e;
      };
    });
  }, C = Qt(T, u), Mt.MathField = function (e) {
    return Qt(e.EditableField, function (e, n) {
      this.RootBlock = C, e.__mathquillify = function (e, i) {
        return this.config(e), i > 1 && (this.__controller.root.reflow = t), n.__mathquillify.call(this, "mq-editable-field mq-math-mode"), delete this.__controller.root.reflow, this;
      };
    });
  }, D = Qt(St, function (t, e) {
    function n(t) {
      var e, n;
      return t.jQ[0].normalize(), e = t.jQ[0].firstChild, s("only node in TextBlock span is Text node", 3 === e.nodeType), n = _(e.data), n.jQadd(e), t.children().disown(), n.adopt(t, 0, 0);
    }

    t.ctrlSeq = "\\text", t.replaces = function (t) {
      t instanceof Lt ? this.replacedText = t.remove().jQ.text() : "string" == typeof t && (this.replacedText = t);
    }, t.jQadd = function (t) {
      e.jQadd.call(this, t), this.ends[Tt] && this.ends[Tt].jQadd(this.jQ[0].firstChild);
    }, t.createLeftOf = function (t) {
      var n,
          i = this;
      if (e.createLeftOf.call(this, t), i[Ct].siblingCreated && i[Ct].siblingCreated(t.options, Tt), i[Tt].siblingCreated && i[Tt].siblingCreated(t.options, Ct), i.bubble("reflow"), t.insAtRightEnd(i), i.replacedText) for (n = 0; n < i.replacedText.length; n += 1) i.write(t, i.replacedText.charAt(n));
    }, t.parser = function () {
      var t = this,
          e = w.string,
          n = w.regex,
          i = w.optWhitespace;
      return i.then(e("{")).then(n(/^[^}]*/)).skip(e("}")).map(function (e) {
        return _(e).adopt(t, 0, 0), t;
      });
    }, t.textContents = function () {
      return this.foldChildren("", function (t, e) {
        return t + e.text;
      });
    }, t.text = function () {
      return '"' + this.textContents() + '"';
    }, t.latex = function () {
      return "\\text{" + this.textContents() + "}";
    }, t.html = function () {
      return '<span class="mq-text-mode" mathquill-command-id=' + this.id + ">" + this.textContents() + "</span>";
    }, t.moveTowards = function (t, e) {
      e.insAtDirEnd(-t, this);
    }, t.moveOutOf = function (t, e) {
      e.insDirOf(t, this);
    }, t.unselectInto = t.moveTowards, t.selectTowards = O.prototype.selectTowards, t.deleteTowards = O.prototype.deleteTowards, t.selectOutOf = function (t, e) {
      e.insDirOf(t, this);
    }, t.deleteOutOf = function (t, e) {
      this.isEmpty() && e.insRightOf(this);
    }, t.write = function (t, n) {
      var i, s;
      t.show().deleteSelection(), "$" !== n ? t[Tt] ? t[Tt].appendText(n) : _(n).createLeftOf(t) : this.isEmpty() ? (t.insRightOf(this), j("\\$", "$").createLeftOf(t)) : t[Ct] ? t[Tt] ? (i = D(), s = this.ends[Tt], s.disown(), s.adopt(i, 0, 0), t.insLeftOf(this), e.createLeftOf.call(i, t)) : t.insLeftOf(this) : t.insRightOf(this);
    }, t.seek = function (t, e) {
      var i, s, r, o, a, l, c, u;

      for (e.hide(), i = n(this), s = this.jQ.width() / this.text.length, r = Math.round((t - this.jQ.offset().left) / s), 0 >= r ? e.insAtLeftEnd(this) : r >= i.text.length ? e.insAtRightEnd(this) : e.insLeftOf(i.splitRight(r)), o = t - e.show().offset().left, a = o && 0 > o ? Tt : Ct, l = a; e[a] && o * l > 0;) e[a].moveTowards(a, e), l = o, o = t - e.offset().left;

      -a * l > a * o && e[-a].moveTowards(-a, e), e.anticursor ? e.anticursor.parent === this && (c = e[Tt] && e[Tt].text.length, this.anticursorPosition === c ? e.anticursor = _t.copy(e) : (this.anticursorPosition < c ? (u = e[Tt].splitRight(this.anticursorPosition), e[Tt] = u) : u = e[Ct].splitRight(this.anticursorPosition - c), e.anticursor = _t(this, u[Tt], u))) : this.anticursorPosition = e[Tt] && e[Tt].text.length;
    }, t.blur = function () {
      T.prototype.blur.call(this), n(this);
    }, t.focus = T.prototype.focus;
  }), _ = Qt(St, function (t, e) {
    function n(t, e) {
      return e.charAt(t === Tt ? 0 : -1 + e.length);
    }

    t.init = function (t) {
      e.init.call(this), this.text = t;
    }, t.jQadd = function (t) {
      this.dom = t, this.jQ = Dt(t);
    }, t.jQize = function () {
      return this.jQadd(document.createTextNode(this.text));
    }, t.appendText = function (t) {
      this.text += t, this.dom.appendData(t);
    }, t.prependText = function (t) {
      this.text = t + this.text, this.dom.insertData(0, t);
    }, t.insTextAtDirEnd = function (t, e) {
      r(e), e === Ct ? this.appendText(t) : this.prependText(t);
    }, t.splitRight = function (t) {
      var e = _(this.text.slice(t)).adopt(this.parent, this, this[Ct]);

      return e.jQadd(this.dom.splitText(t)), this.text = this.text.slice(0, t), e;
    }, t.moveTowards = function (t, e) {
      var i, s;
      return r(t), i = n(-t, this.text), s = this[-t], s ? s.insTextAtDirEnd(i, t) : _(i).createDir(-t, e), this.deleteTowards(t, e);
    }, t.latex = function () {
      return this.text;
    }, t.deleteTowards = function (t, e) {
      this.text.length > 1 ? t === Ct ? (this.dom.deleteData(0, 1), this.text = this.text.slice(1)) : (this.dom.deleteData(-1 + this.text.length, 1), this.text = this.text.slice(0, -1)) : (this.remove(), this.jQ.remove(), e[t] = this[t]);
    }, t.selectTowards = function (t, e) {
      var i, s, o, a;
      return r(t), i = e.anticursor, s = n(-t, this.text), i[t] === this ? (o = _(s).createDir(t, e), i[t] = o, e.insDirOf(t, o)) : (a = this[-t], a ? a.insTextAtDirEnd(s, t) : (o = _(s).createDir(-t, e), o.jQ.insDirOf(-t, e.selection.jQ)), 1 === this.text.length && i[-t] === this && (i[-t] = this[-t])), this.deleteTowards(t, e);
    };
  }), At.$ = Et.text = Et.textnormal = Et.textrm = Et.textup = Et.textmd = D, Et.em = Et.italic = Et.italics = Et.emph = Et.textit = Et.textsl = h("\\textit", "i", 'class="mq-text-mode"'), Et.strong = Et.bold = Et.textbf = h("\\textbf", "b", 'class="mq-text-mode"'), Et.sf = Et.textsf = h("\\textsf", "span", 'class="mq-sans-serif mq-text-mode"'), Et.tt = Et.texttt = h("\\texttt", "span", 'class="mq-monospace mq-text-mode"'), Et.textsc = h("\\textsc", "span", 'style="font-variant:small-caps" class="mq-text-mode"'), Et.uppercase = h("\\uppercase", "span", 'style="text-transform:uppercase" class="mq-text-mode"'), Et.lowercase = h("\\lowercase", "span", 'style="text-transform:lowercase" class="mq-text-mode"'), S = Qt(O, function (t, e) {
    t.init = function (t) {
      e.init.call(this, "$"), this.cursor = t;
    }, t.htmlTemplate = '<span class="mq-math-mode">&0</span>', t.createBlocks = function () {
      e.createBlocks.call(this), this.ends[Tt].cursor = this.cursor, this.ends[Tt].write = function (t, e) {
        "$" !== e ? T.prototype.write.call(this, t, e) : this.isEmpty() ? (t.insRightOf(this.parent), this.parent.deleteTowards(dir, t), j("\\$", "$").createLeftOf(t.show())) : t[Ct] ? t[Tt] ? T.prototype.write.call(this, t, e) : t.insLeftOf(this.parent) : t.insRightOf(this.parent);
      };
    }, t.latex = function () {
      return "$" + this.ends[Tt].latex() + "$";
    };
  }), L = Qt(C, function (t, e) {
    t.keystroke = function (t) {
      return "Spacebar" !== t && "Shift-Spacebar" !== t ? e.keystroke.apply(this, arguments) : void 0;
    }, t.write = function (t, e) {
      if (t.show().deleteSelection(), "$" === e) S(t).createLeftOf(t);else {
        var n;
        "<" === e ? n = "&lt;" : ">" === e && (n = "&gt;"), j(e, n).createLeftOf(t);
      }
    };
  }), Mt.TextField = function (t) {
    return Qt(t.EditableField, function (t, e) {
      this.RootBlock = L, t.__mathquillify = function () {
        return e.__mathquillify.call(this, "mq-editable-field mq-text-mode");
      }, t.latex = function (t) {
        return arguments.length > 0 ? (this.__controller.renderLatexText(t), this.__controller.blurred && this.__controller.cursor.hide().parent.blur(), this) : this.__controller.exportLatex();
      };
    });
  }, At["\\"] = Qt(O, function (t, e) {
    t.ctrlSeq = "\\", t.replaces = function (t) {
      this._replacedFragment = t.disown(), this.isEmpty = function () {
        return !1;
      };
    }, t.htmlTemplate = '<span class="mq-latex-command-input mq-non-leaf">\\<span>&0</span></span>', t.textTemplate = ["\\"], t.createBlocks = function () {
      e.createBlocks.call(this), this.ends[Tt].focus = function () {
        return this.parent.jQ.addClass("mq-hasCursor"), this.isEmpty() && this.parent.jQ.removeClass("mq-empty"), this;
      }, this.ends[Tt].blur = function () {
        return this.parent.jQ.removeClass("mq-hasCursor"), this.isEmpty() && this.parent.jQ.addClass("mq-empty"), this;
      }, this.ends[Tt].write = function (t, e) {
        t.show().deleteSelection(), e.match(/[a-z]/i) ? j(e).createLeftOf(t) : (this.parent.renderCommand(t), "\\" === e && this.isEmpty() || this.parent.parent.write(t, e));
      }, this.ends[Tt].keystroke = function (t, n, i) {
        return "Tab" === t || "Enter" === t || "Spacebar" === t ? (this.parent.renderCommand(i.cursor), void n.preventDefault()) : e.keystroke.apply(this, arguments);
      };
    }, t.createLeftOf = function (t) {
      if (e.createLeftOf.call(this, t), this._replacedFragment) {
        var n = this.jQ[0];
        this.jQ = this._replacedFragment.jQ.addClass("mq-blur").bind("mousedown mousemove", function (t) {
          return Dt(t.target = n).trigger(t), !1;
        }).insertBefore(this.jQ).add(this.jQ);
      }
    }, t.latex = function () {
      return "\\" + this.ends[Tt].latex() + " ";
    }, t.renderCommand = function (t) {
      var e, n;
      this.jQ = this.jQ.last(), this.remove(), this[Ct] ? t.insLeftOf(this[Ct]) : t.insAtRightEnd(this.parent), e = this.ends[Tt].latex(), e || (e = " "), n = Et[e], n ? (n = n(e), this._replacedFragment && n.replaces(this._replacedFragment), n.createLeftOf(t)) : (n = D(), n.replaces(e), n.createLeftOf(t), t.insRightOf(n), this._replacedFragment && this._replacedFragment.remove());
    };
  }), Et.notin = Et.cong = Et.equiv = Et.oplus = Et.otimes = Qt(Q, function (t, e) {
    t.init = function (t) {
      e.init.call(this, "\\" + t + " ", "&" + t + ";");
    };
  }), Et["≠"] = Et.ne = Et.neq = i(Q, "\\ne ", "&ne;"), Et.ast = Et.star = Et.loast = Et.lowast = i(Q, "\\ast ", "&lowast;"), Et.therefor = Et.therefore = i(Q, "\\therefore ", "&there4;"), Et.cuz = Et.because = i(Q, "\\because ", "&#8757;"), Et.prop = Et.propto = i(Q, "\\propto ", "&prop;"), Et["≈"] = Et.asymp = Et.approx = i(Q, "\\approx ", "&asymp;"), Et.isin = Et["in"] = i(Q, "\\in ", "&isin;"), Et.ni = Et.contains = i(Q, "\\ni ", "&ni;"), Et.notni = Et.niton = Et.notcontains = Et.doesnotcontain = i(Q, "\\not\\ni ", "&#8716;"), Et.sub = Et.subset = i(Q, "\\subset ", "&sub;"), Et.sup = Et.supset = Et.superset = i(Q, "\\supset ", "&sup;"), Et.nsub = Et.notsub = Et.nsubset = Et.notsubset = i(Q, "\\not\\subset ", "&#8836;"), Et.nsup = Et.notsup = Et.nsupset = Et.notsupset = Et.nsuperset = Et.notsuperset = i(Q, "\\not\\supset ", "&#8837;"), Et.sube = Et.subeq = Et.subsete = Et.subseteq = i(Q, "\\subseteq ", "&sube;"), Et.supe = Et.supeq = Et.supsete = Et.supseteq = Et.supersete = Et.superseteq = i(Q, "\\supseteq ", "&supe;"), Et.nsube = Et.nsubeq = Et.notsube = Et.notsubeq = Et.nsubsete = Et.nsubseteq = Et.notsubsete = Et.notsubseteq = i(Q, "\\not\\subseteq ", "&#8840;"), Et.nsupe = Et.nsupeq = Et.notsupe = Et.notsupeq = Et.nsupsete = Et.nsupseteq = Et.notsupsete = Et.notsupseteq = Et.nsupersete = Et.nsuperseteq = Et.notsupersete = Et.notsuperseteq = i(Q, "\\not\\supseteq ", "&#8841;"), Et.N = Et.naturals = Et.Naturals = i(j, "\\mathbb{N}", "&#8469;"), Et.P = Et.primes = Et.Primes = Et.projective = Et.Projective = Et.probability = Et.Probability = i(j, "\\mathbb{P}", "&#8473;"), Et.Z = Et.integers = Et.Integers = i(j, "\\mathbb{Z}", "&#8484;"), Et.Q = Et.rationals = Et.Rationals = i(j, "\\mathbb{Q}", "&#8474;"), Et.R = Et.reals = Et.Reals = i(j, "\\mathbb{R}", "&#8477;"), Et.C = Et.complex = Et.Complex = Et.complexes = Et.Complexes = Et.complexplane = Et.Complexplane = Et.ComplexPlane = i(j, "\\mathbb{C}", "&#8450;"), Et.H = Et.Hamiltonian = Et.quaternions = Et.Quaternions = i(j, "\\mathbb{H}", "&#8461;"), Et.quad = Et.emsp = i(j, "\\quad ", "    "), Et.qquad = i(j, "\\qquad ", "        "), Et.diamond = i(j, "\\diamond ", "&#9671;"), Et.bigtriangleup = i(j, "\\bigtriangleup ", "&#9651;"), Et.ominus = i(j, "\\ominus ", "&#8854;"), Et.uplus = i(j, "\\uplus ", "&#8846;"), Et.bigtriangledown = i(j, "\\bigtriangledown ", "&#9661;"), Et.sqcap = i(j, "\\sqcap ", "&#8851;"), Et.triangleleft = i(j, "\\triangleleft ", "&#8882;"), Et.sqcup = i(j, "\\sqcup ", "&#8852;"), Et.triangleright = i(j, "\\triangleright ", "&#8883;"), Et.odot = Et.circledot = i(j, "\\odot ", "&#8857;"), Et.bigcirc = i(j, "\\bigcirc ", "&#9711;"), Et.dagger = i(j, "\\dagger ", "&#0134;"), Et.ddagger = i(j, "\\ddagger ", "&#135;"), Et.wr = i(j, "\\wr ", "&#8768;"), Et.amalg = i(j, "\\amalg ", "&#8720;"), Et.models = i(j, "\\models ", "&#8872;"), Et.prec = i(j, "\\prec ", "&#8826;"), Et.succ = i(j, "\\succ ", "&#8827;"), Et.preceq = i(j, "\\preceq ", "&#8828;"), Et.succeq = i(j, "\\succeq ", "&#8829;"), Et.simeq = i(j, "\\simeq ", "&#8771;"), Et.mid = i(j, "\\mid ", "&#8739;"), Et.ll = i(j, "\\ll ", "&#8810;"), Et.gg = i(j, "\\gg ", "&#8811;"), Et.parallel = i(j, "\\parallel ", "&#8741;"), Et.nparallel = i(j, "\\nparallel ", "&#8742;"), Et.bowtie = i(j, "\\bowtie ", "&#8904;"), Et.sqsubset = i(j, "\\sqsubset ", "&#8847;"), Et.sqsupset = i(j, "\\sqsupset ", "&#8848;"), Et.smile = i(j, "\\smile ", "&#8995;"), Et.sqsubseteq = i(j, "\\sqsubseteq ", "&#8849;"), Et.sqsupseteq = i(j, "\\sqsupseteq ", "&#8850;"), Et.doteq = i(j, "\\doteq ", "&#8784;"), Et.frown = i(j, "\\frown ", "&#8994;"), Et.vdash = i(j, "\\vdash ", "&#8870;"), Et.dashv = i(j, "\\dashv ", "&#8867;"), Et.nless = i(j, "\\nless ", "&#8814;"), Et.ngtr = i(j, "\\ngtr ", "&#8815;"), Et.longleftarrow = i(j, "\\longleftarrow ", "&#8592;"), Et.longrightarrow = i(j, "\\longrightarrow ", "&#8594;"), Et.Longleftarrow = i(j, "\\Longleftarrow ", "&#8656;"), Et.Longrightarrow = i(j, "\\Longrightarrow ", "&#8658;"), Et.longleftrightarrow = i(j, "\\longleftrightarrow ", "&#8596;"), Et.updownarrow = i(j, "\\updownarrow ", "&#8597;"), Et.Longleftrightarrow = i(j, "\\Longleftrightarrow ", "&#8660;"), Et.Updownarrow = i(j, "\\Updownarrow ", "&#8661;"), Et.mapsto = i(j, "\\mapsto ", "&#8614;"), Et.nearrow = i(j, "\\nearrow ", "&#8599;"), Et.hookleftarrow = i(j, "\\hookleftarrow ", "&#8617;"), Et.hookrightarrow = i(j, "\\hookrightarrow ", "&#8618;"), Et.searrow = i(j, "\\searrow ", "&#8600;"), Et.leftharpoonup = i(j, "\\leftharpoonup ", "&#8636;"), Et.rightharpoonup = i(j, "\\rightharpoonup ", "&#8640;"), Et.swarrow = i(j, "\\swarrow ", "&#8601;"), Et.leftharpoondown = i(j, "\\leftharpoondown ", "&#8637;"), Et.rightharpoondown = i(j, "\\rightharpoondown ", "&#8641;"), Et.nwarrow = i(j, "\\nwarrow ", "&#8598;"), Et.ldots = i(j, "\\ldots ", "&#8230;"), Et.cdots = i(j, "\\cdots ", "&#8943;"), Et.vdots = i(j, "\\vdots ", "&#8942;"), Et.ddots = i(j, "\\ddots ", "&#8945;"), Et.surd = i(j, "\\surd ", "&#8730;"), Et.triangle = i(j, "\\triangle ", "&#9651;"), Et.ell = i(j, "\\ell ", "&#8467;"), Et.top = i(j, "\\top ", "&#8868;"), Et.flat = i(j, "\\flat ", "&#9837;"), Et.natural = i(j, "\\natural ", "&#9838;"), Et.sharp = i(j, "\\sharp ", "&#9839;"), Et.wp = i(j, "\\wp ", "&#8472;"), Et.bot = i(j, "\\bot ", "&#8869;"), Et.clubsuit = i(j, "\\clubsuit ", "&#9827;"), Et.diamondsuit = i(j, "\\diamondsuit ", "&#9826;"), Et.heartsuit = i(j, "\\heartsuit ", "&#9825;"), Et.spadesuit = i(j, "\\spadesuit ", "&#9824;"), Et.parallelogram = i(j, "\\parallelogram ", "&#9649;"), Et.square = i(j, "\\square ", "&#11036;"), Et.oint = i(j, "\\oint ", "&#8750;"), Et.bigcap = i(j, "\\bigcap ", "&#8745;"), Et.bigcup = i(j, "\\bigcup ", "&#8746;"), Et.bigsqcup = i(j, "\\bigsqcup ", "&#8852;"), Et.bigvee = i(j, "\\bigvee ", "&#8744;"), Et.bigwedge = i(j, "\\bigwedge ", "&#8743;"), Et.bigodot = i(j, "\\bigodot ", "&#8857;"), Et.bigotimes = i(j, "\\bigotimes ", "&#8855;"), Et.bigoplus = i(j, "\\bigoplus ", "&#8853;"), Et.biguplus = i(j, "\\biguplus ", "&#8846;"), Et.lfloor = i(j, "\\lfloor ", "&#8970;"), Et.rfloor = i(j, "\\rfloor ", "&#8971;"), Et.lceil = i(j, "\\lceil ", "&#8968;"), Et.rceil = i(j, "\\rceil ", "&#8969;"), Et.opencurlybrace = Et.lbrace = i(j, "\\lbrace ", "{"), Et.closecurlybrace = Et.rbrace = i(j, "\\rbrace ", "}"), Et.lbrack = i(j, "["), Et.rbrack = i(j, "]"), Et["∫"] = Et["int"] = Et.integral = i(k, "\\int ", "<big>&int;</big>"), Et.slash = i(j, "/"), Et.vert = i(j, "|"), Et.perp = Et.perpendicular = i(j, "\\perp ", "&perp;"), Et.nabla = Et.del = i(j, "\\nabla ", "&nabla;"), Et.hbar = i(j, "\\hbar ", "&#8463;"), Et.AA = Et.Angstrom = Et.angstrom = i(j, "\\text\\AA ", "&#8491;"), Et.ring = Et.circ = Et.circle = i(j, "\\circ ", "&#8728;"), Et.bull = Et.bullet = i(j, "\\bullet ", "&bull;"), Et.setminus = Et.smallsetminus = i(j, "\\setminus ", "&#8726;"), Et.not = Et["¬"] = Et.neg = i(j, "\\neg ", "&not;"), Et["…"] = Et.dots = Et.ellip = Et.hellip = Et.ellipsis = Et.hellipsis = i(j, "\\dots ", "&hellip;"), Et.converges = Et.darr = Et.dnarr = Et.dnarrow = Et.downarrow = i(j, "\\downarrow ", "&darr;"), Et.dArr = Et.dnArr = Et.dnArrow = Et.Downarrow = i(j, "\\Downarrow ", "&dArr;"), Et.diverges = Et.uarr = Et.uparrow = i(j, "\\uparrow ", "&uarr;"), Et.uArr = Et.Uparrow = i(j, "\\Uparrow ", "&uArr;"), Et.to = i(Q, "\\to ", "&rarr;"), Et.rarr = Et.rightarrow = i(j, "\\rightarrow ", "&rarr;"), Et.implies = i(Q, "\\Rightarrow ", "&rArr;"), Et.rArr = Et.Rightarrow = i(j, "\\Rightarrow ", "&rArr;"), Et.gets = i(Q, "\\gets ", "&larr;"), Et.larr = Et.leftarrow = i(j, "\\leftarrow ", "&larr;"), Et.impliedby = i(Q, "\\Leftarrow ", "&lArr;"), Et.lArr = Et.Leftarrow = i(j, "\\Leftarrow ", "&lArr;"), Et.harr = Et.lrarr = Et.leftrightarrow = i(j, "\\leftrightarrow ", "&harr;"), Et.iff = i(Q, "\\Leftrightarrow ", "&hArr;"), Et.hArr = Et.lrArr = Et.Leftrightarrow = i(j, "\\Leftrightarrow ", "&hArr;"), Et.Re = Et.Real = Et.real = i(j, "\\Re ", "&real;"), Et.Im = Et.imag = Et.image = Et.imagin = Et.imaginary = Et.Imaginary = i(j, "\\Im ", "&image;"), Et.part = Et.partial = i(j, "\\partial ", "&part;"), Et.infty = Et.infin = Et.infinity = i(j, "\\infty ", "&infin;"), Et.alef = Et.alefsym = Et.aleph = Et.alephsym = i(j, "\\aleph ", "&alefsym;"), Et.xist = Et.xists = Et.exist = Et.exists = i(j, "\\exists ", "&exist;"), Et.and = Et.land = Et.wedge = i(j, "\\wedge ", "&and;"), Et.or = Et.lor = Et.vee = i(j, "\\vee ", "&or;"), Et.o = Et.O = Et.empty = Et.emptyset = Et.oslash = Et.Oslash = Et.nothing = Et.varnothing = i(Q, "\\varnothing ", "&empty;"), Et.cup = Et.union = i(Q, "\\cup ", "&cup;"), Et.cap = Et.intersect = Et.intersection = i(Q, "\\cap ", "&cap;"), Et.deg = Et.degree = i(j, "\\degree ", "&deg;"), Et.ang = Et.angle = i(j, "\\angle ", "&ang;"), Et.measuredangle = i(j, "\\measuredangle ", "&#8737;"), A = Qt(j, function (t, e) {
    t.createLeftOf = function (t) {
      t.options.autoSubscriptNumerals && t.parent !== t.parent.parent.sub && (t[Tt] instanceof R && t[Tt].isItalic !== !1 || t[Tt] instanceof rt && t[Tt][Tt] instanceof R && t[Tt][Tt].isItalic !== !1) ? (Et._().createLeftOf(t), e.createLeftOf.call(this, t), t.insRightOf(t.parent.parent)) : e.createLeftOf.call(this, t);
    };
  }), R = Qt(k, function (t, e) {
    t.init = function (t, n) {
      e.init.call(this, t, "<var>" + (n || t) + "</var>");
    }, t.text = function () {
      var t = this.ctrlSeq;
      return !this[Tt] || this[Tt] instanceof R || this[Tt] instanceof Q || "\\ " === this[Tt].ctrlSeq || (t = "*" + t), !this[Ct] || this[Ct] instanceof Q || this[Ct] instanceof rt || (t += "*"), t;
    };
  }), Bt.p.autoCommands = {
    _maxLength: 0
  }, Ft.autoCommands = function (t) {
    var e, n, i, s, r;
    if (!/^[a-z]+(?: [a-z]+)*$/i.test(t)) throw '"' + t + '" not a space-delimited list of only letters';

    for (e = t.split(" "), n = {}, i = 0, s = 0; s < e.length; s += 1) {
      if (r = e[s], r.length < 2) throw 'autocommand "' + r + '" not minimum length of 2';
      if (Et[r] === F) throw '"' + r + '" is a built-in operator name';
      n[r] = 1, i = Ot(i, r.length);
    }

    return n._maxLength = i, n;
  }, I = Qt(R, function (t, e) {
    function n(t) {
      return t instanceof k && !(t instanceof Q);
    }

    t.init = function (t) {
      return e.init.call(this, this.letter = t);
    }, t.createLeftOf = function (t) {
      var n,
          i,
          s,
          r = t.options.autoCommands,
          o = r._maxLength;

      if (o > 0) {
        for (n = this.letter, i = t[Tt], s = 1; i instanceof I && o > s;) n = i.letter + n, i = i[Tt], s += 1;

        for (; n.length;) {
          if (r.hasOwnProperty(n)) {
            for (s = 2, i = t[Tt]; s < n.length; s += 1, i = i[Tt]);

            return Lt(i, t[Tt]).remove(), t[Tt] = i[Tt], Et[n](n).createLeftOf(t);
          }

          n = n.slice(1);
        }
      }

      e.createLeftOf.apply(this, arguments);
    }, t.italicize = function (t) {
      return this.isItalic = t, this.jQ.toggleClass("mq-operator-name", !t), this;
    }, t.finalizeTree = t.siblingDeleted = t.siblingCreated = function (t, e) {
      e !== Tt && this[Ct] instanceof I || this.autoUnItalicize(t);
    }, t.autoUnItalicize = function (t) {
      var e,
          i,
          s,
          r,
          o,
          a,
          l,
          c,
          u,
          h,
          f,
          p = t.autoOperatorNames;

      if (0 !== p._maxLength) {
        for (e = this.letter, i = this[Tt]; i instanceof I; i = i[Tt]) e = i.letter + e;

        for (s = this[Ct]; s instanceof I; s = s[Ct]) e += s.letter;

        Lt(i[Ct] || this.parent.ends[Tt], s[Tt] || this.parent.ends[Ct]).each(function (t) {
          t.italicize(!0).jQ.removeClass("mq-first mq-last"), t.ctrlSeq = t.letter;
        });

        t: for (r = 0, o = i[Ct] || this.parent.ends[Tt]; r < e.length; r += 1, o = o[Ct]) for (a = yt(p._maxLength, e.length - r); a > 0; a -= 1) if (l = e.slice(r, r + a), p.hasOwnProperty(l)) {
          for (c = 0, u = o; a > c; c += 1, u = u[Ct]) u.italicize(!1), h = u;

          f = z.hasOwnProperty(l), o.ctrlSeq = (f ? "\\" : "\\operatorname{") + o.ctrlSeq, h.ctrlSeq += f ? " " : "}", B.hasOwnProperty(l) && h[Tt][Tt][Tt].jQ.addClass("mq-last"), n(o[Tt]) && o.jQ.addClass("mq-first"), n(h[Ct]) && h.jQ.addClass("mq-last"), r += a - 1, o = h;
          continue t;
        }
      }
    };
  }), z = {}, M = Bt.p.autoOperatorNames = {
    _maxLength: 9
  }, B = {
    limsup: 1,
    liminf: 1,
    projlim: 1,
    injlim: 1
  }, function () {
    var t,
        e,
        n,
        i,
        s = "arg deg det dim exp gcd hom inf ker lg lim ln log max min sup limsup liminf injlim projlim Pr".split(" ");

    for (t = 0; t < s.length; t += 1) z[s[t]] = M[s[t]] = 1;

    for (e = "sin cos tan arcsin arccos arctan sinh cosh tanh sec csc cot coth".split(" "), t = 0; t < e.length; t += 1) z[e[t]] = 1;

    for (n = "sin cos tan sec cosec csc cotan cot ctg".split(" "), t = 0; t < n.length; t += 1) M[n[t]] = M["arc" + n[t]] = M[n[t] + "h"] = M["ar" + n[t] + "h"] = M["arc" + n[t] + "h"] = 1;

    for (i = "gcf hcf lcm proj span".split(" "), t = 0; t < i.length; t += 1) M[i[t]] = 1;
  }(), Ft.autoOperatorNames = function (t) {
    var e, n, i, s, r;
    if (!/^[a-z]+(?: [a-z]+)*$/i.test(t)) throw '"' + t + '" not a space-delimited list of only letters';

    for (e = t.split(" "), n = {}, i = 0, s = 0; s < e.length; s += 1) {
      if (r = e[s], r.length < 2) throw '"' + r + '" not minimum length of 2';
      n[r] = 1, i = Ot(i, r.length);
    }

    return n._maxLength = i, n;
  }, F = Qt(k, function (t, e) {
    t.init = function (t) {
      this.ctrlSeq = t;
    }, t.createLeftOf = function (t) {
      var e,
          n = this.ctrlSeq;

      for (e = 0; e < n.length; e += 1) I(n.charAt(e)).createLeftOf(t);
    }, t.parser = function () {
      var t,
          e = this.ctrlSeq,
          n = T();

      for (t = 0; t < e.length; t += 1) I(e.charAt(t)).adopt(n, n.ends[Ct], 0);

      return w.succeed(n.children());
    };
  });

  for ($ in M) M.hasOwnProperty($) && (Et[$] = F);

  Et.operatorname = Qt(O, function (e) {
    e.createLeftOf = t, e.numBlocks = function () {
      return 1;
    }, e.parser = function () {
      return x.block.map(function (t) {
        return t.children();
      });
    };
  }), Et.f = Qt(I, function (t, e) {
    t.init = function () {
      k.p.init.call(this, this.letter = "f", '<var class="mq-f">f</var>');
    }, t.italicize = function (t) {
      return this.jQ.html("f").toggleClass("mq-f", t), e.italicize.apply(this, arguments);
    };
  }), Et[" "] = Et.space = i(j, "\\ ", "&nbsp;"), Et["'"] = Et.prime = i(j, "'", "&prime;"), Et.backslash = i(j, "\\backslash ", "\\"), At["\\"] || (At["\\"] = Et.backslash), Et.$ = i(j, "\\$", "$"), N = Qt(k, function (t, e) {
    t.init = function (t, n) {
      e.init.call(this, t, '<span class="mq-nonSymbola">' + (n || t) + "</span>");
    };
  }), Et["@"] = N, Et["&"] = i(N, "\\&", "&amp;"), Et["%"] = i(N, "\\%", "%"), Et.alpha = Et.beta = Et.gamma = Et.delta = Et.zeta = Et.eta = Et.theta = Et.iota = Et.kappa = Et.mu = Et.nu = Et.xi = Et.rho = Et.sigma = Et.tau = Et.chi = Et.psi = Et.omega = Qt(R, function (t, e) {
    t.init = function (t) {
      e.init.call(this, "\\" + t + " ", "&" + t + ";");
    };
  }), Et.phi = i(R, "\\phi ", "&#981;"), Et.phiv = Et.varphi = i(R, "\\varphi ", "&phi;"), Et.epsilon = i(R, "\\epsilon ", "&#1013;"), Et.epsiv = Et.varepsilon = i(R, "\\varepsilon ", "&epsilon;"), Et.piv = Et.varpi = i(R, "\\varpi ", "&piv;"), Et.sigmaf = Et.sigmav = Et.varsigma = i(R, "\\varsigma ", "&sigmaf;"), Et.thetav = Et.vartheta = Et.thetasym = i(R, "\\vartheta ", "&thetasym;"), Et.upsilon = Et.upsi = i(R, "\\upsilon ", "&upsilon;"), Et.gammad = Et.Gammad = Et.digamma = i(R, "\\digamma ", "&#989;"), Et.kappav = Et.varkappa = i(R, "\\varkappa ", "&#1008;"), Et.rhov = Et.varrho = i(R, "\\varrho ", "&#1009;"), Et.pi = Et["π"] = i(N, "\\pi ", "&pi;"), Et.lambda = i(N, "\\lambda ", "&lambda;"), Et.Upsilon = Et.Upsi = Et.upsih = Et.Upsih = i(k, "\\Upsilon ", '<var style="font-family: serif">&upsih;</var>'), Et.Gamma = Et.Delta = Et.Theta = Et.Lambda = Et.Xi = Et.Pi = Et.Sigma = Et.Phi = Et.Psi = Et.Omega = Et.forall = Qt(j, function (t, e) {
    t.init = function (t) {
      e.init.call(this, "\\" + t + " ", "&" + t + ";");
    };
  }), P = Qt(O, function (t) {
    t.init = function (t) {
      this.latex = t;
    }, t.createLeftOf = function (t) {
      var e = x.parse(this.latex);
      e.children().adopt(t.parent, t[Tt], t[Ct]), t[Tt] = e.ends[Ct], e.jQize().insertBefore(t.jQ), e.finalizeInsert(t.options, t), e.ends[Ct][Ct].siblingCreated && e.ends[Ct][Ct].siblingCreated(t.options, Tt), e.ends[Tt][Tt].siblingCreated && e.ends[Tt][Tt].siblingCreated(t.options, Ct), t.parent.bubble("reflow");
    }, t.parser = function () {
      var t = x.parse(this.latex).children();
      return w.succeed(t);
    };
  }), Et["¹"] = i(P, "^1"), Et["²"] = i(P, "^2"), Et["³"] = i(P, "^3"), Et["¼"] = i(P, "\\frac14"), Et["½"] = i(P, "\\frac12"), Et["¾"] = i(P, "\\frac34"), U = Qt(Q, function (t) {
    t.init = j.prototype.init, t.contactWeld = t.siblingCreated = t.siblingDeleted = function (t, e) {
      return e !== Ct ? (this.jQ[0].className = !this[Tt] || this[Tt] instanceof Q ? "" : "mq-binary-operator", this) : void 0;
    };
  }), Et["+"] = i(U, "+", "+"), Et["–"] = Et["-"] = i(U, "-", "&minus;"), Et["±"] = Et.pm = Et.plusmn = Et.plusminus = i(U, "\\pm ", "&plusmn;"), Et.mp = Et.mnplus = Et.minusplus = i(U, "\\mp ", "&#8723;"), At["*"] = Et.sdot = Et.cdot = i(Q, "\\cdot ", "&middot;", "*"), W = Qt(Q, function (t, e) {
    t.init = function (t, n) {
      this.data = t, this.strict = n;
      var i = n ? "Strict" : "";
      e.init.call(this, t["ctrlSeq" + i], t["html" + i], t["text" + i]);
    }, t.swap = function (t) {
      this.strict = t;
      var e = t ? "Strict" : "";
      this.ctrlSeq = this.data["ctrlSeq" + e], this.jQ.html(this.data["html" + e]), this.textTemplate = [this.data["text" + e]];
    }, t.deleteTowards = function (t, n) {
      return t !== Tt || this.strict ? void e.deleteTowards.apply(this, arguments) : (this.swap(!0), void this.bubble("reflow"));
    };
  }), H = {
    ctrlSeq: "\\le ",
    html: "&le;",
    text: "≤",
    ctrlSeqStrict: "<",
    htmlStrict: "&lt;",
    textStrict: "<"
  }, G = {
    ctrlSeq: "\\ge ",
    html: "&ge;",
    text: "≥",
    ctrlSeqStrict: ">",
    htmlStrict: "&gt;",
    textStrict: ">"
  }, Et["<"] = Et.lt = i(W, H, !0), Et[">"] = Et.gt = i(W, G, !0), Et["≤"] = Et.le = Et.leq = i(W, H, !1), Et["≥"] = Et.ge = Et.geq = i(W, G, !1), K = Qt(Q, function (t, e) {
    t.init = function () {
      e.init.call(this, "=", "=");
    }, t.createLeftOf = function (t) {
      return t[Tt] instanceof W && t[Tt].strict ? (t[Tt].swap(!1), void t[Tt].bubble("reflow")) : void e.createLeftOf.apply(this, arguments);
    };
  }), Et["="] = K, Et["×"] = Et.times = i(Q, "\\times ", "&times;", "[x]"), Et["÷"] = Et.div = Et.divide = Et.divides = i(Q, "\\div ", "&divide;", "[/]"), At["~"] = Et.sim = i(Q, "\\sim ", "~", "~"), X = t, Z = document.createElement("div"), V = Z.style, J = {
    transform: 1,
    WebkitTransform: 1,
    MozTransform: 1,
    OTransform: 1,
    msTransform: 1
  };

  for (et in J) if (et in V) {
    tt = et;
    break;
  }

  tt ? Y = function (t, e, n) {
    t.css(tt, "scale(" + e + "," + n + ")");
  } : "filter" in V ? (X = function (t) {
    t.className = t.className;
  }, Y = function (t, e, n) {
    function i() {
      t.css("marginRight", (s.width() - 1) * (e - 1) / e + "px");
    }

    var s, r;
    e /= 1 + (n - 1) / 2, t.css("fontSize", n + "em"), t.hasClass("mq-matrixed-container") || t.addClass("mq-matrixed-container").wrapInner('<span class="mq-matrixed"></span>'), s = t.children().css("filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + e + ",SizingMethod='auto expand')"), i(), r = setInterval(i), Dt(window).load(function () {
      clearTimeout(r), i();
    });
  }) : Y = function (t, e, n) {
    t.css("fontSize", n + "em");
  }, nt = Qt(O, function (t, e) {
    t.init = function (t, n, i) {
      e.init.call(this, t, "<" + n + " " + i + ">&0</" + n + ">");
    };
  }), Et.mathrm = i(nt, "\\mathrm", "span", 'class="mq-roman mq-font"'), Et.mathit = i(nt, "\\mathit", "i", 'class="mq-font"'), Et.mathbf = i(nt, "\\mathbf", "b", 'class="mq-font"'), Et.mathsf = i(nt, "\\mathsf", "span", 'class="mq-sans-serif mq-font"'), Et.mathtt = i(nt, "\\mathtt", "span", 'class="mq-monospace mq-font"'), Et.underline = i(nt, "\\underline", "span", 'class="mq-non-leaf mq-underline"'), Et.overline = Et.bar = i(nt, "\\overline", "span", 'class="mq-non-leaf mq-overline"'), Et.overrightarrow = i(nt, "\\overrightarrow", "span", 'class="mq-non-leaf mq-overarrow mq-arrow-right"'), Et.overleftarrow = i(nt, "\\overleftarrow", "span", 'class="mq-non-leaf mq-overarrow mq-arrow-left"'), Et.textcolor = Qt(O, function (t, e) {
    t.setColor = function (t) {
      this.color = t, this.htmlTemplate = '<span class="mq-textcolor" style="color:' + t + '">&0</span>';
    }, t.latex = function () {
      return "\\textcolor{" + this.color + "}{" + this.blocks[0].latex() + "}";
    }, t.parser = function () {
      var t = this,
          n = w.optWhitespace,
          i = w.string,
          s = w.regex;
      return n.then(i("{")).then(s(/^[#\w\s.,()%-]*/)).skip(i("}")).then(function (n) {
        return t.setColor(n), e.parser.call(t);
      });
    };
  }), Et["class"] = Qt(O, function (t, e) {
    t.parser = function () {
      var t = this,
          n = w.string,
          i = w.regex;
      return w.optWhitespace.then(n("{")).then(i(/^[-\w\s\\\xA0-\xFF]*/)).skip(n("}")).then(function (n) {
        return t.htmlTemplate = '<span class="mq-class ' + n + '">&0</span>', e.parser.call(t);
      });
    };
  }), rt = Qt(O, function (t, e) {
    t.ctrlSeq = "_{...}^{...}", t.createLeftOf = function (t) {
      return t[Tt] || !t.options.supSubsRequireOperand ? e.createLeftOf.apply(this, arguments) : void 0;
    }, t.contactWeld = function (t) {
      var e, n, i, s, r, o;

      for (e = Tt; e; e = e === Tt ? Ct : !1) if (this[e] instanceof rt) {
        for (n = "sub"; n; n = "sub" === n ? "sup" : !1) i = this[n], s = this[e][n], i && (s ? i.isEmpty() ? o = _t(s, 0, s.ends[Tt]) : (i.jQ.children().insAtDirEnd(-e, s.jQ), r = i.children().disown(), o = _t(s, r.ends[Ct], s.ends[Tt]), e === Tt ? r.adopt(s, s.ends[Ct], 0) : r.adopt(s, 0, s.ends[Tt])) : this[e].addBlock(i.disown()), this.placeCursor = function (t, n) {
          return function (i) {
            i.insAtDirEnd(-e, t || n);
          };
        }(s, i));

        this.remove(), t && t[Tt] === this && (e === Ct && o ? o[Tt] ? t.insRightOf(o[Tt]) : t.insAtLeftEnd(o.parent) : t.insRightOf(this[e]));
        break;
      }

      this.respace();
    }, Bt.p.charsThatBreakOutOfSupSub = "", t.finalizeTree = function () {
      this.ends[Tt].write = function (t, e) {
        if (t.options.autoSubscriptNumerals && this === this.parent.sub) {
          if ("_" === e) return;
          var n = this.chToCmd(e);
          return n instanceof k ? t.deleteSelection() : t.clearSelection().insRightOf(this.parent), n.createLeftOf(t.show());
        }

        t[Tt] && !t[Ct] && !t.selection && t.options.charsThatBreakOutOfSupSub.indexOf(e) > -1 && t.insRightOf(this.parent), T.p.write.apply(this, arguments);
      };
    }, t.moveTowards = function (t, n, i) {
      n.options.autoSubscriptNumerals && !this.sup ? n.insDirOf(t, this) : e.moveTowards.apply(this, arguments);
    }, t.deleteTowards = function (t, n) {
      if (n.options.autoSubscriptNumerals && this.sub) {
        var i = this.sub.ends[-t];
        i instanceof k ? i.remove() : i && i.deleteTowards(t, n.insAtDirEnd(-t, this.sub)), this.sub.isEmpty() && (this.sub.deleteOutOf(Tt, n.insAtLeftEnd(this.sub)), this.sup && n.insDirOf(-t, this));
      } else e.deleteTowards.apply(this, arguments);
    }, t.latex = function () {
      function t(t, e) {
        var n = e && e.latex();
        return e ? t + (1 === n.length ? n : "{" + (n || " ") + "}") : "";
      }

      return t("_", this.sub) + t("^", this.sup);
    }, t.respace = t.siblingCreated = t.siblingDeleted = function (t, e) {
      e !== Ct && this.jQ.toggleClass("mq-limit", "\\int " === this[Tt].ctrlSeq);
    }, t.addBlock = function (t) {
      "sub" === this.supsub ? (this.sup = this.upInto = this.sub.upOutOf = t, t.adopt(this, this.sub, 0).downOutOf = this.sub, t.jQ = Dt('<span class="mq-sup"/>').append(t.jQ.children()).attr(xt, t.id).prependTo(this.jQ)) : (this.sub = this.downInto = this.sup.downOutOf = t, t.adopt(this, 0, this.sup).upOutOf = this.sup, t.jQ = Dt('<span class="mq-sub"></span>').append(t.jQ.children()).attr(xt, t.id).appendTo(this.jQ.removeClass("mq-sup-only")), this.jQ.append('<span style="display:inline-block;width:0">&#8203;</span>'));

      for (var e = 0; 2 > e; e += 1) (function (t, e, n, i) {
        t[e].deleteOutOf = function (s, r) {
          if (r.insDirOf(this[s] ? -s : s, this.parent), !this.isEmpty()) {
            var o = this.ends[s];
            this.children().disown().withDirAdopt(s, r.parent, r[s], r[-s]).jQ.insDirOf(-s, r.jQ), r[-s] = o;
          }

          t.supsub = n, delete t[e], delete t[i + "Into"], t[n][i + "OutOf"] = f, delete t[n].deleteOutOf, "sub" === e && Dt(t.jQ.addClass("mq-sup-only")[0].lastChild).remove(), this.remove();
        };
      })(this, "sub sup".split(" ")[e], "sup sub".split(" ")[e], "down up".split(" ")[e]);
    };
  }), Et.subscript = Et._ = Qt(rt, function (t, e) {
    t.supsub = "sub", t.htmlTemplate = '<span class="mq-supsub mq-non-leaf"><span class="mq-sub">&0</span><span style="display:inline-block;width:0">&#8203;</span></span>', t.textTemplate = ["_"], t.finalizeTree = function () {
      this.downInto = this.sub = this.ends[Tt], this.sub.upOutOf = f, e.finalizeTree.call(this);
    };
  }), Et.superscript = Et.supscript = Et["^"] = Qt(rt, function (t, e) {
    t.supsub = "sup", t.htmlTemplate = '<span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup">&0</span></span>', t.textTemplate = ["^"], t.finalizeTree = function () {
      this.upInto = this.sup = this.ends[Ct], this.sup.downOutOf = f, e.finalizeTree.call(this);
    };
  }), ot = Qt(O, function (t, e) {
    t.init = function (t, e) {
      var n = '<span class="mq-large-operator mq-non-leaf"><span class="mq-to"><span>&1</span></span><big>' + e + '</big><span class="mq-from"><span>&0</span></span></span>';
      k.prototype.init.call(this, t, n);
    }, t.createLeftOf = function (t) {
      e.createLeftOf.apply(this, arguments), t.options.sumStartsWithNEquals && (I("n").createLeftOf(t), K().createLeftOf(t));
    }, t.latex = function () {
      function t(t) {
        return 1 === t.length ? t : "{" + (t || " ") + "}";
      }

      return this.ctrlSeq + "_" + t(this.ends[Tt].latex()) + "^" + t(this.ends[Ct].latex());
    }, t.parser = function () {
      var t,
          e = w.string,
          n = w.optWhitespace,
          i = w.succeed,
          s = x.block,
          r = this,
          o = r.blocks = [T(), T()];

      for (t = 0; t < o.length; t += 1) o[t].adopt(r, r.ends[Ct], 0);

      return n.then(e("_").or(e("^"))).then(function (t) {
        var e = o["_" === t ? 0 : 1];
        return s.then(function (t) {
          return t.children().adopt(e, e.ends[Ct], 0), i(r);
        });
      }).many().result(r);
    }, t.finalizeTree = function () {
      this.downInto = this.ends[Tt], this.upInto = this.ends[Ct], this.ends[Tt].upOutOf = this.ends[Ct], this.ends[Ct].downOutOf = this.ends[Tt];
    };
  }), Et["∑"] = Et.sum = Et.summation = i(ot, "\\sum ", "&sum;"), Et["∏"] = Et.prod = Et.product = i(ot, "\\prod ", "&prod;"), Et.coprod = Et.coproduct = i(ot, "\\coprod ", "&#8720;"), at = Et.frac = Et.dfrac = Et.cfrac = Et.fraction = Qt(O, function (t, e) {
    t.ctrlSeq = "\\frac", t.htmlTemplate = '<span class="mq-fraction mq-non-leaf"><span class="mq-numerator">&0</span><span class="mq-denominator">&1</span><span style="display:inline-block;width:0">&#8203;</span></span>', t.textTemplate = ["(", ")/(", ")"], t.finalizeTree = function () {
      this.upInto = this.ends[Ct].upOutOf = this.ends[Tt], this.downInto = this.ends[Tt].downOutOf = this.ends[Ct];
    };
  }), lt = Et.over = At["/"] = Qt(at, function (e, n) {
    e.createLeftOf = function (e) {
      if (!this.replacedFragment) {
        for (var i = e[Tt]; i && !(i instanceof Q || i instanceof (Et.text || t) || i instanceof ot || "\\ " === i.ctrlSeq || /^[,;:]$/.test(i.ctrlSeq));) i = i[Tt];

        i instanceof ot && i[Ct] instanceof rt && (i = i[Ct], i[Ct] instanceof rt && i[Ct].ctrlSeq != i.ctrlSeq && (i = i[Ct])), i !== e[Tt] && (this.replaces(Lt(i[Ct] || e.parent.ends[Tt], e[Tt])), e[Tt] = i);
      }

      n.createLeftOf.call(this, e);
    };
  }), ct = Et.sqrt = Et["√"] = Qt(O, function (t, e) {
    t.ctrlSeq = "\\sqrt", t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-scaled mq-sqrt-prefix">&radic;</span><span class="mq-non-leaf mq-sqrt-stem">&0</span></span>', t.textTemplate = ["sqrt(", ")"], t.parser = function () {
      return x.optBlock.then(function (t) {
        return x.block.map(function (e) {
          var n = ht();
          return n.blocks = [t, e], t.adopt(n, 0, 0), e.adopt(n, t, 0), n;
        });
      }).or(e.parser.call(this));
    }, t.reflow = function () {
      var t = this.ends[Ct].jQ;
      Y(t.prev(), 1, t.innerHeight() / +t.css("fontSize").slice(0, -2) - .1);
    };
  }), Et.vec = Qt(O, function (t, e) {
    t.ctrlSeq = "\\vec", t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-vector-prefix">&rarr;</span><span class="mq-vector-stem">&0</span></span>', t.textTemplate = ["vec(", ")"];
  }), ht = Et.nthroot = Qt(ct, function (t, e) {
    t.htmlTemplate = '<sup class="mq-nthroot mq-non-leaf">&0</sup><span class="mq-scaled"><span class="mq-sqrt-prefix mq-scaled">&radic;</span><span class="mq-sqrt-stem mq-non-leaf">&1</span></span>', t.textTemplate = ["sqrt[", "](", ")"], t.latex = function () {
      return "\\sqrt[" + this.ends[Tt].latex() + "]{" + this.ends[Ct].latex() + "}";
    };
  }), ft = Qt(Qt(O, p), function (e, n) {
    e.init = function (t, e, i, s, r) {
      n.init.call(this, "\\left" + s, m, [e, i]), this.side = t, this.sides = {}, this.sides[Tt] = {
        ch: e,
        ctrlSeq: s
      }, this.sides[Ct] = {
        ch: i,
        ctrlSeq: r
      };
    }, e.numBlocks = function () {
      return 1;
    }, e.html = function () {
      return this.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-scaled mq-paren' + (this.side === Ct ? " mq-ghost" : "") + '">' + this.sides[Tt].ch + '</span><span class="mq-non-leaf">&0</span><span class="mq-scaled mq-paren' + (this.side === Tt ? " mq-ghost" : "") + '">' + this.sides[Ct].ch + "</span></span>", n.html.call(this);
    }, e.latex = function () {
      return "\\left" + this.sides[Tt].ctrlSeq + this.ends[Tt].latex() + "\\right" + this.sides[Ct].ctrlSeq;
    }, e.oppBrack = function (t, e, n) {
      return e instanceof ft && e.side && e.side !== -n && ("|" === this.sides[this.side].ch || e.side === -this.side) && (!t.restrictMismatchedBrackets || pt[this.sides[this.side].ch] === e.sides[e.side].ch || {
        "(": "]",
        "[": ")"
      }[this.sides[Tt].ch] === e.sides[Ct].ch) && e;
    }, e.closeOpposing = function (t) {
      t.side = 0, t.sides[this.side] = this.sides[this.side], t.delimjQs.eq(this.side === Tt ? 0 : 1).removeClass("mq-ghost").html(this.sides[this.side].ch);
    }, e.createLeftOf = function (t) {
      var e, i, s;
      this.replacedFragment || (e = t.options, i = this.oppBrack(e, t[Tt], Tt) || this.oppBrack(e, t[Ct], Ct) || this.oppBrack(e, t.parent.parent)), i ? (s = this.side = -i.side, this.closeOpposing(i), i === t.parent.parent && t[s] && (Lt(t[s], t.parent.ends[s], -s).disown().withDirAdopt(-s, i.parent, i, i[s]).jQ.insDirOf(s, i.jQ), i.bubble("reflow"))) : (i = this, s = i.side, i.replacedFragment ? i.side = 0 : t[-s] && (i.replaces(Lt(t[-s], t.parent.ends[-s], s)), t[-s] = 0), n.createLeftOf.call(i, t)), s === Tt ? t.insAtLeftEnd(i.ends[Tt]) : t.insRightOf(i);
    }, e.placeCursor = t, e.unwrap = function () {
      this.ends[Tt].children().disown().adopt(this.parent, this, this[Ct]).jQ.insertAfter(this.jQ), this.remove();
    }, e.deleteSide = function (t, e, n) {
      var i,
          s,
          r,
          o = this.parent,
          a = this[t],
          l = o.ends[t];
      if (t === this.side) return this.unwrap(), void (a ? n.insDirOf(-t, a) : n.insAtDirEnd(t, o));
      if (i = n.options, s = !this.side, this.side = -t, this.oppBrack(i, this.ends[Tt].ends[this.side], t)) this.closeOpposing(this.ends[Tt].ends[this.side]), r = this.ends[Tt].ends[t], this.unwrap(), r.siblingCreated && r.siblingCreated(n.options, t), a ? n.insDirOf(-t, a) : n.insAtDirEnd(t, o);else {
        if (this.oppBrack(i, this.parent.parent, t)) this.parent.parent.closeOpposing(this), this.parent.parent.unwrap();else {
          if (e && s) return this.unwrap(), void (a ? n.insDirOf(-t, a) : n.insAtDirEnd(t, o));
          this.sides[t] = {
            ch: pt[this.sides[this.side].ch],
            ctrlSeq: pt[this.sides[this.side].ctrlSeq]
          }, this.delimjQs.removeClass("mq-ghost").eq(t === Tt ? 0 : 1).addClass("mq-ghost").html(this.sides[t].ch);
        }
        a ? (r = this.ends[Tt].ends[t], Lt(a, l, -t).disown().withDirAdopt(-t, this.ends[Tt], r, 0).jQ.insAtDirEnd(t, this.ends[Tt].jQ.removeClass("mq-empty")), r.siblingCreated && r.siblingCreated(n.options, t), n.insDirOf(-t, a)) : e ? n.insDirOf(t, this) : n.insAtDirEnd(t, this.ends[Tt]);
      }
    }, e.deleteTowards = function (t, e) {
      this.deleteSide(-t, !1, e);
    }, e.finalizeTree = function () {
      this.ends[Tt].deleteOutOf = function (t, e) {
        this.parent.deleteSide(t, !0, e);
      }, this.finalizeTree = this.intentionalBlur = function () {
        this.delimjQs.eq(this.side === Tt ? 1 : 0).removeClass("mq-ghost"), this.side = 0;
      };
    }, e.siblingCreated = function (t, e) {
      e === -this.side && this.finalizeTree();
    };
  }), pt = {
    "(": ")",
    ")": "(",
    "[": "]",
    "]": "[",
    "{": "}",
    "}": "{",
    "\\{": "\\}",
    "\\}": "\\{",
    "&lang;": "&rang;",
    "&rang;": "&lang;",
    "\\langle ": "\\rangle ",
    "\\rangle ": "\\langle ",
    "|": "|"
  }, d("("), d("["), d("{", "\\{"), Et.langle = i(ft, Tt, "&lang;", "&rang;", "\\langle ", "\\rangle "), Et.rangle = i(ft, Ct, "&lang;", "&rang;", "\\langle ", "\\rangle "), At["|"] = i(ft, Tt, "|", "|", "|", "|"), Et.left = Qt(O, function (t) {
    t.parser = function () {
      var t = w.regex,
          e = w.string,
          n = (w.succeed, w.optWhitespace);
      return n.then(t(/^(?:[([|]|\\\{)/)).then(function (i) {
        var s = "\\" === i.charAt(0) ? i.slice(1) : i;
        return x.then(function (r) {
          return e("\\right").skip(n).then(t(/^(?:[\])|]|\\\})/)).map(function (t) {
            var e = "\\" === t.charAt(0) ? t.slice(1) : t,
                n = ft(0, s, e, i, t);
            return n.blocks = [r], r.adopt(n, 0, 0), n;
          });
        });
      });
    };
  }), Et.right = Qt(O, function (t) {
    t.parser = function () {
      return w.fail("unmatched \\right");
    };
  }), dt = Et.binom = Et.binomial = Qt(Qt(O, p), function (t, e) {
    t.ctrlSeq = "\\binom", t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-paren mq-scaled">(</span><span class="mq-non-leaf"><span class="mq-array mq-non-leaf"><span>&0</span><span>&1</span></span></span><span class="mq-paren mq-scaled">)</span></span>', t.textTemplate = ["choose(", ",", ")"];
  }), Et.choose = Qt(dt, function (t) {
    t.createLeftOf = lt.prototype.createLeftOf;
  }), Et.editable = Et.MathQuillMathField = Qt(O, function (t, e) {
    t.ctrlSeq = "\\MathQuillMathField", t.htmlTemplate = '<span class="mq-editable-field"><span class="mq-root-block">&0</span></span>', t.parser = function () {
      var t = this,
          n = w.string,
          i = w.regex,
          s = w.succeed;
      return n("[").then(i(/^[a-z][a-z0-9]*/i)).skip(n("]")).map(function (e) {
        t.name = e;
      }).or(s()).then(e.parser.call(t));
    }, t.finalizeTree = function () {
      var t = zt(this.ends[Tt], this.jQ, Bt());
      t.KIND_OF_MQ = "MathField", t.editable = !0, t.createTextarea(), t.editablesTextareaEvents(), t.cursor.insAtRightEnd(t.root), u(t.root);
    }, t.registerInnerField = function (t, e) {
      t.push(t[this.name] = e(this.ends[Tt].controller));
    }, t.latex = function () {
      return this.ends[Tt].latex();
    }, t.text = function () {
      return this.ends[Tt].text();
    };
  }), gt = Et.embed = Qt(k, function (t, e) {
    t.setOptions = function (t) {
      function e() {
        return "";
      }

      return this.text = t.text || e, this.htmlTemplate = t.htmlString || "", this.latex = t.latex || e, this;
    }, t.parser = function () {
      var t = this;
      return string = w.string, regex = w.regex, succeed = w.succeed, string("{").then(regex(/^[a-z][a-z0-9]*/i)).skip(string("}")).then(function (e) {
        return string("[").then(regex(/^[-\w\s]*/)).skip(string("]")).or(succeed()).map(function (n) {
          return t.setOptions(Nt[e](n));
        });
      });
    };
  }), bt = c(1);

  for (vt in bt) (function (t, e) {
    "function" == typeof e ? (l[t] = function () {
      return a(), e.apply(this, arguments);
    }, l[t].prototype = e.prototype) : l[t] = e;
  })(vt, bt[vt]);
}();

window.jQuery = jQuery;
const MathQuill = window.MathQuill;

export default MathQuill;
