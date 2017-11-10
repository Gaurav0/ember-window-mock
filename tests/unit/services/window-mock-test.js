import { module } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import windowMock from 'ember-window-mock/-private/services/window';

module('service:window-mock', {
  beforeEach() {
    this.windowMock = windowMock();
  }
});

test('it mocks window.location.href', function(assert) {
  this.windowMock.location.href = 'http://www.example.com:8080/foo?q=bar#hash';
  assert.equal(this.windowMock.location.href, 'http://www.example.com:8080/foo?q=bar#hash');
  assert.equal(this.windowMock.location.host, 'www.example.com:8080');
  assert.equal(this.windowMock.location.hostname, 'www.example.com');
  assert.equal(this.windowMock.location.protocol, 'http:');
  assert.equal(this.windowMock.location.origin, 'http://www.example.com:8080');
  assert.equal(this.windowMock.location.port, '8080');
  assert.equal(this.windowMock.location.pathname, '/foo');
  assert.equal(this.windowMock.location.search, '?q=bar');
  assert.equal(this.windowMock.location.hash, '#hash');
});

test('it mocks window.location', function(assert) {
  this.windowMock.location = 'http://www.example.com';
  assert.equal(this.windowMock.location.href, 'http://www.example.com');
});

test('it mocks window.location.reload', function(assert) {
  this.windowMock.location = 'http://www.example.com';
  this.windowMock.location.reload();
  assert.equal(this.windowMock.location.href, 'http://www.example.com');
});

test('it mocks window.location.replace', function(assert) {
  this.windowMock.location = 'http://www.example.com';
  this.windowMock.location.replace('http://www.emberjs.com');
  assert.equal(this.windowMock.location.href, 'http://www.emberjs.com');
});

test('it mocks window.location.assign', function(assert) {
  this.windowMock.location = 'http://www.example.com';
  this.windowMock.location.assign('http://www.emberjs.com');
  assert.equal(this.windowMock.location.href, 'http://www.emberjs.com');
});

test('it proxies properties', function(assert) {
  window.window_mock_test_property = 'foo';
  assert.equal(this.windowMock.window_mock_test_property, 'foo');
  delete window.window_mock_test_property;
});

test('it proxies functions', function(assert) {
  assert.expect(1);
  this.windowMock.focus();
  assert.ok(true);
});

test('it replaces alert with noop', function(assert) {
  assert.expect(1);
  assert.equal(this.windowMock.alert('foo'), undefined);
});

test('it replaces confirm with noop', function(assert) {
  assert.expect(1);
  assert.equal(this.windowMock.confirm('foo'), undefined);
});

test('it replaces prompt with prompt', function(assert) {
  assert.expect(1);
  assert.equal(this.windowMock.prompt('foo'), undefined);
});

test('it can stub alert', function(assert) {
  let stub = this.stub(this.windowMock, 'alert');
  this.windowMock.alert('foo');
  assert.ok(stub.calledOnce);
  assert.ok(stub.calledWith('foo'));
});

test('it can stub confirm', function(assert) {
  let stub = this.stub(this.windowMock, 'confirm');
  stub.returns(true);
  let result = this.windowMock.confirm('foo');
  assert.ok(stub.calledOnce);
  assert.ok(stub.calledWith('foo'));
  assert.equal(result, true);
});

test('it can stub prompt', function(assert) {
  let stub = this.stub(this.windowMock, 'prompt');
  stub.returns('bar');
  let result = this.windowMock.prompt('foo');
  assert.ok(stub.calledOnce);
  assert.ok(stub.calledWith('foo'));
  assert.equal(result, 'bar');
});
