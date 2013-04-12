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
	var node = BB.lib.createNode({
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
	
	var _link = BB.lib.getElementsByClass('test-link', _fixture);

	equal(_link.length, 1, 'Correct number of elements returned');
	equal(_link[0].className, 'test-link', 'Correct class applied');
});
