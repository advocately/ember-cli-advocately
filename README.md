# Ember CLI advocately

Ember CLI addons that provides a clean and easy way to integrate your Ember application with [Advocate.ly](https://advocate.ly/).

## Installation

* `ember install ember-cli-advocately`

**v2.1+ is compatible with Ember v1.13+**

## Configuration/Logging

Add your advocately `WRITE_KEY` to the `advocately` config object for window.advocately to be loaded and configured automatically.

There is an option available to configure the events log tracking, the default value is `false`. This option is optional, but recommended.

In your `config/environment.js`

```js
ENV['advocately'] = {
  WRITE_KEY: 'your_advocately_write_key',
  LOG_EVENT_TRACKING: true
};

```

There is an option available to disable the default page tracking on the application.didTransition event. If you do not disable this option then tracking events will *by default* be sent to advocately.

```js
ENV['advocately'] = {
  defaultPageTrack: false
};
```

There is an option available to disable the default identify function on the application.didTransition event. If you do not disable this option then identify events will *by default* be sent to advocately.

```js
ENV['advocately'] = {
  defaultIdentifyUser: false
};
```

## Usage

The addon exposes a service that you can inject in routes, components and more.

```js
// app/components/some-awsome-component.js
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  advocately: Ember.inject.service()
});

```

### Tracking Page Views

Your router will automatically send a page view event to Advocately using the method `page` under `window.advocately` everytime the URL changes.

If you need to call it manually for some reason, you can do it using the following method in the service.

```js
this.get('advocately').trackPageView();
```

The method `trackPageView` can receive a parameter that's the page url, if not provided it will fetch from `window.location`.

### Tracking Other Events

You will probabily need to track other events manually as well. We got you covered! Since we have the service, it's really straightforward to do it.

Let's say that you need to track an event when the user submits an form in your router.


```js
// File: app/routes/posts/new.js
import Ember from 'ember'

const { inject: { service } } = Ember;

export default Ember.Route.extend({
	advocately: service(),

  actions: {
    submit: function() {
      this.get('advocately').trackEvent('Creates a new post');
    }
  }
});

```

`trackEvent` can receive additional properties as well:

```js
this.get('advocately').trackEvent('Creates a new post', { title: "Creating a Ember CLI application" });
```

All the parameters you can provide are: `event`, `properties`, `options`, `callback` in this order.

### Identifying the User

We will automatically call `identifyUserForAdvocately` method from your `application` route everytime the URL changes. Inside this method, you should call `this.get('advocately').identifyUser` passing the parameters that you want to send to advocately.

```js
// File: app/routes/application.js
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
	advocately: service(),

  identifyUserForAdvocately: function() {
    this.get('advocately').identifyUser(1, { name: 'Lachlan Priest' });
  }
});
```

You should have in mind that you should make a conditional validation to check if the user is currently logged in. For example:


```js
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
	advocately: service(),

  identifyUserForAdvocately: function() {
    if (this.get('currentUser')) {
      this.get('advocately').identifyUser(this.get('currentUser.id'), this.get('currentUser')));
    }
  }
});
```

All the parameters you can provide are: `userId`, `traits`, `options`, `callback` in this order.

### FastBoot

This addon will not break fastBoot, however, it will only execute in the browser. Since we use `window.advocately` to call advocately and we don't have it in fastboot land, the addon will not be executed in fastboot.

## Running Tests

* `ember test`
* `ember test --server`

## Contributing

1. [Fork it](https://github.com/advocately/ember-cli-advocately/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


# License

Copyright (c) 2015 Lachlan Priest

Licensed under the [MIT license](LICENSE.md).
