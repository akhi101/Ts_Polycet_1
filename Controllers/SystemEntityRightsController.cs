using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.BLL;
using Newtonsoft.Json;
using WebApplication1.Controllers.Common;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class SystemEntityRightsController : BaseController
    {
        public string GetUserModules(int UserTypeID)
        {
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            IEnumerable<SystemModules> SystemGroups = SystemUserBLL.GetUserModules(UserTypeID);
            return JsonConvert.SerializeObject(SystemGroups);
        }

        public string GetUserSubModules(int UserTypeID, int ModuleID)
        {
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            IEnumerable<SystemSubModules> SystemGroups = SystemUserBLL.GetUserSubModules(UserTypeID, ModuleID);
            return JsonConvert.SerializeObject(SystemGroups);
        }

    }
}
