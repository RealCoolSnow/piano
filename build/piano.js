(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["piano"] = factory();
	else
		root["piano"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Piano = function () {
	  function Piano(options) {
	    var _this = this;
	
	    _classCallCheck(this, Piano);
	
	    if (document.querySelectorAll('#piano').length) {
	      console.warn('piano is already initialized, not creating.');
	      return false;
	    }
	    this.defaults = {
	      triggerEvents: ['click'],
	      slideContent: false,
	      slideContainer: 'body',
	      onBeforeHidden: function onBeforeHidden() {},
	      onHidden: function onHidden() {},
	      layouts: options.layouts || [],
	      autohide: true,
	      autoScroll: true
	    };
	    this.pianoEnhancedEvents = [];
	    this.pianoInstance = [];
	    this.settings = _extends(this.defaults, options);
	    this.container = _extends(document.createElement('div'), { id: 'piano', className: 'piano-container animated' });
	    this.detectInputs();
	    document.body.appendChild(this.container);
	    // Make sure to hide keyboard when clicking outside
	    if (this.settings.autohide) {
	      var handler = function handler(event) {
	        var dataset = event.target.dataset || {};
	        if (dataset.piano !== '' && _this.container && !_this.container.contains(event.target)) {
	          _this.hideKeyboard();
	        }
	      };
	      addMultipleListeners(this, document, this.defaults.triggerEvents, document, handler);
	    }
	  }
	
	  _createClass(Piano, [{
	    key: 'createKeyboard',
	    value: function createKeyboard(parent, target, overrideOptions) {
	      var _this2 = this;
	
	      var _k = _extends({}, parent);
	      delete _k.pianoInstance;
	      delete _k.triggers;
	      delete _k.layouts;
	      var datas = target.dataset;
	      var options = {};
	
	      _k.shift = false;
	
	      if (datas.pianoPosition) {
	        if (datas.pianoPosition.indexOf('absolute') > -1) {
	          options.position = datas.pianoPosition.replace(/absolute,\s/gi, '').split(',');
	        } else {
	          options.position = datas.pianoPosition ? datas.pianoPosition.split(',') : [];
	        }
	      } else {
	        //console.warn('It seems you have incorrect values in your data-piano-position attribute on element: ', target)
	        options.position = [];
	      }
	
	      options.layout = datas.pianoLayout;
	      options.limit = datas.pianoLimit;
	      options.animationIn = datas.pianoAnimationIn;
	      options.animationOut = datas.pianoAnimationOut;
	      options.scale = datas.pianoScale;
	
	      if (overrideOptions) {
	        options = _extends(options, overrideOptions);
	      }
	
	      var eventID = datas.pianoEventId;
	      var elementEvent = null;
	      if (eventID) {
	        elementEvent = document.createEvent('Event');
	        elementEvent.initEvent(eventID, true, true);
	      }
	
	      // could be improve with a default object
	      _k.settings = {
	        position: {
	          x: options.position[0] || 'center',
	          y: options.position[1] || 'bottom'
	        },
	        layout: options.layout || 'default',
	        limit: options.limit || -1,
	        submitEvent: elementEvent,
	        animationIn: options.animationIn || 'fadeInUp',
	        animationOut: options.animationOut || 'fadeOutDown',
	        scale: options.scale || 1
	      };
	      var handler = function handler(event) {
	        _this2.clearKeyboards(_k, _this2);
	        _this2.currentTarget = event.target;
	        _this2.displayKeyboard(_k);
	        event.preventDefault();
	      };
	      addMultipleListeners(this, _k, this.defaults.triggerEvents, target, handler);
	      this.pianoInstance.push(_k);
	    }
	  }, {
	    key: 'detectInputs',
	    value: function detectInputs() {
	      this.triggers = document.querySelectorAll('[data-piano]');
	      var triggerSize = this.triggers.length;
	      for (var triggerIdx = 0; triggerIdx < triggerSize; triggerIdx++) {
	        // console.log(this, this.triggers[triggerIdx])
	        this.createKeyboard(this, this.triggers[triggerIdx]);
	      }
	    }
	  }, {
	    key: 'addTarget',
	    value: function addTarget(el, options) {
	      this.createKeyboard(this, el, options);
	    }
	  }, {
	    key: 'displayKeyboard',
	    value: function displayKeyboard(instance) {
	      var _k = this;
	      _k.currentKeyboard = instance;
	
	      var rowsContainer = document.createElement('div');
	      rowsContainer.className = 'piano-rows';
	
	      var layout = this.settings.layouts[instance.settings.layout];
	
	      var rows = [];
	      rows.push(document.createElement('ul'));
	
	      for (var i in layout) {
	        var li = document.createElement('li');
	        if (layout[i][0] === 'break') {
	          rowsContainer.appendChild(rows[rows.length - 1]);
	          rows.push(document.createElement('ul'));
	        } else {
	          var key = document.createElement('button');
	          if (_typeof(layout[i][0]) === 'object') {
	            li.className = layout[i][0].name;
	            key.className = 'key ' + layout[i][0].name;
	            key.innerHTML = layout[i][0].value;
	            key.dataset.pianoKey = layout[i][0].name;
	          } else {
	            key.className = 'key ' + layout[i];
	            key.textContent = layout[i][0];
	            key.dataset.pianoKey = layout[i][0];
	          }
	          addMultipleListeners(this, _k, _k.settings.triggerEvents, key, function (event) {
	            debounce(this.keyPressed(event), 300, false);
	          }.bind(this));
	          li.appendChild(key);
	        }
	        rowsContainer.appendChild(rows[rows.length - 1]);
	
	        rows[rows.length - 1].appendChild(li);
	
	        this.currentTarget.focus();
	      }
	
	      if (isNaN(instance.settings.position.x) || isNaN(instance.settings.position.y)) {
	        this.container.className += ' ' + instance.settings.position.x;
	        this.container.className += ' ' + instance.settings.position.y;
	      } else {
	        this.container.style.left = instance.settings.position.x + 'px';
	        this.container.style.top = instance.settings.position.y + 'px';
	      }
	
	      this.container.style.display = 'block';
	      this.container.classList.remove(this.currentKeyboard.settings.animationOut);
	      this.container.appendChild(rowsContainer);
	      this.container.classList.add(this.currentKeyboard.settings.animationIn);
	
	      var scale = _k.currentKeyboard.settings.scale;
	      if (scale > 1) {
	        var x = _k.currentKeyboard.settings.position.x;
	        var y = _k.currentKeyboard.settings.position.y;
	        scaleKeyboard(rowsContainer, scale, x, y);
	      }
	
	      document.body.classList.add('piano-open');
	      this.settings.autoScroll && this.scrollWindow();
	      if (this.settings.slideContent) {
	        document.querySelector(this.settings.slideContainer).style.top = '-' + rowsContainer.getBoundingClientRect().height / 2 + 'px';
	      }
	    }
	  }, {
	    key: 'keyPressed',
	    value: function keyPressed(event) {
	      var target = event.target;
	      var value = target.textContent;
	      var input = this.currentTarget;
	      var cursor = input.selectionStart;
	      var end = input.selectionEnd;
	      var diff = end - cursor || 1;
	      var offset = event.target.innerText.length;
	      var limit = this.currentKeyboard.settings.limit;
	      var submitEvent = this.currentKeyboard.settings.submitEvent;
	
	      // There are still small bugs with selections.
	      if (/del/i.test(target.className)) {
	        var deleteOffset = cursor ? -1 : 0;
	        input.value = insertToString(input.value, cursor + deleteOffset, diff, '');
	        offset = -1;
	      } else if (/space/i.test(target.className)) {
	        if (input.value.length <= limit || limit === -1) {
	          input.value = insertToString(input.value, cursor, diff - 1, ' ');
	        }
	      } else if (/shift/i.test(target.className)) {
	        this.switchCase();
	      } else if (/larr/i.test(target.className)) {
	        offset = -1;
	      } else if (/rarr/i.test(target.className)) {
	        offset = 1;
	      } else if (/hide/i.test(target.className)) {
	        this.hideKeyboard();
	      } else if (/submit/i.test(target.className)) {
	        if (submitEvent) {
	          input.dispatchEvent(submitEvent);
	        } else {
	          console.warn('You did not provide a data-piano-event-id attribute.');
	        }
	      } else {
	        if (input.value.length <= limit || limit === -1) {
	          input.value = insertToString(input.value, cursor, diff - 1, value);
	        }
	      }
	
	      input.selectionStart = cursor + offset;
	      input.selectionEnd = cursor + offset;
	
	      if (document.createEvent) {
	        var evt = document.createEvent('HTMLEvents');
	        evt.initEvent('input', false, true);
	        input.dispatchEvent(evt);
	      } else {
	        input.fireEvent('input');
	      }
	
	      input.focus();
	      event.preventDefault();
	    }
	  }, {
	    key: 'scrollWindow',
	    value: function scrollWindow() {
	      var input = this.currentTarget.getBoundingClientRect().top - 100;
	      var posY = window.scrollY + input;
	      input > 0 && this.scrollTo(posY, 300);
	    }
	  }, {
	    key: 'scrollTo',
	    value: function scrollTo(to, duration) {
	      var _this3 = this;
	
	      if (duration <= 0) return;
	      var difference = to - window.scrollY;
	      var perTick = difference / duration * 10;
	      setTimeout(function () {
	        window.scrollTo(0, window.scrollY + perTick);
	        if (window.scrollY === to) return;
	        _this3.scrollTo(to, duration - 10);
	      }, 10);
	    }
	  }, {
	    key: 'switchCase',
	    value: function switchCase() {
	      var shift = this.currentKeyboard.shift = !this.currentKeyboard.shift;
	      var keys = document.querySelectorAll('.piano-rows > ul > li');
	      var layout = this.settings.layouts[this.currentKeyboard.settings.layout];
	      var keySize = keys.length;
	
	      for (var i = 0; i < keySize; i++) {
	        var target = keys[i].children[0];
	        if (target) {
	          var value = target.textContent;
	          if (layout[i].length > 1 && layout[i][0].length > 0) {
	            target.textContent = shift ? layout[i][1] : layout[i][0];
	          } else {
	            target.textContent = shift ? value.toUpperCase() : value.toLowerCase();
	          }
	        }
	      }
	    }
	  }, {
	    key: 'hideKeyboard',
	    value: function hideKeyboard() {
	      var _this4 = this;
	
	      if (this.container.style.display === 'block') {
	        typeof this.settings.onBeforeHidden === 'function' && this.settings.onBeforeHidden();
	        this.container.classList.remove(this.currentKeyboard.settings.animationIn);
	        this.container.classList.add(this.currentKeyboard.settings.animationOut);
	        setTimeout(function () {
	          _this4.container.style.display = 'none';
	          typeof _this4.settings.onHidden === 'function' && _this4.settings.onHidden();
	        }, this.container.style.animationDuration * 1000 || 300);
	        document.body.classList.remove('piano-open');
	        if (this.settings.slideContent) {
	          document.querySelector(this.settings.slideContainer).style.top = 0;
	        }
	      }
	    }
	  }, {
	    key: 'clearKeyboards',
	    value: function clearKeyboards(k, parent, master) {
	      removeMultipleEventListener(k, master);
	      if (this.container && this.container.firstChild) {
	        this.container.firstChild.remove();
	        this.container.style.top = this.container.style.left = '';
	        this.container.className = 'piano-container animated';
	        this.currentKeyboard = null;
	        document.body.classList.remove('piano-open');
	        if (this.settings.slideContent) {
	          document.querySelector(this.settings.slideContainer).style.top = 0;
	        }
	      }
	    }
	  }, {
	    key: 'isOpen',
	    value: function isOpen() {
	      return document.body.className.match(/\piano-open\b/) !== null;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this5 = this;
	
	      if (this.pianoInstance) {
	        this.pianoInstance.forEach(function (instance) {
	          _this5.clearKeyboards(instance, _this5);
	        });
	      }
	      if (document.pianoEnhancedEvents) {
	        document.pianoEnhancedEvents.forEach(function (ee) {
	          ee.forEach(function (el) {
	            el.target.removeEventListener(el.event, el.eventHandler);
	          });
	        });
	      }
	      if (this.container) {
	        this.container.remove();
	      }
	      this.defaults = null;
	      this.pianoEnhancedEvents = null;
	      this.pianoInstance = null;
	      this.settings = null;
	      this.container = null;
	      return null;
	    }
	  }]);
	
	  return Piano;
	}();
	
	function scaleKeyboard(container, scale, x, y) {
	  container.style['-webkit-transform'] = 'scale(' + scale + ')';
	  container.style['-moz-transform'] = 'scale(' + scale + ')';
	  container.style['-ms-transform'] = 'scale(' + scale + ')';
	  container.style['-o-transform'] = 'scale(' + scale + ')';
	  container.style['transform'] = 'scale(' + scale + ')';
	
	  container.style['-webkit-transform-origin'] = x + ' ' + y;
	  container.style['-moz-transform-origin'] = x + ' ' + y;
	  container.style['-ms-transform-origin'] = x + ' ' + y;
	  container.style['-o-transform-origin'] = x + ' ' + y;
	  container.style['transform-origin'] = x + ' ' + y;
	}
	
	function insertToString(str, index, count, add) {
	  return str.slice(0, index) + (add || '') + str.slice(index + count);
	}
	
	function removeMultipleEventListener(pianoInstance, master) {
	  pianoInstance.pianoEnhancedEvents.forEach(function (ee) {
	    ee.forEach(function (el) {
	      if (el.target.dataset && el.target.dataset.pianoKey || master) {
	        el.target.removeEventListener(el.eventName, el.eventHandler);
	      }
	    });
	  });
	  pianoInstance.pianoEnhancedEvents = [];
	}
	
	function addMultipleListeners(context, child, events, target, handler) {
	  if (child.pianoEnhancedEvents && child.pianoEnhancedEvents.length > -1) {
	    child.pianoEnhancedEvents.push([]);
	  } else {
	    child.pianoEnhancedEvents = [];
	    child.pianoEnhancedEvents.push([]);
	  }
	  events = events instanceof Array ? events : [events];
	  events.forEach(function (eventName) {
	    child.pianoEnhancedEvents[child.pianoEnhancedEvents.length - 1].push({
	      eventName: eventName,
	      target: target,
	      eventHandler: function eventHandler(event) {
	        if (event.timeStamp !== context.lastTimeStamp) {
	          handler(event);
	        }
	        context.lastTimeStamp = event.timeStamp;
	      }
	    });
	  });
	  child.pianoEnhancedEvents[child.pianoEnhancedEvents.length - 1].forEach(function (ee) {
	    ee.target.addEventListener(ee.eventName, ee.eventHandler);
	  });
	}
	
	// Helpers function for piano object
	function debounce(func, wait, immediate) {
	  var timeout;
	  return function () {
	    var context = this;
	    var args = arguments;
	    var later = function later() {
	      timeout = null;
	      if (!immediate) {
	        func.apply(context, args);
	      }
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait || 200);
	    if (callNow) {
	      func.apply(context, args);
	    }
	  };
	}
	
	module.exports = Piano;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=piano.js.map