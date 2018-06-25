'use strict';

import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

function identifyUserForAdvocately() {
  this.get('advocately').identifyUser(1, { name: 'Lachlan Priest' });
}

export default Route.extend({
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
