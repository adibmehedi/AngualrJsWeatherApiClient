(function () {
    "use strict";
    angular
        .module('WeatherApp', [])
        .controller('WeatherDisplayController', WeatherDisplayController)
        .controller('WeatherInputController', WeatherInputController)
        .service('WeatherInfoService', WeatherInfoService);

    /*
    * Weather Input controller
    */
    function WeatherInputController($scope, WeatherInfoService) {
        var inputController = this;
        
        inputController.setLocation = function () {
            debugger;
            WeatherInfoService.setLocation(inputController.locationInput);
            WeatherInfoService.invokeCallBack('displayName');
        }

    }


    /*
    * Weather Display controller
    */
    function WeatherDisplayController($scope, WeatherInfoService) {
        
        var displayController = this;
        displayController.showResult = true;
        
        var displayName=function(){
            debugger;
            displayController.locationName=WeatherInfoService.getLocation();
        }
        
        debugger;
        WeatherInfoService.setCallBack('displayName',displayName);
       
        // displayController.showWeatherInformation = function () {
        //     displayController.showResult = true;
        //     WeatherInfoService.fetchInfo().then(function successCallback(response) {
        //         console.log("Response From Service:", response);
        //         displayController.Weatherdata = response.data.main;
        //     }, function errorCallback(response) {
        //         console.log("Ajax req error");
        //         displayController.Weatherdata = {}
        //     });

        // }

    }


    /*
    * Weather info service
    */
    function WeatherInfoService($http) {
        var service = this;
        var locationName;
        var callBacks= {};

        service.setCallBack=function(callbackName, callbackFunction) {
            if (!callBacks[callbackName]) {
                debugger;
                callBacks[callbackName] = callbackFunction;
            }
        }

        service.invokeCallBack=function(callbackName) {
            debugger;
            callBacks[callbackName]();
        }

        service.setLocation = function (name) {
            debugger;
            locationName=name;
            //locationName=name;
        }

        service.getLocation=function(){
            debugger;
            console.log("Get location called:", locationName);
            return locationName;
        }

        // service.fetchInfo = function () {
        //     var APIkey = '11306b21803ed2e3a3006b36c271f5ec';
        //     var baseUrl = "http://api.openweathermap.org/data/2.5/weather"

        //     return $http({
        //         method: 'GET',
        //         url: (baseUrl),
        //         params: {
        //             "q": locationName,
        //             "appid": APIkey
        //         }
        //     },
        //     );
        // }
    }

    WeatherInputController.$inject = ['$scope','WeatherInfoService'];
    WeatherDisplayController.$inject = ['$scope','WeatherInfoService'];
    WeatherInfoService.$inject = ['$http'];

})();



