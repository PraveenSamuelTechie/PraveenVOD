application.controller('VideoCatalogueController', ['$scope', 'APIService', 'StorageService', function ($scope, APIService, StorageService) {

    $scope.videoList = [];
    $scope.clickedVideoEle = null;
    $scope.selectedVid = {};

    $scope.init = function () {

        $scope.videoList = [];
        $scope.clickedVideoEle = null;
        $scope.selectedVid = {};

        $scope.loadCatalogueVideos();
        $scope.initializeData();
    };

    $(document).on('keydown', function (event) {
        if ($('#myCarousel').is(':visible')) {
            if (event.keyCode == 13) {
                $scope.playCatalogueVideo($scope.selectedVid);
                $scope.saveVideoHistory($scope.selectedVid);
            }
            else if (event.keyCode == 38) {
                $('#myCarousel .owl-prev').click();
                console.log("up arrow");
            }
            else if (event.keyCode == 39) {
                var lastElement = $("#myCarousel").find('img:last').attr('id');

                if (lastElement != $scope.clickedVideoEle.attr('id')) {
                    var newElement = $scope.clickedVideoEle.parent().parent().next();
                    if (null != $scope.clickedVideoEle) {
                        $scope.clickedVideoEle.removeClass("selected-img-border");
                    }
                    newElement.find('img').addClass("selected-img-border");
                    $scope.clickedVideoEle = newElement.find('img');
                    if (newElement.attr('class').indexOf('active') == -1) {
                        $('#myCarousel .owl-next').click();
                    }
                    $scope.selectedVid = $scope.videoList[$scope.clickedVideoEle.attr('id') - 1];
                }
            }
            else if (event.keyCode == 40) {
                $('#myCarousel .owl-next').click();
                console.log("down arrow");
            }
            else if (event.keyCode == 37) {
                var firstElement = $("#myCarousel").find('img:first').attr('id');

                if (firstElement != $scope.clickedVideoEle.attr('id')) {
                    var newElement = $scope.clickedVideoEle.parent().parent().prev();
                    if (null != $scope.clickedVideoEle) {
                        $scope.clickedVideoEle.removeClass("selected-img-border");
                    }
                    newElement.find('img').addClass("selected-img-border");
                    $scope.clickedVideoEle = newElement.find('img');
                    if (newElement.attr('class').indexOf('active') == -1) {
                        $('#myCarousel .owl-prev').click();
                    }
                    $scope.selectedVid = $scope.videoList[$scope.clickedVideoEle.attr('id') - 1];
                }
            }
        }
    });

    $scope.initializeData = function () {   
        setTimeout(function () {            
        var $owl = $('.owl-carousel');
        $owl.trigger('destroy.owl.carousel');
        // After destory, the markup is still not the same with the initial.
        // The differences are:
        //   1. The initial content was wrapped by a 'div.owl-stage-outer';
        //   2. The '.owl-carousel' itself has an .'.owl-loaded' class attached;
        //   We have to remove that before the new initialization.
        $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
        $owl.owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 3,
                    nav: true,
                    loop: false
                },
                600: {
                    items: 5,
                    nav: true,
                    loop: false
                },
                1000: {
                    items: 8,
                    nav: true,
                    loop: false
                }
            }
        });

        //Set default selected value on page load
        if (null != $scope.clickedVideoEle) {
            //Check if it already has any selected value and clear it. (Applies only for the initial load)
            $scope.clickedVideoEle.removeClass("selected-img-border");
        }
        $scope.clickedVideoEle = $("#myCarousel").find('img:first');
        $scope.clickedVideoEle.addClass("selected-img-border");
        $scope.selectedVid = $scope.videoList[$scope.clickedVideoEle.attr('id') - 1];
        $scope.removeExtraDivs();
    }, 2000);
    };

    $("#myCarousel").on("click", "img", function () {
        if (null != $scope.clickedVideoEle) {

            //Function to play the video if the user clicks on the selected video which is already highlighted (double click)
            if ($scope.clickedVideoEle.attr('id') == $(this).attr('id'))
            {
                $scope.playCatalogueVideo($scope.selectedVid);
                $scope.saveVideoHistory($scope.selectedVid);
            }
            $scope.clickedVideoEle.removeClass("selected-img-border");
        }
        $scope.clickedVideoEle = null;
        $(this).addClass("selected-img-border");
        $scope.clickedVideoEle = $(this);
        $scope.selectedVid = $scope.videoList[$scope.clickedVideoEle.attr('id') - 1];

    });    

    $scope.playCatalogueVideo = function (videoModel) {
        angular.element('#fsModal').scope().startVideo(videoModel);
    };

    $scope.saveVideoHistory = function (videoModel) {
        angular.element('#video-history-section').scope().saveViewedVideo(videoModel);
    };

    $scope.loadCatalogueVideos = function () {
        APIService.videoList().then(function (response) {
            angular.forEach(response.data.entries, function (videoAttr, key) {
                $scope.videoMetaData = {};
                $scope.videoMetaData.url = videoAttr.contents[0].url;
                $scope.videoMetaData.title = videoAttr.title.trim();
                $scope.videoMetaData.shortTitle = videoAttr.title.length > 15 ? videoAttr.title.substr(0, 15) + '...' : videoAttr.title;
                $scope.videoMetaData.videoIndex = key + 1;
                if (videoAttr.images && videoAttr.images.length > 0) {
                    $scope.videoMetaData.imgUrl = videoAttr.images[0].url;
                }
                $scope.videoMetaData.imgUrl = $scope.videoMetaData.imgUrl != "" ? $scope.videoMetaData.imgUrl : CONSTANTS.DEFAULT_THUMBNAIL;
                $scope.videoList.push($scope.videoMetaData);
            });
        }).catch(function (data) {
            console.log('Failed to load the url :' + data.error());
        });        
    };

    $scope.removeExtraDivs = function () {
        $('.owl-item').each(function () {
            if ($(this).html().length == 0) {
                $(this).parent().remove();
            }
        });
    };

}]);