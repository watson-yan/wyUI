/** ****/ (function (modules) { // webpackBootstrap
/** ****/ 	// The module cache
/** ****/ 	const installedModules = {}

/** ****/ 	// The require function
/** ****/ 	function __webpack_require__(moduleId) {
/** ****/ 		// Check if module is in cache
/** ****/ 		if (installedModules[moduleId])
/** ****/ 			{ return installedModules[moduleId].exports }

/** ****/ 		// Create a new module (and put it into the cache)
/** ****/ 		const module = installedModules[moduleId] = {
/** ****/ 			i: moduleId,
/** ****/ 			l: false,
/** ****/ 			exports: {}
/** ****/ 		}

/** ****/ 		// Execute the module function
/** ****/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

/** ****/ 		// Flag the module as loaded
/** ****/ 		module.l = true

/** ****/ 		// Return the exports of the module
/** ****/ 		return module.exports
/** ****/ 	}


/** ****/ 	// expose the modules object (__webpack_modules__)
/** ****/ 	__webpack_require__.m = modules

/** ****/ 	// expose the module cache
/** ****/ 	__webpack_require__.c = installedModules

/** ****/ 	// identity function for calling harmony imports with the correct context
/** ****/ 	__webpack_require__.i = function (value) { return value }

/** ****/ 	// define getter function for harmony exports
/** ****/ 	__webpack_require__.d = function (exports, name, getter) {
/** ****/ 		if (!__webpack_require__.o(exports, name)) {
/** ****/ 			Object.defineProperty(exports, name, {
/** ****/ 				configurable: false,
/** ****/ 				enumerable: true,
/** ****/ 				get: getter
/** ****/ 			})
/** ****/ 		}
/** ****/ 	}

/** ****/ 	// getDefaultExport function for compatibility with non-harmony modules
/** ****/ 	__webpack_require__.n = function (module) {
/** ****/ 		const getter = module && module.__esModule ?
/** ****/ 			function getDefault() { return module.default } :
/** ****/ 			function getModuleExports() { return module }
/** ****/ 		__webpack_require__.d(getter, 'a', getter)
/** ****/ 		return getter
/** ****/ 	}

/** ****/ 	// Object.prototype.hasOwnProperty.call
/** ****/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property) }

/** ****/ 	// __webpack_public_path__
/** ****/ 	__webpack_require__.p = ''

/** ****/ 	// Load entry module and return exports
/** ****/ 	return __webpack_require__(__webpack_require__.s = 120)
/** ****/ }([
/* 0 */
/** */ (function (module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	const list = []

	// return the list of modules as css string
	list.toString = function toString() {
		const result = []
		for (let i = 0; i < this.length; i++) {
			const item = this[i]
			if (item[2]) {
				result.push(`@media ${item[2]}{${item[1]}}`)
			} else {
				result.push(item[1])
			}
		}
		return result.join('')
	}

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === 'string')			{ modules = [[null, modules, '']] }
		const alreadyImportedModules = {}
		for (var i = 0; i < this.length; i++) {
			const id = this[i][0]
			if (typeof id === 'number')				{ alreadyImportedModules[id] = true }
		}
		for (i = 0; i < modules.length; i++) {
			const item = modules[i]
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== 'number' || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery
				} else if (mediaQuery) {
					item[2] = `(${item[2]}) and (${mediaQuery})`
				}
				list.push(item)
			}
		}
	}
	return list
}
/** */ }),
/* 1 */
/** */ (function (module, exports) {
module.exports = function normalizeComponent(
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  let esModule
  let scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  const type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  const options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    const computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach((key) => {
      const module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule,
    exports: scriptExports,
    options
  }
}
/** */ }),
/* 2 */
/** */ (function (module, exports, __webpack_require__) {
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

const hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  )
}
}

var listToStyles = __webpack_require__(118)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

const stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

const head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
let singletonElement = null
let singletonCounter = 0
let isProduction = false
const noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  let styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update(newList) {
    const mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      const item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (let j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom(styles /* Array<StyleObject> */) {
  for (let i = 0; i < styles.length; i++) {
    const item = styles[i]
    const domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      const parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts }
    }
  }
}

function listToStyles(parentId, list) {
  const styles = []
  const newStyles = {}
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const id = item[0]
    const css = item[1]
    const media = item[2]
    const sourceMap = item[3]
    const part = { css, media, sourceMap }
    if (!newStyles[id]) {
      part.id = `${parentId}:0`
      styles.push(newStyles[id] = { id, parts: [part] })
    } else {
      part.id = `${parentId}:${newStyles[id].parts.length}`
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

function createStyleElement() {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle(obj /* StyleObjectPart */) {
  let update,
remove
  let styleElement = document.querySelector(`style[data-vue-ssr-id~="${obj.id}"]`)
  const hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    const styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

  return function updateStyle(newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

const replaceText = (function () {
  const textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
}())

function applyToSingletonTag(styleElement, index, remove, obj) {
  const css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    const cssNode = document.createTextNode(css)
    const childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag(styleElement, obj) {
  let css = obj.css
  const media = obj.media
  const sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += `\n/*# sourceURL=${sourceMap.sources[0]} */`
    // http://stackoverflow.com/a/26603875
    css += `\n/*# sourceMappingURL=data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))} */`
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}
/** */ }),
/* 3 */
/** */ (function (module, __webpack_exports__, __webpack_require__) {
/* WEBPACK VAR INJECTION */(function (process, global) {
Object.defineProperty(__webpack_exports__, '__esModule', { value: true })
/*!
 * Vue.js v2.2.1
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString(val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(
  str,
  expectsLowerCase
) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()] }
    : function (val) { return map[val] }
}

/**
 * Check if a tag is a built-in tag.
 */
const isBuiltInTag = makeMap('slot,component', true)

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
const camelize = cached(str => str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : ''))

/**
 * Capitalize a string.
 */
const capitalize = cached(str => str.charAt(0).toUpperCase() + str.slice(1))

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /([^-])([A-Z])/g
const hyphenate = cached(str => str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase())

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
const toString = Object.prototype.toString
const OBJECT_STRING = '[object Object]'
function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop() {}

/**
 * Always return false.
 */
const no = function () { return false }

/**
 * Return same value
 */
const identity = function (_) { return _ }

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  }
    return false
}

function looseIndexOf(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn()
    }
  }
}

/*  */

const config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: process.env.NODE_ENV !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
const hasProto = '__proto__' in {}

// Browser environment sniffing
const inBrowser = typeof window !== 'undefined'
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
const isIE = UA && /msie|trident/.test(UA)
const isIE9 = UA && UA.indexOf('msie 9.0') > 0
const isEdge = UA && UA.indexOf('edge/') > 0
const isAndroid = UA && UA.indexOf('android') > 0
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
let _isServer
const isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global.process.env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}

// detect devtools
const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

/* istanbul ignore next */
function isNative(Ctor) {
  return /native code/.test(Ctor.toString())
}

const hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

/**
 * Defer a task to execute it asynchronously.
 */
const nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc

  function nextTickHandler() {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    const logError = function (err) { console.error(err) }
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError)
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop) }
    }
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    let counter = 1
    const observer = new MutationObserver(nextTickHandler)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true
    })
    timerFunc = function () {
      counter = (counter + 1) % 2
      textNode.data = String(counter)
    }
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0)
    }
  }

  return function queueNextTick(cb, ctx) {
    let _resolve
    callbacks.push(() => {
      if (cb) { cb.call(ctx) }
      if (_resolve) { _resolve(ctx) }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve) => {
        _resolve = resolve
      })
    }
  }
}())

let _Set
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set() {
      this.set = Object.create(null)
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true
    }
    Set.prototype.add = function add(key) {
      this.set[key] = true
    }
    Set.prototype.clear = function clear() {
      this.set = Object.create(null)
    }

    return Set
  }())
}

let perf

if (process.env.NODE_ENV !== 'production') {
  perf = inBrowser && window.performance
  if (perf && (!perf.mark || !perf.measure)) {
    perf = undefined
  }
}

/*  */

const emptyObject = Object.freeze({})

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  const c = (`${str}`).charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Parse simple path.
 */
const bailRE = /[^\w.$]/
function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
    const segments = path.split('.')
    return function (obj) {
      for (let i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]]
      }
      return obj
    }
}

let warn = noop
let tip = noop
let formatComponentName

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'
  const classifyRE = /(?:^|[-_])(\w)/g
  const classify = function (str) {
 return str
    .replace(classifyRE, c => c.toUpperCase())
    .replace(/[-_]/g, '')
}

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error(`[Vue warn]: ${msg} ${
        vm ? formatLocation(formatComponentName(vm)) : ''}`)
    }
  }

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn(`[Vue tip]: ${msg} ${
        vm ? formatLocation(formatComponentName(vm)) : ''}`)
    }
  }

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    let name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name

    const file = vm._isVue && vm.$options.__file
    if (!name && file) {
      const match = file.match(/([^/\\]+)\.vue$/)
      name = match && match[1]
    }

    return (
      (name ? (`<${classify(name)}>`) : '<Anonymous>') +
      (file && includeFile !== false ? (` at ${file}`) : '')
    )
  }

  var formatLocation = function (str) {
    if (str === '<Anonymous>') {
      str += ' - use the "name" option for better debugging messages.'
    }
    return (`\n(found in ${str})`)
  }
}

/*  */


let uid$1 = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
const Dep = function Dep() {
  this.id = uid$1++
  this.subs = []
}

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub)
}

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub)
}

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
}

Dep.prototype.notify = function notify() {
  // stablize the subscriber list first
  const subs = this.subs.slice()
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null
const targetStack = []

function pushTarget(_target) {
  if (Dep.target) { targetStack.push(Dep.target) }
  Dep.target = _target
}

function popTarget() {
  Dep.target = targetStack.pop()
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto); [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach((method) => {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator() {
    const arguments$1 = arguments

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    let i = arguments.length
    const args = new Array(i)
    while (i--) {
      args[i] = arguments$1[i]
    }
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
        inserted = args
        break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) { ob.observeArray(inserted) }
    // notify change
    ob.dep.notify()
    return result
  })
})

/*  */

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
const observerState = {
  shouldConvert: true,
  isSettingProps: false
}

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
const Observer = function Observer(value) {
  this.value = value
  this.dep = new Dep()
  this.vmCount = 0
  def(value, '__ob__', this)
  if (Array.isArray(value)) {
    const augment = hasProto
      ? protoAugment
      : copyAugment
    augment(value, arrayMethods, arrayKeys)
    this.observeArray(value)
  } else {
    this.walk(value)
  }
}

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]])
  }
}

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (let i = 0, l = items.length; i < l; i++) {
    observe(items[i])
  }
}

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value)) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1(
  obj,
  key,
  val,
  customSetter
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set

  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key)
    obj.splice(key, 1, val)
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val
    return
  }
  const ob = obj.__ob__
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return
  }
  if (!ob) {
    obj[key] = val
    return
  }
  defineReactive$$1(ob.value, key, val)
  ob.dep.notify()
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(obj, key) {
  if (Array.isArray(obj)) {
    obj.splice(key, 1)
    return
  }
  const ob = obj.__ob__
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (let e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
const strats = config.optionMergeStrategies

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        `option "${key}" can only be used during instance ` +
        'creation with the `new` keyword.'
      )
    }
    return defaultStrat(parent, child)
  }
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) { return to }
  let key,
toVal,
fromVal
  const keys = Object.keys(from)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn() {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      }
        return defaultData
    }
  }
}

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach((hook) => {
  strats[hook] = mergeHook
})

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal) {
  const res = Object.create(parentVal || null)
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach((type) => {
  strats[`${type}s`] = mergeAssets
})

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  const ret = {}
  extend(ret, parentVal)
  for (const key in childVal) {
    let parent = ret[key]
    const child = childVal[key]
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child]
  }
  return ret
}

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  const ret = Object.create(null)
  extend(ret, parentVal)
  extend(ret, childVal)
  return ret
}

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
}

/**
 * Validate component names
 */
function checkComponents(options) {
  for (const key in options.components) {
    const lower = key.toLowerCase()
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        `${'Do not use built-in or reserved HTML elements as component ' +
        'id: '}${key}`
      )
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options) {
  const props = options.props
  if (!props) { return }
  const res = {}
  let i,
val,
name
  if (Array.isArray(props)) {
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        name = camelize(val)
        res[name] = { type: null }
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.')
      }
    }
  } else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  }
  options.props = res
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  const dirs = options.directives
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key]
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def }
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }
  normalizeProps(child)
  normalizeDirectives(child)
  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      let mixin = child.mixins[i]
      if (mixin.prototype instanceof Vue$2) {
        mixin = mixin.options
      }
      parent = mergeOptions(parent, mixin, vm)
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField(key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  const assets = options[type]
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  const camelizedId = camelize(id)
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  const PascalCaseId = capitalize(camelizedId)
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      `Failed to resolve ${type.slice(0, -1)}: ${id}`,
      options
    )
  }
  return res
}

/*  */

function validateProp(
  key,
  propOptions,
  propsData,
  vm
) {
  const prop = propOptions[key]
  const absent = !hasOwn(propsData, key)
  let value = propsData[key]
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key)
    // since the default value is a fresh copy,
    // make sure to observe it.
    const prevShouldConvert = observerState.shouldConvert
    observerState.shouldConvert = true
    observe(value)
    observerState.shouldConvert = prevShouldConvert
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent)
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  const def = prop.default
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      `Invalid default value for prop "${key}": ` +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    )
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      `Missing required prop: "${name}"`,
      vm
    )
    return
  }
  if (value == null && !prop.required) {
    return
  }
  let type = prop.type
  let valid = !type || type === true
  const expectedTypes = []
  if (type) {
    if (!Array.isArray(type)) {
      type = [type]
    }
    for (let i = 0; i < type.length && !valid; i++) {
      const assertedType = assertType(value, type[i])
      expectedTypes.push(assertedType.expectedType || '')
      valid = assertedType.valid
    }
  }
  if (!valid) {
    warn(
      `Invalid prop: type check failed for prop "${name}".` +
      ` Expected ${expectedTypes.map(capitalize).join(', ')
      }, got ${Object.prototype.toString.call(value).slice(8, -1)}.`,
      vm
    )
    return
  }
  const validator = prop.validator
  if (validator) {
    if (!validator(value)) {
      warn(
        `Invalid prop: custom validator check failed for prop "${name}".`,
        vm
      )
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType(value, type) {
  let valid
  let expectedType = getType(type)
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string')
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number')
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean')
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function')
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value)
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value)
  } else {
    valid = value instanceof type
  }
  return {
    valid,
    expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match && match[1]
}

function isType(type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (let i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

function handleError(err, vm, type) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, type)
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn((`Error in ${type}:`), vm)
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err)
    } else {
      throw err
    }
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

let initProxy

if (process.env.NODE_ENV !== 'production') {
  const allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  )

  const warnNonPresent = function (target, key) {
    warn(
      `Property or method "${key}" is not defined on the instance but ` +
      'referenced during render. Make sure to declare reactive data ' +
      'properties in the data option.',
      target
    )
  }

  const hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/)

  if (hasProxy) {
    const isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta')
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn((`Avoid overwriting built-in modifier in config.keyCodes: .${key}`))
          return false
        }
          target[key] = value
          return true
      }
    })
  }

  const hasHandler = {
    has: function has(target, key) {
      const has = key in target
      const isAllowed = allowedGlobals(key) || key.charAt(0) === '_'
      if (!has && !isAllowed) {
        warnNonPresent(target, key)
      }
      return has || !isAllowed
    }
  }

  const getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key)
      }
      return target[key]
    }
  }

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      const options = vm.$options
      const handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler
      vm._renderProxy = new Proxy(vm, handlers)
    } else {
      vm._renderProxy = vm
    }
  }
}

/*  */

const VNode = function VNode(
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag
  this.data = data
  this.children = children
  this.text = text
  this.elm = elm
  this.ns = undefined
  this.context = context
  this.functionalContext = undefined
  this.key = data && data.key
  this.componentOptions = componentOptions
  this.componentInstance = undefined
  this.parent = undefined
  this.raw = false
  this.isStatic = false
  this.isRootInsert = true
  this.isComment = false
  this.isCloned = false
  this.isOnce = false
}

const prototypeAccessors = { child: {} }

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
}

Object.defineProperties(VNode.prototype, prototypeAccessors)

const createEmptyVNode = function () {
  const node = new VNode()
  node.text = ''
  node.isComment = true
  return node
}

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isCloned = true
  return cloned
}

function cloneVNodes(vnodes) {
  const res = new Array(vnodes.length)
  for (let i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i])
  }
  return res
}

/*  */

const normalizeEvent = cached((name) => {
  const once$$1 = name.charAt(0) === '~' // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name
  const capture = name.charAt(0) === '!'
  name = capture ? name.slice(1) : name
  return {
    name,
    once: once$$1,
    capture
  }
})

function createFnInvoker(fns) {
  function invoker() {
    const arguments$1 = arguments

    const fns = invoker.fns
    if (Array.isArray(fns)) {
      for (let i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1)
      }
    } else {
      // return handler return value for single handlers
      return fns(...arguments)
    }
  }
  invoker.fns = fns
  return invoker
}

function updateListeners(
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  let name,
cur,
old,
event
  for (name in on) {
    cur = on[name]
    old = oldOn[name]
    event = normalizeEvent(name)
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn(
        `Invalid handler for event "${event.name}": got ${String(cur)}`,
        vm
      )
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur)
      }
      add(event.name, cur, event.once, event.capture)
    } else if (cur !== old) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name)
      remove$$1(event.name, oldOn[name], event.capture)
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  let invoker
  const oldHook = def[hookKey]

  function wrappedHook() {
    hook.apply(this, arguments)
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook)
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook])
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook
      invoker.fns.push(wrappedHook)
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook])
    }
  }

  invoker.merged = true
  def[hookKey] = invoker
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constrcuts that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren(children, nestedIndex) {
  const res = []
  let i,
c,
last
  for (i = 0; i < children.length; i++) {
    c = children[i]
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1]
    //  nested
    if (Array.isArray(c)) {
      res.push(...normalizeArrayChildren(c, (`${nestedIndex || ''}_${i}`)))
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c)
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c))
      }
    } else if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text)
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = `__vlist${nestedIndex}_${i}__`
        }
        res.push(c)
      }
  }
  return res
}

/*  */

function getFirstComponentChild(children) {
  return children && children.filter(c => c && c.componentOptions)[0]
}

/*  */

function initEvents(vm) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

let target

function add(event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn)
  } else {
    target.$on(event, fn)
  }
}

function remove$1(event, fn) {
  target.$off(event, fn)
}

function updateComponentListeners(
  vm,
  listeners,
  oldListeners
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm)
}

function eventsMixin(Vue) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event, fn) {
    const this$1 = this

    const vm = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }

  Vue.prototype.$once = function (event, fn) {
    const vm = this
    function on() {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
  }

  Vue.prototype.$off = function (event, fn) {
    const vm = this
    // all
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null
      return vm
    }
    // specific handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

  Vue.prototype.$emit = function (event) {
    const vm = this
    let cbs = vm._events[event]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args)
      }
    }
    return vm
  }
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(
  children,
  context
) {
  const slots = {}
  if (!children) {
    return slots
  }
  const defaultSlot = []
  let name,
child
  for (let i = 0, l = children.length; i < l; i++) {
    child = children[i]
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      const slot = (slots[name] || (slots[name] = []))
      if (child.tag === 'template') {
        slot.push(...child.children)
      } else {
        slot.push(child)
      }
    } else {
      defaultSlot.push(child)
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot
  }
  return slots
}

function resolveScopedSlots(
  fns
) {
  const res = {}
  for (let i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1]
  }
  return res
}

/*  */

let activeInstance = null

function initLifecycle(vm) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    const vm = this
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      )
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  }

  Vue.prototype.$forceUpdate = function () {
    const vm = this
    if (vm._watcher) {
      vm._watcher.update()
    }
  }

  Vue.prototype.$destroy = function () {
    const vm = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    // remove self from parent
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook...
    vm._isDestroyed = true
    callHook(vm, 'destroyed')
    // turn off all instance listeners.
    vm.$off()
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null)
  }
}

function mountComponent(
  vm,
  el,
  hydrating
) {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'option is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
    updateComponent = function () {
      const name = vm._name
      const startTag = `start ${name}`
      const endTag = `end ${name}`
      perf.mark(startTag)
      const vnode = vm._render()
      perf.mark(endTag)
      perf.measure((`${name} render`), startTag, endTag)
      perf.mark(startTag)
      vm._update(vnode, hydrating)
      perf.mark(endTag)
      perf.measure((`${name} patch`), startTag, endTag)
    }
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating)
    }
  }

  vm._watcher = new Watcher(vm, updateComponent, noop)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}

function updateChildComponent(
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  const hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  )

  vm.$options._parentVnode = parentVnode
  vm.$vnode = parentVnode // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode
  }
  vm.$options._renderChildren = renderChildren

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = true
    }
    const props = vm._props
    const propKeys = vm.$options._propKeys || []
    for (let i = 0; i < propKeys.length; i++) {
      const key = propKeys[i]
      props[key] = validateProp(key, vm.$options.props, propsData, vm)
    }
    observerState.shouldConvert = true
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = false
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData
  }
  // update listeners
  if (listeners) {
    const oldListeners = vm.$options._parentListeners
    vm.$options._parentListeners = listeners
    updateComponentListeners(vm, listeners, oldListeners)
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context)
    vm.$forceUpdate()
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false
    for (let i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i])
    }
    callHook(vm, 'activated')
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true
    for (let i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i])
    }
    callHook(vm, 'deactivated')
  }
}

function callHook(vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        handleError(e, vm, (`${hook} hook`))
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit(`hook:${hook}`)
  }
}

/*  */


const queue = []
let has = {}
let circular = {}
let waiting = false
let flushing = false
let index = 0

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  queue.length = 0
  has = {}
  if (process.env.NODE_ENV !== 'production') {
    circular = {}
  }
  waiting = flushing = false
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true
  let watcher,
id,
vm

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    has[id] = null
    watcher.run()
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > config._maxUpdateCount) {
        warn(
          `You may have an infinite update loop ${
            watcher.user
              ? (`in watcher with expression "${watcher.expression}"`)
              : 'in a component render function.'}`,
          watcher.vm
        )
        break
      }
    }
  }

  // call updated hooks
  index = queue.length
  while (index--) {
    watcher = queue[index]
    vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated')
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }

  resetSchedulerState()
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i >= 0 && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}

/*  */

let uid$2 = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm
  vm._watchers.push(this)
  // options
  if (options) {
    this.deep = !!options.deep
    this.user = !!options.user
    this.lazy = !!options.lazy
    this.sync = !!options.sync
  } else {
    this.deep = this.user = this.lazy = this.sync = false
  }
  this.cb = cb
  this.id = ++uid$2 // uid for batching
  this.active = true
  this.dirty = this.lazy // for lazy watchers
  this.deps = []
  this.newDeps = []
  this.depIds = new _Set()
  this.newDepIds = new _Set()
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : ''
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn
  } else {
    this.getter = parsePath(expOrFn)
    if (!this.getter) {
      this.getter = function () {}
      process.env.NODE_ENV !== 'production' && warn(
        `Failed watching path: "${expOrFn}" ` +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      )
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get()
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this)
  let value
  const vm = this.vm
  if (this.user) {
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      handleError(e, vm, (`getter for watcher "${this.expression}"`))
    }
  } else {
    value = this.getter.call(vm, vm)
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value)
  }
  popTarget()
  this.cleanupDeps()
  return value
}

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  const id = dep.id
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id)
    this.newDeps.push(dep)
    if (!this.depIds.has(id)) {
      dep.addSub(this)
    }
  }
}

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
    const this$1 = this

  let i = this.deps.length
  while (i--) {
    const dep = this$1.deps[i]
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1)
    }
  }
  let tmp = this.depIds
  this.depIds = this.newDepIds
  this.newDepIds = tmp
  this.newDepIds.clear()
  tmp = this.deps
  this.deps = this.newDeps
  this.newDeps = tmp
  this.newDeps.length = 0
}

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)
  }
}

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    const value = this.get()
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      const oldValue = this.value
      this.value = value
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue)
        } catch (e) {
          handleError(e, this.vm, (`callback for watcher "${this.expression}"`))
        }
      } else {
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }
}

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get()
  this.dirty = false
}

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
    const this$1 = this

  let i = this.deps.length
  while (i--) {
    this$1.deps[i].depend()
  }
}

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
    const this$1 = this

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this)
    }
    let i = this.deps.length
    while (i--) {
      this$1.deps[i].removeSub(this$1)
    }
    this.active = false
  }
}

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
const seenObjects = new _Set()
function traverse(val) {
  seenObjects.clear()
  _traverse(val, seenObjects)
}

function _traverse(val, seen) {
  let i,
keys
  const isA = Array.isArray(val)
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    const depId = val.__ob__.dep.id
    if (seen.has(depId)) {
      return
    }
    seen.add(depId)
  }
  if (isA) {
    i = val.length
    while (i--) { _traverse(val[i], seen) }
  } else {
    keys = Object.keys(val)
    i = keys.length
    while (i--) { _traverse(val[keys[i]], seen) }
  }
}

/*  */

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function initState(vm) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) { initProps(vm, opts.props) }
  if (opts.methods) { initMethods(vm, opts.methods) }
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) { initComputed(vm, opts.computed) }
  if (opts.watch) { initWatch(vm, opts.watch) }
}

const isReservedProp = { key: 1, ref: 1, slot: 1 }

function initProps(vm, propsOptions) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  observerState.shouldConvert = isRoot
  const loop = function (key) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key]) {
        warn(
          (`"${key}" is a reserved attribute and cannot be used as component prop.`),
          vm
        )
      }
      defineReactive$$1(props, key, value, () => {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            `${'Avoid mutating a prop directly since the value will be ' +
            'overwritten whenever the parent component re-renders. ' +
            "Instead, use a data or computed property based on the prop's " +
            'value. Prop being mutated: "'}${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive$$1(props, key, value)
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, '_props', key)
    }
  }

  for (const key in propsOptions) loop(key)
  observerState.shouldConvert = true
}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  let i = keys.length
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${keys[i]}" is already declared as a prop. ` +
        'Use prop default value instead.',
        vm
      )
    } else if (!isReserved(keys[i])) {
      proxy(vm, '_data', keys[i])
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}

const computedWatcherOptions = { lazy: true }

function initComputed(vm, computed) {
  const watchers = vm._computedWatchers = Object.create(null)

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    }
  }
}

function defineComputed(target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

function initMethods(vm, methods) {
  const props = vm.$options.props
  for (const key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          `method "${key}" has an undefined value in the component definition. ` +
          'Did you reference the function correctly?',
          vm
        )
      }
      if (props && hasOwn(props, key)) {
        warn(
          (`method "${key}" has already been defined as a prop.`),
          vm
        )
      }
    }
  }
}

function initWatch(vm, watch) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm, key, handler) {
  let options
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  vm.$watch(key, handler, options)
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn('$props is readonly.', this)
    }
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    const vm = this
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      cb.call(vm, watcher.value)
    }
    return function unwatchFn() {
      watcher.teardown()
    }
  }
}

/*  */

const hooks = { init, prepatch, insert, destroy }
const hooksToMerge = Object.keys(hooks)

function createComponent(
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  const baseCtor = context.$options._base
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn((`Invalid Component definition: ${String(Ctor)}`), context)
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, () => {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate()
      })
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor)

  data = data || {}

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data)
  }

  // extract props
  const propsData = extractProps(data, Ctor)

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  const listeners = data.on
  // replace with listeners with .native modifier
  data.on = data.nativeOn

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {}
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data)

  // return a placeholder vnode
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    (`vue-component-${Ctor.cid}${name ? (`-${name}`) : ''}`),
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children }
  )
  return vnode
}

