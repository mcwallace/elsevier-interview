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
    const url = `https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Condition/?patient=${input}`;
    console.log(url);
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
  };

  $scope.createLink = (condition) => {
    return `https://www.ncbi.nlm.nih.gov/pubmed/?term=${condition}`;
  };



}]);
