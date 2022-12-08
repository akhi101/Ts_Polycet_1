using SoftwareSuite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;

namespace WebApplication1
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start()
        {

            GlobalConfiguration.Configure(WebAPIConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }


    }
    //public class WebApiApplication : System.Web.HttpApplication
    //{
    //    protected void Application_BeginRequest()
    //    {
    //        Response.AddHeader("X-Frame-Options", "DENY");
    //        HttpContext.Current.Request.Headers.Add("X-Content-Type-Options", "nosniff");
    //        //Response.AddHeader("X-Content-Type-Options", "DENY");
    //        //Response.AddHeader("X-Frame-Options", "DENY");
    //        //Response.AddHeader("X-Frame-Options", "DENY");
    //        Response.Headers.Remove("Server");
    //        Response.Headers.Remove("X-AspNet-Version");
    //        Response.Headers.Remove("X-AspNetMvc-Version");
    //        //Response.Headers.Remove("X-AspNet-Version");
    //    }
    //    protected void Application_Start()
    //    {
    //        AreaRegistration.RegisterAllAreas();
    //        GlobalConfiguration.Configure(WebApiConfig.Register);
    //        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
    //        RouteConfig.RegisterRoutes(RouteTable.Routes);
    //    }
    //}
}