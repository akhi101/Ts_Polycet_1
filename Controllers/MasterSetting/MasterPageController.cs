using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using WebApplication1.Models.Database;
using Newtonsoft.Json;

namespace WebApplication1.Controllers.MasterSetting
{
    public class MasterPageController: BaseController
    {
        [HttpGet, ActionName("GetAllModules")]
        public string GetAllModules()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Modules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Modules", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("GetModuleColours")]
        public string GetModuleColours()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_GetColours";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_GetColours", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("GetUserModules")]
        public string GetUserModules(int UserTypeID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AllUserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAllSubModules")]
        public string GetAllSubModules()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Temp_Get_AllSubModules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Temp_Get_AllSubModules", 0, ex.Message);
                throw ex;
            }
        }

        public class ModuleInfo
        {
            public string ModuleName { get; set; }
            public string ModuleRouteName { get; set; }
            public int ModuleCardColourID { get; set; }
            public string UserName { get; set; }
            public int UserTypeID { get; set; }
            public int ModuleID { get; set; }
            public int ModuleOrder { get; set; }
            public bool Active { get; set; }
        }

        [HttpPost, ActionName("AddModule")]
        public string AddModule([FromBody] ModuleInfo data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ModuleName", data.ModuleName);
                param[1] = new SqlParameter("@ModuleRouteName", data.ModuleRouteName);
                param[2] = new SqlParameter("@ModuleCardColourID", data.ModuleCardColourID);
                param[3] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Module", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Module", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetEditModules")]
        public string GetEditModules(int ModuleID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Modules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("UpdateModules")]
        public string UpdateModules([FromBody] ModuleInfo data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@ModuleID", data.ModuleID);
                param[1] = new SqlParameter("@ModuleName", data.ModuleName);
                param[2] = new SqlParameter("@ModuleRouteName", data.ModuleRouteName);
                param[3] = new SqlParameter("@ModuleCardColourID", data.ModuleCardColourID);
                param[4] = new SqlParameter("@ModuleOrder", data.ModuleOrder);
                param[5] = new SqlParameter("@Active", data.Active);
                param[6] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_Modules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_Modules", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("AddUserModule")]
        public string AddUserModule([FromBody] ModuleInfo data)
        {

            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[1] = new SqlParameter("@ModuleID", data.ModuleID);
                param[2] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_UserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_UserModules", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetSubModules")]
        public string GetSubModules(int ModuleID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_SubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_SubModules", 0, ex.Message);
                throw ex;
            }
        }


        public class SubModuleInfo
        {
            public string SubModuleName { get; set; }
            public string SubModuleRouteName { get; set; }
            public int ModuleCardColourID { get; set; }
            public string UserName { get; set; }
            public int UserTypeID { get; set; }
            public int SubModuleID { get; set; }
            public int ModuleID { get; set; }
        }

        [HttpPost, ActionName("AddSubModules")]
        public string AddSubModules([FromBody] SubModuleInfo data)
        {
            try
            {

                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ModuleID", data.ModuleID);
                param[1] = new SqlParameter("@SubModuleName", data.SubModuleName);
                param[2] = new SqlParameter("@SubModuleRouteName", data.SubModuleRouteName);
                param[3] = new SqlParameter("@ModuleCardColourID", data.ModuleCardColourID);
                param[4] = new SqlParameter("@UserName", data.UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_SubModule", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_SubModule", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddUserSubModules")]
        public string AddUserSubModules([FromBody] SubModuleInfo data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[1] = new SqlParameter("@ModuleID", data.ModuleID);
                param[2] = new SqlParameter("@SubModuleID", data.SubModuleID);
                param[3] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_UserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_UserSubModules", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetUserSubModules")]
        public string GetUserSubModules(int UserTypeID, int ModuleID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AllUserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_AllUserSubModules", 0, ex.Message);
                throw ex;
            }
        }

    }
}