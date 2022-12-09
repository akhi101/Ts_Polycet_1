define(['app'], function (app) {
    app.service("AdminService", function (DataAccessService) {
        this.GetCurrentPolycetYear = function () {
            return DataAccessService.getDataAll('api/AdminService/GetCurrentPolycetYear');
        };

        this.GetStates = function () {
            return DataAccessService.getDataAll('api/AdminService/GetStates');
        };

        this.GetCaptchaString10 = function () {
            return DataAccessService.getDataAll('api/AdminService/GetCaptchaString10');
        };

        this.GetRecentNews = function () {
            return DataAccessService.getDataAll('api/AdminService/GetRecentNews');
        };

        this.AddRecentNews = function (RecentNewsText, FromDate, ToDate, UserName) {
            var paramObj = { "RecentNewsText": RecentNewsText, "FromDate": FromDate, "ToDate": ToDate, "UserName": UserName };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddRecentNews', paramObj);
            return promise;
        }

        //this.AddRecentNews = function (paramObject) {

        //    return DataAccessService.postData('api/AdminService/AddRecentNews', paramObject);
        //};

        //this.AddRegistrationDates = function (paramObject) {

        //    return DataAccessService.postData('api/AdminService/AddRegistrationDates', paramObject);
        //};


        this.AddRegistrationDates = function (PolycetYearID, RegistrationStartDate, RegistrationEndDate, ApplicationStartDate, ApplicationEndDate, UserName) {
            var paramObj = {
                "PolycetYearID": PolycetYearID, "RegistrationStartDate": RegistrationStartDate,
                "RegistrationEndDate": RegistrationEndDate, "ApplicationStartDate": ApplicationStartDate,
                "ApplicationEndDate": ApplicationEndDate, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddRegistrationDates', paramObj);
            return promise;
        }

        this.GetRegistrationDates = function (PolycetYearID) {
            var paramObject = { "PolycetYearID": PolycetYearID };
            return DataAccessService.getDataWithPara('api/AdminService/GetRegistrationDates', paramObject);
        };

        this.UpdateRegistrationDates = function (PolycetYearID, RegistrationStartDate, RegistrationEndDate, ApplicationStartDate, ApplicationEndDate,Active, UserName) {
            var paramObj = {
                "PolycetYearID": PolycetYearID, "RegistrationStartDate": RegistrationStartDate,
                "RegistrationEndDate": RegistrationEndDate, "ApplicationStartDate": ApplicationStartDate,
                "ApplicationEndDate": ApplicationEndDate, "Active": Active, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/UpdateRegistrationDates', paramObj);
            return promise;
        }

        this.GetEditRecentNews = function (RecentNewsID) {
            var paramObject = { "RecentNewsID": RecentNewsID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditRecentNews', paramObject);
        };

        this.UpdateRecentNews = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateRecentNews', paramObject);
        };

        this.GetUserTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetUserTypes');
            return promise;
        }

      

        this.GetCaptchaString = function (SessionId) {
            var paramObject = { "SessionId": SessionId };
            return DataAccessService.getDataWithPara('api/AdminService/GetCaptchaString', paramObject);
        };


        this.ValidateCaptcha = function (SessionId, Captcha) {
            var paramObject = { "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.postData('api/AdminService/ValidateCaptcha', paramObject);
        };

     
        

        this.GetDistricts = function (StateID) {
            var paramObject = { "StateID": StateID };
            return DataAccessService.getDataWithPara('api/AdminService/GetDistricts', paramObject);
        };

        this.GetMandals = function (DistrictID) {
            var paramObj = {
                "DistrictID": DistrictID
            };
            var promise = DataAccessService.postData('api/AdminService/GetMandals', paramObj);
            return promise;
        };

        this.GetCoordinatingCentres = function (DistrictID) {
            var paramObj = {
                "DistrictID": DistrictID
            };
            var promise = DataAccessService.postData('api/AdminService/GetCoordinatingCentres', paramObj);
            return promise;
        };

        this.GetEditDistCoordinatorDetails = function (CoordinatorID) {
            var paramObj = {
                "CoordinatorID": CoordinatorID
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetEditDistCoordinatorDetails', paramObj);
            return promise;
        };

        this.GetDistCoordinatingCenters = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.getDataWithPara('api/AdminService/GetDistCoordinatingCenters', paramObject);
        };

        this.GetDistrictCoordinators = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.getDataWithPara('api/AdminService/GetDistrictCoordinators', paramObject);
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

        this.AddDistrictCoordinators = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddDistrictCoordinators', paramObject);
        };

        this.UpdateDistCoordinators = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateDistCoordinators', paramObject);
        };

        this.AddNotification = function (NotificationText, NotificationFilePath, NotificationDate, UserName) {
            var paramObject = {
                "NotificationText": NotificationText, "NotificationFilePath": NotificationFilePath,
                "NotificationDate": NotificationDate,"UserName": UserName
            };

            var promise = DataAccessService.postData('api/PreExamination/AddNotification', paramObject);
            return promise;
        }

        this.getNotificationsList = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetNotifications');
            return promise;
        }

        this.AddPolycetYear = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddPolycetYear', paramObject);
        };


        this.GetPolycetYears = function () {
            return DataAccessService.getDataAll('api/AdminService/GetPolycetYears');
        };

        this.GetEditPolycetYear = function (PolycetYearID) {
            var paramObject = { "PolycetYearID": PolycetYearID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditPolycetYear', paramObject);
        };

        this.UpdatePolycetYear = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdatePolycetYear', paramObject);
        };

        this.GetCasteDetails = function (applicationNo, userid) {
            var paramObject = { "applicationNo": applicationNo, "userid": userid };
            console.log(paramObject)
            return DataAccessService.postData('api/AdminService/GetCasteDetails', paramObject);
        };


    })
})