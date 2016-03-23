import moment from 'moment';
import clockTemplate from './clock.html';

angular.module('App.components.clock', [])
.directive('clock', function ($interval) {
  return {
    template: clockTemplate,
    restrict: 'A',
    scope: {
    },
    link: function (scope, element) {
      scope.now = {
        date: moment(),
        textEu: 'Europe Format',
        textUs: 'USA Format'
      };

      $interval(() => {
        scope.now.date = moment();
      }, 1000);
    }
  }
});

export default 'App.components.clock';
