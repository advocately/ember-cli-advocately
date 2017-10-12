import config from '../config/environment';

export function initialize() {
  const application = arguments[1] || arguments[0];

  const { advocately = {} } = config;
  const { environment = 'development' } = config;
  const advocatelyConfig = { advocately, environment };

  application.register('config:advocately', advocatelyConfig, { instantiate: false });
  application.inject('service:advocately', 'config', 'config:advocately')
}

export default {
  name: 'advocately',
  initialize: initialize
};
