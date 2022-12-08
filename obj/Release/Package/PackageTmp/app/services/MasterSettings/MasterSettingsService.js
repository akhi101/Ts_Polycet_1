define(['app'], function (app) {
    app.service("MasterSettingsService", function (DataAccessService) {

        //this.AddModule = function (ModuleName, ModuleRouteName, ModuleCardColourID, UserName) {
        //    var paramObj = {
        //        "ModuleName": ModuleName, "ModuleRouteName": ModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "UserName": UserName
        //    };
        //    var promise = DataAccessService.postData('api/MasterSettingsService/AddModule', paramObj);
        //    return promise;
        //}

        this.GetAllModules = function () {

            var promise = DataAccessService.getDataWithPara('MasterPage/GetAllModules');
            return promise;
        }

        this.GetModuleColours = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetModuleColours');
            return promise;
        }

        this.GetUserModules = function (UserTypeID) {
            var paramObject = {
                "UserTypeID": UserTypeID
            };
            return DataAccessService.getDataWithPara('MasterPage/GetUserModules', paramObject);
        }

        this.GetAllSubModules = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetAllSubModules');
            return promise;
        }

        this.AddModule = function (paramObject) {

            return DataAccessService.postData('MasterPage/AddModule', paramObject);
        };


        this.GetEditModules = function (ModuleID) {
            var paramObject = { "ModuleID": ModuleID };
            return DataAccessService.getDataWithPara('MasterPage/GetEditModules', paramObject);
        };


        this.UpdateModules = function (paramObject) {

            return DataAccessService.postData('MasterPage/UpdateModules', paramObject);
        };



        //this.AddModule = function (ModuleName, ModuleRouteName, ModuleCardColourID, UserName) {
        //    var paramObj = {
        //        "ModuleName": ModuleName, "ModuleRouteName": ModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "UserName": UserName
        //    };
        //    var promise = DataAccessService.postData('MasterPage/AddModule', paramObj);
        //    return promise;
        //}
        this.AddUserModule = function (paramObject) {
            return DataAccessService.postData('MasterPage/AddUserModule', paramObject);

        }

        this.GetSubModules = function (ModuleID) {
            var paramObject = {
                "ModuleID": ModuleID
            };
            return DataAccessService.getDataWithPara('MasterPage/GetSubModules', paramObject);
        }


        this.AddSubModules = function (paramObject) {
            return DataAccessService.postData('MasterPage/AddSubModules', paramObject);
        }



        this.GetUserSubModules = function (UserTypeID, ModuleID) {
            var paramObject = {
                "UserTypeID": UserTypeID, "ModuleID": ModuleID
            };
            return DataAccessService.getDataWithPara('MasterPage/GetUserSubModules', paramObject);
        }

        this.AddUserSubModules = function (paramObject) {
            return DataAccessService.postData('MasterPage/AddUserSubModules', paramObject);
        }
      
    });
});