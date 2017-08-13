application.controller('IndexController', ['$scope', function ($scope) {

    $scope.clickHistory = function () {      
        $('#video-history-section').show();
        $('#video-catalogue-section').hide();
        angular.element(('#video-history-section')).scope().$applyAsync();
    };

    $scope.clickHome = function () {
        $('#video-history-section').hide();
        $('#video-catalogue-section').show(); 
    };

    //Re-initialize page
    $scope.clickRefresh = function () {
        angular.element(('#video-history-section')).scope().init();
        angular.element(('#video-catalogue-section')).scope().init();
    };

}]);