!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("immutable"),require("promise")):"function"==typeof define&&define.amd?define(["immutable","promise"],n):"object"==typeof exports?exports.ReactFlux=n(require("immutable"),require("promise")):t.ReactFlux=n(t.Immutable,t.promise)}(this,function(t,n){return function(t){function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){var r=e(1),o=e(2),i=e(3),s=e(4),a=e(5),c=e(6),f=new a;t.exports={configs:c,createActions:function(t){return new o(f,t)},createStore:function(t,n){return new i(f,t,n)},createConstants:function(t,n){return new r(t,n)},dispatch:function(t,n){f.dispatch(t,n)},dispatcher:f,mixin:s}},function(t,n,e){var r=e(10),o=e(11),i=e(12),s=e(6).constants.get();t.exports=function(t,n){if(!o(t))throw new Error("createConstants expects first parameter to be an array of strings");if(n=n||"",!i(n))throw new Error("createConstants expects second parameter string");n.length>0&&(n+=s.separator);var e={};return r(t,function(t){if(!i(t))throw new Error("createConstants expects all constants to be strings");e[t]=n+t,e[t+"_"+s.successSuffix]=n+t+s.separator+s.successSuffix,e[t+"_"+s.failSuffix]=n+t+s.separator+s.failSuffix,e[t+"_"+s.afterSuffix]=n+t+s.separator+s.afterSuffix}),e}},function(t,n,e){var r=e(13),o=e(10),i=e(11),s=e(8),a=e(6).constants.get(),c=function(t,n){this._dispatcher=t,this._registerActions(n)};c.prototype=r(c.prototype,{_registerActions:function(t){o(t,function(t,n){if(!i(t))throw new Error("ReactFlux.Actions: Action must be an array {login: [CONSTANT, callback]}");var e=t[0],r=t[1];if("undefined"==typeof r)r=function(){};else if("function"!=typeof r)throw new Error("ReactFlux.Actions: you did not provide a valid callback for action: "+n);this[n]=this._createAction(n,e,r)}.bind(this))},_createAction:function(t,n,e){return function(){this._dispatch(n,null,arguments);var t=null;try{if(t=e.apply(this,arguments),t&&"object"==typeof t&&"[object Error]"==Object.prototype.toString.call(t))throw t}catch(r){t=new s(function(t,n){n(r)})}s.resolve(t).then(function(t){this._dispatch(n,"successSuffix",t),this._dispatch(n,"afterSuffix",t)}.bind(this),function(t){this._dispatch(n,"failSuffix",t),this._dispatch(n,"afterSuffix",t)}.bind(this))["catch"](function(t){console.error(t.toString(),t.stack)})}.bind(this)},_dispatch:function(t,n,e){n&&(t+=a.separator+a[n]),this._dispatcher.dispatch(t,e)}}),t.exports=c},function(t,n,e){var r=e(7),o=e(13),i=e(14),s=e(10),a=e(11),c=e(4),f="change",u=e(9),p=function(t,n,e){this.state=r.Map({_action_states:{}}),this._events={},this._actionHandlers={},this._constantHandlers={},this._dispatcherIndexes={},this._dispatcher=t,this._getInitialStateCalls=[],this._storeDidMountCalls=[],this._mixin(n),this._setInitialState(),e&&this.setConstantHandlers(e),s(this._storeDidMountCalls,function(t){t()})};p.prototype={setState:function(t){this.state=this.state.merge(t),this.emit(f)},setActionState:function(t,n){var e=this.state.get("_action_states");e.toJS&&(e=e.toJS()),e[t]=o(e[t]||{},n),this.setState({_action_states:e})},resetActionState:function(t){if("undefined"==typeof this._actionHandlers[t])throw new Error("Store.resetActionState constant handler for ["+t+"] is not defined");var n=this.state.get("_action_states");n.toJS&&(n=n.toJS()),n[t]=this._actionHandlers[t].getInitialState(),this.setState({_action_states:n})},getActionState:function(t,n){if("undefined"==typeof this._actionHandlers[t])throw new Error("Store.getActionState constant handler for ["+t+"] is not defined");var e=this.state.get("_action_states").toJS();return"undefined"==typeof n?e[t]:e[t][n]||void 0},get:function(t){return this.state.get(t)},replaceState:function(t){this.state=r.Map(t)},toJS:function(){return this.state.toJS()},toObject:function(){return this.state.toObject()},toJSON:function(){return this.state.toJSON()},isStore:function(){return!0},onChange:function(t){this.on(f,t)},offChange:function(t){this.off(f,t)},_mixin:function(t){t&&t.mixins&&a(t.mixins)&&s(t.mixins,this._mixin.bind(this)),s(t,function(t,n){"mixins"!==n&&("function"==typeof t&&(t=t.bind(this)),"getInitialState"===n?this._getInitialStateCalls.push(t):"storeDidMount"===n?this._storeDidMountCalls.push(t):this[n]=t)}.bind(this))},addActionHandler:function(t,n){return this._actionHandlers[t]=new u(this,t,n),this},setConstantHandlers:function(t){if(!a(t))throw new Error("store expects handler definitions to be an array");s(t,function(t){if(!a(t))throw new Error("store expects handler definition to be an array");var n,e,r;if(n=t[0],2===t.length?(r=null,e=t[1]):(r=t[1],e=t[2]),"string"!=typeof n)throw new Error("store expects all handler definitions to contain a constant as the first parameter");if("function"!=typeof e)throw new Error("store expects all handler definitions to contain a callback");if(r&&!a(r))throw new Error("store expects waitFor to be an array of stores");var o=null;r&&(o=r.map(function(t){if(!(t instanceof p))throw new Error("store expects waitFor to be an array of stores");return t.getHandlerIndex(n)})),this._constantHandlers[n]=e.bind(this);var i=this._dispatcher.register(n,this._constantHandlers[n],o);this._dispatcherIndexes[n]=i}.bind(this))},getHandlerIndex:function(t){if("undefined"==typeof this._dispatcherIndexes[t])throw new Error("Can not get store handler for constant: "+t);return this._dispatcherIndexes[t]},_setInitialState:function(){this.setState(this.getInitialState())},getInitialState:function(){var t={};return s(this._getInitialStateCalls,function(n){i(t,n())}),t},mixin:function(){return c(this)},on:function(t,n){return"undefined"==typeof this._events[t]&&(this._events[t]=[]),this._events[t].push(n),n},off:function(t,n){if("undefined"!=typeof this._events[t])for(var e=0,r=this._events[t].length;r>e;e++)if(this._events[t][e]===n){this._events[t].splice(e,1);break}},emit:function(t){if("undefined"!=typeof this._events[t]){var n=Array.prototype.slice.call(arguments,1);s(this._events[t],function(t){"function"==typeof t&&t.apply(null,n)})}}},t.exports=p},function(t,n,e){var r=e(10);t.exports=function(){var t=Array.prototype.slice.call(arguments);if(!t.length)throw new Error("Flux.mixin expects a store or a list of stores");return r(t,function(t){var n="undefined"==typeof t||"function"!=typeof t.onChange||"function"!=typeof t.offChange;if(n)throw new Error("Flux.mixin expects a store or an array of stores")}),{componentWillMount:function(){"undefined"==typeof this._react_flux_onChange&&(this._react_flux_onChange=function(){this.isMounted()&&this.setState(this.getStateFromStores())}.bind(this)),this.setState(this.getStateFromStores())},componentDidMount:function(){for(var n=0;n<t.length;n++)t[n].onChange(this._react_flux_onChange)},componentWillUnmount:function(){for(var n=0;n<t.length;n++)t[n].offChange(this._react_flux_onChange)}}}},function(t,n,e){function r(){this._registry={}}var o=e(8),i=e(13),s=e(11),a=e(12),c=e(10);r.prototype=i(r.prototype,{register:function(t,n,e){if(!a(t)||!t.length)throw new Error("Dispatcher.register: constant must be a string");if(e=e||null,"function"!=typeof n)throw new Error("Dispatcher.register expects second parameter to be a callback");if(null!==e&&!s(e))throw new Error("Dispatcher.register expects third parameter to be null or an array");var r=this._getRegistry(t);return r.callbacks.push(n),r.waitFor.push(e),r.callbacks.length-1},dispatch:function(t,n){var e=this._getRegistry(t);e.dispatchQueue.push({constant:t,payload:n}),this._dispatch(e)},_dispatch:function(t){if(!t.isDispatching&&t.dispatchQueue.length){t.isDispatching=!0;var n=t.dispatchQueue.shift();this._createDispatchPromises(t),c(t.callbacks,function(e,r){var i=function(t,n,e){return function(){o.resolve(t.callbacks[n](e)).then(function(){t.resolves[n](e)},function(){t.rejects[n](new Error("Dispatch callback error"))})}}(t,r,n.payload),s=t.waitFor[r];if(s){var a=this._getPromisesByIndexes(t,s);o.all(a).then(i,i)}else i()}.bind(this)),o.all(t.promises).then(function(){this._onDispatchEnd(t)}.bind(this),function(){this._onDispatchEnd(t)})}},_getRegistry:function(t){return"undefined"==typeof this._registry[t]&&(this._registry[t]={callbacks:[],waitFor:[],promises:[],resolves:[],rejects:[],dispatchQueue:[],isDispatching:!1}),this._registry[t]},_getPromisesByIndexes:function(t,n){return n.map(function(n){return t.promises[n]})},_createDispatchPromises:function(t){t.promises=[],t.resolves=[],t.rejects=[],c(t.callbacks,function(n,e){t.promises[e]=new o(function(n,r){t.resolves[e]=n,t.rejects[e]=r})})},_onDispatchEnd:function(t){t.promises=[],t.resolves=[],t.rejects=[],t.isDispatching=!1,this._dispatch(t)}}),t.exports=r},function(t,n,e){var r=e(12),o="_",i="SUCCESS",s="FAIL",a="AFTER",c={constants:{separator:o,successSuffix:i,failSuffix:s,afterSuffix:a}};t.exports={constants:{setSeparator:function(t){if(!r(t)||!t.length)throw new Error("Constants.separator must be a non empty string");c.constants.separator=t},setSuccessSuffix:function(t){if(!r(t)||!t.length)throw new Error("Constants.successSuffix must be a non empty string");c.constants.successSuffix=t},setFailSuffix:function(t){if(!r(t)||!t.length)throw new Error("Constants.failSuffix must be a non empty string");c.constants.failSuffix=t},setAfterSuffix:function(t){if(!r(t)||!t.length)throw new Error("Constants.afterSuffix must be a non empty string");c.constants.afterSuffix=t},resetToDefaults:function(){c.constants.separator=o,c.constants.successSuffix=i,c.constants.failSuffix=s,c.constants.afterSuffix=a},get:function(){return c.constants}}}},function(n,e,r){n.exports=t},function(t,e,r){t.exports=n},function(t,n,e){function r(t,n,e){if(!t||"function"!=typeof t.isStore||!t.isStore())throw new Error("StoreActionHandler expects first parameter to be a store");if(!o(n)||!n.length)throw new Error("StoreActionHandler expects second parameter to be a constant(string)");if("undefined"==typeof e.getInitialState&&(e.getInitialState=function(){return{}}),"function"!=typeof e.getInitialState)throw new Error("StoreActionHandler expects getInitialState to be a function");e=e||{},this.parent=t,this.constant=n,this.getInitialState=e.getInitialState,this.before=e.before||null,this.after=e.after||null,this.success=e.success||null,this.fail=e.fail||null,this.parent.setActionState(this.constant,this.getInitialState());for(var r=[],a=s.length,c=0;a>c;c++){var f=s[c];if(null!==this[f]){if("function"!=typeof this[f])throw new Error('StoreActionHandler expects "'+f+'" to be a function');var u=this.constant;"before"!==f&&(u+=i.separator+i[f+"Suffix"]),r.push([u,this[f].bind(this)])}}t.setConstantHandlers(r)}var o=e(12),i=e(6).constants.get(),s=["before","after","success","fail"];r.prototype={setState:function(t){this.parent.setActionState(this.constant,t)},getState:function(){return this.parent.getActionState(this.constant)}},t.exports=r},function(t,n,e){var r=e(15),o=e(16),i=e(17),s=i(r,o);t.exports=s},function(t,n,e){var r=e(18),o=e(19),i=e(20),s="[object Array]",a=Object.prototype,c=a.toString,f=o(f=Array.isArray)&&f,u=f||function(t){return i(t)&&r(t.length)&&c.call(t)==s};t.exports=u},function(t,n,e){function r(t){return"string"==typeof t||o(t)&&a.call(t)==i}var o=e(20),i="[object String]",s=Object.prototype,a=s.toString;t.exports=r},function(t,n,e){var r=e(21),o=e(22),i=o(r);t.exports=i},function(t,n,e){var r=e(23),o=e(22),i=o(r);t.exports=i},function(t,n,e){function r(t,n){for(var e=-1,r=t.length;++e<r&&n(t[e],e,t)!==!1;);return t}t.exports=r},function(t,n,e){var r=e(24),o=e(25),i=o(r);t.exports=i},function(t,n,e){function r(t,n){return function(e,r,s){return"function"==typeof r&&"undefined"==typeof s&&i(e)?t(e,r):n(e,o(r,s,3))}}var o=e(26),i=e(11);t.exports=r},function(t,n,e){function r(t){return"number"==typeof t&&t>-1&&t%1==0&&o>=t}var o=Math.pow(2,53)-1;t.exports=r},function(t,n,e){function r(t){return null==t?!1:u.call(t)==s?p.test(f.call(t)):i(t)&&a.test(t)}var o=e(27),i=e(20),s="[object Function]",a=/^\[object .+?Constructor\]$/,c=Object.prototype,f=Function.prototype.toString,u=c.toString,p=RegExp("^"+o(u).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=r},function(t,n,e){function r(t){return!!t&&"object"==typeof t}t.exports=r},function(t,n,e){function r(t,n,e,h,l){if(!f(t))return t;var d=c(n.length)&&(a(n)||p(n));return(d?o:i)(n,function(n,o,i){if(u(n))return h||(h=[]),l||(l=[]),s(t,i,o,r,e,h,l);var a=t[o],c=e?e(a,n,o,t,i):void 0,f="undefined"==typeof c;f&&(c=n),!d&&"undefined"==typeof c||!f&&(c===c?c===a:a!==a)||(t[o]=c)}),t}var o=e(15),i=e(24),s=e(28),a=e(11),c=e(18),f=e(29),u=e(20),p=e(30);t.exports=r},function(t,n,e){function r(t){return function(){var n=arguments,e=n.length,r=n[0];if(2>e||null==r)return r;var s=n[e-2],a=n[e-1],c=n[3];e>3&&"function"==typeof s?(s=o(s,a,5),e-=2):(s=e>2&&"function"==typeof a?a:null,e-=s?1:0),c&&i(n[1],n[2],c)&&(s=3==e?null:s,e=2);for(var f=0;++f<e;){var u=n[f];u&&t(r,u,s)}return r}}var o=e(26),i=e(31);t.exports=r},function(t,n,e){function r(t,n,e){var r=i(n);if(!e)return o(n,t,r);for(var s=-1,a=r.length;++s<a;){var c=r[s],f=t[c],u=e(f,n[c],c,t,n);(u===u?u===f:f!==f)&&("undefined"!=typeof f||c in t)||(t[c]=u)}return t}var o=e(32),i=e(33);t.exports=r},function(t,n,e){function r(t,n){return o(t,n,i)}var o=e(34),i=e(33);t.exports=r},function(t,n,e){function r(t,n){return function(e,r){var s=e?e.length:0;if(!o(s))return t(e,r);for(var a=n?s:-1,c=i(e);(n?a--:++a<s)&&r(c[a],a,c)!==!1;);return e}}var o=e(18),i=e(35);t.exports=r},function(t,n,e){function r(t,n,e){if("function"!=typeof t)return o;if("undefined"==typeof n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 3:return function(e,r,o){return t.call(n,e,r,o)};case 4:return function(e,r,o,i){return t.call(n,e,r,o,i)};case 5:return function(e,r,o,i,s){return t.call(n,e,r,o,i,s)}}return function(){return t.apply(n,arguments)}}var o=e(36);t.exports=r},function(t,n,e){function r(t){return t=o(t),t&&s.test(t)?t.replace(i,"\\$&"):t}var o=e(37),i=/[.*+?^${}()|[\]\/\\]/g,s=RegExp(i.source);t.exports=r},function(t,n,e){function r(t,n,e,r,p,h,l){for(var d=h.length,g=n[e];d--;)if(h[d]==g)return void(t[e]=l[d]);var x=t[e],y=p?p(x,g,e,t,n):void 0,v="undefined"==typeof y;v&&(y=g,a(g.length)&&(s(g)||f(g))?y=s(x)?x:x&&x.length?o(x):[]:c(g)||i(g)?y=i(x)?u(x):c(x)?x:{}:v=!1),h.push(g),l.push(y),v?t[e]=r(y,g,p,h,l):(y===y?y!==x:x===x)&&(t[e]=y)}var o=e(38),i=e(39),s=e(11),a=e(18),c=e(40),f=e(30),u=e(41);t.exports=r},function(t,n,e){function r(t){var n=typeof t;return"function"==n||!!t&&"object"==n}t.exports=r},function(t,n,e){function r(t){return i(t)&&o(t.length)&&!!O[D.call(t)]}var o=e(18),i=e(20),s="[object Arguments]",a="[object Array]",c="[object Boolean]",f="[object Date]",u="[object Error]",p="[object Function]",h="[object Map]",l="[object Number]",d="[object Object]",g="[object RegExp]",x="[object Set]",y="[object String]",v="[object WeakMap]",b="[object ArrayBuffer]",S="[object Float32Array]",_="[object Float64Array]",m="[object Int8Array]",w="[object Int16Array]",j="[object Int32Array]",A="[object Uint8Array]",E="[object Uint8ClampedArray]",C="[object Uint16Array]",I="[object Uint32Array]",O={};O[S]=O[_]=O[m]=O[w]=O[j]=O[A]=O[E]=O[C]=O[I]=!0,O[s]=O[a]=O[b]=O[c]=O[f]=O[u]=O[p]=O[h]=O[l]=O[d]=O[g]=O[x]=O[y]=O[v]=!1;var F=Object.prototype,D=F.toString;t.exports=r},function(t,n,e){function r(t,n,e){if(!s(e))return!1;var r=typeof n;if("number"==r)var a=e.length,c=i(a)&&o(n,a);else c="string"==r&&n in e;if(c){var f=e[n];return t===t?t===f:f!==f}return!1}var o=e(42),i=e(18),s=e(29);t.exports=r},function(t,n,e){function r(t,n,e){e||(e=n,n={});for(var r=-1,o=e.length;++r<o;){var i=e[r];n[i]=t[i]}return n}t.exports=r},function(t,n,e){var r=e(18),o=e(19),i=e(29),s=e(43),a=o(a=Object.keys)&&a,c=a?function(t){if(t)var n=t.constructor,e=t.length;return"function"==typeof n&&n.prototype===t||"function"!=typeof t&&e&&r(e)?s(t):i(t)?a(t):[]}:s;t.exports=c},function(t,n,e){var r=e(44),o=r();t.exports=o},function(t,n,e){function r(t){return o(t)?t:Object(t)}var o=e(29);t.exports=r},function(t,n,e){function r(t){return t}t.exports=r},function(t,n,e){function r(t){return"string"==typeof t?t:null==t?"":t+""}t.exports=r},function(t,n,e){function r(t,n){var e=-1,r=t.length;for(n||(n=Array(r));++e<r;)n[e]=t[e];return n}t.exports=r},function(t,n,e){function r(t){var n=i(t)?t.length:void 0;return o(n)&&c.call(t)==s}var o=e(18),i=e(20),s="[object Arguments]",a=Object.prototype,c=a.toString;t.exports=r},function(t,n,e){var r=e(19),o=e(45),i="[object Object]",s=Object.prototype,a=s.toString,c=r(c=Object.getPrototypeOf)&&c,f=c?function(t){if(!t||a.call(t)!=i)return!1;var n=t.valueOf,e=r(n)&&(e=c(n))&&c(e);return e?t==e||c(t)==e:o(t)}:o;t.exports=f},function(t,n,e){function r(t){return o(t,i(t))}var o=e(32),i=e(46);t.exports=r},function(t,n,e){function r(t,n){return t=+t,n=null==n?o:n,t>-1&&t%1==0&&n>t}var o=Math.pow(2,53)-1;t.exports=r},function(t,n,e){function r(t){for(var n=c(t),e=n.length,r=e&&t.length,u=r&&a(r)&&(i(t)||f.nonEnumArgs&&o(t)),h=-1,l=[];++h<e;){var d=n[h];(u&&s(d,r)||p.call(t,d))&&l.push(d)}return l}var o=e(39),i=e(11),s=e(42),a=e(18),c=e(46),f=e(47),u=Object.prototype,p=u.hasOwnProperty;t.exports=r},function(t,n,e){function r(t){return function(n,e,r){for(var i=o(n),s=r(n),a=s.length,c=t?a:-1;t?c--:++c<a;){var f=s[c];if(e(i[f],f,i)===!1)break}return n}}var o=e(35);t.exports=r},function(t,n,e){function r(t){var n;if(!i(t)||f.call(t)!=s||!c.call(t,"constructor")&&(n=t.constructor,"function"==typeof n&&!(n instanceof n)))return!1;var e;return o(t,function(t,n){e=n}),"undefined"==typeof e||c.call(t,e)}var o=e(48),i=e(20),s="[object Object]",a=Object.prototype,c=a.hasOwnProperty,f=a.toString;t.exports=r},function(t,n,e){function r(t){if(null==t)return[];c(t)||(t=Object(t));var n=t.length;n=n&&a(n)&&(i(t)||f.nonEnumArgs&&o(t))&&n||0;for(var e=t.constructor,r=-1,u="function"==typeof e&&e.prototype===t,h=Array(n),l=n>0;++r<n;)h[r]=r+"";for(var d in t)l&&s(d,n)||"constructor"==d&&(u||!p.call(t,d))||h.push(d);return h}var o=e(39),i=e(11),s=e(42),a=e(18),c=e(29),f=e(47),u=Object.prototype,p=u.hasOwnProperty;t.exports=r},function(t,n,e){(function(n){var e=Object.prototype,r=(r=n.window)&&r.document,o=e.propertyIsEnumerable,i={};!function(t){i.funcDecomp=/\bthis\b/.test(function(){return this}),i.funcNames="string"==typeof Function.name;try{i.dom=11===r.createDocumentFragment().nodeType}catch(n){i.dom=!1}try{i.nonEnumArgs=!o.call(arguments,1)}catch(n){i.nonEnumArgs=!0}}(0,0),t.exports=i}).call(n,function(){return this}())},function(t,n,e){function r(t,n){return o(t,n,i)}var o=e(34),i=e(46);t.exports=r}])});