/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-advocately',

  contentFor: function (type, config) {
    if (type === 'body-footer') {

      if (!config.advocately || !config.advocately.WRITE_KEY) {
        return '';
      }

      return `<script type='text/javascript'>` +
      `!function() {
        var advocately=window.advocately=window.advocately||[];if(!advocately.initialize)if(advocately.invoked)window.console&&window.console.error&&window.console.error("Advocately snippet included twice.");else{advocately.invoked=!0,advocately.methods=["identify","track","page","debug","survey"],advocately.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);return t.unshift(e),advocately.push(t),advocately}};for(var t=0;t<advocately.methods.length;t++){var e=advocately.methods[t];advocately[e]=advocately.factory(e)}advocately.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=e;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(t,a)},advocately.load("https://d1m5z9tultw2jo.cloudfront.net/advocately.min.js")};
        advocately.apiToken = "${config.advocately.WRITE_KEY}";
      }();
      </script>`;
    }
  }
};
