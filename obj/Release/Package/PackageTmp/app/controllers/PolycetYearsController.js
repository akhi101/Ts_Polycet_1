define(['app'], function (app) {
    app.controller("PolycetYearsController", function ($scope, $state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;

        const $ctrl = this;


        $ctrl.$onInit = () => {
            $scope.getpolycetyears();

        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }




        
        $scope.getpolycetyears = function () {

            //$scope.loading = true;
            //$scope.error = false;
            //$scope.data = false;
            var getyear = AdminService.GetPolycetYears();
            getyear.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table.length > 0) {
                    //$scope.loading = false;
                    $scope.PolycetYears = response.Table;
                    $scope.edit = true;
                    //$scope.loading = false;

                } else {
                    //$scope.loading = false;
                    //$scope.data = false;
                    //$scope.error = true;
                }
            },
                function (error) {

                    console.log(error);
                    //$scope.loading = false;
                    //$scope.data = false;
                    $scope.error = true;
                });
        }


     

       

        $scope.View = function (PolycetYearID) {
            var getviewcentres = AdminService.GetEditPolycetYear(PolycetYearID);
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
                templateUrl: "/app/views/Popups/ViewPolycetYearPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.Edit = function (PolycetYearID) {
            var geteditcentres = AdminService.GetEditPolycetYear(PolycetYearID);
            geteditcentres.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
              
                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Centres')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditPolycetYearPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }
        /*var data = {};*/

        $scope.Submit = function () {
            var paramObj = {
                "PolycetYear": $scope.PolycetYear,
                "CurrentPolycetYear": $scope.CurrentPolycetYear,
                "UserName": authData.UserName
            }
            var addyear = AdminService.AddPolycetYear(paramObj);
            addyear.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert('Polycet Year Added Successfully');
                    $scope.getpolycetyears();


                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getpolycetyears();


                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }


        $scope.UpdateDetails = function (data) {
            var paramObj = {
                "PolycetYearID": data.PolycetYearID,
                "PolycetYear": data.PolycetYear,
                "CurrentPolycetYear": data.CurrentPolycetYear,
                "Active": data.Active,
                "UserName": authData.UserName
            }
            var updatepolycetyear = AdminService.UpdatePolycetYear(paramObj);
            updatepolycetyear.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //let VerRes = response[0];

                if (res[0].ResponceCode == '200') {
                    alert('PolycetYear Updated Successfully');
                    $scope.getpolycetyears();
                    $scope.modalInstance.close();




                } else if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription);
                    $scope.getpolycetyears();
                    $scope.modalInstance.close();



                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }
    })
})

