define(['app'], function (app) {
    app.controller("RecentNewsController", function ($scope, $state, $localStorage, $uibModal,  AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;

      
       
        const $ctrl = this
        $ctrl.$onInit = () => {

            $scope.getuserRecentNews();
        }
       
        $scope.loading = false;


        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }
        var usertypes = AdminService.GetUserTypes();
        usertypes.then(function (response) {
            if (response.Table.length > 0) {
                $scope.UserTypes = response.Table;

            } else {
                $scope.StudentType = [];
                alert("No Data Found");
            }
        },
            function (error) {
                alert("error while loading Data");
                console.log(error);
            });



        $scope.getuserRecentNews = function () {

            //$scope.loading = true;


            var GetRecentNews = AdminService.GetRecentNews();
            GetRecentNews.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length>0) {
                    $scope.loading = false;
                    $scope.RecentNewsTable = res.Table;
                    //$scope.result = true;
                    $scope.NoData = false;
                    //$scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    //$scope.result = false;
                    $scope.NoData = true;
                    alert("No Data Found");
                    //$scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

       




        $scope.AddRecentNews = function () {
            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert('Please select StartDate');
                return;
            }
            if ($scope.EndDate == null || $scope.EndDate == undefined || $scope.EndDate == "") {
                alert('Please select EndDate');
                return;
            }
            if ($scope.RecentNews == null || $scope.RecentNews == undefined || $scope.RecentNews == "") {
                alert('Please enter RecentNews');
                return;
            }
            $scope.loading = true;
            var startDate = moment($scope.StartDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            //var date = new Date($scope.EndDate.toString());
            //month = '' + (date.getMonth() + 1);
            //day = '' + date.getDate();
            //year = date.getFullYear();

            //hrs = '23';
            //min = '59';
            //sec = '59';

            //if (month.length < 2) month = '0' + month;
            //if (day.length < 2) day = '0' + day;
            //var dates = [year, month, day].join('-');
            //var time = [hrs, min, sec].join(':');
            //$scope.EndDate = dates + ' ' + time;
            var EndDate = moment($scope.EndDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            //if ($scope.arr.length > 0) {
            //    for (var i = 0; i < $scope.arr.length; i++) {
            //        $scope.array.push({ 'RecentNewsText': $scope.RecentNews, 'FromDate': startDate, 'ToDate': EndDate, 'UserName': $scope.UserName });
            //    }
            //}

            $scope.array = []

            $scope.array.push({ 'RecentNewsText': $scope.RecentNews, 'FromDate': startDate, 'ToDate': EndDate, 'UserName': $scope.UserName });

            var addrecentnews = AdminService.AddRecentNews($scope.array[0].RecentNewsText, $scope.array[0].FromDate, $scope.array[0].ToDate, $scope.array[0].UserName);
            addrecentnews.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }

                if (response[0].ResponceCode == '200') {
                    alert('RecentNews Added Successfully');
                    $scope.getuserRecentNews();

                } else if (response[0].ResponceCode == '400') {
                    alert(respose[0].ResponceDescription);
                    $scope.getuserRecentNews();
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.Edit = function (RecentNewsID) {
            var geteditcentres = AdminService.GetEditRecentNews(RecentNewsID);
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
                templateUrl: "/app/views/Popups/EditRecentNewsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.View = function (RecentNewsID) {
            var getviewrecentnews = AdminService.GetEditRecentNews(RecentNewsID);
            getviewrecentnews.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Centres')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewRecentNewsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.Update = function (newdata) {
            var paramObj = {
                "RecentNewsText": newdata.RecentNewsText,
                "FromDate": newdata.FromDate,
                "ToDate": newdata.ToDate,
                "Active": newdata.Active,
                "UserName": authData.UserName,
            }
            var updaterecentnews = AdminService.UpdateRecentNews(paramObj);
            updaterecentnews.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                console.log(response)
                if (res[0].ResponceCode == '200') {
                    alert('Recent News Updated Successfully');
                    $scope.getuserRecentNews();
                    $scope.modalInstance.close();
                    $state.go('Dashboard.Settings.RecentNews')

                } else if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription);
                    $scope.getuserRecentNews();
                    $scope.modalInstance.close();

                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })         
        }


        //$scope.getAllRecentNews = function () {

        //    $scope.modalInstance = $uibModal.open({
        //        templateUrl: "/app/views//AllRecentNewsPopup.html",
        //        size: 'lg',
        //        scope: $scope,
        //        windowClass: 'modal-fit',
        //        backdrop: 'static',
        //        keyboard: false
        //    });

        //    var GetAllRecentNews = AdminService.GetAllRecentNews();
        //    GetAllRecentNews.then(function (response) {
        //        if (response.Table.length) {
        //            $scope.GetAllRecentNews = response.Table;

        //        } else {
        //            $scope.loading = false;
        //            $scope.NoData = true;
        //            alert("No Data Found");

        //        }
        //    },
        //        function (error) {

        //            alert("error while loading Data");
        //            console.log(error);
        //        });
        //    $scope.closeModal = function () {
        //        $scope.modalInstance.close();
        //    };


        //}


       

       







    })
})