function createFunctionalComponent(
  Ctor,
  propsData,
  data,
  context,
  children
) {
  const props = {}
  const propOptions = Ctor.options.props
  if (propOptions) {
    for (const key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData)
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  const _context = Object.create(context)
  const h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true) }
  const vnode = Ctor.options.render.call(null, h, {
    props,
    data,
    parent: context,
    children,
    slots() { return resolveSlots(children, context) }
  })
  if (vnode instanceof VNode) {
    vnode.functionalContext = context
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot
    }
  }
  return vnode
}

function createComponentInstanceForVnode(
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  const vnodeComponentOptions = vnode.componentOptions
  const options = {
    _isComponent: true,
    parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  }
  // check inline-template render functions
  const inlineTemplate = vnode.data.inlineTemplate
  if (inlineTemplate) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init(
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    const child = vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    )
    child.$mount(hydrating ? vnode.elm : undefined, hydrating)
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    const mountedNode = vnode // work around flow
    prepatch(mountedNode, mountedNode)
  }
}

function prepatch(
  oldVnode,
  vnode
) {
  const options = vnode.componentOptions
  const child = vnode.componentInstance = oldVnode.componentInstance
  updateChildComponent(
    child,
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  )
}

function insert(vnode) {
  if (!vnode.componentInstance._isMounted) {
    vnode.componentInstance._isMounted = true
    callHook(vnode.componentInstance, 'mounted')
  }
  if (vnode.data.keepAlive) {
    activateChildComponent(vnode.componentInstance, true /* direct */)
  }
}

function destroy(vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy()
    } else {
      deactivateChildComponent(vnode.componentInstance, true /* direct */)
    }
  }
}

function resolveAsyncComponent(
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb)
  } else {
    factory.requested = true
    const cbs = factory.pendingCallbacks = [cb]
    let sync = true

    const resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res)
      }
      // cache resolved
      factory.resolved = res
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (let i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res)
        }
      }
    }

    const reject = function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        `Failed to resolve async component: ${String(factory)
        }${reason ? (`\nReason: ${reason}`) : ''}`
      )
    }

    const res = factory(resolve, reject)

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject)
    }

    sync = false
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps(data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  const propOptions = Ctor.options.props
  if (!propOptions) {
    return
  }
  const res = {}
  const attrs = data.attrs
  const props = data.props
  const domProps = data.domProps
  if (attrs || props || domProps) {
    for (const key in propOptions) {
      const altKey = hyphenate(key)
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey)
    }
  }
  return res
}

function checkProp(
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key]
      if (!preserve) {
        delete hash[key]
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey]
      if (!preserve) {
        delete hash[altKey]
      }
      return true
    }
  }
  return false
}

function mergeHooks(data) {
  if (!data.hook) {
    data.hook = {}
  }
  for (let i = 0; i < hooksToMerge.length; i++) {
    const key = hooksToMerge[i]
    const fromParent = data.hook[key]
    const ours = hooks[key]
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours
  }
}

function mergeHook$1(one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d)
    two(a, b, c, d)
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  const prop = (options.model && options.model.prop) || 'value'
  const event = (options.model && options.model.event) || 'input'; (data.props || (data.props = {}))[prop] = data.model.value
  const on = data.on || (data.on = {})
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event])
  } else {
    on[event] = data.model.callback
  }
}

/*  */

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement(
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
      'Always create fresh vnode data objects in each render!',
      context
    )
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode,
ns
  if (typeof tag === 'string') {
    let Ctor
    ns = config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns) }
    return vnode
  }
    return createEmptyVNode()
}

function applyNS(vnode, ns) {
  vnode.ns = ns
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (let i = 0, l = vnode.children.length; i < l; i++) {
      const child = vnode.children[i]
      if (child.tag && !child.ns) {
        applyNS(child, ns)
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(
  val,
  render
) {
  let ret,
i,
l,
keys,
key
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length)
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i)
    }
  } else if (typeof val === 'number') {
    ret = new Array(val)
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i)
    }
  } else if (isObject(val)) {
    keys = Object.keys(val)
    ret = new Array(keys.length)
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i]
      ret[i] = render(val[key], key, i)
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(
  name,
  fallback,
  props,
  bindObject
) {
  const scopedSlotFn = this.$scopedSlots[name]
  if (scopedSlotFn) { // scoped slot
    props = props || {}
    if (bindObject) {
      extend(props, bindObject)
    }
    return scopedSlotFn(props) || fallback
  }
    const slotNodes = this.$slots[name]
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        `Duplicate presence of slot "${name}" found in the same render tree ` +
        '- this will likely cause render errors.',
        this
      )
      slotNodes._rendered = true
    }
    return slotNodes || fallback
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes(
  eventKeyCode,
  key,
  builtInAlias
) {
  const keyCodes = config.keyCodes[key] || builtInAlias
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  }
    return keyCodes !== eventKeyCode
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      )
    } else {
      if (Array.isArray(value)) {
        value = toObject(value)
      }
      for (const key in value) {
        if (key === 'class' || key === 'style') {
          data[key] = value[key]
        } else {
          const type = data.attrs && data.attrs.type
          const hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {})
          hash[key] = value[key]
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(
  index,
  isInFor
) {
  let tree = this._staticTrees[index]
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy)
  markStatic(tree, (`__static__${index}`), false)
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(
  tree,
  index,
  key
) {
  markStatic(tree, (`__once__${index}${key ? (`_${key}`) : ''}`), true)
  return tree
}

function markStatic(
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (`${key}_${i}`), isOnce)
      }
    }
  } else {
    markStaticNode(tree, key, isOnce)
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true
  node.key = key
  node.isOnce = isOnce
}

/*  */

function initRender(vm) {
  vm.$vnode = null // the placeholder node in parent tree
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null
  const parentVnode = vm.$options._parentVnode
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false) }
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true) }
}

function renderMixin(Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  }

  Vue.prototype._render = function () {
    const vm = this
    const ref = vm.$options
    const render = ref.render
    const staticRenderFns = ref.staticRenderFns
    const _parentVnode = ref._parentVnode

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (const key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key])
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = []
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode
    // render self
    let vnode
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, 'render function')
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode
      } else {
        vnode = vm._vnode
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        )
      }
      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce
  Vue.prototype._n = toNumber
  Vue.prototype._s = _toString
  Vue.prototype._l = renderList
  Vue.prototype._t = renderSlot
  Vue.prototype._q = looseEqual
  Vue.prototype._i = looseIndexOf
  Vue.prototype._m = renderStatic
  Vue.prototype._f = resolveFilter
  Vue.prototype._k = checkKeyCodes
  Vue.prototype._b = bindObjectProps
  Vue.prototype._v = createTextVNode
  Vue.prototype._e = createEmptyVNode
  Vue.prototype._u = resolveScopedSlots
}

/*  */

function initInjections(vm) {
  const provide = vm.$options.provide
  const inject = vm.$options.inject
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    const isArray = Array.isArray(inject)
    const keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const provideKey = isArray ? key : inject[key]
      let source = vm
      while (source) {
        if (source._provided && source._provided[provideKey]) {
          vm[key] = source._provided[provideKey]
          break
        }
        source = source.$parent
      }
    }
  }
}

/*  */

let uid = 0

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
      perf.mark('init')
    }

    const vm = this
    // a uid
    vm._uid = uid++
    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initState(vm)
    initInjections(vm)
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
      vm._name = formatComponentName(vm, false)
      perf.mark('init end')
      perf.measure((`${vm._name} init`), 'init', 'init end')
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

function initInternalComponent(vm, options) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent
  opts.propsData = options.propsData
  opts._parentVnode = options._parentVnode
  opts._parentListeners = options._parentListeners
  opts._renderChildren = options._renderChildren
  opts._componentTag = options._componentTag
  opts._parentElm = options._parentElm
  opts._refElm = options._refElm
  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

function resolveConstructorOptions(Ctor) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions(Ctor) {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {} }
      modified[key] = dedupe(latest[key], sealed[key])
    }
  }
  return modified
}

function dedupe(latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    const res = []
    sealed = Array.isArray(sealed) ? sealed : [sealed]
    for (let i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i])
      }
    }
    return res
  }
    return latest
}

function Vue$2(options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$2)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue$2)
stateMixin(Vue$2)
eventsMixin(Vue$2)
lifecycleMixin(Vue$2)
renderMixin(Vue$2)

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install(...args)
    } else if (typeof plugin === 'function') {
      plugin(...args)
    }
    plugin.installed = true
    return this
  }
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin)
  }
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0
  let cid = 1

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          `Invalid component name: "${name}". Component names ` +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        )
      }
    }

    const Sub = function VueComponent(options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub.super = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub)
    }
    if (Sub.options.computed) {
      initComputed$1(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach((type) => {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
  }
}

function initProps$1(Comp) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, '_props', key)
  }
}

function initComputed$1(Comp) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach((type) => {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[`${type}s`][id]
      }
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              `${'Do not use built-in or reserved HTML elements as component ' +
              'id: '}${id}`
            )
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[`${type}s`][id] = definition
        return definition
    }
  })
}

/*  */

const patternTypes = [String, RegExp]

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches(pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (pattern instanceof RegExp) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache(cache, filter) {
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode)
        cache[key] = null
      }
    }
  }
}

function pruneCacheEntry(vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated')
    }
    vnode.componentInstance.$destroy()
  }
}

const KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created() {
    this.cache = Object.create(null)
  },

  destroyed: function destroyed() {
    const this$1 = this

    for (const key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key])
    }
  },

  watch: {
    include: function include(val) {
      pruneCache(this.cache, name => matches(val, name))
    },
    exclude: function exclude(val) {
      pruneCache(this.cache, name => !matches(val, name))
    }
  },

  render: function render() {
    const vnode = getFirstComponentChild(this.$slots.default)
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name = getComponentName(componentOptions)
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      const key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? (`::${componentOptions.tag}`) : '')
        : vnode.key
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance
      } else {
        this.cache[key] = vnode
      }
      vnode.data.keepAlive = true
    }
    return vnode
  }
}

const builtInComponents = {
  KeepAlive
}

/*  */

function initGlobalAPI(Vue) {
  // config
  const configDef = {}
  configDef.get = function () { return config }
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive: defineReactive$$1
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)
  config._assetTypes.forEach((type) => {
    Vue.options[`${type}s`] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin$1(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}

initGlobalAPI(Vue$2)

Object.defineProperty(Vue$2.prototype, '$isServer', {
  get: isServerRendering
})

Vue$2.version = '2.2.1'

/*  */

// attributes that should be using props for binding
const acceptValue = makeMap('input,textarea,option,select')
const mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}

const isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck')

const isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
)

const xlinkNS = 'http://www.w3.org/1999/xlink'

const isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
}

const getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
}

const isFalsyAttrValue = function (val) {
  return val == null || val === false
}

/*  */

function genClassForVnode(vnode) {
  let data = vnode.data
  let parentNode = vnode
  let childNode = vnode
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode
    if (childNode.data) {
      data = mergeClassData(childNode.data, data)
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data)
    }
  }
  return genClassFromData(data)
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData(data) {
  const dynamicClass = data.class
  const staticClass = data.staticClass
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat(a, b) {
  return a ? b ? (`${a} ${b}`) : a : (b || '')
}

function stringifyClass(value) {
  let res = ''
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    let stringified
    for (let i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += `${stringified} `
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (const key in value) {
      if (value[key]) { res += `${key} ` }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

const namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
}

const isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
)

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
const isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
)


const isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
}

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

const unknownElementCache = Object.create(null)
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase()
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  const el = document.createElement(tag)
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  }
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        `Cannot find element: ${el}`
      )
      return document.createElement('div')
    }
    return selected
  }
    return el
}

/*  */

function createElement$1(tagName, vnode) {
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode(text) {
  return document.createTextNode(text)
}

function createComment(text) {
  return document.createComment(text)
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode)
}

function removeChild(node, child) {
  node.removeChild(child)
}

function appendChild(node, child) {
  node.appendChild(child)
}

function parentNode(node) {
  return node.parentNode
}

function nextSibling(node) {
  return node.nextSibling
}

function tagName(node) {
  return node.tagName
}

function setTextContent(node, text) {
  node.textContent = text
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val)
}


const nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS,
	createTextNode,
	createComment,
	insertBefore,
	removeChild,
	appendChild,
	parentNode,
	nextSibling,
	tagName,
	setTextContent,
	setAttribute
})

/*  */

const ref = {
  create: function create(_, vnode) {
    registerRef(vnode)
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true)
      registerRef(vnode)
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true)
  }
}

function registerRef(vnode, isRemoval) {
  const key = vnode.data.ref
  if (!key) { return }

  const vm = vnode.context
  const ref = vnode.componentInstance || vnode.elm
  const refs = vm.$refs
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref)
    } else if (refs[key] === ref) {
      refs[key] = undefined
    }
  } else if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref)
      } else {
        refs[key] = [ref]
      }
    } else {
      refs[key] = ref
    }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

const emptyNode = new VNode('', {}, [])

const hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy']

function isUndef(s) {
  return s == null
}

function isDef(s) {
  return s != null
}

function sameVnode(vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i,
key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) { map[key] = i }
  }
  return map
}

function createPatchFunction(backend) {
  let i,
j
  const cbs = {}

  const modules = backend.modules
  const nodeOps = backend.nodeOps

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]) }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm)
      }
    }
    remove$$1.listeners = listeners
    return remove$$1
  }

  function removeNode(el) {
    const parent = nodeOps.parentNode(el)
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el)
    }
  }

  let inPre = 0
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            `Unknown custom element: <${tag}> - did you ` +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          )
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode)
      setScope(vnode)

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue)
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue)
        }
        insert(parentElm, vnode.elm, refElm)
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
      const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm)
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue)
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
        }
        return true
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push(...vnode.data.pendingInsert)
    }
    vnode.elm = vnode.componentInstance.$el
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue)
      setScope(vnode)
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode)
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode)
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    let i
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    let innerNode = vnode
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode)
        }
        insertedVnodeQueue.push(innerNode)
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm)
  }

  function insert(parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref)
      } else {
        nodeOps.appendChild(parent, elm)
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true)
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (let i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode)
    }
    i = vnode.data.hook // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode) }
      if (i.insert) { insertedVnodeQueue.push(vnode) }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    let i
    let ancestor = vnode
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '')
      }
      ancestor = ancestor.parent
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '')
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm)
    }
  }

  function invokeDestroyHook(vnode) {
    let i,
j
    const data = vnode.data
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode) }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode) }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j])
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch)
          invokeDestroyHook(ch)
        } else { // Text node
          removeNode(ch.elm)
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (rm || isDef(vnode.data)) {
      const listeners = cbs.remove.length + 1
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners)
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm)
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm)
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm)
      } else {
        rm()
      }
    } else {
      removeNode(vnode.elm)
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx,
idxInOld,
elmToMove,
refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } else {
          elmToMove = oldCh[idxInOld]
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            )
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm
      vnode.componentInstance = oldVnode.componentInstance
      return
    }
    let i
    const data = vnode.data
    const hasData = isDef(data)
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode)
    }
    const elm = vnode.elm = oldVnode.elm
    const oldCh = oldVnode.children
    const ch = vnode.children
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode) }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode) }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly) }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, '') }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode) }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue
    } else {
      for (let i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i])
      }
    }
  }

  let bailed = false
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  const isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key')

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm
    const tag = vnode.tag
    const data = vnode.data
    const children = vnode.children
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */) }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue)
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue)
        } else {
          let childrenMatch = true
          let childNode = elm.firstChild
          for (let i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false
              break
            }
            childNode = childNode.nextSibling
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true
              console.warn('Parent: ', elm)
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children)
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (const key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue)
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text
    }
    return true
  }

  function assertNodeMatch(node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    }
      return node.nodeType === (vnode.isComment ? 8 : 3)
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode) }
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue, parentElm, refElm)
    } else {
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered')
            hydrating = true
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              )
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode)
        }
        // replacing existing element
        const oldElm = oldVnode.elm
        const parentElm$1 = nodeOps.parentNode(oldElm)
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        )

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          let ancestor = vnode.parent
          while (ancestor) {
            ancestor.elm = vnode.elm
            ancestor = ancestor.parent
          }
          if (isPatchable(vnode)) {
            for (let i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent)
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode)
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
}

/*  */

const directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode)
  }
}

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode)
  }
}

function _update(oldVnode, vnode) {
  const isCreate = oldVnode === emptyNode
  const isDestroy = vnode === emptyNode
  const oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context)
  const newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context)

  const dirsWithInsert = []
  const dirsWithPostpatch = []

  let key,
oldDir,
dir
  for (key in newDirs) {
    oldDir = oldDirs[key]
    dir = newDirs[key]
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode)
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir)
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value
      callHook$1(dir, 'update', vnode, oldVnode)
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir)
      }
    }
  }

  if (dirsWithInsert.length) {
    const callInsert = function () {
      for (let i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode)
      }
    }
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert)
    } else {
      callInsert()
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', () => {
      for (let i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode)
      }
    })
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy)
      }
    }
  }
}

const emptyModifiers = Object.create(null)

function normalizeDirectives$1(
  dirs,
  vm
) {
  const res = Object.create(null)
  if (!dirs) {
    return res
  }
  let i,
dir
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i]
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers
    }
    res[getRawDirName(dir)] = dir
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true)
  }
  return res
}

function getRawDirName(dir) {
  return dir.rawName || (`${dir.name}.${Object.keys(dir.modifiers || {}).join('.')}`)
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  const fn = dir.def && dir.def[hook]
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy)
  }
}

const baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs(oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  let key,
cur,
old
  const elm = vnode.elm
  const oldAttrs = oldVnode.data.attrs || {}
  let attrs = vnode.data.attrs || {}
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs)
  }

  for (key in attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    if (old !== cur) {
      setAttr(elm, key, cur)
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value)
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key))
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key)
      }
    }
  }
}

function setAttr(el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, key)
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true')
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key))
    } else {
      el.setAttributeNS(xlinkNS, key, value)
    }
  } else if (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, value)
    }
}

const attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass(oldVnode, vnode) {
  const el = vnode.elm
  const data = vnode.data
  const oldData = oldVnode.data
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  let cls = genClassForVnode(vnode)

  // handle transition classes
  const transitionClass = el._transitionClasses
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass))
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls)
    el._prevClass = cls
  }
}

const klass = {
  create: updateClass,
  update: updateClass
}

/*  */

const validDivisionCharRE = /[\w).+\-_$\]]/


function wrapFilter(exp, filter) {
  const i = filter.indexOf('(')
  if (i < 0) {
    // _f: resolveFilter
    return (`_f("${filter}")(${exp})`)
  }
    const name = filter.slice(0, i)
    const args = filter.slice(i + 1)
    return (`_f("${name}")(${exp},${args}`)
}

/*  */

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */


/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

let str
let index$1

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
const RANGE_TOKEN = '__r'
const CHECKBOX_RADIO_TOKEN = '__c'

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  let event
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input'
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || [])
    delete on[RANGE_TOKEN]
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change'
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || [])
    delete on[CHECKBOX_RADIO_TOKEN]
  }
}

let target$1

function add$1(
  event,
  handler,
  once,
  capture
) {
  if (once) {
    const oldHandler = handler
    const _target = target$1 // save current target element in closure
    handler = function (ev) {
      const res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler(...arguments)
      if (res !== null) {
        remove$2(event, handler, capture, _target)
      }
    }
  }
  target$1.addEventListener(event, handler, capture)
}

function remove$2(
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture)
}

function updateDOMListeners(oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  target$1 = vnode.elm
  normalizeEvents(on)
  updateListeners(on, oldOn, add$1, remove$2, vnode.context)
}

const events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps(oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  let key,
cur
  const elm = vnode.elm
  const oldProps = oldVnode.data.domProps || {}
  let props = vnode.data.domProps || {}
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props)
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = ''
    }
  }
  for (key in props) {
    cur = props[key]
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0 }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur
      // avoid resetting cursor position when value is the same
      const strCur = cur == null ? '' : String(cur)
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur
      }
    } else {
      elm[key] = cur
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged(elm, newVal) {
  const value = elm.value
  const modifiers = elm._vModifiers // injected by v-model runtime
  if ((modifiers && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

const domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

const parseStyleText = cached((cssText) => {
  const res = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return res
})

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  const style = normalizeStyleBinding(data.style)
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  const res = {}
  let styleData

  if (checkChild) {
    let childNode = vnode
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData)
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData)
  }

  let parentNode = vnode
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData)
    }
  }
  return res
}

/*  */

const cssVarRE = /^--/
const importantRE = /\s*!important$/
const setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val)
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important')
  } else {
    el.style[normalize(name)] = val
  }
}

const prefixes = ['Webkit', 'Moz', 'ms']

let testEl
var normalize = cached((prop) => {
  testEl = testEl || document.createElement('div')
  prop = camelize(prop)
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  const upper = prop.charAt(0).toUpperCase() + prop.slice(1)
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + upper
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
})

function updateStyle(oldVnode, vnode) {
  const data = vnode.data
  const oldData = oldVnode.data

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  let cur,
name
  const el = vnode.elm
  const oldStaticStyle = oldVnode.data.staticStyle
  const oldStyleBinding = oldVnode.data.style || {}

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  const oldStyle = oldStaticStyle || oldStyleBinding

  const style = normalizeStyleBinding(vnode.data.style) || {}

  vnode.data.style = style.__ob__ ? extend({}, style) : style

  const newStyle = getStyle(vnode, true)

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '')
    }
  }
  for (name in newStyle) {
    cur = newStyle[name]
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur)
    }
  }
}

const style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(c => el.classList.add(c))
    } else {
      el.classList.add(cls)
    }
  } else {
    const cur = ` ${el.getAttribute('class') || ''} `
    if (cur.indexOf(` ${cls} `) < 0) {
      el.setAttribute('class', (cur + cls).trim())
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(c => el.classList.remove(c))
    } else {
      el.classList.remove(cls)
    }
  } else {
    let cur = ` ${el.getAttribute('class') || ''} `
    const tar = ` ${cls} `
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ')
    }
    el.setAttribute('class', cur.trim())
  }
}

/*  */

function resolveTransition(def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    const res = {}
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'))
    }
    extend(res, def$$1)
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(name => ({
    enterClass: (`${name}-enter`),
    enterToClass: (`${name}-enter-to`),
    enterActiveClass: (`${name}-enter-active`),
    leaveClass: (`${name}-leave`),
    leaveToClass: (`${name}-leave-to`),
    leaveActiveClass: (`${name}-leave-active`)
  }))

const hasTransition = inBrowser && !isIE9
const TRANSITION = 'transition'
const ANIMATION = 'animation'

// Transition property/event sniffing
let transitionProp = 'transition'
let transitionEndEvent = 'transitionend'
let animationProp = 'animation'
let animationEndEvent = 'animationend'
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition'
    transitionEndEvent = 'webkitTransitionEnd'
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation'
    animationEndEvent = 'webkitAnimationEnd'
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
const raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout

function nextFrame(fn) {
  raf(() => {
    raf(fn)
  })
}

function addTransitionClass(el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls)
  addClass(el, cls)
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls)
  }
  removeClass(el, cls)
}

function whenTransitionEnds(
  el,
  expectedType,
  cb
) {
  const ref = getTransitionInfo(el, expectedType)
  const type = ref.type
  const timeout = ref.timeout
  const propCount = ref.propCount
  if (!type) { return cb() }
  const event = type === TRANSITION ? transitionEndEvent : animationEndEvent
  let ended = 0
  const end = function () {
    el.removeEventListener(event, onEnd)
    cb()
  }
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end()
      }
    }
  }
  setTimeout(() => {
    if (ended < propCount) {
      end()
    }
  }, timeout + 1)
  el.addEventListener(event, onEnd)
}

const transformRE = /\b(transform|all)(,|$)/

function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el)
  const transitioneDelays = styles[`${transitionProp}Delay`].split(', ')
  const transitionDurations = styles[`${transitionProp}Duration`].split(', ')
  const transitionTimeout = getTimeout(transitioneDelays, transitionDurations)
  const animationDelays = styles[`${animationProp}Delay`].split(', ')
  const animationDurations = styles[`${animationProp}Duration`].split(', ')
  const animationTimeout = getTimeout(animationDelays, animationDurations)

  let type
  let timeout = 0
  let propCount = 0
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION
      timeout = transitionTimeout
      propCount = transitionDurations.length
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION
      timeout = animationTimeout
      propCount = animationDurations.length
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout)
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0
  }
  const hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[`${transitionProp}Property`])
  return {
    type,
    timeout,
    propCount,
    hasTransform
  }
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays)
  }

  return Math.max.apply(null, durations.map((d, i) => toMs(d) + toMs(delays[i])))
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter(vnode, toggleDisplay) {
  const el = vnode.elm

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true
    el._leaveCb()
  }

  const data = resolveTransition(vnode.data.transition)
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  const css = data.css
  const type = data.type
  const enterClass = data.enterClass
  const enterToClass = data.enterToClass
  const enterActiveClass = data.enterActiveClass
  const appearClass = data.appearClass
  const appearToClass = data.appearToClass
  const appearActiveClass = data.appearActiveClass
  const beforeEnter = data.beforeEnter
  const enter = data.enter
  const afterEnter = data.afterEnter
  const enterCancelled = data.enterCancelled
  const beforeAppear = data.beforeAppear
  const appear = data.appear
  const afterAppear = data.afterAppear
  const appearCancelled = data.appearCancelled
  const duration = data.duration

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  let context = activeInstance
  let transitionNode = activeInstance.$vnode
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent
    context = transitionNode.context
  }

  const isAppear = !context._isMounted || !vnode.isRootInsert

  if (isAppear && !appear && appear !== '') {
    return
  }

  const startClass = isAppear && appearClass
    ? appearClass
    : enterClass
  const activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass
  const toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass

  const beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter
  const enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter
  const afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter
  const enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled

  const explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  )

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode)
  }

  const expectsCSS = css !== false && !isIE9
  const userWantsControl = getHookAgumentsLength(enterHook)

  var cb = el._enterCb = once(() => {
    if (expectsCSS) {
      removeTransitionClass(el, toClass)
      removeTransitionClass(el, activeClass)
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass)
      }
      enterCancelledHook && enterCancelledHook(el)
    } else {
      afterEnterHook && afterEnterHook(el)
    }
    el._enterCb = null
  })

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', () => {
      const parent = el.parentNode
      const pendingNode = parent && parent._pending && parent._pending[vnode.key]
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb()
      }
      enterHook && enterHook(el, cb)
    })
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el)
  if (expectsCSS) {
    addTransitionClass(el, startClass)
    addTransitionClass(el, activeClass)
    nextFrame(() => {
      addTransitionClass(el, toClass)
      removeTransitionClass(el, startClass)
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration)
        } else {
          whenTransitionEnds(el, type, cb)
        }
      }
    })
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay()
    enterHook && enterHook(el, cb)
  }

  if (!expectsCSS && !userWantsControl) {
    cb()
  }
}

