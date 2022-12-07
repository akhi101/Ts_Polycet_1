using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models.Database;
using WebApplication1.Controllers.PreExamination;
using System.Configuration;
using System.Text;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using WebApplication1.Controllers.Common;
using System.Web;
using System.Collections.Generic;
using WebApplication1.Models;
using System.IO;

namespace WebApplication1.Controllers.PaymentGateway
{
    public class BillDeskController : ApiController
    {

        [HttpGet, ActionName("getSomeValue")]
        public HttpResponseMessage getSomeValue(string url, string challanaNo)
        {

            try
            {
                string redirecturl = url;
                //string marchantid = "TSSBTET";
                //string subMarchantid = "TSDOFP";

                //var addInfo4 = "NA";
                //var addInfo5 = "NA";
                //var addInfo6 = "SINGLE";
                //var addInfo7 = "NA";

                ////string addInfo4 = request["addInfo4"].ToString();
                ////string addInfo5 = request["addInfo5"].ToString();
                ////string addInfo6 = request["addInfo6"].ToString();
                ////string addInfo7 = request["addInfo7"].ToString();
                //string chalanaNo = challanaNo;

                ////var base64EncodedBytes = System.Convert.FromBase64String(amount);
                ////var amt = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                ////var base64EncodedBytes1 = System.Convert.FromBase64String(addInfo1);
                ////var add1 = System.Text.Encoding.UTF8.GetString(base64EncodedBytes1);
                ////var base64EncodedBytes2 = System.Convert.FromBase64String(chalanaNo);
                ////var chalanaNo1 = System.Text.Encoding.UTF8.GetString(base64EncodedBytes2);
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ChallanaNumber", challanaNo);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_ChallanaDataForFeePayment", param);
                string marchantid = dt.Tables[1].Rows[0]["marchantid"].ToString();
                string subMarchantid = dt.Tables[1].Rows[0]["subMarchantid"].ToString();
                string addInfo1 = dt.Tables[1].Rows[0]["addInfo1"].ToString();
                string addInfo3 = dt.Tables[1].Rows[0]["addInfo3"].ToString();
                string addInfo4 = dt.Tables[1].Rows[0]["addInfo4"].ToString();
                string addInfo5 = dt.Tables[1].Rows[0]["addInfo5"].ToString();
                string addInfo6 = dt.Tables[1].Rows[0]["addInfo6"].ToString();
                string addInfo7 = dt.Tables[1].Rows[0]["addInfo7"].ToString();
                string chalanaNo = dt.Tables[1].Rows[0]["challan"].ToString();
                string amount = dt.Tables[1].Rows[0]["amount"].ToString();

                PreExaminationController PreExaminationController = new PreExaminationController();
                //PreExaminationController.FeeRequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, chalanaNo, amount);

                WebApplication1.Models.Security.SHA1 CheckSum = new WebApplication1.Models.Security.SHA1();
                var hash = CheckSum.CheckSumRequest(url, marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, chalanaNo, amount);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, hash);
                return response;
            }
            catch (Exception ex)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }

        }

        public class ChallanDetails
        {
            public string chalanaNo { get; set; }
        }

        [HttpPost, ActionName("FindChallanNo")]
        public async Task<HttpResponseMessage> FindChallanNo([FromBody] ChallanDetails ReqData)
        {

            HttpClient client = new HttpClient();
            string res = "";
                var url = "https://sbtet.telangana.gov.in/API/Payment/FindchalanaNo";
                var urlwithparam = url + "?chalanaNo=" + ReqData.chalanaNo;
                client.BaseAddress = new Uri(urlwithparam);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //GET Method
            HttpResponseMessage Resp = client.GetAsync(urlwithparam).Result;


            //List<HttpResponse> Resp = dt.DataTableToList<HttpResponse>();
            return Resp;

            //var url = "https://sbtet.telangana.gov.in/API/Payment/FindchalanaNo";
            //var urlwithparam = url + "?chalanaNo=" + ReqData.chalanaNo ;
            ////using (HttpClient client = new HttpClient())


            //HttpClient client = new HttpClient();
            //client.BaseAddress = new Uri(urlwithparam);
            ////client.DefaultRequestHeaders.Accept.Clear();
            ////client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //var res = client.GetAsync(urlwithparam).Result;
            ////DataSet dt = res;
            ////if (res.)
            //    //        {
            //    HttpResponseMessage response = res;

            ////{
            ////    var com = new CommunicationController();
            ////    //var msg = "KIQRZA is your otp for validating your Mobile no on" + data.RegistrationMobile.ToString().Substring(0, 2) + "xxxxx" + data.RegistrationMobile.ToString().Substring(6, 4) + ", SBTET TS";
            ////    //var tmp = await com.SendSms(data.RegistrationMobile.ToString(), msg, "1007161770830309481");
            ////    var msg = "Polycet6789124561 is Your provisional registration No for POLYCET 2023 and 123456 password. Login and complete Application, SBTET TS";
            ////    var tmp = await com.SendSms(data.RegistrationMobile.ToString(), msg, "1007166857328053980");
            ////}
            ////HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
            ////return response;


            //return response;

        }


        public class SmsData
        {
            public int FeeStatus { get; set; }
            public string Challan { get; set; }
        }

        [HttpPost, ActionName("SendSuccessSMS")]
        public async Task<HttpResponseMessage> SendSuccessSMS([FromBody] SmsData data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@FeeStatus", data.FeeStatus);
                param[1] = new SqlParameter("@Challan", data.Challan);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Update_FeeStatus", param);
                //if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                //{
                //var crypt = new HbCrypt("nfmrkvndoo");
                var passcrypt = new HbCrypt();
                string RegistrationNumber = dt.Tables[1].Rows[0]["RegistrationNumber"].ToString();
                string RegistrationPassword = Convert.ToString(dt.Tables[1].Rows[0]["RegistrationPassword"]);
                string RegistrationMobile = dt.Tables[1].Rows[0]["RegistrationMobile"].ToString();
                string Password = passcrypt.AesDecrypt(RegistrationPassword);
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                var msg = RegistrationNumber + " is Your provisional registration No for POLYCET 2023 and " + Password + " password. Login and complete Application, SBTET TS";
                string urlParameters = "?mobile=" + RegistrationMobile + "&message=" + msg + "&templateid=1007166857328053980";
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                

                //string decryptpassword = passcrypt.Decrypt(RegistrationPassword);
                var com = new CommunicationController();
                //var msg = "KIQRZA is your otp for validating your Mobile no on" + data.RegistrationMobile.ToString().Substring(0, 2) + "xxxxx" + data.RegistrationMobile.ToString().Substring(6, 4) + ", SBTET TS";
                //var tmp = await com.SendSms(data.RegistrationMobile.ToString(), msg, "1007161770830309481");
                //var msg = RegistrationNumber + " is Your provisional registration No for POLYCET 2023 and "+ Password + " password. Login and complete Application, SBTET TS";
                //var tmp = com.SendSms(RegistrationMobile, msg, "1007166857328053980");
                //};
                HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt);
                return HttpResponse;
            }
            catch (Exception ex)   
            {
                PolycetdbHandler.SaveErorr("SP_Get_RegistrationMobileOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }

        public string Decrypt()
        {
            try
            {
                string textToDecrypt = "VtbM/yjSA2Q=";
                string ToReturn = "";
                string publickey = "santhosh";
                string privatekey = "engineer";
                byte[] privatekeyByte = { };
                privatekeyByte = System.Text.Encoding.UTF8.GetBytes(privatekey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = new byte[textToDecrypt.Replace(" ", "+").Length];
                inputbyteArray = Convert.FromBase64String(textToDecrypt.Replace(" ", "+"));
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateDecryptor(publickeybyte, privatekeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    Encoding encoding = Encoding.UTF8;
                    ToReturn = encoding.GetString(ms.ToArray());
                }
                return ToReturn;
            }
            catch (Exception ae)
            {
                throw new Exception(ae.Message, ae.InnerException);
            }
        }

    }
}