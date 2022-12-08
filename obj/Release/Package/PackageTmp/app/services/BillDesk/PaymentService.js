define(['app'], function (app) {
    app.service("PaymentService", function (DataAccessService) {
       
  
        this.GetCaptchaString = function () {
            return DataAccessService.getDataAll('Payment/GetCaptchaString');
        };

        
        this.getCipherRequest = function (Callbackurl,addInfo1,addInfo2,addInfo3,addInfo4,chalanaNo,amount) {
            var paramObject = { "Callbackurl": Callbackurl, "addInfo1": addInfo1, "addInfo2": addInfo2, "addInfo3": addInfo3, "addInfo4": addInfo4, "chalanaNo": chalanaNo, "amount": amount };
            console.log(paramObject)
            return DataAccessService.getDataWithPara('api/Twallet/getCipherRequest', paramObject);
        }

        this.billDeskS2SResponse = function (chalanaNo) {
            var paramObject = { "chalanaNo": chalanaNo };
            return DataAccessService.postData('api/Billdesk/FindChallanNo', paramObject);
        }

        this.SendSuccessSMS = function (FeeStatus,Challan) {
            var paramObject = { "FeeStatus": FeeStatus, "Challan": Challan };
            return DataAccessService.postData('api/Billdesk/SendSuccessSMS', paramObject);
        }

        


    });
});