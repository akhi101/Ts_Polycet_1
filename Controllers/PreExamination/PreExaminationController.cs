using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApplication1.Models.Database;

namespace WebApplication1.Controllers.PreExamination
{
    public class PreExaminationController : ApiController
    {

        

        [HttpPost, ActionName("RequestLog")]
        public HttpResponseMessage RequestLog([FromBody] JsonObject request)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[12];
                param[0] = new SqlParameter("@marchantid", request["marchantid"]);
                param[1] = new SqlParameter("@subMarchantid", request["subMarchantid"]);
                param[2] = new SqlParameter("@addInfo1", request["addInfo1"]);
                param[3] = new SqlParameter("@addInfo3", request["addInfo3"]);
                param[4] = new SqlParameter("@addInfo4", request["addInfo4"]);
                param[5] = new SqlParameter("@addInfo5", request["addInfo5"]);
                param[6] = new SqlParameter("@addInfo6", request["addInfo6"]);
                param[7] = new SqlParameter("@addInfo7", request["addInfo7"]);
                param[8] = new SqlParameter("@challan", request["challan"]);
                param[9] = new SqlParameter("@amount", request["amount"]);
                param[10] = new SqlParameter("@schemeId", request["schemeId"]);
                param[11] = new SqlParameter("@json", request["json"]);
                var dt = dbHandler.ReturnDataSet("USP_SFP_SET_RequestLog", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_PinListForFeePayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("FeeRequestLog")]
        public string FeeRequestLog(string marchantid, string subMarchantid, string addInfo1, string addInfo3, string addInfo4, string addInfo5, string addInfo6, string addInfo7, string challan, string amount, int schemeId = 0, string json = null)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[12];
                param[0] = new SqlParameter("@marchantid", marchantid);
                param[1] = new SqlParameter("@subMarchantid", subMarchantid);
                param[2] = new SqlParameter("@addInfo1", addInfo1);
                param[3] = new SqlParameter("@addInfo3", addInfo3);
                param[4] = new SqlParameter("@addInfo4", addInfo4);
                param[5] = new SqlParameter("@addInfo5", addInfo5);
                param[6] = new SqlParameter("@addInfo6", addInfo6);
                param[7] = new SqlParameter("@addInfo7", addInfo7);
                param[8] = new SqlParameter("@challan", challan);
                param[9] = new SqlParameter("@amount", amount);
                param[10] = new SqlParameter("@schemeId", schemeId);
                param[11] = new SqlParameter("@json", json);
                var dt = dbHandler.ReturnDataSet("USP_SFP_SET_RequestLog", param);
                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return JsonConvert.SerializeObject(dt); ;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_SET_RequestLog", 0, ex.Message);
                return ex.Message;
            }
        }
    }
}