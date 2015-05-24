"use strict";

angular.module("RotationMgmtModule").directive("schedulerSide", [
    function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/Scripts/apps/rotation-management/directives/schedulerSide.html",
            scope: {
                rowHeaders: "="                
            }
        };
    }
]);