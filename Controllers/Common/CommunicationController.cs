using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Http;
//using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Data.SqlClient;
using WebApplication1.Models.Database;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using WebApplication1.Models;

namespace WebApplication1.Controllers.Common
{
    public class CommunicationController : ApiController
    {
        [HttpGet, ActionName("SendSms")]
        public async Task<string> SendSms(string mobile, string message, string templateid)
        {
            var env = ConfigurationManager.AppSettings["SMS_ENV"].ToString();
            try
            {
                ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => { return true; };
                if (env == "PROD")
                {
                    var url = ConfigurationManager.AppSettings["SMS_URL"].ToString();
                    var smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString().Trim();
                    var smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString().Trim();
                    // var url = "http://smsgw.sms.gov.in/failsafe/HttpLink";
                    var client = new HttpClient();
                    var res = await client.GetAsync(url + $"?username={smsusername}&pin={smspassword}&mnumber={mobile}&message={HttpUtility.UrlEncode(message)}&signature=TSBTET&dlt_template_id={templateid}&dlt_entity_id=1001451340000019208");
                    var resContent = await res.Content.ReadAsStringAsync();
                    return resContent;

                }
                else if (env == "DEV")
                {
                    var url1 = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var client = new HttpClient();
                    var res = await client.GetAsync(url1 + $"?mobile={mobile}&message={HttpUtility.UrlEncode(message)}&templateid={templateid}");
                    var resContent = await res.Content.ReadAsStringAsync();
                    return resContent;
                }
                return "Not Supported Environment";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpPost, ActionName("SendMail")]
        public async Task<string> SendMail([FromBody] MailRequest request)
        {
            try
            {
                var message = new MimeMessage();

                SmtpClient smtp = new SmtpClient();
                smtp.Connect("smtp.mail.gov.in", 465, SecureSocketOptions.Auto);
                smtp.Timeout = 200000;

                message.From.Add(new MailboxAddress(request.From));
                message.To.Add(new MailboxAddress(request.To));
                message.Subject = request.Subject;
                var builder = new BodyBuilder { HtmlBody = request.Message };
                if (request.attachmentdata != "Attachment")
                {
                    builder.Attachments.Add(request.attachmentdata);
                }
                message.Body = builder.ToMessageBody();

                var mailusername = ConfigurationManager.AppSettings["mail_Service_Username"].ToString().Trim();
                var mailpassword = ConfigurationManager.AppSettings["mail_Service_Password"].ToString().Trim();

                smtp.Authenticate(mailusername, mailpassword);
                smtp.Send(message);

                smtp.Disconnect(true);
                // smtp.Send(message);
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}
