/******/ var __webpack_modules__ = ({

/***/ 382:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(935);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".blackbutton {\r\n    background-image: linear-gradient(to bottom, #4c4c4c 0%, #434343 52%, #333333 52%, #454545 100%);\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125);\r\n    border: 1px solid #042440;\r\n    border-radius: 3px;\r\n    color: #d0e3ce;\r\n    text-shadow: 0;\r\n    height: 27px;\r\n    line-height: 27px;\r\n    padding: 0 11px;\r\n    text-align: center;\r\n    cursor: default;\r\n    font-weight: normal;\r\n    -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;\r\n}\r\n.blackbuttonDisabled {\r\n    color: rgba(220, 235, 219, 0.5);\r\n}\r\n.blackbuttonFocus {\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125), 0 0 6px 1px rgba(255, 255, 255, 0.1) inset;\r\n}\r\n.blackbuttonOver {\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125), 0 0 0 1000px rgba(158, 169, 156, 0.08) inset;\r\n}\r\n.blackbuttonDown {\r\n    box-shadow: 0 0 3px 2px #343434 inset;\r\n}", "",{"version":3,"sources":["webpack://./assets/styles/button.css"],"names":[],"mappings":"AAAA;IACI,gGAAgG;IAChG,wFAAwF;IACxF,yBAAyB;IACzB,kBAAkB;IAClB,cAAc;IACd,cAAc;IACd,YAAY;IACZ,iBAAiB;IACjB,eAAe;IACf,kBAAkB;IAClB,eAAe;IACf,mBAAmB;IACnB,mCAAmC,CAAC,kCAAkC;AAC1E;AACA;IACI,+BAA+B;AACnC;AACA;IACI,oIAAoI;AACxI;AACA;IACI,sIAAsI;AAC1I;AACA;IACI,qCAAqC;AACzC","sourcesContent":[".blackbutton {\r\n    background-image: linear-gradient(to bottom, #4c4c4c 0%, #434343 52%, #333333 52%, #454545 100%);\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125);\r\n    border: 1px solid #042440;\r\n    border-radius: 3px;\r\n    color: #d0e3ce;\r\n    text-shadow: 0;\r\n    height: 27px;\r\n    line-height: 27px;\r\n    padding: 0 11px;\r\n    text-align: center;\r\n    cursor: default;\r\n    font-weight: normal;\r\n    -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;\r\n}\r\n.blackbuttonDisabled {\r\n    color: rgba(220, 235, 219, 0.5);\r\n}\r\n.blackbuttonFocus {\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125), 0 0 6px 1px rgba(255, 255, 255, 0.1) inset;\r\n}\r\n.blackbuttonOver {\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125), 0 0 0 1000px rgba(158, 169, 156, 0.08) inset;\r\n}\r\n.blackbuttonDown {\r\n    box-shadow: 0 0 3px 2px #343434 inset;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 935:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 1:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ 591:
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 128:
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 51:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 855:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 740:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 656:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/nonce */
/******/ (() => {
/******/ 	__webpack_require__.nc = undefined;
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $: () => (/* reexport */ Button)
});

// NAMESPACE OBJECT: ./assets/styles/button.css
var button_namespaceObject = {};
__webpack_require__.r(button_namespaceObject);
__webpack_require__.d(button_namespaceObject, {
  "default": () => (assets_styles_button)
});

;// CONCATENATED MODULE: ./src/utils/dom.ts

var _navigator = typeof navigator == "object" ? navigator : {};
var os = (/mac|win|linux/i.exec(_navigator["platform"]) || ["other"])[0].toLowerCase();
var ua = _navigator["userAgent"] || "";
var useragent = {
  isWin: os == "win",
  isChromeOS: ua.indexOf(" CrOS ") >= 0,
  isEdge: parseFloat(ua.split(" Edge/")[1]) || void 0
};
var XHTML_NS = "http://www.w3.org/1999/xhtml";
var dom;
((dom2) => {
  dom2.buildDom = function(arr, parent, refs) {
    if (typeof arr == "string" && arr) {
      var txt = document.createTextNode(arr);
      if (parent)
        parent.appendChild(txt);
      return txt;
    }
    if (!Array.isArray(arr)) {
      if (arr && arr.appendChild && parent)
        parent.appendChild(arr);
      return arr;
    }
    if (typeof arr[0] != "string" || !arr[0]) {
      var els = [];
      for (var i = 0; i < arr.length; i++) {
        var ch = (0, dom2.buildDom)(arr[i], parent, refs);
        ch && els.push(ch);
      }
      return els;
    }
    var el = document.createElement(arr[0]);
    var options = arr[1];
    var childIndex = 1;
    if (options && typeof options == "object" && !Array.isArray(options))
      childIndex = 2;
    for (var i = childIndex; i < arr.length; i++)
      (0, dom2.buildDom)(arr[i], el, refs);
    if (childIndex == 2) {
      Object.keys(options).forEach(function(n) {
        var val = options[n];
        if (n === "class") {
          el.className = Array.isArray(val) ? val.join(" ") : val;
        } else if (typeof val == "function" || n == "value" || n[0] == "$") {
          el[n] = val;
        } else if (n === "ref") {
          if (refs)
            refs[val] = el;
        } else if (n === "style") {
          if (typeof val == "string")
            el.style.cssText = val;
        } else if (val != null) {
          el.setAttribute(n, val);
        }
      });
    }
    if (parent)
      parent.appendChild(el);
    return el;
  };
  dom2.getDocumentHead = function(doc) {
    if (!doc)
      doc = document;
    return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
  };
  dom2.createElement = function(tag, ns) {
    return document.createElementNS ? document.createElementNS(ns || XHTML_NS, tag) : document.createElement(tag);
  };
  dom2.removeChildren = function(element) {
    element.innerHTML = "";
  };
  dom2.createTextNode = function(textContent, element) {
    var doc = element ? element.ownerDocument : document;
    return doc.createTextNode(textContent);
  };
  dom2.createFragment = function(element) {
    var doc = element ? element.ownerDocument : document;
    return doc.createDocumentFragment();
  };
  dom2.hasCssClass = function(el, name) {
    var classes = (el.className + "").split(/\s+/g);
    return classes.indexOf(name) !== -1;
  };
  dom2.addCssClass = function(el, name) {
    if (!(0, dom2.hasCssClass)(el, name)) {
      el.className += " " + name;
    }
  };
  dom2.removeCssClass = function(el, name) {
    var classes = el.className.split(/\s+/g);
    while (true) {
      var index = classes.indexOf(name);
      if (index == -1) {
        break;
      }
      classes.splice(index, 1);
    }
    el.className = classes.join(" ");
  };
  dom2.toggleCssClass = function(el, name) {
    var classes = el.className.split(/\s+/g), add = true;
    while (true) {
      var index = classes.indexOf(name);
      if (index == -1) {
        break;
      }
      add = false;
      classes.splice(index, 1);
    }
    if (add)
      classes.push(name);
    el.className = classes.join(" ");
    return add;
  };
  dom2.setCssClass = function(node, className, include) {
    if (include) {
      (0, dom2.addCssClass)(node, className);
    } else {
      (0, dom2.removeCssClass)(node, className);
    }
  };
  dom2.hasCssString = function(id, doc) {
    var index = 0, sheets;
    doc = doc || document;
    if (sheets = doc.querySelectorAll("style")) {
      while (index < sheets.length) {
        if (sheets[index++].id === id) {
          return true;
        }
      }
    }
  };
  dom2.removeElementById = function(id, doc) {
    doc = doc || document;
    if (doc.getElementById(id)) {
      doc.getElementById(id).remove();
    }
  };
  var strictCSP;
  var cssCache = [];
  dom2.useStrictCSP = function(value) {
    strictCSP = value;
    if (value == false)
      insertPendingStyles();
    else if (!cssCache)
      cssCache = [];
  };
  function insertPendingStyles() {
    var cache = cssCache;
    cssCache = null;
    cache && cache.forEach(function(item) {
      importCssString(item[0], item[1]);
    });
  }
  function importCssString(cssText, id, target) {
    if (typeof document == "undefined")
      return;
    if (cssCache) {
      if (target) {
        insertPendingStyles();
      } else if (target === false) {
        return cssCache.push([cssText, id]);
      }
    }
    if (strictCSP)
      return;
    var container = target;
    if (!target || !target.getRootNode) {
      container = document;
    } else {
      container = target.getRootNode();
      if (!container || container == target)
        container = document;
    }
    var doc = container.ownerDocument || container;
    if (id && (0, dom2.hasCssString)(id, container))
      return null;
    if (id)
      cssText += "\n/*# sourceURL=ace/css/" + id + " */";
    var style = (0, dom2.createElement)("style");
    style.appendChild(doc.createTextNode(cssText));
    if (id)
      style.id = id;
    if (container == doc)
      container = (0, dom2.getDocumentHead)(doc);
    container.insertBefore(style, container.firstChild);
  }
  dom2.importCssString = importCssString;
  dom2.importCssStylsheet = function(uri, doc) {
    (0, dom2.buildDom)(["link", { rel: "stylesheet", href: uri }], (0, dom2.getDocumentHead)(doc));
  };
  dom2.scrollbarWidth = function(document2) {
    var inner = (0, dom2.createElement)("ace_inner");
    inner.style.width = "100%";
    inner.style.minWidth = "0px";
    inner.style.height = "200px";
    inner.style.display = "block";
    var outer = (0, dom2.createElement)("ace_outer");
    var style = outer.style;
    style.position = "absolute";
    style.left = "-10000px";
    style.overflow = "hidden";
    style.width = "200px";
    style.minWidth = "0px";
    style.height = "150px";
    style.display = "block";
    outer.appendChild(inner);
    var body = document2.documentElement;
    body.appendChild(outer);
    var noScrollbar = inner.offsetWidth;
    style.overflow = "scroll";
    var withScrollbar = inner.offsetWidth;
    if (noScrollbar == withScrollbar) {
      withScrollbar = outer.clientWidth;
    }
    body.removeChild(outer);
    return noScrollbar - withScrollbar;
  };
  dom2.computedStyle = function(element, style) {
    return window.getComputedStyle(element, "") || {};
  };
  dom2.setStyle = function(styles, property, value) {
    if (styles[property] !== value) {
      styles[property] = value;
    }
  };
  dom2.HAS_CSS_ANIMATION = false;
  dom2.HAS_CSS_TRANSFORMS = false;
  dom2.HI_DPI = useragent.isWin ? typeof window !== "undefined" && window.devicePixelRatio >= 1.5 : true;
  if (useragent.isChromeOS)
    dom2.HI_DPI = false;
  if (typeof document !== "undefined") {
    var div = document.createElement("div");
    if (dom2.HI_DPI && div.style.transform !== void 0)
      dom2.HAS_CSS_TRANSFORMS = true;
    if (!useragent.isEdge && typeof div.style.animationName !== "undefined")
      dom2.HAS_CSS_ANIMATION = true;
    div = null;
  }
  if (dom2.HAS_CSS_TRANSFORMS) {
    dom2.translate = function(element, tx, ty) {
      element.style.transform = "translate(" + Math.round(tx) + "px, " + Math.round(ty) + "px)";
    };
  } else {
    dom2.translate = function(element, tx, ty) {
      element.style.top = Math.round(ty) + "px";
      element.style.left = Math.round(tx) + "px";
    };
  }
})(dom || (dom = {}));

// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(591);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(740);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(128);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(855);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(51);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ../../node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(656);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ../../node_modules/css-loader/dist/cjs.js!./assets/styles/button.css
var styles_button = __webpack_require__(382);
;// CONCATENATED MODULE: ./assets/styles/button.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles_button/* default */.A, options);




       /* harmony default export */ const assets_styles_button = (styles_button/* default */.A && styles_button/* default */.A.locals ? styles_button/* default */.A.locals : undefined);

;// CONCATENATED MODULE: ./src/widgets/elements/button.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};


dom.importCssString(button_namespaceObject, "button.css");
class Button {
  constructor(options) {
    let _a = options, { disabled, value, className } = _a, other = __objRest(_a, ["disabled", "value", "className"]);
    this.disabled = disabled;
    this.value = value;
    this.className = className || "blackbutton";
    this.options = other;
  }
  remove() {
  }
  render() {
    this.element = dom.buildDom(["div", __spreadValues({
      class: this.className + (this.disabled ? this.className + "Disabled" : ""),
      onmousedown: (e) => {
        e.preventDefault();
        e.target.className = this.className + " " + this.className + "Down";
      },
      onmouseup: (e) => {
        e.target.className = this.className;
      },
      onmouseover: (e) => {
        e.target.className = this.className + " " + this.className + "Over";
      },
      onfocus: (e) => {
        e.target.className = this.className + " " + this.className + "Focus";
      },
      onunfocus: (e) => {
        e.target.className = this.className;
      },
      onmouseout: (e) => {
        e.target.className = this.className;
      }
    }, this.options), this.value]);
    this.element.$host = this;
    return this.element;
  }
  toJSON() {
  }
}

;// CONCATENATED MODULE: ./src/index.ts


var __webpack_exports__Button = __webpack_exports__.$;
export { __webpack_exports__Button as Button };

//# sourceMappingURL=bundle.index.js.map