var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    var Unit = function (value0) {
        return {
            ctor: "Prelude.Unit", 
            values: [ value0 ]
        };
    };
    var LT = {
        ctor: "Prelude.LT", 
        values: [  ]
    };
    var GT = {
        ctor: "Prelude.GT", 
        values: [  ]
    };
    var EQ = {
        ctor: "Prelude.EQ", 
        values: [  ]
    };
    function cons(e) {  return function (l) {    return [e].concat(l);  };};
    function showStringImpl(s) {  return JSON.stringify(s);};
    function showNumberImpl(n) {  return n.toString();};
    function showArrayImpl (f) {  return function (xs) {    var ss = [];    for (var i = 0, l = xs.length; i < l; i++) {      ss[i] = f(xs[i]);    }    return '[' + ss.join(',') + ']';  };};
    function numAdd(n1) {  return function(n2) {    return n1 + n2;  };};
    function numSub(n1) {  return function(n2) {    return n1 - n2;  };};
    function numMul(n1) {  return function(n2) {    return n1 * n2;  };};
    function numDiv(n1) {  return function(n2) {    return n1 / n2;  };};
    function numMod(n1) {  return function(n2) {    return n1 % n2;  };};
    function numNegate(n) {  return -n;};
    function refEq(r1) {  return function(r2) {    return r1 === r2;  };};
    function refIneq(r1) {  return function(r2) {    return r1 !== r2;  };};
    function eqArrayImpl(f) {  return function(xs) {    return function(ys) {      if (xs.length !== ys.length) return false;      for (var i = 0; i < xs.length; i++) {        if (!f(xs[i])(ys[i])) return false;      }      return true;    };  };};
    function unsafeCompare(n1) {  return function(n2) {    return n1 < n2 ? LT : n1 > n2 ? GT : EQ;  };};
    function numShl(n1) {  return function(n2) {    return n1 << n2;  };};
    function numShr(n1) {  return function(n2) {    return n1 >> n2;  };};
    function numZshr(n1) {  return function(n2) {    return n1 >>> n2;  };};
    function numAnd(n1) {  return function(n2) {    return n1 & n2;  };};
    function numOr(n1) {  return function(n2) {    return n1 | n2;  };};
    function numXor(n1) {  return function(n2) {    return n1 ^ n2;  };};
    function numComplement(n) {  return ~n;};
    function boolAnd(b1) {  return function(b2) {    return b1 && b2;  };};
    function boolOr(b1) {  return function(b2) {    return b1 || b2;  };};
    function boolNot(b) {  return !b;};
    function concatString(s1) {  return function(s2) {    return s1 + s2;  };};
    var $bar$bar = function (dict) {
        return dict["||"];
    };
    var $bar = function (dict) {
        return dict["|"];
    };
    var $up = function (dict) {
        return dict["^"];
    };
    var $greater$greater$eq = function (dict) {
        return dict[">>="];
    };
    var $eq$eq = function (dict) {
        return dict["=="];
    };
    var $less$bar$greater = function (dict) {
        return dict["<|>"];
    };
    var $less$greater = function (dict) {
        return dict["<>"];
    };
    var $less$less$less = function (dict) {
        return dict["<<<"];
    };
    var $greater$greater$greater = function (__dict_Semigroupoid_0) {
        return function (f) {
            return function (g) {
                return $less$less$less(__dict_Semigroupoid_0)(g)(f);
            };
        };
    };
    var $less$times$greater = function (dict) {
        return dict["<*>"];
    };
    var $less$dollar$greater = function (dict) {
        return dict["<$>"];
    };
    var $colon = cons;
    var $div$eq = function (dict) {
        return dict["/="];
    };
    var $div = function (dict) {
        return dict["/"];
    };
    var $minus = function (dict) {
        return dict["-"];
    };
    var $plus$plus = function (__dict_Semigroup_1) {
        return $less$greater(__dict_Semigroup_1);
    };
    var $plus = function (dict) {
        return dict["+"];
    };
    var $times = function (dict) {
        return dict["*"];
    };
    var $amp$amp = function (dict) {
        return dict["&&"];
    };
    var $amp = function (dict) {
        return dict["&"];
    };
    var $percent = function (dict) {
        return dict["%"];
    };
    var $dollar = function (f) {
        return function (x) {
            return f(x);
        };
    };
    var $hash = function (x) {
        return function (f) {
            return f(x);
        };
    };
    var zshr = function (dict) {
        return dict.zshr;
    };
    var unit = Unit({});
    var shr = function (dict) {
        return dict.shr;
    };
    var showUnit = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_12) {
                return "Unit {}";
            }
        };
    };
    var showString = function (_) {
        return {
            "__superclasses": {}, 
            show: showStringImpl
        };
    };
    var showOrdering = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_20) {
                if (_20.ctor === "Prelude.LT") {
                    return "LT";
                };
                if (_20.ctor === "Prelude.GT") {
                    return "GT";
                };
                if (_20.ctor === "Prelude.EQ") {
                    return "EQ";
                };
                throw "Failed pattern match";
            }
        };
    };
    var showNumber = function (_) {
        return {
            "__superclasses": {}, 
            show: showNumberImpl
        };
    };
    var showBoolean = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_13) {
                if (_13) {
                    return "true";
                };
                if (!_13) {
                    return "false";
                };
                throw "Failed pattern match";
            }
        };
    };
    var show = function (dict) {
        return dict.show;
    };
    var showArray = function (__dict_Show_2) {
        return {
            "__superclasses": {}, 
            show: showArrayImpl(show(__dict_Show_2))
        };
    };
    var shl = function (dict) {
        return dict.shl;
    };
    var semigroupoidArr = function (_) {
        return {
            "__superclasses": {}, 
            "<<<": function (f) {
                return function (g) {
                    return function (x) {
                        return f(g(x));
                    };
                };
            }
        };
    };
    var semigroupUnit = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_27) {
                return function (_28) {
                    return Unit({});
                };
            }
        };
    };
    var semigroupString = function (_) {
        return {
            "__superclasses": {}, 
            "<>": concatString
        };
    };
    var semigroupArr = function (__dict_Semigroup_3) {
        return {
            "__superclasses": {}, 
            "<>": function (f) {
                return function (g) {
                    return function (x) {
                        return $less$greater(__dict_Semigroup_3)(f(x))(g(x));
                    };
                };
            }
        };
    };
    var pure = function (dict) {
        return dict.pure;
    };
    var $$return = function (__dict_Monad_4) {
        return pure(__dict_Monad_4["__superclasses"]["Prelude.Applicative_0"]({}));
    };
    var numNumber = function (_) {
        return {
            "__superclasses": {}, 
            "+": numAdd, 
            "-": numSub, 
            "*": numMul, 
            "/": numDiv, 
            "%": numMod, 
            negate: numNegate
        };
    };
    var not = function (dict) {
        return dict.not;
    };
    var negate = function (dict) {
        return dict.negate;
    };
    var liftM1 = function (__dict_Monad_5) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_5["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_0) {
                    return $$return(__dict_Monad_5)(f(_0));
                });
            };
        };
    };
    var liftA1 = function (__dict_Applicative_6) {
        return function (f) {
            return function (a) {
                return $less$times$greater(__dict_Applicative_6["__superclasses"]["Prelude.Apply_0"]({}))(pure(__dict_Applicative_6)(f))(a);
            };
        };
    };
    var id = function (dict) {
        return dict.id;
    };
    var functorArr = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": $less$less$less(semigroupoidArr({}))
        };
    };
    var flip = function (f) {
        return function (b) {
            return function (a) {
                return f(a)(b);
            };
        };
    };
    var eqUnit = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_14) {
                return function (_15) {
                    return true;
                };
            }, 
            "/=": function (_16) {
                return function (_17) {
                    return false;
                };
            }
        };
    };
    var ordUnit = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqUnit({});
                }
            }, 
            compare: function (_21) {
                return function (_22) {
                    return EQ;
                };
            }
        };
    };
    var eqString = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordString = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqString({});
                }
            }, 
            compare: unsafeCompare
        };
    };
    var eqNumber = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordNumber = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqNumber({});
                }
            }, 
            compare: unsafeCompare
        };
    };
    var eqBoolean = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordBoolean = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqBoolean({});
                }
            }, 
            compare: function (_23) {
                return function (_24) {
                    if (!_23) {
                        if (!_24) {
                            return EQ;
                        };
                    };
                    if (!_23) {
                        if (_24) {
                            return LT;
                        };
                    };
                    if (_23) {
                        if (_24) {
                            return EQ;
                        };
                    };
                    if (_23) {
                        if (!_24) {
                            return GT;
                        };
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var empty = function (dict) {
        return dict.empty;
    };
    var $$const = function (_8) {
        return function (_9) {
            return _8;
        };
    };
    var $$void = function (__dict_Functor_8) {
        return function (fa) {
            return $less$dollar$greater(__dict_Functor_8)($$const(unit))(fa);
        };
    };
    var complement = function (dict) {
        return dict.complement;
    };
    var compare = function (dict) {
        return dict.compare;
    };
    var $less = function (__dict_Ord_10) {
        return function (a1) {
            return function (a2) {
                return (function (_261) {
                    if (_261.ctor === "Prelude.LT") {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_10)(a1)(a2));
            };
        };
    };
    var $less$eq = function (__dict_Ord_11) {
        return function (a1) {
            return function (a2) {
                return (function (_262) {
                    if (_262.ctor === "Prelude.GT") {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_11)(a1)(a2));
            };
        };
    };
    var $greater = function (__dict_Ord_12) {
        return function (a1) {
            return function (a2) {
                return (function (_263) {
                    if (_263.ctor === "Prelude.GT") {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_12)(a1)(a2));
            };
        };
    };
    var $greater$eq = function (__dict_Ord_13) {
        return function (a1) {
            return function (a2) {
                return (function (_264) {
                    if (_264.ctor === "Prelude.LT") {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_13)(a1)(a2));
            };
        };
    };
    var categoryArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroupoid_0": function (_) {
                    return semigroupoidArr({});
                }
            }, 
            id: function (x) {
                return x;
            }
        };
    };
    var boolLikeBoolean = function (_) {
        return {
            "__superclasses": {}, 
            "&&": boolAnd, 
            "||": boolOr, 
            not: boolNot
        };
    };
    var eqArray = function (__dict_Eq_7) {
        return {
            "__superclasses": {}, 
            "==": function (xs) {
                return function (ys) {
                    return eqArrayImpl($eq$eq(__dict_Eq_7))(xs)(ys);
                };
            }, 
            "/=": function (xs) {
                return function (ys) {
                    return not(boolLikeBoolean({}))($eq$eq(eqArray(__dict_Eq_7))(xs)(ys));
                };
            }
        };
    };
    var ordArray = function (__dict_Ord_9) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqArray(__dict_Ord_9["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_25) {
                return function (_26) {
                    if (_25.length === 0) {
                        if (_26.length === 0) {
                            return EQ;
                        };
                    };
                    if (_25.length === 0) {
                        return LT;
                    };
                    if (_26.length === 0) {
                        return GT;
                    };
                    if (_25.length > 0) {
                        var _271 = _25.slice(1);
                        if (_26.length > 0) {
                            var _269 = _26.slice(1);
                            return (function (_267) {
                                if (_267.ctor === "Prelude.EQ") {
                                    return compare(ordArray(__dict_Ord_9))(_271)(_269);
                                };
                                return _267;
                            })(compare(__dict_Ord_9)(_25[0])(_26[0]));
                        };
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var eqOrdering = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_18) {
                return function (_19) {
                    if (_18.ctor === "Prelude.LT") {
                        if (_19.ctor === "Prelude.LT") {
                            return true;
                        };
                    };
                    if (_18.ctor === "Prelude.GT") {
                        if (_19.ctor === "Prelude.GT") {
                            return true;
                        };
                    };
                    if (_18.ctor === "Prelude.EQ") {
                        if (_19.ctor === "Prelude.EQ") {
                            return true;
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (x) {
                return function (y) {
                    return not(boolLikeBoolean({}))($eq$eq(eqOrdering({}))(x)(y));
                };
            }
        };
    };
    var bitsNumber = function (_) {
        return {
            "__superclasses": {}, 
            "&": numAnd, 
            "|": numOr, 
            "^": numXor, 
            shl: numShl, 
            shr: numShr, 
            zshr: numZshr, 
            complement: numComplement
        };
    };
    var asTypeOf = function (_10) {
        return function (_11) {
            return _10;
        };
    };
    var applyArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorArr({});
                }
            }, 
            "<*>": function (f) {
                return function (g) {
                    return function (x) {
                        return f(x)(g(x));
                    };
                };
            }
        };
    };
    var bindArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArr({});
                }
            }, 
            ">>=": function (m) {
                return function (f) {
                    return function (x) {
                        return f(m(x))(x);
                    };
                };
            }
        };
    };
    var applicativeArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArr({});
                }
            }, 
            pure: $$const
        };
    };
    var monadArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeArr({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindArr({});
                }
            }
        };
    };
    var ap = function (__dict_Monad_14) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_14["__superclasses"]["Prelude.Bind_1"]({}))(f)(function (_2) {
                    return $greater$greater$eq(__dict_Monad_14["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_1) {
                        return $$return(__dict_Monad_14)(_2(_1));
                    });
                });
            };
        };
    };
    return {
        Unit: Unit, 
        LT: LT, 
        GT: GT, 
        EQ: EQ, 
        unit: unit, 
        "++": $plus$plus, 
        "<>": $less$greater, 
        not: not, 
        "||": $bar$bar, 
        "&&": $amp$amp, 
        complement: complement, 
        zshr: zshr, 
        shr: shr, 
        shl: shl, 
        "^": $up, 
        "|": $bar, 
        "&": $amp, 
        ">=": $greater$eq, 
        "<=": $less$eq, 
        ">": $greater, 
        "<": $less, 
        compare: compare, 
        refIneq: refIneq, 
        refEq: refEq, 
        "/=": $div$eq, 
        "==": $eq$eq, 
        negate: negate, 
        "%": $percent, 
        "/": $div, 
        "*": $times, 
        "-": $minus, 
        "+": $plus, 
        ap: ap, 
        liftM1: liftM1, 
        "return": $$return, 
        ">>=": $greater$greater$eq, 
        "<|>": $less$bar$greater, 
        empty: empty, 
        liftA1: liftA1, 
        pure: pure, 
        "<*>": $less$times$greater, 
        "void": $$void, 
        "<$>": $less$dollar$greater, 
        show: show, 
        cons: cons, 
        ":": $colon, 
        "#": $hash, 
        "$": $dollar, 
        id: id, 
        ">>>": $greater$greater$greater, 
        "<<<": $less$less$less, 
        asTypeOf: asTypeOf, 
        "const": $$const, 
        flip: flip, 
        semigroupoidArr: semigroupoidArr, 
        categoryArr: categoryArr, 
        showUnit: showUnit, 
        showString: showString, 
        showBoolean: showBoolean, 
        showNumber: showNumber, 
        showArray: showArray, 
        functorArr: functorArr, 
        applyArr: applyArr, 
        applicativeArr: applicativeArr, 
        bindArr: bindArr, 
        monadArr: monadArr, 
        numNumber: numNumber, 
        eqUnit: eqUnit, 
        eqString: eqString, 
        eqNumber: eqNumber, 
        eqBoolean: eqBoolean, 
        eqArray: eqArray, 
        eqOrdering: eqOrdering, 
        showOrdering: showOrdering, 
        ordUnit: ordUnit, 
        ordBoolean: ordBoolean, 
        ordNumber: ordNumber, 
        ordString: ordString, 
        ordArray: ordArray, 
        bitsNumber: bitsNumber, 
        boolLikeBoolean: boolLikeBoolean, 
        semigroupUnit: semigroupUnit, 
        semigroupString: semigroupString, 
        semigroupArr: semigroupArr
    };
})();
var PS = PS || {};
PS.Prelude_Unsafe = (function () {
    "use strict";
    function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
    return {
        unsafeIndex: unsafeIndex
    };
})();
var PS = PS || {};
PS.Global = (function () {
    "use strict";
    var nan = NaN;;
    var infinity = Infinity;;
    function readInt(radix) {  return function(n) {    return parseInt(n, radix);  };};
    var readFloat = parseFloat;;
    function showErrorImpl(err) {  return err.stack ? err.stack : err.toString();};
    function error(msg) {  return new Error(msg);};;
    var showError = function (_) {
        return {
            "__superclasses": {}, 
            show: showErrorImpl
        };
    };
    return {
        error: error, 
        readFloat: readFloat, 
        readInt: readInt, 
        isFinite: isFinite, 
        infinity: infinity, 
        isNaN: isNaN, 
        nan: nan, 
        showError: showError
    };
})();
var PS = PS || {};
PS.Data_Maybe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Nothing = {
        ctor: "Data.Maybe.Nothing", 
        values: [  ]
    };
    var Just = function (value0) {
        return {
            ctor: "Data.Maybe.Just", 
            values: [ value0 ]
        };
    };
    var showMaybe = function (__dict_Show_15) {
        return {
            "__superclasses": {}, 
            show: function (_40) {
                if (_40.ctor === "Data.Maybe.Just") {
                    return "Just (" + Prelude.show(__dict_Show_15)(_40.values[0]) + ")";
                };
                if (_40.ctor === "Data.Maybe.Nothing") {
                    return "Nothing";
                };
                throw "Failed pattern match";
            }
        };
    };
    var maybe = function (_29) {
        return function (_30) {
            return function (_31) {
                if (_31.ctor === "Data.Maybe.Nothing") {
                    return _29;
                };
                if (_31.ctor === "Data.Maybe.Just") {
                    return _30(_31.values[0]);
                };
                throw "Failed pattern match";
            };
        };
    };
    var isNothing = maybe(true)(Prelude["const"](false));
    var isJust = maybe(false)(Prelude["const"](true));
    var functorMaybe = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_32) {
                return function (_33) {
                    if (_33.ctor === "Data.Maybe.Just") {
                        return Just(_32(_33.values[0]));
                    };
                    return Nothing;
                };
            }
        };
    };
    var fromMaybe = function (a) {
        return maybe(a)(Prelude.id(Prelude.categoryArr({})));
    };
    var eqMaybe = function (__dict_Eq_17) {
        return {
            "__superclasses": {}, 
            "==": function (_41) {
                return function (_42) {
                    if (_41.ctor === "Data.Maybe.Nothing") {
                        if (_42.ctor === "Data.Maybe.Nothing") {
                            return true;
                        };
                    };
                    if (_41.ctor === "Data.Maybe.Just") {
                        if (_42.ctor === "Data.Maybe.Just") {
                            return Prelude["=="](__dict_Eq_17)(_41.values[0])(_42.values[0]);
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (a) {
                return function (b) {
                    return !Prelude["=="](eqMaybe(__dict_Eq_17))(a)(b);
                };
            }
        };
    };
    var ordMaybe = function (__dict_Ord_16) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqMaybe(__dict_Ord_16["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_43) {
                return function (_44) {
                    if (_43.ctor === "Data.Maybe.Just") {
                        if (_44.ctor === "Data.Maybe.Just") {
                            return Prelude.compare(__dict_Ord_16)(_43.values[0])(_44.values[0]);
                        };
                    };
                    if (_43.ctor === "Data.Maybe.Nothing") {
                        if (_44.ctor === "Data.Maybe.Nothing") {
                            return Prelude.EQ;
                        };
                    };
                    if (_43.ctor === "Data.Maybe.Nothing") {
                        return Prelude.LT;
                    };
                    if (_44.ctor === "Data.Maybe.Nothing") {
                        return Prelude.GT;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var applyMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorMaybe({});
                }
            }, 
            "<*>": function (_34) {
                return function (_35) {
                    if (_34.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"](functorMaybe({}))(_34.values[0])(_35);
                    };
                    if (_34.ctor === "Data.Maybe.Nothing") {
                        return Nothing;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var bindMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyMaybe({});
                }
            }, 
            ">>=": function (_38) {
                return function (_39) {
                    if (_38.ctor === "Data.Maybe.Just") {
                        return _39(_38.values[0]);
                    };
                    if (_38.ctor === "Data.Maybe.Nothing") {
                        return Nothing;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var applicativeMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyMaybe({});
                }
            }, 
            pure: Just
        };
    };
    var monadMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeMaybe({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindMaybe({});
                }
            }
        };
    };
    var alternativeMaybe = function (_) {
        return {
            "__superclasses": {}, 
            empty: Nothing, 
            "<|>": function (_36) {
                return function (_37) {
                    if (_36.ctor === "Data.Maybe.Nothing") {
                        return _37;
                    };
                    return _36;
                };
            }
        };
    };
    return {
        Nothing: Nothing, 
        Just: Just, 
        isNothing: isNothing, 
        isJust: isJust, 
        fromMaybe: fromMaybe, 
        maybe: maybe, 
        functorMaybe: functorMaybe, 
        applyMaybe: applyMaybe, 
        applicativeMaybe: applicativeMaybe, 
        alternativeMaybe: alternativeMaybe, 
        bindMaybe: bindMaybe, 
        monadMaybe: monadMaybe, 
        showMaybe: showMaybe, 
        eqMaybe: eqMaybe, 
        ordMaybe: ordMaybe
    };
})();
var PS = PS || {};
PS.Data_Maybe_Unsafe = (function () {
    "use strict";
    var fromJust = function (_45) {
        if (_45.ctor === "Data.Maybe.Just") {
            return _45.values[0];
        };
        throw "Failed pattern match";
    };
    return {
        fromJust: fromJust
    };
})();
var PS = PS || {};
PS.Data_Function = (function () {
    "use strict";
    function mkFn0(f) {  return function() {    return f({});  };};
    function mkFn1(f) {  return function(a) {    return f(a);  };};
    function mkFn2(f) {  return function(a, b) {    return f(a)(b);  };};
    function mkFn3(f) {  return function(a, b, c) {    return f(a)(b)(c);  };};
    function mkFn4(f) {  return function(a, b, c, d) {    return f(a)(b)(c)(d);  };};
    function mkFn5(f) {  return function(a, b, c, d, e) {    return f(a)(b)(c)(d)(e);  };};
    function runFn0(f) {  return f();};
    function runFn1(f) {  return function(a) {    return f(a);  };};
    function runFn2(f) {  return function(a) {    return function(b) {      return f(a, b);    };  };};
    function runFn3(f) {  return function(a) {    return function(b) {      return function(c) {        return f(a, b, c);      };    };  };};
    function runFn4(f) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return f(a, b, c, d);        };      };    };  };};
    function runFn5(f) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return f(a, b, c, d, e);          };        };      };    };  };};
    var on = function (f) {
        return function (g) {
            return function (x) {
                return function (y) {
                    return f(g(x))(g(y));
                };
            };
        };
    };
    return {
        runFn5: runFn5, 
        runFn4: runFn4, 
        runFn3: runFn3, 
        runFn2: runFn2, 
        runFn1: runFn1, 
        runFn0: runFn0, 
        mkFn5: mkFn5, 
        mkFn4: mkFn4, 
        mkFn3: mkFn3, 
        mkFn2: mkFn2, 
        mkFn1: mkFn1, 
        mkFn0: mkFn0, 
        on: on
    };
})();
var PS = PS || {};
PS.Data_Eq = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Ref = function (value0) {
        return {
            ctor: "Data.Eq.Ref", 
            values: [ value0 ]
        };
    };
    var liftRef = function (_46) {
        return function (_47) {
            return function (_48) {
                return _46(_47.values[0])(_48.values[0]);
            };
        };
    };
    var eqRef = function (_) {
        return {
            "__superclasses": {}, 
            "==": liftRef(Prelude.refEq), 
            "/=": liftRef(Prelude.refIneq)
        };
    };
    return {
        Ref: Ref, 
        liftRef: liftRef, 
        eqRef: eqRef
    };
})();
var PS = PS || {};
PS.Data_Either = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Left = function (value0) {
        return {
            ctor: "Data.Either.Left", 
            values: [ value0 ]
        };
    };
    var Right = function (value0) {
        return {
            ctor: "Data.Either.Right", 
            values: [ value0 ]
        };
    };
    var showEither = function (__dict_Show_18) {
        return function (__dict_Show_19) {
            return {
                "__superclasses": {}, 
                show: function (_56) {
                    if (_56.ctor === "Data.Either.Left") {
                        return "Left (" + Prelude.show(__dict_Show_18)(_56.values[0]) + ")";
                    };
                    if (_56.ctor === "Data.Either.Right") {
                        return "Right (" + Prelude.show(__dict_Show_19)(_56.values[0]) + ")";
                    };
                    throw "Failed pattern match";
                }
            };
        };
    };
    var functorEither = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_52) {
                return function (_53) {
                    if (_53.ctor === "Data.Either.Left") {
                        return Left(_53.values[0]);
                    };
                    if (_53.ctor === "Data.Either.Right") {
                        return Right(_52(_53.values[0]));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var eqEither = function (__dict_Eq_22) {
        return function (__dict_Eq_23) {
            return {
                "__superclasses": {}, 
                "==": function (_57) {
                    return function (_58) {
                        if (_57.ctor === "Data.Either.Left") {
                            if (_58.ctor === "Data.Either.Left") {
                                return Prelude["=="](__dict_Eq_22)(_57.values[0])(_58.values[0]);
                            };
                        };
                        if (_57.ctor === "Data.Either.Right") {
                            if (_58.ctor === "Data.Either.Right") {
                                return Prelude["=="](__dict_Eq_23)(_57.values[0])(_58.values[0]);
                            };
                        };
                        return false;
                    };
                }, 
                "/=": function (a) {
                    return function (b) {
                        return !Prelude["=="](eqEither(__dict_Eq_22)(__dict_Eq_23))(a)(b);
                    };
                }
            };
        };
    };
    var ordEither = function (__dict_Ord_20) {
        return function (__dict_Ord_21) {
            return {
                "__superclasses": {
                    "Prelude.Eq_0": function (_) {
                        return eqEither(__dict_Ord_20["__superclasses"]["Prelude.Eq_0"]({}))(__dict_Ord_21["__superclasses"]["Prelude.Eq_0"]({}));
                    }
                }, 
                compare: function (_59) {
                    return function (_60) {
                        if (_59.ctor === "Data.Either.Left") {
                            if (_60.ctor === "Data.Either.Left") {
                                return Prelude.compare(__dict_Ord_20)(_59.values[0])(_60.values[0]);
                            };
                        };
                        if (_59.ctor === "Data.Either.Right") {
                            if (_60.ctor === "Data.Either.Right") {
                                return Prelude.compare(__dict_Ord_21)(_59.values[0])(_60.values[0]);
                            };
                        };
                        if (_59.ctor === "Data.Either.Left") {
                            return Prelude.LT;
                        };
                        if (_60.ctor === "Data.Either.Left") {
                            return Prelude.GT;
                        };
                        throw "Failed pattern match";
                    };
                }
            };
        };
    };
    var either = function (_49) {
        return function (_50) {
            return function (_51) {
                if (_51.ctor === "Data.Either.Left") {
                    return _49(_51.values[0]);
                };
                if (_51.ctor === "Data.Either.Right") {
                    return _50(_51.values[0]);
                };
                throw "Failed pattern match";
            };
        };
    };
    var isLeft = either(Prelude["const"](true))(Prelude["const"](false));
    var isRight = either(Prelude["const"](false))(Prelude["const"](true));
    var applyEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorEither({});
                }
            }, 
            "<*>": function (_54) {
                return function (_55) {
                    if (_54.ctor === "Data.Either.Left") {
                        return Left(_54.values[0]);
                    };
                    if (_54.ctor === "Data.Either.Right") {
                        return Prelude["<$>"](functorEither({}))(_54.values[0])(_55);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var bindEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEither({});
                }
            }, 
            ">>=": either(function (e) {
                return function (_) {
                    return Left(e);
                };
            })(function (a) {
                return function (f) {
                    return f(a);
                };
            })
        };
    };
    var applicativeEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEither({});
                }
            }, 
            pure: Right
        };
    };
    var monadEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeEither({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindEither({});
                }
            }
        };
    };
    return {
        Left: Left, 
        Right: Right, 
        isRight: isRight, 
        isLeft: isLeft, 
        either: either, 
        functorEither: functorEither, 
        applyEither: applyEither, 
        applicativeEither: applicativeEither, 
        bindEither: bindEither, 
        monadEither: monadEither, 
        showEither: showEither, 
        eqEither: eqEither, 
        ordEither: ordEither
    };
})();
var PS = PS || {};
PS.Data_Array = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    function snoc(l) {  return function (e) {    var l1 = l.slice();    l1.push(e);     return l1;  };};
    function length (xs) {  return xs.length;};
    function findIndex (f) {  return function (arr) {    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        return i;      }    }    return -1;  };};
    function findLastIndex (f) {  return function (arr) {    for (var i = arr.length - 1; i >= 0; i--) {      if (f(arr[i])) {        return i;      }    }    return -1;  };};
    function append (l1) {  return function (l2) {    return l1.concat(l2);  };};
    function concat (xss) {  var result = [];  for (var i = 0, l = xss.length; i < l; i++) {    result.push.apply(result, xss[i]);  }  return result;};
    function reverse (l) {  return l.slice().reverse();};
    function drop (n) {  return function (l) {    return l.slice(n);  };};
    function slice (s) {  return function (e) {    return function (l) {      return l.slice(s, e);    };  };};
    function insertAt (index) {  return function (a) {    return function (l) {      var l1 = l.slice();      l1.splice(index, 0, a);      return l1;    };   };};
    function deleteAt (index) {  return function (n) {    return function (l) {      var l1 = l.slice();      l1.splice(index, n);      return l1;    };   };};
    function updateAt (index) {  return function (a) {    return function (l) {      var i = ~~index;      if (i < 0 || i >= l.length) return l;      var l1 = l.slice();      l1[i] = a;      return l1;    };   };};
    function concatMap (f) {  return function (arr) {    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      Array.prototype.push.apply(result, f(arr[i]));    }    return result;  };};
    function map (f) {  return function (arr) {    var l = arr.length;    var result = new Array(l);    for (var i = 0; i < l; i++) {      result[i] = f(arr[i]);    }    return result;  };};
    function filter (f) {  return function (arr) {    var n = 0;    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        result[n++] = arr[i];      }    }    return result;  };};
    function range (start) {  return function (end) {    var i = ~~start, e = ~~end;    var step = i > e ? -1 : 1;    var result = [i], n = 1;    while (i !== e) {      i += step;      result[n++] = i;    }    return result;  };};
    function zipWith (f) {  return function (xs) {    return function (ys) {      var l = xs.length < ys.length ? xs.length : ys.length;      var result = new Array(l);      for (var i = 0; i < l; i++) {        result[i] = f(xs[i])(ys[i]);      }      return result;    };  };};
    function sortJS (f) {  return function (l) {    return l.slice().sort(function (x, y) {      return f(x)(y);    });  };};
    var $bang$bang = function (xs) {
        return function (n) {
            var isInt = function (n) {
                return n !== ~~n;
            };
            return n < 0 || n >= length(xs) || isInt(n) ? Data_Maybe.Nothing : Data_Maybe.Just(xs[n]);
        };
    };
    var take = function (n) {
        return slice(0)(n);
    };
    var tail = function (_63) {
        if (_63.length > 0) {
            var _342 = _63.slice(1);
            return Data_Maybe.Just(_342);
        };
        return Data_Maybe.Nothing;
    };
    var span = (function () {
        var go = function (__copy__79) {
            return function (__copy__80) {
                return function (__copy__81) {
                    var _79 = __copy__79;
                    var _80 = __copy__80;
                    var _81 = __copy__81;
                    tco: while (true) {
                        var acc = _79;
                        if (_81.length > 0) {
                            var _347 = _81.slice(1);
                            if (_80(_81[0])) {
                                var __tco__79 = Prelude[":"](_81[0])(acc);
                                var __tco__80 = _80;
                                _79 = __tco__79;
                                _80 = __tco__80;
                                _81 = _347;
                                continue tco;
                            };
                        };
                        return {
                            init: reverse(_79), 
                            rest: _81
                        };
                    };
                };
            };
        };
        return go([  ]);
    })();
    var sortBy = function (comp) {
        return function (xs) {
            var comp$prime = function (x) {
                return function (y) {
                    return (function (_348) {
                        if (_348.ctor === "Prelude.GT") {
                            return 1;
                        };
                        if (_348.ctor === "Prelude.EQ") {
                            return 0;
                        };
                        if (_348.ctor === "Prelude.LT") {
                            return -1;
                        };
                        throw "Failed pattern match";
                    })(comp(x)(y));
                };
            };
            return sortJS(comp$prime)(xs);
        };
    };
    var sort = function (__dict_Ord_24) {
        return function (xs) {
            return sortBy(Prelude.compare(__dict_Ord_24))(xs);
        };
    };
    var singleton = function (a) {
        return [ a ];
    };
    var semigroupArray = function (_) {
        return {
            "__superclasses": {}, 
            "<>": append
        };
    };
    var $$null = function (_65) {
        if (_65.length === 0) {
            return true;
        };
        return false;
    };
    var nubBy = function (_72) {
        return function (_73) {
            if (_73.length === 0) {
                return [  ];
            };
            if (_73.length > 0) {
                var _353 = _73.slice(1);
                return Prelude[":"](_73[0])(nubBy(_72)(filter(function (y) {
                    return !_72(_73[0])(y);
                })(_353)));
            };
            throw "Failed pattern match";
        };
    };
    var nub = function (__dict_Eq_25) {
        return nubBy(Prelude["=="](__dict_Eq_25));
    };
    var mapMaybe = function (f) {
        return concatMap(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe.maybe([  ])(singleton))(f));
    };
    var last = function (__copy__62) {
        var _62 = __copy__62;
        tco: while (true) {
            if (_62.length > 0) {
                var _356 = _62.slice(1);
                if (_356.length === 0) {
                    return Data_Maybe.Just(_62[0]);
                };
            };
            if (_62.length > 0) {
                var _358 = _62.slice(1);
                _62 = _358;
                continue tco;
            };
            return Data_Maybe.Nothing;
        };
    };
    var intersectBy = function (_69) {
        return function (_70) {
            return function (_71) {
                if (_70.length === 0) {
                    return [  ];
                };
                if (_71.length === 0) {
                    return [  ];
                };
                var el = function (x) {
                    return findIndex(_69(x))(_71) >= 0;
                };
                return filter(el)(_70);
            };
        };
    };
    var intersect = function (__dict_Eq_26) {
        return intersectBy(Prelude["=="](__dict_Eq_26));
    };
    var init = function (_64) {
        if (_64.length === 0) {
            return Data_Maybe.Nothing;
        };
        return Data_Maybe.Just(slice(0)(length(_64) - 1)(_64));
    };
    var head = function (_61) {
        if (_61.length > 0) {
            var _365 = _61.slice(1);
            return Data_Maybe.Just(_61[0]);
        };
        return Data_Maybe.Nothing;
    };
    var groupBy = (function () {
        var go = function (__copy__76) {
            return function (__copy__77) {
                return function (__copy__78) {
                    var _76 = __copy__76;
                    var _77 = __copy__77;
                    var _78 = __copy__78;
                    tco: while (true) {
                        var acc = _76;
                        if (_78.length === 0) {
                            return reverse(acc);
                        };
                        if (_78.length > 0) {
                            var _370 = _78.slice(1);
                            var sp = span(_77(_78[0]))(_370);
                            var __tco__76 = Prelude[":"](Prelude[":"](_78[0])(sp.init))(_76);
                            var __tco__77 = _77;
                            _76 = __tco__76;
                            _77 = __tco__77;
                            _78 = sp.rest;
                            continue tco;
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        return go([  ]);
    })();
    var group = function (__dict_Eq_27) {
        return function (xs) {
            return groupBy(Prelude["=="](__dict_Eq_27))(xs);
        };
    };
    var group$prime = function (__dict_Ord_28) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(group(__dict_Ord_28["__superclasses"]["Prelude.Eq_0"]({})))(sort(__dict_Ord_28));
    };
    var functorArray = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": map
        };
    };
    var elemLastIndex = function (__dict_Eq_29) {
        return function (x) {
            return findLastIndex(Prelude["=="](__dict_Eq_29)(x));
        };
    };
    var elemIndex = function (__dict_Eq_30) {
        return function (x) {
            return findIndex(Prelude["=="](__dict_Eq_30)(x));
        };
    };
    var deleteBy = function (_66) {
        return function (_67) {
            return function (_68) {
                if (_68.length === 0) {
                    return [  ];
                };
                return (function (_374) {
                    if (_374 < 0) {
                        return _68;
                    };
                    return deleteAt(_374)(1)(_68);
                })(findIndex(_66(_67))(_68));
            };
        };
    };
    var $$delete = function (__dict_Eq_31) {
        return deleteBy(Prelude["=="](__dict_Eq_31));
    };
    var $bslash$bslash = function (__dict_Eq_32) {
        return function (xs) {
            return function (ys) {
                var go = function (__copy__74) {
                    return function (__copy__75) {
                        var _74 = __copy__74;
                        var _75 = __copy__75;
                        tco: while (true) {
                            var xs = _74;
                            if (_75.length === 0) {
                                return xs;
                            };
                            if (_74.length === 0) {
                                return [  ];
                            };
                            if (_75.length > 0) {
                                var _378 = _75.slice(1);
                                var __tco__74 = $$delete(__dict_Eq_32)(_75[0])(_74);
                                _74 = __tco__74;
                                _75 = _378;
                                continue tco;
                            };
                            throw "Failed pattern match";
                        };
                    };
                };
                return go(xs)(ys);
            };
        };
    };
    var catMaybes = concatMap(Data_Maybe.maybe([  ])(singleton));
    var applicativeArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArray({});
                }
            }, 
            pure: singleton
        };
    };
    var applyArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorArray({});
                }
            }, 
            "<*>": Prelude.ap(monadArray({}))
        };
    };
    var monadArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeArray({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindArray({});
                }
            }
        };
    };
    var bindArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArray({});
                }
            }, 
            ">>=": Prelude.flip(concatMap)
        };
    };
    var alternativeArray = function (_) {
        return {
            "__superclasses": {}, 
            empty: [  ], 
            "<|>": append
        };
    };
    return {
        span: span, 
        groupBy: groupBy, 
        "group'": group$prime, 
        group: group, 
        sortBy: sortBy, 
        sort: sort, 
        nubBy: nubBy, 
        nub: nub, 
        zipWith: zipWith, 
        range: range, 
        filter: filter, 
        concatMap: concatMap, 
        intersect: intersect, 
        intersectBy: intersectBy, 
        "\\\\": $bslash$bslash, 
        "delete": $$delete, 
        deleteBy: deleteBy, 
        updateAt: updateAt, 
        deleteAt: deleteAt, 
        insertAt: insertAt, 
        take: take, 
        drop: drop, 
        reverse: reverse, 
        concat: concat, 
        append: append, 
        elemLastIndex: elemLastIndex, 
        elemIndex: elemIndex, 
        findLastIndex: findLastIndex, 
        findIndex: findIndex, 
        length: length, 
        catMaybes: catMaybes, 
        mapMaybe: mapMaybe, 
        map: map, 
        "null": $$null, 
        init: init, 
        tail: tail, 
        last: last, 
        head: head, 
        singleton: singleton, 
        snoc: snoc, 
        "!!": $bang$bang, 
        functorArray: functorArray, 
        applyArray: applyArray, 
        applicativeArray: applicativeArray, 
        bindArray: bindArray, 
        monadArray: monadArray, 
        semigroupArray: semigroupArray, 
        alternativeArray: alternativeArray
    };
})();
var PS = PS || {};
PS.Data_Array_Unsafe = (function () {
    "use strict";
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var tail = function (_83) {
        if (_83.length > 0) {
            var _381 = _83.slice(1);
            return _381;
        };
        throw "Failed pattern match";
    };
    var last = function (xs) {
        return xs[Data_Array.length(xs) - 1];
    };
    var init = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Data_Array.init);
    var head = function (_82) {
        if (_82.length > 0) {
            var _384 = _82.slice(1);
            return _82[0];
        };
        throw "Failed pattern match";
    };
    return {
        init: init, 
        last: last, 
        tail: tail, 
        head: head
    };
})();
var PS = PS || {};
PS.Data_Monoid = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var monoidUnit = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Prelude.semigroupUnit({});
                }
            }, 
            mempty: Prelude.unit
        };
    };
    var monoidString = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Prelude.semigroupString({});
                }
            }, 
            mempty: ""
        };
    };
    var monoidArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Data_Array.semigroupArray({});
                }
            }, 
            mempty: [  ]
        };
    };
    var mempty = function (dict) {
        return dict.mempty;
    };
    return {
        mempty: mempty, 
        monoidString: monoidString, 
        monoidArray: monoidArray, 
        monoidUnit: monoidUnit
    };
})();
var PS = PS || {};
PS.Data_Monoid_All = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var All = function (value0) {
        return {
            ctor: "Data.Monoid.All.All", 
            values: [ value0 ]
        };
    };
    var showAll = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_89) {
                return "All (" + Prelude.show(Prelude.showBoolean({}))(_89.values[0]) + ")";
            }
        };
    };
    var semigroupAll = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_90) {
                return function (_91) {
                    return All(_90.values[0] && _91.values[0]);
                };
            }
        };
    };
    var runAll = function (_84) {
        return _84.values[0];
    };
    var monoidAll = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupAll({});
                }
            }, 
            mempty: All(true)
        };
    };
    var eqAll = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_85) {
                return function (_86) {
                    return _85.values[0] === _86.values[0];
                };
            }, 
            "/=": function (_87) {
                return function (_88) {
                    return _87.values[0] !== _88.values[0];
                };
            }
        };
    };
    return {
        All: All, 
        runAll: runAll, 
        eqAll: eqAll, 
        showAll: showAll, 
        semigroupAll: semigroupAll, 
        monoidAll: monoidAll
    };
})();
var PS = PS || {};
PS.Data_Monoid_Any = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Any = function (value0) {
        return {
            ctor: "Data.Monoid.Any.Any", 
            values: [ value0 ]
        };
    };
    var showAny = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_97) {
                return "Any (" + Prelude.show(Prelude.showBoolean({}))(_97.values[0]) + ")";
            }
        };
    };
    var semigroupAny = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_98) {
                return function (_99) {
                    return Any(_98.values[0] || _99.values[0]);
                };
            }
        };
    };
    var runAny = function (_92) {
        return _92.values[0];
    };
    var monoidAny = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupAny({});
                }
            }, 
            mempty: Any(false)
        };
    };
    var eqAny = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_93) {
                return function (_94) {
                    return _93.values[0] === _94.values[0];
                };
            }, 
            "/=": function (_95) {
                return function (_96) {
                    return _95.values[0] !== _96.values[0];
                };
            }
        };
    };
    return {
        Any: Any, 
        runAny: runAny, 
        eqAny: eqAny, 
        showAny: showAny, 
        semigroupAny: semigroupAny, 
        monoidAny: monoidAny
    };
})();
var PS = PS || {};
PS.Data_Monoid_Dual = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Dual = function (value0) {
        return {
            ctor: "Data.Monoid.Dual.Dual", 
            values: [ value0 ]
        };
    };
    var showDual = function (__dict_Show_33) {
        return {
            "__superclasses": {}, 
            show: function (_107) {
                return "Dual (" + Prelude.show(__dict_Show_33)(_107.values[0]) + ")";
            }
        };
    };
    var semigroupDual = function (__dict_Semigroup_34) {
        return {
            "__superclasses": {}, 
            "<>": function (_108) {
                return function (_109) {
                    return Dual(Prelude["<>"](__dict_Semigroup_34)(_109.values[0])(_108.values[0]));
                };
            }
        };
    };
    var runDual = function (_100) {
        return _100.values[0];
    };
    var monoidDual = function (__dict_Monoid_36) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupDual(__dict_Monoid_36["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }, 
            mempty: Dual(Data_Monoid.mempty(__dict_Monoid_36))
        };
    };
    var eqDual = function (__dict_Eq_37) {
        return {
            "__superclasses": {}, 
            "==": function (_101) {
                return function (_102) {
                    return Prelude["=="](__dict_Eq_37)(_101.values[0])(_102.values[0]);
                };
            }, 
            "/=": function (_103) {
                return function (_104) {
                    return Prelude["/="](__dict_Eq_37)(_103.values[0])(_104.values[0]);
                };
            }
        };
    };
    var ordDual = function (__dict_Ord_35) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqDual(__dict_Ord_35["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_105) {
                return function (_106) {
                    return Prelude.compare(__dict_Ord_35)(_105.values[0])(_106.values[0]);
                };
            }
        };
    };
    return {
        Dual: Dual, 
        runDual: runDual, 
        eqDual: eqDual, 
        ordDual: ordDual, 
        showDual: showDual, 
        semigroupDual: semigroupDual, 
        monoidDual: monoidDual
    };
})();
var PS = PS || {};
PS.Data_Monoid_Endo = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Endo = function (value0) {
        return {
            ctor: "Data.Monoid.Endo.Endo", 
            values: [ value0 ]
        };
    };
    var semigroupEndo = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_111) {
                return function (_112) {
                    return Endo(Prelude["<<<"](Prelude.semigroupoidArr({}))(_111.values[0])(_112.values[0]));
                };
            }
        };
    };
    var runEndo = function (_110) {
        return _110.values[0];
    };
    var monoidEndo = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupEndo({});
                }
            }, 
            mempty: Endo(Prelude.id(Prelude.categoryArr({})))
        };
    };
    return {
        Endo: Endo, 
        runEndo: runEndo, 
        semigroupEndo: semigroupEndo, 
        monoidEndo: monoidEndo
    };
})();
var PS = PS || {};
PS.Data_Monoid_First = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var First = function (value0) {
        return {
            ctor: "Data.Monoid.First.First", 
            values: [ value0 ]
        };
    };
    var showFirst = function (__dict_Show_38) {
        return {
            "__superclasses": {}, 
            show: function (_120) {
                return "First (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_38))(_120.values[0]) + ")";
            }
        };
    };
    var semigroupFirst = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_121) {
                return function (_122) {
                    if ((_121.values[0]).ctor === "Data.Maybe.Just") {
                        return _121;
                    };
                    return _122;
                };
            }
        };
    };
    var runFirst = function (_113) {
        return _113.values[0];
    };
    var monoidFirst = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupFirst({});
                }
            }, 
            mempty: First(Data_Maybe.Nothing)
        };
    };
    var eqFirst = function (__dict_Eq_40) {
        return {
            "__superclasses": {}, 
            "==": function (_114) {
                return function (_115) {
                    return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_40))(_114.values[0])(_115.values[0]);
                };
            }, 
            "/=": function (_116) {
                return function (_117) {
                    return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_40))(_116.values[0])(_117.values[0]);
                };
            }
        };
    };
    var ordFirst = function (__dict_Ord_39) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqFirst(__dict_Ord_39["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_118) {
                return function (_119) {
                    return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_39))(_118.values[0])(_119.values[0]);
                };
            }
        };
    };
    return {
        First: First, 
        runFirst: runFirst, 
        eqFirst: eqFirst, 
        ordFirst: ordFirst, 
        showFirst: showFirst, 
        semigroupFirst: semigroupFirst, 
        monoidFirst: monoidFirst
    };
})();
var PS = PS || {};
PS.Data_Monoid_Last = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Last = function (value0) {
        return {
            ctor: "Data.Monoid.Last.Last", 
            values: [ value0 ]
        };
    };
    var showLast = function (__dict_Show_41) {
        return {
            "__superclasses": {}, 
            show: function (_130) {
                return "Last (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_41))(_130.values[0]) + ")";
            }
        };
    };
    var semigroupLast = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_131) {
                return function (_132) {
                    if ((_132.values[0]).ctor === "Data.Maybe.Just") {
                        return _132;
                    };
                    if ((_132.values[0]).ctor === "Data.Maybe.Nothing") {
                        return _131;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var runLast = function (_123) {
        return _123.values[0];
    };
    var monoidLast = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupLast({});
                }
            }, 
            mempty: Last(Data_Maybe.Nothing)
        };
    };
    var eqLast = function (__dict_Eq_43) {
        return {
            "__superclasses": {}, 
            "==": function (_124) {
                return function (_125) {
                    return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_43))(_124.values[0])(_125.values[0]);
                };
            }, 
            "/=": function (_126) {
                return function (_127) {
                    return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_43))(_126.values[0])(_127.values[0]);
                };
            }
        };
    };
    var ordLast = function (__dict_Ord_42) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqLast(__dict_Ord_42["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_128) {
                return function (_129) {
                    return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_42))(_128.values[0])(_129.values[0]);
                };
            }
        };
    };
    return {
        Last: Last, 
        runLast: runLast, 
        eqLast: eqLast, 
        ordLast: ordLast, 
        showLast: showLast, 
        semigroupLast: semigroupLast, 
        monoidLast: monoidLast
    };
})();
var PS = PS || {};
PS.Data_Monoid_Product = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Product = function (value0) {
        return {
            ctor: "Data.Monoid.Product.Product", 
            values: [ value0 ]
        };
    };
    var showProduct = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_140) {
                return "Product (" + Prelude.show(Prelude.showNumber({}))(_140.values[0]) + ")";
            }
        };
    };
    var semigroupProduct = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_141) {
                return function (_142) {
                    return Product(_141.values[0] * _142.values[0]);
                };
            }
        };
    };
    var runProduct = function (_133) {
        return _133.values[0];
    };
    var monoidProduct = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupProduct({});
                }
            }, 
            mempty: Product(1)
        };
    };
    var eqProduct = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_134) {
                return function (_135) {
                    return _134.values[0] === _135.values[0];
                };
            }, 
            "/=": function (_136) {
                return function (_137) {
                    return _136.values[0] !== _137.values[0];
                };
            }
        };
    };
    var ordProduct = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqProduct({});
                }
            }, 
            compare: function (_138) {
                return function (_139) {
                    return Prelude.compare(Prelude.ordNumber({}))(_138.values[0])(_139.values[0]);
                };
            }
        };
    };
    return {
        Product: Product, 
        runProduct: runProduct, 
        eqProduct: eqProduct, 
        ordProduct: ordProduct, 
        showProduct: showProduct, 
        semigroupProduct: semigroupProduct, 
        monoidProduct: monoidProduct
    };
})();
var PS = PS || {};
PS.Data_Monoid_Sum = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Sum = function (value0) {
        return {
            ctor: "Data.Monoid.Sum.Sum", 
            values: [ value0 ]
        };
    };
    var showSum = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_150) {
                return "Sum (" + Prelude.show(Prelude.showNumber({}))(_150.values[0]) + ")";
            }
        };
    };
    var semigroupSum = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_151) {
                return function (_152) {
                    return Sum(_151.values[0] + _152.values[0]);
                };
            }
        };
    };
    var runSum = function (_143) {
        return _143.values[0];
    };
    var monoidSum = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupSum({});
                }
            }, 
            mempty: Sum(0)
        };
    };
    var eqSum = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_144) {
                return function (_145) {
                    return _144.values[0] === _145.values[0];
                };
            }, 
            "/=": function (_146) {
                return function (_147) {
                    return _146.values[0] !== _147.values[0];
                };
            }
        };
    };
    var ordSum = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqSum({});
                }
            }, 
            compare: function (_148) {
                return function (_149) {
                    return Prelude.compare(Prelude.ordNumber({}))(_148.values[0])(_149.values[0]);
                };
            }
        };
    };
    return {
        Sum: Sum, 
        runSum: runSum, 
        eqSum: eqSum, 
        ordSum: ordSum, 
        showSum: showSum, 
        semigroupSum: semigroupSum, 
        monoidSum: monoidSum
    };
})();
var PS = PS || {};
PS.Data_Tuple = (function () {
    "use strict";
    var Data_Array = PS.Data_Array;
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Tuple = function (value0) {
        return function (value1) {
            return {
                ctor: "Data.Tuple.Tuple", 
                values: [ value0, value1 ]
            };
        };
    };
    var zip = Data_Array.zipWith(Tuple);
    var unzip = function (_157) {
        if (_157.length > 0) {
            var _529 = _157.slice(1);
            return (function (_525) {
                return Tuple(Prelude[":"]((_157[0]).values[0])(_525.values[0]))(Prelude[":"]((_157[0]).values[1])(_525.values[1]));
            })(unzip(_529));
        };
        if (_157.length === 0) {
            return Tuple([  ])([  ]);
        };
        throw "Failed pattern match";
    };
    var uncurry = function (_155) {
        return function (_156) {
            return _155(_156.values[0])(_156.values[1]);
        };
    };
    var swap = function (_158) {
        return Tuple(_158.values[1])(_158.values[0]);
    };
    var snd = function (_154) {
        return _154.values[1];
    };
    var showTuple = function (__dict_Show_44) {
        return function (__dict_Show_45) {
            return {
                "__superclasses": {}, 
                show: function (_159) {
                    return "Tuple (" + Prelude.show(__dict_Show_44)(_159.values[0]) + ") (" + Prelude.show(__dict_Show_45)(_159.values[1]) + ")";
                }
            };
        };
    };
    var functorTuple = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_164) {
                return function (_165) {
                    return Tuple(_165.values[0])(_164(_165.values[1]));
                };
            }
        };
    };
    var fst = function (_153) {
        return _153.values[0];
    };
    var eqTuple = function (__dict_Eq_49) {
        return function (__dict_Eq_50) {
            return {
                "__superclasses": {}, 
                "==": function (_160) {
                    return function (_161) {
                        return Prelude["=="](__dict_Eq_49)(_160.values[0])(_161.values[0]) && Prelude["=="](__dict_Eq_50)(_160.values[1])(_161.values[1]);
                    };
                }, 
                "/=": function (t1) {
                    return function (t2) {
                        return !Prelude["=="](eqTuple(__dict_Eq_49)(__dict_Eq_50))(t1)(t2);
                    };
                }
            };
        };
    };
    var ordTuple = function (__dict_Ord_46) {
        return function (__dict_Ord_47) {
            return {
                "__superclasses": {
                    "Prelude.Eq_0": function (_) {
                        return eqTuple(__dict_Ord_46["__superclasses"]["Prelude.Eq_0"]({}))(__dict_Ord_47["__superclasses"]["Prelude.Eq_0"]({}));
                    }
                }, 
                compare: function (_162) {
                    return function (_163) {
                        return (function (_560) {
                            if (_560.ctor === "Prelude.EQ") {
                                return Prelude.compare(__dict_Ord_47)(_162.values[1])(_163.values[1]);
                            };
                            return _560;
                        })(Prelude.compare(__dict_Ord_46)(_162.values[0])(_163.values[0]));
                    };
                }
            };
        };
    };
    var curry = function (f) {
        return function (a) {
            return function (b) {
                return f(Tuple(a)(b));
            };
        };
    };
    var applyTuple = function (__dict_Semigroup_52) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorTuple({});
                }
            }, 
            "<*>": function (_166) {
                return function (_167) {
                    return Tuple(Prelude["<>"](__dict_Semigroup_52)(_166.values[0])(_167.values[0]))(_166.values[1](_167.values[1]));
                };
            }
        };
    };
    var bindTuple = function (__dict_Semigroup_51) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyTuple(__dict_Semigroup_51);
                }
            }, 
            ">>=": function (_168) {
                return function (_169) {
                    return (function (_573) {
                        return Tuple(Prelude["<>"](__dict_Semigroup_51)(_168.values[0])(_573.values[0]))(_573.values[1]);
                    })(_169(_168.values[1]));
                };
            }
        };
    };
    var applicativeTuple = function (__dict_Monoid_53) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyTuple(__dict_Monoid_53["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }, 
            pure: Tuple(Data_Monoid.mempty(__dict_Monoid_53))
        };
    };
    var monadTuple = function (__dict_Monoid_48) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeTuple(__dict_Monoid_48);
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindTuple(__dict_Monoid_48["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }
        };
    };
    return {
        Tuple: Tuple, 
        swap: swap, 
        unzip: unzip, 
        zip: zip, 
        uncurry: uncurry, 
        curry: curry, 
        snd: snd, 
        fst: fst, 
        showTuple: showTuple, 
        eqTuple: eqTuple, 
        ordTuple: ordTuple, 
        functorTuple: functorTuple, 
        applyTuple: applyTuple, 
        applicativeTuple: applicativeTuple, 
        bindTuple: bindTuple, 
        monadTuple: monadTuple
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function returnE(a) {  return function() {    return a;  };};
    function bindE(a) {  return function(f) {    return function() {      return f(a())();    };  };};
    function runPure(f) {  return f();};
    function untilE(f) {  return function() {    while (!f()) { }    return {};  };};
    function whileE(f) {  return function(a) {    return function() {      while (f()) {        a();      }      return {};    };  };};
    function forE(lo) {  return function(hi) {    return function(f) {      return function() {        for (var i = lo; i < hi; i++) {          f(i)();        }      };    };  };};
    function foreachE(as) {  return function(f) {    for (var i = 0; i < as.length; i++) {      f(as[i])();    }  };};
    var applicativeEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEff({});
                }
            }, 
            pure: returnE
        };
    };
    var applyEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorEff({});
                }
            }, 
            "<*>": Prelude.ap(monadEff({}))
        };
    };
    var functorEff = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": Prelude.liftA1(applicativeEff({}))
        };
    };
    var monadEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeEff({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindEff({});
                }
            }
        };
    };
    var bindEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEff({});
                }
            }, 
            ">>=": bindE
        };
    };
    return {
        foreachE: foreachE, 
        forE: forE, 
        whileE: whileE, 
        untilE: untilE, 
        runPure: runPure, 
        bindE: bindE, 
        returnE: returnE, 
        functorEff: functorEff, 
        applyEff: applyEff, 
        applicativeEff: applicativeEff, 
        bindEff: bindEff, 
        monadEff: monadEff
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff_Unsafe = (function () {
    "use strict";
    function unsafeInterleaveEff(f) {  return f;};
    return {
        unsafeInterleaveEff: unsafeInterleaveEff
    };
})();
var PS = PS || {};
PS.Control_Monad_ST = (function () {
    "use strict";
    function newSTRef(val) {  return function () {    return { value: val };  };};
    function readSTRef(ref) {  return function() {    return ref.value;  };};
    function modifySTRef(ref) {  return function(f) {    return function() {      return ref.value = f(ref.value);    };  };};
    function writeSTRef(ref) {  return function(a) {    return function() {      return ref.value = a;    };  };};
    function newSTArray(len) {  return function(a) {    return function() {      var arr = [];      for (var i = 0; i < len; i++) {        arr[i] = a;      };      return arr;    };  };};
    function peekSTArray(arr) {  return function(i) {    return function() {      return arr[i];    };  };};
    function pokeSTArray(arr) {  return function(i) {    return function(a) {      return function() {        return arr[i] = a;      };    };  };};
    function runST(f) {  return f;};
    function runSTArray(f) {  return f;};
    return {
        runSTArray: runSTArray, 
        runST: runST, 
        pokeSTArray: pokeSTArray, 
        peekSTArray: peekSTArray, 
        newSTArray: newSTArray, 
        writeSTRef: writeSTRef, 
        modifySTRef: modifySTRef, 
        readSTRef: readSTRef, 
        newSTRef: newSTRef
    };
})();
var PS = PS || {};
PS.Debug_Trace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function trace(s) {  return function() {    console.log(s);    return {};  };};
    var print = function (__dict_Show_54) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_54)(o));
        };
    };
    return {
        print: print, 
        trace: trace
    };
})();
var PS = PS || {};
PS.Control_Monad = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var when = function (__dict_Monad_55) {
        return function (_175) {
            return function (_176) {
                if (_175) {
                    return _176;
                };
                if (!_175) {
                    return Prelude["return"](__dict_Monad_55)(Prelude.unit);
                };
                throw "Failed pattern match";
            };
        };
    };
    var unless = function (__dict_Monad_56) {
        return function (_177) {
            return function (_178) {
                if (!_177) {
                    return _178;
                };
                if (_177) {
                    return Prelude["return"](__dict_Monad_56)(Prelude.unit);
                };
                throw "Failed pattern match";
            };
        };
    };
    var replicateM = function (__dict_Monad_57) {
        return function (_170) {
            return function (_171) {
                if (_170 === 0) {
                    return Prelude["return"](__dict_Monad_57)([  ]);
                };
                return Prelude[">>="](__dict_Monad_57["__superclasses"]["Prelude.Bind_1"]({}))(_171)(function (_4) {
                    return Prelude[">>="](__dict_Monad_57["__superclasses"]["Prelude.Bind_1"]({}))(replicateM(__dict_Monad_57)(_170 - 1)(_171))(function (_3) {
                        return Prelude["return"](__dict_Monad_57)(Prelude[":"](_4)(_3));
                    });
                });
            };
        };
    };
    var foldM = function (__dict_Monad_58) {
        return function (_172) {
            return function (_173) {
                return function (_174) {
                    if (_174.length === 0) {
                        return Prelude["return"](__dict_Monad_58)(_173);
                    };
                    if (_174.length > 0) {
                        var _590 = _174.slice(1);
                        return Prelude[">>="](__dict_Monad_58["__superclasses"]["Prelude.Bind_1"]({}))(_172(_173)(_174[0]))(function (a$prime) {
                            return foldM(__dict_Monad_58)(_172)(a$prime)(_590);
                        });
                    };
                    throw "Failed pattern match";
                };
            };
        };
    };
    return {
        unless: unless, 
        when: when, 
        foldM: foldM, 
        replicateM: replicateM
    };
})();
var PS = PS || {};
PS.Control_Bind = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $greater$eq$greater = function (__dict_Bind_59) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return Prelude[">>="](__dict_Bind_59)(f(a))(g);
                };
            };
        };
    };
    var $eq$less$less = function (__dict_Bind_60) {
        return function (f) {
            return function (m) {
                return Prelude[">>="](__dict_Bind_60)(m)(f);
            };
        };
    };
    var $less$eq$less = function (__dict_Bind_61) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return $eq$less$less(__dict_Bind_61)(f)(g(a));
                };
            };
        };
    };
    var join = function (__dict_Bind_62) {
        return function (m) {
            return Prelude[">>="](__dict_Bind_62)(m)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var ifM = function (__dict_Bind_63) {
        return function (cond) {
            return function (t) {
                return function (f) {
                    return Prelude[">>="](__dict_Bind_63)(cond)(function (cond$prime) {
                        return cond$prime ? t : f;
                    });
                };
            };
        };
    };
    return {
        ifM: ifM, 
        join: join, 
        "<=<": $less$eq$less, 
        ">=>": $greater$eq$greater, 
        "=<<": $eq$less$less
    };
})();
var PS = PS || {};
PS.Control_Apply = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $less$times = function (__dict_Apply_64) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_64)(Prelude["<$>"](__dict_Apply_64["__superclasses"]["Prelude.Functor_0"]({}))(Prelude["const"])(a))(b);
            };
        };
    };
    var $times$greater = function (__dict_Apply_65) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_65)(Prelude["<$>"](__dict_Apply_65["__superclasses"]["Prelude.Functor_0"]({}))(Prelude["const"](Prelude.id(Prelude.categoryArr({}))))(a))(b);
            };
        };
    };
    var lift5 = function (__dict_Apply_66) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return function (e) {
                                return Prelude["<*>"](__dict_Apply_66)(Prelude["<*>"](__dict_Apply_66)(Prelude["<*>"](__dict_Apply_66)(Prelude["<*>"](__dict_Apply_66)(Prelude["<$>"](__dict_Apply_66["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c))(d))(e);
                            };
                        };
                    };
                };
            };
        };
    };
    var lift4 = function (__dict_Apply_67) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return Prelude["<*>"](__dict_Apply_67)(Prelude["<*>"](__dict_Apply_67)(Prelude["<*>"](__dict_Apply_67)(Prelude["<$>"](__dict_Apply_67["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c))(d);
                        };
                    };
                };
            };
        };
    };
    var lift3 = function (__dict_Apply_68) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return Prelude["<*>"](__dict_Apply_68)(Prelude["<*>"](__dict_Apply_68)(Prelude["<$>"](__dict_Apply_68["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c);
                    };
                };
            };
        };
    };
    var lift2 = function (__dict_Apply_69) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return Prelude["<*>"](__dict_Apply_69)(Prelude["<$>"](__dict_Apply_69["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b);
                };
            };
        };
    };
    var forever = function (__dict_Apply_70) {
        return function (a) {
            return $times$greater(__dict_Apply_70)(a)(forever(__dict_Apply_70)(a));
        };
    };
    return {
        forever: forever, 
        lift5: lift5, 
        lift4: lift4, 
        lift3: lift3, 
        lift2: lift2, 
        "*>": $times$greater, 
        "<*": $less$times
    };
})();
var PS = PS || {};
PS.Data_Foldable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Apply = PS.Control_Apply;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Monoid_First = PS.Data_Monoid_First;
    var Data_Maybe = PS.Data_Maybe;
    function foldrArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = xs.length - 1; i >= 0; --i) {        acc = f(xs[i])(acc);      }      return acc;    }  }};
    function foldlArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = 0, len = xs.length; i < len; ++i) {        acc = f(acc)(xs[i]);      }      return acc;    }  }};
    var foldr = function (dict) {
        return dict.foldr;
    };
    var traverse_ = function (__dict_Applicative_71) {
        return function (__dict_Foldable_72) {
            return function (f) {
                return foldr(__dict_Foldable_72)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Apply["*>"](__dict_Applicative_71["__superclasses"]["Prelude.Apply_0"]({})))(f))(Prelude.pure(__dict_Applicative_71)(Prelude.unit));
            };
        };
    };
    var for_ = function (__dict_Applicative_73) {
        return function (__dict_Foldable_74) {
            return Prelude.flip(traverse_(__dict_Applicative_73)(__dict_Foldable_74));
        };
    };
    var sequence_ = function (__dict_Applicative_75) {
        return function (__dict_Foldable_76) {
            return traverse_(__dict_Applicative_75)(__dict_Foldable_76)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var foldl = function (dict) {
        return dict.foldl;
    };
    var mconcat = function (__dict_Foldable_77) {
        return function (__dict_Monoid_78) {
            return foldl(__dict_Foldable_77)(Prelude["<>"](__dict_Monoid_78["__superclasses"]["Prelude.Semigroup_0"]({})))(Data_Monoid.mempty(__dict_Monoid_78));
        };
    };
    var or = function (__dict_Foldable_79) {
        return foldl(__dict_Foldable_79)(Prelude["||"](Prelude.boolLikeBoolean({})))(false);
    };
    var product = function (__dict_Foldable_80) {
        return foldl(__dict_Foldable_80)(Prelude["*"](Prelude.numNumber({})))(1);
    };
    var sum = function (__dict_Foldable_81) {
        return foldl(__dict_Foldable_81)(Prelude["+"](Prelude.numNumber({})))(0);
    };
    var foldableTuple = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (_204) {
                return function (_205) {
                    return function (_206) {
                        return _204(_206.values[1])(_205);
                    };
                };
            }, 
            foldl: function (_207) {
                return function (_208) {
                    return function (_209) {
                        return _207(_208)(_209.values[1]);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_82) {
                return function (_210) {
                    return function (_211) {
                        return _210(_211.values[1]);
                    };
                };
            }
        };
    };
    var foldableRef = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (_196) {
                return function (_197) {
                    return function (_198) {
                        return _196(_198.values[0])(_197);
                    };
                };
            }, 
            foldl: function (_199) {
                return function (_200) {
                    return function (_201) {
                        return _199(_200)(_201.values[0]);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_83) {
                return function (_202) {
                    return function (_203) {
                        return _202(_203.values[0]);
                    };
                };
            }
        };
    };
    var foldableMaybe = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (_188) {
                return function (_189) {
                    return function (_190) {
                        if (_190.ctor === "Data.Maybe.Nothing") {
                            return _189;
                        };
                        if (_190.ctor === "Data.Maybe.Just") {
                            return _188(_190.values[0])(_189);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldl: function (_191) {
                return function (_192) {
                    return function (_193) {
                        if (_193.ctor === "Data.Maybe.Nothing") {
                            return _192;
                        };
                        if (_193.ctor === "Data.Maybe.Just") {
                            return _191(_192)(_193.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_84) {
                return function (_194) {
                    return function (_195) {
                        if (_195.ctor === "Data.Maybe.Nothing") {
                            return Data_Monoid.mempty(__dict_Monoid_84);
                        };
                        if (_195.ctor === "Data.Maybe.Just") {
                            return _194(_195.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }
        };
    };
    var foldableEither = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (_180) {
                return function (_181) {
                    return function (_182) {
                        if (_182.ctor === "Data.Either.Left") {
                            return _181;
                        };
                        if (_182.ctor === "Data.Either.Right") {
                            return _180(_182.values[0])(_181);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldl: function (_183) {
                return function (_184) {
                    return function (_185) {
                        if (_185.ctor === "Data.Either.Left") {
                            return _184;
                        };
                        if (_185.ctor === "Data.Either.Right") {
                            return _183(_184)(_185.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_85) {
                return function (_186) {
                    return function (_187) {
                        if (_187.ctor === "Data.Either.Left") {
                            return Data_Monoid.mempty(__dict_Monoid_85);
                        };
                        if (_187.ctor === "Data.Either.Right") {
                            return _186(_187.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }
        };
    };
    var foldableArray = function (_) {
        return {
            "__superclasses": {}, 
            foldr: function (f) {
                return function (z) {
                    return function (xs) {
                        return foldrArray(f)(z)(xs);
                    };
                };
            }, 
            foldl: function (f) {
                return function (z) {
                    return function (xs) {
                        return foldlArray(f)(z)(xs);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_86) {
                return function (f) {
                    return function (xs) {
                        return foldr(foldableArray({}))(function (x) {
                            return function (acc) {
                                return Prelude["<>"](__dict_Monoid_86["__superclasses"]["Prelude.Semigroup_0"]({}))(f(x))(acc);
                            };
                        })(Data_Monoid.mempty(__dict_Monoid_86))(xs);
                    };
                };
            }
        };
    };
    var foldMap = function (dict) {
        return dict.foldMap;
    };
    var lookup = function (__dict_Eq_87) {
        return function (__dict_Foldable_88) {
            return function (a) {
                return function (f) {
                    return Data_Monoid_First.runFirst(foldMap(__dict_Foldable_88)(Data_Monoid_First.monoidFirst({}))(function (_179) {
                        return Data_Monoid_First.First(Prelude["=="](__dict_Eq_87)(a)(_179.values[0]) ? Data_Maybe.Just(_179.values[1]) : Data_Maybe.Nothing);
                    })(f));
                };
            };
        };
    };
    var fold = function (__dict_Foldable_89) {
        return function (__dict_Monoid_90) {
            return foldMap(__dict_Foldable_89)(__dict_Monoid_90)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var find = function (__dict_Foldable_91) {
        return function (p) {
            return function (f) {
                return (function (_644) {
                    if (_644.length > 0) {
                        var _646 = _644.slice(1);
                        return Data_Maybe.Just(_644[0]);
                    };
                    if (_644.length === 0) {
                        return Data_Maybe.Nothing;
                    };
                    throw "Failed pattern match";
                })(foldMap(__dict_Foldable_91)(Data_Monoid.monoidArray({}))(function (x) {
                    return p(x) ? [ x ] : [  ];
                })(f));
            };
        };
    };
    var any = function (__dict_Foldable_92) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(or(foldableArray({})))(foldMap(__dict_Foldable_92)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    var elem = function (__dict_Eq_93) {
        return function (__dict_Foldable_94) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(any(__dict_Foldable_94))(Prelude["=="](__dict_Eq_93));
        };
    };
    var notElem = function (__dict_Eq_95) {
        return function (__dict_Foldable_96) {
            return function (x) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(elem(__dict_Eq_95)(__dict_Foldable_96)(x));
            };
        };
    };
    var and = function (__dict_Foldable_97) {
        return foldl(__dict_Foldable_97)(Prelude["&&"](Prelude.boolLikeBoolean({})))(true);
    };
    var all = function (__dict_Foldable_98) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(and(foldableArray({})))(foldMap(__dict_Foldable_98)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    return {
        foldlArray: foldlArray, 
        foldrArray: foldrArray, 
        lookup: lookup, 
        find: find, 
        notElem: notElem, 
        elem: elem, 
        product: product, 
        sum: sum, 
        all: all, 
        any: any, 
        or: or, 
        and: and, 
        mconcat: mconcat, 
        "sequence_": sequence_, 
        "for_": for_, 
        "traverse_": traverse_, 
        fold: fold, 
        foldMap: foldMap, 
        foldl: foldl, 
        foldr: foldr, 
        foldableArray: foldableArray, 
        foldableEither: foldableEither, 
        foldableMaybe: foldableMaybe, 
        foldableRef: foldableRef, 
        foldableTuple: foldableTuple
    };
})();
var PS = PS || {};
PS.Data_Traversable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Eq = PS.Data_Eq;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Array = PS.Data_Array;
    var traverse = function (dict) {
        return dict.traverse;
    };
    var traversableTuple = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_99) {
                return function (_224) {
                    return function (_225) {
                        return Prelude["<$>"]((__dict_Applicative_99["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Tuple.Tuple(_225.values[0]))(_224(_225.values[1]));
                    };
                };
            }, 
            sequence: function (__dict_Applicative_100) {
                return function (_226) {
                    return Prelude["<$>"]((__dict_Applicative_100["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Tuple.Tuple(_226.values[0]))(_226.values[1]);
                };
            }
        };
    };
    var traversableRef = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_101) {
                return function (_218) {
                    return function (_219) {
                        return Prelude["<$>"]((__dict_Applicative_101["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Eq.Ref)(_218(_219.values[0]));
                    };
                };
            }, 
            sequence: function (__dict_Applicative_102) {
                return function (_220) {
                    return Prelude["<$>"]((__dict_Applicative_102["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Eq.Ref)(_220.values[0]);
                };
            }
        };
    };
    var traversableMaybe = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_103) {
                return function (_221) {
                    return function (_222) {
                        if (_222.ctor === "Data.Maybe.Nothing") {
                            return Prelude.pure(__dict_Applicative_103)(Data_Maybe.Nothing);
                        };
                        if (_222.ctor === "Data.Maybe.Just") {
                            return Prelude["<$>"]((__dict_Applicative_103["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Maybe.Just)(_221(_222.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_104) {
                return function (_223) {
                    if (_223.ctor === "Data.Maybe.Nothing") {
                        return Prelude.pure(__dict_Applicative_104)(Data_Maybe.Nothing);
                    };
                    if (_223.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"]((__dict_Applicative_104["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Maybe.Just)(_223.values[0]);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var traversableEither = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_105) {
                return function (_215) {
                    return function (_216) {
                        if (_216.ctor === "Data.Either.Left") {
                            return Prelude.pure(__dict_Applicative_105)(Data_Either.Left(_216.values[0]));
                        };
                        if (_216.ctor === "Data.Either.Right") {
                            return Prelude["<$>"]((__dict_Applicative_105["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Either.Right)(_215(_216.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_106) {
                return function (_217) {
                    if (_217.ctor === "Data.Either.Left") {
                        return Prelude.pure(__dict_Applicative_106)(Data_Either.Left(_217.values[0]));
                    };
                    if (_217.ctor === "Data.Either.Right") {
                        return Prelude["<$>"]((__dict_Applicative_106["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Either.Right)(_217.values[0]);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var sequence = function (dict) {
        return dict.sequence;
    };
    var traversableArray = function (_) {
        return {
            "__superclasses": {}, 
            traverse: function (__dict_Applicative_107) {
                return function (_212) {
                    return function (_213) {
                        if (_213.length === 0) {
                            return Prelude.pure(__dict_Applicative_107)([  ]);
                        };
                        if (_213.length > 0) {
                            var _674 = _213.slice(1);
                            return Prelude["<*>"](__dict_Applicative_107["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_107["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Prelude[":"])(_212(_213[0])))(traverse(traversableArray({}))(__dict_Applicative_107)(_212)(_674));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_108) {
                return function (_214) {
                    if (_214.length === 0) {
                        return Prelude.pure(__dict_Applicative_108)([  ]);
                    };
                    if (_214.length > 0) {
                        var _677 = _214.slice(1);
                        return Prelude["<*>"](__dict_Applicative_108["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_108["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Prelude[":"])(_214[0]))(sequence(traversableArray({}))(__dict_Applicative_108)(_677));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var zipWithA = function (__dict_Applicative_109) {
        return function (f) {
            return function (xs) {
                return function (ys) {
                    return sequence(traversableArray({}))(__dict_Applicative_109)(Data_Array.zipWith(f)(xs)(ys));
                };
            };
        };
    };
    var $$for = function (__dict_Applicative_110) {
        return function (__dict_Traversable_111) {
            return function (x) {
                return function (f) {
                    return traverse(__dict_Traversable_111)(__dict_Applicative_110)(f)(x);
                };
            };
        };
    };
    return {
        zipWithA: zipWithA, 
        "for": $$for, 
        sequence: sequence, 
        traverse: traverse, 
        traversableArray: traversableArray, 
        traversableEither: traversableEither, 
        traversableRef: traversableRef, 
        traversableMaybe: traversableMaybe, 
        traversableTuple: traversableTuple
    };
})();
var PS = PS || {};
PS.Data_Foreign = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Array = PS.Data_Array;
    var Data_Maybe = PS.Data_Maybe;
    var ForeignParser = function (value0) {
        return {
            ctor: "Data.Foreign.ForeignParser", 
            values: [ value0 ]
        };
    };
    function fromString (str) {   try {     return Data_Either.Right(JSON.parse(str));   } catch (e) {     return Data_Either.Left(e.toString());   } };
    function readPrimType (typeName) {   return function (value) {     if (toString.call(value) == '[object ' + typeName + ']') {       return Data_Either.Right(value);    }     return Data_Either.Left('Value is not a ' + typeName + '');   }; };
    function readMaybeImpl (value) {   return value === undefined || value === null ? Data_Maybe.Nothing : Data_Maybe.Just(value); };
    function readPropImpl (k) {   return function (obj) {     return Data_Either.Right(obj[k]);  }; };
    var showForeignImpl = JSON.stringify;;
    var showForeign = function (_) {
        return {
            "__superclasses": {}, 
            show: showForeignImpl
        };
    };
    var readString = function (_) {
        return {
            "__superclasses": {}, 
            read: ForeignParser(readPrimType("String"))
        };
    };
    var readNumber = function (_) {
        return {
            "__superclasses": {}, 
            read: ForeignParser(readPrimType("Number"))
        };
    };
    var readError = function (_) {
        return {
            "__superclasses": {}, 
            read: ForeignParser(readPrimType("Error"))
        };
    };
    var readBoolean = function (_) {
        return {
            "__superclasses": {}, 
            read: ForeignParser(readPrimType("Boolean"))
        };
    };
    var read = function (dict) {
        return dict.read;
    };
    var parseForeign = function (_227) {
        return function (_228) {
            return _227.values[0](_228);
        };
    };
    var parseJSON = function (__dict_ReadForeign_112) {
        return function (json) {
            return Prelude[">>="](Data_Either.bindEither({}))(fromString(json))(parseForeign(read(__dict_ReadForeign_112)));
        };
    };
    var functorForeignParser = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_229) {
                return function (_230) {
                    return ForeignParser(function (x) {
                        return Prelude["<$>"](Data_Either.functorEither({}))(_229)(_230.values[0](x));
                    });
                };
            }
        };
    };
    var applyForeignParser = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorForeignParser({});
                }
            }, 
            "<*>": function (_233) {
                return function (_234) {
                    return ForeignParser(function (x) {
                        return (function (_686) {
                            if (_686.ctor === "Data.Either.Left") {
                                return Data_Either.Left(_686.values[0]);
                            };
                            if (_686.ctor === "Data.Either.Right") {
                                return Prelude["<$>"](Data_Either.functorEither({}))(_686.values[0])(_234.values[0](x));
                            };
                            throw "Failed pattern match";
                        })(_233.values[0](x));
                    });
                };
            }
        };
    };
    var bindForeignParser = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyForeignParser({});
                }
            }, 
            ">>=": function (_231) {
                return function (_232) {
                    return ForeignParser(function (x) {
                        return (function (_693) {
                            if (_693.ctor === "Data.Either.Left") {
                                return Data_Either.Left(_693.values[0]);
                            };
                            if (_693.ctor === "Data.Either.Right") {
                                return parseForeign(_232(_693.values[0]))(x);
                            };
                            throw "Failed pattern match";
                        })(_231.values[0](x));
                    });
                };
            }
        };
    };
    var prop = function (__dict_ReadForeign_113) {
        return function (p) {
            return Prelude[">>="](bindForeignParser({}))(ForeignParser(function (x) {
                return readPropImpl(p)(x);
            }))(function (x) {
                return ForeignParser(function (_) {
                    return (function (_697) {
                        if (_697.ctor === "Data.Either.Right") {
                            return Data_Either.Right(_697.values[0]);
                        };
                        if (_697.ctor === "Data.Either.Left") {
                            return Data_Either.Left("Error reading property '" + p + "':\n" + _697.values[0]);
                        };
                        throw "Failed pattern match";
                    })(parseForeign(read(__dict_ReadForeign_113))(x));
                });
            });
        };
    };
    var readArray = function (__dict_ReadForeign_114) {
        return {
            "__superclasses": {}, 
            read: (function () {
                var arrayItem = function (_235) {
                    return (function (_701) {
                        if (_701.ctor === "Data.Either.Right") {
                            return Data_Either.Right(_701.values[0]);
                        };
                        if (_701.ctor === "Data.Either.Left") {
                            return Data_Either.Left("Error reading item at index " + Prelude.show(Prelude.showNumber({}))(_235.values[0]) + ":\n" + _701.values[0]);
                        };
                        throw "Failed pattern match";
                    })(parseForeign(read(__dict_ReadForeign_114))(_235.values[1]));
                };
                return Prelude[">>="](bindForeignParser({}))(ForeignParser(readPrimType("Array")))(function (xs) {
                    return ForeignParser(function (_) {
                        return Data_Traversable.traverse(Data_Traversable.traversableArray({}))(Data_Either.applicativeEither({}))(arrayItem)(Data_Tuple.zip(Data_Array.range(0)(Data_Array.length(xs)))(xs));
                    });
                });
            })()
        };
    };
    var readMaybe = function (__dict_ReadForeign_115) {
        return {
            "__superclasses": {}, 
            read: Prelude[">>="](bindForeignParser({}))(ForeignParser(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Either.Right)(readMaybeImpl)))(function (x) {
                return ForeignParser(function (_) {
                    if (x.ctor === "Data.Maybe.Just") {
                        return Prelude[">>="](Data_Either.bindEither({}))(parseForeign(read(__dict_ReadForeign_115))(x.values[0]))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](Data_Either.monadEither({})))(Data_Maybe.Just));
                    };
                    if (x.ctor === "Data.Maybe.Nothing") {
                        return Prelude["return"](Data_Either.monadEither({}))(Data_Maybe.Nothing);
                    };
                    throw "Failed pattern match";
                });
            })
        };
    };
    var applicativeForeignParser = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyForeignParser({});
                }
            }, 
            pure: function (x) {
                return ForeignParser(function (_) {
                    return Data_Either.Right(x);
                });
            }
        };
    };
    var monadForeignParser = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeForeignParser({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindForeignParser({});
                }
            }
        };
    };
    return {
        ForeignParser: ForeignParser, 
        prop: prop, 
        read: read, 
        parseJSON: parseJSON, 
        parseForeign: parseForeign, 
        showForeign: showForeign, 
        functorForeignParser: functorForeignParser, 
        bindForeignParser: bindForeignParser, 
        applyForeignParser: applyForeignParser, 
        applicativeForeignParser: applicativeForeignParser, 
        monadForeignParser: monadForeignParser, 
        readString: readString, 
        readNumber: readNumber, 
        readBoolean: readBoolean, 
        readError: readError, 
        readArray: readArray, 
        readMaybe: readMaybe
    };
})();
var PS = PS || {};
PS.Control_Monad_JQuery = (function () {
    "use strict";
    function ready(func) {   return function () {     jQuery(document).ready(func);   }; };
    function select(selector) {   return function () {     return jQuery(selector);   }; };
    function create(html) {   return function () {     return jQuery(html);   }; };
    function setAttr(attr) {   return function(val) {     return function(ob) {       return function () {         return ob.attr(attr, val);      };     };   }; };
    function attr(attrs) {   return function(ob) {     return function () {       return ob.attr(attrs);    };   }; };
    function css(props) {   return function(ob) {     return function () {       return ob.css(props);     };   }; };
    function setProp(p) {   return function(val) {     return function(ob) {       return function () {         return ob.prop(p, val);      };     };   }; };
    function getProp(p) {   return function(ob) {     return function () {       return ob.prop(p);    };   }; };
    function append(ob1) {   return function(ob) {     return function () {       return ob.append(ob1);     };   }; };
    function appendAtIndex(i) {   return function(ob1) {     return function(ob) {       return function () {         var children = ob.children();        if (children.length > 0) {          if (i <= 0) {             ob.prepend(ob1);          } else if (i >= children.length) {             ob.append(ob1);          } else {             ob1.insertBefore(jQuery(children[i]));          }          return ob;        } else {          return ob.append(ob1);         }      };     };   }; };
    function remove(ob) {   return function () {     return ob.remove();   }; };
    function before(ob) {   return function(ob1) {     return function () {       return ob1.before(ob);     };   }; };
    function appendText(s) {   return function(ob) {     return function () {       return ob.append(s);     };   }; };
    function body() {   return jQuery(document.body); };
    function getText(ob) {   return function() {     return ob.text();   }; };
    function setText(text) {   return function(ob) {     return function() {       ob.text(text);     };  };};
    function getValue(ob) {   return function() {     return ob.val();   }; };
    function setValue(val) {   return function(ob) {     return function() {       return ob.val(val);     };   }; };
    function on(evt) {   return function(act) {     return function(ob) {       return function() {         return ob.on(evt, function() {           act(jQuery(this))();         });       };     };   }; };
    function onWithPreventDefault(evt) {   return function(act) {     return function(ob) {       return function() {         return ob.on(evt, function(e) {           e.preventDefault();           act(jQuery(this))();         });       };     };   }; };
    return {
        onWithPreventDefault: onWithPreventDefault, 
        on: on, 
        setValue: setValue, 
        getValue: getValue, 
        setText: setText, 
        getText: getText, 
        body: body, 
        appendText: appendText, 
        before: before, 
        remove: remove, 
        appendAtIndex: appendAtIndex, 
        append: append, 
        getProp: getProp, 
        setProp: setProp, 
        css: css, 
        attr: attr, 
        setAttr: setAttr, 
        create: create, 
        select: select, 
        ready: ready
    };
})();
var PS = PS || {};
PS.BrissyParks = (function () {
    "use strict";
    var Control_Monad_JQuery = PS.Control_Monad_JQuery;
    var Prelude = PS.Prelude;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Data_Foreign = PS.Data_Foreign;
    var Debug_Trace = PS.Debug_Trace;
    var searchTextInput = Control_Monad_JQuery.select("#searchInput");
    var searchButton = Control_Monad_JQuery.select("#searchButton");
    var main = Control_Monad_JQuery.ready(function __do() {
        var _7 = searchButton();
        return Prelude.flip(Control_Monad_JQuery.onWithPreventDefault("click"))(_7)(function (_) {
            return function __do() {
                var _6 = searchTextInput();
                return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Prelude["<$>"](Control_Monad_Eff.functorEff({}))(Data_Foreign.parseForeign(Data_Foreign.read(Data_Foreign.readString({}))))(Control_Monad_JQuery.getValue(_6)))(function (_5) {
                    if (_5.ctor === "Data.Either.Right") {
                        return function __do() {
                            Debug_Trace.trace("Input query was :" + _5.values[0])();
                            return Prelude[">>="](Control_Monad_Eff.bindEff({}))(searchTextInput)(Control_Monad_JQuery.setValue(""))();
                        };
                    };
                    throw "Failed pattern match";
                })();
            };
        })();
    });
    return {
        main: main, 
        searchTextInput: searchTextInput, 
        searchButton: searchButton
    };
})();
PS.BrissyParks.main();