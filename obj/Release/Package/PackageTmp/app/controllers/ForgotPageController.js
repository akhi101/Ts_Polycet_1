﻿define(['app'], function (app) {
    app.controller("ForgotPageController", function ($scope, AdminService, StudentRegistrationService, ForgotPasswordService, $crypto, $scope,$crypto) {
        const $ctrl = this;
            $ctrl.$onInit = () => {
                $scope.sendotp = true;
                $scope.enterotp = false;
                $scope.PhoneNum = false;
                $scope.verifyotp = false;
                $scope.ResendLink = false;
                $scope.phonenoupdated = false;
                $scope.OtpVerified = false;

            }

        
        $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')

        var captcha = AdminService.GetCaptchaString($scope.SessionCaptcha);
        captcha.then(function (response) {
            try {
                var res = JSON.parse(response);
                $scope.GetCatcha = res[0].Text;
                $scope.CaptchaImage = res[0].Image;

            } catch (err) {
                $scope.GetCatcha = ''
            }
        }, function (error) {
            $scope.GetCatcha = ''
            alert('Unable to load Captcha')
        });

        $scope.GetCaptchaData = function () {
            var captcha = AdminService.GetCaptchaString($scope.SessionCaptcha);
            captcha.then(function (response) {
                try {
                    var res = JSON.parse(response);
                    $scope.GetCatcha = res[0].Text;
                    $scope.CaptchaImage = res[0].Image;

                } catch (err) {
                    $scope.GetCatcha = ''
                }
            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }



        $scope.ValidateCaptcha = function () {
            var captcha = AdminService.ValidateCaptcha($scope.SessionCaptcha, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }


        $scope.ResStatus = 0;
        $scope.SendSms = function (MobileNumber) {

            $scope.MobileNumber = MobileNumber;
            //$scope.StudentName = StudentName;

            //if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
            //    alert('Please enter Student name');
            //    return;
            //}

            if (angular.isUndefined(MobileNumber) || MobileNumber == "" || MobileNumber == null) {
                alert('please Enter Mobile number');
                return;
            }

            //if (angular.isUndefined(AadharNo) || AadharNo == "" || AadharNo == null) {
            //    alert('please Enter Aadhar number');
            //    return;
            //}
            //$scope.loading = true;
           $scope.PhoneNum = true;
            $scope.aadharbox = true;

            $scope.enterotp = true;
            $scope.verifyotp = true;
            $scope.sendotp = false;
            $scope.phonenoupdated = false;
            //var AadharNo = '123456789456'
            var SendSms = StudentRegistrationService.SendSms(MobileNumber, 'default')
            SendSms.then(function (response) {
                let res = response[0];
                $scope.loading = false;
                if (res.StatusCode == '200') {
                    $scope.ResStatus = res.StatusCode;
                    alert("Otp sent successfully.");
                    $scope.sendotp = false;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = true;
                    $scope.ResendLink = true;
                    $scope.verifyotp = true;


                } else if (res.StatusCode == '400') {
                    $scope.ResStatus = res.StatusCode;
                    alert(res.StatusDescription);
                    $scope.sendotp = true;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = false;
                    $scope.verifyotp = false;
                    $scope.loading = false;




                } else {
                    alert("Otp Sending Failed")
                    $scope.sendotp = true;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = false;
                    $scope.verifyotp = false;
                    $scope.loading = false;

                }

            }, function (err) {

                $scope.sendotp = true;
                $scope.phonenoupdated = false;
                $scope.enterotp = false;
                $scope.verifyotp = false;
                $scope.loading = false;

            });



        }


        var count = 0;
        $scope.ResendOtp = function () {
            if (count < 3) {


                $scope.SendSms($scope.MobileNumber,'default');
                if ($scope.ResStatus == 200)
                    count++;

                else if ($scope.ResStatus == 400)
                    alert('Otp Sent Less than 30 seconds');
                else
                    $scope.ResendLink = false;
                /*alert('')*/

            }
        }

        $scope.VerifyMobileOtp = function (MobileNumber, MobileOTP) {
            $scope.MobileOTP = MobileOTP;


            if (MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
                alert('please Enter Mobile number');
                return;
            }

            //if ($scope.AadharNo == undefined || $scope.AadharNo == "" || $scope.AadharNo == null) {
            //    alert('please Enter Aadhar number');
            //    return;
            //}

            //if ($scope.StudentName == undefined || $scope.StudentName == "" || $scope.StudentName == null) {
            //    alert('Please enter Student name');
            //    return;
            //}

            if ($scope.MobileOTP == undefined || $scope.MobileOTP == "" || $scope.MobileOTP == null) {
                alert('please Enter OTP.');
                return;
            }
            //var AadharNo = '123456789456'
            var VerifyMobileOtp = StudentRegistrationService.VerifyMobileOtp(MobileNumber, 'default', MobileOTP)
            VerifyMobileOtp.then(function (response) {
                let VerRes = response[0];
                if (VerRes.StatusCode == '200') {
                    alert("Success");
                    $scope.OtpVerified = true;
                    $scope.enterotp = false;
                    $scope.verifyotp = false;
                    $scope.sendotp = false;
                    $scope.phonenoupdated = true;



                } else if (VerRes.StatusCode == '400') {
                    alert(VerRes.StatusDescription);
                    $scope.OtpVerified = false;
                    $scope.phonenoupdated = false;
                    $scope.sendotp = true;


                }

                else {
                    alert("Otp Verification Failed")
                    $scope.OtpVerified = false;
                    $scope.phonenoupdated = false;
                    $scope.sendotp = false;

                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.Submit = function () {
            $scope.Smsbtndisable = true;



            //if (($scope.CcicForgetPassword.UserName == undefined) || ($scope.CcicForgetPassword.UserName == "")) {
            //    alert("Enter Username");
            //    return false;
            //}

            if (($scope.MobileNumber == undefined) || ($scope.MobileNumber == "")) {
                alert("Enter Mobile Number");
                return false;
            }
            if (($scope.MobileNumber.length < 10) || ($scope.MobileNumber.length > 10)) {
                alert("Invalid Mobile Number");
                return false;
            }
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                return;
            };
            //$scope.UserID = 0;
            //$scope.ShowLoading = true;
             //var reqdata = $crypto.encrypt($crypto.encrypt($scope.MobileNumber, 'HBSBP9214EDU00TS'), sessionStorage.Ekey) + '$$@@$$' + sessionStorage.Ekey;
            let reqdata = $crypto.encrypt($scope.MobileNumber, sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            //var reqdata = $crypto.encrypt($scope.Login.UserPassword, $scope.LoginEKey)
            var getPromise = ForgotPasswordService.GetForgotPassword(reqdata);
            getPromise.then(function (data) {
                try {
                    var res = JSON.parse(data);

                } catch (ex) {
                }
                if (res.status == "200") {
                    $scope.Smsbtndisable = false;
                    //$scope.ShowLoading = false;

                    var Message = "Dear Sir//Madam, Your Login Credentials: UserPassword= " + data[0].UserPassword + " SBTETTS";
                    //var Urlstring = "?User=sbtetts&Passwd=sbtet@1972&Sid=SBTETS&Mobilenumber=91" + data[0].CellNo + "&Message=" + Message + "&Mtype=N&DR`=Y";
                    //  var FinalURL= AppSettings.SMSApiUrl + Urlstring;

                    alert("Login Credentials sent to the registered mobile number. Please check.");
                    RedirectToListPage();
                } else {
                    alert(res.statusdesc);
                    $scope.Smsbtndisable = false;
                    //$scope.ShowLoading = false;
                    //$scope.RollEditDisable = false;
                }

            }, function (error) {
                $scope.Smsbtndisable = false;
                $scope.ShowLoading = false;
                $scope.RollEditDisable = false;
                try {
                    var res = JSON.parse(error);

                } catch (ex) {
                }
                alert(res.statusdesc);

            });
        }

    })
})