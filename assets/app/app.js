import 'jquery';
import moment from 'moment';

import './app.less';
import appTemplate from './app.html';
import clockCmp from './components/clock/clock';

console.log('ng', ng);
var adapter = new ng.upgrade.UpgradeAdapter();
angular.module('App.components.ng2', [])

angular.module('App', [
  'ngRoute',
  clockCmp,
  'App.components.ng2'
]).config(function($locationProvider, $routeProvider) {

  $routeProvider
    .when('/', {
      template: appTemplate,
      controller: function () {}
    });

});

adapter.bootstrap(document.body, ['App']);
