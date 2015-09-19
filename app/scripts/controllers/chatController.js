'use strict';

angular.module('portfolioApp').controller('ChatCtrl', ['$scope', '$resource', function ($scope, $resource) {

	var Chat = $resource('/chat');
	
  var socket = io.connect('http://localhost:3000');

  $scope.usernameSet = false;
  $scope.showMessagebox = false;
  $scope.userlist = null;
	$scope.messages = null;

	var scrollToBottom = function() {
		var myDiv = document.getElementById("chatWindow");
		myDiv.scrollTop = myDiv.scrollHeight;
	};

  socket.on('connected', function(users) {
  	setTimeout(function () {
  		$scope.userlist = users;
  	},1000);
  });

  socket.on('newMessage', function(data) {
  	$scope.messages.push(data);
  	setTimeout(scrollToBottom, 100);
  });

  socket.on('userlistUpdate', function(users) {
  	$scope.userlist = users;
  });

	Chat.query(function(results) {
		$scope.messages = results;
		setTimeout(scrollToBottom, 100);
	});

	$scope.setUsername = function(username){
		$scope.username = username;

		$scope.usernameSet = true;
		$scope.showMessagebox = true;

		socket.emit('userEntered', username);
	};

	$scope.sendMessage = function(message) {
		var chatMessage = new Chat();
		chatMessage.username = $scope.username;
		chatMessage.message = message;
		chatMessage.$save();

		socket.emit('message', chatMessage);

		$scope.message = '';
	};
}]);