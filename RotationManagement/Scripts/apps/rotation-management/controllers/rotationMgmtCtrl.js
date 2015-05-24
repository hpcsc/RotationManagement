"use strict";

angular.module("RotationMgmtModule").controller("RotationMgmtCtrl", [
    "$scope", function ($scope) {

        $scope.columnHeaders = [
            { text: "January" },
            { text: "February" },
            { text: "March" },
            { text: "April" },
            { text: "May" },
            { text: "June" },
            { text: "July" },
            { text: "August" },
            { text: "September" },
            { text: "October" },
            { text: "November" },
            { text: "December" }
        ];

        $scope.rowHeaders = [
            { text: "Resident A" },
            { text: "Resident B" },
            { text: "Resident C" },
            { text: "Resident D" }
        ];

        $scope.assignments = [
          { sizeX: 2, sizeY: 1, row: 0, col: 0, text: "Rotation 1", color: "blue" },          
          { sizeX: 1, sizeY: 1, row: 0, col: 4, text: "Rotation 2", color: "red" },
          { sizeX: 1, sizeY: 1, row: 0, col: 5, text: "Rotation 3", color: "green" },
          { sizeX: 2, sizeY: 1, row: 1, col: 0, text: "Rotation 4", color: "gray" },
          { sizeX: 1, sizeY: 1, row: 1, col: 4, text: "Rotation 5", color: "blue" },          
          { sizeX: 1, sizeY: 1, row: 2, col: 0, text: "Rotation 6", color: "red" },
          { sizeX: 2, sizeY: 1, row: 2, col: 1, text: "Rotation 7", color: "green" },
          { sizeX: 1, sizeY: 1, row: 2, col: 3, text: "Rotation 8", color: "blue" },
          { sizeX: 1, sizeY: 1, row: 2, col: 4, text: "Rotation 9", color: "gray" }
        ];
    }
]);