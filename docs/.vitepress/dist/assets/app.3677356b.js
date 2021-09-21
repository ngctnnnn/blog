function e(e, t) {
  const n = Object.create(null),
    o = e.split(',')
  for (let r = 0; r < o.length; r++) n[o[r]] = !0
  return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e]
}
const t = e(
  'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly'
)
function n(e) {
  return !!e || '' === e
}
function o(e) {
  if (w(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = S(r) ? l(r) : o(r)
      if (s) for (const e in s) t[e] = s[e]
    }
    return t
  }
  return S(e) || E(e) ? e : void 0
}
const r = /;(?![^(]*\))/g,
  s = /:(.+)/
function l(e) {
  const t = {}
  return (
    e.split(r).forEach((e) => {
      if (e) {
        const n = e.split(s)
        n.length > 1 && (t[n[0].trim()] = n[1].trim())
      }
    }),
    t
  )
}
function i(e) {
  let t = ''
  if (S(e)) t = e
  else if (w(e))
    for (let n = 0; n < e.length; n++) {
      const o = i(e[n])
      o && (t += o + ' ')
    }
  else if (E(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const c = (e) =>
    null == e
      ? ''
      : w(e) || (E(e) && (e.toString === O || !C(e.toString)))
      ? JSON.stringify(e, a, 2)
      : String(e),
  a = (e, t) =>
    t && t.__v_isRef
      ? a(e, t.value)
      : x(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (e, [t, n]) => ((e[`${t} =>`] = n), e),
            {}
          )
        }
      : k(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : !E(t) || w(t) || T(t)
      ? t
      : String(t),
  u = {},
  d = [],
  f = () => {},
  p = () => !1,
  h = /^on[^a-z]/,
  v = (e) => h.test(e),
  m = (e) => e.startsWith('onUpdate:'),
  g = Object.assign,
  b = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  y = Object.prototype.hasOwnProperty,
  _ = (e, t) => y.call(e, t),
  w = Array.isArray,
  x = (e) => '[object Map]' === A(e),
  k = (e) => '[object Set]' === A(e),
  C = (e) => 'function' == typeof e,
  S = (e) => 'string' == typeof e,
  $ = (e) => 'symbol' == typeof e,
  E = (e) => null !== e && 'object' == typeof e,
  L = (e) => E(e) && C(e.then) && C(e.catch),
  O = Object.prototype.toString,
  A = (e) => O.call(e),
  T = (e) => '[object Object]' === A(e),
  F = (e) => S(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  P = e(
    ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  M = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  R = /-(\w)/g,
  j = M((e) => e.replace(R, (e, t) => (t ? t.toUpperCase() : ''))),
  I = /\B([A-Z])/g,
  U = M((e) => e.replace(I, '-$1').toLowerCase()),
  N = M((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  V = M((e) => (e ? `on${N(e)}` : '')),
  B = (e, t) => !Object.is(e, t),
  W = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  D = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  H = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let q
const z = []
class K {
  constructor(e = !1) {
    ;(this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !e &&
        q &&
        ((this.parent = q),
        (this.index = (q.scopes || (q.scopes = [])).push(this) - 1))
  }
  run(e) {
    if (this.active)
      try {
        return this.on(), e()
      } finally {
        this.off()
      }
  }
  on() {
    this.active && (z.push(this), (q = this))
  }
  off() {
    this.active && (z.pop(), (q = z[z.length - 1]))
  }
  stop(e) {
    if (this.active) {
      if (
        (this.effects.forEach((e) => e.stop()),
        this.cleanups.forEach((e) => e()),
        this.scopes && this.scopes.forEach((e) => e.stop(!0)),
        this.parent && !e)
      ) {
        const e = this.parent.scopes.pop()
        e &&
          e !== this &&
          ((this.parent.scopes[this.index] = e), (e.index = this.index))
      }
      this.active = !1
    }
  }
}
const G = (e) => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  J = (e) => (e.w & Q) > 0,
  Y = (e) => (e.n & Q) > 0,
  X = new WeakMap()
let Z = 0,
  Q = 1
const ee = []
let te
const ne = Symbol(''),
  oe = Symbol('')
class re {
  constructor(e, t = null, n) {
    ;(this.fn = e),
      (this.scheduler = t),
      (this.active = !0),
      (this.deps = []),
      (function (e, t) {
        ;(t = t || q) && t.active && t.effects.push(e)
      })(this, n)
  }
  run() {
    if (!this.active) return this.fn()
    if (!ee.includes(this))
      try {
        return (
          ee.push((te = this)),
          ie.push(le),
          (le = !0),
          (Q = 1 << ++Z),
          Z <= 30
            ? (({ deps: e }) => {
                if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Q
              })(this)
            : se(this),
          this.fn()
        )
      } finally {
        Z <= 30 &&
          ((e) => {
            const { deps: t } = e
            if (t.length) {
              let n = 0
              for (let o = 0; o < t.length; o++) {
                const r = t[o]
                J(r) && !Y(r) ? r.delete(e) : (t[n++] = r),
                  (r.w &= ~Q),
                  (r.n &= ~Q)
              }
              t.length = n
            }
          })(this),
          (Q = 1 << --Z),
          ae(),
          ee.pop()
        const e = ee.length
        te = e > 0 ? ee[e - 1] : void 0
      }
  }
  stop() {
    this.active && (se(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function se(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let le = !0
const ie = []
function ce() {
  ie.push(le), (le = !1)
}
function ae() {
  const e = ie.pop()
  le = void 0 === e || e
}
function ue(e, t, n) {
  if (!de()) return
  let o = X.get(e)
  o || X.set(e, (o = new Map()))
  let r = o.get(n)
  r || o.set(n, (r = G())), fe(r)
}
function de() {
  return le && void 0 !== te
}
function fe(e, t) {
  let n = !1
  Z <= 30 ? Y(e) || ((e.n |= Q), (n = !J(e))) : (n = !e.has(te)),
    n && (e.add(te), te.deps.push(e))
}
function pe(e, t, n, o, r, s) {
  const l = X.get(e)
  if (!l) return
  let i = []
  if ('clear' === t) i = [...l.values()]
  else if ('length' === n && w(e))
    l.forEach((e, t) => {
      ;('length' === t || t >= o) && i.push(e)
    })
  else
    switch ((void 0 !== n && i.push(l.get(n)), t)) {
      case 'add':
        w(e)
          ? F(n) && i.push(l.get('length'))
          : (i.push(l.get(ne)), x(e) && i.push(l.get(oe)))
        break
      case 'delete':
        w(e) || (i.push(l.get(ne)), x(e) && i.push(l.get(oe)))
        break
      case 'set':
        x(e) && i.push(l.get(ne))
    }
  if (1 === i.length) i[0] && he(i[0])
  else {
    const e = []
    for (const t of i) t && e.push(...t)
    he(G(e))
  }
}
function he(e, t) {
  for (const n of w(e) ? e : [...e])
    (n !== te || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run())
}
const ve = e('__proto__,__v_isRef,__isVue'),
  me = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter($)
  ),
  ge = xe(),
  be = xe(!1, !0),
  ye = xe(!0),
  _e = we()
function we() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...e) {
        const n = it(this)
        for (let t = 0, r = this.length; t < r; t++) ue(n, 0, t + '')
        const o = n[t](...e)
        return -1 === o || !1 === o ? n[t](...e.map(it)) : o
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...e) {
        ce()
        const n = it(this)[t].apply(this, e)
        return ae(), n
      }
    }),
    e
  )
}
function xe(e = !1, t = !1) {
  return function (n, o, r) {
    if ('__v_isReactive' === o) return !e
    if ('__v_isReadonly' === o) return e
    if ('__v_raw' === o && r === (e ? (t ? Qe : Ze) : t ? Xe : Ye).get(n))
      return n
    const s = w(n)
    if (!e && s && _(_e, o)) return Reflect.get(_e, o, r)
    const l = Reflect.get(n, o, r)
    if ($(o) ? me.has(o) : ve(o)) return l
    if ((e || ue(n, 0, o), t)) return l
    if (ft(l)) {
      return !s || !F(o) ? l.value : l
    }
    return E(l) ? (e ? nt(l) : tt(l)) : l
  }
}
function ke(e = !1) {
  return function (t, n, o, r) {
    let s = t[n]
    if (!e && ((o = it(o)), (s = it(s)), !w(t) && ft(s) && !ft(o)))
      return (s.value = o), !0
    const l = w(t) && F(n) ? Number(n) < t.length : _(t, n),
      i = Reflect.set(t, n, o, r)
    return (
      t === it(r) && (l ? B(o, s) && pe(t, 'set', n, o) : pe(t, 'add', n, o)), i
    )
  }
}
const Ce = {
    get: ge,
    set: ke(),
    deleteProperty: function (e, t) {
      const n = _(e, t)
      e[t]
      const o = Reflect.deleteProperty(e, t)
      return o && n && pe(e, 'delete', t, void 0), o
    },
    has: function (e, t) {
      const n = Reflect.has(e, t)
      return ($(t) && me.has(t)) || ue(e, 0, t), n
    },
    ownKeys: function (e) {
      return ue(e, 0, w(e) ? 'length' : ne), Reflect.ownKeys(e)
    }
  },
  Se = { get: ye, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  $e = g({}, Ce, { get: be, set: ke(!0) }),
  Ee = (e) => (E(e) ? tt(e) : e),
  Le = (e) => (E(e) ? nt(e) : e),
  Oe = (e) => e,
  Ae = (e) => Reflect.getPrototypeOf(e)
function Te(e, t, n = !1, o = !1) {
  const r = it((e = e.__v_raw)),
    s = it(t)
  t !== s && !n && ue(r, 0, t), !n && ue(r, 0, s)
  const { has: l } = Ae(r),
    i = o ? Oe : n ? Le : Ee
  return l.call(r, t)
    ? i(e.get(t))
    : l.call(r, s)
    ? i(e.get(s))
    : void (e !== r && e.get(t))
}
function Fe(e, t = !1) {
  const n = this.__v_raw,
    o = it(n),
    r = it(e)
  return (
    e !== r && !t && ue(o, 0, e),
    !t && ue(o, 0, r),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  )
}
function Pe(e, t = !1) {
  return (e = e.__v_raw), !t && ue(it(e), 0, ne), Reflect.get(e, 'size', e)
}
function Me(e) {
  e = it(e)
  const t = it(this)
  return Ae(t).has.call(t, e) || (t.add(e), pe(t, 'add', e, e)), this
}
function Re(e, t) {
  t = it(t)
  const n = it(this),
    { has: o, get: r } = Ae(n)
  let s = o.call(n, e)
  s || ((e = it(e)), (s = o.call(n, e)))
  const l = r.call(n, e)
  return (
    n.set(e, t), s ? B(t, l) && pe(n, 'set', e, t) : pe(n, 'add', e, t), this
  )
}
function je(e) {
  const t = it(this),
    { has: n, get: o } = Ae(t)
  let r = n.call(t, e)
  r || ((e = it(e)), (r = n.call(t, e))), o && o.call(t, e)
  const s = t.delete(e)
  return r && pe(t, 'delete', e, void 0), s
}
function Ie() {
  const e = it(this),
    t = 0 !== e.size,
    n = e.clear()
  return t && pe(e, 'clear', void 0, void 0), n
}
function Ue(e, t) {
  return function (n, o) {
    const r = this,
      s = r.__v_raw,
      l = it(s),
      i = t ? Oe : e ? Le : Ee
    return !e && ue(l, 0, ne), s.forEach((e, t) => n.call(o, i(e), i(t), r))
  }
}
function Ne(e, t, n) {
  return function (...o) {
    const r = this.__v_raw,
      s = it(r),
      l = x(s),
      i = 'entries' === e || (e === Symbol.iterator && l),
      c = 'keys' === e && l,
      a = r[e](...o),
      u = n ? Oe : t ? Le : Ee
    return (
      !t && ue(s, 0, c ? oe : ne),
      {
        next() {
          const { value: e, done: t } = a.next()
          return t
            ? { value: e, done: t }
            : { value: i ? [u(e[0]), u(e[1])] : u(e), done: t }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function Ve(e) {
  return function (...t) {
    return 'delete' !== e && this
  }
}
function Be() {
  const e = {
      get(e) {
        return Te(this, e)
      },
      get size() {
        return Pe(this)
      },
      has: Fe,
      add: Me,
      set: Re,
      delete: je,
      clear: Ie,
      forEach: Ue(!1, !1)
    },
    t = {
      get(e) {
        return Te(this, e, !1, !0)
      },
      get size() {
        return Pe(this)
      },
      has: Fe,
      add: Me,
      set: Re,
      delete: je,
      clear: Ie,
      forEach: Ue(!1, !0)
    },
    n = {
      get(e) {
        return Te(this, e, !0)
      },
      get size() {
        return Pe(this, !0)
      },
      has(e) {
        return Fe.call(this, e, !0)
      },
      add: Ve('add'),
      set: Ve('set'),
      delete: Ve('delete'),
      clear: Ve('clear'),
      forEach: Ue(!0, !1)
    },
    o = {
      get(e) {
        return Te(this, e, !0, !0)
      },
      get size() {
        return Pe(this, !0)
      },
      has(e) {
        return Fe.call(this, e, !0)
      },
      add: Ve('add'),
      set: Ve('set'),
      delete: Ve('delete'),
      clear: Ve('clear'),
      forEach: Ue(!0, !0)
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      ;(e[r] = Ne(r, !1, !1)),
        (n[r] = Ne(r, !0, !1)),
        (t[r] = Ne(r, !1, !0)),
        (o[r] = Ne(r, !0, !0))
    }),
    [e, n, t, o]
  )
}
const [We, De, He, qe] = Be()
function ze(e, t) {
  const n = t ? (e ? qe : He) : e ? De : We
  return (t, o, r) =>
    '__v_isReactive' === o
      ? !e
      : '__v_isReadonly' === o
      ? e
      : '__v_raw' === o
      ? t
      : Reflect.get(_(n, o) && o in t ? n : t, o, r)
}
const Ke = { get: ze(!1, !1) },
  Ge = { get: ze(!1, !0) },
  Je = { get: ze(!0, !1) },
  Ye = new WeakMap(),
  Xe = new WeakMap(),
  Ze = new WeakMap(),
  Qe = new WeakMap()
function et(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function (e) {
        switch (e) {
          case 'Object':
          case 'Array':
            return 1
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
            return 2
          default:
            return 0
        }
      })(((e) => A(e).slice(8, -1))(e))
}
function tt(e) {
  return e && e.__v_isReadonly ? e : ot(e, !1, Ce, Ke, Ye)
}
function nt(e) {
  return ot(e, !0, Se, Je, Ze)
}
function ot(e, t, n, o, r) {
  if (!E(e)) return e
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e
  const s = r.get(e)
  if (s) return s
  const l = et(e)
  if (0 === l) return e
  const i = new Proxy(e, 2 === l ? o : n)
  return r.set(e, i), i
}
function rt(e) {
  return st(e) ? rt(e.__v_raw) : !(!e || !e.__v_isReactive)
}
function st(e) {
  return !(!e || !e.__v_isReadonly)
}
function lt(e) {
  return rt(e) || st(e)
}
function it(e) {
  const t = e && e.__v_raw
  return t ? it(t) : e
}
function ct(e) {
  return D(e, '__v_skip', !0), e
}
function at(e) {
  de() && ((e = it(e)).dep || (e.dep = G()), fe(e.dep))
}
function ut(e, t) {
  ;(e = it(e)).dep && he(e.dep)
}
const dt = (e) => (E(e) ? tt(e) : e)
function ft(e) {
  return Boolean(e && !0 === e.__v_isRef)
}
function pt(e) {
  return vt(e, !1)
}
class ht {
  constructor(e, t) {
    ;(this._shallow = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = t ? e : it(e)),
      (this._value = t ? e : dt(e))
  }
  get value() {
    return at(this), this._value
  }
  set value(e) {
    ;(e = this._shallow ? e : it(e)),
      B(e, this._rawValue) &&
        ((this._rawValue = e),
        (this._value = this._shallow ? e : dt(e)),
        ut(this))
  }
}
function vt(e, t) {
  return ft(e) ? e : new ht(e, t)
}
function mt(e) {
  return ft(e) ? e.value : e
}
const gt = {
  get: (e, t, n) => mt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t]
    return ft(r) && !ft(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o)
  }
}
function bt(e) {
  return rt(e) ? e : new Proxy(e, gt)
}
function yt(e) {
  const t = w(e) ? new Array(e.length) : {}
  for (const n in e) t[n] = wt(e, n)
  return t
}
class _t {
  constructor(e, t) {
    ;(this._object = e), (this._key = t), (this.__v_isRef = !0)
  }
  get value() {
    return this._object[this._key]
  }
  set value(e) {
    this._object[this._key] = e
  }
}
function wt(e, t) {
  const n = e[t]
  return ft(n) ? n : new _t(e, t)
}
class xt {
  constructor(e, t, n) {
    ;(this._setter = t),
      (this.dep = void 0),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = new re(e, () => {
        this._dirty || ((this._dirty = !0), ut(this))
      })),
      (this.__v_isReadonly = n)
  }
  get value() {
    const e = it(this)
    return (
      at(e),
      e._dirty && ((e._dirty = !1), (e._value = e.effect.run())),
      e._value
    )
  }
  set value(e) {
    this._setter(e)
  }
}
function kt(e, t) {
  let n, o
  C(e) ? ((n = e), (o = f)) : ((n = e.get), (o = e.set))
  return new xt(n, o, C(e) || !e.set)
}
Promise.resolve()
function Ct(e, t, ...n) {
  const o = e.vnode.props || u
  let r = n
  const s = t.startsWith('update:'),
    l = s && t.slice(7)
  if (l && l in o) {
    const e = `${'modelValue' === l ? 'model' : l}Modifiers`,
      { number: t, trim: s } = o[e] || u
    s ? (r = n.map((e) => e.trim())) : t && (r = n.map(H))
  }
  let i,
    c = o[(i = V(t))] || o[(i = V(j(t)))]
  !c && s && (c = o[(i = V(U(t)))]), c && zo(c, e, 6, r)
  const a = o[i + 'Once']
  if (a) {
    if (e.emitted) {
      if (e.emitted[i]) return
    } else e.emitted = {}
    ;(e.emitted[i] = !0), zo(a, e, 6, r)
  }
}
function St(e, t, n = !1) {
  const o = t.emitsCache,
    r = o.get(e)
  if (void 0 !== r) return r
  const s = e.emits
  let l = {},
    i = !1
  if (!C(e)) {
    const o = (e) => {
      const n = St(e, t, !0)
      n && ((i = !0), g(l, n))
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  return s || i
    ? (w(s) ? s.forEach((e) => (l[e] = null)) : g(l, s), o.set(e, l), l)
    : (o.set(e, null), null)
}
function $t(e, t) {
  return (
    !(!e || !v(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    _(e, t[0].toLowerCase() + t.slice(1)) || _(e, U(t)) || _(e, t))
  )
}
let Et = null,
  Lt = null
function Ot(e) {
  const t = Et
  return (Et = e), (Lt = (e && e.type.__scopeId) || null), t
}
function At(e) {
  Lt = e
}
function Tt() {
  Lt = null
}
function Ft(e, t = Et, n) {
  if (!t) return e
  if (e._n) return e
  const o = (...n) => {
    o._d && co(-1)
    const r = Ot(t),
      s = e(...n)
    return Ot(r), o._d && co(1), s
  }
  return (o._n = !0), (o._c = !0), (o._d = !0), o
}
function Pt(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: s,
    propsOptions: [l],
    slots: i,
    attrs: c,
    emit: a,
    render: u,
    renderCache: d,
    data: f,
    setupState: p,
    ctx: h,
    inheritAttrs: v
  } = e
  let g
  const b = Ot(e)
  try {
    let e
    if (4 & n.shapeFlag) {
      const t = r || o
      ;(g = ko(u.call(t, t, d, s, p, f, h))), (e = c)
    } else {
      const n = t
      0,
        (g = ko(
          n.length > 1 ? n(s, { attrs: c, slots: i, emit: a }) : n(s, null)
        )),
        (e = t.props ? c : Mt(c))
    }
    let b = g
    if (e && !1 !== v) {
      const t = Object.keys(e),
        { shapeFlag: n } = b
      t.length && 7 & n && (l && t.some(m) && (e = Rt(e, l)), (b = _o(b, e)))
    }
    0,
      n.dirs && (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs),
      n.transition && (b.transition = n.transition),
      (g = b)
  } catch (y) {
    ;(ro.length = 0), Ko(y, e, 1), (g = yo(no))
  }
  return Ot(b), g
}
const Mt = (e) => {
    let t
    for (const n in e)
      ('class' === n || 'style' === n || v(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Rt = (e, t) => {
    const n = {}
    for (const o in e) (m(o) && o.slice(9) in t) || (n[o] = e[o])
    return n
  }
function jt(e, t, n) {
  const o = Object.keys(t)
  if (o.length !== Object.keys(e).length) return !0
  for (let r = 0; r < o.length; r++) {
    const s = o[r]
    if (t[s] !== e[s] && !$t(n, s)) return !0
  }
  return !1
}
function It(e, t) {
  t && t.pendingBranch
    ? w(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ur(e, nr, tr, or)
}
function Ut(e, t, n = !1) {
  const o = Ro || Et
  if (o) {
    const r =
      null == o.parent
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && C(t) ? t.call(o.proxy) : t
  }
}
const Nt = [Function, Array]
Boolean, Boolean
function Vt(e, t) {
  const { leavingVNodes: n } = e
  let o = n.get(t.type)
  return o || ((o = Object.create(null)), n.set(t.type, o)), o
}
function Bt(e, t, n, o) {
  const {
      appear: r,
      mode: s,
      persisted: l = !1,
      onBeforeEnter: i,
      onEnter: c,
      onAfterEnter: a,
      onEnterCancelled: u,
      onBeforeLeave: d,
      onLeave: f,
      onAfterLeave: p,
      onLeaveCancelled: h,
      onBeforeAppear: v,
      onAppear: m,
      onAfterAppear: g,
      onAppearCancelled: b
    } = t,
    y = String(e.key),
    _ = Vt(n, e),
    w = (e, t) => {
      e && zo(e, o, 9, t)
    },
    x = {
      mode: s,
      persisted: l,
      beforeEnter(t) {
        let o = i
        if (!n.isMounted) {
          if (!r) return
          o = v || i
        }
        t._leaveCb && t._leaveCb(!0)
        const s = _[y]
        s && ho(e, s) && s.el._leaveCb && s.el._leaveCb(), w(o, [t])
      },
      enter(e) {
        let t = c,
          o = a,
          s = u
        if (!n.isMounted) {
          if (!r) return
          ;(t = m || c), (o = g || a), (s = b || u)
        }
        let l = !1
        const i = (e._enterCb = (t) => {
          l ||
            ((l = !0),
            w(t ? s : o, [e]),
            x.delayedLeave && x.delayedLeave(),
            (e._enterCb = void 0))
        })
        t ? (t(e, i), t.length <= 1 && i()) : i()
      },
      leave(t, o) {
        const r = String(e.key)
        if ((t._enterCb && t._enterCb(!0), n.isUnmounting)) return o()
        w(d, [t])
        let s = !1
        const l = (t._leaveCb = (n) => {
          s ||
            ((s = !0),
            o(),
            w(n ? h : p, [t]),
            (t._leaveCb = void 0),
            _[r] === e && delete _[r])
        })
        ;(_[r] = e), f ? (f(t, l), f.length <= 1 && l()) : l()
      },
      clone: (e) => Bt(e, t, n, o)
    }
  return x
}
function Wt(e) {
  if (Yt(e)) return ((e = _o(e)).children = null), e
}
function Dt(e) {
  return Yt(e) ? (e.children ? e.children[0] : void 0) : e
}
function Ht(e, t) {
  6 & e.shapeFlag && e.component
    ? Ht(e.component.subTree, t)
    : 128 & e.shapeFlag
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t)
}
function qt(e, t = !1) {
  let n = [],
    o = 0
  for (let r = 0; r < e.length; r++) {
    const s = e[r]
    s.type === eo
      ? (128 & s.patchFlag && o++, (n = n.concat(qt(s.children, t))))
      : (t || s.type !== no) && n.push(s)
  }
  if (o > 1) for (let r = 0; r < n.length; r++) n[r].patchFlag = -2
  return n
}
function zt(e) {
  return C(e) ? { setup: e, name: e.name } : e
}
const Kt = (e) => !!e.type.__asyncLoader
function Gt(e) {
  C(e) && (e = { loader: e })
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: o,
    delay: r = 200,
    timeout: s,
    suspensible: l = !0,
    onError: i
  } = e
  let c,
    a = null,
    u = 0
  const d = () => {
    let e
    return (
      a ||
      (e = a =
        t()
          .catch((e) => {
            if (((e = e instanceof Error ? e : new Error(String(e))), i))
              return new Promise((t, n) => {
                i(
                  e,
                  () => t((u++, (a = null), d())),
                  () => n(e),
                  u + 1
                )
              })
            throw e
          })
          .then((t) =>
            e !== a && a
              ? a
              : (t &&
                  (t.__esModule || 'Module' === t[Symbol.toStringTag]) &&
                  (t = t.default),
                (c = t),
                t)
          ))
    )
  }
  return zt({
    name: 'AsyncComponentWrapper',
    __asyncLoader: d,
    get __asyncResolved() {
      return c
    },
    setup() {
      const e = Ro
      if (c) return () => Jt(c, e)
      const t = (t) => {
        ;(a = null), Ko(t, e, 13, !o)
      }
      if (l && e.suspense)
        return d()
          .then((t) => () => Jt(t, e))
          .catch((e) => (t(e), () => (o ? yo(o, { error: e }) : null)))
      const i = pt(!1),
        u = pt(),
        f = pt(!!r)
      return (
        r &&
          setTimeout(() => {
            f.value = !1
          }, r),
        null != s &&
          setTimeout(() => {
            if (!i.value && !u.value) {
              const e = new Error(`Async component timed out after ${s}ms.`)
              t(e), (u.value = e)
            }
          }, s),
        d()
          .then(() => {
            ;(i.value = !0),
              e.parent && Yt(e.parent.vnode) && cr(e.parent.update)
          })
          .catch((e) => {
            t(e), (u.value = e)
          }),
        () =>
          i.value && c
            ? Jt(c, e)
            : u.value && o
            ? yo(o, { error: u.value })
            : n && !f.value
            ? yo(n)
            : void 0
      )
    }
  })
}
function Jt(e, { vnode: { ref: t, props: n, children: o } }) {
  const r = yo(e, n, o)
  return (r.ref = t), r
}
const Yt = (e) => e.type.__isKeepAlive
function Xt(e, t) {
  Qt(e, 'a', t)
}
function Zt(e, t) {
  Qt(e, 'da', t)
}
function Qt(e, t, n = Ro) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let t = n
      for (; t; ) {
        if (t.isDeactivated) return
        t = t.parent
      }
      e()
    })
  if ((tn(t, o, n), n)) {
    let e = n.parent
    for (; e && e.parent; ) Yt(e.parent.vnode) && en(o, t, n, e), (e = e.parent)
  }
}
function en(e, t, n, o) {
  const r = tn(t, e, o, !0)
  an(() => {
    b(o[t], r)
  }, n)
}
function tn(e, t, n = Ro, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          ce(), Io(n)
          const r = zo(t, n, e, o)
          return Uo(), ae(), r
        })
    return o ? r.unshift(s) : r.push(s), s
  }
}
const nn =
    (e) =>
    (t, n = Ro) =>
      (!Vo || 'sp' === e) && tn(e, t, n),
  on = nn('bm'),
  rn = nn('m'),
  sn = nn('bu'),
  ln = nn('u'),
  cn = nn('bum'),
  an = nn('um'),
  un = nn('sp'),
  dn = nn('rtg'),
  fn = nn('rtc')
function pn(e, t = Ro) {
  tn('ec', e, t)
}
let hn = !0
function vn(e) {
  const t = bn(e),
    n = e.proxy,
    o = e.ctx
  ;(hn = !1), t.beforeCreate && mn(t.beforeCreate, e, 'bc')
  const {
    data: r,
    computed: s,
    methods: l,
    watch: i,
    provide: c,
    inject: a,
    created: u,
    beforeMount: d,
    mounted: p,
    beforeUpdate: h,
    updated: v,
    activated: m,
    deactivated: g,
    beforeDestroy: b,
    beforeUnmount: y,
    destroyed: _,
    unmounted: x,
    render: k,
    renderTracked: S,
    renderTriggered: $,
    errorCaptured: L,
    serverPrefetch: O,
    expose: A,
    inheritAttrs: T,
    components: F,
    directives: P,
    filters: M
  } = t
  if (
    (a &&
      (function (e, t, n = f, o = !1) {
        w(e) && (e = xn(e))
        for (const r in e) {
          const n = e[r]
          let s
          ;(s = E(n)
            ? 'default' in n
              ? Ut(n.from || r, n.default, !0)
              : Ut(n.from || r)
            : Ut(n)),
            ft(s) && o
              ? Object.defineProperty(t, r, {
                  enumerable: !0,
                  configurable: !0,
                  get: () => s.value,
                  set: (e) => (s.value = e)
                })
              : (t[r] = s)
        }
      })(a, o, null, e.appContext.config.unwrapInjectedRef),
    l)
  )
    for (const f in l) {
      const e = l[f]
      C(e) && (o[f] = e.bind(n))
    }
  if (r) {
    const t = r.call(n, n)
    E(t) && (e.data = tt(t))
  }
  if (((hn = !0), s))
    for (const w in s) {
      const e = s[w],
        t = kt({
          get: C(e) ? e.bind(n, n) : C(e.get) ? e.get.bind(n, n) : f,
          set: !C(e) && C(e.set) ? e.set.bind(n) : f
        })
      Object.defineProperty(o, w, {
        enumerable: !0,
        configurable: !0,
        get: () => t.value,
        set: (e) => (t.value = e)
      })
    }
  if (i) for (const f in i) gn(i[f], o, n, f)
  if (c) {
    const e = C(c) ? c.call(n) : c
    Reflect.ownKeys(e).forEach((t) => {
      !(function (e, t) {
        if (Ro) {
          let n = Ro.provides
          const o = Ro.parent && Ro.parent.provides
          o === n && (n = Ro.provides = Object.create(o)), (n[e] = t)
        }
      })(t, e[t])
    })
  }
  function R(e, t) {
    w(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n))
  }
  if (
    (u && mn(u, e, 'c'),
    R(on, d),
    R(rn, p),
    R(sn, h),
    R(ln, v),
    R(Xt, m),
    R(Zt, g),
    R(pn, L),
    R(fn, S),
    R(dn, $),
    R(cn, y),
    R(an, x),
    R(un, O),
    w(A))
  )
    if (A.length) {
      const t = e.exposed || (e.exposed = {})
      A.forEach((e) => {
        Object.defineProperty(t, e, { get: () => n[e], set: (t) => (n[e] = t) })
      })
    } else e.exposed || (e.exposed = {})
  k && e.render === f && (e.render = k),
    null != T && (e.inheritAttrs = T),
    F && (e.components = F),
    P && (e.directives = P)
}
function mn(e, t, n) {
  zo(w(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function gn(e, t, n, o) {
  const r = o.includes('.') ? yr(n, o) : () => n[o]
  if (S(e)) {
    const n = t[e]
    C(n) && mr(r, n)
  } else if (C(e)) mr(r, e.bind(n))
  else if (E(e))
    if (w(e)) e.forEach((e) => gn(e, t, n, o))
    else {
      const o = C(e.handler) ? e.handler.bind(n) : t[e.handler]
      C(o) && mr(r, o, e)
    }
}
function bn(e) {
  const t = e.type,
    { mixins: n, extends: o } = t,
    {
      mixins: r,
      optionsCache: s,
      config: { optionMergeStrategies: l }
    } = e.appContext,
    i = s.get(t)
  let c
  return (
    i
      ? (c = i)
      : r.length || n || o
      ? ((c = {}), r.length && r.forEach((e) => yn(c, e, l, !0)), yn(c, t, l))
      : (c = t),
    s.set(t, c),
    c
  )
}
function yn(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t
  s && yn(e, s, n, !0), r && r.forEach((t) => yn(e, t, n, !0))
  for (const l in t)
    if (o && 'expose' === l);
    else {
      const o = _n[l] || (n && n[l])
      e[l] = o ? o(e[l], t[l]) : t[l]
    }
  return e
}
const _n = {
  data: wn,
  props: Cn,
  emits: Cn,
  methods: Cn,
  computed: Cn,
  beforeCreate: kn,
  created: kn,
  beforeMount: kn,
  mounted: kn,
  beforeUpdate: kn,
  updated: kn,
  beforeDestroy: kn,
  beforeUnmount: kn,
  destroyed: kn,
  unmounted: kn,
  activated: kn,
  deactivated: kn,
  errorCaptured: kn,
  serverPrefetch: kn,
  components: Cn,
  directives: Cn,
  watch: function (e, t) {
    if (!e) return t
    if (!t) return e
    const n = g(Object.create(null), e)
    for (const o in t) n[o] = kn(e[o], t[o])
    return n
  },
  provide: wn,
  inject: function (e, t) {
    return Cn(xn(e), xn(t))
  }
}
function wn(e, t) {
  return t
    ? e
      ? function () {
          return g(C(e) ? e.call(this, this) : e, C(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function xn(e) {
  if (w(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function kn(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Cn(e, t) {
  return e ? g(g(Object.create(null), e), t) : t
}
function Sn(e, t, n, o = !1) {
  const r = {},
    s = {}
  D(s, vo, 1), (e.propsDefaults = Object.create(null)), $n(e, t, r, s)
  for (const l in e.propsOptions[0]) l in r || (r[l] = void 0)
  n
    ? (e.props = o ? r : ot(r, !1, $e, Ge, Xe))
    : e.type.props
    ? (e.props = r)
    : (e.props = s),
    (e.attrs = s)
}
function $n(e, t, n, o) {
  const [r, s] = e.propsOptions
  let l,
    i = !1
  if (t)
    for (let c in t) {
      if (P(c)) continue
      const a = t[c]
      let u
      r && _(r, (u = j(c)))
        ? s && s.includes(u)
          ? ((l || (l = {}))[u] = a)
          : (n[u] = a)
        : $t(e.emitsOptions, c) || (a !== o[c] && ((o[c] = a), (i = !0)))
    }
  if (s) {
    const t = it(n),
      o = l || u
    for (let l = 0; l < s.length; l++) {
      const i = s[l]
      n[i] = En(r, t, i, o[i], e, !_(o, i))
    }
  }
  return i
}
function En(e, t, n, o, r, s) {
  const l = e[n]
  if (null != l) {
    const e = _(l, 'default')
    if (e && void 0 === o) {
      const e = l.default
      if (l.type !== Function && C(e)) {
        const { propsDefaults: s } = r
        n in s ? (o = s[n]) : (Io(r), (o = s[n] = e.call(null, t)), Uo())
      } else o = e
    }
    l[0] && (s && !e ? (o = !1) : !l[1] || ('' !== o && o !== U(n)) || (o = !0))
  }
  return o
}
function Ln(e, t, n = !1) {
  const o = t.propsCache,
    r = o.get(e)
  if (r) return r
  const s = e.props,
    l = {},
    i = []
  let c = !1
  if (!C(e)) {
    const o = (e) => {
      c = !0
      const [n, o] = Ln(e, t, !0)
      g(l, n), o && i.push(...o)
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  if (!s && !c) return o.set(e, d), d
  if (w(s))
    for (let d = 0; d < s.length; d++) {
      const e = j(s[d])
      On(e) && (l[e] = u)
    }
  else if (s)
    for (const u in s) {
      const e = j(u)
      if (On(e)) {
        const t = s[u],
          n = (l[e] = w(t) || C(t) ? { type: t } : t)
        if (n) {
          const t = Fn(Boolean, n.type),
            o = Fn(String, n.type)
          ;(n[0] = t > -1),
            (n[1] = o < 0 || t < o),
            (t > -1 || _(n, 'default')) && i.push(e)
        }
      }
    }
  const a = [l, i]
  return o.set(e, a), a
}
function On(e) {
  return '$' !== e[0]
}
function An(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/)
  return t ? t[1] : null === e ? 'null' : ''
}
function Tn(e, t) {
  return An(e) === An(t)
}
function Fn(e, t) {
  return w(t) ? t.findIndex((t) => Tn(t, e)) : C(t) && Tn(t, e) ? 0 : -1
}
const Pn = (e) => '_' === e[0] || '$stable' === e,
  Mn = (e) => (w(e) ? e.map(ko) : [ko(e)]),
  Rn = (e, t, n) => {
    const o = Ft((...e) => Mn(t(...e)), n)
    return (o._c = !1), o
  },
  jn = (e, t, n) => {
    const o = e._ctx
    for (const r in e) {
      if (Pn(r)) continue
      const n = e[r]
      if (C(n)) t[r] = Rn(0, n, o)
      else if (null != n) {
        const e = Mn(n)
        t[r] = () => e
      }
    }
  },
  In = (e, t) => {
    const n = Mn(t)
    e.slots.default = () => n
  }
function Un(e, t, n, o) {
  const r = e.dirs,
    s = t && t.dirs
  for (let l = 0; l < r.length; l++) {
    const i = r[l]
    s && (i.oldValue = s[l].value)
    let c = i.dir[o]
    c && (ce(), zo(c, n, 8, [e.el, i, e, t]), ae())
  }
}
function Nn() {
  return {
    app: null,
    config: {
      isNativeTag: p,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let Vn = 0
function Bn(e, t) {
  return function (n, o = null) {
    null == o || E(o) || (o = null)
    const r = Nn(),
      s = new Set()
    let l = !1
    const i = (r.app = {
      _uid: Vn++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: xr,
      get config() {
        return r.config
      },
      set config(e) {},
      use: (e, ...t) => (
        s.has(e) ||
          (e && C(e.install)
            ? (s.add(e), e.install(i, ...t))
            : C(e) && (s.add(e), e(i, ...t))),
        i
      ),
      mixin: (e) => (r.mixins.includes(e) || r.mixins.push(e), i),
      component: (e, t) => (t ? ((r.components[e] = t), i) : r.components[e]),
      directive: (e, t) => (t ? ((r.directives[e] = t), i) : r.directives[e]),
      mount(s, c, a) {
        if (!l) {
          const u = yo(n, o)
          return (
            (u.appContext = r),
            c && t ? t(u, s) : e(u, s, a),
            (l = !0),
            (i._container = s),
            (s.__vue_app__ = i),
            u.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, i._container), delete i._container.__vue_app__)
      },
      provide: (e, t) => ((r.provides[e] = t), i)
    })
    return i
  }
}
let Wn = !1
const Dn = (e) => /svg/.test(e.namespaceURI) && 'foreignObject' !== e.tagName,
  Hn = (e) => 8 === e.nodeType
function qn(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: o,
        nextSibling: r,
        parentNode: s,
        remove: l,
        insert: i,
        createComment: c
      }
    } = e,
    a = (n, o, l, i, c, v = !1) => {
      const m = Hn(n) && '[' === n.data,
        g = () => p(n, o, l, i, c, m),
        { type: b, ref: y, shapeFlag: _ } = o,
        w = n.nodeType
      o.el = n
      let x = null
      switch (b) {
        case to:
          3 !== w
            ? (x = g())
            : (n.data !== o.children && ((Wn = !0), (n.data = o.children)),
              (x = r(n)))
          break
        case no:
          x = 8 !== w || m ? g() : r(n)
          break
        case oo:
          if (1 === w) {
            x = n
            const e = !o.children.length
            for (let t = 0; t < o.staticCount; t++)
              e && (o.children += x.outerHTML),
                t === o.staticCount - 1 && (o.anchor = x),
                (x = r(x))
            return x
          }
          x = g()
          break
        case eo:
          x = m ? f(n, o, l, i, c, v) : g()
          break
        default:
          if (1 & _)
            x =
              1 !== w || o.type.toLowerCase() !== n.tagName.toLowerCase()
                ? g()
                : u(n, o, l, i, c, v)
          else if (6 & _) {
            o.slotScopeIds = c
            const e = s(n)
            if ((t(o, e, null, l, i, Dn(e), v), (x = m ? h(n) : r(n)), Kt(o))) {
              let t
              m
                ? ((t = yo(eo)),
                  (t.anchor = x ? x.previousSibling : e.lastChild))
                : (t = 3 === n.nodeType ? wo('') : yo('div')),
                (t.el = n),
                (o.component.subTree = t)
            }
          } else
            64 & _
              ? (x = 8 !== w ? g() : o.type.hydrate(n, o, l, i, c, v, e, d))
              : 128 & _ &&
                (x = o.type.hydrate(n, o, l, i, Dn(s(n)), c, v, e, a))
      }
      return null != y && Gn(y, null, i, o), x
    },
    u = (e, t, n, r, s, i) => {
      i = i || !!t.dynamicChildren
      const { type: c, props: a, patchFlag: u, shapeFlag: f, dirs: p } = t,
        h = ('input' === c && p) || 'option' === c
      if (h || -1 !== u) {
        if ((p && Un(t, null, n, 'created'), a))
          if (h || !i || 48 & u)
            for (const t in a)
              ((h && t.endsWith('value')) || (v(t) && !P(t))) &&
                o(e, t, null, a[t])
          else a.onClick && o(e, 'onClick', null, a.onClick)
        let c
        if (
          ((c = a && a.onVnodeBeforeMount) && Jn(c, n, t),
          p && Un(t, null, n, 'beforeMount'),
          ((c = a && a.onVnodeMounted) || p) &&
            It(() => {
              c && Jn(c, n, t), p && Un(t, null, n, 'mounted')
            }, r),
          16 & f && (!a || (!a.innerHTML && !a.textContent)))
        ) {
          let o = d(e.firstChild, t, e, n, r, s, i)
          for (; o; ) {
            Wn = !0
            const e = o
            ;(o = o.nextSibling), l(e)
          }
        } else
          8 & f &&
            e.textContent !== t.children &&
            ((Wn = !0), (e.textContent = t.children))
      }
      return e.nextSibling
    },
    d = (e, t, o, r, s, l, i) => {
      i = i || !!t.dynamicChildren
      const c = t.children,
        u = c.length
      for (let d = 0; d < u; d++) {
        const t = i ? c[d] : (c[d] = ko(c[d]))
        if (e) e = a(e, t, r, s, l, i)
        else {
          if (t.type === to && !t.children) continue
          ;(Wn = !0), n(null, t, o, null, r, s, Dn(o), l)
        }
      }
      return e
    },
    f = (e, t, n, o, l, a) => {
      const { slotScopeIds: u } = t
      u && (l = l ? l.concat(u) : u)
      const f = s(e),
        p = d(r(e), t, f, n, o, l, a)
      return p && Hn(p) && ']' === p.data
        ? r((t.anchor = p))
        : ((Wn = !0), i((t.anchor = c(']')), f, p), p)
    },
    p = (e, t, o, i, c, a) => {
      if (((Wn = !0), (t.el = null), a)) {
        const t = h(e)
        for (;;) {
          const n = r(e)
          if (!n || n === t) break
          l(n)
        }
      }
      const u = r(e),
        d = s(e)
      return l(e), n(null, t, d, u, o, i, Dn(d), c), u
    },
    h = (e) => {
      let t = 0
      for (; e; )
        if ((e = r(e)) && Hn(e) && ('[' === e.data && t++, ']' === e.data)) {
          if (0 === t) return r(e)
          t--
        }
      return e
    }
  return [
    (e, t) => {
      if (!t.hasChildNodes()) return n(null, e, t), void fr()
      ;(Wn = !1),
        a(t.firstChild, e, null, null, null),
        fr(),
        Wn && console.error('Hydration completed but contains mismatches.')
    },
    a
  ]
}
const zn = It
function Kn(e) {
  return (function (e, t) {
    const {
        insert: n,
        remove: o,
        patchProp: r,
        createElement: s,
        createText: l,
        createComment: i,
        setText: c,
        setElementText: a,
        parentNode: p,
        nextSibling: h,
        setScopeId: v = f,
        cloneNode: m,
        insertStaticContent: b
      } = e,
      y = (
        e,
        t,
        n,
        o = null,
        r = null,
        s = null,
        l = !1,
        i = null,
        c = !!t.dynamicChildren
      ) => {
        if (e === t) return
        e && !ho(e, t) && ((o = te(e)), Y(e, r, s, !0), (e = null)),
          -2 === t.patchFlag && ((c = !1), (t.dynamicChildren = null))
        const { type: a, ref: u, shapeFlag: d } = t
        switch (a) {
          case to:
            w(e, t, n, o)
            break
          case no:
            x(e, t, n, o)
            break
          case oo:
            null == e && k(t, n, o, l)
            break
          case eo:
            R(e, t, n, o, r, s, l, i, c)
            break
          default:
            1 & d
              ? $(e, t, n, o, r, s, l, i, c)
              : 6 & d
              ? I(e, t, n, o, r, s, l, i, c)
              : (64 & d || 128 & d) && a.process(e, t, n, o, r, s, l, i, c, oe)
        }
        null != u && r && Gn(u, e && e.ref, s, t || e, !t)
      },
      w = (e, t, o, r) => {
        if (null == e) n((t.el = l(t.children)), o, r)
        else {
          const n = (t.el = e.el)
          t.children !== e.children && c(n, t.children)
        }
      },
      x = (e, t, o, r) => {
        null == e ? n((t.el = i(t.children || '')), o, r) : (t.el = e.el)
      },
      k = (e, t, n, o) => {
        ;[e.el, e.anchor] = b(e.children, t, n, o)
      },
      C = ({ el: e, anchor: t }, o, r) => {
        let s
        for (; e && e !== t; ) (s = h(e)), n(e, o, r), (e = s)
        n(t, o, r)
      },
      S = ({ el: e, anchor: t }) => {
        let n
        for (; e && e !== t; ) (n = h(e)), o(e), (e = n)
        o(t)
      },
      $ = (e, t, n, o, r, s, l, i, c) => {
        ;(l = l || 'svg' === t.type),
          null == e ? E(t, n, o, r, s, l, i, c) : T(e, t, r, s, l, i, c)
      },
      E = (e, t, o, l, i, c, u, d) => {
        let f, p
        const {
          type: h,
          props: v,
          shapeFlag: g,
          transition: b,
          patchFlag: y,
          dirs: _
        } = e
        if (e.el && void 0 !== m && -1 === y) f = e.el = m(e.el)
        else {
          if (
            ((f = e.el = s(e.type, c, v && v.is, v)),
            8 & g
              ? a(f, e.children)
              : 16 & g &&
                A(e.children, f, null, l, i, c && 'foreignObject' !== h, u, d),
            _ && Un(e, null, l, 'created'),
            v)
          ) {
            for (const t in v)
              'value' === t ||
                P(t) ||
                r(f, t, null, v[t], c, e.children, l, i, ee)
            'value' in v && r(f, 'value', null, v.value),
              (p = v.onVnodeBeforeMount) && Jn(p, l, e)
          }
          O(f, e, e.scopeId, u, l)
        }
        _ && Un(e, null, l, 'beforeMount')
        const w = (!i || (i && !i.pendingBranch)) && b && !b.persisted
        w && b.beforeEnter(f),
          n(f, t, o),
          ((p = v && v.onVnodeMounted) || w || _) &&
            zn(() => {
              p && Jn(p, l, e), w && b.enter(f), _ && Un(e, null, l, 'mounted')
            }, i)
      },
      O = (e, t, n, o, r) => {
        if ((n && v(e, n), o)) for (let s = 0; s < o.length; s++) v(e, o[s])
        if (r) {
          if (t === r.subTree) {
            const t = r.vnode
            O(e, t, t.scopeId, t.slotScopeIds, r.parent)
          }
        }
      },
      A = (e, t, n, o, r, s, l, i, c = 0) => {
        for (let a = c; a < e.length; a++) {
          const c = (e[a] = i ? Co(e[a]) : ko(e[a]))
          y(null, c, t, n, o, r, s, l, i)
        }
      },
      T = (e, t, n, o, s, l, i) => {
        const c = (t.el = e.el)
        let { patchFlag: d, dynamicChildren: f, dirs: p } = t
        d |= 16 & e.patchFlag
        const h = e.props || u,
          v = t.props || u
        let m
        ;(m = v.onVnodeBeforeUpdate) && Jn(m, n, t, e),
          p && Un(t, e, n, 'beforeUpdate')
        const g = s && 'foreignObject' !== t.type
        if (
          (f
            ? F(e.dynamicChildren, f, c, n, o, g, l)
            : i || q(e, t, c, null, n, o, g, l, !1),
          d > 0)
        ) {
          if (16 & d) M(c, t, h, v, n, o, s)
          else if (
            (2 & d && h.class !== v.class && r(c, 'class', null, v.class, s),
            4 & d && r(c, 'style', h.style, v.style, s),
            8 & d)
          ) {
            const l = t.dynamicProps
            for (let t = 0; t < l.length; t++) {
              const i = l[t],
                a = h[i],
                u = v[i]
              ;(u === a && 'value' !== i) ||
                r(c, i, a, u, s, e.children, n, o, ee)
            }
          }
          1 & d && e.children !== t.children && a(c, t.children)
        } else i || null != f || M(c, t, h, v, n, o, s)
        ;((m = v.onVnodeUpdated) || p) &&
          zn(() => {
            m && Jn(m, n, t, e), p && Un(t, e, n, 'updated')
          }, o)
      },
      F = (e, t, n, o, r, s, l) => {
        for (let i = 0; i < t.length; i++) {
          const c = e[i],
            a = t[i],
            u =
              c.el && (c.type === eo || !ho(c, a) || 70 & c.shapeFlag)
                ? p(c.el)
                : n
          y(c, a, u, null, o, r, s, l, !0)
        }
      },
      M = (e, t, n, o, s, l, i) => {
        if (n !== o) {
          for (const c in o) {
            if (P(c)) continue
            const a = o[c],
              u = n[c]
            a !== u && 'value' !== c && r(e, c, u, a, i, t.children, s, l, ee)
          }
          if (n !== u)
            for (const c in n)
              P(c) || c in o || r(e, c, n[c], null, i, t.children, s, l, ee)
          'value' in o && r(e, 'value', n.value, o.value)
        }
      },
      R = (e, t, o, r, s, i, c, a, u) => {
        const d = (t.el = e ? e.el : l('')),
          f = (t.anchor = e ? e.anchor : l(''))
        let { patchFlag: p, dynamicChildren: h, slotScopeIds: v } = t
        v && (a = a ? a.concat(v) : v),
          null == e
            ? (n(d, o, r), n(f, o, r), A(t.children, o, f, s, i, c, a, u))
            : p > 0 && 64 & p && h && e.dynamicChildren
            ? (F(e.dynamicChildren, h, o, s, i, c, a),
              (null != t.key || (s && t === s.subTree)) && Yn(e, t, !0))
            : q(e, t, o, f, s, i, c, a, u)
      },
      I = (e, t, n, o, r, s, l, i, c) => {
        ;(t.slotScopeIds = i),
          null == e
            ? 512 & t.shapeFlag
              ? r.ctx.activate(t, n, o, l, c)
              : N(t, n, o, r, s, l, c)
            : V(e, t, c)
      },
      N = (e, t, n, o, r, s, l) => {
        const i = (e.component = (function (e, t, n) {
          const o = e.type,
            r = (t ? t.appContext : e.appContext) || Po,
            s = {
              uid: Mo++,
              vnode: e,
              type: o,
              parent: t,
              appContext: r,
              root: null,
              next: null,
              subTree: null,
              update: null,
              scope: new K(!0),
              render: null,
              proxy: null,
              exposed: null,
              exposeProxy: null,
              withProxy: null,
              provides: t ? t.provides : Object.create(r.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: Ln(o, r),
              emitsOptions: St(o, r),
              emit: null,
              emitted: null,
              propsDefaults: u,
              inheritAttrs: o.inheritAttrs,
              ctx: u,
              data: u,
              props: u,
              attrs: u,
              slots: u,
              refs: u,
              setupState: u,
              setupContext: null,
              suspense: n,
              suspenseId: n ? n.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null,
              sp: null
            }
          ;(s.ctx = { _: s }),
            (s.root = t ? t.root : s),
            (s.emit = Ct.bind(null, s)),
            e.ce && e.ce(s)
          return s
        })(e, o, r))
        if (
          (Yt(e) && (i.ctx.renderer = oe),
          (function (e, t = !1) {
            Vo = t
            const { props: n, children: o } = e.vnode,
              r = No(e)
            Sn(e, n, r, t),
              ((e, t) => {
                if (32 & e.vnode.shapeFlag) {
                  const n = t._
                  n ? ((e.slots = it(t)), D(t, '_', n)) : jn(t, (e.slots = {}))
                } else (e.slots = {}), t && In(e, t)
                D(e.slots, vo, 1)
              })(e, o)
            const s = r
              ? (function (e, t) {
                  const n = e.type
                  ;(e.accessCache = Object.create(null)),
                    (e.proxy = ct(new Proxy(e.ctx, Fo)))
                  const { setup: o } = n
                  if (o) {
                    const n = (e.setupContext =
                      o.length > 1
                        ? (function (e) {
                            const t = (t) => {
                              e.exposed = t || {}
                            }
                            let n
                            return {
                              get attrs() {
                                return (
                                  n ||
                                  (n = (function (e) {
                                    return new Proxy(e.attrs, {
                                      get: (t, n) => (ue(e, 0, '$attrs'), t[n])
                                    })
                                  })(e))
                                )
                              },
                              slots: e.slots,
                              emit: e.emit,
                              expose: t
                            }
                          })(e)
                        : null)
                    Io(e), ce()
                    const r = qo(o, e, 0, [e.props, n])
                    if ((ae(), Uo(), L(r))) {
                      if ((r.then(Uo, Uo), t))
                        return r
                          .then((t) => {
                            Bo(e, t)
                          })
                          .catch((t) => {
                            Ko(t, e, 0)
                          })
                      e.asyncDep = r
                    } else Bo(e, r)
                  } else Wo(e)
                })(e, t)
              : void 0
            Vo = !1
          })(i),
          i.asyncDep)
        ) {
          if ((r && r.registerDep(i, B), !e.el)) {
            const e = (i.subTree = yo(no))
            x(null, e, t, n)
          }
        } else B(i, e, t, n, r, s, l)
      },
      V = (e, t, n) => {
        const o = (t.component = e.component)
        if (
          (function (e, t, n) {
            const { props: o, children: r, component: s } = e,
              { props: l, children: i, patchFlag: c } = t,
              a = s.emitsOptions
            if (t.dirs || t.transition) return !0
            if (!(n && c >= 0))
              return (
                !((!r && !i) || (i && i.$stable)) ||
                (o !== l && (o ? !l || jt(o, l, a) : !!l))
              )
            if (1024 & c) return !0
            if (16 & c) return o ? jt(o, l, a) : !!l
            if (8 & c) {
              const e = t.dynamicProps
              for (let t = 0; t < e.length; t++) {
                const n = e[t]
                if (l[n] !== o[n] && !$t(a, n)) return !0
              }
            }
            return !1
          })(e, t, n)
        ) {
          if (o.asyncDep && !o.asyncResolved) return void H(o, t, n)
          ;(o.next = t),
            (function (e) {
              const t = Yo.indexOf(e)
              t > Xo && Yo.splice(t, 1)
            })(o.update),
            o.update()
        } else (t.component = e.component), (t.el = e.el), (o.vnode = t)
      },
      B = (e, t, n, o, r, s, l) => {
        const i = new re(
            () => {
              if (e.isMounted) {
                let t,
                  { next: n, bu: o, u: c, parent: a, vnode: u } = e,
                  d = n
                ;(i.allowRecurse = !1),
                  n ? ((n.el = u.el), H(e, n, l)) : (n = u),
                  o && W(o),
                  (t = n.props && n.props.onVnodeBeforeUpdate) &&
                    Jn(t, a, n, u),
                  (i.allowRecurse = !0)
                const f = Pt(e),
                  h = e.subTree
                ;(e.subTree = f),
                  y(h, f, p(h.el), te(h), e, r, s),
                  (n.el = f.el),
                  null === d &&
                    (function ({ vnode: e, parent: t }, n) {
                      for (; t && t.subTree === e; )
                        ((e = t.vnode).el = n), (t = t.parent)
                    })(e, f.el),
                  c && zn(c, r),
                  (t = n.props && n.props.onVnodeUpdated) &&
                    zn(() => Jn(t, a, n, u), r)
              } else {
                let l
                const { el: c, props: a } = t,
                  { bm: u, m: d, parent: f } = e,
                  p = Kt(t)
                if (
                  ((i.allowRecurse = !1),
                  u && W(u),
                  !p && (l = a && a.onVnodeBeforeMount) && Jn(l, f, t),
                  (i.allowRecurse = !0),
                  c && le)
                ) {
                  const n = () => {
                    ;(e.subTree = Pt(e)), le(c, e.subTree, e, r, null)
                  }
                  p
                    ? t.type.__asyncLoader().then(() => !e.isUnmounted && n())
                    : n()
                } else {
                  const l = (e.subTree = Pt(e))
                  y(null, l, n, o, e, r, s), (t.el = l.el)
                }
                if ((d && zn(d, r), !p && (l = a && a.onVnodeMounted))) {
                  const e = t
                  zn(() => Jn(l, f, e), r)
                }
                256 & t.shapeFlag && e.a && zn(e.a, r),
                  (e.isMounted = !0),
                  (t = n = o = null)
              }
            },
            () => cr(e.update),
            e.scope
          ),
          c = (e.update = i.run.bind(i))
        ;(c.id = e.uid), (i.allowRecurse = c.allowRecurse = !0), c()
      },
      H = (e, t, n) => {
        t.component = e
        const o = e.vnode.props
        ;(e.vnode = t),
          (e.next = null),
          (function (e, t, n, o) {
            const {
                props: r,
                attrs: s,
                vnode: { patchFlag: l }
              } = e,
              i = it(r),
              [c] = e.propsOptions
            let a = !1
            if (!(o || l > 0) || 16 & l) {
              let o
              $n(e, t, r, s) && (a = !0)
              for (const s in i)
                (t && (_(t, s) || ((o = U(s)) !== s && _(t, o)))) ||
                  (c
                    ? !n ||
                      (void 0 === n[s] && void 0 === n[o]) ||
                      (r[s] = En(c, i, s, void 0, e, !0))
                    : delete r[s])
              if (s !== i)
                for (const e in s) (t && _(t, e)) || (delete s[e], (a = !0))
            } else if (8 & l) {
              const n = e.vnode.dynamicProps
              for (let o = 0; o < n.length; o++) {
                let l = n[o]
                const u = t[l]
                if (c)
                  if (_(s, l)) u !== s[l] && ((s[l] = u), (a = !0))
                  else {
                    const t = j(l)
                    r[t] = En(c, i, t, u, e, !1)
                  }
                else u !== s[l] && ((s[l] = u), (a = !0))
              }
            }
            a && pe(e, 'set', '$attrs')
          })(e, t.props, o, n),
          ((e, t, n) => {
            const { vnode: o, slots: r } = e
            let s = !0,
              l = u
            if (32 & o.shapeFlag) {
              const e = t._
              e
                ? n && 1 === e
                  ? (s = !1)
                  : (g(r, t), n || 1 !== e || delete r._)
                : ((s = !t.$stable), jn(t, r)),
                (l = t)
            } else t && (In(e, t), (l = { default: 1 }))
            if (s) for (const i in r) Pn(i) || i in l || delete r[i]
          })(e, t.children, n),
          ce(),
          dr(void 0, e.update),
          ae()
      },
      q = (e, t, n, o, r, s, l, i, c = !1) => {
        const u = e && e.children,
          d = e ? e.shapeFlag : 0,
          f = t.children,
          { patchFlag: p, shapeFlag: h } = t
        if (p > 0) {
          if (128 & p) return void G(u, f, n, o, r, s, l, i, c)
          if (256 & p) return void z(u, f, n, o, r, s, l, i, c)
        }
        8 & h
          ? (16 & d && ee(u, r, s), f !== u && a(n, f))
          : 16 & d
          ? 16 & h
            ? G(u, f, n, o, r, s, l, i, c)
            : ee(u, r, s, !0)
          : (8 & d && a(n, ''), 16 & h && A(f, n, o, r, s, l, i, c))
      },
      z = (e, t, n, o, r, s, l, i, c) => {
        t = t || d
        const a = (e = e || d).length,
          u = t.length,
          f = Math.min(a, u)
        let p
        for (p = 0; p < f; p++) {
          const o = (t[p] = c ? Co(t[p]) : ko(t[p]))
          y(e[p], o, n, null, r, s, l, i, c)
        }
        a > u ? ee(e, r, s, !0, !1, f) : A(t, n, o, r, s, l, i, c, f)
      },
      G = (e, t, n, o, r, s, l, i, c) => {
        let a = 0
        const u = t.length
        let f = e.length - 1,
          p = u - 1
        for (; a <= f && a <= p; ) {
          const o = e[a],
            u = (t[a] = c ? Co(t[a]) : ko(t[a]))
          if (!ho(o, u)) break
          y(o, u, n, null, r, s, l, i, c), a++
        }
        for (; a <= f && a <= p; ) {
          const o = e[f],
            a = (t[p] = c ? Co(t[p]) : ko(t[p]))
          if (!ho(o, a)) break
          y(o, a, n, null, r, s, l, i, c), f--, p--
        }
        if (a > f) {
          if (a <= p) {
            const e = p + 1,
              d = e < u ? t[e].el : o
            for (; a <= p; )
              y(null, (t[a] = c ? Co(t[a]) : ko(t[a])), n, d, r, s, l, i, c),
                a++
          }
        } else if (a > p) for (; a <= f; ) Y(e[a], r, s, !0), a++
        else {
          const h = a,
            v = a,
            m = new Map()
          for (a = v; a <= p; a++) {
            const e = (t[a] = c ? Co(t[a]) : ko(t[a]))
            null != e.key && m.set(e.key, a)
          }
          let g,
            b = 0
          const _ = p - v + 1
          let w = !1,
            x = 0
          const k = new Array(_)
          for (a = 0; a < _; a++) k[a] = 0
          for (a = h; a <= f; a++) {
            const o = e[a]
            if (b >= _) {
              Y(o, r, s, !0)
              continue
            }
            let u
            if (null != o.key) u = m.get(o.key)
            else
              for (g = v; g <= p; g++)
                if (0 === k[g - v] && ho(o, t[g])) {
                  u = g
                  break
                }
            void 0 === u
              ? Y(o, r, s, !0)
              : ((k[u - v] = a + 1),
                u >= x ? (x = u) : (w = !0),
                y(o, t[u], n, null, r, s, l, i, c),
                b++)
          }
          const C = w
            ? (function (e) {
                const t = e.slice(),
                  n = [0]
                let o, r, s, l, i
                const c = e.length
                for (o = 0; o < c; o++) {
                  const c = e[o]
                  if (0 !== c) {
                    if (((r = n[n.length - 1]), e[r] < c)) {
                      ;(t[o] = r), n.push(o)
                      continue
                    }
                    for (s = 0, l = n.length - 1; s < l; )
                      (i = (s + l) >> 1), e[n[i]] < c ? (s = i + 1) : (l = i)
                    c < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), (n[s] = o))
                  }
                }
                ;(s = n.length), (l = n[s - 1])
                for (; s-- > 0; ) (n[s] = l), (l = t[l])
                return n
              })(k)
            : d
          for (g = C.length - 1, a = _ - 1; a >= 0; a--) {
            const e = v + a,
              d = t[e],
              f = e + 1 < u ? t[e + 1].el : o
            0 === k[a]
              ? y(null, d, n, f, r, s, l, i, c)
              : w && (g < 0 || a !== C[g] ? J(d, n, f, 2) : g--)
          }
        }
      },
      J = (e, t, o, r, s = null) => {
        const { el: l, type: i, transition: c, children: a, shapeFlag: u } = e
        if (6 & u) return void J(e.component.subTree, t, o, r)
        if (128 & u) return void e.suspense.move(t, o, r)
        if (64 & u) return void i.move(e, t, o, oe)
        if (i === eo) {
          n(l, t, o)
          for (let e = 0; e < a.length; e++) J(a[e], t, o, r)
          return void n(e.anchor, t, o)
        }
        if (i === oo) return void C(e, t, o)
        if (2 !== r && 1 & u && c)
          if (0 === r) c.beforeEnter(l), n(l, t, o), zn(() => c.enter(l), s)
          else {
            const { leave: e, delayLeave: r, afterLeave: s } = c,
              i = () => n(l, t, o),
              a = () => {
                e(l, () => {
                  i(), s && s()
                })
              }
            r ? r(l, i, a) : a()
          }
        else n(l, t, o)
      },
      Y = (e, t, n, o = !1, r = !1) => {
        const {
          type: s,
          props: l,
          ref: i,
          children: c,
          dynamicChildren: a,
          shapeFlag: u,
          patchFlag: d,
          dirs: f
        } = e
        if ((null != i && Gn(i, null, n, e, !0), 256 & u))
          return void t.ctx.deactivate(e)
        const p = 1 & u && f,
          h = !Kt(e)
        let v
        if ((h && (v = l && l.onVnodeBeforeUnmount) && Jn(v, t, e), 6 & u))
          Q(e.component, n, o)
        else {
          if (128 & u) return void e.suspense.unmount(n, o)
          p && Un(e, null, t, 'beforeUnmount'),
            64 & u
              ? e.type.remove(e, t, n, r, oe, o)
              : a && (s !== eo || (d > 0 && 64 & d))
              ? ee(a, t, n, !1, !0)
              : ((s === eo && 384 & d) || (!r && 16 & u)) && ee(c, t, n),
            o && X(e)
        }
        ;((h && (v = l && l.onVnodeUnmounted)) || p) &&
          zn(() => {
            v && Jn(v, t, e), p && Un(e, null, t, 'unmounted')
          }, n)
      },
      X = (e) => {
        const { type: t, el: n, anchor: r, transition: s } = e
        if (t === eo) return void Z(n, r)
        if (t === oo) return void S(e)
        const l = () => {
          o(n), s && !s.persisted && s.afterLeave && s.afterLeave()
        }
        if (1 & e.shapeFlag && s && !s.persisted) {
          const { leave: t, delayLeave: o } = s,
            r = () => t(n, l)
          o ? o(e.el, l, r) : r()
        } else l()
      },
      Z = (e, t) => {
        let n
        for (; e !== t; ) (n = h(e)), o(e), (e = n)
        o(t)
      },
      Q = (e, t, n) => {
        const { bum: o, scope: r, update: s, subTree: l, um: i } = e
        o && W(o),
          r.stop(),
          s && ((s.active = !1), Y(l, e, t, n)),
          i && zn(i, t),
          zn(() => {
            e.isUnmounted = !0
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve())
      },
      ee = (e, t, n, o = !1, r = !1, s = 0) => {
        for (let l = s; l < e.length; l++) Y(e[l], t, n, o, r)
      },
      te = (e) =>
        6 & e.shapeFlag
          ? te(e.component.subTree)
          : 128 & e.shapeFlag
          ? e.suspense.next()
          : h(e.anchor || e.el),
      ne = (e, t, n) => {
        null == e
          ? t._vnode && Y(t._vnode, null, null, !0)
          : y(t._vnode || null, e, t, null, null, null, n),
          fr(),
          (t._vnode = e)
      },
      oe = { p: y, um: Y, m: J, r: X, mt: N, mc: A, pc: q, pbc: F, n: te, o: e }
    let se, le
    t && ([se, le] = t(oe))
    return { render: ne, hydrate: se, createApp: Bn(ne, se) }
  })(e, qn)
}
function Gn(e, t, n, o, r = !1) {
  if (w(e))
    return void e.forEach((e, s) => Gn(e, t && (w(t) ? t[s] : t), n, o, r))
  if (Kt(o) && !r) return
  const s = 4 & o.shapeFlag ? Do(o.component) || o.component.proxy : o.el,
    l = r ? null : s,
    { i: i, r: c } = e,
    a = t && t.r,
    d = i.refs === u ? (i.refs = {}) : i.refs,
    f = i.setupState
  if (
    (null != a &&
      a !== c &&
      (S(a)
        ? ((d[a] = null), _(f, a) && (f[a] = null))
        : ft(a) && (a.value = null)),
    S(c))
  ) {
    const e = () => {
      ;(d[c] = l), _(f, c) && (f[c] = l)
    }
    l ? ((e.id = -1), zn(e, n)) : e()
  } else if (ft(c)) {
    const e = () => {
      c.value = l
    }
    l ? ((e.id = -1), zn(e, n)) : e()
  } else C(c) && qo(c, i, 12, [l, d])
}
function Jn(e, t, n, o = null) {
  zo(e, t, 7, [n, o])
}
function Yn(e, t, n = !1) {
  const o = e.children,
    r = t.children
  if (w(o) && w(r))
    for (let s = 0; s < o.length; s++) {
      const e = o[s]
      let t = r[s]
      1 & t.shapeFlag &&
        !t.dynamicChildren &&
        ((t.patchFlag <= 0 || 32 === t.patchFlag) &&
          ((t = r[s] = Co(r[s])), (t.el = e.el)),
        n || Yn(e, t))
    }
}
function Xn(e, t) {
  return (
    (function (e, t, n = !0, o = !1) {
      const r = Et || Ro
      if (r) {
        const n = r.type
        if ('components' === e) {
          const e = Ho(n)
          if (e && (e === t || e === j(t) || e === N(j(t)))) return n
        }
        const s = Qn(r[e] || n[e], t) || Qn(r.appContext[e], t)
        return !s && o ? n : s
      }
    })('components', e, !0, t) || e
  )
}
const Zn = Symbol()
function Qn(e, t) {
  return e && (e[t] || e[j(t)] || e[N(j(t))])
}
const eo = Symbol(void 0),
  to = Symbol(void 0),
  no = Symbol(void 0),
  oo = Symbol(void 0),
  ro = []
let so = null
function lo(e = !1) {
  ro.push((so = e ? null : []))
}
let io = 1
function co(e) {
  io += e
}
function ao(e) {
  return (
    (e.dynamicChildren = io > 0 ? so || d : null),
    ro.pop(),
    (so = ro[ro.length - 1] || null),
    io > 0 && so && so.push(e),
    e
  )
}
function uo(e, t, n, o, r, s) {
  return ao(bo(e, t, n, o, r, s, !0))
}
function fo(e, t, n, o, r) {
  return ao(yo(e, t, n, o, r, !0))
}
function po(e) {
  return !!e && !0 === e.__v_isVNode
}
function ho(e, t) {
  return e.type === t.type && e.key === t.key
}
const vo = '__vInternal',
  mo = ({ key: e }) => (null != e ? e : null),
  go = ({ ref: e }) =>
    null != e ? (S(e) || ft(e) || C(e) ? { i: Et, r: e } : e) : null
function bo(
  e,
  t = null,
  n = null,
  o = 0,
  r = null,
  s = e === eo ? 0 : 1,
  l = !1,
  i = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mo(t),
    ref: t && go(t),
    scopeId: Lt,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null
  }
  return (
    i
      ? (So(c, n), 128 & s && e.normalize(c))
      : n && (c.shapeFlag |= S(n) ? 8 : 16),
    io > 0 &&
      !l &&
      so &&
      (c.patchFlag > 0 || 6 & s) &&
      32 !== c.patchFlag &&
      so.push(c),
    c
  )
}
const yo = function (e, t = null, n = null, r = 0, s = null, l = !1) {
  ;(e && e !== Zn) || (e = no)
  if (po(e)) {
    const o = _o(e, t, !0)
    return n && So(o, n), o
  }
  ;(c = e), C(c) && '__vccOpts' in c && (e = e.__vccOpts)
  var c
  if (t) {
    t = (function (e) {
      return e ? (lt(e) || vo in e ? g({}, e) : e) : null
    })(t)
    let { class: e, style: n } = t
    e && !S(e) && (t.class = i(e)),
      E(n) && (lt(n) && !w(n) && (n = g({}, n)), (t.style = o(n)))
  }
  const a = S(e)
    ? 1
    : ((e) => e.__isSuspense)(e)
    ? 128
    : ((e) => e.__isTeleport)(e)
    ? 64
    : E(e)
    ? 4
    : C(e)
    ? 2
    : 0
  return bo(e, t, n, r, s, a, l, !0)
}
function _o(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: l } = e,
    i = t ? $o(o || {}, t) : o
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && mo(i),
    ref:
      t && t.ref ? (n && r ? (w(r) ? r.concat(go(t)) : [r, go(t)]) : go(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== eo ? (-1 === s ? 16 : 16 | s) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && _o(e.ssContent),
    ssFallback: e.ssFallback && _o(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  }
}
function wo(e = ' ', t = 0) {
  return yo(to, null, e, t)
}
function xo(e = '', t = !1) {
  return t ? (lo(), fo(no, null, e)) : yo(no, null, e)
}
function ko(e) {
  return null == e || 'boolean' == typeof e
    ? yo(no)
    : w(e)
    ? yo(eo, null, e.slice())
    : 'object' == typeof e
    ? Co(e)
    : yo(to, null, String(e))
}
function Co(e) {
  return null === e.el || e.memo ? e : _o(e)
}
function So(e, t) {
  let n = 0
  const { shapeFlag: o } = e
  if (null == t) t = null
  else if (w(t)) n = 16
  else if ('object' == typeof t) {
    if (65 & o) {
      const n = t.default
      return void (n && (n._c && (n._d = !1), So(e, n()), n._c && (n._d = !0)))
    }
    {
      n = 32
      const o = t._
      o || vo in t
        ? 3 === o &&
          Et &&
          (1 === Et.slots._ ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
        : (t._ctx = Et)
    }
  } else
    C(t)
      ? ((t = { default: t, _ctx: Et }), (n = 32))
      : ((t = String(t)), 64 & o ? ((n = 16), (t = [wo(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function $o(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const e in r)
      if ('class' === e)
        t.class !== r.class && (t.class = i([t.class, r.class]))
      else if ('style' === e) t.style = o([t.style, r.style])
      else if (v(e)) {
        const n = t[e],
          o = r[e]
        n !== o && (t[e] = n ? [].concat(n, o) : o)
      } else '' !== e && (t[e] = r[e])
  }
  return t
}
function Eo(e, t, n, o) {
  let r
  const s = n && n[o]
  if (w(e) || S(e)) {
    r = new Array(e.length)
    for (let n = 0, o = e.length; n < o; n++)
      r[n] = t(e[n], n, void 0, s && s[n])
  } else if ('number' == typeof e) {
    r = new Array(e)
    for (let n = 0; n < e; n++) r[n] = t(n + 1, n, void 0, s && s[n])
  } else if (E(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (e, n) => t(e, n, void 0, s && s[n]))
    else {
      const n = Object.keys(e)
      r = new Array(n.length)
      for (let o = 0, l = n.length; o < l; o++) {
        const l = n[o]
        r[o] = t(e[l], l, o, s && s[o])
      }
    }
  else r = []
  return n && (n[o] = r), r
}
function Lo(e, t, n = {}, o, r) {
  if (Et.isCE) return yo('slot', 'default' === t ? null : { name: t }, o && o())
  let s = e[t]
  s && s._c && (s._d = !1), lo()
  const l = s && Oo(s(n)),
    i = fo(
      eo,
      { key: n.key || `_${t}` },
      l || (o ? o() : []),
      l && 1 === e._ ? 64 : -2
    )
  return (
    !r && i.scopeId && (i.slotScopeIds = [i.scopeId + '-s']),
    s && s._c && (s._d = !0),
    i
  )
}
function Oo(e) {
  return e.some(
    (e) => !po(e) || (e.type !== no && !(e.type === eo && !Oo(e.children)))
  )
    ? e
    : null
}
const Ao = (e) => (e ? (No(e) ? Do(e) || e.proxy : Ao(e.parent)) : null),
  To = g(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ao(e.parent),
    $root: (e) => Ao(e.root),
    $emit: (e) => e.emit,
    $options: (e) => bn(e),
    $forceUpdate: (e) => () => cr(e.update),
    $nextTick: (e) => ir.bind(e.proxy),
    $watch: (e) => br.bind(e)
  }),
  Fo = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: r,
        props: s,
        accessCache: l,
        type: i,
        appContext: c
      } = e
      let a
      if ('$' !== t[0]) {
        const i = l[t]
        if (void 0 !== i)
          switch (i) {
            case 0:
              return o[t]
            case 1:
              return r[t]
            case 3:
              return n[t]
            case 2:
              return s[t]
          }
        else {
          if (o !== u && _(o, t)) return (l[t] = 0), o[t]
          if (r !== u && _(r, t)) return (l[t] = 1), r[t]
          if ((a = e.propsOptions[0]) && _(a, t)) return (l[t] = 2), s[t]
          if (n !== u && _(n, t)) return (l[t] = 3), n[t]
          hn && (l[t] = 4)
        }
      }
      const d = To[t]
      let f, p
      return d
        ? ('$attrs' === t && ue(e, 0, t), d(e))
        : (f = i.__cssModules) && (f = f[t])
        ? f
        : n !== u && _(n, t)
        ? ((l[t] = 3), n[t])
        : ((p = c.config.globalProperties), _(p, t) ? p[t] : void 0)
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: s } = e
      if (r !== u && _(r, t)) r[t] = n
      else if (o !== u && _(o, t)) o[t] = n
      else if (_(e.props, t)) return !1
      return ('$' !== t[0] || !(t.slice(1) in e)) && ((s[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: r,
          propsOptions: s
        }
      },
      l
    ) {
      let i
      return (
        void 0 !== n[l] ||
        (e !== u && _(e, l)) ||
        (t !== u && _(t, l)) ||
        ((i = s[0]) && _(i, l)) ||
        _(o, l) ||
        _(To, l) ||
        _(r.config.globalProperties, l)
      )
    }
  },
  Po = Nn()
let Mo = 0
let Ro = null
const jo = () => Ro || Et,
  Io = (e) => {
    ;(Ro = e), e.scope.on()
  },
  Uo = () => {
    Ro && Ro.scope.off(), (Ro = null)
  }
function No(e) {
  return 4 & e.vnode.shapeFlag
}
let Vo = !1
function Bo(e, t, n) {
  C(t) ? (e.render = t) : E(t) && (e.setupState = bt(t)), Wo(e)
}
function Wo(e, t, n) {
  const o = e.type
  e.render || (e.render = o.render || f), Io(e), ce(), vn(e), ae(), Uo()
}
function Do(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(bt(ct(e.exposed)), {
        get: (t, n) => (n in t ? t[n] : n in To ? To[n](e) : void 0)
      }))
    )
}
function Ho(e) {
  return (C(e) && e.displayName) || e.name
}
function qo(e, t, n, o) {
  let r
  try {
    r = o ? e(...o) : e()
  } catch (s) {
    Ko(s, t, n)
  }
  return r
}
function zo(e, t, n, o) {
  if (C(e)) {
    const r = qo(e, t, n, o)
    return (
      r &&
        L(r) &&
        r.catch((e) => {
          Ko(e, t, n)
        }),
      r
    )
  }
  const r = []
  for (let s = 0; s < e.length; s++) r.push(zo(e[s], t, n, o))
  return r
}
function Ko(e, t, n, o = !0) {
  t && t.vnode
  if (t) {
    let o = t.parent
    const r = t.proxy,
      s = n
    for (; o; ) {
      const t = o.ec
      if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, s)) return
      o = o.parent
    }
    const l = t.appContext.config.errorHandler
    if (l) return void qo(l, null, 10, [e, r, s])
  }
  !(function (e, t, n, o = !0) {
    console.error(e)
  })(e, 0, 0, o)
}
let Go = !1,
  Jo = !1
const Yo = []
let Xo = 0
const Zo = []
let Qo = null,
  er = 0
const tr = []
let nr = null,
  or = 0
const rr = Promise.resolve()
let sr = null,
  lr = null
function ir(e) {
  const t = sr || rr
  return e ? t.then(this ? e.bind(this) : e) : t
}
function cr(e) {
  ;(Yo.length && Yo.includes(e, Go && e.allowRecurse ? Xo + 1 : Xo)) ||
    e === lr ||
    (null == e.id
      ? Yo.push(e)
      : Yo.splice(
          (function (e) {
            let t = Xo + 1,
              n = Yo.length
            for (; t < n; ) {
              const o = (t + n) >>> 1
              pr(Yo[o]) < e ? (t = o + 1) : (n = o)
            }
            return t
          })(e.id),
          0,
          e
        ),
    ar())
}
function ar() {
  Go || Jo || ((Jo = !0), (sr = rr.then(hr)))
}
function ur(e, t, n, o) {
  w(e)
    ? n.push(...e)
    : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e),
    ar()
}
function dr(e, t = null) {
  if (Zo.length) {
    for (
      lr = t, Qo = [...new Set(Zo)], Zo.length = 0, er = 0;
      er < Qo.length;
      er++
    )
      Qo[er]()
    ;(Qo = null), (er = 0), (lr = null), dr(e, t)
  }
}
function fr(e) {
  if (tr.length) {
    const e = [...new Set(tr)]
    if (((tr.length = 0), nr)) return void nr.push(...e)
    for (nr = e, nr.sort((e, t) => pr(e) - pr(t)), or = 0; or < nr.length; or++)
      nr[or]()
    ;(nr = null), (or = 0)
  }
}
const pr = (e) => (null == e.id ? 1 / 0 : e.id)
function hr(e) {
  ;(Jo = !1), (Go = !0), dr(e), Yo.sort((e, t) => pr(e) - pr(t))
  try {
    for (Xo = 0; Xo < Yo.length; Xo++) {
      const e = Yo[Xo]
      e && !1 !== e.active && qo(e, null, 14)
    }
  } finally {
    ;(Xo = 0),
      (Yo.length = 0),
      fr(),
      (Go = !1),
      (sr = null),
      (Yo.length || Zo.length || tr.length) && hr(e)
  }
}
const vr = {}
function mr(e, t, n) {
  return gr(e, t, n)
}
function gr(
  e,
  t,
  { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: l } = u
) {
  const i = Ro
  let c,
    a,
    d = !1,
    p = !1
  if (
    (ft(e)
      ? ((c = () => e.value), (d = !!e._shallow))
      : rt(e)
      ? ((c = () => e), (o = !0))
      : w(e)
      ? ((p = !0),
        (d = e.some(rt)),
        (c = () =>
          e.map((e) =>
            ft(e) ? e.value : rt(e) ? _r(e) : C(e) ? qo(e, i, 2) : void 0
          )))
      : (c = C(e)
          ? t
            ? () => qo(e, i, 2)
            : () => {
                if (!i || !i.isUnmounted) return a && a(), zo(e, i, 3, [h])
              }
          : f),
    t && o)
  ) {
    const e = c
    c = () => _r(e())
  }
  let h = (e) => {
      a = y.onStop = () => {
        qo(e, i, 4)
      }
    },
    v = p ? [] : vr
  const m = () => {
    if (y.active)
      if (t) {
        const e = y.run()
        ;(o || d || (p ? e.some((e, t) => B(e, v[t])) : B(e, v))) &&
          (a && a(), zo(t, i, 3, [e, v === vr ? void 0 : v, h]), (v = e))
      } else y.run()
  }
  let g
  ;(m.allowRecurse = !!t),
    (g =
      'sync' === r
        ? m
        : 'post' === r
        ? () => zn(m, i && i.suspense)
        : () => {
            !i || i.isMounted
              ? (function (e) {
                  ur(e, Qo, Zo, er)
                })(m)
              : m()
          })
  const y = new re(c, g)
  return (
    t
      ? n
        ? m()
        : (v = y.run())
      : 'post' === r
      ? zn(y.run.bind(y), i && i.suspense)
      : y.run(),
    () => {
      y.stop(), i && i.scope && b(i.scope.effects, y)
    }
  )
}
function br(e, t, n) {
  const o = this.proxy,
    r = S(e) ? (e.includes('.') ? yr(o, e) : () => o[e]) : e.bind(o, o)
  let s
  C(t) ? (s = t) : ((s = t.handler), (n = t))
  const l = Ro
  Io(this)
  const i = gr(r, s.bind(o), n)
  return l ? Io(l) : Uo(), i
}
function yr(e, t) {
  const n = t.split('.')
  return () => {
    let t = e
    for (let e = 0; e < n.length && t; e++) t = t[n[e]]
    return t
  }
}
function _r(e, t = new Set()) {
  if (!E(e) || e.__v_skip) return e
  if ((t = t || new Set()).has(e)) return e
  if ((t.add(e), ft(e))) _r(e.value, t)
  else if (w(e)) for (let n = 0; n < e.length; n++) _r(e[n], t)
  else if (k(e) || x(e))
    e.forEach((e) => {
      _r(e, t)
    })
  else if (T(e)) for (const n in e) _r(e[n], t)
  return e
}
function wr(e, t, n) {
  const o = arguments.length
  return 2 === o
    ? E(t) && !w(t)
      ? po(t)
        ? yo(e, null, [t])
        : yo(e, t)
      : yo(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : 3 === o && po(n) && (n = [n]),
      yo(e, t, n))
}
const xr = '3.2.11',
  kr = 'undefined' != typeof document ? document : null,
  Cr = new Map(),
  Sr = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, o) => {
      const r = t
        ? kr.createElementNS('http://www.w3.org/2000/svg', e)
        : kr.createElement(e, n ? { is: n } : void 0)
      return (
        'select' === e &&
          o &&
          null != o.multiple &&
          r.setAttribute('multiple', o.multiple),
        r
      )
    },
    createText: (e) => kr.createTextNode(e),
    createComment: (e) => kr.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => kr.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    cloneNode(e) {
      const t = e.cloneNode(!0)
      return '_value' in e && (t._value = e._value), t
    },
    insertStaticContent(e, t, n, o) {
      const r = n ? n.previousSibling : t.lastChild
      let s = Cr.get(e)
      if (!s) {
        const t = kr.createElement('template')
        if (((t.innerHTML = o ? `<svg>${e}</svg>` : e), (s = t.content), o)) {
          const e = s.firstChild
          for (; e.firstChild; ) s.appendChild(e.firstChild)
          s.removeChild(e)
        }
        Cr.set(e, s)
      }
      return (
        t.insertBefore(s.cloneNode(!0), n),
        [r ? r.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
      )
    }
  }
const $r = /\s*!important$/
function Er(e, t, n) {
  if (w(n)) n.forEach((n) => Er(e, t, n))
  else if (t.startsWith('--')) e.setProperty(t, n)
  else {
    const o = (function (e, t) {
      const n = Or[t]
      if (n) return n
      let o = j(t)
      if ('filter' !== o && o in e) return (Or[t] = o)
      o = N(o)
      for (let r = 0; r < Lr.length; r++) {
        const n = Lr[r] + o
        if (n in e) return (Or[t] = n)
      }
      return t
    })(e, t)
    $r.test(n)
      ? e.setProperty(U(o), n.replace($r, ''), 'important')
      : (e[o] = n)
  }
}
const Lr = ['Webkit', 'Moz', 'ms'],
  Or = {}
const Ar = 'http://www.w3.org/1999/xlink'
let Tr = Date.now,
  Fr = !1
if ('undefined' != typeof window) {
  Tr() > document.createEvent('Event').timeStamp &&
    (Tr = () => performance.now())
  const e = navigator.userAgent.match(/firefox\/(\d+)/i)
  Fr = !!(e && Number(e[1]) <= 53)
}
let Pr = 0
const Mr = Promise.resolve(),
  Rr = () => {
    Pr = 0
  }
function jr(e, t, n, o, r = null) {
  const s = e._vei || (e._vei = {}),
    l = s[t]
  if (o && l) l.value = o
  else {
    const [n, i] = (function (e) {
      let t
      if (Ir.test(e)) {
        let n
        for (t = {}; (n = e.match(Ir)); )
          (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0)
      }
      return [U(e.slice(2)), t]
    })(t)
    if (o) {
      !(function (e, t, n, o) {
        e.addEventListener(t, n, o)
      })(
        e,
        n,
        (s[t] = (function (e, t) {
          const n = (e) => {
            const o = e.timeStamp || Tr()
            ;(Fr || o >= n.attached - 1) &&
              zo(
                (function (e, t) {
                  if (w(t)) {
                    const n = e.stopImmediatePropagation
                    return (
                      (e.stopImmediatePropagation = () => {
                        n.call(e), (e._stopped = !0)
                      }),
                      t.map((e) => (t) => !t._stopped && e(t))
                    )
                  }
                  return t
                })(e, n.value),
                t,
                5,
                [e]
              )
          }
          return (
            (n.value = e),
            (n.attached = (() => Pr || (Mr.then(Rr), (Pr = Tr())))()),
            n
          )
        })(o, r)),
        i
      )
    } else
      l &&
        (!(function (e, t, n, o) {
          e.removeEventListener(t, n, o)
        })(e, n, l, i),
        (s[t] = void 0))
  }
}
const Ir = /(?:Once|Passive|Capture)$/
const Ur = /^on[a-z]/
Boolean
const Nr = g(
  {
    patchProp: (e, o, r, s, l = !1, i, c, a, u) => {
      'class' === o
        ? (function (e, t, n) {
            const o = e._vtc
            o && (t = (t ? [t, ...o] : [...o]).join(' ')),
              null == t
                ? e.removeAttribute('class')
                : n
                ? e.setAttribute('class', t)
                : (e.className = t)
          })(e, s, l)
        : 'style' === o
        ? (function (e, t, n) {
            const o = e.style,
              r = o.display
            if (n)
              if (S(n)) t !== n && (o.cssText = n)
              else {
                for (const e in n) Er(o, e, n[e])
                if (t && !S(t)) for (const e in t) null == n[e] && Er(o, e, '')
              }
            else e.removeAttribute('style')
            '_vod' in e && (o.display = r)
          })(e, r, s)
        : v(o)
        ? m(o) || jr(e, o, 0, s, c)
        : (
            '.' === o[0]
              ? ((o = o.slice(1)), 1)
              : '^' === o[0]
              ? ((o = o.slice(1)), 0)
              : (function (e, t, n, o) {
                  if (o)
                    return (
                      'innerHTML' === t ||
                      'textContent' === t ||
                      !!(t in e && Ur.test(t) && C(n))
                    )
                  if ('spellcheck' === t || 'draggable' === t) return !1
                  if ('form' === t) return !1
                  if ('list' === t && 'INPUT' === e.tagName) return !1
                  if ('type' === t && 'TEXTAREA' === e.tagName) return !1
                  if (Ur.test(t) && S(n)) return !1
                  return t in e
                })(e, o, s, l)
          )
        ? (function (e, t, o, r, s, l, i) {
            if ('innerHTML' === t || 'textContent' === t)
              return r && i(r, s, l), void (e[t] = null == o ? '' : o)
            if ('value' === t && 'PROGRESS' !== e.tagName) {
              e._value = o
              const n = null == o ? '' : o
              return (
                e.value !== n && (e.value = n),
                void (null == o && e.removeAttribute(t))
              )
            }
            if ('' === o || null == o) {
              const r = typeof e[t]
              if ('boolean' === r) return void (e[t] = n(o))
              if (null == o && 'string' === r)
                return (e[t] = ''), void e.removeAttribute(t)
              if ('number' === r) {
                try {
                  e[t] = 0
                } catch (c) {}
                return void e.removeAttribute(t)
              }
            }
            try {
              e[t] = o
            } catch (a) {}
          })(e, o, s, i, c, a, u)
        : ('true-value' === o
            ? (e._trueValue = s)
            : 'false-value' === o && (e._falseValue = s),
          (function (e, o, r, s, l) {
            if (s && o.startsWith('xlink:'))
              null == r
                ? e.removeAttributeNS(Ar, o.slice(6, o.length))
                : e.setAttributeNS(Ar, o, r)
            else {
              const s = t(o)
              null == r || (s && !n(r))
                ? e.removeAttribute(o)
                : e.setAttribute(o, s ? '' : r)
            }
          })(e, o, s, l))
    }
  },
  Sr
)
let Vr,
  Br = !1
const Wr = (...e) => {
  const t = ((Vr = Br ? Vr : Kn(Nr)), (Br = !0), Vr).createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (e) => {
      const t = (function (e) {
        if (S(e)) {
          return document.querySelector(e)
        }
        return e
      })(e)
      if (t) return n(t, !0, t instanceof SVGElement)
    }),
    t
  )
}
const Dr = /^https?:/i,
  Hr = 'undefined' != typeof window
function qr(e, t) {
  const n = (function (e, t) {
    t.sort((e, t) => {
      const n = t.split('/').length - e.split('/').length
      return 0 !== n ? n : t.length - e.length
    })
    for (const n of t) if (e.startsWith(n)) return n
  })(t, Object.keys(e))
  return n ? e[n] : void 0
}
function zr(e) {
  const { locales: t } = e.themeConfig || {},
    n = e.locales
  return t && n
    ? Object.keys(t).reduce(
        (e, o) => ((e[o] = { label: t[o].label, lang: n[o].lang }), e),
        {}
      )
    : {}
}
function Kr(e, t) {
  t = (function (e, t) {
    if (!Hr) return t
    const n = e.base,
      o = n.endsWith('/') ? n.slice(0, -1) : n
    return t.slice(o.length)
  })(e, t)
  const n = qr(e.locales || {}, t),
    o = qr(e.themeConfig.locales || {}, t)
  return Object.assign({}, e, n, {
    themeConfig: Object.assign({}, e.themeConfig, o, { locales: {} }),
    lang: (n || e).lang,
    locales: {},
    langs: zr(e)
  })
}
const Gr = Symbol(),
  Jr =
    ((Yr =
      '{"lang":"en-US","title":"A Machine Learning blog","description":"The offical Machine Learning blog by ngctnnnn","base":"/","head":[["link",{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"}]],"themeConfig":{},"locales":{},"langs":{}}'),
    vt(nt(JSON.parse(Yr)), !0))
var Yr
function Xr() {
  const e = Ut(Gr)
  if (!e) throw new Error('vitepress data not properly injected in app')
  return e
}
function Zr(e) {
  return Dr.test(e)
    ? e
    : (function (e, t) {
        return `${e}${t}`.replace(/\/+/g, '/')
      })(Jr.value.base, e)
}
function Qr(e) {
  let t = e.replace(/\.html$/, '')
  if (((t = decodeURIComponent(t)), t.endsWith('/') && (t += 'index'), Hr)) {
    const e = '/'
    t = t.slice(e.length).replace(/\//g, '_') + '.md'
    const n = __VP_HASH_MAP__[t.toLowerCase()]
    t = `${e}assets/${t}.${n}.js`
  } else t = `./${t.slice(1).replace(/\//g, '_')}.md.js`
  return t
}
const es = Symbol()
function ts() {
  return (function () {
    const e = Ut(es)
    if (!e) throw new Error('useRouter() is called without provider.')
    return e
  })().route
}
function ns(e, t, n = !1) {
  const o = e.classList.contains('.header-anchor')
    ? e
    : document.querySelector(decodeURIComponent(t))
  if (o) {
    const e = o.offsetTop
    !n || Math.abs(e - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, e)
      : window.scrollTo({ left: 0, top: e, behavior: 'smooth' })
  }
}
function os(e, t) {
  let n = [],
    o = !0
  var r
  gr(
    () => {
      const r = e.data,
        s = t.value,
        l = r && r.title,
        i = r && r.description,
        c = r && r.frontmatter.head
      var a
      ;(document.title = (l ? l + ' | ' : '') + s.title),
        document
          .querySelector('meta[name=description]')
          .setAttribute('content', i || s.description),
        ((e) => {
          if (o) return void (o = !1)
          const t = [],
            r = Math.min(n.length, e.length)
          for (let o = 0; o < r; o++) {
            let r = n[o]
            const [s, l, i = ''] = e[o]
            if (r.tagName.toLocaleLowerCase() === s) {
              for (const e in l)
                r.getAttribute(e) !== l[e] && r.setAttribute(e, l[e])
              for (let e = 0; e < r.attributes.length; e++) {
                const t = r.attributes[e].name
                t in l || r.removeAttribute(t)
              }
              r.innerHTML !== i && (r.innerHTML = i)
            } else
              document.head.removeChild(r),
                (r = rs(e[o])),
                document.head.append(r)
            t.push(r)
          }
          n.slice(r).forEach((e) => document.head.removeChild(e)),
            e.slice(r).forEach((e) => {
              const n = rs(e)
              document.head.appendChild(n), t.push(n)
            }),
            (n = t)
        })([
          ...(c
            ? ((a = c),
              a.filter((e) => {
                return !(
                  'meta' === (t = e)[0] &&
                  t[1] &&
                  'description' === t[1].name
                )
                var t
              }))
            : [])
        ])
    },
    null,
    r
  )
}
function rs([e, t, n]) {
  const o = document.createElement(e)
  for (const r in t) o.setAttribute(r, t[r])
  return n && (o.innerHTML = n), o
}
const ss = zt({
  name: 'VitePressContent',
  setup() {
    const e = ts()
    return () =>
      wr('div', { style: { position: 'relative' } }, [
        e.component ? wr(e.component) : null
      ])
  }
})
At('data-v-bf835584')
const ls = bo('p', { class: 'title' }, 'Debug', -1),
  is = { class: 'block' }
Tt()
zt({
  setup(e) {
    const t = Xr(),
      n = pt(null),
      o = pt(!1),
      r = tt(t)
    return (
      mr(o, (e) => {
        e || (n.value.scrollTop = 0)
      }),
      (e, t) => (
        lo(),
        uo(
          'div',
          {
            class: i(['debug', { open: o.value }]),
            ref: (e, t) => {
              ;(t.el = e), (n.value = e)
            },
            onClick: t[0] || (t[0] = (e) => (o.value = !o.value))
          },
          [ls, bo('pre', is, c(mt(r)), 1)],
          2
        )
      )
    )
  }
}).__scopeId = 'data-v-bf835584'
const cs = /#.*$/,
  as = /(index)?\.(md|html)$/,
  us = /\/$/,
  ds = /^[a-z]+:/i
function fs(e) {
  return Array.isArray(e)
}
function ps(e) {
  return ds.test(e)
}
function hs(e) {
  return decodeURI(e).replace(cs, '').replace(as, '')
}
function vs(e) {
  return /^\//.test(e) ? e : `/${e}`
}
function ms(e) {
  return e.replace(/(index)?(\.(md|html))?$/, '') || '/'
}
function gs(e, t) {
  if (
    (function (e) {
      return !1 === e || 'auto' === e || fs(e)
    })(e)
  )
    return e
  t = vs(t)
  for (const n in e) if (t.startsWith(vs(n))) return e[n]
  return 'auto'
}
function bs(e) {
  return e.reduce(
    (e, t) => (
      t.link && e.push({ text: t.text, link: ms(t.link) }),
      (function (e) {
        return void 0 !== e.children
      })(t) && (e = [...e, ...bs(t.children)]),
      e
    ),
    []
  )
}
At('data-v-4a583abe')
const ys = ['href', 'aria-label'],
  _s = ['src']
Tt()
var ws = zt({
  setup(e) {
    const { site: t, theme: n, localePath: o } = Xr()
    return (e, r) => (
      lo(),
      uo(
        'a',
        {
          class: 'nav-bar-title',
          href: mt(o),
          'aria-label': `${mt(t).title}, back to home`
        },
        [
          mt(n).logo
            ? (lo(),
              uo(
                'img',
                { key: 0, class: 'logo', src: mt(Zr)(mt(n).logo), alt: 'Logo' },
                null,
                8,
                _s
              ))
            : xo('v-if', !0),
          wo(' ' + c(mt(t).title), 1)
        ],
        8,
        ys
      )
    )
  }
})
ws.__scopeId = 'data-v-4a583abe'
const xs = ['GitHub', 'GitLab', 'Bitbucket'].map((e) => [e, new RegExp(e, 'i')])
function ks() {
  const { site: e } = Xr()
  return kt(() => {
    const t = e.value.themeConfig,
      n = t.docsRepo || t.repo
    if (!n) return null
    const o = ((r = n), Dr.test(r) ? r : `https://github.com/${r}`)
    var r
    return {
      text: (function (e, t) {
        if (t) return t
        const n = e.match(/^https?:\/\/[^/]+/)
        if (!n) return 'Source'
        const o = xs.find(([e, t]) => t.test(n[0]))
        if (o && o[0]) return o[0]
        return 'Source'
      })(o, t.repoLabel),
      link: o
    }
  })
}
function Cs(e) {
  const t = ts(),
    n = ps(e.value.link)
  return {
    props: kt(() => {
      const o = Ss(`/${t.data.relativePath}`)
      let r = !1
      if (e.value.activeMatch) r = new RegExp(e.value.activeMatch).test(o)
      else {
        const t = Ss(Zr(e.value.link))
        r = '/' === t ? t === o : o.startsWith(t)
      }
      return {
        class: { active: r, isExternal: n },
        href: n ? e.value.link : Zr(e.value.link),
        target: e.value.target || (n ? '_blank' : null),
        rel: e.value.rel || (n ? 'noopener noreferrer' : null),
        'aria-label': e.value.ariaLabel
      }
    }),
    isExternal: n
  }
}
function Ss(e) {
  return e
    .replace(/#.*$/, '')
    .replace(/\?.*$/, '')
    .replace(/\.(html|md)$/, '')
    .replace(/\/index$/, '/')
}
const $s = {},
  Es = {
    class: 'icon outbound',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    x: '0px',
    y: '0px',
    viewBox: '0 0 100 100',
    width: '15',
    height: '15'
  },
  Ls = [
    bo(
      'path',
      {
        fill: 'currentColor',
        d: 'M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z'
      },
      null,
      -1
    ),
    bo(
      'polygon',
      {
        fill: 'currentColor',
        points:
          '45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9'
      },
      null,
      -1
    )
  ]
;($s.render = function (e, t) {
  return lo(), uo('svg', Es, Ls)
}),
  At('data-v-b8818f8c')
const Os = { class: 'nav-link' }
Tt()
var As = zt({
  props: { item: { type: null, required: !0 } },
  setup(e) {
    const t = yt(e),
      { props: n, isExternal: o } = Cs(t.item)
    return (t, r) => (
      lo(),
      uo('div', Os, [
        bo(
          'a',
          $o({ class: 'item' }, mt(n)),
          [
            wo(c(e.item.text) + ' ', 1),
            mt(o) ? (lo(), fo($s, { key: 0 })) : xo('v-if', !0)
          ],
          16
        )
      ])
    )
  }
})
;(As.__scopeId = 'data-v-b8818f8c'), At('data-v-bbc27490')
const Ts = { class: 'nav-dropdown-link-item' },
  Fs = bo('span', { class: 'arrow' }, null, -1),
  Ps = { class: 'text' },
  Ms = { class: 'icon' }
Tt()
var Rs = zt({
  props: { item: { type: null, required: !0 } },
  setup(e) {
    const t = yt(e),
      { props: n, isExternal: o } = Cs(t.item)
    return (t, r) => (
      lo(),
      uo('div', Ts, [
        bo(
          'a',
          $o({ class: 'item' }, mt(n)),
          [
            Fs,
            bo('span', Ps, c(e.item.text), 1),
            bo('span', Ms, [
              mt(o) ? (lo(), fo($s, { key: 0 })) : xo('v-if', !0)
            ])
          ],
          16
        )
      ])
    )
  }
})
;(Rs.__scopeId = 'data-v-bbc27490'), At('data-v-56bf3a3f')
const js = ['aria-label'],
  Is = { class: 'button-text' },
  Us = { class: 'dialog' }
Tt()
var Ns = zt({
  props: { item: { type: null, required: !0 } },
  setup(e) {
    const t = ts(),
      n = pt(!1)
    function o() {
      n.value = !n.value
    }
    return (
      mr(
        () => t.path,
        () => {
          n.value = !1
        }
      ),
      (t, r) => (
        lo(),
        uo(
          'div',
          { class: i(['nav-dropdown-link', { open: n.value }]) },
          [
            bo(
              'button',
              { class: 'button', 'aria-label': e.item.ariaLabel, onClick: o },
              [
                bo('span', Is, c(e.item.text), 1),
                bo(
                  'span',
                  { class: i(['button-arrow', n.value ? 'down' : 'right']) },
                  null,
                  2
                )
              ],
              8,
              js
            ),
            bo('ul', Us, [
              (lo(!0),
              uo(
                eo,
                null,
                Eo(
                  e.item.items,
                  (e) => (
                    lo(),
                    uo('li', { key: e.text, class: 'dialog-item' }, [
                      yo(Rs, { item: e }, null, 8, ['item'])
                    ])
                  )
                ),
                128
              ))
            ])
          ],
          2
        )
      )
    )
  }
})
;(Ns.__scopeId = 'data-v-56bf3a3f'), At('data-v-eab3edfe')
const Vs = { key: 0, class: 'nav-links' },
  Bs = { key: 1, class: 'item' },
  Ws = { key: 2, class: 'item' }
Tt()
var Ds = zt({
  setup(e) {
    const { theme: t } = Xr(),
      n = (function () {
        const { site: e, localePath: t, theme: n } = Xr()
        return kt(() => {
          const o = e.value.langs,
            r = Object.keys(o)
          if (r.length < 2) return null
          const s = ts().path.replace(t.value, ''),
            l = r.map((e) => ({ text: o[e].label, link: `${e}${s}` }))
          return { text: n.value.selectText || 'Languages', items: l }
        })
      })(),
      o = ks(),
      r = kt(() => t.value.nav || o.value || n.value)
    return (e, s) =>
      mt(r)
        ? (lo(),
          uo('nav', Vs, [
            mt(t).nav
              ? (lo(!0),
                uo(
                  eo,
                  { key: 0 },
                  Eo(
                    mt(t).nav,
                    (e) => (
                      lo(),
                      uo('div', { key: e.text, class: 'item' }, [
                        e.items
                          ? (lo(),
                            fo(Ns, { key: 0, item: e }, null, 8, ['item']))
                          : (lo(),
                            fo(As, { key: 1, item: e }, null, 8, ['item']))
                      ])
                    )
                  ),
                  128
                ))
              : xo('v-if', !0),
            mt(n)
              ? (lo(),
                uo('div', Bs, [yo(Ns, { item: mt(n) }, null, 8, ['item'])]))
              : xo('v-if', !0),
            mt(o)
              ? (lo(),
                uo('div', Ws, [yo(As, { item: mt(o) }, null, 8, ['item'])]))
              : xo('v-if', !0)
          ]))
        : xo('v-if', !0)
  }
})
Ds.__scopeId = 'data-v-eab3edfe'
var Hs = { emits: ['toggle'] }
const qs = [
  bo(
    'svg',
    {
      class: 'icon',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
      role: 'img',
      viewBox: '0 0 448 512'
    },
    [
      bo('path', {
        fill: 'currentColor',
        d: 'M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z',
        class: ''
      })
    ],
    -1
  )
]
;(Hs.render = function (e, t, n, o, r, s) {
  return (
    lo(),
    uo(
      'div',
      {
        class: 'sidebar-button',
        onClick: t[0] || (t[0] = (t) => e.$emit('toggle'))
      },
      qs
    )
  )
}),
  At('data-v-675d8756')
const zs = { class: 'nav-bar' },
  Ks = bo('div', { class: 'flex-grow' }, null, -1),
  Gs = { class: 'nav' }
Tt()
var Js = zt({
  emits: ['toggle'],
  setup: (e) => (e, t) =>
    lo(),
    uo('header', zs, [
      yo(Hs, { onToggle: t[0] || (t[0] = (t) => e.$emit('toggle')) }),
      yo(ws),
      Ks,
      bo('div', Gs, [yo(Ds)]),
      Lo(e.$slots, 'search', {}, void 0, !0)
    ])
})
function Ys() {
  let e = null,
    t = null
  const n = (function (e, t) {
    let n,
      o = !1
    return () => {
      n && clearTimeout(n),
        o
          ? (n = setTimeout(e, t))
          : (e(),
            (o = !0),
            setTimeout(() => {
              o = !1
            }, t))
    }
  })(o, 300)
  function o() {
    const e = (function (e) {
      return [].slice
        .call(document.querySelectorAll('.header-anchor'))
        .filter((t) => e.some((e) => e.hash === t.hash))
    })([].slice.call(document.querySelectorAll('.sidebar a.sidebar-link-item')))
    for (let t = 0; t < e.length; t++) {
      const n = e[t],
        o = e[t + 1],
        [s, l] = Zs(t, n, o)
      if (s)
        return history.replaceState(null, document.title, l || ' '), void r(l)
    }
  }
  function r(n) {
    if (
      (s(t), s(e), (t = document.querySelector(`.sidebar a[href="${n}"]`)), !t)
    )
      return
    t.classList.add('active')
    const o = t.closest('.sidebar-links > ul > li')
    o && o !== t.parentElement
      ? ((e = o.querySelector('a')), e && e.classList.add('active'))
      : (e = null)
  }
  function s(e) {
    e && e.classList.remove('active')
  }
  rn(() => {
    o(), window.addEventListener('scroll', n)
  }),
    ln(() => {
      r(decodeURIComponent(location.hash))
    }),
    an(() => {
      window.removeEventListener('scroll', n)
    })
}
function Xs(e) {
  const t = document.querySelector('.nav-bar').offsetHeight
  return e.parentElement.offsetTop - t - 15
}
function Zs(e, t, n) {
  const o = window.scrollY
  return 0 === e && 0 === o
    ? [!0, null]
    : o < Xs(t)
    ? [!1, null]
    : !n || o < Xs(n)
    ? [!0, decodeURIComponent(t.hash)]
    : [!1, null]
}
function Qs(e, t) {
  const n = []
  if (void 0 === e) return []
  let o
  return (
    e.forEach(({ level: e, title: r, slug: s }) => {
      if (e - 1 > t) return
      const l = { text: r, link: `#${s}` }
      2 === e
        ? ((o = l), n.push(l))
        : o && (o.children || (o.children = [])).push(l)
    }),
    n
  )
}
Js.__scopeId = 'data-v-675d8756'
const el = (e) => {
  const t = ts(),
    { site: n, frontmatter: o } = Xr(),
    r = e.depth || 1,
    s = o.value.sidebarDepth || 1 / 0,
    l = t.data.headers,
    i = e.item.text,
    c = (function (e, t) {
      if (void 0 === t) return t
      if (t.startsWith('#')) return t
      return (function (e, t) {
        const n = e.endsWith('/'),
          o = t.startsWith('/')
        return n && o ? e.slice(0, -1) + t : n || o ? e + t : `${e}/${t}`
      })(e, t)
    })(n.value.base, e.item.link),
    a = e.item.children,
    u = (function (e, t) {
      return void 0 !== t && hs(`/${e.data.relativePath}`) === hs(t)
    })(t, e.item.link),
    d = r < s ? tl(u, a, l, r + 1) : null
  return wr('li', { class: 'sidebar-link' }, [
    wr(
      c ? 'a' : 'p',
      { class: { 'sidebar-link-item': !0, active: u }, href: c },
      i
    ),
    d
  ])
}
function tl(e, t, n, o = 1) {
  return t && t.length > 0
    ? wr(
        'ul',
        { class: 'sidebar-links' },
        t.map((e) => wr(el, { item: e, depth: o }))
      )
    : e && n
    ? tl(
        !1,
        (function (e) {
          return nl(
            (function (e) {
              let t
              return (
                (e = e.map((e) => Object.assign({}, e))).forEach((e) => {
                  2 === e.level
                    ? (t = e)
                    : t && (t.children || (t.children = [])).push(e)
                }),
                e.filter((e) => 2 === e.level)
              )
            })(e)
          )
        })(n),
        void 0,
        o
      )
    : null
}
function nl(e) {
  return e.map((e) => ({
    text: e.title,
    link: `#${e.slug}`,
    children: e.children ? nl(e.children) : void 0
  }))
}
const ol = { key: 0, class: 'sidebar-links' }
var rl = zt({
    setup(e) {
      const t = (function () {
        const e = ts(),
          { site: t } = Xr()
        return (
          Ys(),
          kt(() => {
            const n = e.data.headers,
              o = e.data.frontmatter.sidebar,
              r = e.data.frontmatter.sidebarDepth
            if (!1 === o) return []
            if ('auto' === o) return Qs(n, r)
            const s = gs(t.value.themeConfig.sidebar, e.data.relativePath)
            return !1 === s ? [] : 'auto' === s ? Qs(n, r) : s
          })
        )
      })()
      return (e, n) =>
        mt(t).length > 0
          ? (lo(),
            uo('ul', ol, [
              (lo(!0),
              uo(
                eo,
                null,
                Eo(
                  mt(t),
                  (e) => (lo(), fo(mt(el), { item: e }, null, 8, ['item']))
                ),
                256
              ))
            ]))
          : xo('v-if', !0)
    }
  }),
  sl = zt({
    props: { open: { type: Boolean, required: !0 } },
    setup: (e) => (t, n) =>
      lo(),
      uo(
        'aside',
        { class: i(['sidebar', { open: e.open }]) },
        [
          yo(Ds, { class: 'nav' }),
          Lo(t.$slots, 'sidebar-top', {}, void 0, !0),
          yo(rl),
          Lo(t.$slots, 'sidebar-bottom', {}, void 0, !0)
        ],
        2
      )
  })
sl.__scopeId = 'data-v-83e92a68'
const ll = /bitbucket.org/
function il() {
  const { page: e, theme: t, frontmatter: n } = Xr()
  return {
    url: kt(() => {
      const {
          repo: o,
          docsDir: r = '',
          docsBranch: s = 'master',
          docsRepo: l = o,
          editLinks: i
        } = t.value,
        c = null != n.value.editLink ? n.value.editLink : i,
        { relativePath: a } = e.value
      return c && a && o
        ? (function (e, t, n, o, r) {
            return ll.test(e)
              ? (function (e, t, n, o, r) {
                  return (
                    (ps(t) ? t : e).replace(us, '') +
                    `/src/${o}/` +
                    (n ? n.replace(us, '') + '/' : '') +
                    r +
                    `?mode=edit&spa=0&at=${o}&fileviewer=file-view-default`
                  )
                })(e, t, n, o, r)
              : (function (e, t, n, o, r) {
                  return (
                    (ps(t) ? t : `https://github.com/${t}`).replace(us, '') +
                    `/edit/${o}/` +
                    (n ? n.replace(us, '') + '/' : '') +
                    r
                  )
                })(0, t, n, o, r)
          })(o, l, r, s, a)
        : null
    }),
    text: kt(() => t.value.editLinkText || 'Edit this page')
  }
}
At('data-v-1ed99556')
const cl = { class: 'edit-link' },
  al = ['href']
Tt()
var ul = zt({
  setup(e) {
    const { url: t, text: n } = il()
    return (e, o) => (
      lo(),
      uo('div', cl, [
        mt(t)
          ? (lo(),
            uo(
              'a',
              {
                key: 0,
                class: 'link',
                href: mt(t),
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              [wo(c(mt(n)) + ' ', 1), yo($s, { class: 'icon' })],
              8,
              al
            ))
          : xo('v-if', !0)
      ])
    )
  }
})
;(ul.__scopeId = 'data-v-1ed99556'), At('data-v-5797b537')
const dl = { key: 0, class: 'last-updated' },
  fl = { class: 'prefix' },
  pl = { class: 'datetime' }
Tt()
var hl = zt({
  setup(e) {
    const { theme: t, page: n } = Xr(),
      o = kt(() => {
        const e = t.value.lastUpdated
        return void 0 !== e && !1 !== e
      }),
      r = kt(() => {
        const e = t.value.lastUpdated
        return !0 === e ? 'Last Updated' : e
      }),
      s = pt('')
    return (
      rn(() => {
        s.value = new Date(n.value.lastUpdated).toLocaleString('en-US')
      }),
      (e, t) =>
        mt(o)
          ? (lo(),
            uo('p', dl, [
              bo('span', fl, c(mt(r)) + ':', 1),
              bo('span', pl, c(s.value), 1)
            ]))
          : xo('v-if', !0)
    )
  }
})
;(hl.__scopeId = 'data-v-5797b537'), At('data-v-fb8d84c6')
const vl = { class: 'page-footer' },
  ml = { class: 'edit' },
  gl = { class: 'updated' }
Tt()
var bl = zt({
  setup: (e) => (e, t) =>
    lo(), uo('footer', vl, [bo('div', ml, [yo(ul)]), bo('div', gl, [yo(hl)])])
})
function yl() {
  const { page: e, theme: t } = Xr(),
    n = kt(() => ms(vs(e.value.relativePath))),
    o = kt(() => {
      const e = gs(t.value.sidebar, n.value)
      return fs(e) ? bs(e) : []
    }),
    r = kt(() => o.value.findIndex((e) => e.link === n.value)),
    s = kt(() => {
      if (
        !1 !== t.value.nextLinks &&
        r.value > -1 &&
        r.value < o.value.length - 1
      )
        return o.value[r.value + 1]
    }),
    l = kt(() => {
      if (!1 !== t.value.prevLinks && r.value > 0) return o.value[r.value - 1]
    }),
    i = kt(() => !!s.value || !!l.value)
  return { next: s, prev: l, hasLinks: i }
}
bl.__scopeId = 'data-v-fb8d84c6'
const _l = {},
  wl = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  xl = [
    bo(
      'path',
      {
        d: 'M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z'
      },
      null,
      -1
    )
  ]
_l.render = function (e, t) {
  return lo(), uo('svg', wl, xl)
}
const kl = {},
  Cl = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  Sl = [
    bo(
      'path',
      {
        d: 'M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z'
      },
      null,
      -1
    )
  ]
;(kl.render = function (e, t) {
  return lo(), uo('svg', Cl, Sl)
}),
  At('data-v-38ede35f')
const $l = { key: 0, class: 'next-and-prev-link' },
  El = { class: 'container' },
  Ll = { class: 'prev' },
  Ol = ['href'],
  Al = { class: 'text' },
  Tl = { class: 'next' },
  Fl = ['href'],
  Pl = { class: 'text' }
Tt()
var Ml = zt({
  setup(e) {
    const { hasLinks: t, prev: n, next: o } = yl()
    return (e, r) =>
      mt(t)
        ? (lo(),
          uo('div', $l, [
            bo('div', El, [
              bo('div', Ll, [
                mt(n)
                  ? (lo(),
                    uo(
                      'a',
                      { key: 0, class: 'link', href: mt(Zr)(mt(n).link) },
                      [
                        yo(_l, { class: 'icon icon-prev' }),
                        bo('span', Al, c(mt(n).text), 1)
                      ],
                      8,
                      Ol
                    ))
                  : xo('v-if', !0)
              ]),
              bo('div', Tl, [
                mt(o)
                  ? (lo(),
                    uo(
                      'a',
                      { key: 0, class: 'link', href: mt(Zr)(mt(o).link) },
                      [
                        bo('span', Pl, c(mt(o).text), 1),
                        yo(kl, { class: 'icon icon-next' })
                      ],
                      8,
                      Fl
                    ))
                  : xo('v-if', !0)
              ])
            ])
          ]))
        : xo('v-if', !0)
  }
})
;(Ml.__scopeId = 'data-v-38ede35f'), At('data-v-7eddb2c4')
const Rl = { class: 'page' },
  jl = { class: 'container' }
Tt()
var Il = zt({
  setup: (e) => (e, t) => {
    const n = Xn('Content')
    return (
      lo(),
      uo('main', Rl, [
        bo('div', jl, [
          Lo(e.$slots, 'top', {}, void 0, !0),
          yo(n, { class: 'content' }),
          yo(bl),
          yo(Ml),
          Lo(e.$slots, 'bottom', {}, void 0, !0)
        ])
      ])
    )
  }
})
Il.__scopeId = 'data-v-7eddb2c4'
const Ul = { key: 0, id: 'ads-container' }
var Nl = zt({
  setup(e) {
    const t = Gt(() => import('./Home.d2612de6.js')),
      n = () => null,
      o = n,
      r = n,
      s = n,
      l = ts(),
      { site: c, page: a, theme: u, frontmatter: d } = Xr(),
      f = kt(() => !!d.value.customLayout),
      p = kt(() => !!d.value.home),
      h = kt(() => Object.keys(c.value.langs).length > 1),
      v = kt(() => {
        const e = u.value
        return (
          !1 !== d.value.navbar &&
          !1 !== e.navbar &&
          (c.value.title || e.logo || e.repo || e.nav)
        )
      }),
      m = pt(!1),
      g = kt(() => {
        return (
          !d.value.home &&
          !1 !== d.value.sidebar &&
          !(fs((e = gs(u.value.sidebar, l.data.relativePath)))
            ? 0 === e.length
            : !e)
        )
        var e
      }),
      b = (e) => {
        m.value = 'boolean' == typeof e ? e : !m.value
      },
      y = b.bind(null, !1)
    mr(l, y)
    const _ = kt(() => [
      { 'no-navbar': !v.value, 'sidebar-open': m.value, 'no-sidebar': !g.value }
    ])
    return (e, n) => {
      const l = Xn('Content'),
        d = Xn('Debug')
      return (
        lo(),
        uo(
          eo,
          null,
          [
            bo(
              'div',
              { class: i(['theme', mt(_)]) },
              [
                mt(v)
                  ? (lo(),
                    fo(
                      Js,
                      { key: 0, onToggle: b },
                      {
                        search: Ft(() => [
                          Lo(e.$slots, 'navbar-search', {}, () => [
                            mt(u).algolia
                              ? (lo(),
                                fo(
                                  mt(s),
                                  {
                                    options: mt(u).algolia,
                                    multilang: mt(h),
                                    key: mt(c).lang
                                  },
                                  null,
                                  8,
                                  ['options', 'multilang']
                                ))
                              : xo('v-if', !0)
                          ])
                        ]),
                        _: 3
                      }
                    ))
                  : xo('v-if', !0),
                yo(
                  sl,
                  { open: m.value },
                  {
                    'sidebar-top': Ft(() => [Lo(e.$slots, 'sidebar-top')]),
                    'sidebar-bottom': Ft(() => [
                      Lo(e.$slots, 'sidebar-bottom')
                    ]),
                    _: 3
                  },
                  8,
                  ['open']
                ),
                xo(' TODO: make this button accessible '),
                bo('div', {
                  class: 'sidebar-mask',
                  onClick: n[0] || (n[0] = (e) => b(!1))
                }),
                mt(f)
                  ? (lo(), fo(l, { key: 1 }))
                  : mt(p)
                  ? (lo(),
                    fo(
                      mt(t),
                      { key: 2 },
                      {
                        hero: Ft(() => [Lo(e.$slots, 'home-hero')]),
                        features: Ft(() => [Lo(e.$slots, 'home-features')]),
                        footer: Ft(() => [Lo(e.$slots, 'home-footer')]),
                        _: 3
                      }
                    ))
                  : (lo(),
                    fo(
                      Il,
                      { key: 3 },
                      {
                        top: Ft(() => [
                          Lo(e.$slots, 'page-top-ads', {}, () => [
                            mt(u).carbonAds && mt(u).carbonAds.carbon
                              ? (lo(),
                                uo('div', Ul, [
                                  yo(
                                    mt(o),
                                    {
                                      key: 'carbon' + mt(a).relativePath,
                                      code: mt(u).carbonAds.carbon,
                                      placement: mt(u).carbonAds.placement
                                    },
                                    null,
                                    8,
                                    ['code', 'placement']
                                  )
                                ]))
                              : xo('v-if', !0)
                          ]),
                          Lo(e.$slots, 'page-top')
                        ]),
                        bottom: Ft(() => [
                          Lo(e.$slots, 'page-bottom'),
                          Lo(e.$slots, 'page-bottom-ads', {}, () => [
                            mt(u).carbonAds && mt(u).carbonAds.custom
                              ? (lo(),
                                fo(
                                  mt(r),
                                  {
                                    key: 'custom' + mt(a).relativePath,
                                    code: mt(u).carbonAds.custom,
                                    placement: mt(u).carbonAds.placement
                                  },
                                  null,
                                  8,
                                  ['code', 'placement']
                                ))
                              : xo('v-if', !0)
                          ])
                        ]),
                        _: 3
                      }
                    ))
              ],
              2
            ),
            yo(d)
          ],
          64
        )
      )
    }
  }
})
const Vl = { class: 'theme' },
  Bl = bo('h1', null, '404', -1),
  Wl = ['href']
const Dl = {
    Layout: Nl,
    NotFound: zt({
      setup(e) {
        const { site: t } = Xr(),
          n = [
            "There's nothing here.",
            'How did we get here?',
            "That's a Four-Oh-Four.",
            "Looks like we've got some broken links."
          ]
        return (e, o) => (
          lo(),
          uo('div', Vl, [
            Bl,
            bo(
              'blockquote',
              null,
              c(n[Math.floor(Math.random() * n.length)]),
              1
            ),
            bo(
              'a',
              { href: mt(t).base, 'aria-label': 'go to home' },
              'Take me home.',
              8,
              Wl
            )
          ])
        )
      }
    })
  },
  Hl = new Set(),
  ql = () => document.createElement('link')
let zl
const Kl =
  Hr &&
  (zl = ql()) &&
  zl.relList &&
  zl.relList.supports &&
  zl.relList.supports('prefetch')
    ? (e) => {
        const t = ql()
        ;(t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t)
      }
    : (e) => {
        const t = new XMLHttpRequest()
        t.open('GET', e, (t.withCredentials = !0)), t.send()
      }
const Gl = zt({
    setup(e, { slots: t }) {
      const n = pt(!1)
      return (
        rn(() => {
          n.value = !0
        }),
        () => (n.value && t.default ? t.default() : null)
      )
    }
  }),
  Jl = Dl.NotFound || (() => '404 Not Found'),
  Yl = {
    name: 'VitePressApp',
    setup() {
      const { site: e } = Xr()
      return (
        rn(() => {
          mr(
            () => e.value.lang,
            (e) => {
              document.documentElement.lang = e
            },
            { immediate: !0 }
          )
        }),
        (function () {
          if (!Hr) return
          if (!window.IntersectionObserver) return
          let e
          if (
            (e = navigator.connection) &&
            (e.saveData || /2g/.test(e.effectiveType))
          )
            return
          const t = window.requestIdleCallback || setTimeout
          let n = null
          const o = () => {
            n && n.disconnect(),
              (n = new IntersectionObserver((e) => {
                e.forEach((e) => {
                  if (e.isIntersecting) {
                    const t = e.target
                    n.unobserve(t)
                    const { pathname: o } = t
                    if (!Hl.has(o)) {
                      Hl.add(o)
                      const e = Qr(o)
                      Kl(e)
                    }
                  }
                })
              })),
              t(() => {
                document.querySelectorAll('#app a').forEach((e) => {
                  const { target: t, hostname: o, pathname: r } = e,
                    s = r.match(/\.\w+$/)
                  ;(s && '.html' !== s[0]) ||
                    ('_blank' !== t &&
                      o === location.hostname &&
                      (r !== location.pathname ? n.observe(e) : Hl.add(r)))
                })
              })
          }
          rn(o)
          const r = ts()
          mr(() => r.path, o),
            an(() => {
              n && n.disconnect()
            })
        })(),
        () => wr(Dl.Layout)
      )
    }
  }
function Xl() {
  const e = (function () {
      let e,
        t = Hr
      return (function (e, t) {
        const n = tt({ path: '/', component: null, data: null })
        function o(e = Hr ? location.href : '/') {
          const t = new URL(e, 'http://a.com')
          return (
            t.pathname.endsWith('/') ||
              t.pathname.endsWith('.html') ||
              ((t.pathname += '.html'), (e = t.pathname + t.search + t.hash)),
            Hr &&
              (history.replaceState(
                { scrollPosition: window.scrollY },
                document.title
              ),
              history.pushState(null, '', e)),
            s(e)
          )
        }
        let r = null
        async function s(o, s = 0) {
          const l = new URL(o, 'http://a.com'),
            i = (r = l.pathname)
          try {
            let t = e(i)
            if (
              ('then' in t && 'function' == typeof t.then && (t = await t),
              r === i)
            ) {
              r = null
              const { default: e, __pageData: o } = t
              if (!e) throw new Error(`Invalid route component: ${e}`)
              ;(n.path = i),
                (n.component = ct(e)),
                (n.data = ct(JSON.parse(o))),
                Hr &&
                  ir(() => {
                    if (l.hash && !s) {
                      const e = document.querySelector(
                        decodeURIComponent(l.hash)
                      )
                      if (e) return void ns(e, l.hash)
                    }
                    window.scrollTo(0, s)
                  })
            }
          } catch (c) {
            c.message.match(/fetch/) || console.error(c),
              r === i &&
                ((r = null), (n.path = i), (n.component = t ? ct(t) : null))
          }
        }
        return (
          Hr &&
            (window.addEventListener(
              'click',
              (e) => {
                const t = e.target.closest('a')
                if (t) {
                  const {
                      href: n,
                      protocol: r,
                      hostname: s,
                      pathname: l,
                      hash: i,
                      target: c
                    } = t,
                    a = window.location,
                    u = l.match(/\.\w+$/)
                  e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey ||
                    e.metaKey ||
                    '_blank' === c ||
                    r !== a.protocol ||
                    s !== a.hostname ||
                    (u && '.html' !== u[0]) ||
                    (e.preventDefault(),
                    l === a.pathname
                      ? i &&
                        i !== a.hash &&
                        (history.pushState(null, '', i),
                        window.dispatchEvent(new Event('hashchange')),
                        ns(t, i, t.classList.contains('header-anchor')))
                      : o(n))
                }
              },
              { capture: !0 }
            ),
            window.addEventListener('popstate', (e) => {
              s(location.href, (e.state && e.state.scrollPosition) || 0)
            }),
            window.addEventListener('hashchange', (e) => {
              e.preventDefault()
            })),
          { route: n, go: o }
        )
      })((n) => {
        let o = Qr(n)
        return (
          t && (e = o),
          (t || e === o) && (o = o.replace(/\.js$/, '.lean.js')),
          Hr ? ((t = !1), import(o)) : require(o)
        )
      }, Jl)
    })(),
    t = Wr(Yl)
  t.provide(es, e)
  const n = (function (e) {
    const t = kt(() => Kr(Jr.value, e.path))
    return {
      site: t,
      theme: kt(() => t.value.themeConfig),
      page: kt(() => e.data),
      frontmatter: kt(() => e.data.frontmatter),
      lang: kt(() => t.value.lang),
      localePath: kt(() => {
        const { langs: e, lang: n } = t.value
        return Zr(Object.keys(e).find((t) => e[t].lang === n) || '/')
      }),
      title: kt(() =>
        e.data.title ? e.data.title + ' | ' + t.value.title : t.value.title
      ),
      description: kt(() => e.data.description || t.value.description)
    }
  })(e.route)
  return (
    t.provide(Gr, n),
    Hr && os(e.route, n.site),
    t.component('Content', ss),
    t.component('ClientOnly', Gl),
    t.component('Debug', () => null),
    Object.defineProperty(t.config.globalProperties, '$frontmatter', {
      get: () => n.frontmatter.value
    }),
    { app: t, router: e }
  )
}
if (Hr) {
  const { app: e, router: t } = Xl()
  t.go().then(() => {
    e.mount('#app')
  })
}
export {
  eo as F,
  As as _,
  mt as a,
  uo as b,
  kt as c,
  Xl as createApp,
  zt as d,
  bo as e,
  xo as f,
  fo as g,
  Tt as h,
  Xn as i,
  yo as j,
  Lo as k,
  lo as o,
  At as p,
  Eo as r,
  c as t,
  Xr as u,
  Zr as w
}
