module('DOM methods');
test('Basic Requirements',6, function () {
	ok(document.getElementById, 'getElementByID');
	ok(document.querySelectorAll, 'querySelectorAll');
	ok(document.getElementsByTagName, 'getElementsByTagName');
	ok(Array.prototype.push, 'Array.push()');
	ok(document.createElement, 'createElement');
	ok(Element.prototype.setAttribute, 'Element.setAttribute');
});

test('createNode',4, function () {
	var node = B.createNode({
		'type': 'div',
		'innerHTML': 'this is div text',
		'attributes': {
			'id': 'test-node',
			'class': 'test-class'
		}
	});

	equal(node.tagName, 'DIV', 'Correct type of node created');
	equal(node.id, 'test-node', 'Correct id assigned');
	equal(node.innerHTML, 'this is div text', 'Correct innerHTML applied');
	equal(node.className, 'test-class', 'Correct class applied');
});

test('getElementByClass', function () {
	var _fixture = document.getElementById('qunit-fixture');
	var _node = document.createElement('a');
	_node.setAttribute('class', 'test-link');
	_fixture.appendChild(_node);
	
	var _link = B.getElementsByClass('test-link', _fixture);

	equal(_link.length, 1, 'Correct number of elements returned');
	equal(_link[0].className, 'test-link', 'Correct class applied');
});

test('cloneObj', function () {
	var _src = {'src01': 'test01', 'src02': 'test02', 'src03':'test03'};
	var _copy = B.cloneObj(_src);

	equal(_copy['src01'], 'test01', 'Object cloned correctly');

	_copy['src02'] = 'foo02';

	equal(_copy['src02'], 'foo02', 'Clone updated correctly');
	equal(_src['src02'], 'test02', 'Original remains untouched');
});

test('extend', function () {
	var _src = {'src01': 'test01', 'src02': 'test02', 'src03':{'src03-01':'test03-01', 'src03-02':'test03-02'}, 'src04':'test04'};
	var _copy = {'src01':'foo01', 'copy02':'foo02', 'src04': function () { console.log('this function doesn\'t fire!');}};
	var _opts = B.extend(_src, _copy);

	equal(_opts['src02'], 'test02', 'Orginal array copied correctly');
	equal(_opts['src01'], 'foo01', 'Orginal array copied correctly');
	equal(_opts['copy02'], 'foo02', 'Original array extended correctly');
});

test('addClass', function () {
	var _node = document.createElement('div');
	_node.setAttribute('class', 'test');

	B.addClass('foo', _node);
	equal(_node.className, 'test foo', 'Class successfully added to the end of the string');

	B.addClass('foo', _node);
	equal(_node.className, 'test foo', 'Class successfully ignored when it already exists');
});

test('removeClass', function () {
	var _node = document.createElement('div');
	_node.setAttribute('class', 'test foo last clearfix');

	B.removeClass('foo', _node);
	equal(_node.className, 'test last clearfix', 'Class successfully removed from inside the string');

	B.removeClass('clearfix', _node);
	equal(_node.className, 'test last', 'Class successfully removed from the end of the string');

	B.removeClass('test', _node);
	equal(_node.className, 'last', 'Class successfully removed from the beginning of the string');
});

test('bindEvent', function () {
	var _fixture = document.getElementById('qunit-fixture');
	var _node = document.createElement('a');
	_fixture.appendChild(_node);
	var _link = _fixture.getElementsByTagName('A')[0];
	var _evt = new Event('click');

	var _handler = function (ev, data) {
		ok(true, 'Event bound successfully');
	};
	B.on('click', _link, _handler);
	_link.dispatchEvent(_evt);

	var _node2 = document.createElement('a');
	_fixture.appendChild(_node2);

	var _links = _fixture.getElementsByTagName('A');
	B.on('click', _links, _handler);

	for (var x = _links.length; x--;) {
		_links[x].dispatchEvent(_evt);
	}
});
