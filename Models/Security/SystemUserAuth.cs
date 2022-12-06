using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models.Security
{
    public class SystemUserAuth
    {
        public List<SystemUser> SystemUser { get; internal set; }

        public List<UserAuth> UserAuth { get; internal set; }

    }
}