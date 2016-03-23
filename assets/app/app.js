import 'jquery';
import moment from 'moment';
import './app.less';

import appTemplate from './app.html';

console.log('ng', ng);
var adapter = new ng.upgrade.UpgradeAdapter();

angular.module('App.components.ng2', [])


angular.module('Plan', [
  'ngRoute',
  'Plan.components.ng2'
]).config(function($locationProvider, $routeProvider) {
  // Use the HTML5 History API
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      template: appTemplate,
      controller: function () {}
    });

});

adapter.bootstrap(document.body, ['App']);