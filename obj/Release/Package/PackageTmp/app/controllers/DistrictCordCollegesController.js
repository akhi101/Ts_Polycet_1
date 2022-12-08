define(['app'], function (app) {
    app.controller("DistrictCordCollegesController", function ($scope,$state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var getstates = AdminService.GetStates();
        getstates.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.StatesData = res.Table;

        },
            function (error) {
                alert("error while loading States");
                //var err = JSON.parse(error);

            });

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        $scope.GetDistricts = function (StateID) {

            var getdistrict = AdminService.GetDistricts(StateID);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData = res.Table;
                }
                else {
                    $scope.DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                //    var err = JSON.parse(error);
                });
        }

        $scope.GetDistrictsData = function (data) {
            var getdistrict = AdminService.GetDistricts(data);
            getdistrict.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.DistrictsData = res;
                }
                else {
                    $scope.DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.GetDistCoordinatingCenters = function (DistrictID) {
            $scope.DistrictID = DistrictID;
            var getcentres = AdminService.GetDistCoordinatingCenters(DistrictID);
            getcentres.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.DistCordCentresTable = res;
                }
                else {
                    $scope.DistCordCentresTable = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        //$scope.getData = [{ "CollegeCode": "003", "CollegeName": "Govt Polycetcnic Warangal", "CollegeAddress": "2-41,Near Badhrakali Temple,Warangal-506102" },
        //    { "CollegeCode": "003", "CollegeName": "Govt Polycetcnic Warangal", "CollegeAddress": "2-41,Near Badhrakali Temple,Warangal-506102" },
        //    { "CollegeCode": "003", "CollegeName": "Govt Polycetcnic Warangal", "CollegeAddress": "2-41,Near Badhrakali Temple,Warangal-506102" },
        //    { "CollegeCode": "003", "CollegeName": "Govt Polycetcnic Warangal", "CollegeAddress": "2-41,Near Badhrakali Temple,Warangal-506102" }        ]

        //for (var j = 1; j < $scope.DistCordCentresTable.length + 1; j++) {
        //    $scope['edit' + j] = true;
        //}

        $scope.Submit = function (CollegeCode, CollegeName, CollegeAddress, State, District, Active) {



            //if ($scope.EnrollementStartDate == null || $scope.EnrollementStartDate == undefined || $scope.EnrollementStartDate == "") {
            //    alert("Select AcademicYear Batch Start Date");
            //    return;
            //}
            //if ($scope.EnrollementEndDate == null || $scope.EnrollementEndDate == undefined || $scope.EnrollementEndDate == "") {
            //    alert("Select AcademicYear Batch End Date");
            //    return;
            //}
            //if ($scope.BaTch == null || $scope.BaTch == undefined || $scope.BaTch == "") {
            //    alert("Select Batch");
            //    return;
            //}
            //if ($scope.courseduration == null || $scope.courseduration == undefined || $scope.courseduration == "") {
            //    alert("Select Course Duration");
            //    return;
            //}
            //$scope.loading = true;
            var adddistcoorcentre = AdminService.AddDistCoordinatingCentre(CollegeCode, CollegeName, CollegeAddress, State, District, $scope.UserName);
            adddistcoorcentre.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetDistCoordinatingCenters(DistrictID);



                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetDistCoordinatingCenters(DistrictID);



                }

                else {
                    alert("Not Added")


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        //$scope.Editsemesterdat = function (data, ind) {

        //    var ele1 = document.getElementsByClassName("enabletable" + ind);
        //    for (var j = 0; j < ele1.length; j++) {
        //        ele1[j].style['pointer-events'] = "auto";
        //        ele1[j].style.border = "1px solid #ddd";
        //    }
        //    $scope['edit' + ind] = false;

        //}

        $scope.View = function (CentreID) {
            var getviewcentres = AdminService.GetEditDetails(CentreID);
            getviewcentres.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];
                

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Centres')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewDistCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.Edit = function (CentreID) {
            var geteditcentres = AdminService.GetEditDetails(CentreID);
            geteditcentres.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    //$scope.StateName = res[0].StateName;
                    //$scope.CentreID = res[0].CentreID;
                    //$scope.StateID = res[0].StateID;
                    //$scope.DistrictID = res[0].DistrictID;
                    //$scope.DistrictName = res[0].DistrictName;
                    //$scope.CentreCode = res[0].CentreCode;
                    //$scope.CentreName = res[0].CentreName;
                    //$scope.CentreAddress = res[0].CentreAddress;
                    //$scope.Active = res[0].Active;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Centres')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditDistCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }
        /*var data = {};*/

        $scope.UpdateDetails = function (data) {
            var paramObj = {
                "CentreID": data.CentreID,
                "CentreCode": data.CentreCode,
                "CentreName": data.CentreName,
                "CentreAddress": data.CentreAddress,
                "StateID": data.StateID,
                "DistrictID": data.DistrictID,
                "Active": data.Active,
                "UserName": authData.UserName
            }
            var updatedistcoorcentre = AdminService.UpdateDistCoorCentres(paramObj);
            updatedistcoorcentre.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //let VerRes = response[0];
              
                if (res[0].StatusCode == '200') {
                    alert('District Coordinating Centre Updated Successfully');
                    $scope.GetDistCoordinatingCenters($scope.DistrictID);
                    $scope.modalInstance.close();
                    $state.go('Dashboard.DistrictCordColleges');
                    



                } else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetDistCoordinatingCenters($scope.DistrictID);
                    $state.go('Dashboard.DistrictCordColleges');


                }

                //else {
                //    alert("Otp Verification Failed")
                 

                //}
            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }
    })
})

