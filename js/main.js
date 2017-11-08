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
    WeatherInputController.$inject = ['$scope','WeatherInfoService', '$rootScope'];
    function WeatherInputController($scope, WeatherInfoService, $rootScope) {
        var inputController = this;

        inputController.setLocation = function () {
            WeatherInfoService.setLocation(inputController.locationInput);
            //debugger;
            $rootScope.$broadcast('location-set');
        }
    }

    /*
    * Weather Display controller
    */
    WeatherDisplayController.$inject = ['$scope','WeatherInfoService', '$rootScope'];
    function WeatherDisplayController($scope, WeatherInfoService, $rootScope) {

        $rootScope.$on('location-set', function () {
            //debugger;
            displayController.locationName=WeatherInfoService.getLocation();
            displayController.showWeatherInformation();
        })

        var displayController = this;
        displayController.showResult = false;
        
        displayController.locationName=WeatherInfoService.getLocation();
       
        displayController.showWeatherInformation = function () {
            displayController.showResult = true;
            
            WeatherInfoService.fetchInfo().then(function successCallback(response) {
                console.log("Response From Service:", response);
                displayController.Weatherdata = response.data.main;
            }, function errorCallback(response) {
                console.log("Ajax req error");
                displayController.Weatherdata = {}
            });

        }

    }

    /*
    * Weather info service
    */
    WeatherInfoService.$inject = ['$http'];
    function WeatherInfoService($http) {
        var service = this;
        var locationName;
        var callBacks= {};

        // service.setCallBack(callbackName, callbackFunction) {
        //     if (!callBacks[callbackName]) {
        //         callBacks[callbackName] = callbackFunction;
        //     }
        // }

        // service.invokeCallBack(callbackName) {
        //     callBacks[callBacks]();
        // }

        service.setLocation = function (name) {
            //debugger;
            locationName = name;
            console.log("Location Set: ", locationName);
        }

        service.getLocation=function(){
            //debugger;
            console.log("Get locatio called:", locationName);
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

})();



