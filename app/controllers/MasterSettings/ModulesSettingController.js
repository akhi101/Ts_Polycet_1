define(['app'], function (app) {
    app.controller("ModulesSettingController", function ($scope, $localStorage, $state, AdminService, $uibModal, MasterSettingsService) {
        var authData = $localStorage.authorizationData;
        $scope.authToken = $localStorage.authToken;
        $scope.AssessmentModules = [];
        $scope.UserTypeID = parseInt(authData.UserTypeID);
         

        const $ctrl = this
        $ctrl.$onInit = () => {
            $scope.result = false;
            $scope.modulecolours();
            $scope.getModules();
            $scope.getsubmodules();
        }


        
        $scope.loading = false;
        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }

        $scope.tab1 = function () {
            $scope.CardName = null;
            $scope.CardColour = null;
            $scope.CardRoute = null;
        }
        $scope.tab2 = function () {
            $scope.UserType = null;
            $scope.ModuleName = null;
            $scope.ModuleID = null;
        }
        $scope.tab3 = function () {

            $scope.moduleid = null;
            $scope.SubModuleName = null;
            $scope.SubModuleRouteName = null;
            $scope.modulecolour = null;




        }
        $scope.tab4 = function () {
            $scope.userTypeId = null;
            $scope.ModuleId = null;
            $scope.submodule = null;
        }


        $scope.getModules = function () {
            //$scope.loading = true;
            //$scope.NoData = false;
            var GetAllModules = MasterSettingsService.GetAllModules();
            GetAllModules.then(function (response) {
                if (response.Table.length > 0) {
                    //$scope.loading = false;
                    $scope.ModulesTableData = response.Table;
                //    $scope.NoData = false;
                } else {
                    //$scope.loading = false;
                    //$scope.NoData = true;
                }
            },
                function (error) {
                    //$scope.result = false;
                    //$scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        $scope.modulecolours = function () {
            var getModuleColours = MasterSettingsService.GetModuleColours();
            getModuleColours.then(function (response) {

                $scope.ModuleCardColours = response.Table;

            },
                function (error) {
                    var err = JSON.parse(error);
                });
        }

        $scope.getUserModules = function () {
            $scope.loading = true;
            if ($scope.UserType == null || $scope.UserType == undefined || $scope.UserType == "") {
                return;

            }
            var GetUserModules = MasterSettingsService.GetUserModules($scope.UserType);
            GetUserModules.then(function (response) {
               
                    //try {
                    //    var res = JSON.parse(res);
                    //}
                
                    //catch (err){}
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.UserModulesDataTable = response;
                    $scope.NoData = false;
                } else {
                    $scope.loading = false;
                    $scope.NoData = true;
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });


        }


        $scope.getAllUserModules = function () {
            var GetAllUserModules = MasterPageService.GetAllUserModules();
            GetAllUserModules.then(function (response) {

                $scope.GetAllUserModules = response;

            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);

                });

        }


        $scope.getsubmodules = function () {
            var getallsubmod = MasterSettingsService.GetAllSubModules();
            getallsubmod.then(function (response) {
                //console.log(response)
                $scope.SubModulesData = response.Table;

            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);

                });
        }



        $scope.AddModule = function () {
            //$scope.loading = true;
            var paramObject = {
                "ModuleName": $scope.CardName,
                "ModuleRouteName": $scope.CardRoute,
                "ModuleCardColourID": $scope.CardColour,
                "UserName": authData.UserName
            }
            var SetModues = MasterSettingsService.AddModule(paramObject);
            SetModues.then(function (response) {
                $scope.loading = false;
                if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription);
                    $scope.getModules();
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('Module Added Succesfully')
                    $scope.getModules();
                    //$scope.loading = false;
                    $scope.clearDefaults();

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.Edit = function (ModuleID) {
            var geteditmodules = MasterSettingsService.GetEditModules(ModuleID);
            geteditmodules.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //    $scope.EditData = res.Table;



                //} catch (err) {
                //}
                $scope.EditData = response.Table[0];

            }, function (error) {
                alert('Unable to load Centres')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditModulesPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.UpdateModules = function (data) {
            var paramObj = {
                "ModuleID": data.ModuleID,
                "ModuleName": data.ModuleName,
                "ModuleRouteName": data.ModuleRouteName,
                "ModuleCardColourID": data.ModuleCardColourID,
                "ModuleOrder": data.ModuleOrder,
                "Active": data.Active,
                "UserName": authData.UserName
            }
            var updatepolycetyear = MasterSettingsService.UpdateModules(paramObj);
            updatepolycetyear.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }

                if (response[0].ResponceCode == '200') {
                    alert('Module Details Updated Successfully');
                    $scope.getModules();
                    $scope.modalInstance.close();




                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription);
                    $scope.getModules();
                    $scope.modalInstance.close();



                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }





        $scope.AddUserModule = function () {
            //$scope.loading = true;
            var paramObject = {
                "UserTypeID": $scope.UserType,
                "ModuleID": $scope.ModuleID,
                "UserName": authData.UserName
            }
            var SetModues = MasterSettingsService.AddUserModule(paramObject);
            SetModues.then(function (response) {
                if (response[0].ResponseCode == '400') {
                    //$scope.loading = false;
                    alert(response[0].ResponseDescription);
                    //$scope.loading = false;
                    $scope.getUserModules();
                    $scope.clearDefaults();
                } else {
                    //$scope.loading = false;
                    alert('User SubModule Added Successfully')
                    $scope.loading = false;
                    $scope.getUserModules();
                    $scope.clearDefaults();

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                });
               

        }




        var GetUserTypes = AdminService.GetUserTypes();
        GetUserTypes.then(function (response) {

            $scope.UserTypes = response.Table
        },
            function (error) {
                var err = JSON.parse(error);
            });


        $scope.OpenSubmodules = function (ModuleID) {
            $localStorage.moduleData = {
                UserTypeID: $scope.UserTypeID,
                ModuleID: ModuleID
            }
            $state.go("Dashboard.Settings.SubModuleSettings");
        }




        $scope.getSubModules = function () {
            $scope.loading = true;
            if ($scope.moduleid == null || $scope.moduleid == undefined || $scope.moduleid == "") {
                return;
            }
            var getsubmods = MasterSettingsService.GetSubModules($scope.moduleid);
            getsubmods.then(function (Response) {
                //try {
                //    var res = JSON.parse(res);
                //}

                /*catch (err) { }*/
                if (Response.length > 0) {
                    $scope.loading = false;
                    $scope.SubModulesTable = Response;
                    $scope.NoData = false;
                } else {
                    $scope.loading = false;
                    $scope.NoData = true;

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData1 = true;
                    alert("error while loading Data");
                    console.log(error);
                });

        }

        $scope.clearDefaults = function () {

            $scope.CardName = '';
            $scope.CardColour = '';
            $scope.CardRoute = '';




            $scope.UserType = '';
            $scope.ModuleName = '';
            $scope.ModuleID = '';



            $scope.moduleid = '';
            $scope.SubModuleName = '';
            $scope.SubModuleRouteName = '';
            $scope.modulecolour = '';



            $scope.userTypeId = '';
            $scope.ModuleId = '';
            $scope.submodule = '';
        }
        $scope.AddSubModules = function () {
            //$scope.loading = true;
            var paramObject = {
                "ModuleID": $scope.moduleid,
                "SubModuleName": $scope.SubModuleName,
                "SubModuleRouteName": $scope.SubModuleRouteName,
                "ModuleCardColourID": $scope.modulecolour,
                "UserName": authData.UserName
            }
            var SetModues = MasterSettingsService.AddSubModules(paramObject);
            SetModues.then(function (response) {
                //$scope.loading = true;
                if (response[0].ResponseCode == '400') {
                    //$scope.loading = false;
                    alert(response[0].ResponseDescription);
                    //$scope.loading = false;
                    $scope.getSubModules();
                    $scope.getsubmodules();
                    $scope.clearDefaults();
                } else {
                    //$scope.loading = false;
                    alert('Sub Module Added Successfully')
                    $scope.getSubModules();
                    $scope.getsubmodules();
                    $scope.clearDefaults();

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }




        $scope.changeUser = function (userTypeId) {
            $scope.userTypeId = userTypeId;
            $scope.loading = false;
            $scope.getusersubModules();

        }
        $scope.ChangeModules = function (ModuleId) {
            $scope.ModuleId = ModuleId;
            $scope.getusersubModules();
        }

        $scope.getusersubModules = function () {

            if ($scope.userTypeId == 0 || $scope.userTypeId == null || $scope.userTypeId == undefined) {
                return;
            }
            if ($scope.ModuleId == 0 || $scope.ModuleId == null || $scope.ModuleId == undefined) {
                return;
            }

            //$scope.NoData = false;
            $scope.loading = true;
            var GetUserSubModules = MasterSettingsService.GetUserSubModules($scope.userTypeId, $scope.ModuleId);
            GetUserSubModules.then(function (response) {
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.GetUserSubModules = response;
                    $scope.NoData = false;
                } else {
                    $scope.loading = false;
                    $scope.NoData = true;
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });

        }

        $scope.AddUserSubModules = function () {
            //$scope.loading = true;
            var paramObject = {
                "UserTypeID": $scope.userTypeId,
                "ModuleID": $scope.ModuleId,
                "SubModuleID": $scope.SubMod,
                "UserName": authData.UserName
            }
            var SetModues = MasterSettingsService.AddUserSubModules(paramObject);
            SetModues.then(function (response) {
                //$scope.loading = true;
                if (response[0].ResponseCode == '400') {
                    //$scope.loading = false;
                    alert(response[0].ResponseDescription);
                    //$scope.loading = false;
                    $scope.getusersubModules();
                    $scope.clearDefaults();
                } else {
                    //$scope.loading = false;
                    alert('User SubModule Added Successfully')
                    $scope.loading = false;
                    $scope.getusersubModules();
                    $scope.clearDefaults();

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                });
        }

        $scope.SwitchUserSubModule = function (UserSubModuleID, Active) {
            if ($scope.userTypeId == null || $scope.userTypeId == undefined || $scope.userTypeId == "") {
                alert("Please Select UserName to use the Operation");
                return
            }

            if ($scope.ModuleId == null || $scope.ModuleId == undefined || $scope.ModuleId == "") {
                alert("Please Select Module to use the Operation");
                return
            }



            if (Active == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = MasterPageService.SetUserSubModuleInactive(UserSubModuleID, Active, $scope.UserName);
            SetModues.then(function () {
                alert("UserSubModule Status Updated Successfully");
                $scope.getusersubModules();
                $scope.clearDefaults();
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        };




    })
})