function leave(vnode, rm) {
  const el = vnode.elm

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true
    el._enterCb()
  }

  const data = resolveTransition(vnode.data.transition)
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  const css = data.css
  const type = data.type
  const leaveClass = data.leaveClass
  const leaveToClass = data.leaveToClass
  const leaveActiveClass = data.leaveActiveClass
  const beforeLeave = data.beforeLeave
  const leave = data.leave
  const afterLeave = data.afterLeave
  const leaveCancelled = data.leaveCancelled
  const delayLeave = data.delayLeave
  const duration = data.duration

  const expectsCSS = css !== false && !isIE9
  const userWantsControl = getHookAgumentsLength(leave)

  const explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  )

  if (process.env.NODE_ENV !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode)
  }

  var cb = el._leaveCb = once(() => {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass)
      removeTransitionClass(el, leaveActiveClass)
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass)
      }
      leaveCancelled && leaveCancelled(el)
    } else {
      rm()
      afterLeave && afterLeave(el)
    }
    el._leaveCb = null
  })

  if (delayLeave) {
    delayLeave(performLeave)
  } else {
    performLeave()
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode
    }
    beforeLeave && beforeLeave(el)
    if (expectsCSS) {
      addTransitionClass(el, leaveClass)
      addTransitionClass(el, leaveActiveClass)
      nextFrame(() => {
        addTransitionClass(el, leaveToClass)
        removeTransitionClass(el, leaveClass)
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration)
          } else {
            whenTransitionEnds(el, type, cb)
          }
        }
      })
    }
    leave && leave(el, cb)
    if (!expectsCSS && !userWantsControl) {
      cb()
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      `<transition> explicit ${name} duration is not a valid number - ` +
      `got ${JSON.stringify(val)}.`,
      vnode.context
    )
  } else if (isNaN(val)) {
    warn(
      `<transition> explicit ${name} duration is NaN - ` +
      'the duration expression might be incorrect.',
      vnode.context
    )
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookAgumentsLength(fn) {
  if (!fn) { return false }
  const invokerFns = fn.fns
  if (invokerFns) {
    // invoker
    return getHookAgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  }
    return (fn._length || fn.length) > 1
}

function _enter(_, vnode) {
  if (!vnode.data.show) {
    enter(vnode)
  }
}

const transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm)
    } else {
      rm()
    }
  }
} : {}

const platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

const patch = createPatchFunction({ nodeOps, modules })

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', () => {
    const el = document.activeElement
    if (el && el.vmodel) {
      trigger(el, 'input')
    }
  })
}

const model$1 = {
  inserted: function inserted(el, binding, vnode) {
    if (vnode.tag === 'select') {
      const cb = function () {
        setSelected(el, binding, vnode.context)
      }
      cb()
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0)
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart)
          el.addEventListener('compositionend', onCompositionEnd)
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context)
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      const needReset = el.multiple
        ? binding.value.some(v => hasNoMatchingOption(v, el.options))
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options)
      if (needReset) {
        trigger(el, 'change')
      }
    }
  }
}

function setSelected(el, binding, vm) {
  const value = binding.value
  const isMultiple = el.multiple
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      `<select multiple v-model="${binding.expression}"> ` +
      `expects an Array value for its binding, but got ${Object.prototype.toString.call(value).slice(8, -1)}`,
      vm
    )
    return
  }
  let selected,
option
  for (let i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i]
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1
      if (option.selected !== selected) {
        option.selected = selected
      }
    } else if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i
        }
        return
      }
  }
  if (!isMultiple) {
    el.selectedIndex = -1
  }
}

function hasNoMatchingOption(value, options) {
  for (let i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue(option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart(e) {
  e.target.composing = true
}

function onCompositionEnd(e) {
  e.target.composing = false
  trigger(e.target, 'input')
}

function trigger(el, type) {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

const show = {
  bind: function bind(el, ref, vnode) {
    const value = ref.value

    vnode = locateNode(vnode)
    const transition = vnode.data && vnode.data.transition
    const originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display
    if (value && transition && !isIE9) {
      vnode.data.show = true
      enter(vnode, () => {
        el.style.display = originalDisplay
      })
    } else {
      el.style.display = value ? originalDisplay : 'none'
    }
  },

  update: function update(el, ref, vnode) {
    const value = ref.value
    const oldValue = ref.oldValue

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode)
    const transition = vnode.data && vnode.data.transition
    if (transition && !isIE9) {
      vnode.data.show = true
      if (value) {
        enter(vnode, () => {
          el.style.display = el.__vOriginalDisplay
        })
      } else {
        leave(vnode, () => {
          el.style.display = 'none'
        })
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none'
    }
  },

  unbind: function unbind(
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay
    }
  }
}

const platformDirectives = {
  model: model$1,
  show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

const transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  const compOptions = vnode && vnode.componentOptions
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  }
    return vnode
}

function extractTransitionData(comp) {
  const data = {}
  const options = comp.$options
  // props
  for (const key in options.propsData) {
    data[key] = comp[key]
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  const listeners = options._parentListeners
  for (const key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1]
  }
  return data
}

function placeholder(h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition(vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

const Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    const this$1 = this

    let children = this.$slots.default
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(c => c.tag)
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      )
    }

    const mode = this.mode

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        `invalid <transition> mode: ${mode}`,
        this.$parent
      )
    }

    const rawChild = children[0]

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    const child = getRealChild(rawChild)
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    const id = `__transition-${this._uid}-`
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key

    const data = (child.data || (child.data = {})).transition = extractTransitionData(this)
    const oldRawChild = this._vnode
    const oldChild = getRealChild(oldRawChild)

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(d => d.name === 'show')) {
      child.data.show = true
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      const oldData = oldChild && (oldChild.data.transition = extend({}, data))
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true
        mergeVNodeHook(oldData, 'afterLeave', () => {
          this$1._leaving = false
          this$1.$forceUpdate()
        })
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        let delayedLeave
        const performLeave = function () { delayedLeave() }
        mergeVNodeHook(data, 'afterEnter', performLeave)
        mergeVNodeHook(data, 'enterCancelled', performLeave)
        mergeVNodeHook(oldData, 'delayLeave', (leave) => { delayedLeave = leave })
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

const props = extend({
  tag: String,
  moveClass: String
}, transitionProps)

delete props.mode

const TransitionGroup = {
  props,

  render: function render(h) {
    const tag = this.tag || this.$vnode.data.tag || 'span'
    const map = Object.create(null)
    const prevChildren = this.prevChildren = this.children
    const rawChildren = this.$slots.default || []
    const children = this.children = []
    const transitionData = extractTransitionData(this)

    for (let i = 0; i < rawChildren.length; i++) {
      const c = rawChildren[i]
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c)
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData
        } else if (process.env.NODE_ENV !== 'production') {
          const opts = c.componentOptions
          const name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag
          warn((`<transition-group> children must be keyed: <${name}>`))
        }
      }
    }

    if (prevChildren) {
      const kept = []
      const removed = []
      for (let i$1 = 0; i$1 < prevChildren.length; i$1++) {
        const c$1 = prevChildren[i$1]
        c$1.data.transition = transitionData
        c$1.data.pos = c$1.elm.getBoundingClientRect()
        if (map[c$1.key]) {
          kept.push(c$1)
        } else {
          removed.push(c$1)
        }
      }
      this.kept = h(tag, null, kept)
      this.removed = removed
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    )
    this._vnode = this.kept
  },

  updated: function updated() {
    const children = this.prevChildren
    const moveClass = this.moveClass || (`${this.name || 'v'}-move`)
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs)
    children.forEach(recordPosition)
    children.forEach(applyTranslation)

    // force reflow to put everything in position
    const body = document.body
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach((c) => {
      if (c.data.moved) {
        const el = c.elm
        const s = el.style
        addTransitionClass(el, moveClass)
        s.transform = s.WebkitTransform = s.transitionDuration = ''
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb)
            el._moveCb = null
            removeTransitionClass(el, moveClass)
          }
        })
      }
    })
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      const clone = el.cloneNode()
      if (el._transitionClasses) {
        el._transitionClasses.forEach((cls) => { removeClass(clone, cls) })
      }
      addClass(clone, moveClass)
      clone.style.display = 'none'
      this.$el.appendChild(clone)
      const info = getTransitionInfo(clone)
      this.$el.removeChild(clone)
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb()
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb()
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect()
}

function applyTranslation(c) {
  const oldPos = c.data.pos
  const newPos = c.data.newPos
  const dx = oldPos.left - newPos.left
  const dy = oldPos.top - newPos.top
  if (dx || dy) {
    c.data.moved = true
    const s = c.elm.style
    s.transform = s.WebkitTransform = `translate(${dx}px,${dy}px)`
    s.transitionDuration = '0s'
  }
}

const platformComponents = {
  Transition,
  TransitionGroup
}

/*  */

// install platform specific utils
Vue$2.config.mustUseProp = mustUseProp
Vue$2.config.isReservedTag = isReservedTag
Vue$2.config.getTagNamespace = getTagNamespace
Vue$2.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(Vue$2.options.directives, platformDirectives)
extend(Vue$2.options.components, platformComponents)

// install platform patch function
Vue$2.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue$2.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
setTimeout(() => {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$2)
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      )
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
      config.productionTip !== false &&
      inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log'](
      'You are running Vue in development mode.\n' +
      'Make sure to turn on production mode when deploying for production.\n' +
      'See more tips at https://vuejs.org/guide/deployment.html'
    )
  }
}, 0)

/* harmony default export */ __webpack_exports__.default = Vue$2
/* WEBPACK VAR INJECTION */ }.call(__webpack_exports__, __webpack_require__(7), __webpack_require__(119)))
/** */ }),
/* 4 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(117)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(97),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/components/modal.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] modal.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-f102dbe0', Component.options)
  } else {
    hotAPI.reload('data-v-f102dbe0', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 5 */
/** */ (function (module, __webpack_exports__, __webpack_require__) {
/* WEBPACK VAR INJECTION */(function (process) {
Object.defineProperty(__webpack_exports__, '__esModule', { value: true })
/**
  * vue-router v2.2.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert(condition, message) {
  if (!condition) {
    throw new Error((`[vue-router] ${message}`))
  }
}

function warn(condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn((`[vue-router] ${message}`))
  }
}

const View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(h, ref) {
    const props = ref.props
    const children = ref.children
    let parent = ref.parent
    const data = ref.data

    data.routerView = true

    const name = props.name
    const route = parent.$route
    const cache = parent._routerViewCache || (parent._routerViewCache = {})

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    let depth = 0
    let inactive = false
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      if (parent._inactive) {
        inactive = true
      }
      parent = parent.$parent
    }
    data.routerViewDepth = depth

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    const matched = route.matched[depth]
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null
      return h()
    }

    const component = cache[name] = matched.components[name]

    // inject instance registration hooks
    const hooks = data.hook || (data.hook = {})
    hooks.init = function (vnode) {
      matched.instances[name] = vnode.child
    }
    hooks.prepatch = function (oldVnode, vnode) {
      matched.instances[name] = vnode.child
    }
    hooks.destroy = function (vnode) {
      if (matched.instances[name] === vnode.child) {
        matched.instances[name] = undefined
      }
    }

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name])

    return h(component, data, children)
  }
}

function resolveProps(route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      warn(false, (`props in "${route.path}" is a ${typeof config}, expecting an object, function or boolean.`))
  }
}

/*  */

const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = function (c) { return `%${c.charCodeAt(0).toString(16)}` }
const commaRE = /%2C/g

// fixed encodeURIComponent which is more comformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
const encode = function (str) {
 return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ',')
}

const decode = decodeURIComponent

function resolveQuery(
  query,
  extraQuery
) {
  if (extraQuery === void 0) extraQuery = {}

  if (query) {
    let parsedQuery
    try {
      parsedQuery = parseQuery(query)
    } catch (e) {
      process.env.NODE_ENV !== 'production' && warn(false, e.message)
      parsedQuery = {}
    }
    for (const key in extraQuery) {
      parsedQuery[key] = extraQuery[key]
    }
    return parsedQuery
  }
    return extraQuery
}

function parseQuery(query) {
  const res = {}

  query = query.trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }

  query.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = decode(parts.shift())
    const val = parts.length > 0
      ? decode(parts.join('='))
      : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })

  return res
}

function stringifyQuery(obj) {
  const res = obj ? Object.keys(obj).map((key) => {
    const val = obj[key]

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      const result = []
      val.slice().forEach((val2) => {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key))
        } else {
          result.push(`${encode(key)}=${encode(val2)}`)
        }
      })
      return result.join('&')
    }

    return `${encode(key)}=${encode(val)}`
  }).filter(x => x.length > 0).join('&') : null
  return res ? (`?${res}`) : ''
}

/*  */

const trailingSlashRE = /\/?$/

function createRoute(
  record,
  location,
  redirectedFrom
) {
  const route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  }
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom)
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
const START = createRoute(null, {
  path: '/'
})

function formatMatch(record) {
  const res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return res
}

function getFullPath(ref) {
  const path = ref.path
  let query = ref.query; if (query === void 0) query = {}
  let hash = ref.hash; if (hash === void 0) hash = ''

  return (path || '/') + stringifyQuery(query) + hash
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  }
    return false
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {}
  if (b === void 0) b = {}

  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(key => String(a[key]) === String(b[key]))
}

function isIncludedRoute(current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes(current, target) {
  for (const key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
const toTypes = [String, Object]
const eventTypes = [String, Array]

const Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    const this$1 = this

    const router = this.$router
    const current = this.$route
    const ref = router.resolve(this.to, current, this.append)
    const location = ref.location
    const route = ref.route
    const href = ref.href
    const classes = {}
    const activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
    const compareTarget = location.path ? createRoute(null, location) : route
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget)

    const handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location)
        } else {
          router.push(location)
        }
      }
    }

    const on = { click: guardEvent }
    if (Array.isArray(this.event)) {
      this.event.forEach((e) => { on[e] = handler })
    } else {
      on[this.event] = handler
    }

    const data = {
      class: classes
    }

    if (this.tag === 'a') {
      data.on = on
      data.attrs = { href }
    } else {
      // find the first <a> child and apply listener and href
      const a = findAnchor(this.$slots.default)
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false
        const extend = _Vue.util.extend
        const aData = a.data = extend({}, a.data)
        aData.on = on
        const aAttrs = a.data.attrs = extend({}, a.data.attrs)
        aAttrs.href = href
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
}

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.target && e.target.getAttribute) {
    const target = e.target.getAttribute('target')
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault()
  }
  return true
}

function findAnchor(children) {
  if (children) {
    let child
    for (let i = 0; i < children.length; i++) {
      child = children[i]
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

let _Vue

function install(Vue) {
  if (install.installed) { return }
  install.installed = true

  _Vue = Vue

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() { return this.$root._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() { return this.$root._route }
  })

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (this.$options.router) {
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      }
    }
  })

  Vue.component('router-view', View)
  Vue.component('router-link', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created
}

/*  */

const inBrowser = typeof window !== 'undefined'

/*  */

function resolvePath(
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop()
    } else {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

function parsePath(path) {
  let hash = ''
  let query = ''

  const hashIndex = path.indexOf('#')
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex)
    path = path.slice(0, hashIndex)
  }

  const queryIndex = path.indexOf('?')
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1)
    path = path.slice(0, queryIndex)
  }

  return {
    path,
    query,
    hash
  }
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function createRouteMap(
  routes,
  oldPathMap,
  oldNameMap
) {
  const pathMap = oldPathMap || Object.create(null)
  const nameMap = oldNameMap || Object.create(null)

  routes.forEach((route) => {
    addRouteRecord(pathMap, nameMap, route)
  })

  return {
    pathMap,
    nameMap
  }
}

function addRouteRecord(
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  const path = route.path
  const name = route.name
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, '"path" is required in a route configuration.')
    assert(
      typeof route.component !== 'string',
      `route config "component" for path: ${String(path || name)} cannot be a ` +
      'string id. Use an actual component instead.'
    )
  }

  const record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  }

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(child => /^\/?$/.test(child.path))) {
        warn(
          false,
          `Named Route '${route.name}' has a default child route. ` +
          `When navigating to this named route (:to="{name: '${route.name}'"), ` +
          'the default child route will not be rendered. Remove the name from ' +
          'this route and use the name of the default child route for named ' +
          'links instead.'
        )
      }
    }
    route.children.forEach((child) => {
      const childMatchAs = matchAs
        ? cleanPath((`${matchAs}/${child.path}`))
        : undefined
      addRouteRecord(pathMap, nameMap, child, record, childMatchAs)
    })
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach((alias) => {
        const aliasRoute = {
          path: alias,
          children: route.children
        }
        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path)
      })
    } else {
      const aliasRoute = {
        path: route.alias,
        children: route.children
      }
      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path)
    }
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        `${'Duplicate named routes definition: ' +
        '{ name: "'}${name}", path: "${record.path}" }`
      )
    }
  }
}

function normalizePath(path, parent) {
  path = path.replace(/\/$/, '')
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath((`${parent.path}/${path}`))
}

const index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]'
}

const isarray = index$1

/**
 * Expose `pathToRegexp`.
 */
const index = pathToRegexp
const parse_1 = parse
const compile_1 = compile
const tokensToFunction_1 = tokensToFunction
const tokensToRegExp_1 = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
const PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  const tokens = []
  let key = 0
  let index = 0
  let path = ''
  const defaultDelimiter = options && options.delimiter || '/'
  let res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    const m = res[0]
    const escaped = res[1]
    const offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    const next = str[index]
    const prefix = res[2]
    const name = res[3]
    const capture = res[4]
    const group = res[5]
    const modifier = res[6]
    const asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    const partial = prefix != null && next != null && next !== prefix
    const repeat = modifier === '+' || modifier === '*'
    const optional = modifier === '?' || modifier === '*'
    const delimiter = res[2] || defaultDelimiter
    const pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter,
      optional,
      repeat,
      partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : `[^${escapeString(delimiter)}]+?`)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  const matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (let i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp(`^(?:${tokens[i].pattern})$`)
    }
  }

  return function (obj, opts) {
    let path = ''
    const data = obj || {}
    const options = opts || {}
    const encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      const value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError(`Expected "${token.name}" to be defined`)
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError(`Expected "${token.name}" to not repeat, but received \`${JSON.stringify(value)}\``)
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError(`Expected "${token.name}" to not be empty`)
          }
        }

        for (let j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError(`Expected all "${token.name}" to match "${token.pattern}", but received \`${JSON.stringify(segment)}\``)
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError(`Expected "${token.name}" to match "${token.pattern}", but received "${segment}"`)
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  const groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (let i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  const parts = []

  for (let i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  const regexp = new RegExp(`(?:${parts.join('|')})`, flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  const strict = options.strict
  const end = options.end !== false
  let route = ''

  // Iterate over the tokens and create our regexp string.
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      const prefix = escapeString(token.prefix)
      let capture = `(?:${token.pattern})`

      keys.push(token)

      if (token.repeat) {
        capture += `(?:${prefix}${capture})*`
      }

      if (token.optional) {
        if (!token.partial) {
          capture = `(?:${prefix}(${capture}))?`
        } else {
          capture = `${prefix}(${capture})?`
        }
      } else {
        capture = `${prefix}(${capture})`
      }

      route += capture
    }
  }

  const delimiter = escapeString(options.delimiter || '/')
  const endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = `${endsWithDelimiter ? route.slice(0, -delimiter.length) : route}(?:${delimiter}(?=$))?`
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : `(?=${delimiter}|$)`
  }

  return attachKeys(new RegExp(`^${route}`, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1
index.compile = compile_1
index.tokensToFunction = tokensToFunction_1
index.tokensToRegExp = tokensToRegExp_1

/*  */

const regexpCache = Object.create(null)

function getRouteRegex(path) {
  const hit = regexpCache[path]
  let keys,
regexp

  if (hit) {
    keys = hit.keys
    regexp = hit.regexp
  } else {
    keys = []
    regexp = index(path, keys)
    regexpCache[path] = { keys, regexp }
  }

  return { keys, regexp }
}

const regexpCompileCache = Object.create(null)

function fillParams(
  path,
  params,
  routeMsg
) {
  try {
    const filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path))
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, (`missing param for ${routeMsg}: ${e.message}`))
    }
    return ''
  }
}

/*  */

function normalizeLocation(
  raw,
  current,
  append
) {
  let next = typeof raw === 'string' ? { path: raw } : raw
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next)
    next._normalized = true
    const params = assign(assign({}, current.params), next.params)
    if (current.name) {
      next.name = current.name
      next.params = params
    } else if (current.matched) {
      const rawPath = current.matched[current.matched.length - 1].path
      next.path = fillParams(rawPath, params, (`path ${current.path}`))
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, 'relative params navigation requires a current route.')
    }
    return next
  }

  const parsedPath = parsePath(next.path || '')
  const basePath = (current && current.path) || '/'
  const path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : (current && current.path) || '/'
  const query = resolveQuery(parsedPath.query, next.query)
  let hash = next.hash || parsedPath.hash
  if (hash && hash.charAt(0) !== '#') {
    hash = `#${hash}`
  }

  return {
    _normalized: true,
    path,
    query,
    hash
  }
}

function assign(a, b) {
  for (const key in b) {
    a[key] = b[key]
  }
  return a
}

/*  */

function createMatcher(routes) {
  const ref = createRouteMap(routes)
  const pathMap = ref.pathMap
  const nameMap = ref.nameMap

  function addRoutes(routes) {
    createRouteMap(routes, pathMap, nameMap)
  }

  function match(
    raw,
    currentRoute,
    redirectedFrom
  ) {
    const location = normalizeLocation(raw, currentRoute)
    const name = location.name

    if (name) {
      const record = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        warn(record, (`Route with name '${name}' does not exist`))
      }
      const paramNames = getRouteRegex(record.path).keys
        .filter(key => !key.optional)
        .map(key => key.name)

      if (typeof location.params !== 'object') {
        location.params = {}
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, (`named route "${name}"`))
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {}
      for (const path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect(
    record,
    location
  ) {
    const originalRedirect = record.redirect
    let redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect

    if (typeof redirect === 'string') {
      redirect = { path: redirect }
    }

    if (!redirect || typeof redirect !== 'object') {
      process.env.NODE_ENV !== 'production' && warn(
        false, (`invalid redirect option: ${JSON.stringify(redirect)}`)
      )
      return _createRoute(null, location)
    }

    const re = redirect
    const name = re.name
    const path = re.path
    let query = location.query
    let hash = location.hash
    let params = location.params
    query = re.hasOwnProperty('query') ? re.query : query
    hash = re.hasOwnProperty('hash') ? re.hash : hash
    params = re.hasOwnProperty('params') ? re.params : params

    if (name) {
      // resolved named direct
      const targetRecord = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, (`redirect failed: named route "${name}" not found.`))
      }
      return match({
        _normalized: true,
        name,
        query,
        hash,
        params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      const rawPath = resolveRecordPath(path, record)
      // 2. resolve params
      const resolvedPath = fillParams(rawPath, params, (`redirect route with path "${rawPath}"`))
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query,
        hash
      }, undefined, location)
    }
      warn(false, (`invalid redirect option: ${JSON.stringify(redirect)}`))
      return _createRoute(null, location)
  }

  function alias(
    record,
    location,
    matchAs
  ) {
    const aliasedPath = fillParams(matchAs, location.params, (`aliased route with path "${matchAs}"`))
    const aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    })
    if (aliasedMatch) {
      const matched = aliasedMatch.matched
      const aliasedRecord = matched[matched.length - 1]
      location.params = aliasedMatch.params
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute(
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return {
    match,
    addRoutes
  }
}

function matchRoute(
  path,
  params,
  pathname
) {
  const ref = getRouteRegex(path)
  const regexp = ref.regexp
  const keys = ref.keys
  const m = pathname.match(regexp)

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (let i = 1, len = m.length; i < len; ++i) {
    const key = keys[i - 1]
    const val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
    if (key) { params[key.name] = val }
  }

  return true
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


const positionStore = Object.create(null)

function setupScroll() {
  window.addEventListener('popstate', (e) => {
    saveScrollPosition()
    if (e.state && e.state.key) {
      setStateKey(e.state.key)
    }
  })
}

function handleScroll(
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  const behavior = router.options.scrollBehavior
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', 'scrollBehavior must be a function')
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(() => {
    let position = getScrollPosition()
    const shouldScroll = behavior(to, from, isPop ? position : null)
    if (!shouldScroll) {
      return
    }
    const isObject = typeof shouldScroll === 'object'
    if (isObject && typeof shouldScroll.selector === 'string') {
      const el = document.querySelector(shouldScroll.selector)
      if (el) {
        position = getElementPosition(el)
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll)
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll)
    }

    if (position) {
      window.scrollTo(position.x, position.y)
    }
  })
}

function saveScrollPosition() {
  const key = getStateKey()
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }
}

function getScrollPosition() {
  const key = getStateKey()
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition(el) {
  const docEl = document.documentElement
  const docRect = docEl.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber(v) {
  return typeof v === 'number'
}

/*  */

const supportsPushState = inBrowser && (function () {
  const ua = window.navigator.userAgent

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
}())

// use User Timing api (if present) for more accurate key precision
const Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date

let _key = genKey()

function genKey() {
  return Time.now().toFixed(3)
}

function getStateKey() {
  return _key
}

function setStateKey(key) {
  _key = key
}

function pushState(url, replace) {
  saveScrollPosition()
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  const history = window.history
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url)
    } else {
      _key = genKey()
      history.pushState({ key: _key }, '', url)
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url)
  }
}

function replaceState(url) {
  pushState(url, true)
}

/*  */

function runQueue(queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb()
    } else if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
  }
  step(0)
}

/*  */


const History = function History(router, base) {
  this.router = router
  this.base = normalizeBase(base)
  // start with a route object that stands for "nowhere"
  this.current = START
  this.pending = null
  this.ready = false
  this.readyCbs = []
}

History.prototype.listen = function listen(cb) {
  this.cb = cb
}

History.prototype.onReady = function onReady(cb) {
  if (this.ready) {
    cb()
  } else {
    this.readyCbs.push(cb)
  }
}

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
    const this$1 = this

  const route = this.router.match(location, this.current)
  this.confirmTransition(route, () => {
    this$1.updateRoute(route)
    onComplete && onComplete(route)
    this$1.ensureURL()

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true
      this$1.readyCbs.forEach((cb) => {
        cb(route)
      })
    }
  }, onAbort)
}

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
    const this$1 = this

  const current = this.current
  const abort = function () { onAbort && onAbort() }
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL()
    return abort()
  }

  const ref = resolveQueue(this.current.matched, route.matched)
    const updated = ref.updated
    const deactivated = ref.deactivated
    const activated = ref.activated

  const queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(m => m.beforeEnter),
    // async components
    resolveAsyncComponents(activated)
  )

  this.pending = route
  const iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    hook(route, current, (to) => {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true)
        abort()
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to)
        abort()
      } else {
        // confirm transition and pass on the value
        next(to)
      }
    })
  }

  runQueue(queue, iterator, () => {
    const postEnterCbs = []
    const isValid = function () { return this$1.current === route }
    const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, () => {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null
      onComplete(route)
      if (this$1.router.app) {
        this$1.router.app.$nextTick(() => {
          postEnterCbs.forEach(cb => cb())
        })
      }
    })
  })
}

History.prototype.updateRoute = function updateRoute(route) {
  const prev = this.current
  this.current = route
  this.cb && this.cb(route)
  this.router.afterHooks.forEach((hook) => {
    hook && hook(route, prev)
  })
}

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      const baseEl = document.querySelector('base')
      base = (baseEl && baseEl.getAttribute('href')) || '/'
    } else {
      base = '/'
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = `/${base}`
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue(
  current,
  next
) {
  let i
  const max = Math.max(current.length, next.length)
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards(
  records,
  name,
  bind,
  reverse
) {
  const guards = flatMapComponents(records, (def, instance, match, key) => {
    const guard = extractGuard(def, name)
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(guard => bind(guard, instance, match, key))
        : bind(guard, instance, match, key)
    }
  })
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard(
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def)
  }
  return def.options[key]
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard(guard, instance) {
  return function boundRouteGuard() {
    return guard.apply(instance, arguments)
  }
}

function extractEnterGuards(
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', (guard, _, match, key) => bindEnterGuard(guard, match, key, cbs, isValid))
}

function bindEnterGuard(
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, (cb) => {
      next(cb)
      if (typeof cb === 'function') {
        cbs.push(() => {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid)
        })
      }
    })
  }
}

