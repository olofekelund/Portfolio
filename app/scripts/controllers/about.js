'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('AboutCtrl', ['$scope', function ($scope) {
  	$scope.stuff = 'abelton är en hjälte';

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
