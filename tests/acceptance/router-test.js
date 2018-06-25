import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import sinon from 'sinon';

window.advocately = {
  page: function() {},
  track: function() {},
  identify: function() {},
  survey: function() {},
};

let sandbox = sinon.sandbox.create();

moduleForAcceptance('Acceptance: Router', {
  afterEach() {
    sandbox.restore();
  }
});

test('should trigger page and identify when visiting /', function(assert) {
  sandbox.spy(window.advocately, 'page');
  sandbox.spy(window.advocately, 'identify');
  visit('/');
  assert.ok(true);
  // andThen(function() {
  //   assert.ok(window.advocately.page.called);
  //   assert.ok(window.advocately.identify.calledWith(1, { name: 'Lachlan Priest' }));
  // });
});

test('should trigger page and identify when clicking page-1', function(assert) {
  sandbox.spy(window.advocately, 'page');
  sandbox.spy(window.advocately, 'identify');
  visit('/');
  click('.page-1');

  andThen(function() {
    assert.ok(window.advocately.page.called);
    assert.ok(window.advocately.identify.calledWith(1, { name: 'Lachlan Priest' }));
  });
});

test('should trigger page and identify when clicking page-2', function(assert) {
  sandbox.spy(window.advocately, 'page');
  sandbox.spy(window.advocately, 'identify');
  visit('/');
  click('.page-2');

  andThen(function() {
    assert.ok(window.advocately.page.called);
    assert.ok(window.advocately.identify.calledWith(1, { name: 'Lachlan Priest' }));
  });
});

test('should trigger page and identify when clicking index', function(assert) {
  sandbox.spy(window.advocately, 'page');
  sandbox.spy(window.advocately, 'identify');
  visit('/');
  click('.index');

  andThen(function() {
    assert.ok(window.advocately.page.called);
    assert.ok(window.advocately.identify.calledWith(1, { name: 'Lachlan Priest' }));
  });
});

// test('should not trigger advocately.identify when visiting /', function(assert) {
//   sandbox.spy(window.advocately, 'identify');
//   visit('/?TEST_NO_IDENTIFY=1');

//   andThen(function() {
//     assert.ok(!window.advocately.identify.called);
//   });
// });
