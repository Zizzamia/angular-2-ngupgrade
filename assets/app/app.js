import 'jquery';
import moment from 'moment';
import './app.less';

import appTemplate from './app.html';

console.log('ng', ng);
var adapter = new ng.upgrade.UpgradeAdapter();

angular.module('App.components.ng2', [])


angular.module('App', [
  'ngRoute',
  'App.components.ng2'
]).config(function($locationProvider, $routeProvider) {

  $routeProvider
    .when('/', {
      template: appTemplate,
      controller: function () {}
    });

});

adapter.bootstrap(document.body, ['App']);
