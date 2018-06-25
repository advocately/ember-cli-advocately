import { initialize } from 'dummy/instance-initializers/advocately';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import { run } from '@ember/runloop';
import Application from '@ember/application';

module('Unit | Instance Initializer | advocately', {
  beforeEach: function() {
    run(() => {
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach: function() {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.appInstance);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
