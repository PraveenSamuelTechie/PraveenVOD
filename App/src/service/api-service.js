application.factory('APIService', [ '$http', function( $http ) {
	return {
		videoList: function(){
			return $http.get(CONSTANTS.MOVIES_API_URL);
		},	
	}
}]);