function poll(
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key])
  } else if (isValid()) {
    setTimeout(() => {
      poll(cb, instances, key, isValid)
    }, 16)
  }
}

function resolveAsyncComponents(matched) {
  return flatMapComponents(matched, (def, _, match, key) => {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        const resolve = once((resolvedDef) => {
          match.components[key] = resolvedDef
          next()
        })

        const reject = once((reason) => {
          warn(false, (`Failed to resolve async component ${key}: ${reason}`))
          next(false)
        })

        const res = def(resolve, reject)
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject)
        }
      }
    }
  })
}

function flatMapComponents(
  matched,
  fn
) {
  return flatten(matched.map(m => Object.keys(m.components).map(key => fn(
      m.components[key],
      m.instances[key],
      m, key
    ))))
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once(fn) {
  let called = false
  return function () {
    if (called) { return }
    called = true
    return fn.apply(this, arguments)
  }
}

/*  */


const HTML5History = (function (History$$1) {
  function HTML5History(router, base) {
    const this$1 = this

    History$$1.call(this, router, base)

    const expectScroll = router.options.scrollBehavior

    if (expectScroll) {
      setupScroll()
    }

    window.addEventListener('popstate', (e) => {
      this$1.transitionTo(getLocation(this$1.base), (route) => {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true)
        }
      })
    })
  }

  if (History$$1) HTML5History.__proto__ = History$$1
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype)
  HTML5History.prototype.constructor = HTML5History

  HTML5History.prototype.go = function go(n) {
    window.history.go(n)
  }

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    const this$1 = this

    this.transitionTo(location, (route) => {
      pushState(cleanPath(this$1.base + route.fullPath))
      handleScroll(this$1.router, route, this$1.current, false)
      onComplete && onComplete(route)
    }, onAbort)
  }

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    const this$1 = this

    this.transitionTo(location, (route) => {
      replaceState(cleanPath(this$1.base + route.fullPath))
      handleScroll(this$1.router, route, this$1.current, false)
      onComplete && onComplete(route)
    }, onAbort)
  }

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      const current = cleanPath(this.base + this.current.fullPath)
      push ? pushState(current) : replaceState(current)
    }
  }

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base)
  }

  return HTML5History
}(History))

function getLocation(base) {
  let path = window.location.pathname
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


const HashHistory = (function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base)
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash()
  }

  if (History$$1) HashHistory.__proto__ = History$$1
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype)
  HashHistory.prototype.constructor = HashHistory

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners() {
    const this$1 = this

    window.addEventListener('hashchange', () => {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), (route) => {
        replaceHash(route.fullPath)
      })
    })
  }

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    this.transitionTo(location, (route) => {
      pushHash(route.fullPath)
      onComplete && onComplete(route)
    }, onAbort)
  }

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    this.transitionTo(location, (route) => {
      replaceHash(route.fullPath)
      onComplete && onComplete(route)
    }, onAbort)
  }

  HashHistory.prototype.go = function go(n) {
    window.history.go(n)
  }

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    const current = this.current.fullPath
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current)
    }
  }

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash()
  }

  return HashHistory
}(History))

function checkFallback(base) {
  const location = getLocation(base)
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(`${base}/#${location}`)
    )
    return true
  }
}

function ensureSlash() {
  const path = getHash()
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash(`/${path}`)
  return false
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  const href = window.location.href
  const index = href.indexOf('#')
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash(path) {
  window.location.hash = path
}

function replaceHash(path) {
  const i = window.location.href.indexOf('#')
  window.location.replace(
    `${window.location.href.slice(0, i >= 0 ? i : 0)}#${path}`
  )
}

/*  */


const AbstractHistory = (function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base)
    this.stack = []
    this.index = -1
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype)
  AbstractHistory.prototype.constructor = AbstractHistory

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    const this$1 = this

    this.transitionTo(location, (route) => {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
      this$1.index++
      onComplete && onComplete(route)
    }, onAbort)
  }

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    const this$1 = this

    this.transitionTo(location, (route) => {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
      onComplete && onComplete(route)
    }, onAbort)
  }

  AbstractHistory.prototype.go = function go(n) {
    const this$1 = this

    const targetIndex = this.index + n
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    const route = this.stack[targetIndex]
    this.confirmTransition(route, () => {
      this$1.index = targetIndex
      this$1.updateRoute(route)
    })
  }

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    const current = this.stack[this.stack.length - 1]
    return current ? current.fullPath : '/'
  }

  AbstractHistory.prototype.ensureURL = function ensureURL() {
    // noop
  }

  return AbstractHistory
}(History))

/*  */

const VueRouter = function VueRouter(options) {
  if (options === void 0) options = {}

  this.app = null
  this.apps = []
  this.options = options
  this.beforeHooks = []
  this.afterHooks = []
  this.matcher = createMatcher(options.routes || [])

  let mode = options.mode || 'hash'
  this.fallback = mode === 'history' && !supportsPushState
  if (this.fallback) {
    mode = 'hash'
  }
  if (!inBrowser) {
    mode = 'abstract'
  }
  this.mode = mode

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base)
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback)
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base)
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, (`invalid mode: ${mode}`))
      }
  }
}

const prototypeAccessors = { currentRoute: {} }

VueRouter.prototype.match = function match(
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
}

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
}

VueRouter.prototype.init = function init(app /* Vue component instance */) {
    const this$1 = this

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    'not installed. Make sure to call `Vue.use(VueRouter)` ' +
    'before creating root instance.'
  )

  this.apps.push(app)

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app

  const history = this.history

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation())
  } else if (history instanceof HashHistory) {
    const setupHashListener = function () {
      history.setupListeners()
    }
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    )
  }

  history.listen((route) => {
    this$1.apps.forEach((app) => {
      app._route = route
    })
  })
}

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  this.beforeHooks.push(fn)
}

VueRouter.prototype.afterEach = function afterEach(fn) {
  this.afterHooks.push(fn)
}

VueRouter.prototype.onReady = function onReady(cb) {
  this.history.onReady(cb)
}

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort)
}

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort)
}

VueRouter.prototype.go = function go(n) {
  this.history.go(n)
}

VueRouter.prototype.back = function back() {
  this.go(-1)
}

VueRouter.prototype.forward = function forward() {
  this.go(1)
}

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  const route = to
    ? this.resolve(to).route
    : this.currentRoute
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(m => Object.keys(m.components).map(key => m.components[key])))
}

VueRouter.prototype.resolve = function resolve(
  to,
  current,
  append
) {
  const location = normalizeLocation(to, current || this.history.current, append)
  const route = this.match(location, current)
  const fullPath = route.redirectedFrom || route.fullPath
  const base = this.history.base
  const href = createHref(base, fullPath, this.mode)
  return {
    location,
    route,
    href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
}

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes)
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation())
  }
}

Object.defineProperties(VueRouter.prototype, prototypeAccessors)

function createHref(base, fullPath, mode) {
  const path = mode === 'hash' ? `#${fullPath}` : fullPath
  return base ? cleanPath(`${base}/${path}`) : path
}

VueRouter.install = install
VueRouter.version = '2.2.1'

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}

/* harmony default export */ __webpack_exports__.default = VueRouter
/* WEBPACK VAR INJECTION */ }.call(__webpack_exports__, __webpack_require__(7)))
/** */ }),
/* 6 */
/** */ (function (module, __webpack_exports__, __webpack_require__) {
Object.defineProperty(__webpack_exports__, '__esModule', { value: true })
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'Store', () => Store)
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'mapState', () => mapState)
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'mapMutations', () => mapMutations)
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'mapGetters', () => mapGetters)
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'mapActions', () => mapActions)
/**
 * vuex v2.2.1
 * (c) 2017 Evan You
 * @license MIT
 */
const applyMixin = function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    const usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options) {
      if (options === void 0) options = {}

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit() {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}

const devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__

function devtoolPlugin(store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook

  devtoolHook.emit('vuex:init', store)

  devtoolHook.on('vuex:travel-to-state', (targetState) => {
    store.replaceState(targetState)
  })

  store.subscribe((mutation, state) => {
    devtoolHook.emit('vuex:mutation', mutation, state)
  })
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise(val) {
  return val && typeof val.then === 'function'
}

function assert(condition, msg) {
  if (!condition) { throw new Error((`[vuex] ${msg}`)) }
}

const Module = function Module(rawModule, runtime) {
  this.runtime = runtime
  this._children = Object.create(null)
  this._rawModule = rawModule
}

const prototypeAccessors$1 = { state: {}, namespaced: {} }

prototypeAccessors$1.state.get = function () {
  return this._rawModule.state || {}
}

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
}

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module
}

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key]
}

Module.prototype.getChild = function getChild(key) {
  return this._children[key]
}

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters
  }
}

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn)
}

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn)
  }
}

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn)
  }
}

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn)
  }
}

Object.defineProperties(Module.prototype, prototypeAccessors$1)

const ModuleCollection = function ModuleCollection(rawRootModule) {
  const this$1 = this

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false)

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, (rawModule, key) => {
      this$1.register([key], rawModule, false)
    })
  }
}

ModuleCollection.prototype.get = function get(path) {
  return path.reduce((module, key) => module.getChild(key), this.root)
}

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  let module = this.root
  return path.reduce((namespace, key) => {
    module = module.getChild(key)
    return namespace + (module.namespaced ? `${key}/` : '')
  }, '')
}

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update(this.root, rawRootModule)
}

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    const this$1 = this
    if (runtime === void 0) runtime = true

  const parent = this.get(path.slice(0, -1))
  const newModule = new Module(rawModule, runtime)
  parent.addChild(path[path.length - 1], newModule)

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, (rawChildModule, key) => {
      this$1.register(path.concat(key), rawChildModule, runtime)
    })
  }
}

ModuleCollection.prototype.unregister = function unregister(path) {
  const parent = this.get(path.slice(0, -1))
  const key = path[path.length - 1]
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key)
}

function update(targetModule, newModule) {
  // update target module
  targetModule.update(newModule)

  // update nested modules
  if (newModule.modules) {
    for (const key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          `[vuex] trying to add a new module '${key}' on hot reloading, ` +
          'manual reload is needed'
        )
        return
      }
      update(targetModule.getChild(key), newModule.modules[key])
    }
  }
}

let Vue // bind on install

var Store = function Store(options) {
  const this$1 = this
  if (options === void 0) options = {}

  assert(Vue, 'must call Vue.use(Vuex) before creating a store instance.')
  assert(typeof Promise !== 'undefined', 'vuex requires a Promise polyfill in this browser.')

  let state = options.state; if (state === void 0) state = {}
  let plugins = options.plugins; if (plugins === void 0) plugins = []
  let strict = options.strict; if (strict === void 0) strict = false

  // store internal state
  this._committing = false
  this._actions = Object.create(null)
  this._mutations = Object.create(null)
  this._wrappedGetters = Object.create(null)
  this._modules = new ModuleCollection(options)
  this._modulesNamespaceMap = Object.create(null)
  this._subscribers = []
  this._watcherVM = new Vue()

  // bind commit and dispatch to self
  const store = this
  const ref = this
  const dispatch = ref.dispatch
  const commit = ref.commit
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload)
  }
  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options)
  }

  // strict mode
  this.strict = strict

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root)

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state)

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(plugin => plugin(this$1))
}

const prototypeAccessors = { state: {} }

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
}

prototypeAccessors.state.set = function (v) {
  assert(false, 'Use store.replaceState() to explicit replace store state.')
}

Store.prototype.commit = function commit(_type, _payload, _options) {
    const this$1 = this

  // check object-style commit
  const ref = unifyObjectStyle(_type, _payload, _options)
    const type = ref.type
    const payload = ref.payload
    const options = ref.options

  const mutation = { type, payload }
  const entry = this._mutations[type]
  if (!entry) {
    console.error((`[vuex] unknown mutation type: ${type}`))
    return
  }
  this._withCommit(() => {
    entry.forEach((handler) => {
      handler(payload)
    })
  })
  this._subscribers.forEach(sub => sub(mutation, this$1.state))

  if (options && options.silent) {
    console.warn(
      `[vuex] mutation type: ${type}. Silent option has been removed. ` +
      'Use the filter functionality in the vue-devtools'
    )
  }
}

Store.prototype.dispatch = function dispatch(_type, _payload) {
  // check object-style dispatch
  const ref = unifyObjectStyle(_type, _payload)
    const type = ref.type
    const payload = ref.payload

  const entry = this._actions[type]
  if (!entry) {
    console.error((`[vuex] unknown action type: ${type}`))
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload)
}

Store.prototype.subscribe = function subscribe(fn) {
  const subs = this._subscribers
  if (subs.indexOf(fn) < 0) {
    subs.push(fn)
  }
  return function () {
    const i = subs.indexOf(fn)
    if (i > -1) {
      subs.splice(i, 1)
    }
  }
}

Store.prototype.watch = function watch(getter, cb, options) {
    const this$1 = this

  assert(typeof getter === 'function', 'store.watch only accepts a function.')
  return this._watcherVM.$watch(() => getter(this$1.state, this$1.getters), cb, options)
}

Store.prototype.replaceState = function replaceState(state) {
    const this$1 = this

  this._withCommit(() => {
    this$1._vm._data.$$state = state
  })
}

Store.prototype.registerModule = function registerModule(path, rawModule) {
  if (typeof path === 'string') { path = [path] }
  assert(Array.isArray(path), 'module path must be a string or an Array.')
  this._modules.register(path, rawModule)
  installModule(this, this.state, path, this._modules.get(path))
  // reset store to update getters...
  resetStoreVM(this, this.state)
}

Store.prototype.unregisterModule = function unregisterModule(path) {
    const this$1 = this

  if (typeof path === 'string') { path = [path] }
  assert(Array.isArray(path), 'module path must be a string or an Array.')
  this._modules.unregister(path)
  this._withCommit(() => {
    const parentState = getNestedState(this$1.state, path.slice(0, -1))
    Vue.delete(parentState, path[path.length - 1])
  })
  resetStore(this)
}

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions)
  resetStore(this, true)
}

Store.prototype._withCommit = function _withCommit(fn) {
  const committing = this._committing
  this._committing = true
  fn()
  this._committing = committing
}

Object.defineProperties(Store.prototype, prototypeAccessors)

function resetStore(store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const state = store.state
  // init all modules
  installModule(store, state, [], store._modules.root, true)
  // reset vm
  resetStoreVM(store, state, hot)
}

function resetStoreVM(store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store) }
    Object.defineProperty(store.getters, key, {
      get() { return store._vm[key] },
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}

function installModule(store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (namespace) {
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state)
    })
  }

  const local = module.context = makeLocalContext(store, namespace, path)

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const namespacedType = namespace + key
    registerAction(store, namespacedType, action, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext(store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      const args = unifyObjectStyle(_type, _payload, _options)
      const payload = args.payload
      const options = args.options
      let type = args.type

      if (!options || !options.root) {
        type = namespace + type
        if (!store._actions[type]) {
          console.error((`[vuex] unknown local action type: ${args.type}, global type: ${type}`))
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      const args = unifyObjectStyle(_type, _payload, _options)
      const payload = args.payload
      const options = args.options
      let type = args.type

      if (!options || !options.root) {
        type = namespace + type
        if (!store._mutations[type]) {
          console.error((`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`))
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters }
        : function () { return makeLocalGetters(store, namespace) }
    },
    state: {
      get() { return getNestedState(store.state, path) }
    }
  })

  return local
}

function makeLocalGetters(store, namespace) {
  const gettersProxy = {}

  const splitPos = namespace.length
  Object.keys(store.getters).forEach((type) => {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    const localType = type.slice(splitPos)

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get() { return store.getters[type] },
      enumerable: true
    })
  })

  return gettersProxy
}

function registerMutation(store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push((payload) => {
    handler(local.state, payload)
  })
}

function registerAction(store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push((payload, cb) => {
    let res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch((err) => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    }
      return res
  })
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error((`[vuex] duplicate getter key: ${type}`))
    return
  }
  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}

function enableStrictMode(store) {
  store._vm.$watch(function () { return this._data.$$state }, () => {
    assert(store._committing, 'Do not mutate vuex store state outside mutation handlers.')
  }, { deep: true, sync: true })
}

function getNestedState(state, path) {
  return path.length
    ? path.reduce((state, key) => state[key], state)
    : state
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  assert(typeof type === 'string', (`Expects string as the type, but found ${typeof type}.`))

  return { type, payload, options }
}

function install(_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    )
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

var mapState = normalizeNamespace((namespace, states) => {
  const res = {}
  normalizeMap(states).forEach((ref) => {
    const key = ref.key
    const val = ref.val

    res[key] = function mappedState() {
      let state = this.$store.state
      let getters = this.$store.getters
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)
        if (!module) {
          return
        }
        state = module.context.state
        getters = module.context.getters
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})

var mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  normalizeMap(mutations).forEach((ref) => {
    const key = ref.key
    let val = ref.val

    val = namespace + val
    res[key] = function mappedMutation() {
      let args = [],
len = arguments.length
      while (len--) args[len] = arguments[len]

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})

var mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  normalizeMap(getters).forEach((ref) => {
    const key = ref.key
    let val = ref.val

    val = namespace + val
    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error((`[vuex] unknown getter: ${val}`))
        return
      }
      return this.$store.getters[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})

var mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  normalizeMap(actions).forEach((ref) => {
    const key = ref.key
    let val = ref.val

    val = namespace + val
    res[key] = function mappedAction() {
      let args = [],
len = arguments.length
      while (len--) args[len] = arguments[len]

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
})

function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}

function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace(store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  if (!module) {
    console.error((`[vuex] module namespace not found in ${helper}(): ${namespace}`))
  }
  return module
}

const index_esm = {
  Store,
  install,
  version: '2.2.1',
  mapState,
  mapMutations,
  mapGetters,
  mapActions
}

/* harmony default export */ __webpack_exports__.default = index_esm
/** */ }),
/* 7 */
/** */ (function (module, exports) {
// shim for using process in browser
const process = module.exports = {}

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

let cachedSetTimeout
let cachedClearTimeout

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined')
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined')
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout
        } else {
            cachedSetTimeout = defaultSetTimout
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout
        } else {
            cachedClearTimeout = defaultClearTimeout
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout
    }
}())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        // normal enviroments in sane situations
        return setTimeout(fun, 0)
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout
        return setTimeout(fun, 0)
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0)
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0)
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0)
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        // normal enviroments in sane situations
        return clearTimeout(marker)
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout
        return clearTimeout(marker)
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker)
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker)
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker)
        }
    }
}
let queue = []
let draining = false
let currentQueue
let queueIndex = -1

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return
    }
    draining = false
    if (currentQueue.length) {
        queue = currentQueue.concat(queue)
    } else {
        queueIndex = -1
    }
    if (queue.length) {
        drainQueue()
    }
}

function drainQueue() {
    if (draining) {
        return
    }
    const timeout = runTimeout(cleanUpNextTick)
    draining = true

    let len = queue.length
    while (len) {
        currentQueue = queue
        queue = []
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run()
            }
        }
        queueIndex = -1
        len = queue.length
    }
    currentQueue = null
    draining = false
    runClearTimeout(timeout)
}

process.nextTick = function (fun) {
    const args = new Array(arguments.length - 1)
    if (arguments.length > 1) {
        for (let i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i]
        }
    }
    queue.push(new Item(fun, args))
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue)
    }
}

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun
    this.array = array
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array)
}
process.title = 'browser'
process.browser = true
process.env = {}
process.argv = []
process.version = '' // empty string to avoid regexp issues
process.versions = {}

function noop() {}

process.on = noop
process.addListener = noop
process.once = noop
process.off = noop
process.removeListener = noop
process.removeAllListeners = noop
process.emit = noop

process.binding = function (name) {
    throw new Error('process.binding is not supported')
}

