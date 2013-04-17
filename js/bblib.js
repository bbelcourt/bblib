/*******************************************
*	BBlib JavaScript Library v0.1.0
*	
*	Author: Ben Belcourt
*	Last Modified: 4/16/2013
********************************************/

(function (window) {
	BBlib = {
		addClass: function (_class, el) {
			if (B.hasClass(_class, el)) {
				return;
			}

			el.className = el.className + ' ' + _class;
		},
		// Basic Ajax functionality
		ajax: function (method, url, callback) {
			var _xhr = new XMLHttpRequest();
			
			_xhr.open(method, url, true);
			_xhr.send();
			
			_xhr.onreadystatechange = function () {
				if (_xhr.readyState == 4 && _xhr.status == 200) {
					if (typeof callback == 'function') {
						callback(_xhr.responseText);
					}
				}
			};
		},
		cloneObj: function (obj) {
			var _newObj = {};

			if (obj == null || typeof obj != 'object') {
				return obj;
			}

			for (name in obj) {
				_newObj[name] = obj[name];
			};

			return _newObj;
		},
		// Dom creation functionality
		createNode: function (options) {
			/*
				options = {
					type: node type,
					innerHTML: innerHTML of the node,
					attributes: {
						...attributes for the node
					}
				}
			*/
			var _attr = options.attributes || [];
			var _node = document.createElement(options.type);
			if (options.innerHTML) {
				_node.innerHTML = options.innerHTML;
			}

			for (var key in _attr) {
				_node.setAttribute(key, _attr[key]);
			}

			return _node;
		},
		extend: function (src, copy) {
			var target = BBlib.cloneObj(src);

			for (name in copy) {
				target[name] = copy[name];
			}

			return target;
		},
		// Cross-browser function to retrieve elements by class name
		getElementsByClass: function (selector, context) {
			var _context = context || document;
			
			if (document.getElementsByClassName) {
				return _context.getElementsByClassName(selector);
			} else if (document.querySelectorAll) {
				return _context.querySelectorAll('.' + selector);
			} else {
				var
				_tags,
				_elem,
				_arr = []
				;

				if (_context.all) {
					_tags = _context.all;
				} else {
					_tags = _context.getElementsByTagName('*');
				}

				for (var x=_tags.length; x--;) {
					_elem = _tags[x];
					if (B.hasClass(_elem, selector)) {
						_arr.push(_elem);
					}
				}

				return _arr;
			}
		},
		// Utility function to check a given element for a given class name
		hasClass: function (_class, el) {
			var classes = el.className.split(' ');
			
			for (var x=classes.length; x--;) {
				if (classes[x] == _class) {
					return true;
				}
			}

			return false;
		},
		// Cross-browser event binding function
		on: function (ev, el, func) {
			var _bindEvt = function (el) {
				if (el.addEventListener)  // W3C
					el.addEventListener(ev,func,false);
				else if (el.attachEvent) { // IE
					el.attachEvent("on"+ev, func);
				}
				else {
					el[ev] = func;
				}
			}
			
			if (el.length != undefined) {
				for (var x=el.length; x--;) {
					_bindEvt(el[x]);	
				}
			} else {
				_bindEvt(el);
			}
		},
		removeClass: function (_class, el) {
			var _pattern = new RegExp('(\s*' + _class + '\s*)');
			el.className = el.className.replace(_pattern, '').trim().replace(/\s{2,}/g, ' ');
		}
	};

	window.BBlib = window.B = BBlib;
})(window);
