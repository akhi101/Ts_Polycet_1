define(['app'], function (app) {
    app.controller("DashboardController", function ($scope, $localStorage, SystemUserService, $state) {
        var authData = $localStorage.authorizationData;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;



        $scope.Logout = function () {
            alert()

            sessionStorage.loggedIn = "no";
            var GetUserLogout = SystemUserService.PostUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""

            };
            $state.go('index.OfficialsLogin')
        }
    })
})