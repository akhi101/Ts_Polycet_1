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



        $scope.OpenModule = function (Module) {
            $state.go(Module);
        }

        //$scope.OpenLogin = function () {
        //    $state.go('index.OfficialsLogin')
        //}

    });
});


