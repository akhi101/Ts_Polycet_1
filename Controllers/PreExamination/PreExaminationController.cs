using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
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

        private string GetWebAppRoot()
        {
            var env = ConfigurationManager.AppSettings["SMS_ENV"].ToString();
            string host = (HttpContext.Current.Request.Url.IsDefaultPort) ?
               HttpContext.Current.Request.Url.Host :
               HttpContext.Current.Request.Url.Authority;
            if (env == "PROD")
            {
                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + "/";
            }
            else if (env == "DEV")
            {

                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + HttpContext.Current.Request.ApplicationPath;
            }
            return host + "/";
        }


        public class CircularData
        {
            public string NotificationText { get; set; }
            public string NotificationFilePath { get; set; }
            public string CircularFileName { get; set; }
            public DateTime NotificationDate { get; set; }
            public string UserName { get; set; }

        }


        [HttpPost, ActionName("AddNotification")]
        public HttpResponseMessage AddNotification([FromBody] CircularData CircularData)
        {
            try
            {

                var NotificationFilePath = string.Empty;
                string relativePath = string.Empty;
                var path = ConfigurationManager.AppSettings["circularPath"];
                var CircularName = Guid.NewGuid().ToString() + ".pdf";
                bool folder = Directory.Exists(path);
                if (!folder)
                    Directory.CreateDirectory(path);
                string CircularPath = Path.Combine(path, CircularName);

                byte[] PrincipalimageBytes = Convert.FromBase64String(CircularData.NotificationFilePath);
                File.WriteAllBytes(CircularPath, PrincipalimageBytes);
                relativePath = CircularPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                NotificationFilePath = relativePath;

                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@NotificationText", CircularData.NotificationText);
                param[1] = new SqlParameter("@NotificationFilePath", NotificationFilePath);
                param[2] = new SqlParameter("@NotificationDate", CircularData.NotificationDate);
                param[3] = new SqlParameter("@UserName", CircularData.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Notification", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Notification", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}