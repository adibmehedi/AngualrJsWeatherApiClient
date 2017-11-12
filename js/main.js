(function () {
    "use strict";
    angular
        .module('WeatherApp', [])
        .controller('WeatherDisplayController', WeatherDisplayController)
        .controller('WeatherInputController', WeatherInputController)
        .service('WeatherInfoService', WeatherInfoService);

    /*
    * Get input from User
    */
    function WeatherInputController($scope, WeatherInfoService) {
        var inputController = this;
        
        inputController.setLocation = function () {
            WeatherInfoService.setLocation(inputController.locationInput);
            WeatherInfoService.invokeCallBack('showWeatherInformation');
        }

    }


    /*
    * Display Fetched Data to UI
    */
    function WeatherDisplayController($scope, WeatherInfoService) {
        
        var displayController = this;
        displayController.showResult = false;
        
        displayController.showWeatherInformation = function () {
            displayController.showResult = true;
            displayController.locationName=WeatherInfoService.getLocation();
            WeatherInfoService.fetchInfo().then(function successCallback(response) {
                console.log("Response From Service:", response);
                displayController.Weatherdata = response.data;
                console.log("VM elements", displayController.Weatherdata);
            }, function errorCallback(response) {
                console.log("Ajax req error");
                displayController.Weatherdata = {}
            });

        }

        var registerToCallBack=function(name,functioDef){
            WeatherInfoService.setCallBack(name,functioDef);
        }
        registerToCallBack('showWeatherInformation',displayController.showWeatherInformation);

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
                callBacks[callbackName] = callbackFunction;
            }
        }

        service.invokeCallBack=function(callbackName) {
            callBacks[callbackName]();
        }

        service.setLocation = function (name) {
            locationName=name;
        }

        service.getLocation=function(){
            console.log("Get location called:", locationName);
            return locationName;
        }

        service.fetchInfo = function () {
            var APIkey = '11306b21803ed2e3a3006b36c271f5ec';
            var baseUrl = "http://api.openweathermap.org/data/2.5/weather"

            return $http({
                method: 'GET',
                url: (baseUrl),
                params: {
                    "q": locationName,
                    "appid": APIkey
                }
            },
            );
        }
    }

    WeatherInputController.$inject = ['$scope','WeatherInfoService'];
    WeatherDisplayController.$inject = ['$scope','WeatherInfoService'];
    WeatherInfoService.$inject = ['$http'];

})();



