export function initialize(appInstance) {
  // Support Ember 1.13+
  const container = appInstance.lookup ? appInstance : appInstance.container;
  const router = container.lookup('router:main');
  const advocately = container.lookup('service:advocately');

  if (advocately && advocately.pageTrackEnabled()) {
    router.on('didTransition', function() {
      advocately.trackPageView();
    });
  }

  if (advocately && advocately.identifyUserEnabled()) {
    router.on('didTransition', function() {
      const applicationRoute = container.lookup('route:application');

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
