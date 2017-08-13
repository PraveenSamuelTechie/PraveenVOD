application.controller('VideoPlayerController', ['$scope', 'APIService', function ($scope, APIService) {

    $scope.selectedVideo = {};

    $scope.init = function () {
        //Take the user to home page after the end of the video
        $('#fsModal video').bind('ended', function () {
            $('#fsModal').modal('toggle');
        });

        $(".close").on('click', function () {
            //Pause the video if the user closes it half way. HTML5 doesn't have a stop event yet.
            var videoPl = document.getElementById('videoPlayer');
            videoPl.pause();
        });
    };

    $scope.startVideo = function (videoModel) { 
        $scope.selectedVideo = videoModel;
        $('#fsModal video').attr('src', videoModel.url);
        $('#fsModal').modal('toggle');

        //Binding to reflect the updates to HTML
        $scope.$applyAsync();     
    };
}]);