process.cwd = function () { return '/' }
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported')
}
process.umask = function () { return 0 }
/** */ }),
/* 8 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _vue = __webpack_require__(3)

const _vue2 = _interopRequireDefault(_vue)

const _vueRouter = __webpack_require__(5)

const _vueRouter2 = _interopRequireDefault(_vueRouter)

const _index = __webpack_require__(71)

const _index2 = _interopRequireDefault(_index)

const _button = __webpack_require__(64)

const _button2 = _interopRequireDefault(_button)

const _span = __webpack_require__(69)

const _span2 = _interopRequireDefault(_span)

const _table = __webpack_require__(70)

const _table2 = _interopRequireDefault(_table)

const _form = __webpack_require__(65)

const _form2 = _interopRequireDefault(_form)

const _popup = __webpack_require__(67)

const _popup2 = _interopRequireDefault(_popup)

const _loading = __webpack_require__(66)

const _loading2 = _interopRequireDefault(_loading)

const _select = __webpack_require__(68)

const _select2 = _interopRequireDefault(_select)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

const routes = [{ path: '/', name: '主页', component: _index2.default }, { path: '/button', name: '按钮', component: _button2.default }, { path: '/span', name: '标签', component: _span2.default }, { path: '/table', name: '表格', component: _table2.default }, { path: '/form', name: '表单', component: _form2.default }, { path: '/popup', name: '弹出框', component: _popup2.default }, { path: '/loading', name: '加载动画', component: _loading2.default }, { path: '/select', name: '下拉框', component: _select2.default }]

_vue2.default.use(_vueRouter2.default)
const routers = new _vueRouter2.default({
    mode: 'history',
    routes
})

exports.default = routers
/** */ }),
/* 9 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _vue = __webpack_require__(3)

const _vue2 = _interopRequireDefault(_vue)

const _vuex = __webpack_require__(6)

const _vuex2 = _interopRequireDefault(_vuex)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

_vue2.default.use(_vuex2.default)

const store = new _vuex2.default.Store({
    state: {
        count: 0,
        list: [{ id: '001', createTime: '2016-10-01', money: '￥1,020', status: 'finished', customer: 'Kimber David' }, { id: '002', createTime: '2016-10-01', money: '￥1,020', status: 'pending', customer: 'Kimber David' }, { id: '003', createTime: '2016-10-01', money: '￥1,020', status: 'cancel', customer: 'Kimber David' }, { id: '004', createTime: '2016-10-01', money: '￥1,020', status: 'cancel', customer: 'Kimber David' }, { id: '001', createTime: '2016-10-01', money: '￥1,020', status: 'finished', customer: 'Kimber David' }, { id: '002', createTime: '2016-10-01', money: '￥1,020', status: 'pending', customer: 'Kimber David' }, { id: '003', createTime: '2016-10-01', money: '￥1,020', status: 'cancel', customer: 'Kimber David' }, { id: '004', createTime: '2016-10-01', money: '￥1,020', status: 'cancel', customer: 'Kimber David' }, { id: '001', createTime: '2016-10-01', money: '￥1,020', status: 'finished', customer: 'Kimber David' }, { id: '002', createTime: '2016-10-01', money: '￥1,020', status: 'pending', customer: 'Kimber David' }, { id: '003', createTime: '2016-10-01', money: '￥1,020', status: 'cancel', customer: 'Kimber David' }, { id: '004', createTime: '2016-10-01', money: '￥1,020', status: 'cancel', customer: 'Kimber David' }]
    },
    mutations: {
        add: function add(state) {
            return state.count++
        }
    }
})

exports.default = store
/** */ }),
/* 10 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _vue = __webpack_require__(3)

const _vue2 = _interopRequireDefault(_vue)

const _breadcrumb = __webpack_require__(59)

const _breadcrumb2 = _interopRequireDefault(_breadcrumb)

const _pagination = __webpack_require__(60)

const _pagination2 = _interopRequireDefault(_pagination)

const _modal = __webpack_require__(4)

const _modal2 = _interopRequireDefault(_modal)

const _popup = __webpack_require__(61)

const _popup2 = _interopRequireDefault(_popup)

const _select = __webpack_require__(62)

const _select2 = _interopRequireDefault(_select)

const _area = __webpack_require__(58)

const _area2 = _interopRequireDefault(_area)

const _upload = __webpack_require__(63)

const _upload2 = _interopRequireDefault(_upload)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

exports.default = {
    install: function install(Vue) {
        Vue.component('breadcrumb', _breadcrumb2.default)
        Vue.component('pagination', _pagination2.default)
        Vue.component('modal', _modal2.default)
        Vue.component('popup', _popup2.default)
        Vue.component('wy-select', _select2.default)
        Vue.component('wy-area', _area2.default)
        Vue.component('upload', _upload2.default)
    }
}
/** */ }),
/* 11 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _vue = __webpack_require__(3)

const _vue2 = _interopRequireDefault(_vue)

const _index = __webpack_require__(36)

const _index2 = _interopRequireDefault(_index)

const _index3 = __webpack_require__(35)

const _index4 = _interopRequireDefault(_index3)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

exports.default = {
    Popup: _index2.default,
    Loading: _index4.default
}
/** */ }),
/* 12 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(103)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(82),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/app.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-3bd20296', Component.options)
  } else {
    hotAPI.reload('data-v-3bd20296', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 13 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _menu = __webpack_require__(72)

const _menu2 = _interopRequireDefault(_menu)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

exports.default = {
    data: function data() {
        return {
            transitionName: ''
        }
    },

    watch: {
        $route: function $route(to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    components: {
        navMenu: _menu2.default
    }
} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/** */ }),
/* 14 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _area = __webpack_require__(34)

const _area2 = _interopRequireDefault(_area)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

exports.default = {
    props: {
        selected: {
            type: Object
        }
    },
    data: function data() {
        return {
            area: null,
            cities: null,
            currentProvice: '',
            currentCity: '',
            showProvinces: false,
            showCities: false
        }
    },

    watch: {
        showProvinces: function showProvinces() {
            if (this.showProvinces) {
                document.body.addEventListener('click', this.tabProviceDisplay)
            } else {
                document.body.removeEventListener('click', this.tabProviceDisplay)
            }
        },
        showCities: function showCities() {
            if (this.showCities) {
                document.body.addEventListener('click', this.tabCitiesDisplay)
            } else {
                document.body.removeEventListener('click', this.tabCitiesDisplay)
            }
        }
    },
    mounted: function mounted() {
        this.area = _area2.default
        // 如果传入默认值得话，显示默认值
        if (this.selected) {
            this.currentProvice = this.selected.province || ''
            let _iteratorNormalCompletion = true
            let _didIteratorError = false
            let _iteratorError

            try {
                for (var _iterator = _area2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    const item = _step.value

                    if (item.name === this.currentProvice) {
                        this.cities = item.children
                        break
                    }
                }
            } catch (err) {
                _didIteratorError = true
                _iteratorError = err
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return()
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError
                    }
                }
            }

            this.currentCity = this.selected.city || ''
            if (this.currentProvice) {
                this.changed()
            }
        }
    },

    methods: {
        // 选中一级菜单后
        getCities: function getCities(item) {
            if (this.currentProvice !== item.name) {
                this.currentCity = ''
            }
            this.currentProvice = item.name
            this.cities = item.children
            this.showProvinces = false
            this.changed()
        },

        // 选中二级菜单后
        selectCity: function selectCity(name) {
            this.currentCity = name
            this.showCities = false
            this.changed()
        },
        tabProviceDisplay: function tabProviceDisplay() {
            this.showProvinces = false
        },
        tabCitiesDisplay: function tabCitiesDisplay() {
            this.showCities = false
        },
        changed: function changed() {
            this.$emit('changed', this.currentProvice, this.currentCity)
        }
    }
} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/** */ }),
/* 15 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        routes: {
            type: Object,
            required: true
        }
    },
    data: function data() {
        return {}
    },

    watch: {
        $route: {
            handler: function handler(newVal) {
                console.warn(newVal)
            }
        }
    },
    created: function created() {
        console.warn('123')
    }
}
/** */ }),
/* 16 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        close: {
            type: Function,
            required: true
        },
        w: {
            type: Number,
            default: 400
        },
        h: {
            type: Number,
            default: 200
        },
        hideMask: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            show: true
        }
    },

    methods: {
        closeModal: function closeModal() {
            this.close()
        }
    }
}
/** */ }),
/* 17 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
	value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	props: {
		pn: { // 当前页
			type: Number,
			required: true
		},
		total: { // 数据总数
			type: Number,
			required: true
		},
		size: { // 分页大小
			type: Number,
			default: function _default() {
				return 10
			}
		},
		cb: {
			type: Function,
			default: function _default(n) {
				this.$route.query.pn = n
				this.$router.push({ path: this.$route.path, query: this.$route.query })
			}
		}
	},
	data: function data() {
		return {
			currentNum: 1, // 当前页码
			totalPagesNum: 1, // 总页数(默认为1) = Math.ceil(数据总数 / 分页大小)
			pagerList: [],
			showFirst: false,
			showLast: false
		}
	},
	created: function created() {
		this.totalPagesNum = Math.ceil(this.total / this.size)
		this.getPagerList()
	},

	watch: {
		// 监视当前页，随时更新中间的页码
		currentNum: function currentNum(newVal) {
			if (this.pagerList.length === 0) {
				return
			}
			this.getPagerList()
		}
	},
	methods: {
		choose: function choose(n) {
			// 选择
			this.currentNum = n
			if (this.cb && typeof this.cb === 'function') {
				this.cb(n)
			}
		},
		pre: function pre() {
			// 上一页
			this.currentNum = this.currentNum === 1 ? this.currentNum : this.currentNum - 1
			this.choose(this.currentNum)
		},
		next: function next() {
			// 下一页
			this.currentNum = this.currentNum === this.totalPagesNum ? this.totalPagesNum : this.currentNum + 1
			this.choose(this.currentNum)
		},
		getPagerList: function getPagerList() {
			// 获取中间部分的页码
			const component = this
			component.pagerList = []
			if (component.totalPagesNum <= 10) {
				for (let i = 1; i <= 10; i++) {
					component.pagerList.push(i)
				}
			} else {
				let start = 1
				let end = 0
				if (component.currentNum >= 5) {
					start = component.currentNum - 2
				}
				if (component.currentNum <= component.totalPagesNum - 3) {
					end = component.currentNum === component.totalPagesNum - 3 ? start + 5 : start + 4
				} else {
					start = component.totalPagesNum - 4
					end = component.totalPagesNum
				}
				for (let _i = start; _i <= end; _i++) {
					component.pagerList.push(_i)
				}
				component.showFirst = start > 2
				component.showLast = end < component.totalPagesNum - 1
			}
		}
	}
}
/** */ }),
/* 18 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        mode: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: '提示信息'
        },
        msg: {
            type: String
        },
        cb: {
            type: Function,
            default: function _default() {
                this.showModal = false
            }
        }
    },
    data: function data() {
        return {
            showModal: true
        }
    },

    methods: {
        callback: function callback() {
            this.cb()
            this.showModal = false
        }
    }
}
/** */ }),
/* 19 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        width: {
            type: Number,
            default: 200
        },
        options: {
            type: Array,
            required: true
        },
        selected: {
            type: Object
        }
    },
    data: function data() {
        return {
            show: false,
            selectedText: ''
        }
    },
    mounted: function mounted() {
        // 如果传入默认选中值的话
        if (this.selected) {
            let _iteratorNormalCompletion = true
            let _didIteratorError = false
            let _iteratorError

            try {
                for (var _iterator = this.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    const option = _step.value

                    if (option.text === this.selected.text || option.value === this.selected.value) {
                        this.selectedText = option.text
                        this.$emit('changed', option)
                        break
                    }
                }
            } catch (err) {
                _didIteratorError = true
                _iteratorError = err
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return()
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError
                    }
                }
            }
        }
    },

    watch: {
        show: function show() {
            if (this.show) {
                document.body.addEventListener('click', this.tab)
            } else {
                document.body.removeEventListener('click', this.tab)
            }
        }
    },
    methods: {
        select: function select(item) {
            this.selectedText = item.text
            this.$emit('changed', item)
        },
        tab: function tab() {
            this.show = false
        }
    }
}
/** */ }),
/* 20 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        src: {
            type: String,
            required: true
        }
    },
    data: function data() {
        return {
            status: 'ready',
            files: [],
            point: {},
            uploading: false,
            percent: 0
        }
    },

    methods: {
        add: function add() {
            this.$refs.file.click()
        },
        submit: function submit() {
            const _this = this

            const formData = new FormData()
            this.files.forEach((item) => {
                formData.append(item.name, item.file)
            })
            const xhr = new XMLHttpRequest()
            xhr.upload.addEventListener('progress', this.uploadProgress, false)
            xhr.open('POST', this.src, true)
            this.uploading = true
            xhr.send(formData)
            xhr.onload = function () {
                _this.uploading = false
                if (xhr.status === 200 || xhr.status === 304) {
                    _this.status = 'finished'
                    console.log('上传成功')
                } else {
                    console.log(`\u4E0A\u4F20\u9519\u8BEF\uFF1A\u9519\u8BEF\u4EE3\u7801${_this.status}`)
                }
            }
        },
        finished: function finished() {
            this.files = []
            this.status = 'ready'
        },
        remove: function remove(index) {
            this.files.splice(index, 1)
        },
        fileChanged: function fileChanged() {
            const list = this.$refs.file.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i]
                    }
                    this.html5Reader(list[i], item)
                    this.files.push(item)
                }
            }
        },

        // 将图片文件转成BASE64格式
        html5Reader: function html5Reader(file, item) {
            const _this2 = this

            const reader = new FileReader()
            reader.onload = function (e) {
                _this2.$set(item, 'src', e.target.result)
            }
            reader.readAsDataURL(file)
        },
        isContain: function isContain(file) {
            this.files.forEach((item) => {
                if (item.name === file.name && item.size === file.size) {
                    return true
                }
            })
            return false
        },
        uploadProgress: function uploadProgress(evt) {
            const component = this
            if (evt.lengthComputable) {
                const percentComplete = Math.round(evt.loaded * 100 / evt.total)
                component.percent = percentComplete / 100
            } else {
                console.warn('upload progress unable to compute')
            }
        }
    }
}
/** */ }),
/* 21 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {}
    },
    created: function created() {},

    methods: {}
}
/** */ }),
/* 22 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {}
    },

    methods: {}
}
/** */ }),
/* 23 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {}
    },
    created: function created() {},

    methods: {
        setLoding: function setLoding() {
            const _this = this

            this.$plugins.Loading.show()
            setTimeout(() => {
                _this.$plugins.Loading.close()
            }, 5000)
        }
    }
}
/** */ }),
/* 24 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {}
    },
    created: function created() {},

    methods: {
        alertMsg: function alertMsg() {
            this.$plugins.Popup.alert('设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。')
        },
        confirmMsg: function confirmMsg() {
            const _this = this

            this.$plugins.Popup.confirm({
                title: '删除提示',
                text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。',
                cb: function cb() {
                    _this.$plugins.Popup.alert('删除成功!')
                }
            })
        },
        messageBox: function messageBox() {
            this.$plugins.Popup.message({ text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的1', duration: 1000 })
            this.$plugins.Popup.message({ text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的2', duration: 3000 })
            this.$plugins.Popup.message({ text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的3', duration: 6000 })
            this.$plugins.Popup.message({ text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的4', duration: 10000 })
        }
    }
}
/** */ }),
/* 25 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            options: [{ value: 1, text: '中国工商银行' }, { value: 2, text: '中国农业银行' }, { value: 3, text: '中国建设银行' }, { value: 4, text: '中国交通银行' }, { value: 5, text: '招商银行' }, { value: 6, text: '平安银行' }, { value: 7, text: '农村信用社' }]
        }
    },

    methods: {
        changed: function changed(item) {
            console.warn(item)
        },
        areaChanged: function areaChanged(province, city) {
            console.warn(`${province}-${city}`)
        }
    }
}
/** */ }),
/* 26 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {}
    },
    created: function created() {},

    methods: {}
}
/** */ }),
/* 27 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            list1: [{
                id: '001',
                name: '随便其他什么人吃的东西随便其他什么人吃的东西随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库(储物仓)'
            }, {
                id: '002',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '003',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '004',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '005',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '005',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '005',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '005',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '005',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '005',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '005',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }, {
                id: '005',
                name: '随便其他什么人吃的东西',
                quantity: 10,
                sales: 0,
                price: 10.00,
                orderTime: '2017-03-01 10:00',
                total: 100.00,
                customer: 'John Rogeborger',
                warehouse: '上海市二号仓库'
            }]
        }
    },

    computed: {
        list: function list() {
            return this.$store.state.list
        }
    },
    methods: {}
}
/** */ }),
/* 28 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            active: 'value1'
        }
    },

    computed: {
        list: function list() {
            return this.$store.state.list
        }
    },
    created: function created() {},

    methods: {}
}
/** */ }),
/* 29 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            mode: 'detail', // 菜单模式切换 'brief': 缩略    'detail'： 详情
            list: []
        }
    },
    created: function created() {
        this.list = [{
            title: '综合首页',
            to: '/',
            icon: 'fa fa-home'
        }, {
            title: '按钮标签',
            to: '/button',
            icon: 'fa fa-hand-o-up',
            children: [{ title: '按钮', to: '/button' }, { title: '标签', to: '/span' }]
        }, {
            title: '文本表单',
            icon: 'fa fa-align-left',
            children: [{ title: '表单', to: '/form' }, { title: '下拉框', to: '/select' }]
        }, {
            title: '表格样式',
            to: '/table',
            icon: 'fa fa-table'
        }, {
            title: '弹框提醒',
            to: '/popup',
            icon: 'fa fa-arrows-alt'
        }, {
            title: '加载动画',
            to: '/loading',
            icon: 'fa fa-hourglass-half'
        }]
    },

    watch: {
        mode: function mode(newVal) {
            if (newVal === 'brief') {
                this.briefBind()
            }
        }
    },
    methods: {
        briefBind: function briefBind() {
            const list = document.getElementsByClassName('brief-item')
            if (!list || list.length === 0) {
                return
            }
            list.forEach((item) => {
                item.addEventListener('mouseenter', () => {
                    console.log('enter')
                    const target = event.target
                    const childrenBox = event.target.parentNode.querySelector('div')
                    childrenBox.style.display = childrenBox.style.display === 'none' ? 'block' : 'none'
                }, false)
            })
        },
        next: function next(item, event) {
            event.preventDefault()
            if (item.children && item.children.length > 0) {
                const childrenBox = event.target.parentNode.querySelector('ul')
                childrenBox.style.display = childrenBox.style.display === 'none' ? 'block' : 'none'
            } else {
                this.$router.push({ path: `${item.to}` })
            }
        },
        mouseenter: function mouseenter() {
            console.warn('asd')
        }
    }
}
/** */ }),
/* 30 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            show: false
        }
    }
}
/** */ }),
/* 31 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _modal = __webpack_require__(4)

const _modal2 = _interopRequireDefault(_modal)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

exports.default = {
    data: function data() {
        return {
            text: ''
        }
    },

    methods: {
        close: function close() {
            this.text = ''
        }
    },
    components: {
        modal: _modal2.default
    }
} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/** */ }),
/* 32 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _modal = __webpack_require__(4)

const _modal2 = _interopRequireDefault(_modal)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

exports.default = {
    data: function data() {
        return {
            option: {}
        }
    },

    computed: {
        show: function show() {
            return JSON.stringify(this.option) !== '{}'
        }
    },
    methods: {
        confirm: function confirm() {
            if (this.option.cb && typeof this.option.cb === 'function') {
                this.option.cb()
            }
            this.close()
        },
        close: function close() {
            this.option = {}
        }
    },
    components: {
        modal: _modal2.default
    }
} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/** */ }),
/* 33 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            queue: []
        }
    },

    methods: {
        remove: function remove(index) {
            this.queue.splice(index, 1)
        }
    }
}
/** */ }),
/* 34 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})
exports.default = [{
    children: ['朝阳区', '海淀区', '西城区', '东城区', '崇文区', '宣武区', '丰台区', '石景山区', '门头沟', '房山区', '通州区', '大兴区', '顺义区', '怀柔区', '密云区', '昌平区', '平谷区', '延庆县'],
    name: '北京'
}, {
    children: ['黄浦区', '卢湾区', '徐汇区', '长宁区', '静安区', '闸北区', '虹口区', '杨浦区', '宝山区', '闵行区', '嘉定区', '浦东新区', '青浦区', '松江区', '金山区', '南汇区', '奉贤区', '普陀区', '崇明县'],
    name: '上海'
}, {
    children: ['东丽区', '和平区', '河北区', '河东区', '河西区', '红桥区', '蓟县', '静海县', '南开区', '塘沽区', '西青区', '武清区', '津南区', '汉沽区', '大港区', '北辰区', '宝坻区', '宁河县'],
    name: '天津'
}, {
    children: ['万州区', '涪陵区', '梁平县', '南川区', '潼南县', '大足区', '黔江区', '武隆县', '丰都县', '奉节县', '开县', '云阳县', '忠县', '巫溪县', '巫山县', '石柱县', '彭水县', '垫江县', '酉阳县', '秀山县', '城口县', '璧山县', '荣昌县', '铜梁县', '合川区', '巴南区', '北碚区', '江津区', '渝北区', '长寿区', '永川区', '江北区', '南岸区', '九龙坡区', '沙坪坝区', '大渡口区', '綦江区', '渝中区', '高新区', '北部新区'],
    name: '重庆'
}, {
    children: ['石家庄市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '秦皇岛市', '唐山市', '沧州市', '廊坊市', '衡水市'],
    name: '河北'
}, {
    children: ['太原市', '大同市', '阳泉市', '晋城市', '朔州市', '晋中市', '忻州市', '吕梁市', '临汾市', '运城市', '长治市'],
    name: '山西'
}, {
    children: ['郑州市', '开封市', '洛阳市', '平顶山市', '焦作市', '鹤壁市', '新乡市', '安阳市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '周口市', '驻马店市', '信阳市', '济源市'],
    name: '河南'
}, {
    children: ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '葫芦岛市', '营口市', '盘锦市', '阜新市', '辽阳市', '朝阳市', '铁岭市'],
    name: '辽宁'
}, {
    children: ['长春市', '吉林市', '四平市', '通化市', '白山市', '松原市', '白城市', '延边州', '辽源市'],
    name: '吉林'
}, {
    children: ['哈尔滨市', '齐齐哈尔市', '鹤岗市', '双鸭山市', '鸡西市', '大庆市', '伊春市', '牡丹江市', '佳木斯市', '七台河市', '黑河市', '绥化市', '大兴安岭地区'],
    name: '黑龙江'
}, {
    children: ['呼和浩特市', '包头市', '乌海市', '赤峰市', '乌兰察布市', '锡林郭勒盟', '呼伦贝尔市', '鄂尔多斯市', '巴彦淖尔市', '阿拉善盟', '兴安盟', '通辽市'],
    name: '内蒙古'
}, {
    children: ['南京市', '徐州市', '连云港市', '淮安市', '宿迁市', '盐城市', '扬州市', '泰州市', '南通市', '镇江市', '常州市', '无锡市', '苏州市'],
    name: '江苏'
}, {
    children: ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '潍坊市', '烟台市', '威海市', '莱芜市', '德州市', '临沂市', '聊城市', '滨州市', '菏泽市', '日照市', '泰安市', '济宁市'],
    name: '山东'
}, {
    children: ['铜陵市', '合肥市', '淮南市', '淮北市', '芜湖市', '蚌埠市', '马鞍山市', '安庆市', '黄山市', '滁州市', '阜阳市', '亳州市', '宿州市', '池州市', '六安市', '宣城市'],
    name: '安徽'
}, {
    children: ['宁波市', '杭州市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '丽水市', '台州市', '舟山市'],
    name: '浙江'
}, {
    children: ['福州市', '厦门市', '三明市', '莆田市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'],
    name: '福建'
}, {
    children: ['武汉市', '黄石市', '襄阳市', '十堰市', '荆州市', '宜昌市', '孝感市', '黄冈市', '咸宁市', '恩施州', '鄂州市', '荆门市', '随州市', '潜江市', '天门市', '仙桃市', '神农架林区'],
    name: '湖北'
}, {
    children: ['长沙市', '株洲市', '湘潭市', '韶山市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '郴州市', '益阳市', '永州市', '怀化市', '娄底市', '湘西州'],
    name: '湖南'
}, {
    children: ['广州市', '深圳市', '珠海市', '汕头市', '韶关市', '河源市', '梅州市', '惠州市', '汕尾市', '东莞市', '中山市', '江门市', '佛山市', '阳江市', '湛江市', '茂名市', '肇庆市', '云浮市', '清远市', '潮州市', '揭阳市'],
    name: '广东'
}, {
    children: ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '贺州市', '百色市', '河池市', '来宾市', '崇左市'],
    name: '广西'
}, {
    children: ['南昌市', '景德镇市', '萍乡市', '新余市', '九江市', '鹰潭市', '上饶市', '宜春市', '抚州市', '吉安市', '赣州市'],
    name: '江西'
}, {
    children: ['成都市', '自贡市', '攀枝花市', '泸州市', '绵阳市', '德阳市', '广元市', '遂宁市', '内江市', '乐山市', '宜宾市', '广安市', '南充市', '达州市', '巴中市', '雅安市', '眉山市', '资阳市', '阿坝州', '甘孜州', '凉山州'],
    name: '四川'
}, {
    children: ['海口市', '儋州市', '琼海市', '万宁市', '东方市', '三亚市', '文昌市', '五指山市', '临高县', '澄迈县', '定安县', '屯昌县', '昌江县', '白沙县', '琼中县', '陵水县', '保亭县', '乐东县', '三沙市'],
    name: '海南'
}, {
    children: ['贵阳市', '六盘水市', '遵义市', '铜仁市', '毕节市', '安顺市', '黔西南州', '黔东南州', '黔南州'],
    name: '贵州'
}, {
    children: ['昆明市', '曲靖市', '玉溪市', '昭通市', '普洱市', '临沧市', '保山市', '丽江市', '文山州', '红河州', '西双版纳州', '楚雄州', '大理州', '德宏州', '怒江州', '迪庆州'],
    name: '云南'
}, {
    children: ['拉萨市', '那曲地区', '山南地区', '昌都地区', '日喀则地区', '阿里地区', '林芝地区'],
    name: '西藏'
}, {
    children: ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '商洛市', '安康市'],
    name: '陕西'
}, {
    children: ['兰州市', '金昌市', '白银市', '天水市', '嘉峪关市', '平凉市', '庆阳市', '陇南市', '武威市', '张掖市', '酒泉市', '甘南州', '临夏州', '定西市'],
    name: '甘肃'
}, {
    children: ['西宁市', '海东地区', '海北州', '黄南州', '海南州', '果洛州', '玉树州', '海西州'],
    name: '青海'
}, {
    children: ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'],
    name: '宁夏'
}, {
    children: ['乌鲁木齐市', '克拉玛依市', '石河子市', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏州', '巴音郭楞州', '昌吉州', '博尔塔拉州', '伊犁州', '塔城地区', '阿勒泰地区', '五家渠市', '阿拉尔市', '图木舒克市'],
    name: '新疆'
}, {
    children: ['台湾'],
    name: '台湾'
}, {
    children: ['香港特别行政区'],
    name: '香港'
}, {
    children: ['澳门市'],
    name: '澳门'
}]
/** */ }),
/* 35 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _vue = __webpack_require__(3)

const _vue2 = _interopRequireDefault(_vue)

const _loading = __webpack_require__(73)

const _loading2 = _interopRequireDefault(_loading)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

const loadingBox = document.createElement('div')
document.body.appendChild(loadingBox)

const loadingComponent = new _vue2.default(_loading2.default).$mount(loadingBox)
const show = function show() {
    loadingComponent.show = true
}
const close = function close() {
    loadingComponent.show = false
}

exports.default = {
    show, close
}
/** */ }),
/* 36 */
/** */ (function (module, exports, __webpack_require__) {
Object.defineProperty(exports, '__esModule', {
    value: true
})

const _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }

const _vue = __webpack_require__(3)

const _vue2 = _interopRequireDefault(_vue)

const _alert = __webpack_require__(74)

const _alert2 = _interopRequireDefault(_alert)

const _confirm = __webpack_require__(75)

const _confirm2 = _interopRequireDefault(_confirm)

const _message = __webpack_require__(76)

const _message2 = _interopRequireDefault(_message)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

// Alert框
const alertBox = document.createElement('div')
document.body.appendChild(alertBox)

const alertComponent = new _vue2.default(_alert2.default).$mount(alertBox)
const alert = function alert(text) {
    alertComponent.text = text
}

// Confirm框
const confirmBox = document.createElement('div')
document.body.appendChild(confirmBox)

const confirmComponent = new _vue2.default(_confirm2.default).$mount(confirmBox)
const confirm = function confirm(option) {
    confirmComponent.option = option
}

// Message列表
const messageBox = document.createElement('div')
document.body.appendChild(messageBox)

const messageComponent = new _vue2.default(_message2.default).$mount(messageBox)
let counter = 1
const message = function message(option) {
    const temp = counter
    if (typeof option === 'string') {
        messageComponent.queue.push({
            text: option,
            stamp: temp
        })
    }
    if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
        messageComponent.queue.push({
            text: option.text,
            stamp: temp
        })
    }
    counter++
    setTimeout(() => {
        messageComponent.queue.forEach((item, index) => {
            if (item.stamp === temp) {
                messageComponent.queue.splice(index, 1)
            }
        })
    }, option.duration || 5000)
}

