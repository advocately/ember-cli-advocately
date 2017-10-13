export function initialize(appInstance) {
  // Support Ember 1.13+
  const owner = appInstance.lookup ? appInstance : appInstance.container;

  const router = owner.lookup('router:main');
  const advocately = owner.lookup('service:advocately');

  if (advocately && advocately.pageTrackEnabled()) {
    router.on('didTransition', function() {
      advocately.trackPageView();
    });
  }

  if (advocately && advocately.identifyUserEnabled()) {
    router.on('didTransition', function() {
      const applicationRoute = owner.lookup('route:application');

      if (applicationRoute && typeof applicationRoute.identifyUserForAdvocately === 'function') {
        applicationRoute.identifyUserForAdvocately();
      }
    });
  }
}

export default {
  name: 'advocately',
  initialize
};
