using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models.Database;
using WebApplication1.Controllers.PreExamination;


namespace WebApplication1.Controllers.PaymentGateway
{
    //public class BillDeskController : ApiController
    //{

    //    [HttpGet, ActionName("getSomeValue")]
    //    public HttpResponseMessage getSomeValue(string url, string challanaNo)
    //    {

    //        try
    //        {
    //            string redirecturl = url;
    //            //string marchantid = "TSSBTET";
    //            //string subMarchantid = "TSDOFP";

    //            //var addInfo4 = "NA";
    //            //var addInfo5 = "NA";
    //            //var addInfo6 = "SINGLE";
    //            //var addInfo7 = "NA";

    //            ////string addInfo4 = request["addInfo4"].ToString();
    //            ////string addInfo5 = request["addInfo5"].ToString();
    //            ////string addInfo6 = request["addInfo6"].ToString();
    //            ////string addInfo7 = request["addInfo7"].ToString();
    //            //string chalanaNo = challanaNo;

    //            ////var base64EncodedBytes = System.Convert.FromBase64String(amount);
    //            ////var amt = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
    //            ////var base64EncodedBytes1 = System.Convert.FromBase64String(addInfo1);
    //            ////var add1 = System.Text.Encoding.UTF8.GetString(base64EncodedBytes1);
    //            ////var base64EncodedBytes2 = System.Convert.FromBase64String(chalanaNo);
    //            ////var chalanaNo1 = System.Text.Encoding.UTF8.GetString(base64EncodedBytes2);
    //            var dbHandler = new PolycetdbHandler();
    //            var param = new SqlParameter[1];
    //            param[0] = new SqlParameter("@ChallanaNumber", challanaNo);
    //            DataSet dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_ChallanaDataForFeePayment", param);
    //            string marchantid = dt.Tables[1].Rows[0]["marchantid"].ToString();
    //            string subMarchantid = dt.Tables[1].Rows[0]["subMarchantid"].ToString();
    //            string addInfo1 = dt.Tables[1].Rows[0]["addInfo1"].ToString();
    //            string addInfo3 = dt.Tables[1].Rows[0]["addInfo3"].ToString();
    //            string addInfo4 = dt.Tables[1].Rows[0]["addInfo4"].ToString();
    //            string addInfo5 = dt.Tables[1].Rows[0]["addInfo5"].ToString();
    //            string addInfo6 = dt.Tables[1].Rows[0]["addInfo6"].ToString();
    //            string addInfo7 = dt.Tables[1].Rows[0]["addInfo7"].ToString();
    //            string chalanaNo = dt.Tables[1].Rows[0]["challan"].ToString();
    //            string amount = dt.Tables[1].Rows[0]["amount"].ToString();

    //            PreExaminationController PreExaminationController = new PreExaminationController();
    //            PreExaminationController.FeeRequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, chalanaNo, amount);

    //            WebApplication1.Models.Security.SHA1 CheckSum = new WebApplication1.Models.Security.SHA1();
    //            var hash = CheckSum.CheckSumRequest(url, marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, chalanaNo, amount);
    //            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, hash);
    //            return response;
    //        }
    //        catch (Exception ex)
    //        {
    //            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
    //            return response;
    //        }

    //    }

    //}
}