import moment from 'moment';
import clockTemplate from './clock.html';

angular.module('App.components.clock', [])
.directive('clock', function () {
  return {
    template: clockTemplate,
    restrict: 'A',
    scope: {
    },
    link: function (scope, element) {


    }
  }
});

export default 'App.components.clock';
