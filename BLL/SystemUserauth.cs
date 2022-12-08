using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace WebApplication1.Models
{
    public class SystemUser
    {

        public int InstitutionID { get; set; }
        public string InstitutionCode { get; set; }
        public string InstitutionName { get; set; }

        public int UserTypeID { get; set; }

        public int UserID { get; set; }


        public int CourseID { get; set; }

        public int AcademicYearID { get; set; }

        public int Batch { get; set; }








    }

    public class UserAuth
    {
        public string ResponceCode { get; set; }
        public string RespoceDescription { get; set; }
    }

    public class ReCaptcha
    {
        public bool Success { get; set; }
        public float score { get; set; }

    }




}

