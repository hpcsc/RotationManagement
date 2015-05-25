"use strict";

angular.module("RotationMgmtModule").directive("schedulerMain", ["$modal",
    function ($modal) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/Scripts/apps/rotation-management/directives/schedulerMain.html",
            scope: {
                rowHeaders: "=",
                columnHeaders: "=",
                assignments: "="
            },
            controller: function ($scope, $element) {
                $scope.schedulerMainInnerWidth = $scope.columnHeaders.length * 160;

                $scope.gridsterOpts = {
                    columns: $scope.columnHeaders.length,
                    pushing: false,
                    floating: false,
                    swapping: true,
                    colWidth: 150,
                    rowHeight: 50,
                    margins: [12, 20],
                    resizable: {
                        handles: ['e', 'w']
                    }
                };

                $scope.openCreateNewAssignment = function(rowIndex, columnIndex) {                    
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'createAssignmentTmpl.html',
                        controller: 'CreateModalInstanceCtrl'
                    });

                    modalInstance.result.then(function(selectedTask) {
                        $scope.assignments.push({
                            residentId: $scope.rowHeaders[rowIndex].id,
                            rotationId: selectedTask.id,
                            sizeX: 1,
                            sizeY: 1,
                            row: rowIndex,
                            col: columnIndex,
                            text: selectedTask.text,
                            color: selectedTask.color
                        });
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };

                $scope.openUpdateAssignment = function (assignment) {
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'updateAssignmentTmpl.html',
                        controller: 'UpdateModalInstanceCtrl',
                        resolve: {
                            current: function () {
                                return assignment;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedTask) {
                        assignment.rotationId = selectedTask.id;
                        assignment.text = selectedTask.text;
                        assignment.color = selectedTask.color;
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };

                $scope.remove = function (assignment) {
                    var index = $scope.assignments.indexOf(assignment);
                    if (index > -1) {
                        $scope.assignments.splice(index, 1);
                    }
                };
            }
        };
    }
]);

angular.module('RotationMgmtModule').controller('CreateModalInstanceCtrl', ["$scope", "$modalInstance", "rotationMgmtDataService",
    function ($scope, $modalInstance, rotationMgmtDataService) {

        $scope.availableTasks = [];

        rotationMgmtDataService.getAvailableRotations()
        .then(function (data) {
            $scope.availableTasks = data;
        }, function (err) {
            alert(err);
        });

    $scope.selectedTask = null;

    $scope.create = function () {        
        $modalInstance.close($scope.selectedTask);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

angular.module('RotationMgmtModule').controller('UpdateModalInstanceCtrl', ["$scope", "$modalInstance", "current", "rotationMgmtDataService",
    function ($scope, $modalInstance, current, rotationMgmtDataService) {
        $scope.availableTasks = [];

        rotationMgmtDataService.getAvailableRotations()
        .then(function (data) {
            $scope.availableTasks = data;
            for (var i = 0; i < $scope.availableTasks.length; i++) {
                if ($scope.availableTasks[i].id == current.rotationId) {
                    $scope.selectedTask = $scope.availableTasks[i];
                    break;
                }
            }
        }, function (err) {
            alert(err);
        });

        $scope.selectedTask = null;

        $scope.update = function () {
            $modalInstance.close($scope.selectedTask);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);