define(['app'], function (app) {
    app.controller("DashboardController", function ($scope, $localStorage, SystemUserService, AppSettings, $state) {
        var authData = $localStorage.authorizationData;
        $scope.SessionID = $localStorage.SessionID;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin');
        }
        else {
            $scope.UserName = authData.UserName;
            $scope.UserTypeID = authData.UserTypeID;
            $scope.SessionID = $localStorage.SessionID;
            $scope.authToken = $localStorage.authToken;



            var UserTypeID = parseInt($scope.UserTypeID);
            var UserRightsdata = SystemUserService.GetUserModules(UserTypeID);
            UserRightsdata.then(function (Usersdata) {
                UserRights = Usersdata;
                var modulesList = [];
                var moduleroutename = "";
                if (Usersdata.length > 0) {
                    for (var i = 0; i < Usersdata.length; i++) {
                        //  if (moduleroutename != Usersdata[i].ModuleRouteName) {
                        var obj = {};
                        obj.SysModName = Usersdata[i].ModuleName;
                        obj.SysModID = Usersdata[i].ModuleID;
                        obj.ModuleRouteName = Usersdata[i].ModuleRouteName;
                        obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                        modulesList.push(obj);
                        //    moduleroutename = UsersRightsdata[i].ModuleRouteName;
                        //   }
                    }
                    $scope.modulesList = modulesList;
                } else {
                    $scope.modulesList = [];
                }



                AppSettings.UserRights = UserRights;


            }, function (error) {
                $scope.modulesList = [];
            });


            $scope.OpenModule = function (Module) {
                $localStorage.selectedModule = {
                    ModuleID: Module.SysModID,
                    ModuleRouteName: Module.ModuleRouteName
                }
                $state.go("Dashboard." + Module.ModuleRouteName);
            }

            $scope.Logout = function (temp) {


                //sessionStorage.loggedIn = "no";
                var GetUserLogout = SystemUserService.PostUserLogout(authData.UserName, $scope.SessionID);

                delete $localStorage.authorizationData;
                delete $localStorage.authToken;
                delete $scope.SessionID;

                $scope.authentication = {
                    isAuth: false,
                    UserID: 0,
                    UserName: ""

                };
                $state.go(temp)
            }
        }
    })
})