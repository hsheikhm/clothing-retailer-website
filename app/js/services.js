var clothingAppServices = angular.module('clothingAppServices', []);

clothingAppServices.factory('Products', ['$http',
  function($http){
    return {
      getList: function(category){
        return $http.get('products/' + category + '.json');
      }
    };
  }
]);
