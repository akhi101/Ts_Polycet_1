define(['app'], function (app) {
    app.service("ForgotPasswordService", function (DataAccessService) {
       
        this.GetForgotPassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/SystemUser/GetForgotPassword', paramObject);
            return promise;
        }

    });
});