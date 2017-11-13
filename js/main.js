(function () {
    "use strict";
    angular
        .module('WeatherApp', [])
        .controller('WeatherDisplayController', WeatherDisplayController)
        .controller('WeatherInputController', WeatherInputController)
        .controller('MapDisplayController', MapDisplayController)
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
            displayController.locationName = WeatherInfoService.getLocation();

            WeatherInfoService.fetchInfo().then(function successCallback(response) {
                displayController.Weatherdata = response.data;
                var lat = response.data.coord.lat;
                var lon = response.data.coord.lon;
                console.log("VM elements", displayController.Weatherdata);
                WeatherInfoService.invokeCallBack('renderMap', [lat, lon])
            }, function errorCallback(response) {
                console.log("Ajax req error");
                alert("Location not found");
            });

        }

        var registerToCallBack = function (name, functionDef) {
            WeatherInfoService.setCallBack(name, functionDef);
        }
        registerToCallBack('showWeatherInformation', displayController.showWeatherInformation);

    }

    /*
    * Display Map 
    */
    function MapDisplayController($scope, WeatherInfoService) {
        var mapController = this;

        mapController.renderMap = function (coord) {
            debugger;
            var coord = { lat: coord[0], lng: coord[1] };
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: coord
            });

            var marker = new google.maps.Marker({
                position: coord,
                map: map
            });
            debugger;
        }

        var registerToCallBack = function (name, functionDef) {
            WeatherInfoService.setCallBack(name, functionDef);
        }
        registerToCallBack('renderMap', mapController.renderMap);

    }


    /*
    * Weather info service
    */
    function WeatherInfoService($http) {
        var service = this;
        var locationName;
        var callBacks = {};

        service.setCallBack = function (callbackName, callbackFunction) {
            if (!callBacks[callbackName]) {
                callBacks[callbackName] = callbackFunction;
            }
        }

        service.invokeCallBack = function (callbackName, args = []) {
            callBacks[callbackName](args);
        }

        service.setLocation = function (name) {
            locationName = name;
        }

        service.getLocation = function () {
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

    WeatherInputController.$inject = ['$scope', 'WeatherInfoService'];
    WeatherDisplayController.$inject = ['$scope', 'WeatherInfoService'];
    MapDisplayController.$inject = ['$scope', 'WeatherInfoService'];
    WeatherInfoService.$inject = ['$http'];

})();



