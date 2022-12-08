define(['app'], function (app) {
    app.controller("IndexController", function ($scope, $state, AdminService) {

        //var captcha = AdminService.GetCaptchaString10();
        //captcha.then(function (res) {
        //    try {
        //        var newcapt = res;
        //        sessionStorage.clear();
        //        alert(newcapt)
        //        sessionStorage.setItem('SessionCaptcha', newcapt);
        //    } catch (err) {
        //        $scope.GetCatcha = ''
        //    }
        //}, function (error) {
        //    $scope.GetCatcha = ''
        //    alert('Unable to load Captcha')
        //});

        var getcircular = AdminService.getNotificationsList();
        getcircular.then(function (res) {
            var response = JSON.parse(res)
            if (response.Table.length > 0) {
                $scope.Circulars = response.Table;


            } else {
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            }
        },
            function (error) {

                console.log(error);
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            });

        var GetRecentNews = AdminService.GetRecentNews();
        GetRecentNews.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.LatestRecentNews = res.Table;
        },
            function (error) {
                alert("error while loading Recent News");
                var err = JSON.parse(error);
            });


        $scope.OpenModule = function (Module) {
            $state.go(Module);
        }

        //$scope.OpenLogin = function () {
        //    $state.go('index.OfficialsLogin')
        //}

    });
});


