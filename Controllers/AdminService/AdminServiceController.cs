using Newtonsoft.Json;
using WebApplication1.Models;
using WebApplication1.Models.Database;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RestSharp;
using System.Drawing;
using System.IO;
using System.Drawing.Imaging;
using System.Xml;
using System.Configuration;
using System.Text;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using System.Web;

namespace WebApplication1.Controllers
{

   
    public class AdminServiceController : ApiController
    {

        [HttpGet, ActionName("GetUserTypes")]
        public HttpResponseMessage GetUserTypes()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_UserTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_UserTypes", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetRecentNews")]
        public string GetRecentNews()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_RecentNews";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_RecentNews", 0, ex.Message);
                throw ex;
            }
        }

        //[HttpGet, ActionName("AddRecentNews")]
        //public HttpResponseMessage AddRecentNews(string RecentNewsText, string FromDate, string ToDate,bool Active,string UserName)
        //{
        //    var dbHandler = new PolycetdbHandler();
        //    try
        //    {
        //        var param = new SqlParameter[5];
        //        param[0] = new SqlParameter("@RecentNewsText ", RecentNewsText);
        //        param[1] = new SqlParameter("@FromDate ", FromDate);
        //        param[2] = new SqlParameter("@ToDate ", ToDate);
        //        param[3] = new SqlParameter("@Active", Active);
        //        param[4] = new SqlParameter("@UserName ", UserName);
        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_RecentNews ", param);
        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("SP_Add_RecentNews ", 0, ex.Message);
        //        throw ex;
        //    }

        //}

        public class RecentNewsInfo
        {
            public int RecentNewsID { get; set; }
            public string RecentNewsText { get; set; }
            public string FromDate { get; set; }
            public string ToDate { get;set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("AddRecentNews")]
        public string AddRecentNews([FromBody] RecentNewsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@RecentNewsText", data.RecentNewsText);
                param[1] = new SqlParameter("@FromDate", data.FromDate);
                param[2] = new SqlParameter("@ToDate", data.ToDate);
                param[3] = new SqlParameter("@Active", data.Active);
                param[4] = new SqlParameter("@UserName", data.UserName);
             

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_RecentNews", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_RecentNews", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEditRecentNews")]
        public string GetEditRecentNews(int RecentNewsID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RecentNewsID", RecentNewsID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_RecentNews", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("UpdateRecentNews")]
        public string UpdateRecentNews([FromBody] RecentNewsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@RecentNewsID", data.RecentNewsID);
                param[1] = new SqlParameter("@RecentNewsText", data.RecentNewsText);
                param[2] = new SqlParameter("@FromDate", data.FromDate);
                param[3] = new SqlParameter("@ToDate", data.ToDate);
                param[4] = new SqlParameter("@Active", data.Active);
                param[5] = new SqlParameter("@UserName", data.UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_RecentNews", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_RecentNews", 0, ex.Message);
                return ex.Message;
            }
        }
        

       

      

        



   



        [HttpGet, ActionName("GetStates")]
        public string GetStates()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_States";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_States", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetCaptchaString10")]
        public string GetCaptchaString10()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {

                string strCaptchaString = "";
                //if (Captcha == null)
                //{

                int intZero = '0';
                int intNine = '9';
                int intA = 'A';
                int intZ = 'Z';
                int intCount = 0;
                int intRandomNumber = 0;
                //string strCaptchaString = "";

                Random random = new Random(System.DateTime.Now.Millisecond);

                while (intCount < 10)
                {
                    intRandomNumber = random.Next(intZero, intZ);
                    if (((intRandomNumber >= intZero) && (intRandomNumber <= intNine) || (intRandomNumber >= intA) && (intRandomNumber <= intZ)))
                    {
                        strCaptchaString = strCaptchaString + (char)intRandomNumber;
                        intCount = intCount + 1;
                    }
                }

                return strCaptchaString;

            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetCaptchaString")]
        public string GetCaptchaString(string SessionId)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string strCaptchaString = "";
                int intZero = '0';
                int intNine = '9';
                int intA = 'A';
                int intZ = 'Z';
                int intCount = 0;
                int intRandomNumber = 0;
                //string strCaptchaString = "";

                Random random = new Random(System.DateTime.Now.Millisecond);

                while (intCount < 5)
                {
                    intRandomNumber = random.Next(intZero, intZ);
                    if (((intRandomNumber >= intZero) && (intRandomNumber <= intNine) || (intRandomNumber >= intA) && (intRandomNumber <= intZ)))
                    {
                        strCaptchaString = strCaptchaString + (char)intRandomNumber;
                        intCount = intCount + 1;
                    }
                }
                SetSessionId(SessionId, strCaptchaString);
                var skyblue = System.Drawing.ColorTranslator.FromHtml("#1F497D");
                //var white = System.Drawing.ColorTranslator.FromHtml("linear-gradient(90deg, rgba(237,245,255,1) 0%, rgba(204,223,247,1) 100%)");
                string str = ConvertTextToImage(strCaptchaString, "sans-serif", 35, Color.White, skyblue, 250, 65).ToString();

                List<person> p = new List<person>();
                person p1 = new person();

                p1.Image = str;
                //p1.Text = strCaptchaString;
                p.Add(p1);

                return JsonConvert.SerializeObject(p);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetDistricts")]
        public string GetDistricts(int StateID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@StateID", StateID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Districts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetMandals")]
        public HttpResponseMessage GetMandals([FromBody] MandalInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", data.DistrictID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Mandals", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Mandals", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        public class CentresInfo{
        
            public string DistrictID { get; set; }
        }

        [HttpPost, ActionName("GetCoordinatingCentres")]
        public HttpResponseMessage GetCoordinatingCentres([FromBody] CentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", data.DistrictID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_MultipleDistrictCoordinatingCentres", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_MultipleDistrictCoordinatingCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetDistCoordinatingCenters")]
        public string GetDistCoordinatingCenters(int DistrictID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_DistrictCoordinatingCentres", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetDistrictCoordinators")]
        public string GetDistrictCoordinators(string DistrictID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_DistrictCoordinators", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("AddDistCoordinatingCentre")]
        public string AddDistCoordinatingCentre(string CentreCode, string CentreName, string CentreAddress, int StateID, int DistrictID,string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@CentreCode", CentreCode);
                param[1] = new SqlParameter("@CentreName", CentreName);
                param[2] = new SqlParameter("@CentreAddress", CentreAddress);
                param[3] = new SqlParameter("@StateID", StateID);
                param[4] = new SqlParameter("@DistrictID", DistrictID);
                //param[5] = new SqlParameter("@Active", Active);
                param[5] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_DistrictCoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_DistrictCoordinatingCentre", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetEditDetails")]
        public string GetEditDetails(int CentreID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CentreID", CentreID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_DistrictCoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEditDistCoordinatorDetails")]
        public string GetEditDistCoordinatorDetails(int CoordinatorID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CoordinatorID", CoordinatorID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_DistrictCoordinators", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public class UpdateCentresInfo
        {
            public int CentreID { get; set; }
            public string CentreCode { get; set; }
            public string CentreName { get; set; }
            public string CentreAddress { get; set; }
            public int StateID { get; set; }
            public int DistrictID { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("UpdateDistCoorCentres")]
        public string UpdateDistCoorCentres([FromBody] UpdateCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@CentreID", data.CentreID);
                param[1] = new SqlParameter("@CentreCode", data.CentreCode);
                param[2] = new SqlParameter("@CentreName", data.CentreName);
                param[3] = new SqlParameter("@CentreAddress", data.CentreAddress);
                param[4] = new SqlParameter("@StateID", data.StateID);
                param[5] = new SqlParameter("@DistrictID", data.DistrictID);
                param[6] = new SqlParameter("@Active", data.Active);
                param[7] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_DistrictCoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_DistrictCoordinatingCentre", 0, ex.Message);
                return ex.Message;
            }
        }

        public class UpdateCoordinatorsInfo
        {
            public int CoordinatorID { get; set; }
            public string CoordinatorName { get; set; }
            public string CoordinatorMobile { get; set; }
            public string CoordinatorEmail { get; set; }
            public int CentreID { get; set; }
            public int StateID { get; set; }
            public string DistrictID { get; set; }
            public string MandalID { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("UpdateDistCoordinators")]
        public string UpdateDistCoordinators([FromBody] UpdateCoordinatorsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@CoordinatorID", data.CoordinatorID);
                param[1] = new SqlParameter("@CoordinatorName", data.CoordinatorName);
                param[2] = new SqlParameter("@CoordinatorMobile", data.CoordinatorMobile);
                param[3] = new SqlParameter("@CoordinatorEmail", data.CoordinatorEmail);
                param[4] = new SqlParameter("@CentreID", data.CentreID);
                param[5] = new SqlParameter("@StateID", data.StateID);
                param[6] = new SqlParameter("@DistrictID", data.DistrictID);
                param[7] = new SqlParameter("@MandalID", data.MandalID);
                param[8] = new SqlParameter("@Active", data.Active);
                param[9] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_DistrictCoordinators", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_DistrictCoordinators", 0, ex.Message);
                return ex.Message;
            }
        }

        public class CoordinatorsInfo
        {
            public string CoordinatorName { get; set; }
            public string CoordinatorMobile { get; set; }
            public string CoordinatorEmail { get; set; }
            public int CentreID { get; set; }
            public int StateID { get; set; }
            public string DistrictID { get; set; }
            public string MandalID { get; set; }
            public string UserName { get; set; }



        }

        [HttpPost, ActionName("AddDistrictCoordinators")]
        public string AddDistrictCoordinators([FromBody] CoordinatorsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@CoordinatorName", data.CoordinatorName);
                param[1] = new SqlParameter("@CoordinatorMobile", data.CoordinatorMobile);
                param[2] = new SqlParameter("@CoordinatorEmail", data.CoordinatorEmail);
                param[3] = new SqlParameter("@CentreID", data.CentreID);
                param[4] = new SqlParameter("@StateID", data.StateID);
                param[5] = new SqlParameter("@DistrictID", data.DistrictID);
                param[6] = new SqlParameter("@MandalID", data.MandalID);
                param[7] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_DistrictCoordinator", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_DistrictCoordinator", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpGet, ActionName("SetSessionId")]
        public string SetSessionId(string SessionId, string Captcha)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {

                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@SessionId", SessionId);
                param[1] = new SqlParameter("@Captcha", Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_ExamsCaptchaSessionLog", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_SET_ExamsCaptchaSessionLog", 0, ex.Message);
                return ex.Message;
            }
        }


        public string ConvertTextToImage(string txt, string fontname, int fontsize, Color bgcolor, Color fcolor, int width, int Height)
        {
            Bitmap bmp = new Bitmap(width, Height);
            using (Graphics graphics = Graphics.FromImage(bmp))
            {

                Font font = new Font(fontname, fontsize);
                graphics.FillRectangle(new SolidBrush(bgcolor), 0, 0, bmp.Width, bmp.Height);
                graphics.DrawString(txt, font, new SolidBrush(fcolor), 0, 0);
                graphics.Flush();
                font.Dispose();
                graphics.Dispose();


            }
            Bitmap bImage = bmp;  // Your Bitmap Image
            System.IO.MemoryStream ms = new MemoryStream();
            bImage.Save(ms, ImageFormat.Jpeg);
            byte[] byteImage = ms.ToArray();
            var SigBase64 = Convert.ToBase64String(byteImage);
            return SigBase64;

        }



        [HttpPost, ActionName("ValidateCaptcha")]
        public string ValidateCaptcha(JsonObject data)
        {
            var dbHandler = new PolycetdbHandler();
            List<Output> p = new List<Output>();
            Output p1 = new Output();
            var captcha = string.Empty;
            try
            {


                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@SessionId", data["SessionId"]);
                param[1] = new SqlParameter("@Captcha", data["Captcha"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_ExamsCaptchaSessionLog", param);

                if (dt.Rows[0]["ResponseCode"].ToString() == "200")
                {
                    captcha = GetCaptchaString(data["SessionId"].ToString());
                    p1.ResponceCode = dt.Rows[0]["ResponseCode"].ToString();
                    p1.ResponceDescription = dt.Rows[0]["ResponseDescription"].ToString();
                    p1.Captcha = captcha;
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);

                }
                else
                {
                    captcha = GetCaptchaString(data["SessionId"].ToString());
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = dt.Rows[0]["ResponseDescription"].ToString();
                    p1.Captcha = captcha;
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }

            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_GET_ExamsCaptchaSessionLog", 0, ex.Message);
                captcha = GetCaptchaString(data["SessionId"].ToString());
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p1.Captcha = captcha;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
                //return ex.Message;
            }
        }
        internal class Output
        {
            public string ResponceCode { get; internal set; }
            public string ResponceDescription { get; internal set; }
            public string Captcha { get; internal set; }
        }


//        [HttpPost, ActionName("GetCasteDetails")]
//        public async Task<HttpResponseMessage> GetCasteDetails([FromBody] SscDetails ReqData)
//        {

//            var url = ConfigurationManager.AppSettings["MEESEVA_API"].ToString();
//            var urlwithparam = url + "?Applno=" + ReqData.Applno + "&Aadhar_no=" + ReqData.Aadhar_no;
//            using (HttpClient client = new HttpClient())
//            {
//                try
//                {
//                    HttpResponseMessage response = new HttpResponseMessage();
//                    var resMsg = await client.GetAsync(urlwithparam);
//                    var content = await resMsg.Content.ReadAsStringAsync();
//                    XmlDocument PIDResponseXML = new XmlDocument();
//                    PIDResponseXML.LoadXml(content);

//                    if (PIDResponseXML.InnerXml.Length != 22)
//{
//                        XDocument d = XDocument.Parse(content);
//                        d.Root.Descendants().Attributes().Where(x => x.IsNamespaceDeclaration).Remove();

//                        foreach (var elem in d.Descendants())
//                            elem.Name = elem.Name.LocalName;

//                        var xmlDocument = new XmlDocument();
//                        xmlDocument.Load(d.CreateReader());
//                         var res =xmlDocument.InnerText.ToString();
//                        //return xmlDocument;
//                        try
//                        {
//                          //  var json = JsonConvert.SerializeXmlNode(PIDResponseXML, Formatting.None, true);
//                            var jsonData = JsonConvert.SerializeXmlNode(PIDResponseXML, Newtonsoft.Json.Formatting.None, true);
//                            return Request.CreateResponse(HttpStatusCode.OK, res);
//                        }
//                        catch (Exception ex)
//                        {
//                            var jsonData = JsonConvert.SerializeXmlNode(PIDResponseXML, Newtonsoft.Json.Formatting.None, true);
//                            return Request.CreateResponse(HttpStatusCode.OK, jsonData);
//                        }

//                        //if (RESULT == "PASS")
//                        //{
//                        //    response = Request.CreateResponse(HttpStatusCode.OK);
//                        //    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"200\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
//                        //    return response;
//                        //}
//                        //else
//                        //{
//                        //    response = Request.CreateResponse(HttpStatusCode.OK);
//                        //    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
//                        //    return response;
//                        //}
//                    }
//                    else
//                    {
//                        response = Request.CreateResponse(HttpStatusCode.OK);
//                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"No Data Found\" }"), System.Text.Encoding.UTF8, "application/json");
//                        return response;
//                    }

//                }
//                catch (Exception ex)
//                {
//                    var response = Request.CreateResponse(HttpStatusCode.NotFound);
//                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
//                    return response;
//                }

//            }
//        }

        public class SscDetails
        {
            public string Applno { get; set; }
            public string Aadhar_no { get; set; }
        }

        [HttpGet, ActionName("GetNotifications")]
        public string GetNotifications()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Notifications";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_Notifications", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetPolycetYears")]
        public string GetPolycetYears()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_PolycetYears";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_PolycetYears", 0, ex.Message);
                return ex.Message;
            }
        }


        public class PolycetYearData
        {
            public int PolycetYear { get; set; }
            public bool CurrentPolycetYear { get; set; }      
            public string UserName { get; set; }

        }


        [HttpPost, ActionName("AddPolycetYear")]
        public string AddPolycetYear([FromBody] PolycetYearData data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@PolycetYear", data.PolycetYear);
                param[1] = new SqlParameter("@CurrentPolycetYear", data.CurrentPolycetYear);
                param[2] = new SqlParameter("@UserName", data.UserName);
               

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_PolycetYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_PolycetYear", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetEditPolycetYear")]
        public string GetEditPolycetYear(int PolycetYearID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@PolycetYearID", PolycetYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_PolycetYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public class UpdatePolycetYearInfo
        {
            public int PolycetYearID { get; set; }
          
            public int PolycetYear { get; set; }
            public bool CurrentPolycetYear { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("UpdatePolycetYear")]
        public string UpdatePolycetYear([FromBody] UpdatePolycetYearInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@PolycetYearID", data.PolycetYearID);
                param[1] = new SqlParameter("@PolycetYear", data.PolycetYear);
                param[2] = new SqlParameter("@CurrentPolycetYear", data.CurrentPolycetYear);
                param[3] = new SqlParameter("@Active", data.Active);
                param[4] = new SqlParameter("@UserName", data.UserName);
           

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_PolycetYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_PolycetYears", 0, ex.Message);
                return ex.Message;
            }
        }

    }
}