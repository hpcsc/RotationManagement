"use strict";

angular.module("RotationMgmtModule").controller("RotationMgmtCtrl", [
    "$scope", "rotationMgmtDataService", "toaster", function ($scope, rotationMgmtDataService, toaster) {

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

        $scope.rowHeaders = [];
        $scope.assignments = [];
        var initialAssignmentIds = [];

        $scope.init = function () {
            rotationMgmtDataService.getScheduleData()
                                   .then(function (data) {
                                       for (var i = 0; i < data.residents.length; i++) {
                                           var resident = data.residents[i];
                                           $scope.rowHeaders.push({
                                               id: resident.id,
                                               text: resident.name
                                           });

                                           for (var j = 0; j < resident.assignments.length; j++) {
                                               var assignment = resident.assignments[j];

                                               $scope.assignments.push({
                                                   assignmentId: assignment.assignmentId,
                                                   residentId: assignment.residentId,
                                                   rotationId: assignment.rotationId,
                                                   sizeX: assignment.toMonth - assignment.fromMonth + 1,
                                                   sizeY: 1,
                                                   row: i,
                                                   col: assignment.fromMonth - 1,
                                                   text: assignment.name,
                                                   color: assignment.color
                                               });

                                               initialAssignmentIds.push(assignment.assignmentId);
                                           }
                                       }
                                   }, function (error) {
                                       toaster.pop('error', 'Error', error);
                                   });
        };

        $scope.update = function () {
            var data = [];
            for (var i = 0; i < $scope.assignments.length; i++) {
                var assignment = $scope.assignments[i];

                //Don't use assignment.residentId since it might be out of date due to dragging from one to another
                data.push({
                    assignmentId: assignment.assignmentId,
                    residentId: $scope.rowHeaders[assignment.row].id,
                    fromMonth: assignment.col + 1,
                    toMonth: assignment.col + assignment.sizeX,
                    rotationId: assignment.rotationId
                });
            }

            var deletedIds = findDeletedIds(initialAssignmentIds, $scope.assignments);

            rotationMgmtDataService.updateSchedule({
                assignments: data,
                deletedIds: deletedIds
            }).then(function (data) {
                toaster.pop('success', 'Success', "Schedule updated");
            }, function (error) {
                toaster.pop('error', 'Error', "Failed to update schedule: " + error);
            })
        };

        function findDeletedIds(initialAssignmentIds, assignments) {
            var map = {}, result = [];

            for (var i = 0; i < assignments.length; i++) {
                map[assignments[i].assignmentId] = true;
            }

            for (var j = 0; j < initialAssignmentIds.length; j++) {
                if (!map[initialAssignmentIds[j]]) {
                    result.push(initialAssignmentIds[j]);
                }
            }

            return result;
        }
    }
]);