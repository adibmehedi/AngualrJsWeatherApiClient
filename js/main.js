(function(){
    "use strict";
    angular
        .module('WeatherApp',[])
        .controller('WeatherController',WeatherController);

    WeatherController.$inject=['$scope','$http'];

    function WeatherController($scope,$http){
        var vm=this;
        $scope.showResult=false;
        $scope.locationInput;

        $scope.getWeatherInformation=function(){
            $scope.showResult=true;
            $APIkey='';
            $baseUrl='http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1'

            $http({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/typicode/json-server/master/package-lock.json'
              }).then(function successCallback(response) {
                  console.log(response.data);
                }, function errorCallback(response) {
                  console.log("Ajax req error");
                });
             
                //console.log("User Input: ",$scope.locationInput);
        }

        //console.log("App Context: ",$scope);
    }
})();