exports.default = {
    alert,
    confirm,
    message
}
/** */ }),
/* 37 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.popup-confirm .content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.popup-confirm .content > p {\n    text-align: left;\n}\n', ''])

// exports
/** */ }),
/* 38 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', ''])

// exports
/** */ }),
/* 39 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', ''])

// exports
/** */ }),
/* 40 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\nhtml, body {\n  height: 100%;\n  width: 100%;\n  font-size: 14px;\n  font-family: 'Microsoft Yahei';\n}\n\n/*\n** 杂项生成器\n*/\n/*\n** 布局部分, 采用栅格布局 将每个flex类分为10个栅格\n** 采用flex布局\n*/\n.flex {\n  display: flex;\n}\n.flex .col1 {\n    flex-grow: 1;\n}\n.flex .col2 {\n    flex-grow: 2;\n}\n.flex .col3 {\n    flex-grow: 3;\n}\n.flex .col4 {\n    flex-grow: 4;\n}\n.flex .col5 {\n    flex-grow: 5;\n}\n.flex .col6 {\n    flex-grow: 6;\n}\n.flex .col7 {\n    flex-grow: 7;\n}\n.flex .col8 {\n    flex-grow: 8;\n}\n.flex .col9 {\n    flex-grow: 9;\n}\n.flex .col10 {\n    flex-grow: 10;\n}\n.flex.column {\n    flex-direction: column;\n}\n\n/*\n** 链接部分\n*/\na {\n  cursor: pointer;\n}\na.primary {\n    color: #0996d1;\n}\na.no-decoration {\n    text-decoration: none;\n}\n\n/*\n** 文本部分\n*/\np.clear-margin {\n  margin: 0;\n}\n.text.white {\n  color: #fff;\n}\n.text.gray {\n  color: gray;\n}\n.text.small {\n  font-size: 12px;\n}\n.text.big {\n  font-size: 16px;\n}\nh1 {\n  font-size: 2.5rem;\n}\nh2 {\n  font-size: 2.2rem;\n}\nh3 {\n  font-size: 1.9rem;\n}\nh4 {\n  font-size: 1.5rem;\n}\nh5 {\n  font-size: 1.2rem;\n}\nh1.title, h2.title, h3.title, h4.title, h5.title {\n  border-bottom: 1px solid #ddd;\n  padding-bottom: 5px;\n  color: #555;\n  font-size: 400;\n}\nspan.span {\n  padding: 2px 5px;\n  border-radius: 3px;\n  font-size: 12px;\n  background: #e0e0e0;\n}\nspan.span.arrow-left {\n    position: relative;\n    border-radius: 0px 3px 3px 0px;\n}\nspan.span.arrow-left::before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      left: -10px;\n      top: 0;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-right: 10px solid #e0e0e0;\n}\nspan.span.arrow-right {\n    position: relative;\n    border-radius: 3px 0px 0px 3px;\n}\nspan.span.arrow-right::after {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      top: 0px;\n      right: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-left: 10px solid #e0e0e0;\n}\nspan.primary {\n  color: #fff;\n  background: #0996d1;\n}\nspan.primary.arrow-left {\n    position: relative;\n    border-radius: 0px 3px 3px 0px;\n}\nspan.primary.arrow-left::before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      left: -10px;\n      top: 0;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-right: 10px solid #0996d1;\n}\nspan.primary.arrow-right {\n    position: relative;\n    border-radius: 3px 0px 0px 3px;\n}\nspan.primary.arrow-right::after {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      top: 0px;\n      right: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-left: 10px solid #0996d1;\n}\nspan.info {\n  color: #fff;\n  background: #00b4aa;\n}\nspan.info.arrow-left {\n    position: relative;\n    border-radius: 0px 3px 3px 0px;\n}\nspan.info.arrow-left::before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      left: -10px;\n      top: 0;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-right: 10px solid #00b4aa;\n}\nspan.info.arrow-right {\n    position: relative;\n    border-radius: 3px 0px 0px 3px;\n}\nspan.info.arrow-right::after {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      top: 0px;\n      right: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-left: 10px solid #00b4aa;\n}\nspan.danger {\n  color: #fff;\n  background: #f44336;\n}\nspan.danger.arrow-left {\n    position: relative;\n    border-radius: 0px 3px 3px 0px;\n}\nspan.danger.arrow-left::before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      left: -10px;\n      top: 0;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-right: 10px solid #f44336;\n}\nspan.danger.arrow-right {\n    position: relative;\n    border-radius: 3px 0px 0px 3px;\n}\nspan.danger.arrow-right::after {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      top: 0px;\n      right: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-left: 10px solid #f44336;\n}\nlabel {\n  align-self: center;\n}\npre {\n  margin: 0;\n  padding: 10px;\n  color: #444;\n  background: #f0f0f0;\n}\n\n/*\n** 输入框部分\n*/\ninput[type='text'],\ninput[type='password'],\ninput[type='email'],\ninput[type='url'] {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  height: 26px;\n  border: 1px solid #BFCBD7;\n}\ninput[type='text']:hover,\n  input[type='password']:hover,\n  input[type='email']:hover,\n  input[type='url']:hover {\n    border: 1px solid #999;\n}\ninput[type='text']:focus,\n  input[type='password']:focus,\n  input[type='email']:focus,\n  input[type='url']:focus {\n    border: 1px solid #20a0ff;\n    outline: none;\n}\nselect {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  padding: 0px 8px;\n  height: 32px;\n  border-radius: 2px;\n  background: #fff;\n  border: 1px solid #BFCBD7;\n  border-radius: 2px;\n}\nselect:hover {\n    border: 1px solid #999;\n}\nselect:focus {\n    border: 1px solid #20a0ff;\n    outline: none;\n}\nselect:after {\n    content: ' ';\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    background: #007ACC;\n}\ninput {\n  padding: 2px 5px;\n}\ninput.input {\n    border-radius: 2px;\n}\ninput.underline {\n    border: none;\n    border-bottom: 1px solid #BFCBD7;\n    border-radius: none;\n    outline: none;\n}\ninput.underline:hover {\n      border: none;\n      border-bottom: 1px solid #999;\n      border-radius: none;\n      outline: none;\n}\ninput.underline:focus {\n      border: none;\n      border-bottom: 1px solid #20a0ff;\n      border-radius: none;\n      outline: none;\n      outline: none;\n}\ntextarea {\n  -webkit-appearance: none;\n  padding: 4px;\n  border-radius: 2px;\n  border: 1px solid #BFCBD7;\n}\ntextarea:focus {\n    border: 1px solid #20a0ff;\n    outline: none;\n}\n\n/*\n** 按钮部分\n*/\n.button {\n  padding: 7px 20px;\n  border: none;\n  cursor: pointer;\n  background: #eee;\n  border-radius: 2px;\n}\n.button.small {\n    font-size: 12px;\n    padding: 2px 12px;\n}\n.button:active {\n    background: #f5f5f5;\n}\n.button.big {\n    padding: 11px 45px;\n}\n.button.primary {\n    color: #fff;\n    background: #0996d1;\n}\n.button.primary:hover {\n      background: #0771B9;\n}\n.button.primary:active {\n      background: #0996d1;\n}\n.button.danger {\n    color: #fff;\n    background: #f44336;\n}\n.button.danger:hover {\n      background: #d8271a;\n}\n.button.danger:active {\n      background: #f44336;\n}\n.button.info {\n    color: #fff;\n    background: #00b4aa;\n}\n.button.info:hover {\n      background: #04ada3;\n}\n.button.info:active {\n      background: #00b4aa;\n}\n.button.shadow {\n    box-shadow: 0px 2px 3px #999;\n}\n.button.shadow:hover {\n      box-shadow: 0px 2px 4px #777;\n}\n.button:focus {\n    outline: none;\n}\n.btn-group {\n  display: inline-block;\n  font-size: 0px;\n  border-radius: 4px;\n}\n.btn-group button {\n    margin: 0px -1px;\n    font-size: 14px;\n    border-radius: 0px;\n    border: 0.5px solid #ccc;\n    background: #fff;\n}\n.btn-group button:first-child {\n      border-radius: 4px 0px 0px 4px;\n}\n.btn-group button:last-child {\n      border-radius: 0px 4px 4px 0px;\n}\n.btn-group button.active {\n      color: #fff;\n      background: #4aa6fc;\n      border-color: #4aa6fc;\n}\n\n/*\n** 表格\n*/\ntable.table {\n  width: 100%;\n  border-collapse: collapse;\n}\ntable.table.primary thead {\n    color: #fff;\n    background-color: #0996d1;\n    background-image: linear-gradient(#5eb2ea, #0996d1);\n    border: 1px solid #5eb2ea;\n}\ntable.table th, table.table td {\n    border-collapse: collapse;\n}\ntable.table thead {\n    line-height: 30px;\n    border: 1px solid #ddd;\n    background-color: #eee;\n    background-image: linear-gradient(#fcfcfc, #eee);\n}\ntable.table thead th {\n      border: none;\n}\ntable.table tbody tr {\n    line-height: 32px;\n}\ntable.table tbody tr td {\n      font-size: 12px;\n      border: 1px solid #ddd;\n}\ntable.table tbody tr.center td {\n      text-align: center;\n}\ntable.table-striped tbody tr:nth-child(2n) {\n  background: #f0f0f0;\n}\n\n/*\n** 表单部分\n*/\n.form .form-title {\n  margin: 8px 0px;\n  font-weight: 400;\n  border-bottom: 1px solid #ddd;\n}\n.form .form-group {\n  margin: 14px 0px;\n}\n.form .form-group.item {\n    display: flex;\n}\n.form .form-group.item label {\n      color: #444;\n      padding: 0px 5px;\n}\n.form .form-group.item input, .form .form-group.item textarea {\n      flex-grow: 1;\n}\n\n/**\n** 通用部分\n**/\n.pull-left {\n  float: left;\n}\n.pull-right {\n  float: right;\n}\n.clearfix:after {\n  content: '';\n  display: block;\n  clear: both;\n  visibility: hidden;\n  line-height: 0;\n  height: 0;\n  font-size: 0;\n}\n.text-ellipsis {\n  word-break: break-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.side-menu {\n  display: inline-block;\n  height: 100%;\n  background: #f8f8f8;\n  border-right: 1px solid #e1e2e2;\n  transition: all ease .2s;\n}\n.side-menu h4 {\n    color: #666;\n}\n.side-menu h4 i {\n      cursor: pointer;\n}\n.side-menu .menu-title {\n    margin: 0;\n    line-height: 40px;\n    font-size: 14px;\n    background: #f2f3f4;\n    border-bottom: 1px solid #e1e2e2;\n}\n.side-menu .menu-title a {\n      float: right;\n      line-height: 40px;\n}\n.side-menu .menu-title.brief {\n      padding-left: 0px;\n}\n.side-menu .menu-title.brief a {\n        margin-right: 13px;\n}\n.side-menu .menu-title.detail {\n      padding-left: 18px;\n}\n.side-menu .menu-title.detail a {\n        margin-right: 8px;\n}\n.side-menu ul {\n    margin: 0px;\n    padding-left: 0px;\n    list-style: none;\n}\n.side-menu ul li {\n      line-height: 40px;\n}\n.side-menu ul li a {\n        display: block;\n        color: #888888;\n        font-size: 12px;\n}\n.side-menu ul li a:hover {\n          color: #007ACC;\n}\n.side-menu ul li:hover {\n        background: #f3f4f4;\n}\n.side-menu ul.brief {\n      width: 40px;\n}\n.side-menu ul.brief > li {\n        position: relative;\n}\n.side-menu ul.brief > li > a {\n          text-align: center;\n          font-size: 14px;\n}\n.side-menu ul.brief > li > div {\n          display: none;\n          position: absolute;\n          left: 40px;\n          top: 0;\n          margin-top: -1px;\n          z-index: 101;\n}\n.side-menu ul.brief > li > div p {\n            margin: 0;\n            padding: 0px 10px;\n            background: #f8f8f8;\n            line-height: 40px;\n            border: 1px solid #ddd;\n            border-bottom: none;\n}\n.side-menu ul.brief > li > div .children-box {\n            padding-left: 0px;\n            width: 130px;\n            background: #fff;\n            border-top: 1px solid #ddd;\n            border-bottom: 1px solid #ddd;\n}\n.side-menu ul.brief > li > div .children-box li {\n              padding: 0px 10px;\n              border-left: 1px solid #ddd;\n              border-right: 1px solid #ddd;\n              line-height: 34px;\n}\n.side-menu ul.brief > li:hover {\n          margin: -1px 0px;\n          border-top: 1px solid #ddd;\n          border-bottom: 1px solid #ddd;\n}\n.side-menu ul.brief > li:hover > div {\n            display: inline;\n}\n.side-menu ul.detail {\n      width: 110px;\n}\n.side-menu ul.detail > li > a {\n        padding: 0px 10px;\n}\n.side-menu ul.detail > li > div ul {\n        padding-left: 24px;\n}\n.side-menu ul.detail > li > div ul li {\n          line-height: 30px;\n}\n", ''])

// exports
/** */ }),
/* 41 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.popup-alert .content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.popup-alert .content > .icon {\n    width: 30px;\n    min-width: 30px;\n    height: 30px;\n    text-align: center;\n    font-size: 22px;\n    font-weight: bolder;\n    display: inline-block;\n    border-radius: 100%;\n    color: #fff;\n    border: none;\n    background: #00b4aa;\n}\n.popup-alert .content > .main {\n    padding-left: 10px;\n}\n', ''])

// exports
/** */ }),
/* 42 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports
exports.i(__webpack_require__(57), '')

// module
exports.push([module.i, "\n@charset \"UTF-8\";\nhtml, body {\n  height: 100%;\n  width: 100%;\n  font-size: 14px;\n  font-family: 'Microsoft Yahei';\n}\n\n/*\n** 杂项生成器\n*/\n/*\n** 布局部分, 采用栅格布局 将每个flex类分为10个栅格\n** 采用flex布局\n*/\n.flex {\n  display: flex;\n}\n.flex .col1 {\n    flex-grow: 1;\n}\n.flex .col2 {\n    flex-grow: 2;\n}\n.flex .col3 {\n    flex-grow: 3;\n}\n.flex .col4 {\n    flex-grow: 4;\n}\n.flex .col5 {\n    flex-grow: 5;\n}\n.flex .col6 {\n    flex-grow: 6;\n}\n.flex .col7 {\n    flex-grow: 7;\n}\n.flex .col8 {\n    flex-grow: 8;\n}\n.flex .col9 {\n    flex-grow: 9;\n}\n.flex .col10 {\n    flex-grow: 10;\n}\n.flex.column {\n    flex-direction: column;\n}\n\n/*\n** 链接部分\n*/\na {\n  cursor: pointer;\n}\na.primary {\n    color: #0996d1;\n}\na.no-decoration {\n    text-decoration: none;\n}\n\n/*\n** 文本部分\n*/\np.clear-margin {\n  margin: 0;\n}\n.text.white {\n  color: #fff;\n}\n.text.gray {\n  color: gray;\n}\n.text.small {\n  font-size: 12px;\n}\n.text.big {\n  font-size: 16px;\n}\nh1 {\n  font-size: 2.5rem;\n}\nh2 {\n  font-size: 2.2rem;\n}\nh3 {\n  font-size: 1.9rem;\n}\nh4 {\n  font-size: 1.5rem;\n}\nh5 {\n  font-size: 1.2rem;\n}\nh1.title, h2.title, h3.title, h4.title, h5.title {\n  border-bottom: 1px solid #ddd;\n  padding-bottom: 5px;\n  color: #555;\n  font-size: 400;\n}\nspan.span {\n  padding: 2px 5px;\n  border-radius: 3px;\n  font-size: 12px;\n  background: #e0e0e0;\n}\nspan.span.arrow-left {\n    position: relative;\n    border-radius: 0px 3px 3px 0px;\n}\nspan.span.arrow-left::before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      left: -10px;\n      top: 0;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-right: 10px solid #e0e0e0;\n}\nspan.span.arrow-right {\n    position: relative;\n    border-radius: 3px 0px 0px 3px;\n}\nspan.span.arrow-right::after {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      top: 0px;\n      right: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-left: 10px solid #e0e0e0;\n}\nspan.primary {\n  color: #fff;\n  background: #0996d1;\n}\nspan.primary.arrow-left {\n    position: relative;\n    border-radius: 0px 3px 3px 0px;\n}\nspan.primary.arrow-left::before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      left: -10px;\n      top: 0;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-right: 10px solid #0996d1;\n}\nspan.primary.arrow-right {\n    position: relative;\n    border-radius: 3px 0px 0px 3px;\n}\nspan.primary.arrow-right::after {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      top: 0px;\n      right: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-left: 10px solid #0996d1;\n}\nspan.info {\n  color: #fff;\n  background: #00b4aa;\n}\nspan.info.arrow-left {\n    position: relative;\n    border-radius: 0px 3px 3px 0px;\n}\nspan.info.arrow-left::before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      left: -10px;\n      top: 0;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-right: 10px solid #00b4aa;\n}\nspan.info.arrow-right {\n    position: relative;\n    border-radius: 3px 0px 0px 3px;\n}\nspan.info.arrow-right::after {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      top: 0px;\n      right: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-left: 10px solid #00b4aa;\n}\nspan.danger {\n  color: #fff;\n  background: #f44336;\n}\nspan.danger.arrow-left {\n    position: relative;\n    border-radius: 0px 3px 3px 0px;\n}\nspan.danger.arrow-left::before {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      left: -10px;\n      top: 0;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-right: 10px solid #f44336;\n}\nspan.danger.arrow-right {\n    position: relative;\n    border-radius: 3px 0px 0px 3px;\n}\nspan.danger.arrow-right::after {\n      display: block;\n      content: ' ';\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      top: 0px;\n      right: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 11px solid transparent;\n      border-left: 10px solid #f44336;\n}\nlabel {\n  align-self: center;\n}\npre {\n  margin: 0;\n  padding: 10px;\n  color: #444;\n  background: #f0f0f0;\n}\n\n/*\n** 输入框部分\n*/\ninput[type='text'],\ninput[type='password'],\ninput[type='email'],\ninput[type='url'] {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  height: 26px;\n  border: 1px solid #BFCBD7;\n}\ninput[type='text']:hover,\n  input[type='password']:hover,\n  input[type='email']:hover,\n  input[type='url']:hover {\n    border: 1px solid #999;\n}\ninput[type='text']:focus,\n  input[type='password']:focus,\n  input[type='email']:focus,\n  input[type='url']:focus {\n    border: 1px solid #20a0ff;\n    outline: none;\n}\nselect {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  padding: 0px 8px;\n  height: 32px;\n  border-radius: 2px;\n  background: #fff;\n  border: 1px solid #BFCBD7;\n  border-radius: 2px;\n}\nselect:hover {\n    border: 1px solid #999;\n}\nselect:focus {\n    border: 1px solid #20a0ff;\n    outline: none;\n}\nselect:after {\n    content: ' ';\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    background: #007ACC;\n}\ninput {\n  padding: 2px 5px;\n}\ninput.input {\n    border-radius: 2px;\n}\ninput.underline {\n    border: none;\n    border-bottom: 1px solid #BFCBD7;\n    border-radius: none;\n    outline: none;\n}\ninput.underline:hover {\n      border: none;\n      border-bottom: 1px solid #999;\n      border-radius: none;\n      outline: none;\n}\ninput.underline:focus {\n      border: none;\n      border-bottom: 1px solid #20a0ff;\n      border-radius: none;\n      outline: none;\n      outline: none;\n}\ntextarea {\n  -webkit-appearance: none;\n  padding: 4px;\n  border-radius: 2px;\n  border: 1px solid #BFCBD7;\n}\ntextarea:focus {\n    border: 1px solid #20a0ff;\n    outline: none;\n}\n\n/*\n** 按钮部分\n*/\n.button {\n  padding: 7px 20px;\n  border: none;\n  cursor: pointer;\n  background: #eee;\n  border-radius: 2px;\n}\n.button.small {\n    font-size: 12px;\n    padding: 2px 12px;\n}\n.button:active {\n    background: #f5f5f5;\n}\n.button.big {\n    padding: 11px 45px;\n}\n.button.primary {\n    color: #fff;\n    background: #0996d1;\n}\n.button.primary:hover {\n      background: #0771B9;\n}\n.button.primary:active {\n      background: #0996d1;\n}\n.button.danger {\n    color: #fff;\n    background: #f44336;\n}\n.button.danger:hover {\n      background: #d8271a;\n}\n.button.danger:active {\n      background: #f44336;\n}\n.button.info {\n    color: #fff;\n    background: #00b4aa;\n}\n.button.info:hover {\n      background: #04ada3;\n}\n.button.info:active {\n      background: #00b4aa;\n}\n.button.shadow {\n    box-shadow: 0px 2px 3px #999;\n}\n.button.shadow:hover {\n      box-shadow: 0px 2px 4px #777;\n}\n.button:focus {\n    outline: none;\n}\n.btn-group {\n  display: inline-block;\n  font-size: 0px;\n  border-radius: 4px;\n}\n.btn-group button {\n    margin: 0px -1px;\n    font-size: 14px;\n    border-radius: 0px;\n    border: 0.5px solid #ccc;\n    background: #fff;\n}\n.btn-group button:first-child {\n      border-radius: 4px 0px 0px 4px;\n}\n.btn-group button:last-child {\n      border-radius: 0px 4px 4px 0px;\n}\n.btn-group button.active {\n      color: #fff;\n      background: #4aa6fc;\n      border-color: #4aa6fc;\n}\n\n/*\n** 表格\n*/\ntable.table {\n  width: 100%;\n  border-collapse: collapse;\n}\ntable.table.primary thead {\n    color: #fff;\n    background-color: #0996d1;\n    background-image: linear-gradient(#5eb2ea, #0996d1);\n    border: 1px solid #5eb2ea;\n}\ntable.table th, table.table td {\n    border-collapse: collapse;\n}\ntable.table thead {\n    line-height: 30px;\n    border: 1px solid #ddd;\n    background-color: #eee;\n    background-image: linear-gradient(#fcfcfc, #eee);\n}\ntable.table thead th {\n      border: none;\n}\ntable.table tbody tr {\n    line-height: 32px;\n}\ntable.table tbody tr td {\n      font-size: 12px;\n      border: 1px solid #ddd;\n}\ntable.table tbody tr.center td {\n      text-align: center;\n}\ntable.table-striped tbody tr:nth-child(2n) {\n  background: #f0f0f0;\n}\n\n/*\n** 表单部分\n*/\n.form .form-title {\n  margin: 8px 0px;\n  font-weight: 400;\n  border-bottom: 1px solid #ddd;\n}\n.form .form-group {\n  margin: 14px 0px;\n}\n.form .form-group.item {\n    display: flex;\n}\n.form .form-group.item label {\n      color: #444;\n      padding: 0px 5px;\n}\n.form .form-group.item input, .form .form-group.item textarea {\n      flex-grow: 1;\n}\n\n/**\n** 通用部分\n**/\n.pull-left {\n  float: left;\n}\n.pull-right {\n  float: right;\n}\n.clearfix:after {\n  content: '';\n  display: block;\n  clear: both;\n  visibility: hidden;\n  line-height: 0;\n  height: 0;\n  font-size: 0;\n}\n.text-ellipsis {\n  word-break: break-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.input-icon {\n  display: flex;\n  margin-bottom: 15px;\n}\n.input-icon .icon-right {\n    border-radius: 2px 0px 0px 2px;\n}\n.input-icon .icon-left {\n    border-radius: 0px 2px 2px 0px;\n}\n.input-icon section {\n    height: 30px;\n    width: 30px;\n    border: 1px solid #BFCBD7;\n    display: inline-block;\n    line-height: 30px;\n    text-align: center;\n    background: #ddd;\n    cursor: pointer;\n}\n.input-icon .icon-box.left {\n    border-width: 1px 0px 1px 1px;\n    border-radius: 2px 0px 0px 2px;\n}\n.input-icon .icon-box.right {\n    border-width: 1px 1px 1px 0px;\n    border-radius: 0px 2px 2px 0px;\n}\n.app {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.app > header {\n    flex-grow: 0;\n}\n.app > header nav {\n      height: 50px;\n      padding: 0px 30px;\n      line-height: 50px;\n      background: linear-gradient(to right, #1278f6, #069fc5);\n}\n.app > header nav > h3 {\n        display: inline-block;\n        margin: 0;\n        color: #fff;\n        font-family: fantasy;\n}\n.app > header nav .logined-list {\n        margin: 0px;\n        padding-left: 0px;\n        list-style: none;\n}\n.app > header nav .logined-list > li {\n          float: left;\n          padding: 0px 10px;\n          position: relative;\n}\n.app > header nav .logined-list > li section {\n            display: none;\n            position: absolute;\n            left: 0;\n            min-width: 100%;\n}\n.app > header nav .logined-list > li section ul {\n              padding-left: 0px;\n              background: #fff;\n              list-style: none;\n              border: 1px solid #e5e5e5;\n              border-top: none;\n              box-shadow: 0px 2px 5px #eee;\n}\n.app > header nav .logined-list > li section ul li {\n                padding: 0px 10px;\n                text-align: center;\n                line-height: 34px;\n}\n.app > header nav .logined-list > li section ul li:hover {\n                  background: #f5f5f5;\n                  cursor: pointer;\n}\n.app > header nav .logined-list > li:hover {\n            background: #1c80c3;\n}\n.app > header nav .logined-list > li:hover section {\n              display: block;\n}\n.app > article {\n    display: flex;\n    flex-grow: 1;\n    overflow-y: scroll;\n}\n.app > article .app-left, .app > article .app-right {\n      display: inline-block;\n}\n.app > article .app-left {\n      flex-grow: 0;\n}\n.app > article .app-right {\n      display: flex;\n      flex-direction: column;\n      flex-grow: 1;\n}\n.app .app-content {\n    display: flex;\n    flex-direction: column;\n    flex-grow: 1;\n    box-sizing: border-box;\n    width: 100%;\n    padding: 10px 10px 0px 10px;\n    background: #e2e2e2;\n    overflow-y: auto;\n}\n.app .app-content .init-page {\n      flex-grow: 1;\n      padding: 10px;\n      background: #fff;\n      border: 1px solid #ececec;\n      box-shadow: 0 0 5px 5px #ececec;\n}\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s;\n}\n.fade-enter, .fade-leave-active {\n  opacity: 0;\n}\n.slide-fade-enter-active {\n  transition: all .3s ease;\n}\n.slide-fade-leave-active {\n  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);\n}\n.slide-fade-enter, .slide-fade-leave-active {\n  transform: translateX(10px);\n  opacity: 0;\n}\n.slide-left-enter, .slide-right-leave-active {\n  opacity: 0;\n  -webkit-transform: translate(30px, 0);\n  transform: translate(30px, 0);\n}\n.slide-left-leave-active, .slide-right-enter {\n  opacity: 0;\n  -webkit-transform: translate(-30px, 0);\n  transform: translate(-30px, 0);\n}\n", ''])

// exports
/** */ }),
/* 43 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', ''])

// exports
/** */ }),
/* 44 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', ''])

// exports
/** */ }),
/* 45 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, "\n.wy-pager {\n  text-align: center;\n}\n.wy-pager > div {\n    display: inline-block;\n}\n.wy-pager > div > button, .wy-pager > div div {\n      float: left;\n      display: inline-block;\n}\n.wy-pager > div > div span {\n      margin: 0 3px;\n}\n.wy-pager > div::after {\n      content: '';\n      display: block;\n      height: 0;\n      clear: both;\n      visibility: hidden;\n      line-height: 0;\n      font-size: 0;\n}\n.wy-pager button {\n    margin: 0px 3px;\n    padding: 5px 10px;\n    color: #666;\n    background: #fff;\n    border: 1px solid #e5e5e5;\n    outline: none;\n    cursor: pointer;\n}\n.wy-pager .pager-btn-group {\n    display: inline;\n    padding-left: 0;\n    list-style: none;\n}\n.wy-pager .pager-btn-group li.btn-item {\n      float: left;\n      padding: 5px 10px;\n      margin: 0px 3px;\n      border: 1px solid #fff;\n      box-shadow: 0 2px 3px #666;\n      cursor: pointer;\n      color: #666;\n}\n.wy-pager .pager-btn-group li.btn-item.active {\n        color: #fff;\n        background: #007ACC;\n        border: 1px solid #007abb;\n        box-shadow: 0 2px 3px #666;\n}\n.wy-pager .pager-pre, .wy-pager .pager-next {\n    color: #007abb;\n    border: 1px solid #007abb;\n    /* box-shadow: 0 2px 3px #666; */\n}\n", ''])

