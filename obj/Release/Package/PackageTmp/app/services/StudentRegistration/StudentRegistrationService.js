define(['app'], function (app) {
    app.service("StudentRegistrationService", function (DataAccessService) {

        this.SendSms = function (CandidateMobile,  CandidateName) {
            var paramObject = {
                "CandidateMobile": CandidateMobile,  "CandidateName": CandidateName
            };
            return DataAccessService.postData('api/StudentRegistration/SendSms', paramObject);
        };


        this.VerifyMobileOtp = function (CandidateMobile, CandidateName, MobileOTP) {
            var paramObject = {
                "CandidateMobile": CandidateMobile,  "CandidateName": CandidateName, "MobileOTP": MobileOTP
            };
            return DataAccessService.postData('api/StudentRegistration/VerifyMobileOtp', paramObject);
        };

        this.VerifyCaste = function (AadharNumber, CasteCertificateNumber, CasteCategoryID) {
            var paramObject = {
                "AadharNumber": AadharNumber, "CasteCertificateNumber": CasteCertificateNumber, "CasteCategoryID": CasteCategoryID
            };
            return DataAccessService.postData('api/StudentRegistration/VerifyCaste', paramObject);
        };


        this.SubmitStdDetails = function (StudentName, RegistrationMobile, CasteCategoryID, AadharNumber, CasteCertificateNumber, CasteVerified, RegistrationEmail, RegistrationPassword, RegistrationAmount) {
            var paramObject = {
                "StudentName": StudentName, "RegistrationMobile": RegistrationMobile,
                "CasteCategoryID": CasteCategoryID, "AadharNumber": AadharNumber,
                "CasteCertificateNumber": CasteCertificateNumber, "CasteVerified": CasteVerified,
                "RegistrationEmail": RegistrationEmail, "RegistrationPassword": RegistrationPassword,
                "RegistrationAmount": RegistrationAmount

            };
            return DataAccessService.postData('api/StudentRegistration/StdRegistration', paramObject);
        };


        //this.SubmitStdDetails = function (StudentName, RegistrationMobile, RegistrationEmail, RegistrationPassword) {
        //    var paramObject = {
        //        "StudentName": StudentName, "RegistrationMobile": RegistrationMobile,
        //        "RegistrationEmail": RegistrationEmail, "RegistrationPassword": RegistrationPassword

        //    };
        //    return DataAccessService.postData('api/StudentRegistration/StdRegistration', paramObject);
        //};


        this.GetCategories = function () {
            return DataAccessService.getDataAll('api/StudentRegistration/GetCategories');
        };

    });

});