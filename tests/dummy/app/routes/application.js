import Ember from 'ember';
const { inject: { service } } = Ember;

function identifyUserForAdvocately() {
  this.get('advocately').identifyUser(1, { name: 'Lachlan Priest' });
}

export default Ember.Route.extend({
  advocately: service(),
  identifyUserForAdvocately: null,

  model(params, transition) {
    if (transition.queryParams.TEST_NO_IDENTIFY) {
      this.set('identifyUserForAdvocately', null);
    } else {
      this.set('identifyUserForAdvocately', identifyUserForAdvocately);
    }
  }
});
