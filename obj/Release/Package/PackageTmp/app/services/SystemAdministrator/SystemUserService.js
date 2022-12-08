define(['app'], function (app) {
    app.service("SystemUserService", function (DataAccessService) {
       
        this.GetUserModules = function (UserTypeID) {
            var paramObject = { "UserTypeID": UserTypeID };
            var promise = DataAccessService.getDataWithPara('SystemEntityRights/GetUserModules', paramObject);
            return promise;
        }
        this.GetUserSubModules = function (UserTypeID, ModuleID) {
            var paramObject = { "UserTypeID": UserTypeID, "ModuleID": ModuleID };
            var promise = DataAccessService.getDataWithPara('SystemEntityRights/GetUserSubModules', paramObject);
            return promise;
        }


        this.GetSubModules = function (UserName, ModuleID) {
            var paramObject = { "UserName": UserName, "ModuleID": ModuleID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetSubModules', paramObject);
            return promise;
        }

        this.GetUserLogin = function (Username, UserPassword, IPAddress, SessionID) {
            var paramObject = { "Username": Username, "UserPassword": UserPassword, "IPAddress": IPAddress, "SessionID": SessionID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUserLogin', paramObject);
            return promise;
        }

        this.GetSystemUserById = function (SysUserID) {
            var paramObject = { "SysUserID": SysUserID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetSystemUserById', paramObject);
            return promise;
        }

        this.GetEKey = function () {
            var promise = DataAccessService.getDataAll('api/SystemUser/GetEKey');
            return promise;
        }

        this.GetSessionEKey = function () {
            var promise = DataAccessService.getDataAll('api/SystemUser/GetSessionEKey');
            return promise;
        }


        this.PostUserLogout = function (UserName, SessionID) {
            var paramObject = { "UserName": UserName, "SessionID": SessionID };
            var promise = DataAccessService.postData('api/SystemUser/GetUserLogout', paramObject);
            return promise;
        }

     




    })
})