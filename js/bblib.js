/*******************************************
*	Author: Ben Belcourt
*	Last Modified: 4/12/2013
********************************************/

// Unique namespace to keep the global space clean
var BB = BB || {};

// Basic library functions to keep code DRY
BB.lib = {
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
			};
		};
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
	// Cross-browser function to retrieve elements by class name
	getElementsByClass: function (selector, context) {
		var _context = context || document;
		
		if (document.querySelectorAll) {
			return _context.querySelectorAll('.' + selector);
		} else {
			var
			_tags
			,_elem
			,_arr = []
			;

			if (_context.all) {
				_tags = _context.all;
			} else {
				_tags = _context.getElementsByTagName('*');
			};

			for (var x=_tags.length; x--;) {
				_elem = _tags[x];
				if (BB.lib.hasClass(_elem, selector)) {
					_arr.push(_elem);
				};
			};

			return _arr;
		};
	},
	// Utility function to check a given element for a given class name
	hasClass: function (el, _class) {
		var classes = el.className.split(' ');
		
		for (var x=classes.length; x--;) {
			if (classes[x] == _class) {
				return true;
			}
		};

		return false;
	},
	// Cross-browser event binding function
	on: function (ev, el, func) {
		if (el.addEventListener)  // W3C
			el.addEventListener(ev,func,false);
		else if (el.attachEvent) { // IE
			el.attachEvent("on"+ev, func);
		}
		else {
			el[ev] = func;
		}
	}
};

(function () {
	// Example of event delegation
	BB.lib.on('click', document.getElementById('content'), function (e) {
		if (BB.lib.hasClass(e.target, 'external')) {
			e.preventDefault();
			window.open(e.target.href);
		};
	});

	// Example code for XMLHttpRequest
	BB.xhr = function () {
		var
		_container = document.getElementById('xhr')
		,_xhrResponse
		;

		var _init = function () {
			_initTriggers();	
		};

		var _initTriggers = function () {
			var _triggers = BB.lib.getElementsByClass('trigger', _container);

			for (var x = _triggers.length; x--;) {
				BB.lib.on('click', _triggers[x], function (e) {
					e.preventDefault();

					_getJSON();
				});
			};
		};

		var _displayResult = function (data) {
			var _resultDiv = BB.lib.getElementsByClass('results', _container)[0];
			var _result = JSON.parse(data)

			_resultDiv.innerHTML = '<pre>' + data + '</pre>';
		};
		
		var _getJSON = function () {
			var _url = 'http://' + self.location.hostname + '/javascript/json.php'

			BB.lib.ajax('GET', _url, _displayResult);
		}
	
		if (_container) {
			_init();
		}
	};
	BB.xhr();

	//Example of DOM manipulation and event binding/delegation
	BB.delegate = function () {
		var _container = document.getElementById('delegate');
		var _results = BB.lib.getElementsByClass('results', _container)[0];

		var _init = function () {
			_initLinks();
		};

		var _initLinks = function () {
			BB.lib.on('click', _container, function(e) {
				if(BB.lib.hasClass(e.target, 'trigger')) {
					e.preventDefault();
					var _linkNode = BB.lib.createNode({
						'type': 'a',
						'innerHTML': 'Add Link',
						'attributes': {
							'href': '#',
							'class': 'trigger'
						}
					});
					var _listItem = BB.lib.createNode({
						'type': 'li'
					});
					_listItem.appendChild(_linkNode);

					_results.appendChild(_listItem);
				}
			});
		};

		if (_container) {
			_init();
		}
	};
	BB.delegate();
})();
