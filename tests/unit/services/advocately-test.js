import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

window.advocately = {
  page: function() {},
  track: function() {},
  identify: function() {},
  survey: function() {}
};

let sandbox = sinon.sandbox.create();

moduleFor('service:advocately', 'Unit | Service | advocately', {
  afterEach: function() {
    sandbox.restore();
  }
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('calls advocately.page on trackPageView', function(assert) {
  let service = this.subject();

  sandbox.spy(window.advocately, 'page');
  service.trackPageView('/neighborly');
  assert.ok(window.advocately.page.calledWith('/neighborly'));
});

test('calls advocately.track on trackEvent', function(assert) {
  let service = this.subject();

  sandbox.spy(window.advocately, 'track');
  service.trackEvent('click', 'properties');
  assert.ok(window.advocately.track.calledWith('click', 'properties'));
});

test('calls advocately.identify on identifyUser', function(assert) {
  let service = this.subject();

  sandbox.spy(window.advocately, 'identify');
  service.identifyUser('userId', 'traits');
  assert.ok(window.advocately.identify.calledWith('userId', 'traits'));
});

test('calls advocately.survey on surveyUser', function(assert) {
  let service = this.subject();

  sandbox.spy(window.advocately, 'survey');
  service.surveyUser('userId', 'traits');
  assert.ok(window.advocately.survey.calledWith('userId', 'traits'));
});