// exports
/** */ }),
/* 46 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.area-selector {\n  position: relative;\n}\n.area-selector input {\n    width: 160px;\n    background-color: #eee;\n    background-image: linear-gradient(#fcfcfc, #eee);\n}\n.area-selector .options-box {\n    position: absolute;\n    max-height: 265px;\n    overflow-y: scroll;\n    z-index: 2;\n}\n.area-selector .options-box ul {\n      padding-left: 0;\n      min-width: 170px;\n      margin: 0;\n      list-style: none;\n      background: #fff;\n      border: 1px solid #ececec;\n}\n.area-selector .options-box ul li {\n        padding: 0px 10px;\n        line-height: 34px;\n        border-bottom: 1px solid #ececec;\n}\n.area-selector .options-box ul li:hover {\n          background: #007ACC;\n          color: #fff;\n}\n.area-selector .city-selector {\n    position: relative;\n    display: inline-block;\n}\n', ''])

// exports
/** */ }),
/* 47 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', ''])

// exports
/** */ }),
/* 48 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.breadcrumb {\n  background: #fff;\n  border-bottom: 1px solid #e1e2e2;\n}\n.breadcrumb nav {\n    padding: 0px 26px;\n    line-height: 40px;\n    font-size: 12px;\n    color: gray;\n}\n', ''])

// exports
/** */ }),
/* 49 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.loading {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n}\n.loading .loading-mask {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 99;\n    background: rgba(0, 0, 0, 0.5);\n}\n.loading .spinner {\n    margin: 200px auto;\n    width: 60px;\n    height: 60px;\n    position: relative;\n}\n.loading .container1 > div, .loading .container2 > div, .loading .container3 > div {\n    width: 16px;\n    height: 16px;\n    background-color: #fff;\n    border-radius: 100%;\n    position: absolute;\n    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;\n    animation: bouncedelay 1.2s infinite ease-in-out;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n}\n.loading .spinner .spinner-container {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    z-index: 100;\n}\n.loading .container2 {\n    -webkit-transform: rotateZ(45deg);\n    transform: rotateZ(45deg);\n}\n.loading .container3 {\n    -webkit-transform: rotateZ(90deg);\n    transform: rotateZ(90deg);\n}\n.loading .circle1 {\n    top: 0;\n    left: 0;\n}\n.loading .circle2 {\n    top: 0;\n    right: 0;\n}\n.loading .circle3 {\n    right: 0;\n    bottom: 0;\n}\n.loading .circle4 {\n    left: 0;\n    bottom: 0;\n}\n.loading .container2 .circle1 {\n    -webkit-animation-delay: -1.1s;\n    animation-delay: -1.1s;\n}\n.loading .container3 .circle1 {\n    -webkit-animation-delay: -1.0s;\n    animation-delay: -1.0s;\n}\n.loading .container1 .circle2 {\n    -webkit-animation-delay: -0.9s;\n    animation-delay: -0.9s;\n}\n.loading .container2 .circle2 {\n    -webkit-animation-delay: -0.8s;\n    animation-delay: -0.8s;\n}\n.loading .container3 .circle2 {\n    -webkit-animation-delay: -0.7s;\n    animation-delay: -0.7s;\n}\n.loading .container1 .circle3 {\n    -webkit-animation-delay: -0.6s;\n    animation-delay: -0.6s;\n}\n.loading .container2 .circle3 {\n    -webkit-animation-delay: -0.5s;\n    animation-delay: -0.5s;\n}\n.loading .container3 .circle3 {\n    -webkit-animation-delay: -0.4s;\n    animation-delay: -0.4s;\n}\n.loading .container1 .circle4 {\n    -webkit-animation-delay: -0.3s;\n    animation-delay: -0.3s;\n}\n.loading .container2 .circle4 {\n    -webkit-animation-delay: -0.2s;\n    animation-delay: -0.2s;\n}\n.loading .container3 .circle4 {\n    -webkit-animation-delay: -0.1s;\n    animation-delay: -0.1s;\n}\n@-webkit-keyframes bouncedelay {\n0%, 80%, 100% {\n    -webkit-transform: scale(0);\n}\n40% {\n    -webkit-transform: scale(1);\n}\n}\n@keyframes bouncedelay {\n0%, 80%, 100% {\n    transform: scale(0);\n    -webkit-transform: scale(0);\n}\n40% {\n    transform: scale(1);\n    -webkit-transform: scale(1);\n}\n}\n', ''])

// exports
/** */ }),
/* 50 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.module-link-area {\n  margin-bottom: 20px;\n}\n.module-link-area > div {\n    padding: 10px;\n    text-align: center;\n}\n.module-link-area > div a {\n      color: #444;\n      display: block;\n      padding: 40px 80px;\n      border: 1px solid #ccc;\n      border-radius: 4px;\n}\n.module-link-area > div a:hover {\n        color: #007ACC;\n}\n.module-link-area > div a i {\n        font-size: 16px;\n}\n', ''])

// exports
/** */ }),
/* 51 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, "\n.wy-select {\n  position: relative;\n}\n.wy-select input {\n    background-color: #eee;\n    background-image: linear-gradient(#fcfcfc, #eee);\n    cursor: pointer;\n}\n.wy-select .arrow-down {\n    content: '';\n    display: block;\n    position: absolute;\n    top: 14px;\n    border-top: 4px solid #888;\n    border-left: 4px solid transparent;\n    border-right: 4px solid transparent;\n}\n.wy-select > section {\n    position: absolute;\n    background: #fff;\n    max-height: 165px;\n    overflow-y: scroll;\n    border: 1px solid #ececec;\n    z-index: 100;\n}\n.wy-select > section ul {\n      list-style: none;\n      margin: 0;\n      padding-left: 0px;\n}\n.wy-select > section ul li {\n        padding: 0px 10px;\n        line-height: 32px;\n        cursor: pointer;\n        border-bottom: 1px solid #e5e5e5;\n}\n.wy-select > section ul li:hover {\n          color: #fff;\n          background: #007ACC;\n}\n", ''])

// exports
/** */ }),
/* 52 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', ''])

// exports
/** */ }),
/* 53 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.table.fixed-top {\n  white-space: nowrap;\n}\n', ''])

// exports
/** */ }),
/* 54 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.popup-message {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n}\n.popup-message .message-item {\n    position: relative;\n    padding: 10px;\n    padding-right: 30px;\n    margin: 3px;\n    color: #fff;\n    background: #04a7ba;\n    border-radius: 3px 0px 0px 3px;\n}\n.popup-message .message-item > .close {\n      position: absolute;\n      top: 5px;\n      right: 5px;\n      font-size: 16px;\n      cursor: pointer;\n      font-weight: 800;\n      transform: rotate(45deg);\n}\n', ''])

// exports
/** */ }),
/* 55 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, "\n.vue-upload {\n    border: 1px solid #e5e5e5;\n}\n.vue-upload .file-list {\n    padding: 10px 0px;\n}\n.vue-upload .file-list:after {\n    content: '';\n    display: block;\n    clear: both;\n    visibility: hidden;\n    line-height: 0;\n    height: 0;\n    font-size: 0;\n}\n.vue-upload .file-list .file-item {\n    float: left;\n    position: relative;\n    width: 100px;\n    text-align: center;\n}\n.vue-upload .file-list .file-item img{\n    width: 80px;\n    height: 80px;\n    border: 1px solid #ececec;\n}\n.vue-upload .file-list .file-item .file-remove {\n    position: absolute;\n    right: 12px;\n    display: none;\n    top: 4px;\n    width: 14px;\n    height: 14px;\n    color: white;\n    cursor: pointer;\n    line-height: 12px;\n    border-radius: 100%;\n    transform: rotate(45deg);\n    background: rgba(0, 0, 0, 0.5);\n}\n.vue-upload .file-list .file-item:hover .file-remove {\n    display: inline;\n}\n.vue-upload .file-list .file-item .file-name {\n    margin: 0;\n    height: 40px;\n    word-break: break-all;\n    font-size: 14px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n}\n.vue-upload .add {\n    width: 80px;\n    height: 80px;\n    margin-left: 10px;\n    float: left;\n    text-align: center;\n    line-height: 80px;\n    border: 1px dashed #ececec;\n    font-size: 30px;\n    cursor: pointer;\n}\n.vue-upload .upload-func {\n    display: flex;\n    padding: 10px;\n    margin: 0px;\n    background: #f8f8f8;\n    border-top: 1px solid #ececec;\n}\n.vue-upload .upload-func .progress-bar {\n    flex-grow: 1;\n}\n.vue-upload .upload-func .progress-bar section {\n    margin-top: 5px;\n    background: #00b4aa;\n    border-radius: 3px;\n    text-align: center; \n    color: #fff;\n    font-size: 12px;\n    transition: all .5s ease;\n}\n.vue-upload .upload-func .operation-box {\n    flex-grow: 0;\n    padding-left: 10px;\n}\n.vue-upload .upload-func .operation-box button {\n    padding: 4px 12px;\n    color: #fff;\n    background: #007ACC;\n    border: none;\n    border-radius: 2px;\n    cursor: pointer;\n}\n.vue-upload > input[type=\"file\"] {\n    display: none;\n}\n", ''])

// exports
/** */ }),
/* 56 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '\n.wy-modal {\n  display: inline-block;\n}\n.wy-modal .wy-modal-mask {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 99;\n    background: rgba(0, 0, 0, 0.3);\n}\n.wy-modal .wy-modal-body {\n    position: absolute;\n    display: flex;\n    flex-direction: column;\n    left: 50%;\n    top: 40%;\n    transform: translate(-50%, -50%);\n    background: #fff;\n    border-radius: 4px;\n    z-index: 100;\n}\n.wy-modal .wy-modal-body > header {\n      position: relative;\n      padding: 0px 40px 0px 10px;\n      flex-grow: 0;\n      border-bottom: 1px solid #ddd;\n}\n.wy-modal .wy-modal-body > header .close {\n        position: absolute;\n        width: 40px;\n        right: 0px;\n        top: 0px;\n        background: #f0f0f0;\n        text-align: center;\n        cursor: pointer;\n}\n.wy-modal .wy-modal-body > header .close:hover {\n          background: #007ACC;\n          color: #fff;\n}\n.wy-modal .wy-modal-body > .main {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      flex-grow: 1;\n      padding: 10px;\n      overflow-y: auto;\n}\n.wy-modal .wy-modal-body > footer {\n      flex-grow: 0;\n      padding: 0px 10px;\n      border-top: 1px solid #ddd;\n}\n', ''])

// exports
/** */ }),
/* 57 */
/** */ (function (module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(0)()
// imports


// module
exports.push([module.i, '/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type="button"], /* 1 */\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type="search"]::-webkit-search-cancel-button,\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}', ''])

// exports
/** */ }),
/* 58 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(107)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(86),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/components/area.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] area.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
 (function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-52bd480c', Component.options)
  } else {
    hotAPI.reload('data-v-52bd480c', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 59 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(109)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(88),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/components/breadcrumb.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] breadcrumb.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-584a7cb0', Component.options)
  } else {
    hotAPI.reload('data-v-584a7cb0', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 60 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(106)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(85),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/components/pagination.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] pagination.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
 (function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-4da0e0c7', Component.options)
  } else {
    hotAPI.reload('data-v-4da0e0c7', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 61 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(104)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(83),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/components/popup.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] popup.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
 (function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-3d201ee2', Component.options)
  } else {
    hotAPI.reload('data-v-3d201ee2', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 62 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(112)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(91),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/components/select.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] select.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-5e606fa9', Component.options)
  } else {
    hotAPI.reload('data-v-5e606fa9', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 63 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(116)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(95),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/components/upload.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] upload.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-9ad183a4', Component.options)
  } else {
    hotAPI.reload('data-v-9ad183a4', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 64 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(105)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(84),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/demo/button.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] button.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-4d87d6f2', Component.options)
  } else {
    hotAPI.reload('data-v-4d87d6f2', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 65 */
