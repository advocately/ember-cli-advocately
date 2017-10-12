import Ember from 'ember';
const { inject: { service } } = Ember;

function identifyUser() {
  this.get('advocately').identifyUser(1, { name: 'Lachlan Priest' });
}

export default Ember.Route.extend({
  advocately: service(),
  identifyUser: null,

  model(params, transition) {
    if (transition.queryParams.TEST_NO_IDENTIFY) {
      this.set('identifyUser', null);
    } else {
      this.set('identifyUser', identifyUser);
    }
  }
});
