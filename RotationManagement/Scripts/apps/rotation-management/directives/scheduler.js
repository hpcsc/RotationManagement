"use strict";

angular.module("RotationMgmtModule").directive("scheduler", [
    function() {
        return {
            restrict: "E",            
            templateUrl: "/Scripts/apps/rotation-management/directives/scheduler.html",
            scope: {
                rowHeaders: "=",
                columnHeaders: "=",
                assignments: "="
            }
        };
    }
]);