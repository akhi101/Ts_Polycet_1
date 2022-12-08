define(['app'], function (app) {
    app.controller("DefaultController", function ($scope, $state) {

        $scope.OpenModule = function (page) {
            $state.go(page);
        }


    });
});


