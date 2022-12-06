using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class SystemModules
    {
        public string ModuleName { get; set; }
        public string ModuleRouteName { get; set; }
        public string ModuleCardClassName { get; set; }
        public int ModuleID { get; set; }

        public int UserTypeID { get; set; }
    }

    public class SystemSubModules
    {
        public string SubModuleName { get; set; }
        public string SubModuleRouteName { get; set; }
        public string ModuleCardClassName { get; set; }
        public int ModuleID { get; set; }

        public int UserTypeID { get; set; }

    }

}