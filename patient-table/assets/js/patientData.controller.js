const patientTable = angular.module('patientTable', []);

patientTable.controller('patientDataController', ['$scope', '$http', function ($scope, $http) {
  $scope.patient = {
    name: '',
    gender: '',
    age: '',
    id: '',
  };
  $scope.badData = true;
  $scope.data = [];

  $scope.makeCall = (input) => {
    const patientUrl = `https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/${input}`;
    $http.get(patientUrl).then((patientData) => {
      console.log(patientData);
      console.log(patientData.data.name);
      const name = patientData.data.name[0];
      $scope.patient.name = name.given[0] + ' ' + name.family[0];
      $scope.patient.gender = patientData.data.gender;
      const now = new Date(Date.now());
      const dob = new Date(patientData.data.birthDate);
      $scope.patient.age = now.getFullYear() - dob.getFullYear();
      const url = `https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Condition/?patient=${input}`;
      console.log('getting conditions');
      $http.get(url)
      .then((resp) => {
        console.log('responseeee');
        console.log(resp);
        $scope.data = resp;
        $scope.badData = false;
      }, (err) => {
        console.log(err);
        console.log(err.status);
        $scope.badData = true;
      });
    }, (err) => {
      console.log(err);
    });

  };

  $scope.createLink = (condition) => {
    return `https://www.ncbi.nlm.nih.gov/pubmed/?term=${condition}`;
  };



}]);