/** */ (function (module, exports, __webpack_require__) {
const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(96),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/demo/form.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] form.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
 (function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-9b0fe4f8', Component.options)
  } else {
    hotAPI.reload('data-v-9b0fe4f8', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 66 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(113)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(92),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/demo/loading.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] loading.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
 (function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-7dc116a8', Component.options)
  } else {
    hotAPI.reload('data-v-7dc116a8', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 67 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(99)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(78),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/demo/popup.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] popup.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-0e91a21c', Component.options)
  } else {
    hotAPI.reload('data-v-0e91a21c', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 68 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(108)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(87),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/demo/select.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] select.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-55162088', Component.options)
  } else {
    hotAPI.reload('data-v-55162088', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 69 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(100)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(79),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/demo/span.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] span.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
 (function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-10d9450a', Component.options)
  } else {
    hotAPI.reload('data-v-10d9450a', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 70 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(114)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(93),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/demo/table.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] table.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
 (function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-8675e784', Component.options)
  } else {
    hotAPI.reload('data-v-8675e784', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 71 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(111)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(90),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/index/index.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-59433fe9', Component.options)
  } else {
    hotAPI.reload('data-v-59433fe9', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 72 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(101)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(80),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/layout/menu.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] menu.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-2a14e438', Component.options)
  } else {
    hotAPI.reload('data-v-2a14e438', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 73 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(110)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(30),
  /* template */
  __webpack_require__(89),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/plugins/loading/loading.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] loading.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-5894510e', Component.options)
  } else {
    hotAPI.reload('data-v-5894510e', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 74 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(102)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(81),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/plugins/popop/alert.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] alert.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
 (function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-2f89e224', Component.options)
  } else {
    hotAPI.reload('data-v-2f89e224', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 75 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(98)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(32),
  /* template */
  __webpack_require__(77),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/plugins/popop/confirm.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] confirm.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-009fa188', Component.options)
  } else {
    hotAPI.reload('data-v-009fa188', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 76 */
/** */ (function (module, exports, __webpack_require__) {
/* styles */
__webpack_require__(115)

const Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(94),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = '/Users/apple/Code/wyUI/views/plugins/popop/message.vue'
if (Component.esModule && Object.keys(Component.esModule).some(key => key !== 'default' && key !== '__esModule')) { console.error('named exports are not supported in *.vue files.') }
if (Component.options.functional) { console.error('[vue-loader] message.vue: functional components are not supported with templates, they should use render functions.') }

/* hot reload */
if (false) {
(function () {
  const hotAPI = require('vue-hot-reload-api')
  hotAPI.install(require('vue'), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord('data-v-8fe48162', Component.options)
  } else {
    hotAPI.reload('data-v-8fe48162', Component.options)
  }
}())
}

module.exports = Component.exports
/** */ }),
/* 77 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return (_vm.show) ? _c('div', {
    staticClass: 'popup-confirm'
  }, [_c('modal', {
    attrs: {
      show: _vm.show,
      close: _vm.close
    }
  }, [_c('div', {
    slot: 'header'
  }, [_c('p', {
    staticClass: 'clear-margin',
    staticStyle: {
      'line-height': '40px'
    }
  }, [_vm._v(_vm._s(_vm.option.title))])]), _vm._v(' '), _c('div', {
    staticClass: 'content'
  }, [_c('p', [_vm._v(_vm._s(_vm.option.text))])]), _vm._v(' '), _c('div', {
    slot: 'footer'
  }, [_c('p', {
    staticClass: 'clear-margin',
    staticStyle: {
      padding: '10px 0px',
      'text-align': 'right'
    }
  }, [_c('button', {
    staticClass: 'button shadow',
    on: {
      click: _vm.close
    }
  }, [_vm._v('取消')]), _vm._v(' '), _c('button', {
    staticClass: 'button primary shadow',
    on: {
      click: _vm.confirm
    }
  }, [_vm._v('确定')])])])])], 1) : _vm._e()
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-009fa188', module.exports)
  }
}
/** */ }),
/* 78 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'init-page'
  }, [_c('h4', {
    staticClass: 'title'
  }, [_vm._v('Alert框')]), _vm._v(' '), _c('button', {
    staticClass: 'button big info',
    on: {
      click: _vm.alertMsg
    }
  }, [_vm._v('提示框')]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v("\nthis.$plugins.Popup.alert('设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。')\n")]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('Confirm框')]), _vm._v(' '), _c('button', {
    staticClass: 'button big danger',
    on: {
      click: _vm.confirmMsg
    }
  }, [_vm._v('确认框')]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v("\nthis.$plugins.Popup.confirm({\n    title: '删除提示',\n    text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。',\n    cb: () => {\n        this.$plugins.Popup.alert('删除成功!')\n    }\n})\n")]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('Message框')]), _vm._v(' '), _c('button', {
    staticClass: 'button big primary',
    on: {
      click: _vm.messageBox
    }
  }, [_vm._v('message框')]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v("\n// 参数可为string类型或object, object要求格式为{text: '', duration: 1000}  duration为关闭的延迟时间\n// 如果参数为string类型的话，默认关闭时间为5秒\nthis.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的1', duration: 1000})\nthis.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的2', duration: 3000})\nthis.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的3', duration: 6000})\nthis.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的4', duration: 10000})\n")])])
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-0e91a21c', module.exports)
  }
}
/** */ }),
/* 79 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _vm._m(0)
},
staticRenderFns: [function () {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'init-page'
  }, [_c('h4', {
    staticClass: 'title'
  }, [_vm._v('普通标签')]), _vm._v(' '), _c('span', {
    staticClass: 'span'
  }, [_vm._v('default')]), _vm._v(' '), _c('span', {
    staticClass: 'span primary'
  }, [_vm._v('primary')]), _vm._v(' '), _c('span', {
    staticClass: 'span info'
  }, [_vm._v('info')]), _vm._v(' '), _c('span', {
    staticClass: 'span danger'
  }, [_vm._v('danger')]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<span class="span">default</span>\n<span class="span primary">primary</span>\n<span class="span info">info</span>\n<span class="span danger">danger</span>\n        ')]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('箭头标签')]), _vm._v(' '), _c('div', {
    staticStyle: {
      'margin-bottom': '20px'
    }
  }, [_c('span', {
    staticClass: 'span arrow-left',
    staticStyle: {
      margin: '0px 25px'
    }
  }, [_vm._v('default')]), _vm._v(' '), _c('span', {
    staticClass: 'span info arrow-left',
    staticStyle: {
      margin: '0px 25px'
    }
  }, [_vm._v('info')]), _vm._v(' '), _c('span', {
    staticClass: 'span primary arrow-right',
    staticStyle: {
      margin: '0px 25px'
    }
  }, [_vm._v('primary')]), _vm._v(' '), _c('span', {
    staticClass: 'span danger arrow-right',
    staticStyle: {
      margin: '0px 25px'
    }
  }, [_vm._v('danger')])]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<span class="span arrow-left">default</span>\n<span class="span primary arrow-right">primary</span>\n<span class="span info arrow-left">info</span>\n<span class="span danger arrow-right">danger</span>\n        ')])])
}] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-10d9450a', module.exports)
  }
}
/** */ }),
/* 80 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'side-menu'
  }, [(_vm.mode == 'detail') ? _c('h4', {
    staticClass: 'menu-title detail'
  }, [_vm._v('\n        网站导航 '), _c('i', {
    staticClass: 'fa fa-outdent',
    attrs: {
      'aria-hidden': 'true'
    },
    on: {
      click($event) {
        _vm.mode = 'brief'
      }
    }
  })]) : _vm._e(), _vm._v(' '), (_vm.mode == 'brief') ? _c('h4', {
    staticClass: 'menu-title brief'
  }, [_c('i', {
    staticClass: 'fa fa-indent',
    staticStyle: {
      'margin-left': '14px'
    },
    attrs: {
      'aria-hidden': 'true'
    },
    on: {
      click($event) {
        _vm.mode = 'detail'
      }
    }
  })]) : _vm._e(), _vm._v(' '), (_vm.mode == 'detail') ? _c('ul', {
    staticClass: 'detail'
  }, _vm._l((_vm.list), item => _c('li', [(item.outer) ? _c('a', {
      staticClass: 'text-ellipsis no-decoration',
      attrs: {
        href: item.to,
        target: '_blank'
      }
    }, [_c('i', {
      class: item.icon
    }), _vm._v(` ${_vm._s(item.title)}\n            `)]) : _c('a', {
      staticClass: 'text-ellipsis no-decoration',
      on: {
        click($event) {
          _vm.next(item, $event)
        }
      }
    }, [_c('i', {
      class: item.icon
    }), _vm._v(` ${_vm._s(item.title)}\n            `)]), _vm._v(' '), (!item.outer && item.children && item.children.length != 0) ? _c('div', [_c('ul', {
      staticClass: 'children-box',
      staticStyle: {
        display: 'none'
      }
    }, _vm._l((item.children), c => _c('li', [_c('router-link', {
        staticClass: 'text-ellipsis no-decoration',
        attrs: {
          to: c.to
        }
      }, [_vm._v(`\n                            ${_vm._s(c.title)}\n                        `)])], 1)))]) : _vm._e()]))) : _vm._e(), _vm._v(' '), (_vm.mode == 'brief') ? _c('ul', {
    staticClass: 'brief'
  }, _vm._l((_vm.list), item => _c('li', [(item.outer) ? _c('a', {
      attrs: {
        href: item.to,
        target: '_blank',
        title: item.title
      }
    }, [_c('i', {
      class: item.icon
    })]) : _vm._e(), _vm._v(' '), (!item.outer && !item.children) ? _c('router-link', {
      staticClass: 'brief-item text-ellipsis no-decoration',
      attrs: {
        to: item.to,
        title: item.title
      },
      on: {
        mouseenter: _vm.mouseenter
      }
    }, [_c('i', {
      class: item.icon
    })]) : _vm._e(), _vm._v(' '), (!item.outer && item.children && item.children.length != 0) ? _c('a', {
      attrs: {
        title: item.title
      }
    }, [_c('i', {
      class: item.icon
    })]) : _vm._e(), _vm._v(' '), (!item.outer && item.children && item.children.length != 0) ? _c('div', [_c('p', {
      staticStyle: {
        color: '#666'
      }
    }, [_vm._v(_vm._s(item.title))]), _vm._v(' '), _c('ul', {
      staticClass: 'children-box'
    }, _vm._l((item.children), c => _c('li', [_c('router-link', {
        staticClass: 'text-ellipsis no-decoration',
        attrs: {
          to: c.to
        }
      }, [_vm._v(`\n                            ${_vm._s(c.title)}\n                        `)])], 1)))]) : _vm._e()], 1))) : _vm._e()])
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-2a14e438', module.exports)
  }
}
/** */ }),
/* 81 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return (_vm.text) ? _c('div', {
    staticClass: 'popup-alert'
  }, [_c('modal', {
    attrs: {
      show: _vm.text,
      close: _vm.close
    }
  }, [_c('div', {
    slot: 'header'
  }, [_c('p', {
    staticClass: 'clear-margin',
    staticStyle: {
      'line-height': '40px'
    }
  }, [_vm._v('提示信息')])]), _vm._v(' '), _c('div', {
    staticClass: 'content'
  }, [_c('section', {
    staticClass: 'icon'
  }, [_c('span', {
    staticStyle: {
      'font-size': '20px',
      'line-height': '30px'
    }
  }, [_vm._v('!')])]), _vm._v(' '), _c('section', {
    staticClass: 'main'
  }, [_vm._v(`\n                ${_vm._s(_vm.text)}\n            `)])]), _vm._v(' '), _c('div', {
    slot: 'footer'
  }, [_c('p', {
    staticClass: 'clear-margin',
    staticStyle: {
      padding: '10px 0px',
      'text-align': 'right'
    }
  }, [_c('button', {
    staticClass: 'button info shadow',
    on: {
      click: _vm.close
    }
  }, [_vm._v('确定')])])])])], 1) : _vm._e()
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-2f89e224', module.exports)
  }
}
/** */ }),
/* 82 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'app'
  }, [_c('header', [_c('nav', [_c('h3', [_vm._v('WYUI')]), _vm._v(' '), _c('ul', {
    staticClass: 'logined-list pull-right'
  }, [_c('li', [_c('router-link', {
    staticClass: 'text white no-decoration',
    attrs: {
      to: '/me'
    }
  }, [_c('i', {
    staticClass: 'fa fa-user-circle'
  }), _vm._v(' 个人信息\n                    ')]), _vm._v(' '), _vm._m(0)], 1), _vm._v(' '), _c('li', [_c('router-link', {
    staticClass: 'text white no-decoration',
    attrs: {
      to: '/login'
    }
  }, [_c('i', {
    staticClass: 'fa fa-sign-out'
  }), _vm._v(' 退出\n                    ')])], 1)])])]), _vm._v(' '), _c('article', [_c('div', {
    staticClass: 'app-left'
  }, [_c('nav-menu')], 1), _vm._v(' '), _c('div', {
    staticClass: 'app-right'
  }, [_c('div', {
    staticClass: 'app-content'
  }, [_c('transition', {
    attrs: {
      name: _vm.transitionName
    }
  }, [_c('router-view')], 1)], 1)])])])
},
staticRenderFns: [function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('section', [_c('ul', [_c('li', [_vm._v('我的资料')]), _vm._v(' '), _c('li', [_vm._v('浏览历史')]), _vm._v(' '), _c('li', [_vm._v('修改密码')]), _vm._v(' '), _c('li', [_vm._v('登录记录')])])])
}] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-3bd20296', module.exports)
  }
}
/** */ }),
/* 83 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'wy-popup'
  }, [(_vm.mode == 'ALERT') ? _c('modal', {
    attrs: {
      show: _vm.showModal
    }
  }, [_c('div', {
    slot: 'header'
  }, [_vm._v(`\n            ${_vm._s(_vm.title)}\n        `)]), _vm._v(' '), _c('div', [_vm._v(`\n            ${_vm._s(_vm.msg)}\n        `)]), _vm._v(' '), _c('div', {
    slot: 'footer'
  }, [_c('button', {
    staticClass: 'button primary shadow',
    on: {
      click: _vm.callback
    }
  }, [_vm._v('确定')])])]) : _vm._e(), _vm._v(' '), (_vm.mode == 'CONFIRM') ? _c('modal', {
    attrs: {
      show: _vm.showModal
    }
  }, [_c('div', {
    slot: 'header'
  }, [_vm._v(`\n            ${_vm._s(_vm.title)}\n        `)]), _vm._v(' '), _c('div', [_vm._v(`\n            ${_vm._s(_vm.msg)}\n        `)]), _vm._v(' '), _c('div', {
    slot: 'footer'
  }, [_c('button', {
    staticClass: 'button shadow'
  }, [_vm._v('取消')]), _vm._v(' '), _c('button', {
    staticClass: 'button primary shadow',
    on: {
      click: _vm.callback
    }
  }, [_vm._v('确定')])])]) : _vm._e()], 1)
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-3d201ee2', module.exports)
  }
}
/** */ }),
/* 84 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _vm._m(0)
},
staticRenderFns: [function () {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'init-page'
  }, [_c('h4', {
    staticClass: 'title'
  }, [_vm._v('按钮尺寸')]), _vm._v(' '), _c('button', {
    staticClass: 'button small primary'
  }, [_vm._v('小按钮')]), _vm._v(' '), _c('button', {
    staticClass: 'button'
  }, [_vm._v('默认按钮')]), _vm._v(' '), _c('button', {
    staticClass: 'button big danger'
  }, [_vm._v('大按钮')]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<button class="button small primary">小按钮</button>\n<button class="button">正常按钮</button>\n<button class="button big danger">大按钮</button> \n        ')]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('按钮颜色')]), _vm._v(' '), _c('button', {
    staticClass: 'button'
  }, [_vm._v('默认')]), _vm._v(' '), _c('button', {
    staticClass: 'button primary'
  }, [_vm._v('主色')]), _vm._v(' '), _c('button', {
    staticClass: 'button info'
  }, [_vm._v('信息')]), _vm._v(' '), _c('button', {
    staticClass: 'button danger'
  }, [_vm._v('提示')]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<button class="button">默认</button>\n<button class="button primary">主色</button>\n<button class="button info">信息</button>\n<button class="button danger">提示</button>        \n        ')]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('按钮效果')]), _vm._v(' '), _c('button', {
    staticClass: 'button shadow'
  }, [_vm._v('阴影')]), _vm._v(' '), _c('button', {
    staticClass: 'button primary shadow'
  }, [_vm._v('阴影')]), _vm._v(' '), _c('button', {
    staticClass: 'button info shadow'
  }, [_vm._v('阴影')]), _vm._v(' '), _c('button', {
    staticClass: 'button danger shadow'
  }, [_vm._v('阴影')]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<button class="button shadow">阴影</button>\n<button class="button primary shadow">阴影</button>\n<button class="button info shadow">阴影</button>\n<button class="button danger shadow">阴影</button>       \n        ')])])
}] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-4d87d6f2', module.exports)
  }
}
/** */ }),
/* 85 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'wy-pager'
  }, [_c('div', [(_vm.currentNum != 1) ? _c('button', {
    staticClass: 'pager-pre',
    on: {
      click: _vm.pre
    }
  }, [_vm._v('上一页')]) : _vm._e(), _vm._v(' '), (_vm.showFirst) ? _c('div', [_c('button', {
    staticClass: 'btn-item pager-pre',
    on: {
      click($event) {
        _vm.choose(1)
      }
    }
  }, [_vm._v('1')]), _vm._v(' '), _c('span', [_vm._v(' ··· ')])]) : _vm._e(), _vm._v(' '), _c('ul', {
    staticClass: 'pager-btn-group'
  }, _vm._l((_vm.pagerList), item => _c('li', {
      class: {
        'btn-item': true, active: _vm.currentNum == item
      },
      attrs: {
        'track-by': '$index'
      },
      on: {
        click($event) {
          _vm.choose(item)
        }
      }
    }, [_vm._v(_vm._s(item))]))), _vm._v(' '), (_vm.showLast) ? _c('div', [_c('span', [_vm._v(' ··· ')]), _vm._v(' '), _c('button', {
    staticClass: 'btn-item pager-next',
    on: {
      click($event) {
        _vm.choose(_vm.totalPagesNum)
      }
    }
  }, [_vm._v(_vm._s(_vm.totalPagesNum))])]) : _vm._e(), _vm._v(' '), (_vm.currentNum != _vm.totalPagesNum) ? _c('button', {
    staticClass: 'pager-next',
    on: {
      click: _vm.next
    }
  }, [_vm._v('下一页')]) : _vm._e()])])
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-4da0e0c7', module.exports)
  }
}
/** */ }),
/* 86 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'area-selector'
  }, [_c('input', {
    directives: [{
      name: 'model',
      rawName: 'v-model',
      value: (_vm.currentProvice),
      expression: 'currentProvice'
    }],
    attrs: {
      type: 'text',
      readonly: ''
    },
    domProps: {
      value: (_vm.currentProvice)
    },
    on: {
      click($event) {
        $event.stopPropagation()
        _vm.showProvinces = true
      },
      input($event) {
        if ($event.target.composing) { return }
        _vm.currentProvice = $event.target.value
      }
    }
  }), _vm._v(' '), (_vm.showProvinces) ? [_c('section', {
    staticClass: 'options-box'
  }, [_c('ul', _vm._l((_vm.area), a => _c('li', {
      on: {
        click($event) {
          _vm.getCities(a)
        }
      }
    }, [_vm._v(_vm._s(a.name))])))])] : _vm._e(), _vm._v(' '), (_vm.cities) ? [_c('section', {
    staticClass: 'city-selector'
  }, [_c('input', {
    directives: [{
      name: 'model',
      rawName: 'v-model',
      value: (_vm.currentCity),
      expression: 'currentCity'
    }],
    attrs: {
      type: 'text',
      readonly: ''
    },
    domProps: {
      value: (_vm.currentCity)
    },
    on: {
      click($event) {
        $event.stopPropagation()
        _vm.showCities = true
      },
      input($event) {
        if ($event.target.composing) { return }
        _vm.currentCity = $event.target.value
      }
    }
  }), _vm._v(' '), (_vm.showCities) ? [_c('section', {
    staticClass: 'options-box'
  }, [_c('ul', _vm._l((_vm.cities), c => _c('li', {
      on: {
        click($event) {
          _vm.selectCity(c)
        }
      }
    }, [_vm._v(_vm._s(c))])))])] : _vm._e()], 2)] : _vm._e()], 2)
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-52bd480c', module.exports)
  }
}
/** */ }),
/* 87 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'init-page'
  }, [_c('h4', {
    staticClass: 'title'
  }, [_vm._v('下拉框')]), _vm._v(' '), _c('wy-select', {
    attrs: {
      options: _vm.options
    },
    on: {
      changed: _vm.changed
    }
  }), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v("\n<wy-select :options=\"options\" v-on:changed=\"changed\"></wy-select>\n// 参数列表\n\n// 1. options--选择项列表\n//      type: Array\n//      example: [{value: 1, text: 'select1'},{value: 2, text: 'select2'}, ...]\n//      可以没有value, 但是必须要有text属性，它将作为显示项\n\n// 2. v-on:changed = \"someMethod\"\n//      type： Function\n//      下拉框选定或者改变值得时候都会触发父元素定义的changed事件，并有一个选中的对象作为参数\n\n// 3. width\n//      type: Number\n//      下拉框的宽度, 默认是200px宽\n\n// 4. selected\n//      type: Object\n//      默认选中的值，须和options中选择项一样\n        ")]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('\n            省市级联特效\n        ')]), _vm._v(' '), _c('wy-area', {
    attrs: {
      selected: {
        province: '上海',
        city: '徐汇区'
      }
    },
    on: {
      changed: _vm.areaChanged
    }
  }), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v("\n<wy-area v-on:changed=\"areaChanged\" :selected=\"{province: '上海', city: '徐汇区'}\"></wy-area>\n// 参数列表\n\n// 1. v-on:changed = \"someMethod\"\n//      type： Function\n//      下拉框选定或者改变值得时候都会触发父元素定义的changed事件，并有两个字符串(province, city)作为参数\n\n// 2. selected\n//      type: Object\n//      默认选中的值，必须保证area数据中的一级选项和二级选项对应\n        ")])], 1)
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-55162088', module.exports)
  }
}
/** */ }),
/* 88 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'breadcrumb'
  }, [_c('nav', [_vm._v('\n        当前位置：\n        '), _c('router-link', {
    staticClass: 'primary no-decoration',
    attrs: {
      to: _vm.routes.to
    }
  }, [_vm._v(_vm._s(_vm.routes.name))]), _vm._v(' '), (_vm.routes.child) ? _c('router-link', {
    staticClass: 'primary no-decoration',
    attrs: {
      to: _vm.routes.child.to
    }
  }, [_vm._v(`\n             / ${_vm._s(_vm.routes.child.name)}`)]) : _vm._e()], 1)])
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-584a7cb0', module.exports)
  }
}
/** */ }),
/* 89 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return (_vm.show) ? _c('div', {
    staticClass: 'loading'
  }, [_c('div', {
    staticClass: 'loading-mask'
  }), _vm._v(' '), _vm._m(0)]) : _vm._e()
},
staticRenderFns: [function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'spinner'
  }, [_c('div', {
    staticClass: 'spinner-container container1'
  }, [_c('div', {
    staticClass: 'circle1'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle2'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle3'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle4'
  })]), _vm._v(' '), _c('div', {
    staticClass: 'spinner-container container2'
  }, [_c('div', {
    staticClass: 'circle1'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle2'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle3'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle4'
  })]), _vm._v(' '), _c('div', {
    staticClass: 'spinner-container container3'
  }, [_c('div', {
    staticClass: 'circle1'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle2'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle3'
  }), _vm._v(' '), _c('div', {
    staticClass: 'circle4'
  })])])
}] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-5894510e', module.exports)
  }
}
/** */ }),
/* 90 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'init-page'
  }, [_vm._m(0), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('表格')]), _vm._v(' '), _c('div', {
    staticClass: 'btn-group'
  }, [_c('button', {
    class: {
      button: true, small: true, active: _vm.active == 'value1'
    },
    on: {
      click($event) {
        _vm.active = 'value1'
      }
    }
  }, [_vm._v('全部')]), _vm._v(' '), _c('button', {
    class: {
      button: true, small: true, active: _vm.active == 'value2'
    },
    on: {
      click($event) {
        _vm.active = 'value2'
      }
    }
  }, [_vm._v('最近30天')]), _vm._v(' '), _c('button', {
    class: {
      button: true, small: true, active: _vm.active == 'value3'
    },
    on: {
      click($event) {
        _vm.active = 'value3'
      }
    }
  }, [_vm._v('最近一年')])]), _vm._v(' '), _vm._m(1), _vm._v(' '), _c('table', {
    staticClass: 'table table-striped',
    attrs: {
      border: '0'
    }
  }, [_vm._m(2), _vm._v(' '), _c('tbody', _vm._l((_vm.list), item => _c('tr', {
      staticClass: 'center'
    }, [_c('td', [_vm._v(_vm._s(item.id))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.createTime))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.money))]), _vm._v(' '), _c('td', [(item.status == 'finished') ? _c('span', {
      staticClass: 'span primary'
    }, [_vm._v('已完成')]) : _vm._e(), _vm._v(' '), (item.status == 'cancel') ? _c('span', {
      staticClass: 'span'
    }, [_vm._v('已取消')]) : _vm._e(), _vm._v(' '), (item.status == 'pending') ? _c('span', {
      staticClass: 'span info'
    }, [_vm._v('交易中')]) : _vm._e()]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.customer))]), _vm._v(' '), _vm._m(3, true)])))]), _vm._v(' '), _c('div', {
    staticStyle: {
      'margin-top': '10px'
    }
  }, [_c('pagination', {
    attrs: {
      total: 124,
      pn: 1
    }
  })], 1)])
},
staticRenderFns: [function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('section', {
    staticClass: 'module-link-area flex'
  }, [_c('div', {
    staticClass: 'col1'
  }, [_c('a', {
    staticClass: 'no-decoration'
  }, [_c('i', {
    staticClass: 'fa fa-comments-o'
  }), _vm._v(' 消息\n            ')])]), _vm._v(' '), _c('div', {
    staticClass: 'col1'
  }, [_c('a', {
    staticClass: 'no-decoration'
  }, [_c('i', {
    staticClass: 'fa fa-envelope-o'
  }), _vm._v(' 邮件\n            ')])]), _vm._v(' '), _c('div', {
    staticClass: 'col1'
  }, [_c('a', {
    staticClass: 'no-decoration'
  }, [_c('i', {
    staticClass: 'fa fa-paper-plane'
  }), _vm._v(' 计划\n            ')])]), _vm._v(' '), _c('div', {
    staticClass: 'col1'
  }, [_c('a', {
    staticClass: 'no-decoration'
  }, [_c('i', {
    staticClass: 'fa fa-shopping-cart'
  }), _vm._v(' 购物车\n            ')])])])
}, function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'input-icon pull-right'
  }, [_c('input', {
    staticClass: 'input icon-right',
    staticStyle: {
      width: '300px'
    },
    attrs: {
      type: 'text'
    }
  }), _vm._v(' '), _c('section', {
    staticClass: 'icon-box right'
  }, [_c('i', {
    staticClass: 'fa fa-search'
  })])])
}, function () {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('thead', [_c('th', [_vm._v('订单编号')]), _vm._v(' '), _c('th', [_vm._v('成交时间')]), _vm._v(' '), _c('th', [_vm._v('成交金额')]), _vm._v(' '), _c('th', [_vm._v('状态')]), _vm._v(' '), _c('th', [_vm._v('客户')]), _vm._v(' '), _c('th', [_vm._v('操作')])])
}, function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('td', [_c('a', {
    attrs: {
      to: '/'
    }
  }, [_c('i', {
    staticClass: 'fa fa-cog',
    attrs: {
      'aria-hidden': 'true'
    }
  })]), _vm._v(' '), _c('a', {
    attrs: {
      to: '/'
    }
  }, [_c('i', {
    staticClass: 'fa fa-trash',
    attrs: {
      'aria-hidden': 'true'
    }
  })])])
}] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-59433fe9', module.exports)
  }
}
/** */ }),
/* 91 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'wy-select'
  }, [_c('input', {
    style: ({
      width: `${_vm.width}px`
    }),
    attrs: {
      type: 'text',
      readonly: ''
    },
    domProps: {
      value: _vm.selectedText
    },
    on: {
      click($event) {
        $event.stopPropagation()
        _vm.show = !_vm.show
      }
    }
  }), _vm._v(' '), _c('span', {
    staticClass: 'arrow-down',
    style: ({
      left: `${_vm.width}px`
    })
  }), _vm._v(' '), (_vm.show) ? _c('section', {
    staticClass: 'list-box'
  }, [_c('ul', {
    style: ({
      minWidth: `${_vm.width + 10}px`
    })
  }, _vm._l((_vm.options), item => _c('li', {
      on: {
        click($event) {
          _vm.select(item)
        }
      }
    }, [_vm._v(_vm._s(item.text))])))]) : _vm._e()])
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-5e606fa9', module.exports)
  }
}
/** */ }),
/* 92 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'init-page'
  }, [_c('h4', {
    staticClass: 'title'
  }, [_vm._v('全局加载')]), _vm._v(' '), _c('button', {
    staticClass: 'button big primary',
    on: {
      click: _vm.setLoding
    }
  }, [_vm._v('loading')]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\nsetLoding() {\n    this.$plugins.Loading.show()\n    setTimeout(() => {\n        this.$plugins.Loading.close()\n    }, 5000)\n}\n        ')])])
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-7dc116a8', module.exports)
  }
}
/** */ }),
/* 93 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'init-page'
  }, [_c('h4', {
    staticClass: 'title'
  }, [_vm._v('默认颜色表格')]), _vm._v(' '), _c('table', {
    staticClass: 'table',
    attrs: {
      border: '0'
    }
  }, [_vm._m(0), _vm._v(' '), _c('tbody', _vm._l((_vm.list), item => _c('tr', {
      staticClass: 'center'
    }, [_c('td', [_vm._v(_vm._s(item.id))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.createTime))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.money))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.customer))]), _vm._v(' '), _vm._m(1, true)])))]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<table class="table">\n    <thead>\n        <th>...</th>\n    </thead>\n    <tbody>\n        <tr>\n            <td>...</td>\n        </tr>\n    </tbody>\n</table>\n    ')]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('主颜色表格')]), _vm._v(' '), _c('table', {
    staticClass: 'table primary',
    attrs: {
      border: '0'
    }
  }, [_vm._m(2), _vm._v(' '), _c('tbody', _vm._l((_vm.list), item => _c('tr', {
      staticClass: 'center'
    }, [_c('td', [_vm._v(_vm._s(item.id))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.createTime))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.money))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.customer))]), _vm._v(' '), _vm._m(3, true)])))]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<table class="table primary">\n    <thead>...</thead>\n    <tbody>...</tbody>\n</table>\n    ')]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('斑马线效果')]), _vm._v(' '), _c('table', {
    staticClass: 'table table-striped ',
    attrs: {
      border: '0'
    }
  }, [_vm._m(4), _vm._v(' '), _c('tbody', _vm._l((_vm.list), item => _c('tr', {
      staticClass: 'center'
    }, [_c('td', [_vm._v(_vm._s(item.id))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.createTime))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.money))]), _vm._v(' '), _c('td', [_vm._v(_vm._s(item.customer))]), _vm._v(' '), _vm._m(5, true)])))]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<table class="table primary">\n<thead>...</thead>\n<tbody>...</tbody>\n</table>\n    ')])])
},
staticRenderFns: [function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('thead', [_c('th', [_vm._v('订单编号')]), _vm._v(' '), _c('th', [_vm._v('成交时间')]), _vm._v(' '), _c('th', [_vm._v('成交金额')]), _vm._v(' '), _c('th', [_vm._v('客户')]), _vm._v(' '), _c('th', [_vm._v('操作')])])
}, function () {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('td', [_c('a', {
    staticClass: 'primary',
    attrs: {
      to: '/'
    }
  }, [_vm._v('详情')])])
}, function () {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('thead', [_c('th', [_vm._v('订单编号')]), _vm._v(' '), _c('th', [_vm._v('成交时间')]), _vm._v(' '), _c('th', [_vm._v('成交金额')]), _vm._v(' '), _c('th', [_vm._v('客户')]), _vm._v(' '), _c('th', [_vm._v('操作')])])
}, function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('td', [_c('a', {
    staticClass: 'primary',
    attrs: {
      to: '/'
    }
  }, [_vm._v('详情')])])
}, function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('thead', [_c('th', [_vm._v('订单编号')]), _vm._v(' '), _c('th', [_vm._v('成交时间')]), _vm._v(' '), _c('th', [_vm._v('成交金额')]), _vm._v(' '), _c('th', [_vm._v('客户')]), _vm._v(' '), _c('th', [_vm._v('操作')])])
}, function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('td', [_c('a', {
    staticClass: 'primary',
    attrs: {
      to: '/'
    }
  }, [_vm._v('详情')])])
}] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-8675e784', module.exports)
  }
}
/** */ }),
/* 94 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return (_vm.queue.length > 0) ? _c('div', {
    staticClass: 'popup-message'
  }, [_vm._l((_vm.queue), (item, index) => [_c('transition', {
      attrs: {
        name: 'slide-fade'
      }
    }, [_c('section', {
      staticClass: 'message-item'
    }, [_vm._v(`\n                    ${_vm._s(item.text)}\n                    `), _c('span', {
      staticClass: 'close',
      on: {
        click($event) {
          _vm.remove(index)
        }
      }
    }, [_vm._v('+')])])])])], 2) : _vm._e()
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-8fe48162', module.exports)
  }
}
/** */ }),
/* 95 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('div', {
    staticClass: 'vue-upload'
  }, [_c('div', {
    staticClass: 'file-list'
  }, [_vm._l((_vm.files), (file, index) => _c('section', {
      staticClass: 'file-item draggable-item'
    }, [_c('img', {
      attrs: {
        src: file.src,
        alt: '',
        ondragstart: 'return false;'
      }
    }), _vm._v(' '), _c('p', {
      staticClass: 'file-name'
    }, [_vm._v(_vm._s(file.name))]), _vm._v(' '), _c('span', {
      staticClass: 'file-remove',
      on: {
        click($event) {
          _vm.remove(index)
        }
      }
    }, [_vm._v('+')])])), _vm._v(' '), (_vm.status == 'ready') ? _c('section', {
    staticClass: 'file-item'
  }, [_c('div', {
    staticClass: 'add',
    on: {
      click: _vm.add
    }
  }, [_c('span', [_vm._v('+')])])]) : _vm._e()], 2), _vm._v(' '), (_vm.files.length != 0) ? _c('section', {
    staticClass: 'upload-func'
  }, [_c('div', {
    staticClass: 'progress-bar'
  }, [(_vm.uploading) ? _c('section', {
    attrs: {
      width: `${_vm.percent * 100}%`
    }
  }, [_vm._v(_vm._s(`${_vm.percent * 100}%`))]) : _vm._e()]), _vm._v(' '), _c('div', {
    staticClass: 'operation-box'
  }, [(_vm.status == 'ready') ? _c('button', {
    on: {
      click: _vm.submit
    }
  }, [_vm._v('上传')]) : _vm._e(), _vm._v(' '), (_vm.status == 'finished') ? _c('button', {
    on: {
      click: _vm.finished
    }
  }, [_vm._v('完成')]) : _vm._e()])]) : _vm._e(), _vm._v(' '), _c('input', {
    ref: 'file',
    attrs: {
      type: 'file',
      accept: 'image/*',
      multiple: 'multiple'
    },
    on: {
      change: _vm.fileChanged
    }
  })])
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-9ad183a4', module.exports)
  }
}
/** */ }),
/* 96 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _vm._m(0)
},
staticRenderFns: [function () {
const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return _c('article', {
    staticClass: 'init-page'
  }, [_c('h4', {
    staticClass: 'title'
  }, [_vm._v('表单测试')]), _vm._v(' '), _c('div', {
    staticStyle: {
      display: 'flex',
      'justify-content': 'space-around'
    }
  }, [_c('form', {
    staticClass: 'form',
    staticStyle: {
      width: '450px',
      display: 'inline-block'
    }
  }, [_c('section', {
    staticClass: 'col4'
  }, [_c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('用户名:')]), _vm._v(' '), _c('input', {
    staticClass: 'input',
    attrs: {
      type: 'text'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('密　码:')]), _vm._v(' '), _c('input', {
    staticClass: 'input',
    attrs: {
      type: 'password'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('邮　箱:')]), _vm._v(' '), _c('input', {
    staticClass: 'input',
    attrs: {
      type: 'email'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('手　机:')]), _vm._v(' '), _c('input', {
    staticClass: 'input',
    attrs: {
      type: 'text'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('银　行:')]), _vm._v(' '), _c('select', {
    staticStyle: {
      width: '200px'
    }
  }, [_c('option', {
    attrs: {
      value: '1'
    }
  }, [_vm._v('中国农业银行')]), _vm._v(' '), _c('option', {
    attrs: {
      value: '2'
    }
  }, [_vm._v('中国工商银行')]), _vm._v(' '), _c('option', {
    attrs: {
      value: '3'
    }
  }, [_vm._v('中国建设银行')]), _vm._v(' '), _c('option', {
    attrs: {
      value: '4'
    }
  }, [_vm._v('中国平安银行')])])]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('性　别:')]), _vm._v(' '), _c('section', [_c('input', {
    attrs: {
      type: 'radio',
      name: 'gender'
    }
  }), _vm._v(' 男 \n                            '), _c('input', {
    attrs: {
      type: 'radio',
      name: 'gender'
    }
  }), _vm._v(' 女 \n                        ')])]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('爱　好:')]), _vm._v(' '), _c('section', [_c('input', {
    attrs: {
      type: 'checkbox'
    }
  }), _vm._v(' 乒乓球 \n                            '), _c('input', {
    attrs: {
      type: 'checkbox'
    }
  }), _vm._v(' 羽毛球 \n                            '), _c('input', {
    attrs: {
      type: 'checkbox'
    }
  }), _vm._v(' 篮球 \n                            '), _c('input', {
    attrs: {
      type: 'checkbox'
    }
  }), _vm._v(' 足球 \n                            '), _c('input', {
    attrs: {
      type: 'checkbox'
    }
  }), _vm._v(' 网球 \n                        ')])]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    staticStyle: {
      'align-self': 'top'
    },
    attrs: {
      for: ''
    }
  }, [_vm._v('地　址:')]), _vm._v(' '), _c('textarea', {
    attrs: {
      name: '',
      id: '',
      rows: '5'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item',
    staticStyle: {
      display: 'flex',
      'justify-content': 'flex-end'
    }
  }, [_c('button', {
    staticClass: 'button danger shadow pull-right'
  }, [_vm._v('确认')])])])]), _vm._v(' '), _c('form', {
    staticClass: 'form',
    staticStyle: {
      width: '450px',
      display: 'inline-block'
    }
  }, [_c('section', [_c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('用户名:')]), _vm._v(' '), _c('input', {
    staticClass: 'underline',
    attrs: {
      type: 'text'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('密　码:')]), _vm._v(' '), _c('input', {
    staticClass: 'underline',
    attrs: {
      type: 'password'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('邮　箱:')]), _vm._v(' '), _c('input', {
    staticClass: 'underline',
    attrs: {
      type: 'email'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('手　机:')]), _vm._v(' '), _c('input', {
    staticClass: 'underline',
    attrs: {
      type: 'text'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item'
  }, [_c('label', {
    attrs: {
      for: ''
    }
  }, [_vm._v('地　址:')]), _vm._v(' '), _c('input', {
    staticClass: 'underline',
    attrs: {
      type: 'text'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'form-group item',
    staticStyle: {
      display: 'flex',
      'justify-content': 'flex-end'
    }
  }, [_c('button', {
    staticClass: 'button primary shadow'
  }, [_vm._v('确认')])])]), _vm._v(' '), _c('section', {
    staticClass: 'col5'
  })])]), _vm._v(' '), _c('h4', {
    staticClass: 'title'
  }, [_vm._v('带ICON的输入框')]), _vm._v(' '), _c('div', {
    staticClass: 'input-icon'
  }, [_c('input', {
    staticClass: 'input icon-right',
    staticStyle: {
      width: '300px'
    },
    attrs: {
      type: 'text'
    }
  }), _vm._v(' '), _c('section', {
    staticClass: 'icon-box right'
  }, [_c('i', {
    staticClass: 'fa fa-search'
  })])]), _vm._v(' '), _c('div', {
    staticClass: 'input-icon'
  }, [_c('section', {
    staticClass: 'icon-box left'
  }, [_c('i', {
    staticClass: 'fa fa-envelope'
  })]), _vm._v(' '), _c('input', {
    staticClass: 'input icon-left',
    staticStyle: {
      width: '300px'
    },
    attrs: {
      type: 'text'
    }
  })]), _vm._v(' '), _c('div', {
    staticClass: 'input-icon'
  }, [_c('section', {
    staticClass: 'icon-box left'
  }, [_c('i', {
    staticClass: 'fa fa-phone'
  })]), _vm._v(' '), _c('input', {
    staticClass: 'input icon-left',
    staticStyle: {
      width: '300px'
    },
    attrs: {
      type: 'text'
    }
  })]), _vm._v(' '), _c('p', [_vm._v('使用方式：')]), _vm._v(' '), _c('pre', [_vm._v('\n<div class="input-icon">\n    <input class="input icon-right" type="text" style="width: 300px;">\n    <section class="icon-box right">\n        <i class="fa fa-search"></i>\n    </section>\n</div>\n<div class="input-icon">\n    <section class="icon-box left">\n        <i class="fa fa-envelope"></i>\n    </section>\n    <input class="input icon-left" type="text" style="width: 300px;">\n</div>\n<div class="input-icon">\n    <section class="icon-box left">\n        <i class="fa fa-phone"></i>\n    </section>\n    <input class="input icon-left" type="text" style="width: 300px;">\n</div>\n        ')])])
}] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-9b0fe4f8', module.exports)
  }
}
/** */ }),
/* 97 */
/** */ (function (module, exports, __webpack_require__) {
module.exports = { render() {
 const _vm = this; const _h = _vm.$createElement; const _c = _vm._self._c || _h
  return (_vm.show) ? _c('div', {
    staticClass: 'wy-modal'
  }, [(!_vm.hideMask) ? _c('div', {
    staticClass: 'wy-modal-mask'
  }) : _vm._e(), _vm._v(' '), _c('div', {
    staticClass: 'wy-modal-body',
    style: ({
      width: `${_vm.w}px`,
      height: `${_vm.h}px`
    })
  }, [_c('header', [_vm._t('header'), _vm._v(' '), _c('span', {
    staticClass: 'close',
    on: {
      click: _vm.closeModal
    }
  }, [_vm._v('x')])], 2), _vm._v(' '), _c('div', {
    staticClass: 'main'
  }, [_vm._t('default')], 2), _vm._v(' '), _c('footer', [_vm._t('footer')], 2)])]) : _vm._e()
},
staticRenderFns: [] }
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require('vue-hot-reload-api').rerender('data-v-f102dbe0', module.exports)
  }
}
/** */ }),
/* 98 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(37)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('5c7ad8b4', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-009fa188!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./confirm.vue', () => {
     let newContent = require('!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-009fa188!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./confirm.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 99 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(38)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('56d85d8f', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0e91a21c!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./popup.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0e91a21c!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./popup.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 100 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(39)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('4e46ea45', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-10d9450a!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./span.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-10d9450a!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./span.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 101 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(40)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('746086da', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2a14e438!../../node_modules/sass-loader/index.js!./menu.scss', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2a14e438!../../node_modules/sass-loader/index.js!./menu.scss')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 102 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(41)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('2de3dfd1', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2f89e224!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./alert.vue', () => {
     let newContent = require('!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2f89e224!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./alert.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 103 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(42)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('672e2221', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3bd20296!../node_modules/sass-loader/index.js!./app.scss', () => {
     let newContent = require('!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3bd20296!../node_modules/sass-loader/index.js!./app.scss')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 104 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(43)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('10843a4f', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3d201ee2!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./popup.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3d201ee2!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./popup.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 105 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(44)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('f59b2cf8', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4d87d6f2!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./button.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4d87d6f2!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./button.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 106 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(45)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('57d66d93', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4da0e0c7!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pagination.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4da0e0c7!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pagination.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 107 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(46)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('fd4618d0', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-52bd480c!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./area.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-52bd480c!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./area.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 108 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(47)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('05ca9a14', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-55162088!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./select.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-55162088!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./select.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 109 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(48)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('31078476', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-584a7cb0!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./breadcrumb.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-584a7cb0!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./breadcrumb.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 110 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(49)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('1f430134', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5894510e!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue', () => {
     let newContent = require('!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5894510e!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 111 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(50)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('8c5026fa', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-59433fe9!../../node_modules/sass-loader/index.js!./index.scss', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-59433fe9!../../node_modules/sass-loader/index.js!./index.scss')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 112 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(51)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('2237e536', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5e606fa9!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./select.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5e606fa9!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./select.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 113 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(52)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('519f11d8', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7dc116a8!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7dc116a8!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 114 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(53)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('1a9a0926', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8675e784!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8675e784!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 115 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(54)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('1e741dd8', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8fe48162!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./message.vue', () => {
     let newContent = require('!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8fe48162!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./message.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 116 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(55)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('11e33e6a', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9ad183a4!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9ad183a4!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 117 */
/** */ (function (module, exports, __webpack_require__) {
// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
let content = __webpack_require__(56)
if (typeof content === 'string') content = [[module.i, content, '']]
if (content.locals) module.exports = content.locals
// add the styles to the DOM
const update = __webpack_require__(2)('54d43f02', content, false)
// Hot Module Replacement
if (false) {
 // When the styles change, update the <style> tags
 if (!content.locals) {
   module.hot.accept('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f102dbe0!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./modal.vue', () => {
     let newContent = require('!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f102dbe0!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./modal.vue')
     if (typeof newContent === 'string') newContent = [[module.id, newContent, '']]
     update(newContent)
   })
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(() => { update() })
}
/** */ }),
/* 118 */
/** */ (function (module, exports) {
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  const styles = []
  const newStyles = {}
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const id = item[0]
    const css = item[1]
    const media = item[2]
    const sourceMap = item[3]
    const part = {
      id: `${parentId}:${i}`,
      css,
      media,
      sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}
/** */ }),
/* 119 */
/** */ (function (module, exports) {
let g

// This works in non-strict mode
g = (function () {
	return this
}())

try {
	// This works if eval is allowed (see CSP)
	g = g || Function('return this')() || (1, eval)('this')
} catch (e) {
	// This works if the window reference is available
	if (typeof window === 'object')		{ g = window }
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g
/** */ }),
/* 120 */
/** */ (function (module, exports, __webpack_require__) {
const _vue = __webpack_require__(3)

const _vue2 = _interopRequireDefault(_vue)

const _vueRouter = __webpack_require__(5)

const _vueRouter2 = _interopRequireDefault(_vueRouter)

const _vuex = __webpack_require__(6)

const _vuex2 = _interopRequireDefault(_vuex)

const _router = __webpack_require__(8)

const _router2 = _interopRequireDefault(_router)

const _root = __webpack_require__(9)

const _root2 = _interopRequireDefault(_root)

const _app = __webpack_require__(12)

const _app2 = _interopRequireDefault(_app)

const _index = __webpack_require__(10)

const _index2 = _interopRequireDefault(_index)

const _index3 = __webpack_require__(11)

const _index4 = _interopRequireDefault(_index3)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

// 路由
_vue2.default.use(_index2.default) // 公共组件
// 根数据

_vue2.default.use(_vuex2.default)

_vue2.default.prototype.$plugins = _index4.default

const app = new _vue2.default({
    el: '#app',
    router: _router2.default,
    store: _root2.default,
    render: function render(h) {
        return h(_app2.default)
    }
})
/** */ })
/******/ ]))
