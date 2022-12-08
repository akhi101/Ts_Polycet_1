define(['app'], function (app) {
    app.service("AdminService", function (DataAccessService) {
        this.GetStates = function () {
            return DataAccessService.getDataAll('api/AdminService/GetStates');
        };

        this.GetCaptchaString10 = function () {
            return DataAccessService.getDataAll('api/AdminService/GetCaptchaString10');
        };

       

        this.GetCaptchaString = function (SessionId) {
            var paramObject = { "SessionId": SessionId };
            return DataAccessService.getDataWithPara('api/AdminService/GetCaptchaString', paramObject);
        };


        this.ValidateCaptcha = function (SessionId, Captcha) {
            var paramObject = { "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.postData('api/AdminService/ValidateCaptcha', paramObject);
        };

        this.GetCasteDetails = function (applicationNo, userid) {
            var paramObject = { "applicationNo": applicationNo, "userid": userid };
            console.log(paramObject)
            return DataAccessService.postData('api/AdminService/GetCasteDetails', paramObject);
        };
        

        this.GetDistricts = function (StateID) {
            var paramObject = { "StateID": StateID };
            return DataAccessService.getDataWithPara('api/AdminService/GetDistricts', paramObject);
        };

        this.GetDistCoordinatingCenters = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.getDataWithPara('api/AdminService/GetDistCoordinatingCenters', paramObject);
        };

        this.AddDistCoordinatingCentre = function (CentreCode,CentreName,CentreAddress,StateID,DistrictID,UserName) {
            var paramObject = {
                "CentreCode": CentreCode,
                "CentreName": CentreName,
                "CentreAddress": CentreAddress,
                "StateID": StateID,
                "DistrictID": DistrictID,
                //"Active": Active,
                "UserName": UserName
            };
            return DataAccessService.getDataWithPara('api/AdminService/AddDistCoordinatingCentre', paramObject);
        };

        this.GetEditDetails = function (CentreID) {
            var paramObject = { "CentreID": CentreID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditDetails', paramObject);
        };

        //this.UpdateDistCoorCentres = function (CentreID, CentreCode, CentreName, CentreAddress, StateID, DistrictID, Active, UserName) {
        //    var paramObject = {
        //        "CentreID": CentreID, "CentreCode": CentreCode,
        //        "CentreName": CentreName, "CentreAddress": CentreAddress,
        //        "StateID": StateID, "DistrictID": DistrictID,
        //        "Active": Active, "UserName": UserName
        //    };
        //    return DataAccessService.postData('api/AdminService/UpdateDistCoorCentres', paramObject);
        //};

        this.UpdateDistCoorCentres = function (paramObject) {
           
            return DataAccessService.postData('api/AdminService/UpdateDistCoorCentres', paramObject);
        };
    })
})