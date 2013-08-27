var auth = {
	var password = 'i like dodo';

  function signin() {
  	var session = $.jStorage.get('session');

    if (!session) {
      
    }
  }

  return {
    signin: signin
  }
};

var dodo = angular.module('dodo', []);

dodo.factory('postsService', ['$http', function($http) {
	return {
		getPosts: function() {
      return $http.get('/posts/list').then(function(result) {
		    return result;
		  });
		}
	}
}]);

dodo.controller('postsCtrl', ['$scope', 'posts', function($scope, postsService) {
  postsService.getPosts().then(function(data) {
    $scope.posts = data;

    drawDivider();

    function drawDivider() {
			$('.post-container').each(function() {
		    var $container = $(this);
		    var divider = $(this).find('.divider');
		    var h = $container.innerHeight();
		    
		    divider.height(h);
			});
		}
  })
}]);