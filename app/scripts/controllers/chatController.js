'use strict';

angular.module('portfolioApp')
  .controller('ChatCtrl', ['$scope', '$resource', function ($scope, $resource) {
  	var Chat = $resource('/chat');
  	var username = "";

	Chat.query(function(results) {

		$scope.messages = results;
	});

	$scope.messages = ['bajs', 'inte mer bajs'];

	$scope.setUsername = function(u) {
		username = u;
	};

	$scope.sendMessage = function(message) {
		var chatMessage = new Chat();
		chatMessage.username = username;
		chatMessage.message = message;
		chatMessage.$save();
	};
}]);