define(['app'], function (app) {
    app.controller("DatesSettingsController", function ($scope, $state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var getcurrpolycetyear = AdminService.GetCurrentPolycetYear();
        getcurrpolycetyear.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.CurrentPolycetYearData = res.Table;

        },
            function (error) {
                alert("error while loading States");
                //var err = JSON.parse(error);

            });

        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }

        $scope.GetRegistrationDates = function (PolycetYearID) {

            var getregdates = AdminService.GetRegistrationDates(PolycetYearID);
            getregdates.then(function (resp) {
                $scope.PolycetYearID = PolycetYearID;
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.RegistrationDatesData = res.Table;
                }
                else {
                    $scope.RegistrationDatesData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }



        $scope.Submit = function () {

            if ($scope.PolycetYearID == null || $scope.PolycetYearID == undefined || $scope.PolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.RegStartDate == null || $scope.RegStartDate == undefined || $scope.RegStartDate == "") {
                alert('Please select Registration StartDate');
                return;
            }
            if ($scope.RegEndDate == null || $scope.RegEndDate == undefined || $scope.RegEndDate == "") {
                alert('Please select Registration EndDate');
                return;
            }
            if ($scope.AppStartDate == null || $scope.AppStartDate == undefined || $scope.AppStartDate == "") {
                alert('Please select Application StartDate');
                return;
            }
            if ($scope.AppEndDate == null || $scope.AppEndDate == undefined || $scope.AppEndDate == "") {
                alert('Please enter Application EndDate');
                return;
            }
            //$scope.loading = true;

            var regstartDate = moment($scope.RegStartDate).format("YYYY-MM-DD");       
            var regendDate = moment($scope.RegEndDate).format("YYYY-MM-DD");
            var appstartDate = moment($scope.AppStartDate).format("YYYY-MM-DD");
            var appendDate = moment($scope.AppEndDate).format("YYYY-MM-DD");

            //var paramObj = {
            //    "PolycetYearID": $scope.PolycetYearID,
            //    "RegistrationStartDate": regstartDate,
            //    "RegistrationEndDate": regendDate,
            //    "ApplicationStartDate": appstartDate,
            //    "ApplicationEndDate": appendDate,
            //    "UserName": authData.UserName,

            //}
            $scope.array = []
            $scope.array.push({
                'PolycetYearID': $scope.PolycetYearID, 'RegistrationStartDate': regstartDate, 'RegistrationEndDate': regendDate,
                'ApplicationStartDate': appstartDate, 'ApplicationEndDate': appendDate, 'UserName': authData.UserName
            });
            var adddates = AdminService.AddRegistrationDates($scope.array[0].PolycetYearID, $scope.array[0].RegistrationStartDate,
                $scope.array[0].RegistrationEndDate, $scope.array[0].ApplicationStartDate,
                $scope.array[0].ApplicationEndDate, $scope.array[0].UserName);
            adddates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetRegistrationDates($scope.PolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetRegistrationDates($scope.PolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.View = function (PolycetYearID) {
            var getviewcentres = AdminService.GetRegistrationDates(PolycetYearID);
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
                templateUrl: "/app/views/Popups/ViewRegDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.Edit = function (PolycetYearID) {
            var geteditdates = AdminService.GetRegistrationDates(PolycetYearID);
            geteditdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Registration Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditRegDatesPopup.html",
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

            var REGstartDate = moment(data.RegistrationStartDate).format("YYYY-MM-DD");
            var REGendDate = moment(data.RegistrationEndDate).format("YYYY-MM-DD");
            var APPstartDate = moment(data.ApplicationStartDate).format("YYYY-MM-DD");
            var APPendDate = moment(data.ApplicationEndDate).format("YYYY-MM-DD");

            $scope.array = []
            $scope.array.push({
                'PolycetYearID': data.PolycetYearID, 'RegistrationStartDate': REGstartDate, 'RegistrationEndDate': REGendDate,
                'ApplicationStartDate': APPstartDate, 'ApplicationEndDate': APPendDate, 'Active': data.Active, 'UserName': authData.UserName
            });
            var updatedates = AdminService.UpdateRegistrationDates($scope.array[0].PolycetYearID, $scope.array[0].RegistrationStartDate,
                $scope.array[0].RegistrationEndDate, $scope.array[0].ApplicationStartDate,
                $scope.array[0].ApplicationEndDate, $scope.array[0].Active, $scope.array[0].UserName);
            updatedates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetRegistrationDates($scope.PolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetRegistrationDates($scope.PolycetYearID);


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

