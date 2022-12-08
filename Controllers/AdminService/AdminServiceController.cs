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
using System.Threading.Tasks;
using System.Linq;
using System.Net.Http.Headers;

namespace WebApplication1.Controllers
{

   
    public class AdminServiceController : ApiController
    {
        public string RequestURI { get; private set; }

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

                dbHandler.SaveErorr("SP_Get_States", 0, ex.Message);
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
                dbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
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
                dbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
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

        [HttpGet, ActionName("GetDistCoordinatingCenters")]
        public string GetDistCoordinatingCenters(int DistrictID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);

                var dt = dbHandler.ReturnDataSet("SP_Get_DistrictCoordinatingCentres", param);
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


                var dt = dbHandler.ReturnDataSet("SP_Add_DistrictCoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_DistrictCoordinatingCentre", 0, ex.Message);
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

                var dt = dbHandler.ReturnDataSet("SP_Update_DistrictCoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_DistrictCoordinatingCentre", 0, ex.Message);
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
                dbHandler.SaveErorr("USP_SET_ExamsCaptchaSessionLog", 0, ex.Message);
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
                var dt = dbHandler.ReturnDataSet("USP_GET_ExamsCaptchaSessionLog", param);

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
                dbHandler.SaveErorr("USP_GET_ExamsCaptchaSessionLog", 0, ex.Message);
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


        [HttpPost, ActionName("GetCasteDetails")]
        public async Task<HttpResponseMessage> GetCasteDetails([FromBody] CasteDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["MEESEVA_API"].ToString();
            //var urlwithparam = url + "?applicationNo=" + ReqData.applicationNo + "&userid=" + ReqData.userid;
            //using (HttpClient client = new HttpClient())

                HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.PostAsJsonAsync(RequestURI, ReqData).Result;
            return response;
           
        }

       

        public class CasteDetails
        {
            public string applicationNo { get; set; }
            public string userid { get; set; }
        }
    }

   


}