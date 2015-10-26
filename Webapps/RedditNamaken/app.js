var app = angular.module('flapperNews', ['ui.router']);

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
	$scope.posts = posts.posts;

	$scope.addPost = function () {
		if(!$scope.title || $scope.title ===''){return;}
		$scope.posts.push({
			title: $scope.title,
			link: $scope.link, 
			upvotes:0
			comments: [
			{author: 'joeri', body: 'cool post', upvotes:0},
			{author: 'jens', body:'android sucks', upvotes:0}
			]
		});
		$scope.title ='';
		$scope.link ='';
	};

	$scope.incrementUpvotes = function(post){
		post.upvotes++;
	};

	$scope.downVote = function(post){
		post.upvotes--;
	}

}])

app.factory('posts', [function(){
	var postFactory = {
		posts:[]
	};

	return postFactory;
}])

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});
$urlRouterProvider.otherwise('home');

}]);

app.controller('PostCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, $posts){
	$scope.posts = posts.posts[$stateParams.id];

	$scope.addComment = function(){
		$scope.post.comments.push({
			author: 'user',
			body: $scope.body,
			upvotes: 0
		})
		$scope.body = '';
	}
}]);