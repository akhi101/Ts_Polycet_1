define([], function () {

    return {

        routes: {

            'index': {
                url: "/index",
                templateUrl: 'app/views/index.html',
                dependencies: ['controllers/IndexController', 'services/AdminService/AdminService']
            },

          

            //'default': {
            //    url: "/default",
            //    templateUrl: 'app/views/Default.html',
            //    dependencies: ['controllers/DefaultController']
            //},



            'index.Registration': {
                url: "/Registration",
                templateUrl: 'app/views/Register/Registration.html',
                dependencies: ['controllers/Register/RegistrationController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService', 'services/BillDesk/paymentService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            },

            'index.PaymentResponse': {
                url: "/PaymentResponse/:data",
                templateUrl: 'app/views/PaymentResponse.html',
                dependencies: ['controllers/PaymentResponseController', 'services/BillDesk/paymentService']
            },

            'index.Application': {
                url: "/Application",
                templateUrl: 'app/views/Application.html',
                dependencies: ['controllers/ApplicationController', 'services/StudentRegistration/StudentRegistrationService']
            },

            'index.Login': {
                url: "/Login",
                templateUrl: 'app/views/Login.html',
                dependencies: ['controllers/LoginController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService']
            },

            'index.OfficialsLogin': {
                url: "/OfficialsLogin",
                templateUrl: 'app/views/OfficialsLogin.html',
                dependencies: ['controllers/OfficialsLoginController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService']
            },


            'index.ForgotPage': {
                url: "/ForgotPage",
                templateUrl: 'app/views/ForgotPage.html',
                dependencies: ['controllers/ForgotPageController', 'services/StudentRegistration/StudentRegistrationService', 'services/ForgotPasswordService/ForgotPasswordService']
            },

            'Dashboard': {
                url: "/Dashboard",
                templateUrl: 'app/views/Dashboard.html',
                dependencies: ['controllers/DashboardController',  'services/SystemAdministrator/SystemUserService']
            },

          

            'Dashboard.DistrictCordCentres': {
                url: "/DistrictCordCentres",
                templateUrl: 'app/views/DistrictCordColleges.html',
                dependencies: ['controllers/DistrictCordCollegesController', 'services/AdminService/AdminService']
            },

            'Dashboard.DistrictCoordinators': {
                url: "/DistrictCoordinators",
                templateUrl: 'app/views/DistrictCoordinators.html',
                dependencies: ['controllers/DistrictCoordinatorsController', 'services/AdminService/AdminService']
            },



            'Dashboard.Settings': {
                url: "/Settings",
                templateUrl: 'app/views/MasterSettings/MasterSettings.html',
                dependencies: ['controllers/MasterSettings/MasterSettingsController', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.Settings.RecentNews': {
                url: "/RecentNews",
                templateUrl: 'app/views/MasterSettings/RecentNews.html',
                dependencies: ['controllers/MasterSettings/RecentNewsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.Circulars': {
                url: "/Circulars",
                templateUrl: 'app/views/Circulars/Circulars.html',
                dependencies: ['controllers/Circulars/CircularsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.ModulesSettings': {
                url: "/ModulesSettings",
                templateUrl: 'app/views/MasterSettings/ModulesSetting.html',
                dependencies: ['controllers/MasterSettings/ModulesSettingController', 'services/AdminService/AdminService', 'services/MasterSettings/MasterSettingsService']

            },


            'Dashboard.Settings.PolycetYears': {
                url: "/PolycetYears",
                templateUrl: 'app/views/MasterSettings/PolycetYears.html',
                dependencies: ['controllers/MasterSettings/PolycetYearsController', 'services/AdminService/AdminService']
            },


            'Dashboard.Settings.FeeAmounts': {
                url: "/FeeAmounts",
                templateUrl: 'app/views/MasterSettings/FeeAmounts.html',
                dependencies: ['controllers/MasterSettings/FeeAmountsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.DatesSettings': {
                url: "/DatesSettings",
                templateUrl: 'app/views/MasterSettings/DatesSettings.html',
                dependencies: ['controllers/MasterSettings/DatesSettingsController', 'services/AdminService/AdminService']
            },

         
        }
    }
});