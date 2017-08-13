(function () {  
    "use strict"  
    var app = angular.module("myApp", ["ui.router"]);  
    //Router
    app.config(["$stateProvider", "$urlRouterProvider",  
      function ($stateProvider, $urlRouterProvider) {  
          $urlRouterProvider.otherwise("/");  
          $stateProvider  
            .state("home", {  
                url: "/",  
                templateUrl: "index.html",  
                controller: "VideoCatalogueController",  
                controllerAs: "VideoCatalogueController",  
                authenticationReqired: false  
            });  
      }  
    ]);  
}());  