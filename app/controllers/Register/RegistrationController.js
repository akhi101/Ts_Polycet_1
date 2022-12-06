define(['app'], function (app) {
    app.controller("RegistrationController", function ($scope, $crypto, $localStorage,$state, $uibModal, PaymentService,StudentRegistrationService, AdminService,SystemUserService) {
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

        }



        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.EKey = res;
            sessionStorage.Ekey = res;

        });


            var getyear = AdminService.GetPolycetYears();
            getyear.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table.length > 0) {
                    $scope.PolycetYears = response.Table;
                    $scope.CurrentPolycetYear = response.Table[0].CurrentPolycetYear;
                    $scope.PolycetYear = response.Table[0].PolycetYear;

                    if ($scope.CurrentPolycetYear == true) {
                        
                    }
                } else {
    
                }
            },
                function (error) {

                });
        


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
                    //alert(response[0].ResponceDescription)
                    //$scope.CaptchaText = "";
                    //$scope.GetCatcha = response[0].Captcha
                    //var captcha = JSON.parse(response[0].Captcha)
                    //$scope.CaptchaImage = captcha[0].Image;
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
            var captcha = AdminService.GetCasteDetails($scope.CasteNum, $scope.Aadhaar);
        captcha.then(function (res) {

            if (res != "") {
                parseXmlToJson(res);
                console.log($scope.Json)
                alert($scope.Json.status)
            } else {
                alert("Caste Certificate Not Found")
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
        $scope.SendSms = function (MobileNumber, StudentName) {

            $scope.MobileNumber = MobileNumber;
            $scope.StudentName = StudentName;

            if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if (angular.isUndefined(MobileNumber) || MobileNumber == "" || MobileNumber == null) {
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
            var SendSms = StudentRegistrationService.SendSms(MobileNumber, StudentName)
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
        $scope.ResendOtp = function (MobileNumber, StudentName) {
            if (count < 3) {


                $scope.SendSms(MobileNumber, StudentName);
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
                    alert("Success");
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


            if (Aadhaar == undefined || $scope.Aadhaar == "" || $scope.Aadhaar == null) {
                alert('please Enter Aadhaar number');
                return;
            }

            //if ($scope.AadharNo == undefined || $scope.AadharNo == "" || $scope.AadharNo == null) {
            //    alert('please Enter Aadhar number');
            //    return;
            //}

            if (CasteNum == undefined || CasteNum == "" || CasteNum == null) {
                alert('Please enter Caste Certificate Number');
                return;
            }

            if (CasteCategory == undefined || CasteCategory == "" || CasteCategory == null) {
                alert('please Select Category.');
                return;
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


        $scope.Submit = function (StudentName, MobileNumber, CasteCategory, Aadhaar, CasteNum, CasteVerified, email, CreatePass) {

            //if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
            //    alert('Please enter Student name');
            //    return;
            //}

            //if (angular.isUndefined(MobileNumber) || MobileNumber == "" || MobileNumber == null) {
            //    alert('please Enter Mobile number');
            //    return;
            //}

            //if (!$scope.phonenoupdated) {
            //    alert('Please Verify the Mobile number, before you proceed.');
            //    return;
            //}


            //if (angular.isUndefined(CreatePass) || CreatePass == "" || CreatePass == null) {
            //    alert('please Enter Password');
            //    return;
            //}

            //if (angular.isUndefined(CaptchaText) || CaptchaText == "" || CaptchaText == null) {
            //    alert('please Enter Captcha');
            //    return;
            //}
            let castecategoryid = (CasteCategory == "" || CasteCategory == undefined || CasteCategory == null) ? "" : CasteCategory;
            let aadharno = (Aadhaar == "" || Aadhaar == undefined || Aadhaar == null) ? "" : Aadhaar;
            let castenum = (CasteNum == "" || CasteNum == undefined || CasteNum == null) ? "" : CasteNum;
            let casteverified = (CasteVerified == "" || CasteVerified == undefined || CasteVerified == null) ? true : false;
            let Email = (email == "" || email == null || email == undefined) ? "" : email;
            var EncriptedPassword = $crypto.encrypt(CreatePass, $scope.EKey) + "$$@@$$";

            //if (CasteCategory == 1 || CasteCategory == 2 ||
            //    CasteCategory == 3 || CasteCategory == 4 || CasteCategory == 5 || CasteCategory == 6) {

            //    if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
            //    alert('Please enter Student name');
            //    return;
            //}

            //if (angular.isUndefined(MobileNumber) || MobileNumber == "" || MobileNumber == null) {
            //    alert('please Enter Mobile number');
            //    return;
            //}

            //if (!$scope.phonenoupdated) {
            //    alert('Please Verify the Mobile number, before you proceed.');
            //    return;
            //}


            //if (angular.isUndefined(CreatePass) || CreatePass == "" || CreatePass == null) {
            //    alert('please Enter Password');
            //    return;
            //}

            ////if (angular.isUndefined(CaptchaText) || CaptchaText == "" || CaptchaText == null) {
            ////    alert('please Enter Captcha');
            ////    return;
            ////}
            //}
         
        
            //if (CasteCategory == 7 || CasteCategory == 8) {
            //    if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
            //        alert('Please enter Student name');
            //        return;
            //    }

            //    if (angular.isUndefined(MobileNumber) || MobileNumber == "" || MobileNumber == null) {
            //        alert('please Enter Mobile number');
            //        return;
            //    }

            //    if (!$scope.phonenoupdated) {
            //        alert('Please Verify the Mobile number, before you proceed.');
            //        return;
            //    }
            //    if (angular.isUndefined(Aadhaar) || Aadhaar == "" || Aadhaar == null) {
            //        alert('please Enter Aadhar number');
            //        return;
            //    }


            //    if (angular.isUndefined(CasteNum) || CasteNum == "" || CasteNum == null) {
            //        alert('please Enter Caste number');
            //        return;
            //    }

            //    if (!CasteVerified) {
            //        alert('Please Verify Caste, before you proceed.');
            //        return;
            //    }


            //    if (angular.isUndefined(CreatePass) || CreatePass == "" || CreatePass == null) {
            //        alert('please Enter Password');
            //        return;
            //    }

            //    //if (angular.isUndefined(CaptchaText) || CaptchaText == "" || CaptchaText == null) {
            //    //    alert('please Enter Captcha');
            //    //    return;
            //    //}

            //}
           
            $scope.ValidateCaptcha();


            var submitstddetails = StudentRegistrationService.SubmitStdDetails(StudentName, MobileNumber, castecategoryid, aadharno, castenum, casteverified, Email, EncriptedPassword,1);
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

        //   var EncriptedPassword = $crypto.encrypt(CreatePass, $scope.RegistrationEKey);

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
            var addInfo3 = "NA";
            var addInfo4 = "NA"//$scope.loadedScheme.Scheme;t
            var addInfo5 = "NA";//Semester;
            var addInfo6 = "NA"//PaymentType;
            var addInfo7 = "NA";
            //var amount = 450;
            $localStorage.PaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "index.Registration"
            }
            $localStorage.PaymentGatewayResponse = redirecturl;

            var location = window.location.origin;

       
            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, 0, "json");
            var proceedfinePayment = PaymentService.getSomeValue(location + "/Payment/BulkBillResponse", $scope.challan);
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


