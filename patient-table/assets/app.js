'use strict';


// Declare app level module which depends on filters, and services
angular.module('patient-table', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'angularMoment',
  'angularUtils.directives.dirPagination',
  'ngAnimate',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/users/:email/subscriptions/:subscription', {templateUrl: '/templates/index.html', controller: 'SubscriptionController'})
    .otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    });
}]);
