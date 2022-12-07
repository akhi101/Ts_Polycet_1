define(['app'], function (app) {
    app.controller("RegistrationController", function ($scope, $crypto, $localStorage, $state, $uibModal, PaymentService, StudentRegistrationService, AdminService, SystemUserService, PreExaminationService) {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.sendotp = true;
            $scope.verifycastebutton = false;
            $scope.enterotp = false;
            $scope.PhoneNum = false;
            $scope.verifyotp = false;
            $scope.loading = false;
            $scope.aadharbox = false;
            $scope.ResendLink = false;
            $scope.phonenoupdated = false;
            $scope.OtpVerified = false;
            $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')
            console.log($scope.SessionCaptcha)
            $scope.GetCaptchaData()
            var eKey = SystemUserService.GetEKey();
            eKey.then(function (res) {
                $scope.RegistrationEKey = res;
                sessionStorage.Ekey = res;

            });
        }



        var getcategory = StudentRegistrationService.GetCategories();
        getcategory.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.GetCasteData = res.Table;
            $scope.verifycastebutton = true;

        },
            function (error) {
                alert("error while loading Caste Category");
                //var err = JSON.parse(error);

            });

        $scope.Compare = function (ConfirmPass) {
            //console.log(ConfirmPass)
            if ($scope.CreatePass.includes(ConfirmPass)) {
            }
            else {
                alert('Password Mismatch');
            }
        }

        $scope.ValidateEmail = function () {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.email)) {
                return (true)
            }
            alert("You have entered an invalid email address!")
            return;
        }





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
            if ($scope.StudentName == "" || $scope.StudentName == null || $scope.StudentName == undefined) {
                alert("Please Enter Name")
                return
            }
            if ($scope.MobileNumber == "" || $scope.MobileNumber == null || $scope.MobileNumber == undefined) {
                alert("Please Enter Mobile Number")
                return
            }
            if ($scope.OtpVerified == false) {
                alert("Please Verify Mobile Number")
                return
            }
            if ($scope.CasteCategory == "" || $scope.CasteCategory == null || $scope.CasteCategory == undefined) {
                alert("Please Select Category")
                return
            }


            if ($scope.CasteCategory == 7 || $scope.CasteCategory == 8) {
                $scope.email = $scope.email1

                if ($scope.Aadhaar == "" || $scope.Aadhaar == null || $scope.Aadhaar == undefined) {
                    alert("Please Enter Aadhaar Number")
                    return
                }
                if ($scope.CasteNum == "" || $scope.CasteNum == null || $scope.CasteNum == undefined) {
                    alert("Please Enter Caste Certificate Number")
                    return
                }

                if ($scope.CasteVerified == true) {

                } else {
                    alert("Please Verify Caste to Register")
                    return;
                }
            } else {
                $scope.email = $scope.email2
            }
            if ($scope.CreatePass == "" || $scope.CreatePass == null || $scope.CreatePass == undefined) {
                alert("Please Enter Password")
                return
            }
            if ($scope.ConfirmPass == "" || $scope.ConfirmPass == null || $scope.ConfirmPass == undefined) {
                alert("Please Enter Confirm Password")
                return
            }
            $scope.ChangePassword();
            if ($scope.CaptchaText == "" || $scope.CaptchaText == null || $scope.CaptchaText == undefined) {
                alert("Please Enter Captcha")
                return
            }

            var captcha = AdminService.ValidateCaptcha($scope.SessionCaptcha, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.Submit()
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;

                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    return

                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }




        $scope.GetCasteDetails = function () {
            //$scope.CasteNum = "EWS022100145491";
            //$scope.Aadhaar = "206866388949";
            //$scope.CasteNum = "CND022222366793";
            $scope.Userid = "MEESEVA";
            var captcha = AdminService.GetCasteDetails($scope.CasteNum, $scope.Userid);
            captcha.then(function (res) {
                console.log(res)
                if (res.errorcode == 200) {
                    $scope.Data = res.caste_details

                    $scope.Aadhaar_Number = res.caste_details.aadhaar_number

                    let str = $scope.Aadhaar_Number;
                    var aadhaar = str[8] + str[9] + str[10] + str[11];
                    let str1 = $scope.Aadhaar;
                    var aadhaar1 = str1[8] + str1[9] + str1[10] + str1[11];

                    if (aadhaar == aadhaar1) {
                        alert("Caste Verified Successfully")
                        $scope.verifycastebutton = false;
                        $scope.CasteVerified = true;
                    } else {
                        alert("Aadhaar Number Not Matched with Caste Certificate")
                        return;
                    }
                } else {
                    alert("Caste Details Not Found")
                }

                //var jsonOutput = xml2json(res);

                //if (response[0].ResponceCode == '200') {
                //    //alert(response[0].ResponceDescription)
                //    //$scope.CaptchaText = "";
                //    //$scope.GetCatcha = response[0].Captcha
                //    //var captcha = JSON.parse(response[0].Captcha)
                //    //$scope.CaptchaImage = captcha[0].Image;
                //} else {
                //    alert(response[0].ResponceDescription)
                //    $scope.CaptchaText = "";
                //    $scope.GetCatcha = response[0].Captcha
                //    var captcha = JSON.parse(response[0].Captcha)
                //    $scope.CaptchaImage = captcha[0].Image;
                //}

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }

        function parseXmlToJson(xml) {
            const json = {};
            for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
                const key = res[1] || res[3];
                const value = res[2] && parseXmlToJson(res[2]);

                json[key] = ((value && Object.keys(value).length) ? value : res[3]) || null;

            }
            $scope.Json = json
        }


        $scope.ResStatus = 0;
        $scope.SendSms = function () {


            if ($scope.StudentName == undefined || $scope.StudentName == "" || $scope.StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if ($scope.MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
                alert('please Enter Mobile number');
                return;
            }

            //if (angular.isUndefined(AadharNo) || AadharNo == "" || AadharNo == null) {
            //    alert('please Enter Aadhar number');
            //    return;
            //}
            $scope.loading = true;
            $scope.PhoneNum = true;
            $scope.aadharbox = true;

            $scope.enterotp = true;
            $scope.verifyotp = true;
            $scope.sendotp = false;
            $scope.phonenoupdated = false;
            //var AadharNo = '123456789456'
            var SendSms = StudentRegistrationService.SendSms($scope.MobileNumber, $scope.StudentName)
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
                    $scope.loading = false;


                } else if (res.StatusCode == '400') {
                    $scope.ResStatus = res.StatusCode;
                    alert(res.StatusDescription);
                    $scope.sendotp = false;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = true;
                    $scope.ResendLink = true;
                    $scope.verifyotp = true;
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


                $scope.SendSms();
                if ($scope.ResStatus == 200)
                    count++;

                else if ($scope.ResStatus == 400)
                    alert('Otp Sent Less than 30 seconds');
                else
                    $scope.ResendLink = false;
                /*alert('')*/

            }
        }

        $scope.VerifyMobileOtp = function (MobileNumber, StudentName, mobileotp) {


            if (MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
                alert('please Enter Mobile number');
                return;
            }

            //if ($scope.AadharNo == undefined || $scope.AadharNo == "" || $scope.AadharNo == null) {
            //    alert('please Enter Aadhar number');
            //    return;
            //}

            if ($scope.StudentName == undefined || $scope.StudentName == "" || $scope.StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if ($scope.mobileotp == undefined || $scope.mobileotp == "" || $scope.mobileotp == null) {
                alert('please Enter OTP.');
                return;
            }
            //var AadharNo = '123456789456'
            var VerifyMobileOtp = StudentRegistrationService.VerifyMobileOtp(MobileNumber, StudentName, mobileotp)
            VerifyMobileOtp.then(function (response) {
                let VerRes = response[0];
                if (VerRes.StatusCode == '200') {
                    alert("Mobile Number Verified Successfully");
                    $scope.OtpVerified = true;
                    $scope.enterotp = false;
                    $scope.verifyotp = false;
                    $scope.phonenoupdated = true;



                } else if (VerRes.StatusCode == '400') {
                    alert(VerRes.StatusDescription);
                    $scope.OtpVerified = false;
                    $scope.phonenoupdated = false;
                    $scope.sendotp = false;


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


        $scope.verifyCaste = function (Aadhaar, CasteNum, CasteCategory) {




            if (CasteCategory == undefined || CasteCategory == "" || CasteCategory == null) {
                alert('please Select Category.');
                return;
            }
            if ($scope.Aadhaar == "" || $scope.Aadhaar == null || $scope.Aadhaar == undefined) {
                alert("Please Enter Aadhaar Number")
                return
            }
            if ($scope.CasteNum == "" || $scope.CasteNum == null || $scope.CasteNum == undefined) {
                alert("Please Enter Caste Certificate Number")
                return
            }
            var verifycaste = StudentRegistrationService.VerifyCaste(Aadhaar, CasteNum, CasteCategory)
            verifycaste.then(function (response) {
                let VerRes = response[0];
                if (VerRes.StatusCode == '200') {
                    alert("CasteCertificate Verified");
                    $scope.CasteVerified = true;
                    $scope.verifycastebutton = false;
                    $scope.casteupdated = true;



                } else if (VerRes.StatusCode == '400') {
                    alert(VerRes.StatusDescription);
                    $scope.CasteVerified = false;
                    $scope.verifycastebutton = true;
                    $scope.casteupdated = false;


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

        $scope.ChangeCaste = function () {
            $scope.CasteVerified = false;
            $scope.verifycastebutton = true;
            $scope.casteupdated = false;
            $scope.Aadhaar = "";
            $scope.CasteNum = "";
        }

        $scope.ChangePassword = function () {
            if ($scope.CreatePass !== $scope.ConfirmPass) {
                alert("Password and Confirm Password Not Matched")
                return;
            }
        }
        $scope.CasteVerified = false
        $scope.Aadhaar = "";
        $scope.CasteNum = "";
        $scope.CasteCategoryID = 1;
        $scope.Submit = function () {


            var EncriptedPassword = $crypto.encrypt($crypto.encrypt($scope.CreatePass, 'HBSBP9214EDU00TS'), $scope.RegistrationEKey)+ '$$@@$$' + $scope.RegistrationEKey;
            var submitstddetails = StudentRegistrationService.SubmitStdDetails($scope.StudentName, $scope.MobileNumber, $scope.CasteCategory, $scope.Aadhaar, $scope.CasteNum, $scope.CasteVerified, $scope.email, EncriptedPassword,1);
            submitstddetails.then(function (res) {
                if (res.Table[0].StatusCode == '200') {
                    $scope.StudentVerData = res.Table1
                    $scope.challan = res.Table1[0].ChallanNumber;
                    $scope.Amount = res.Table1[0].RegistrationAmount;
                    //$scope.DetailsFound = true;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Popups/FeePaymentPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                    });
                    $scope.closeModal = function () {
                        $scope.modalInstance.close();
                    }
                } else if (res.Table[0].StatusCode == '400') {
                    alert(res.Table[0].StatusDescription);
                }
                else {
                    //$scope.DetailsFound = false;
                    //  $scope.DetainedDetailsFoundWithData = res.Table[0].ResponceDescription
                    alert("Error while loading Data");
                }


            },
                function (error) {

                    $scope.DetailsFound = false;
                    alert("Error while loading Data");
                    console.log(error);
                });
        }


        //$scope.Submit = function (StudentName, MobileNumber, email, CreatePass) {
        //    let Email = (email == "" || email == null || email == undefined) ? "" : email;

        //    if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
        //        alert('Please enter Student name');
        //        return;
        //    }

        //    if (angular.isUndefined(MobileNumber) || MobileNumber == "" || MobileNumber == null) {
        //        alert('please Enter Mobile number');
        //        return;
        //    }

        //    //if (!$scope.phonenoupdated) {
        //    //    alert('Please Verify the Mobile number, before you proceed.');
        //    //    return;
        //    //}
        //    //if (angular.isUndefined(AadharNo) || AadharNo == "" || AadharNo == null) {
        //    //    alert('please Enter Aadhar number');
        //    //    return;
        //    //}

        //    if (angular.isUndefined(CreatePass) || CreatePass == "" || CreatePass == null) {
        //        alert('please Enter Password');
        //        return;
        //    }

        //    //if (angular.isUndefined(CaptchaText) || CaptchaText == "" || CaptchaText == null) {
        //    //    alert('please Enter Captcha');
        //    //    return;
        //    //}
     ///   $crypto.encrypt(CreatePass, $scope.RegistrationEKey)
    //   $scope.EncriptedPassword = $crypto.encrypt($scope.CreatePass, $scope.RegistrationEKey);

        //    var submitstddetails = StudentRegistrationService.SubmitStdDetails(StudentName, MobileNumber, Email, EncriptedPassword);
        //    submitstddetails.then(function (response) {
        //        //try {
        //        //    var RegRes = JSON.parse(response);
        //        //}
        //        //catch (err) { }
        //        let NewRes;
        //        let RegRes = response.Table[0];
        //        try {
        //            NewRes = response.Table1[0];
        //        }
        //        catch (res) {

        //        }
        //        if (RegRes.StatusCode == '200') {
        //            alert('You have provisionally registered for POLYCET - 2023. Your provisional Registration Number is ' + NewRes.ApplicationNumber + 'Please complete your Application Form after login.');
        //            $state.go("index.Login");

        //        }

        //        //else if (response.ResponseCode == '400') {
        //        //    alert(response.ResponseDescription);
        //        //}

        //        else if (RegRes.StatusCode == '400') {
        //            alert(RegRes.StatusDescription)
        //        }
        //        else {
        //            alert('Something Went Wrong')
        //        }

        //    }, function (error) {
        //        var err = JSON.parse(error);
        //    });

        //}

        //    var AadharNo = '123456789456'
           
        //    $scope.ValidateCaptcha();

    


        $scope.Mode = function () {

            if ($scope.mode == 1) {
             
                $scope.billdesktable = true;
            } else if ($scope.mode == 2) {
                $scope.twallettable = true;
            }

        }

        $scope.Proceedtopay = function () {
            var marchantid = "TSSBTET"; // test
            var subMarchantid = "TSDOFP";
            var addInfo1 = "NA";
            var addInfo3 = "11222-ec-001";
            var addInfo4 = "NA"//$scope.loadedScheme.Scheme;t
            var addInfo5 = "NA";//Semester;
            var addInfo6 = "NA"//PaymentType;
            var addInfo7 = "NA";
            //var amount = 450;
            $localStorage.PaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "index.PaymentResponse"
            }
            $localStorage.PaymentGatewayResponse = redirecturl;

            var location = window.location.origin;

            var amount=1
            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, 0, "json");
            var proceedfinePayment = PreExaminationService.getSomeValue(location + "/PaymentGateway/BulkBillResponse", $scope.challan);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    //var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD";
                    //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });
        }

        $scope.Pay = function () {
            var marchantid = "TSSBTET"; // test
            var subMarchantid = "TSDOFP";
            var addInfo1 = "NA";
            var addInfo2 = "NA";
            var addInfo3 = "11222-ec-001";
            var addInfo4 = "NA"//$scope.loadedScheme.Scheme;t
           
            //var amount = 450;
            $localStorage.PaymentGatewayResponse = {};
            redirecturl = {
                Callbackurl: "index.PaymentResponse"
            }
            $localStorage.PaymentGatewayResponse = redirecturl;

            var location = window.location.origin;
            var amount = 1
            PaymentService.getCipherRequest(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, $scope.challan, amount);
            //var proceedfinePayment = PreExaminationService.getSomeValue(location + "/api/PaymentGateway/BulkBillResponse", $scope.challan);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    //var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD";
                    //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });
        }
        
    });
});


