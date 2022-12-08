define(['app'], function (app) {
    app.controller("MasterSettingsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {
        var authData = $localStorage.authorizationData;
        $scope.authToken = $localStorage.authToken;
        $scope.AssessmentModules = [];
        var UserTypeID = parseInt(authData.UserTypeID);
        var ModuleID = parseInt($localStorage.selectedModule.ModuleID);

        var getAdmissionsubmod = SystemUserService.GetUserSubModules(UserTypeID, ModuleID);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            var moduleroutename = "";
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {
                    // if (moduleroutename != Usersdata[i].SubModuleRouteName) {
                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].ModuleID;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                    modulesList.push(obj);
                    //   moduleroutename = UsersRightsdata[i].SubModuleRouteName;
                    //  }
                }
                $scope.AssessmentModules = modulesList;
            } else {
                $scope.AssessmentModules = [];
            }
        }, function (err) {
            console.log(err);
        });

        $scope.OpenSubModule = function (Module) {
            $state.go("Dashboard.AssessmentDashbaord." + Module.ModuleRouteName);
        }

        $scope.logOut = function () {
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
            $state.go('OfficialsLogin');
        }
    })
})



