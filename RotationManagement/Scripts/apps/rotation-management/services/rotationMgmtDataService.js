"use strict";

angular.module("RotationMgmtModule").factory("rotationMgmtDataService", ["$http", "$q", function ($http, $q) {

    var getScheduleData = function () {
        return get("/Home/GetScheduleData");
    },
        
    getAvailableRotations = function () {
        return get("/Home/GetAvailableRotations");
    },
        
    updateSchedule = function (data) {
        return post("/Home/UpdateSchedule", data);
    };

    function get(url) {
        var deferred = $q.defer();

        $http.get(url)
           .success(function (data) {
               deferred.resolve(data);
           }).error(function (msg, code) {
               deferred.reject(msg);
           });

        return deferred.promise;
    }

    function post(url, data) {
        var deferred = $q.defer();

        $http.post(url, data)
           .success(function (response) {
               if (response.success) {
                   deferred.resolve(response);
               } else {
                   deferred.reject(response.errors.join("<br/>"));
               }
           }).error(function (msg, code) {
               deferred.reject(msg);
           });

        return deferred.promise;
    }

    return {
        getScheduleData: getScheduleData,
        getAvailableRotations: getAvailableRotations,
        updateSchedule: updateSchedule
    };
}]);