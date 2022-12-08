define(['app'], function (app) {
    app.service("PreExaminationService", function (DataAccessService) {

        this.RequestLog = function (marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, challan, amount, schemeId, json) {
            var paramObject = { "marchantid": marchantid, "subMarchantid": subMarchantid, "addInfo1": addInfo1, "addInfo3": addInfo3, "addInfo4": addInfo4, "addInfo5": addInfo5, "addInfo6": addInfo6, "addInfo7": addInfo7, "challan": challan, "amount": amount, "schemeId": schemeId, "json": json };

            return DataAccessService.postData('api/PreExamination/RequestLog', paramObject);
        },
            this.getSomeValue = function (url, challanaNo) {
                var paramObject = { "url": url, "challanaNo": challanaNo };
                console.log(paramObject)
                return DataAccessService.getDataWithPara('api/BillDesk/getSomeValue', paramObject);
            }

    });
});