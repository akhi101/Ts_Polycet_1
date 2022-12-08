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
                dependencies: ['controllers/Register/RegistrationController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService', 'services/BillDesk/paymentService', 'services/SystemAdministrator/SystemUserService','services/PreExamination/PreExaminationService']
            },

            'index.PaymentResponse': {
                url: "/PaymentResponse/:data",
                templateUrl: 'app/views/PaymentResponse.html',
                dependencies: ['controllers/PaymentResponseController','services/BillDesk/paymentService']
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
                dependencies: ['controllers/ForgotPageController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService']
            },

            'Dashboard': {
                url: "/Dashboard",
                templateUrl: 'app/views/Dashboard.html',
                dependencies: ['controllers/DashboardController', 'services/StudentRegistration/StudentRegistrationService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.DistrictCordColleges': {
                url: "/DistrictCordColleges",
                templateUrl: 'app/views/DistrictCordColleges.html',
                dependencies: ['controllers/DistrictCordCollegesController', 'services/AdminService/AdminService']
            },

            'Dashboard.DistrictCoordinators': {
                url: "/DistrictCoordinators",
                templateUrl: 'app/views/DistrictCoordinators.html',
                dependencies: ['controllers/DistrictCoordinatorsController', 'services/StudentRegistration/StudentRegistrationService']
            },

            

         
        }
    }
});