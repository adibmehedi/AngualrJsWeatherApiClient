(function () {
    "use strict";
    angular
        .module('WeatherApp', [])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$scope', '$http'];

    function WeatherController($scope, $http) {
        var vm = this;
        $scope.showResult = false;
        $scope.locationInput;
        $scope.Weatherdata;

        $scope.getWeatherInformation = function () {
            $scope.showResult = true;
            var APIkey = '11306b21803ed2e3a3006b36c271f5ec';
            var baseUrl = "http://api.openweathermap.org/data/2.5/weather"

            $http({
                method: 'GET',
                url: (baseUrl),
                params: {
                    "q": $scope.locationInput,
                    "appid": APIkey
                }
            },
            ).then(function successCallback(response) {
                console.log("Response:",response);
                $scope.Weatherdata=response.data.main;
                console.log($scope.Weatherdata);

            }, function errorCallback(response) {
                console.log("Ajax req error");
            });
        }

    }
})();



