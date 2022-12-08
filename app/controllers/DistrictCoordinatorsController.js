define(['app'], function (app) {
    app.controller("DistrictCoordinatorsController", function ($scope, $state, StudentRegistrationService) {

     

        $scope.getData = [{ "District": "Warangal", "Mandal": "Ghanpr", "Name": "Ramesh", "Mobile": "9553463016", "Email": "b.akhil101@gmail.com", "CoordinatingCenter": "Govt Polycetcnic Warangal"},
            { "District": "Warangal", "Mandal": "Ghanpr", "Name": "Ramesh", "Mobile": "9553463016", "Email": "b.akhil101@gmail.com", "CoordinatingCenter": "Govt Polycetcnic Warangal" },
            { "District": "Warangal", "Mandal": "Ghanpr", "Name": "Ramesh", "Mobile": "9553463016", "Email": "b.akhil101@gmail.com", "CoordinatingCenter": "Govt Polycetcnic Warangal" },
            { "District": "Warangal", "Mandal": "Ghanpr", "Name": "Ramesh", "Mobile": "9553463016", "Email": "b.akhil101@gmail.com", "CoordinatingCenter": "Govt Polycetcnic Warangal" },
            { "District": "Warangal", "Mandal": "Ghanpr", "Name": "Ramesh", "Mobile": "9553463016", "Email": "b.akhil101@gmail.com", "CoordinatingCenter": "Govt Polycetcnic Warangal" },
            { "District": "Warangal", "Mandal": "Ghanpr", "Name": "Ramesh", "Mobile": "9553463016", "Email": "b.akhil101@gmail.com", "CoordinatingCenter": "Govt Polycetcnic Warangal" },        ]

        for (var j = 1; j < $scope.getData.length + 1; j++) {
            $scope['edit' + j] = true;
        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }
    })
})

