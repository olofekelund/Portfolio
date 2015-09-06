'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:PhotoViewerCtrl
 * @description
 * # PhotoViewerCtrl
 * Controller of the Photoviewer. 
 */

/**
 * @ngdoc function
 * @name portfolioApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('PhotoViewerCtrl', ['$scope', '$resource', function ($scope, $resource) {
  	var PhotoView = $resource('/api/photoView');

	PhotoView.get(function(results) {
		$scope.thumbnails = results.files.map(function (file) {
			return '/img/thumbs/tn_' + file;
		});

		$scope.images = results.files.map(function (file) {
			return '/img/' + file;
		});
	});

	$scope.files = {'files': []};
	$scope.showImage = false;
	$scope.image = "";

	$scope.imageClick = function(file) {
		$scope.showImage = !$scope.showImage;
		if ($scope.showImage) {
			$scope.image = file;
		}
	};

	$scope.range = function(n) {
		return new Array(n);
	};
}]);