define(['app'], function (app) {
    app.controller("CircularsController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService) {

        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;



        const $ctrl = this;


        $ctrl.$onInit = () => {
            $scope.getnotifications();
         
         

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }


            today = yyyy + '-' + mm + '-' + dd;

            $scope.today = today;
        }




        $scope.location = window.location.origin;
        $scope.getnotifications = function () {

            //$scope.loading = true;
            //$scope.error = false;
            //$scope.data = false;
            var getnotification = AdminService.getNotificationsList();
            getnotification.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table.length > 0) {
                    //$scope.loading = false;
                    $scope.Notifications = response.Table;
                    //$scope.loading = false;

                } else {
                    //$scope.loading = false;
                    //$scope.data = false;
                    //$scope.error = true;
                }
            },
                function (error) {

                    console.log(error);
                    //$scope.loading = false;
                    //$scope.data = false;
                    $scope.error = true;
                });
        }


        $scope.ChangeFile = function () {
            $scope.imgLabel = false;
        }


        $scope.uploadfiles = function (ele, val) {

            var value = val + 1
            var input = document.getElementById("studentFile" + value);
            var img = document.createElement("img");
            if (input.files && input.files[0]) {

                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                $scope.FileName = input.files[0].name
                var base64file = '';
                var canvas = document.createElement("canvas");
                reader.onload = function (ele) {
                    $('#studentFile' + value).attr('src', ele.target.result);

                    base64file = ele.target.result;
                    $scope.updatepdffile = base64file.replace(/^data:application\/pdf+;base64,/, "").replace(/^data:application\/zip+;base64,/, "").replace(/^data:image\/[a-z]+;base64,/, "").replace(/^data:application\/octet\-stream+;base64,/, "").replace(/^data:application\/x\-zip\-compressed+;base64,/, "").replace(/^data:application\/msword+;base64,/, "");

                    $scope.wesfile1 = canvas.toDataURL("application\/pdf\/zip").replace(/^data:application\/pdf\/zip+;base64,/, "");
                    ("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }

            //console.log($scope.updatepdffile)
        }

        $scope.uploadpdffiles = function () {
            var input = document.getElementById("Circular");

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                $scope.FileName = input.files[0].name
                var base64file;
                var canvas = document.createElement("canvas");
                reader.onload = function (ele) {
                    $('#Circular').attr('src', ele.target.result);

                    base64file = ele.target.result;
                    $scope.addpdffile = base64file.replace(/^data:application\/pdf+;base64,/, "").replace(/^data:application\/zip+;base64,/, "").replace(/^data:image\/[a-z]+;base64,/, "").replace(/^data:application\/octet\-stream+;base64,/, "").replace(/^data:application\/x\-zip\-compressed+;base64,/, "").replace(/^data:application\/msword+;base64,/, "");

                    $scope.wesfile1 = canvas.toDataURL("application\/pdf").replace(/^data:application\/pdf+;base64,/, "");
                    ("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }



        }


        //$scope.OpenUrl = function (data) {

        //    //var url = window.location.href + '/odcdata';
        //    window.open(data, 'Download');
        //    //window.open(data);
        //}


        $scope.SaveData = function () {
            var file = document.getElementById("Circular");

            if ($scope.StartDate == '' || $scope.StartDate == null || $scope.StartDate == undefined) {
                alert('please select notification date')
                return;
            }


            if ($scope.addpdffile == '' || $scope.addpdffile == null || $scope.addpdffile == undefined) {
                alert('please upload file')
                return;
            }

            if ($scope.Description == '' || $scope.Description == null || $scope.Description == undefined) {
                alert('please enter description')
                return;
            }

          
            //$scope.loading = true;
            //$scope.error = false;
            //$scope.data = false;
            var notificationdate = moment($scope.enD).format("YYYY-MM-DD HH:mm:ss.SSS");
            var uploadexcl = AdminService.AddNotification($scope.Description, $scope.addpdffile,notificationdate, authData.UserName);
            uploadexcl.then(function (res) {
                if (res[0].ResponseCode == '200') {
                    //$scope.loading = false;
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].ResponseDescription)
                    $scope.getnotifications();
                }
            }, function (err) {
                //$scope.loading = false;
                //$scope.error = false;
                //$scope.data = true;
                $scope.getnotifications();
            })
        }



        var expanded = false;

        $scope.showcheckboxes = function () {
            var checkboxes = document.getelementbyid("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.SetEndDate = function (StartDate) {

            if (StartDate !== null && StartDate !== undefined) {
                var d = StartDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                // d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var Start_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            //var date = new Date(Start_date);
            var indiaTime = new Date(StartDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);

            $scope.tomorrow = indiaTime.toLocaleString();
            //var time = indiaTime.toLocaleTimeString();
            //console.log(time);


            //var tomorrow = new Date($scope.tomorrow);
            //tomorrow.setDate(tomorrow.getDate() );

            var dates = new Date(indiaTime.toLocaleString());
            //var time = new Date(tomorrow.toLocaleTimeString())
            //console.log(time)
            month = '' + (dates.getMonth() + 1);
            day = '' + dates.getDate();
            year = dates.getFullYear();


            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            $scope.endDisable = false;
            $scope.enD = [year, month, day].join('-');

            document.getElementById("datetimepicker2").setAttribute("min", $scope.enD);

        };

        $scope.closecheckbox = function () {
            var checkboxes = document.getelementbyid("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.toggleall = function () {
            var togglestatus = $scope.isallselected;
            angular.foreach($scope.usertypes, function (itm) { itm.selected = togglestatus; });
            $scope.arr = [];
            angular.foreach($scope.usertypes, function (value, key) {
                if (value.selected === true) {

                    $scope.arr.push({ "id": value.id })
                }

            });

        }

        $scope.optiontoggled = function (mid1list) {
            $scope.isallselected = $scope.usertypes.every(function (itm) { return itm.selected; })
            $scope.arr = [];
            angular.foreach($scope.usertypes, function (value, key) {
                if (value.selected === true) {

                    $scope.arr.push({ "id": value.id })
                }
            });


        }


        $scope.Logout = function () {


            //sessionStorage.loggedIn = "no";
            var GetUserLogout = SystemUserService.PostUserLogout(authData.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""

            };
            $state.go('index.OfficialsLogin')
        }

    })
})