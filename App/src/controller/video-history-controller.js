application.controller('VideoHistoryController', ['$scope', 'StorageService', function ($scope, StorageService) {

    $scope.videoHistoryList = [];
    $scope.clickedHistEle = null;
    $scope.selectedVidHist = {};

    //Load existing video history during page initialization
    $scope.init = function () {

        $scope.videoHistoryList = [];
        $scope.clickedHistEle = null;
        $scope.selectedVidHist = {};

        $scope.videoHistoryList = $scope.loadVideoHistory("ACCEDO_LOCAL_VID_HIST_PRAVEEN");
        $scope.calcuateTimePeriod($scope.videoHistoryList);
        $scope.initializeData();
    };     

    //Method to save the updated video history back to the Local Storage
    $scope.saveViewedVideo = function (videoHistoryModel) {
        $scope.init();
        if (null == $scope.videoHistoryList || $scope.videoHistoryList.length == 0) {
            $scope.videoHistoryList = [];
        }
        $scope.videoHistoryAttr = {};
        $scope.videoHistoryAttr = videoHistoryModel;
        $scope.videoHistoryAttr.dateTime = $scope.getCurrentDatetime();
        $scope.videoHistoryList.splice(0, 0, $scope.videoHistoryAttr);

        //Refreshing & Calculating the Time Period of the activities
        $scope.calcuateTimePeriod($scope.videoHistoryList);

        //Parsing the data into a JSON String
        var videoHistoryStr = JSON.stringify($scope.videoHistoryList);
        StorageService.set("ACCEDO_LOCAL_VID_HIST_PRAVEEN", videoHistoryStr);
    };

    //A method to calculate the time period of the activities
    $scope.calcuateTimePeriod = function (vidHistoryList) {
        angular.forEach(vidHistoryList, function (videoHistory, key) {
            videoHistory.timePeriod = moment(new Date(videoHistory.dateTime)).fromNow();
        });
    };

    //Method to load the history from the Storage Service
    $scope.loadVideoHistory = function (key) {
        return JSON.parse(StorageService.get(key));
    };

    $scope.getCurrentDatetime = function () {
        return moment().format('llll');
    };

    $(document).on('keydown', function (event) {
        if ($('#myHistoryCarousel').is(':visible')) {
            if (event.keyCode == 13) {
                //ENTER Key
                $scope.playVideoHist($scope.selectedVidHist);
            }
            else if (event.keyCode == 38) {
                $('.owl-prev').click();
                console.log("up arrow");
            }
            else if (event.keyCode == 39) {
                // RIGHT Key
                var lastElement = $("#myHistoryCarousel").find('img:last').attr('id');

                if (lastElement != $scope.clickedHistEle.attr('id')) {
                    var newElement = $scope.clickedHistEle.parent().parent().next();
                    if (null != $scope.clickedHistEle) {
                        $scope.clickedHistEle.removeClass("selected-img-border");
                    }
                    newElement.find('img').addClass("selected-img-border");
                    $scope.clickedHistEle = newElement.find('img');
                    if (newElement.attr('class').indexOf('active') == -1) {
                        $('.owl-next').click();
                    }
                    $scope.selectedVidHist = $scope.videoHistoryList[$scope.clickedHistEle.attr('id') - 1];
                }
            }
            else if (event.keyCode == 40) {
                $('#myHistoryCarousel .owl-next').click();
                console.log("down arrow");
            }
            else if (event.keyCode == 37) {
                //LEFT Key
                var firstElement = $("#myHistoryCarousel").find('img:first').attr('id');

                if (firstElement != $scope.clickedHistEle.attr('id')) {
                    var newElement = $scope.clickedHistEle.parent().parent().prev();
                    if (null != $scope.clickedHistEle) {
                        $scope.clickedHistEle.removeClass("selected-img-border");
                    }
                    newElement.find('img').addClass("selected-img-border");
                    $scope.clickedHistEle = newElement.find('img');
                    if (newElement.attr('class').indexOf('active') == -1) {
                        $('#myHistoryCarousel .owl-prev').click();
                    }
                    $scope.selectedVidHist = $scope.videoHistoryList[$scope.clickedHistEle.attr('id') - 1];
                }
            }
        }
    });

    $scope.initializeData = function () {
        setTimeout(function () {
            if (null != $scope.videoHistoryList && $scope.videoHistoryList.length > 0) {
                //Set default selected value on page load            
                if (null != $scope.clickedHistEle) {   //Check if it already has any selected value and clear it. (Applies only for the initial load)
                    $scope.clickedHistEle.removeClass("selected-img-border");
                }
                $scope.clickedHistEle = $("#myHistoryCarousel").find('img:first');
                $scope.clickedHistEle.addClass("selected-img-border");
                $scope.selectedVidHist = $scope.videoHistoryList[$scope.clickedHistEle.attr('id') - 1];

                var $owl = $('.owl-carousel');
                $owl.trigger('destroy.owl.carousel');
                // After destory, the markup is still not the same with the initial.
                // The differences are:
                //   1. The initial content was wrapped by a 'div.owl-stage-outer';
                //   2. The '.owl-carousel' itself has an '.owl-loaded' class attached;
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

                $scope.removeExtraDivs();
            }
        }, 2000);        
    };
    

    $("#myHistoryCarousel").on("click", "img", function () {
        if (null != $scope.clickedHistEle) {
            $scope.clickedHistEle.removeClass("selected-img-border");

            //Function to play the video if the user clicks on the selected video which is already highlighted (double click)
            if ($scope.clickedHistEle.attr('id') == $(this).attr('id')) {
                $scope.playVideoHist($scope.selectedVidHist);
            }
        }
        $(this).addClass("selected-img-border");
        $scope.clickedHistEle = $(this);
        $scope.selectedVidHist = $scope.videoHistoryList[$scope.clickedHistEle.attr('id') - 1];

    });

    $scope.playVideoHist = function (videoModel) {
        angular.element('#fsModal').scope().startVideo(videoModel);
    }; 

    //Functionality to remove extra empty divs generated by owl carousel
    $scope.removeExtraDivs = function () {
        $('.owl-item').each(function () {
            if ($(this).html().length == 0) {
                $(this).parent().remove();
            }
        });
    };

}]);