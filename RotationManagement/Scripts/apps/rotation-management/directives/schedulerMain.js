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
                    resizable: {
                        handles: ['e', 'w']
                    },
                    swapping: true,
                    colWidth: 150,
                    rowHeight: 50,
                    margins: [12, 20]
                };

                $scope.openCreateNewAssignment = function(rowIndex, columnIndex) {                    
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'createAssignmentTmpl.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });

                    modalInstance.result.then(function(selectedTask) {
                        console.log("select", selectedTask);
                        $scope.assignments.push({
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

                $scope.cancel = function() {
                    alert("cancel2");
                };
            }
        };
    }
]);

angular.module('RotationMgmtModule').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.availableTasks = [
        { text: "Task 1", color: "purple" },
        { text: "Task 2", color: "pink" }
    ];

    $scope.selectedTask = null;

    $scope.create = function () {        
        $modalInstance.close($scope.selectedTask);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});