using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models.Security
{
    public class AuthToken
    {
        
        public int UserTypeID { get; set; }

        public int UserID { get; set; }


        public DateTime ExpiryDate { get; set; }
    }
}