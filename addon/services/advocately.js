/* globals FastBoot */
import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super();

    const isFastBoot = typeof FastBoot !== 'undefined';

    if (!this.hasAdvocately() && (this.config && this.config.environment !== 'test') && !isFastBoot) {
      window.console.warn('Advocate.ly is not loaded yet (window.advocately)');
    }
  },

  hasAdvocately() {
    return !!(window.advocately && typeof window.advocately === "object");
  },

  // Default true unless user explicitly sets defaultPageTrack to false
  pageTrackEnabled() {
    return !this.pageTrackDisabled();
  },

  pageTrackDisabled() {
    const hasAdvocatelyConfig = (this.config && this.config.advocately);
    return (hasAdvocatelyConfig && this.config.advocately.defaultPageTrack === false);
  },

  // Default true unless user explicitly sets defaultIdentifyUser to false
  identifyUserEnabled() {
    return !this.identifyUserDisabled();
  },

  identifyUserDisabled() {
    const hasAdvocatelyConfig = (this.config && this.config.advocately);
    return (hasAdvocatelyConfig && this.config.advocately.defaultIdentifyUser === false);
  },

  log() {
    if (this.config && this.config.advocately && this.config.advocately.LOG_EVENT_TRACKING) {
      window.console.info('[Advocate.ly] ', arguments);
    }
  },

  trackEvent(event, properties) {
    if (this.hasAdvocately()) {
      window.advocately.track(event, properties);
      this.log(event, properties);
    }
  },

  trackPageView() {
    if (this.hasAdvocately()) {
      window.advocately.page.apply(this, arguments);

      this.log('trackPageView', arguments);
    }
  },

  identifyUser(userId, traits) {
    if (this.hasAdvocately()) {
      window.advocately.identify(userId, traits);
      this.log('identifyUser', traits);
    }
  },

  surveyUser(userId, traits) {
    if (this.hasAdvocately()) {
      window.advocately.survey(userId, traits);
      this.log('surveyUser', traits);
    }
  }
});
